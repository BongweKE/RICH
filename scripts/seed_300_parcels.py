#!/usr/bin/env python3
"""
Seed 300 agroforestry parcels from all_300.geojson into the Neon PostGIS database.

Uses asyncpg (direct SQL) for simplicity and performance.
Batches inserts in groups of 50 and skips duplicates via ON CONFLICT DO NOTHING.
"""

import asyncio
import json
import logging
import os
import sys
import uuid
from pathlib import Path

import asyncpg
import numpy as np
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("seed_300")

# Load .env from project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL", "")
GEOJSON_PATH = PROJECT_ROOT / "data" / "all_300.geojson"

# Map jurisdiction_code → jurisdiction UUID (from ingest_poc_data.py)
JURISDICTION_CODE_TO_ID: dict[str, str] = {
    "GH-AH": "22222222-2222-4000-8000-000000000002",
    "ET-OR": "33333333-3333-4000-8000-000000000002",
    "ES-EX": "11111111-1111-4000-8000-000000000002",
}

BATCH_SIZE = 50


def generate_mock_embedding(dim: int = 64, seed: int = 42) -> list[float]:
    """Generate normalized unit vector for mock embeddings"""
    rng = np.random.default_rng(seed)
    vec = rng.standard_normal(dim)
    norm = np.linalg.norm(vec)
    return (vec / (norm if norm > 0 else 1.0)).tolist()


def geojson_to_wkt(geometry: dict) -> str:
    """Convert a GeoJSON Polygon geometry dict to WKT string"""
    if geometry["type"] != "Polygon":
        raise ValueError(f"Unsupported geometry type: {geometry['type']}")
    rings = geometry["coordinates"]
    ring_strs = []
    for ring in rings:
        coord_str = ", ".join(f"{lon} {lat}" for lon, lat in ring)
        ring_strs.append(f"({coord_str})")
    return f"POLYGON({', '.join(ring_strs)})"


async def get_jurisdiction_id_map(conn: asyncpg.Connection) -> dict[str, str]:
    """
    Fetch jurisdiction IDs from DB by code, so we always use the canonical DB values.
    Falls back to the static map if not found.
    """
    rows = await conn.fetch(
        "SELECT code, id::text FROM jurisdictions WHERE code = ANY($1::text[])", list(JURISDICTION_CODE_TO_ID.keys())
    )
    db_map = {row["code"]: row["id"] for row in rows}
    # Merge: prefer DB values, fallback to hardcoded
    merged = dict(JURISDICTION_CODE_TO_ID)
    merged.update(db_map)
    logger.info(f"Jurisdiction map: {merged}")
    return merged


async def seed_parcels(
    conn: asyncpg.Connection, features: list[dict], jurisdiction_map: dict[str, str]
) -> tuple[int, int]:
    """
    Insert parcels in batches of BATCH_SIZE.
    Returns (inserted_count, skipped_count).
    """
    inserted = 0
    skipped = 0
    errors = 0

    total = len(features)
    for batch_start in range(0, total, BATCH_SIZE):
        batch = features[batch_start : batch_start + BATCH_SIZE]
        logger.info(
            f"Processing batch {batch_start // BATCH_SIZE + 1} "
            f"(parcels {batch_start + 1}–{min(batch_start + BATCH_SIZE, total)} of {total})"
        )

        for feature in batch:
            props = feature.get("properties", {})
            geometry = feature.get("geometry")

            if not geometry:
                logger.warning(f"Feature missing geometry, skipping: {props.get('id')}")
                skipped += 1
                continue

            jcode = props.get("jurisdiction_code", "")
            jid = jurisdiction_map.get(jcode)
            if not jid:
                logger.warning(f"Unknown jurisdiction_code '{jcode}' for parcel {props.get('id')}, skipping.")
                skipped += 1
                continue

            try:
                wkt = geojson_to_wkt(geometry)
            except Exception as e:
                logger.warning(f"Bad geometry for parcel {props.get('id')}: {e}, skipping.")
                skipped += 1
                continue

            parcel_id = props.get("id") or str(uuid.uuid4())
            embedding = generate_mock_embedding(64, seed=abs(hash(parcel_id)) % 100_000)

            try:
                result = await conn.execute(
                    """
                    INSERT INTO agroforestry_parcels (
                        id,
                        jurisdiction_id,
                        geometry,
                        class_label,
                        agroforestry_subtype,
                        confidence_score,
                        area_ha,
                        uncertainty,
                        source,
                        source_year,
                        source_url,
                        processing_method,
                        model_version,
                        geospatial_embedding
                    ) VALUES (
                        $1::uuid,
                        $2::uuid,
                        ST_GeomFromText($3, 4326),
                        $4::land_cover_class,
                        $5::agroforestry_subtype,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13,
                        $14::vector
                    )
                    ON CONFLICT (id) DO NOTHING
                    """,
                    parcel_id,
                    jid,
                    wkt,
                    props.get("class_label", "agroforestry"),
                    props.get("agroforestry_subtype"),
                    float(props.get("confidence_score", 0.0)),
                    float(props.get("area_ha", 0.0)),
                    float(props.get("uncertainty", 0.0)),
                    props.get("source"),
                    int(props.get("source_year", 2023)),
                    props.get("source_url"),
                    props.get("processing_method"),
                    props.get("model_version"),
                    str(embedding),  # asyncpg sends as text, pgvector accepts '[...]' format
                )
                # result is "INSERT 0 N" string; N=0 means conflict/skip, N=1 means inserted
                n_inserted = int(result.split()[-1])
                if n_inserted == 1:
                    inserted += 1
                else:
                    skipped += 1
            except Exception as e:
                logger.error(f"Error inserting parcel {parcel_id}: {e}")
                errors += 1

        logger.info(f"Batch done. Running totals → inserted={inserted}, skipped={skipped}, errors={errors}")

    return inserted, skipped


async def main() -> None:
    if not DATABASE_URL:
        logger.error("DATABASE_URL not set. Aborting.")
        sys.exit(1)

    if not GEOJSON_PATH.exists():
        logger.error(f"GeoJSON not found at {GEOJSON_PATH}. Aborting.")
        sys.exit(1)

    logger.info(f"Loading parcels from {GEOJSON_PATH} ...")
    with open(GEOJSON_PATH, "r") as f:
        data = json.load(f)

    features: list[dict] = data.get("features", [])
    logger.info(f"Loaded {len(features)} features from GeoJSON.")

    # asyncpg requires postgresql:// not postgresql+asyncpg://
    db_url = DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

    logger.info("Connecting to Neon PostGIS database ...")
    conn: asyncpg.Connection = await asyncpg.connect(db_url)

    try:
        # Verify pgvector extension is active
        await conn.execute("SET search_path TO public")

        # Fetch jurisdiction map from DB
        jmap = await get_jurisdiction_id_map(conn)

        # Run current count before
        count_before = await conn.fetchval("SELECT COUNT(*) FROM agroforestry_parcels")
        logger.info(f"Parcel count BEFORE seeding: {count_before}")

        inserted, skipped = await seed_parcels(conn, features, jmap)

        count_after = await conn.fetchval("SELECT COUNT(*) FROM agroforestry_parcels")
        logger.info("=" * 60)
        logger.info("Seeding complete!")
        logger.info(f"  Parcel count BEFORE: {count_before}")
        logger.info(f"  Parcel count AFTER:  {count_after}")
        logger.info(f"  Newly inserted:      {inserted}")
        logger.info(f"  Skipped (conflicts): {skipped}")
        logger.info("=" * 60)

    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
