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

---

## 6. Frontend Build Gotchas

### MapLibre GL v6 + Vite: blank map (worker 404)

**Symptom:** `/planner` loads, the UI/stats render, but the map canvas is blank —
no parcels, no reference points. Browser console shows:

```
GET /assets/maplibre-gl-worker.mjs 404
Error: Worker failed to load. Check that the worker URL is correct.
```

**Cause:** `maplibre-gl` v6 resolves its web worker with a *dynamic* path
(`new URL('./maplibre-gl-worker.mjs', import.meta.url)`, see `dist/maplibre-gl.mjs`).
Vite cannot statically analyse that template, so it never emits the worker asset
into `dist/assets/`, and MapLibre refuses to render. The v6 worker also imports
`./maplibre-gl-shared.mjs`, so simply copying the worker file is not enough — it
is not self-contained.

**Fix (already applied):** bundle the worker ourselves and register its URL before
any map is created, via `frontend/src/utils/maplibreSetup.ts`:

```ts
import * as maplibregl from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
maplibregl.setWorkerUrl(maplibreWorkerUrl);
```

`main.tsx` imports `./utils/maplibreSetup` for its side effect so the single shared
maplibre module instance is configured for both the planner (`PlannerMapWorkspace.tsx`)
and `MapViewer.tsx`. After a build, `dist/assets/maplibre-gl-worker-*.js` must exist.

**Verify a fix:** `cd frontend && npm run build && ls dist/assets | grep worker`,
then load the page headless (Playwright) and assert there is no
"Worker failed to load" console error and no 404 on `maplibre-gl-worker-*.js`.

**Related traps**
- `.gitignore` has a Python `lib/` rule that silently swallows `frontend/src/lib/`.
  Keep frontend helper modules out of any `lib/` directory (use `src/utils/`).
- `frontend/node_modules` can lag the lockfile (e.g. maplibre 4.7.1 vs lock 6.11.2);
  run `npm install` before reproducing build issues, otherwise you test the wrong version.
- The app's `.env` `DATABASE_URL` password can be stale. Get a fresh one with
  `neonctl connection-string --project-id floral-union-19484203 --pooled` and strip
  `&channel_binding=require` (asyncpg rejects it).

### Global CSS trap: `overflow-hidden select-none` on `<body>`

`index.html` once put `overflow-hidden select-none` on `<body>`, which locks
page scroll **and** text selection on every route. That is only wanted for the
full-screen 3D impact viewer; the planner/landing are normal document-flow
pages and became unscrollable (very visible on mobile). Those classes now live
only on the impact viewer's own root (`App.tsx`), and `<body>` is unadorned.
When adding document-flow pages, never lock scroll/selection globally.

### Impact-view overlay zones (do not stack cards)

Overlays are absolutely positioned inside the map area, below the `h-14`
header. Keep them in these non-overlapping zones (verified at 1280 and 1024):
left rail `top-16 left-4 w-80` (Layer Panel then Impact Summary stacked; the
layer list scrolls internally via `max-h-[45vh]`), right stack `top-16 right-4`
(compass + telemetry), bottom-centre `bottom-10` (timeline) and `bottom-28`
(Active Parcels selector), bottom-right `bottom-10 right-4` (Parcel Dossier).
The timeline and quick-selector reserve `md:right-[26rem]` when a parcel is
selected so they never sit under the dossier (`reservedRight` prop /
`selectedParcel` check).

### MapLibre `isStyleLoaded()` race (silently missing layers)

`map.isStyleLoaded()` can return `false` even *after* the map's `load` event
has fired. The common guard
`if (map.isStyleLoaded()) { add() } else { map.once('load', add) }` then
never runs `add()` (the `load` event already passed), so the layer is never
added. In the impact viewer this silently dropped the reference-point,
deforestation-alert, EUDR-baseline and canopy/carbon layers. Treat the React
`mapLoaded` state (set inside `map.on('load')`) as authoritative:
`if (map.isStyleLoaded() || mapLoaded)` — in `MapViewer.tsx`.

### One categorical colour language

Subtype hues live in `AGROFORESTRY_SUBTYPE_COLORS` (`types/index.ts`) and are
shared by the map, legends, filter, chips and analytics. Validation is a
secondary channel — solid fill + dark outline (validated) vs a faded model
label (unvalidated) — never a replacement for the subtype hue, so a validated
Homegarden stays distinguishable from Shade cocoa. Read colour via
`subtypeColor(subtype)`, not `parcel.subtype_color` (which the demo data may
carry with a stale palette).

---

## 7. Synthetic / Demo Data Contract

All PoC data is synthetic and this is enforced by tests
(`backend/tests/test_geospatial.py::test_reference_point_corpus_is_honest`):

- **No institutional attribution.** Synthetic records must never name a real
  institution (CIFOR/ICRAF/GEDI/CERSGIS/Sentinel/GFW/…): use non-institutional
  synthetic source labels and names only.
- **Validation is allowed, but must be honestly labelled.** A synthetic record
  may carry a *demo* validation decision **only if** `validator_id` is one of
  the named synthetic demo validators (`...c0` community, `...e0` expert, `...d0`
  parcels) and a note says it is a synthetic demo, not field validation.
  `unvalidated` records must have no `validator_id`.
- **UI must show it.** Planner reference-point popups, the map legend, the
  validation inbox and the impact summary all state that validation is synthetic
  demo data.

Datasets live in `frontend/src/data/{allParcels,referencePoints,deforestationAlerts}.json`,
mirrored for the API in `data/{reference_points,deforestation_alerts}.json`.
Regenerate deterministically with:

```bash
.venv/bin/python scripts/enrich_demo_datapoints.py
# then apply to Neon:
.venv/bin/python scripts/seed_reference_points.py           # reference points
# parcels + reference-point provenance are also self-healed at startup by
# backend/app/core/demo_datapoint_seed.py (idempotent, stable-hash based).
```

The DB needs the synthetic demo validator rows to exist first (FK to `users`);
`demo_datapoint_seed._ensure_demo_users` creates them. `users.role` is checked
against `{guest, researcher, policy_maker, admin}`.

