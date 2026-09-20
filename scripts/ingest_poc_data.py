#!/usr/bin/env python3
"""
RICH Proof of Concept Data Ingestion & Seed Script
Populates initial pilot jurisdictions, agroforestry parcels, reference points,
policy frameworks, and documents with PostGIS geometries and embeddings.

Pilot Areas:
1. Extremadura Dehesa (Spain) - Quercus silvopastoral agroforestry
2. Ashanti Cocoa Belt (Ghana) - Shade-grown cocoa agroforestry
3. Oromia / Jimma (Ethiopia) - Shade-grown coffee agroforestry
"""

import argparse
import asyncio
import logging
import os
import sys
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, cast

import numpy as np
from geoalchemy2.shape import from_shape
from shapely.geometry import Point, Polygon, mapping

# Add backend to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.core.config import settings
from app.core.database import async_session_maker, engine, init_db
from app.models import (
    AgroforestryParcel,
    DocumentCatalog,
    DocumentEmbedding,
    Jurisdiction,
    LandCoverReferencePoint,
    PolicyFramework,
)
from app.models.geospatial import AgroforestrySubtype, LandCoverClass, ValidationStatus

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("seed")


def generate_mock_embedding(dim: int, seed: int = 42) -> list[float]:
    """Generate normalized unit vector for mock embeddings"""
    rng = np.random.default_rng(seed)
    vec = rng.standard_normal(dim)
    norm = np.linalg.norm(vec)
    return (vec / (norm if norm > 0 else 1.0)).tolist()


# =============================================================================
# Pilot Jurisdictions Data
# =============================================================================
PILOT_JURISDICTIONS = [
    # Spain / Extremadura
    {
        "id": uuid.UUID("11111111-1111-4000-8000-000000000001"),
        "name": "Spain",
        "code": "ES",
        "level": 0,
        "parent_id": None,
        "area_km2": 505990.0,
        "polygon_coords": [[-9.3, 36.0], [3.3, 36.0], [3.3, 43.8], [-9.3, 43.8], [-9.3, 36.0]],
        "centroid_coords": [-3.7, 40.4],
        "metadata": {"region": "Southern Europe", "climate": "Mediterranean"},
    },
    {
        "id": uuid.UUID("11111111-1111-4000-8000-000000000002"),
        "name": "Extremadura",
        "code": "ES-EX",
        "level": 1,
        "parent_id": uuid.UUID("11111111-1111-4000-8000-000000000001"),
        "area_km2": 41634.0,
        "polygon_coords": [[-7.5, 38.0], [-5.0, 38.0], [-5.0, 40.5], [-7.5, 40.5], [-7.5, 38.0]],
        "centroid_coords": [-6.3, 39.2],
        "metadata": {"system": "Dehesa", "dominant_tree": "Quercus ilex / suber"},
    },
    # Ghana / Ashanti
    {
        "id": uuid.UUID("22222222-2222-4000-8000-000000000001"),
        "name": "Ghana",
        "code": "GH",
        "level": 0,
        "parent_id": None,
        "area_km2": 238535.0,
        "polygon_coords": [[-3.25, 4.73], [1.19, 4.73], [1.19, 11.17], [-3.25, 11.17], [-3.25, 4.73]],
        "centroid_coords": [-1.02, 7.94],
        "metadata": {"region": "West Africa", "climate": "Tropical Guinean"},
    },
    {
        "id": uuid.UUID("22222222-2222-4000-8000-000000000002"),
        "name": "Ashanti Region",
        "code": "GH-AH",
        "level": 1,
        "parent_id": uuid.UUID("22222222-2222-4000-8000-000000000001"),
        "area_km2": 24389.0,
        "polygon_coords": [[-2.4, 5.8], [-1.0, 5.8], [-1.0, 7.4], [-2.4, 7.4], [-2.4, 5.8]],
        "centroid_coords": [-1.6, 6.7],
        "metadata": {"system": "Shade Cocoa", "commodity": "Cocoa"},
    },
    # Ethiopia / Oromia
    {
        "id": uuid.UUID("33333333-3333-4000-8000-000000000001"),
        "name": "Ethiopia",
        "code": "ET",
        "level": 0,
        "parent_id": None,
        "area_km2": 1104300.0,
        "polygon_coords": [[33.0, 3.4], [48.0, 3.4], [48.0, 15.0], [33.0, 15.0], [33.0, 3.4]],
        "centroid_coords": [38.7, 9.0],
        "metadata": {"region": "East Africa", "climate": "Highland Tropical"},
    },
    {
        "id": uuid.UUID("33333333-3333-4000-8000-000000000002"),
        "name": "Oromia Region",
        "code": "ET-OR",
        "level": 1,
        "parent_id": uuid.UUID("33333333-3333-4000-8000-000000000001"),
        "area_km2": 284538.0,
        "polygon_coords": [[35.0, 6.5], [39.5, 6.5], [39.5, 9.5], [35.0, 9.5], [35.0, 6.5]],
        "centroid_coords": [36.8, 7.7],
        "metadata": {"system": "Shade Coffee", "zone": "Jimma"},
    },
]


