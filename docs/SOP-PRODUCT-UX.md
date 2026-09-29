# SOP — Product UX changes in the RICH PoC

Audience: any engineer or agent making UI/UX or data changes to this repo.

## 1. Ground rules (read before touching UI)

1. **Two audiences, two surfaces.** The planner (`/planner`) serves field
   planners on mid-range mobile devices and intermittent 3G. The impact
   viewer (`/impact`) serves evaluators on desktop. Every UI decision must
   state which audience it serves. Do not port planner patterns into the
   impact viewer or vice versa without an ADR note.
2. **`/` stays light.** The landing page must never import the map stack.
   Feature cards carry honest load-cost labels (e.g. "Lightweight 2D map ·
   works on 3G"). Update these labels when bundle size materially changes.
3. **No output without provenance, no verdict without evidence.** Any new
   panel, popup, or export must show data origin (`data_origin`) and label
   synthetic demo content as such. Compliance UI must surface
   `assessment_status`, never a bare compliant/non-compliant boolean.
4. **Mobile first on planner surfaces.** Test at 360×640. Touch targets ≥ 36px
   tall. Actions that hit the network must show inline state
   (saving/saved/failed + retry), because connectivity windows are short.

## 2. Validation inbox workflow

- Paginate at **10 per page** (`PAGE_SIZE` in `PlannerApp.tsx`). The queue is
  any parcel whose `validation_status` is not human-reviewed.
- Every decision calls `POST /api/geospatial/parcels/{id}/validate`
  immediately; never batch. Show per-row status. On failure offer Retry and
  keep the row in the queue.
- Never fabricate a validator. The endpoint stamps the authenticated user id
  when present; anonymous decisions persist without one.

## 3. Adding a backend-visible schema change

1. Add the column to the SQLAlchemy model **and** `database/schema.sql`.
2. Add an entry to `COLUMN_MIGRATIONS` in
   `backend/app/core/schema_migrations.py` (idempotent, non-destructive).
   `create_all` does NOT alter existing tables — production relies on the
   reconciliation list (ADR 0003).
3. Extend `test_schema_reconciliation_covers_orm_columns` if you add a new
   table to the covered set.
4. Run `bash scripts/check-migrations.sh`.

## 4. Verification checklist (before every PR)

- [ ] `cd backend && ../.venv/bin/python -m pytest tests/` — all pass
- [ ] `cd frontend && npm run build` — no TS errors
- [ ] `../.venv/bin/ruff check .` and `../.venv/bin/black --check .` from root
- [ ] `../.venv/bin/mypy backend/app --ignore-missing-imports` — 0 errors
- [ ] `bash scripts/check-adrs.sh` — new decisions have an ADR in
      `docs/decisions/NNNN-title.md`
- [ ] PR title matches Conventional Commits
- [ ] Smoke the live deploy: `/api/health`, `/api/geospatial/parcels?limit=1`,
      planner route, landing route

## 5. Live-deploy smoke script

```bash
python3 - <<'EOF'
import urllib.request, json
base = 'https://rich-production-d1d3.up.railway.app'
def get(p):
    with urllib.request.urlopen(base + p, timeout=20) as r:
        return json.loads(r.read())
print('health:', get('/api/health')['status'])
d = get('/api/geospatial/parcels?limit=100')
parcels = (d.get('parcels') or d)
nulls = [x for x in parcels if not x.get('data_origin')]
assert not nulls, str(len(nulls)) + ' parcels missing data_origin - provenance backfill incomplete'
print('provenance OK: ' + str(len(parcels)) + ' sampled parcels all carry data_origin')
EOF
```
