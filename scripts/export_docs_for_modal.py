"""
Export compliance documents as Markdown files for Modal Volume ingestion.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
from scripts.ingest_compliance_corpus import COMPLIANCE_CORPUS

os.makedirs("data/compliance_docs", exist_ok=True)

for doc in COMPLIANCE_CORPUS:
    safe_name = doc["title"].replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_").replace(":", "")[:50]
    file_path = f"data/compliance_docs/{safe_name}.md"
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(f"# {doc['title']}\n\n")
        f.write(f"**Authors**: {', '.join(doc['authors'])}\n\n")
        f.write(f"**Source**: {doc.get('source', 'Official Publication')}\n\n")
        f.write(f"**Year**: {doc.get('publication_year', 2024)}\n\n")
        f.write(f"**License**: {doc.get('license', 'Open Access')}\n\n")
        f.write("---\n\n")
        
        for c in doc.get("chunks", []):
            art = c.get("article", "Section")
            f.write(f"## {art}: {c.get('title', '')}\n\n")
            f.write(f"*(Page {c.get('page', 1)})*\n\n")
            f.write(f"{c.get('text', '')}\n\n")

print(f"Generated compliance documents in data/compliance_docs/")
