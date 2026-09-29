"""Idempotent schema reconciliation for pre-existing databases.

`Base.metadata.create_all` only creates missing tables; it never alters
existing ones. This module runs ordered, idempotent ALTER TABLE / CREATE
INDEX statements at startup so environments created before a column was
introduced converge automatically. See docs/decisions/0003.

Rules:
- Every statement must be idempotent (IF NOT EXISTS).
- Never destructive: no DROP, no TRUNCATE, no type rewrites.
- Keep in sync with database/schema.sql (the canonical fresh schema).
"""

import logging
import uuid

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

logger = logging.getLogger(__name__)

UUID_DEFAULT = f"'{uuid.uuid5(uuid.NAMESPACE_URL, 'rich.poc.planner-demo-validator').hex}'"

COLUMN_MIGRATIONS: list[tuple[str, str, str]] = [
    ("land_cover_reference_points", "data_origin", "VARCHAR(30)"),
    ("land_cover_reference_points", "generation_method", "VARCHAR(255)"),
    ("land_cover_reference_points", "source", "VARCHAR(255)"),
    ("land_cover_reference_points", "source_url", "VARCHAR(512)"),
    ("agroforestry_parcels", "data_origin", "VARCHAR(30)"),
    ("agroforestry_parcels", "generation_method", "VARCHAR(255)"),
    ("agroforestry_parcels", "source_url", "VARCHAR(512)"),
    ("agroforestry_parcels", "validation_status", "VARCHAR(50) NOT NULL DEFAULT 'unvalidated'"),
    ("agroforestry_parcels", "validator_id", "UUID"),
    ("agroforestry_parcels", "validation_date", "TIMESTAMPTZ"),
    ("agroforestry_parcels", "validation_notes", "TEXT"),
]


async def reconcile_schema(engine: AsyncEngine) -> None:
    """Bring pre-existing tables up to date with the ORM models."""
    statements: list[str] = []
    for table, column, ddl in COLUMN_MIGRATIONS:
        statements.append(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {column} {ddl}")
    statements.append(
        "CREATE INDEX IF NOT EXISTS idx_parcels_validation_status " "ON agroforestry_parcels (validation_status)"
    )
    try:
        async with engine.begin() as conn:
            for stmt in statements:
                await conn.execute(text(stmt))
        logger.info("Schema reconciliation applied (%d statements).", len(statements))
    except Exception as e:
        logger.warning("Schema reconciliation deferred (database not ready: %s)", e)