# =============================================================================
# Pilot Agroforestry Parcels Data
# =============================================================================
PILOT_PARCELS = [
    # Extremadura Dehesa Parcels
    {
        "id": uuid.UUID("44444444-4444-4000-8000-000000000001"),
        "jurisdiction_id": uuid.UUID("11111111-1111-4000-8000-000000000002"),
        "class_label": LandCoverClass.AGROFORESTRY,
        "agroforestry_subtype": AgroforestrySubtype.DEHESA,
        "confidence_score": 0.96,
        "area_ha": 48.5,
        "uncertainty": 0.04,
        "coords": [[-6.45, 39.30], [-6.42, 39.30], [-6.42, 39.33], [-6.45, 39.33], [-6.45, 39.30]],
        "source": "Sentinel-2 + Planet AlphaEarth",
        "source_year": 2023,
    },
    {
        "id": uuid.UUID("44444444-4444-4000-8000-000000000002"),
        "jurisdiction_id": uuid.UUID("11111111-1111-4000-8000-000000000002"),
        "class_label": LandCoverClass.AGROFORESTRY,
        "agroforestry_subtype": AgroforestrySubtype.DEHESA,
        "confidence_score": 0.92,
        "area_ha": 72.3,
        "uncertainty": 0.06,
        "coords": [[-6.38, 39.25], [-6.34, 39.25], [-6.34, 39.29], [-6.38, 39.29], [-6.38, 39.25]],
        "source": "Sentinel-2 + Planet AlphaEarth",
        "source_year": 2023,
    },
    # Ashanti Cocoa Parcels
    {
        "id": uuid.UUID("55555555-5555-4000-8000-000000000001"),
        "jurisdiction_id": uuid.UUID("22222222-2222-4000-8000-000000000002"),
        "class_label": LandCoverClass.AGROFORESTRY,
        "agroforestry_subtype": AgroforestrySubtype.SHADE_COCOA,
        "confidence_score": 0.89,
        "area_ha": 14.2,
        "uncertainty": 0.08,
        "coords": [[-1.75, 6.65], [-1.73, 6.65], [-1.73, 6.67], [-1.75, 6.67], [-1.75, 6.65]],
        "source": "Sentinel-2 + GEDI Canopy",
        "source_year": 2022,
    },
    {
        "id": uuid.UUID("55555555-5555-4000-8000-000000000002"),
        "jurisdiction_id": uuid.UUID("22222222-2222-4000-8000-000000000002"),
        "class_label": LandCoverClass.AGROFORESTRY,
        "agroforestry_subtype": AgroforestrySubtype.SHADE_COCOA,
        "confidence_score": 0.94,
        "area_ha": 28.6,
        "uncertainty": 0.05,
        "coords": [[-1.68, 6.58], [-1.65, 6.58], [-1.65, 6.61], [-1.68, 6.61], [-1.68, 6.58]],
        "source": "Sentinel-2 + GEDI Canopy",
        "source_year": 2022,
    },
    # Ethiopia Coffee Parcels
    {
        "id": uuid.UUID("66666666-6666-4000-8000-000000000001"),
        "jurisdiction_id": uuid.UUID("33333333-3333-4000-8000-000000000002"),
        "class_label": LandCoverClass.AGROFORESTRY,
        "agroforestry_subtype": AgroforestrySubtype.SHADE_COFFEE,
        "confidence_score": 0.91,
        "area_ha": 18.0,
        "uncertainty": 0.07,
        "coords": [[36.80, 7.65], [36.83, 7.65], [36.83, 7.68], [36.80, 7.68], [36.80, 7.65]],
        "source": "Sentinel-2 + CIFOR-ICRAF Ground",
        "source_year": 2023,
    },
]


