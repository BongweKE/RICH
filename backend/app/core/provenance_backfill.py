"""Idempotent provenance backfill for pre-existing synthetic rows.

Production was seeded before the integrity overhaul (PR #7): parcel rows carry
fabricated institutional `source` names with NULL `data_origin`, and reference
points were seeded claiming `expert_reviewed` validation with quality scores
but no validator. Those claims are false for synthetic demo data and violate
the project rule "no output without provenance, no verdict without evidence".

This module runs once per startup after schema reconciliation and corrects
only rows that still carry the known-fabricated values. Human-recorded
decisions (validator_id set, or rows already honestly labelled) are never
touched. See docs/decisions/0003 for the migration pattern.
"""

import logging

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

logger = logging.getLogger(__name__)

HONEST_SOURCE = "Synthetic PoC generator (illustrative)"
HONEST_METHOD = "Procedural generator (synthetic demo corpus v2, no real-world data)"

FABRICATED_PARCEL_SOURCES = (
    "Copernicus Sentinel-2",
    "Sentinel-2 + Planet AlphaEarth",
    "GEDI Canopy LiDAR Validation",
    "Planet NICFI High-Resolution",
    "CIFOR Ground Truth Survey",
    "CERSGIS Sentinel-2 Classification",
    "IDEE Land Cover 2023",
    "SITEX Extremadura Geospatial",
    "Spanish Forest Inventory",
)

PARCEL_BACKFILL = f"""
UPDATE agroforestry_parcels
SET source = '{HONEST_SOURCE}',
    source_url = NULL,
    data_origin = 'synthetic',
    generation_method = '{HONEST_METHOD}',
    processing_method = NULL,
    model_version = NULL
WHERE source = ANY(:sources)
  AND validator_id IS NULL
"""

REFERENCE_POINT_BACKFILL = f"""
UPDATE land_cover_reference_points
SET source = '{HONEST_SOURCE}',
    source_url = NULL,
    data_origin = 'synthetic',
    generation_method = '{HONEST_METHOD}',
    quality_score = NULL,
    validation_status = 'unvalidated'
WHERE (validation_status IN ('expert_reviewed', 'community_validated', 'final')
       AND validator_id IS NULL)
   OR (source IS NOT NULL
       AND source <> '{HONEST_SOURCE}')
"""

PARCEL_SOURCE_BACKFILL_NULLS = f"""
UPDATE agroforestry_parcels
SET data_origin = 'synthetic',
    generation_method = COALESCE(generation_method, '{HONEST_METHOD}')
WHERE data_origin IS NULL
  AND validator_id IS NULL
"""


async def backfill_provenance(engine: AsyncEngine) -> None:
    """Correct fabricated provenance on synthetic rows. Never touches human decisions."""
    statements = [
        ("parcels_fabricated_sources", PARCEL_BACKFILL, {"sources": list(FABRICATED_PARCEL_SOURCES)}),
        ("parcels_null_data_origin", PARCEL_SOURCE_BACKFILL_NULLS, None),
        ("reference_points_fabricated_validation", REFERENCE_POINT_BACKFILL, None),
    ]
    try:
        async with engine.begin() as conn:
            for name, stmt, params in statements:
                result = await conn.execute(text(stmt), params or {})
                if result.rowcount:
                    logger.info("Provenance backfill '%s' updated %d rows.", name, result.rowcount)
        logger.info("Provenance backfill complete.")
    except Exception as e:
        logger.warning("Provenance backfill deferred (database not ready: %s)", e)
