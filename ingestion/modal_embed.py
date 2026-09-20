"""
RICH - Modal Document Ingestion & Smart Embedding Pipeline
Extracts text from PDF/DOCX/MD documents in a Modal Volume, parses regulatory
and scientific metadata (Articles, Recitals, CELEX, Page numbers), chunks text
optimally, generates 384-dim BGE embeddings on a T4 GPU, and batches inserts
into Neon PostgreSQL (pgvector).

Based on proven patterns from acAIcia with project-specific enhancements.
"""

import glob
import json
import logging
import os
import re
from typing import Any, Dict, List

import modal

logger = logging.getLogger(__name__)

# Modal Container Definition
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch",
        "sentence-transformers",
        "PyMuPDF",  # fitz for layout-aware PDF extraction
        "python-docx",
        "langchain-text-splitters",
        "psycopg2-binary",
        "fastapi[standard]",
    )
    .run_commands(
        "python -c \"from sentence_transformers import SentenceTransformer; SentenceTransformer('BAAI/bge-small-en-v1.5')\""
    )
)

app = modal.App("rich-document-ingestion")
doc_volume = modal.Volume.from_name("rich-documents-volume", create_if_missing=True)

# Secrets: Provides DATABASE_URL for Neon PostgreSQL
db_secrets = [
    modal.Secret.from_name("rich-db-secrets"),
]


@app.cls(
    image=image,
    gpu="T4",
    timeout=120,
    scaledown_window=300,
)
class TextEmbedder:
    @modal.enter()
    def load_model(self):
        from sentence_transformers import SentenceTransformer

        self.model = SentenceTransformer("BAAI/bge-small-en-v1.5")

    @modal.fastapi_endpoint(method="POST")
    def embed(self, payload: Dict[str, Any]):
        """Generate 384-dimensional normalized BGE-small embeddings for queries or passages"""
        if payload.get("ping"):
            return {
                "status": "online",
                "provider": "Modal Cloud Compute",
                "model": "BAAI/bge-small-en-v1.5",
                "dim": 384,
                "gpu": "T4",
            }

        # Batch text support
        if "texts" in payload and isinstance(payload["texts"], list):
            raw_texts = [str(t)[:2000] for t in payload["texts"] if str(t).strip()]
            if not raw_texts:
                return {"embeddings": [], "dim": 384, "model": "BAAI/bge-small-en-v1.5"}
            vecs = self.model.encode(raw_texts, normalize_embeddings=True)
            return {
                "embeddings": vecs.tolist(),
                "dim": len(vecs[0]) if len(vecs) > 0 else 384,
                "model": "BAAI/bge-small-en-v1.5",
            }

        text = payload.get("text", "")
        if not text:
            return {"embedding": []}
        vec = self.model.encode(text, normalize_embeddings=True)
        return {
            "embedding": vec.tolist(),
            "dim": len(vec),
            "model": "BAAI/bge-small-en-v1.5",
        }


def extract_regulatory_metadata(text: str, filename: str) -> Dict[str, Any]:
    """
    Intelligently infer regulatory and publication metadata from document text and filename.
    Identifies EUDR, GDPR, REDD+, CELEX numbers, and issuing bodies.
    """
    meta: Dict[str, Any] = {
        "regulation": None,
        "celex": None,
        "framework": "General",
        "jurisdiction": "Global",
    }

    fname_lower = filename.lower()
    text_sample = text[:3000].lower()

    # EUDR Detection
    if "2023/1115" in text_sample or "eudr" in fname_lower or "deforestation" in text_sample:
        meta["regulation"] = "Regulation (EU) 2023/1115 (EUDR)"
        meta["celex"] = "32023R1115"
        meta["framework"] = "EUDR"
        meta["jurisdiction"] = "European Union / Global Supply Chains"
    # GDPR Detection
    elif "2016/679" in text_sample or "gdpr" in fname_lower or "general data protection" in text_sample:
        meta["regulation"] = "Regulation (EU) 2016/679 (GDPR)"
        meta["celex"] = "32016R0679"
        meta["framework"] = "GDPR"
        meta["jurisdiction"] = "European Union"
    # REDD+ Detection
    elif "redd" in text_sample or "unfccc" in text_sample or "warsaw framework" in text_sample:
        meta["regulation"] = "UNFCCC REDD+ Framework"
        meta["framework"] = "REDD+"
        meta["jurisdiction"] = "UNFCCC Parties"
    # Agroforestry & LUMENS Scientific Publications
    elif "lumens" in fname_lower or "cifor" in text_sample or "icraf" in text_sample or "agroforestry" in text_sample:
        meta["regulation"] = "Scientific & Methodological Publication"
        meta["framework"] = "LUMENS / CIFOR-ICRAF"
        meta["jurisdiction"] = "Tropical Agroforestry Landscapes"

    return meta


