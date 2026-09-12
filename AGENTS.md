# RICH — AI Agent Instructions & Operating Manual

AI4D Research and Innovation for Climate Hub (RICH)
High-interactivity 3D geospatial intelligence · LUMENS & GFW scientific depth · EUDR / REDD+ compliance · FastAPI · MapLibre GL · Neon PostGIS & pgvector · Modal serverless compute · Railway.

---

## 1. Core System Architecture

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    Railway Cloud                       │
                               │  FastAPI Backend (Port 8000) + MapLibre React SPA (Dist)│
                               └───────────┬────────────────────────────────┬───────────┘
                                           │                                │
                                           ▼                                ▼
┌─────────────────────────────────┐   ┌───────────────────────────┐    ┌─────────────────────────────────┐
│     Neon Serverless Postgres    │   │      Mistral AI Cloud     │    │       Modal Cloud Compute       │
│  PostGIS (Spatial 4326/3857)    │   │  Chat: mistral-tiny/small │    │  GPU: T4 Serverless Container   │
│  pgvector (Vector 384)          │   │  Embeddings: bge-small    │    │  PyMuPDF + BGE-small-en-v1.5    │
│  Documents & Parcels Catalog    │   │  EUDR Due Diligence RAG   │    │  Volume: rich-documents-volume  │
└─────────────────────────────────┘   └───────────────────────────┘    └─────────────────────────────────┘
```

---

## 2. Modal Cloud Ingestion: Rules & Tips for Agents

Modal is available on this system via the Python CLI and virtual environments.

### Environment & Authentication
- **Venv Path**: Use `.venv/bin/modal` or `.venv/bin/python -m modal` from the project root.
- **Active Profile**: `ciforicraf-ai` is already authenticated and configured.
- **Tokens (CI/Automated)**: If running headless in CI, pass:
  ```bash
  export MODAL_TOKEN_ID="ak-..."
  export MODAL_TOKEN_SECRET="as-..."
  ```

### Modal CLI Commands
- **List Volumes**: `.venv/bin/modal volume list`
- **Inspect Volume Files**: `.venv/bin/modal volume ls rich-documents-volume`
- **Push Documents to Volume**:
  ```bash
  .venv/bin/modal volume put --force rich-documents-volume data/compliance_docs/EUDR.pdf /
  ```
- **Execute Cloud Ingestion**:
  ```bash
  .venv/bin/modal run ingestion/modal_embed.py
  ```
  Or force re-process all:
  ```bash
  .venv/bin/modal run ingestion/modal_embed.py --force true
  ```

### Cheap & Resilient Chunking Rules (acAIcia Patterns)
1. **GPU Sizing**: Always allocate `gpu="T4"` for sentence embeddings (`BAAI/bge-small-en-v1.5`). Never request A100 or H100 for text embeddings—T4 costs ~$0.59/hr and processes 100+ pages in under 15 seconds.
2. **State Caching**: The Modal app persists state to `/data/ingestion_state.json`. Documents with status `"Success"` are skipped on subsequent runs, ensuring zero redundant GPU compute or database write costs.
3. **Batch Inserts**: Never insert embeddings one-by-one over the network to Neon. Always batch execute in groups of 50 using `execute_values` or `INSERT INTO ... VALUES %s`.
4. **Vector Dimension Alignment**:
   - RICH pgvector column is strictly `Vector(384)`.
   - Embedding model must be `BAAI/bge-small-en-v1.5` or `all-MiniLM-L6-v2` (both 384 dimensions).
   - If using Mistral Embeddings API (`mistral-embed`), note that it outputs 1024 dimensions, which requires a schema migration if adopted. Keep default at 384.

### Smart Metadata Extraction
When extracting PDFs with PyMuPDF (`fitz`), always parse structural metadata:
- **Regulation / Framework**: `EUDR` (Regulation (EU) 2023/1115), `GDPR` (Regulation (EU) 2016/679), `REDD+`, etc.
- **Article / Recital Header**: Regex match `Article \d+`, `Recital (\d+)`, `Chapter [IVXLCDM]+`.
- **Page Number & Title**: Enables the RAG agent to provide clickable, legally traceable citations (e.g. `[1] EUDR Article 2 (Page 11): Definitions`).

---

## 3. Authoritative Compliance Sources Strategy

### Current Primary Sources
1. **EUR-Lex Regulation (EU) 2023/1115 (EUDR)**:
   - Deforestation Cut-off: **December 31, 2020**.
   - Article 2(4-6): Explicitly classifies shade cocoa/coffee under tree cover as agricultural use, **not** deforestation.
   - Article 9: Smallholders < 4 ha require single GPS point; > 4 ha require full polygon boundary coordinates.
2. **European Commission Official Guidance (C/2024/6770)**:
   - Agroforestry canopy maintenance guidelines and aggregated cooperative due diligence.
3. **Regulation (EU) 2016/679 (GDPR) & EDPB Spatial Data Guidance**:
   - Lawful basis for smallholder farm polygon processing (Art 6(1)(c)/(f)).
   - Farmer PII anonymization and cross-border data transfer safeguards.
4. **CIFOR-ICRAF & Climate Policy Radar (CPR)**:
   - Peer-reviewed research addressing the ~63% false-positive deforestation risk in satellite optical maps.

### Seed Script
To seed or refresh the compliance corpus without Modal:
```bash
.venv/bin/python scripts/ingest_compliance_corpus.py
```

---

## 4. CI/CD & System Hygiene (hodaripay Patterns)

### Pre-Commit / Pre-PR Checks
Before pushing or merging, run the local gates:
```bash
# 1. Migration & Schema Sanity
./scripts/check-migrations.sh

# 2. Backend Tests
cd backend && ../.venv/bin/pytest tests/ -x

# 3. Frontend Build
cd ../frontend && npm run build
```

### GitHub Actions Pipeline
- **`pr.yml`**:
  - `migrations`: Validates `database/schema.sql` and migrations for forbidden destructive statements (`DROP DATABASE`, `TRUNCATE`) and balanced single quotes.
  - `concurrency`: Cancels stale runs with `group: pr-${{ github.ref }}`, `cancel-in-progress: true`.
  - `lint`: Ruff, Black, Mypy, ESLint.
  - `test-backend`: PostGIS container service running pytest.
  - `test-frontend`: Vitest + TypeScript compilation.
- **`deploy-staging.yml`**: Triggers on push to `main` and deploys to Railway staging.
- **`promote.yml`**: Manual workflow dispatch with version tag to deploy to Railway production.

---

## 5. Production Environment Variables Directory

All production variables are configured in the Railway dashboard or via CLI:

```bash
# Database
railway variables --set DATABASE_URL="postgresql://..."

# AI Assistant
railway variables --set MISTRAL_API_KEY="your-mistral-api-key"
railway variables --set MISTRAL_MODEL="mistral-tiny"

# Modal Cloud Secret (for Modal container DB connection)
modal secret create rich-db-secrets DATABASE_URL="postgresql://..."
```