# =============================================================================
# Policy Frameworks
# =============================================================================
POLICY_FRAMEWORKS = [
    {
        "id": uuid.UUID("77777777-7777-4000-8000-000000000001"),
        "name": "EU Deforestation Regulation (EUDR)",
        "code": "EUDR",
        "description": "Regulation (EU) 2023/1115 ensuring commodities imported into the EU are deforestation-free post Dec 31, 2020.",
        "jurisdiction_ids": [],
        "requirements": {
            "cutoff_date": "2020-12-31",
            "geolocation_required": True,
            "polygon_threshold_ha": 4.0,
            "commodities": ["cocoa", "coffee", "oil palm", "cattle", "soy", "wood", "rubber"],
        },
        "metadata": {"effective_date": "2024-12-30", "compliance_tier": "mandatory"},
    },
    {
        "id": uuid.UUID("77777777-7777-4000-8000-000000000002"),
        "name": "REDD+ MRV Standards",
        "code": "REDD_PLUS",
        "description": "UNFCCC guidance for measuring, reporting, and verifying forest carbon emissions and removals.",
        "jurisdiction_ids": [
            uuid.UUID("22222222-2222-4000-8000-000000000001"),
            uuid.UUID("33333333-3333-4000-8000-000000000001"),
        ],
        "requirements": {
            "reference_level_years": 10,
            "carbon_pools": ["AGB", "BGB", "SOC"],
            "uncertainty_threshold_pct": 15.0,
        },
        "metadata": {"unfccc_guidance": "Warsaw Framework"},
    },
    {
        "id": uuid.UUID("77777777-7777-4000-8000-000000000003"),
        "name": "Nationally Determined Contributions (NDC) - AFOLU",
        "code": "NDC_AFOLU",
        "description": "National emission reduction commitments in Agriculture, Forestry, and Other Land Use.",
        "jurisdiction_ids": [],
        "requirements": {"target_horizon": 2030, "agroforestry_expansion_target_pct": 25.0},
        "metadata": {"agreement": "Paris Agreement"},
    },
]


# =============================================================================
# Document Catalog Data
# =============================================================================
DOCUMENTS: List[Dict[str, Any]] = [
    {
        "id": uuid.UUID("88888888-8888-4000-8000-000000000001"),
        "title": "Mapping Agroforestry Systems in Tropical Africa using Multitemporal Sentinel-1 and Sentinel-2 Imagery",
        "authors": ["Bongwe, K.", "van Noordwijk, M.", "Asante, W."],
        "publication_year": 2024,
        "topic_keywords": ["agroforestry", "sentinel-2", "shade cocoa", "machine learning", "remote sensing"],
        "source": "Remote Sensing of Environment",
        "doi": "10.1016/j.rse.2024.113000",
        "chunks": [
            "Agroforestry systems in West Africa, particularly shaded cocoa mosaics, represent substantial carbon reservoirs and biodiversity refugia. However, standard global land cover products consistently misclassify multi-strata agroforests as either undifferentiated cropland or degraded secondary forest.",
            "Integrating Sentinel-1 C-band synthetic aperture radar (SAR) texture metrics with Sentinel-2 red-edge vegetation indices allows precise differentiation between mono-crop sun cocoa and high-shade multi-strata agroforests, achieving validation accuracy above 91% in Ashanti.",
        ],
    },
    {
        "id": uuid.UUID("88888888-8888-4000-8000-000000000002"),
        "title": "LUMENS Guidelines for Landscape-Scale Multi-Environmental Services Trade-Off Analysis",
        "authors": ["Dewi, S.", "Ekadinata, A.", "Johana, F."],
        "publication_year": 2023,
        "topic_keywords": ["LUMENS", "Pre-QuES", "QUES-C", "QUES-B", "carbon stock", "trade-off analysis"],
        "source": "World Agroforestry (ICRAF)",
        "doi": "10.5716/WP23012.PDF",
        "chunks": [
            "Pre-QuES provides quantitative historical transition matrices of land use trajectories, tracking persistence, gross gains, and gross losses per discrete cover category over distinct observation epochs.",
            "The QUES-C module calculates net carbon dioxide equivalent fluxes by applying Tier 2 emission factors across landscape change vectors, isolating high-impact deforestation frontiers from carbon-accreting agroforestry corridors.",
        ],
    },
]


