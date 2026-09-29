# 3. Idempotent Startup Schema Reconciliation

Date: 2026-09-29

## Status

Accepted

## Context

PR #7 added `data_origin`, `generation_method`, and `source_url` columns to the
SQLAlchemy models and `database/schema.sql`, but the production database was
created before those columns existed. `Base.metadata.create_all` only issues
`CREATE TABLE IF NOT EXISTS`; it never alters existing tables. The result was
an HTTP 500 on `/api/geospatial/parcels` in production (issue #8) while local
and CI environments (fresh databases) passed every test. The frontend's static
JSON fallback masked the outage, hiding the breakage from us.

A full Alembic adoption is the long-term answer, but the RICH PoC deploys via
Railway with a single `uvicorn` start command and no migration step in the
deploy pipeline.

## Decision

1. Add a small, ordered, idempotent reconciliation script
   (`backend/app/core/schema_migrations.py`) that runs `ALTER TABLE ... ADD
   COLUMN IF NOT EXISTS` statements inside `init_db()` immediately after
   `create_all`. Each entry is (table, column, DDL type) plus optional index
   creation using `CREATE INDEX IF NOT EXISTS`.
2. Keep `database/schema.sql` as the canonical fresh-install schema; the
   reconciliation list must stay in sync with it. A unit test asserts that
   every column present on the ORM models for our two geospatial tables is
   either covered by the reconciliation list or pre-existing in the original
   schema, preventing silent drift.
3. Validation audit columns (`validation_status`, `validator_id`,
   `validation_date` on `agroforestry_parcels`) are added through the same
   mechanism so planner validation decisions can be persisted immediately
   (issue #9).
4. New tables continue to come from `create_all`; new columns on existing
   tables must go through the reconciliation list. When the project adopts
   Alembic, the list becomes the seed of the first revision.

## Consequences

- Production self-heals on the next deploy without a manual SQL session.
- Every migration statement must be idempotent (IF NOT EXISTS) and
  non-destructive; `scripts/check-migrations.sh` continues to forbid
  destructive statements in SQL files.
- The reconciliation list is intentionally tiny and reviewed like migrations:
  additions require an ADR reference in the PR description.