def extract_article_header(chunk_text: str) -> Dict[str, str]:
    """
    Identify specific Articles, Recitals, or Sections within a chunk.
    Allows downstream RAG queries to pinpoint exact legal clauses.
    """
    info = {"article": "", "recital": "", "section": ""}

    # Match "Article X" or "Art. X"
    art_match = re.search(r"\b(?:Article|Art\.)\s+(\d+[a-z]?)", chunk_text, re.IGNORECASE)
    if art_match:
        info["article"] = f"Article {art_match.group(1)}"

    # Match Recitals: "(12) ..."
    rec_match = re.search(r"\((\d{1,3})\)\s+[A-Z]", chunk_text)
    if rec_match:
        info["recital"] = f"Recital {rec_match.group(1)}"

    # Match Chapter / Section
    sec_match = re.search(r"\b(CHAPTER\s+[IVXLCDM]+|SECTION\s+\d+)", chunk_text, re.IGNORECASE)
    if sec_match:
        info["section"] = sec_match.group(1).title()

    return info


@app.function(
    image=image,
    gpu="T4",
    volumes={"/data": doc_volume},
    secrets=db_secrets,
    timeout=3600,
)
def process_documents(force_reprocess: bool = False):
    """
    Modal task executing on a T4 GPU:
    1. Loads files from /data volume.
    2. Uses PyMuPDF (fitz) to extract text and page numbers.
    3. Chunks text using legal-aware splitters.
    4. Computes 384-dimensional BGE embeddings.
    5. Batch-inserts into Neon PostgreSQL tables: documents_catalog & document_embeddings.
    6. Writes state to /data/ingestion_state.json to ensure cheap, idempotent runs.
    """
    import fitz  # PyMuPDF
    import psycopg2
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from psycopg2.extras import execute_values
    from sentence_transformers import SentenceTransformer

    logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL environment secret is missing.")

    doc_volume.reload()

    # Load processing state
    state_file = "/data/ingestion_state.json"
    state: Dict[str, Any] = {}
    if os.path.exists(state_file) and not force_reprocess:
        try:
            with open(state_file, "r") as f:
                state = json.load(f)
        except Exception:
            state = {}

    files = glob.glob("/data/*.pdf") + glob.glob("/data/*.docx") + glob.glob("/data/*.md")
    if not files:
        logging.info("No documents found in /data. Upload PDFs using the upload script.")
        return {"processed": 0, "message": "No files found"}

    logging.info(f"Discovered {len(files)} document(s) in /data.")
    logging.info("Loading BAAI/bge-small-en-v1.5 onto T4 GPU...")
    model = SentenceTransformer("BAAI/bge-small-en-v1.5")

    # Chunking strategy: 1200 characters with 150 overlap, tailored for legal articles
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1200,
        chunk_overlap=150,
        separators=["\n\nArticle ", "\n\nCHAPTER ", "\n\n(", "\n\n", "\n", ". ", " "],
    )

    conn = psycopg2.connect(database_url)
    conn.autocommit = False
    cursor = conn.cursor()

    processed_count = 0

    for file_path in files:
        filename = os.path.basename(file_path)
        if not force_reprocess and state.get(filename, {}).get("status") == "Success":
            logging.info(f"Skipping already ingested document: {filename}")
            continue

        logging.info(f"Processing: {filename} ...")
        title, ext = os.path.splitext(filename)
        clean_title = title.replace("_", " ").replace("-", " ").title()

        pages_data: List[Dict[str, Any]] = []

        try:
            if ext.lower() == ".pdf":
                doc = fitz.open(file_path)
                for p_num, page in enumerate(doc, start=1):
                    p_text = page.get_text()
                    if p_text.strip():
                        pages_data.append({"page": p_num, "text": p_text})
            elif ext.lower() == ".md":
                with open(file_path, "r", encoding="utf-8") as f:
                    pages_data.append({"page": 1, "text": f.read()})
            elif ext.lower() == ".docx":
                import docx

                doc = docx.Document(file_path)
                full_text = "\n".join(p.text for p in doc.paragraphs if p.text.strip())
                pages_data.append({"page": 1, "text": full_text})

            if not pages_data:
                logging.warning(f"No text extracted from {filename}")
                continue

            full_doc_text = "\n".join(p["text"] for p in pages_data)
            reg_meta = extract_regulatory_metadata(full_doc_text, filename)

            # Insert into documents_catalog
            cursor.execute(
                """
                INSERT INTO documents_catalog (
                    id, title, authors, publication_year, topic_keywords,
                    source, license, jurisdiction_ids, created_at
                ) VALUES (
                    gen_random_uuid(), %s, %s, %s, %s, %s, %s, %s, NOW()
                )
                RETURNING id;
                """,
                (
                    clean_title,
                    ["European Commission" if "EU" in reg_meta["framework"] else "Scientific Author"],
                    2024 if "EUDR" in reg_meta["framework"] else 2023,
                    [reg_meta["framework"], "compliance", "policy", "agroforestry"],
                    reg_meta.get("regulation") or "Official Document",
                    "Open Access / Official Journal",
                    [],
                ),
            )
            doc_id = cursor.fetchone()[0]

            # Generate chunks with page & clause metadata
            all_chunks: List[Dict[str, Any]] = []
            for p_info in pages_data:
                p_chunks = text_splitter.split_text(p_info["text"])
                for c_idx, chunk_text in enumerate(p_chunks):
                    clause_info = extract_article_header(chunk_text)
                    chunk_meta = {
                        "page": p_info["page"],
                        "regulation": reg_meta["regulation"],
                        "framework": reg_meta["framework"],
                        "celex": reg_meta.get("celex"),
                        "article": clause_info["article"],
                        "recital": clause_info["recital"],
                        "section": clause_info["section"],
                        "filename": filename,
                    }
                    all_chunks.append(
                        {
                            "text": chunk_text,
                            "metadata": chunk_meta,
                            "chunk_index": len(all_chunks),
                        }
                    )

            logging.info(f"{filename}: Created {len(all_chunks)} chunks. Generating embeddings on GPU...")
            texts_to_embed = [c["text"] for c in all_chunks]
            embeddings = model.encode(
                texts_to_embed,
                batch_size=64,
                show_progress_bar=False,
                convert_to_numpy=True,
                normalize_embeddings=True,
            )

            # Prepare batch for document_embeddings table
            embedding_rows = [
                (
                    doc_id,
                    chunk["text"],
                    chunk["chunk_index"],
                    embeddings[idx].tolist(),  # vector(384)
                    json.dumps(chunk["metadata"]),
                )
                for idx, chunk in enumerate(all_chunks)
            ]

            # Insert in batches of 50
            BATCH_SIZE = 50
            for b_idx in range(0, len(embedding_rows), BATCH_SIZE):
                batch = embedding_rows[b_idx : b_idx + BATCH_SIZE]
                execute_values(
                    cursor,
                    """
                    INSERT INTO document_embeddings (
                        document_id, chunk_text, chunk_index, embedding, metadata, created_at
                    ) VALUES %s
                    """,
                    batch,
                    template="(%s, %s, %s, %s::vector, %s::jsonb, NOW())",
                )

            conn.commit()
            processed_count += 1

            state[filename] = {
                "status": "Success",
                "doc_id": str(doc_id),
                "chunks": len(all_chunks),
                "framework": reg_meta["framework"],
            }
            logging.info(f"Successfully ingested {filename} with {len(all_chunks)} chunks.")

        except Exception as err:
            conn.rollback()
            logging.error(f"Error processing {filename}: {err}", exc_info=True)
            state[filename] = {"status": "Failed", "error": str(err)}

    cursor.close()
    conn.close()

    # Save state back to volume
    with open(state_file, "w") as f:
        json.dump(state, f, indent=2)
    doc_volume.commit()

    return {"processed": processed_count, "state": state}


@app.function(
    image=image,
    gpu="T4",
    volumes={"/data": doc_volume},
    secrets=db_secrets,
    timeout=3600,
)
@modal.fastapi_endpoint(method="POST")
def trigger_ingest(payload: Dict[str, Any] = None):
    """
    Cloud endpoint to trigger document ingestion and re-indexing on Modal.
    Can be called directly by the RICH web backend or dashboard.
    """
    payload = payload or {}
    force = payload.get("force", False)
    return process_documents.local(force_reprocess=force)


@app.local_entrypoint()
def main(force: bool = False):
    """Local CLI entrypoint: run modal run ingestion/modal_embed.py"""
    print("Initiating Modal cloud document ingestion...")
    result = process_documents.remote(force_reprocess=force)
    print("Ingestion Result:", json.dumps(result, indent=2))