async def seed(dry_run: bool = False):
    """Seed the database with proof-of-concept dataset"""
    ref_points = [
        {
            "pt": [-6.43, 39.31],
            "class": LandCoverClass.AGROFORESTRY,
            "sub": AgroforestrySubtype.DEHESA,
            "jid": uuid.UUID("11111111-1111-4000-8000-000000000002"),
        },
        {
            "pt": [-1.74, 6.66],
            "class": LandCoverClass.AGROFORESTRY,
            "sub": AgroforestrySubtype.SHADE_COCOA,
            "jid": uuid.UUID("22222222-2222-4000-8000-000000000002"),
        },
        {
            "pt": [36.81, 7.66],
            "class": LandCoverClass.AGROFORESTRY,
            "sub": AgroforestrySubtype.SHADE_COFFEE,
            "jid": uuid.UUID("33333333-3333-4000-8000-000000000002"),
        },
    ]

    if dry_run:
        logger.info("[Dry Run] Validating seed dataset schema and geometries in memory...")
        for j in PILOT_JURISDICTIONS:
            poly = Polygon(j["polygon_coords"])
            assert poly.is_valid, f"Invalid polygon for {j['name']}"
        for p in PILOT_PARCELS:
            poly = Polygon(p["coords"])
            assert poly.is_valid, f"Invalid polygon for parcel {p['id']}"
        for r in ref_points:
            pt = Point(r["pt"])
            assert pt.is_valid
        logger.info(
            f"[Dry Run] Validation succeeded: {len(PILOT_JURISDICTIONS)} jurisdictions, "
            f"{len(PILOT_PARCELS)} parcels, {len(ref_points)} reference points, "
            f"{len(POLICY_FRAMEWORKS)} policy frameworks, {len(DOCUMENTS)} documents verified."
        )
        return

    logger.info("Testing database connection...")
    try:
        async with engine.connect():
            pass
    except Exception as e:
        logger.warning(
            f"Database connection to {settings.DATABASE_URL} failed ({e}). "
            "Running memory validation mode instead of full insertion."
        )
        await seed(dry_run=True)
        return

    try:
        await init_db()
    except Exception as e:
        logger.warning(f"Note on init_db: {e}. Proceeding with session execution.")

    async with async_session_maker() as db:
        # 1. Jurisdictions
        logger.info("Seeding jurisdictions...")
        for j_data in PILOT_JURISDICTIONS:
            existing = await db.get(Jurisdiction, j_data["id"])
            if not existing:
                poly = Polygon(j_data["polygon_coords"])
                pt = Point(j_data["centroid_coords"])
                jurisdiction = Jurisdiction(
                    id=j_data["id"],
                    name=j_data["name"],
                    code=j_data["code"],
                    level=j_data["level"],
                    parent_id=j_data["parent_id"],
                    geometry=from_shape(poly, srid=4326),
                    centroid=from_shape(pt, srid=4326),
                    area_km2=j_data["area_km2"],
                    metadata_=j_data["metadata"],
                )
                db.add(jurisdiction)
        await db.commit()
        logger.info("Jurisdictions seeded successfully.")

        # 2. Agroforestry Parcels
        logger.info("Seeding agroforestry parcels...")
        for p_data in PILOT_PARCELS:
            existing = await db.get(AgroforestryParcel, p_data["id"])
            if not existing:
                poly = Polygon(p_data["coords"])
                embed = generate_mock_embedding(64, seed=hash(str(p_data["id"])) % 10000)
                parcel = AgroforestryParcel(
                    id=p_data["id"],
                    jurisdiction_id=p_data["jurisdiction_id"],
                    geometry=from_shape(poly, srid=4326),
                    class_label=p_data["class_label"],
                    agroforestry_subtype=p_data["agroforestry_subtype"],
                    confidence_score=p_data["confidence_score"],
                    area_ha=p_data["area_ha"],
                    uncertainty=p_data["uncertainty"],
                    geospatial_embedding=embed,
                    source=p_data["source"],
                    source_year=p_data["source_year"],
                )
                db.add(parcel)
        await db.commit()
        logger.info("Agroforestry parcels seeded successfully.")

        # 3. Reference Points
        logger.info("Seeding land cover reference points...")
        for i, ref in enumerate(ref_points):
            pt = Point(ref["pt"])
            rp = LandCoverReferencePoint(
                jurisdiction_id=ref["jid"],
                geometry=from_shape(pt, srid=4326),
                class_label=ref["class"],
                agroforestry_subtype=ref["sub"],
                validation_status=ValidationStatus.EXPERT_REVIEWED,
                quality_score=0.95,
                geospatial_embedding=generate_mock_embedding(64, seed=i + 10),
                document_embedding=generate_mock_embedding(384, seed=i + 20),
                metadata_={"collector": "CIFOR-ICRAF Field Team", "date": "2023-11-15"},
            )
            db.add(rp)
        await db.commit()
        logger.info("Reference points seeded.")

        # 4. Policy Frameworks
        logger.info("Seeding policy frameworks...")
        for fw_data in POLICY_FRAMEWORKS:
            existing = await db.get(PolicyFramework, fw_data["id"])
            if not existing:
                fw = PolicyFramework(
                    id=fw_data["id"],
                    name=fw_data["name"],
                    code=fw_data["code"],
                    description=fw_data["description"],
                    jurisdiction_ids=fw_data["jurisdiction_ids"],
                    requirements=fw_data["requirements"],
                    metadata_=fw_data["metadata"],
                )
                db.add(fw)
        await db.commit()
        logger.info("Policy frameworks seeded.")

        # 5. Documents & Embeddings
        logger.info("Seeding document catalog and embeddings...")
        for doc_data in DOCUMENTS:
            existing = await db.get(DocumentCatalog, doc_data["id"])
            if not existing:
                doc = DocumentCatalog(
                    id=doc_data["id"],
                    title=doc_data["title"],
                    authors=doc_data["authors"],
                    publication_year=doc_data["publication_year"],
                    topic_keywords=doc_data["topic_keywords"],
                    source=doc_data["source"],
                    doi=doc_data["doi"],
                )
                db.add(doc)
                await db.flush()

                for c_idx, chunk in enumerate(cast(List[str], doc_data["chunks"])):
                    chunk_embed = generate_mock_embedding(384, seed=hash(chunk) % 10000)
                    emb = DocumentEmbedding(
                        document_id=doc.id,
                        chunk_text=chunk,
                        chunk_index=c_idx,
                        embedding=chunk_embed,
                        metadata_={"section": "Abstract & Findings"},
                    )
                    db.add(emb)
        await db.commit()
        logger.info("Document catalog and embeddings seeded.")

    await engine.dispose()
    logger.info("Proof of Concept Data Pipeline complete!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest POC Pilot Datasets")
    parser.add_argument("--dry-run", action="store_true", help="Validate data in-memory without database connection")
    args = parser.parse_args()
    asyncio.run(seed(dry_run=args.dry_run))
