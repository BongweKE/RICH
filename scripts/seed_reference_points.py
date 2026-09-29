#!/usr/bin/env python3
"""
Seed 23 ground truth reference points from referencePoints.json into Neon PostGIS.
"""

import asyncio
import json
import logging
import os
import uuid
from pathlib import Path

import asyncpg
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("seed_reference_points")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL", "")
REF_POINTS_PATH = PROJECT_ROOT / "frontend" / "src" / "data" / "referencePoints.json"

JURISDICTION_CODE_TO_ID: dict[str, str] = {
    "GH-AH": "22222222-2222-4000-8000-000000000002",
    "ET-OR": "33333333-3333-4000-8000-000000000002",
    "ES-EX": "11111111-1111-4000-8000-000000000002",
}


async def seed():
    if not DATABASE_URL:
        logger.error("DATABASE_URL not set!")
        return

    with open(REF_POINTS_PATH) as f:
        points = json.load(f)

    logger.info(f"Loaded {len(points)} reference points from {REF_POINTS_PATH}")

    # Normalize url for asyncpg
    url = DATABASE_URL
    if url.startswith("postgresql+asyncpg://"):
        url = url.replace("postgresql+asyncpg://", "postgresql://", 1)

    conn = await asyncpg.connect(url)
    try:
        inserted = 0
        for p in points:
            str_id = p["id"]
            point_uuid = uuid.uuid5(uuid.NAMESPACE_DNS, str_id)
            j_code = p.get("jurisdiction_code", "GH-AH")
            j_id = JURISDICTION_CODE_TO_ID.get(j_code)
            if not j_id:
                logger.warning(f"Unknown jurisdiction {j_code}, skipping {str_id}")
                continue

            coords = p["geometry"]["coordinates"]
            lon, lat = coords[0], coords[1]

            metadata = json.dumps(
                {
                    "name": p.get("name"),
                    "source": p.get("source"),
                    "canopy_cover_pct": p.get("canopy_cover_pct"),
                    "ref_id": str_id,
                }
            )

            query = """
            INSERT INTO land_cover_reference_points (
                id, jurisdiction_id, geometry, class_label, agroforestry_subtype,
                validation_status, quality_score, metadata
            ) VALUES (
                $1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5::land_cover_class,
                $6::agroforestry_subtype, $7::validation_status, $8, $9::jsonb
            )
            ON CONFLICT (id) DO UPDATE SET
                jurisdiction_id = EXCLUDED.jurisdiction_id,
                geometry = EXCLUDED.geometry,
                class_label = EXCLUDED.class_label,
                agroforestry_subtype = EXCLUDED.agroforestry_subtype,
                validation_status = EXCLUDED.validation_status,
                quality_score = EXCLUDED.quality_score,
                metadata = EXCLUDED.metadata,
                updated_at = NOW();
            """
            VALID_SUBTYPES = {
                "dehesa",
                "montado",
                "silvopasture",
                "shade_coffee",
                "shade_cocoa",
                "alley_cropping",
                "parkland",
                "homegarden",
                "forest_farming",
                "woodlot",
                "other",
            }
            raw_subtype = p.get("agroforestry_subtype", "other")
            enum_subtype = raw_subtype if raw_subtype in VALID_SUBTYPES else "other"

            await conn.execute(
                query,
                point_uuid,
                uuid.UUID(j_id),
                lon,
                lat,
                p.get("class_label", "agroforestry"),
                enum_subtype,
                p.get("validation_status", "expert_reviewed"),
                float(p.get("quality_score", 0.9)),
                metadata,
            )
            inserted += 1

        logger.info(f"Successfully seeded/updated {inserted} reference points in Neon PostGIS.")

        total = await conn.fetchval("SELECT count(*) FROM land_cover_reference_points")
        logger.info(f"Total reference points in DB now: {total}")
    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(seed())
