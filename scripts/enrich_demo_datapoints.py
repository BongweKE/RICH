#!/usr/bin/env python3
"""Deterministically enrich the synthetic PoC demo datasets.

The PoC ships three synthetic datasets under ``frontend/src/data`` (parcels,
ground reference points, deforestation alerts). The parcels lacked any
provenance (validation status / validator / dates), the reference points were
thin and all unvalidated, and the alerts had little status variety — which
made several UI features impossible to exercise (provenance legend, validation
inbox, "human-validated" counters, provenance dossiers, alert triage).

This script enriches those datasets in place:

* parcels   — provenance (validation status, synthetic validator identity,
              validation date/notes) plus a little regional agroforestry-subtype
              variety so the planner's subtype filter has more to show.
* reference — provenance (validation, quality score, source variety) and a
  points      denser set of synthetic sites per landscape.
* alerts    — honest triage status / sensor variety and a denser set.

Every derived value is a stable hash of the record id, so re-running the script
is idempotent (identical output). Nothing here is real-world data: provenance
is explicitly attributed to named *synthetic demo* validators, exactly like the
backend's startup seed.

Usage:
    python scripts/enrich_demo_datapoints.py
"""

from __future__ import annotations

import hashlib
import json
import random
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRONTEND_DATA = ROOT / "frontend" / "src" / "data"
API_DATA = ROOT / "data"

# Named, honest synthetic validators (distinct identities for the two review tiers).
COMMUNITY_VALIDATOR_ID = "00000000-0000-4000-8000-0000000000c0"
EXPERT_VALIDATOR_ID = "00000000-0000-4000-8000-0000000000e0"
COMMUNITY_NOTE = "Synthetic demo decision (community review tier) seeded for PoC — not field validation"
EXPERT_NOTE = "Synthetic demo decision (expert review tier) seeded for PoC — not field validation"
UNVALIDATED = "unvalidated"
EPOCH = datetime(2025, 1, 1, tzinfo=timezone.utc)

# Institutional names must never appear on synthetic records (mirrors the
# backend's INSTITUTIONAL_SOURCE_PATTERN honesty guard).
INSTITUTIONAL_NAME = re.compile(
    r"(cifor|icraf|gedi|cersgis|planet\s+nicfi|spanish\s+forest\s+inventory|"
    r"copernicus|sentinel|esa\s+worldcover|global\s+forest\s+watch|gfw)",
    re.IGNORECASE,
)

SUBTYPE_COLORS = {
    "shade_cocoa": "#1f8a70",
    "shade_coffee": "#2d9d78",
    "alley_cropping": "#4a905d",
    "dehesa": "#827b3d",
    "montado": "#8a7a36",
    "silvopasture": "#918242",
    "parkland": "#5e8c61",
    "homegarden": "#3a7d44",
    "forest_farming": "#52b788",
    "woodlot": "#756bb1",
    "boundary_planting": "#2a6f3b",
    "default": "#10b981",
}

# Secondary subtypes that are agronomically plausible for each landscape, used
# to widen the filter/legend without inventing implausible mixes.
SECONDARY_SUBTYPES = {
    "GH-AH": ["shade_coffee", "forest_farming", "homegarden", "parkland", "woodlot"],
    "ET-OR": ["homegarden", "alley_cropping", "parkland", "shade_coffee"],
    "ES-EX": ["parkland", "alley_cropping", "silvopasture", "dehesa"],
}

# Deliberately non-institutional, explicitly synthetic provenance labels so the
# corpus never implies a real institution collected the data.
REFERENCE_SOURCES = [
    "Synthetic PoC generator (illustrative)",
    "Synthetic community monitoring sample",
    "Synthetic extension survey sample",
    "Synthetic open-data sample",
]
REFERENCE_CLASSES = ["agroforestry", "forest", "cropland", "grassland"]

ALERT_STATUSES = [
    "Active: Under review",
    "Monitored: Awaiting ground verification",
    "Resolved: Confirmed deforestation",
    "False Positive: Shade Tree Pruning",
    "False Positive: Cloud Shadow",
    "False Positive: Seasonal Crop Residue",
]
ALERT_SENSORS = ["Sentinel-2 (synthetic)", "Landsat-9 (synthetic)", "GFW GLAD-S2 (synthetic)"]


def stable_int(value: str, modulus: int) -> int:
    """Stable non-negative hash of a string, modulo ``modulus``."""
    return int(hashlib.md5(value.encode("utf-8")).hexdigest(), 16) % modulus


def validation_for(record_id: str) -> tuple[str, str | None, str | None, str | None]:
    """Return (status, validator_id, validation_date, notes) deterministically."""
    bucket = stable_int(record_id + "::vs", 100)
    if bucket < 25:
        vid, note, status = COMMUNITY_VALIDATOR_ID, COMMUNITY_NOTE, "community_validated"
    elif bucket < 50:
        vid, note, status = EXPERT_VALIDATOR_ID, EXPERT_NOTE, "expert_reviewed"
    else:
        return UNVALIDATED, None, None, None
    when = (EPOCH + timedelta(days=stable_int(record_id + "::vd", 330))).isoformat()
    return status, vid, when, note


def enrich_parcels() -> int:
    path = FRONTEND_DATA / "allParcels.json"
    parcels = json.loads(path.read_text())
    for p in parcels:
        pid = str(p["id"])
        jcode = p.get("jurisdiction_code", "GH-AH")

        # Widen regional subtype variety for a stable subset of parcels.
        pool = SECONDARY_SUBTYPES.get(jcode, [])
        if pool and stable_int(pid + "::st", 100) < 18:
            pick = pool[stable_int(pid + "::pool", len(pool))]
            if pick != p.get("agroforestry_subtype"):
                p["agroforestry_subtype"] = pick
                p["subtype_color"] = SUBTYPE_COLORS.get(pick, SUBTYPE_COLORS["default"])

        status, vid, when, note = validation_for(pid)
        p["validation_status"] = status
        p["validator_id"] = vid
        p["validation_date"] = when
        p["validation_notes"] = note

        # A couple of provenance descriptors that the dossier surfaces.
        p.setdefault("model_version", f"poc-classifier-v{0.9 + stable_int(pid + '::mv', 9) / 100:.2f}")
        p["quality_score"] = round(0.6 + stable_int(pid + "::qs", 40) / 100.0, 2)
    path.write_text(json.dumps(parcels, separators=(",", ":")))
    return len(parcels)


def _jitter(rng: random.Random, lon: float, lat: float) -> tuple[float, float]:
    return round(lon + rng.uniform(-0.09, 0.09), 6), round(lat + rng.uniform(-0.09, 0.09), 6)


def enrich_reference_points(target_per_jurisdiction: int = 20) -> int:
    path = FRONTEND_DATA / "referencePoints.json"
    points = json.loads(path.read_text())

    for p in points:
        # Synthetic reference points may carry a *synthetic demo* validation
        # decision, but never a real one: the validator identity and note make
        # the demo provenance explicit (enforced by the corpus-honesty test).
        status, vid, when, note = validation_for(str(p["id"]))
        p["validation_status"] = status
        p["validator_id"] = vid
        p["validation_date"] = when
        p["validation_notes"] = note if vid else None
        p["quality_score"] = round(0.55 + stable_int(str(p["id"]) + "::rq", 45) / 100.0, 2) if vid else None
        p["source"] = REFERENCE_SOURCES[stable_int(str(p["id"]) + "::rs", len(REFERENCE_SOURCES))]
        p["data_origin"] = "synthetic"
        if p.get("name") and INSTITUTIONAL_NAME.search(str(p["name"])):
            p["name"] = (
                f"Synthetic reference site {p.get('jurisdiction_code', 'GH-AH')} #{stable_int(str(p['id']), 1000)}"
            )

    by_j: dict[str, list[dict]] = {}
    for p in points:
        by_j.setdefault(p.get("jurisdiction_code", "GH-AH"), []).append(p)

    extra: list[dict] = []
    for jcode, originals in by_j.items():
        pool = SECONDARY_SUBTYPES.get(jcode, []) or ["other"]
        rng = random.Random(1000 + stable_int(jcode, 999))
        idx = 0
        while len(originals) + sum(1 for e in extra if e["jurisdiction_code"] == jcode) < target_per_jurisdiction:
            base = originals[idx % len(originals)]
            idx += 1
            lon, lat = base["geometry"]["coordinates"]
            nlon, nlat = _jitter(rng, lon, lat)
            new_id = f"{base['id']}-x{idx}"
            subtype = pool[stable_int(new_id + "::sub", len(pool))]
            status, vid, when, note = validation_for(new_id)
            extra.append(
                {
                    "id": new_id,
                    "name": f"Synthetic reference site {jcode} #{idx}",
                    "jurisdiction_code": jcode,
                    "class_label": REFERENCE_CLASSES[stable_int(new_id + "::cl", len(REFERENCE_CLASSES))],
                    "agroforestry_subtype": subtype if subtype in SUBTYPE_COLORS else "other",
                    "validation_status": status,
                    "validator_id": vid,
                    "validation_date": when,
                    "validation_notes": note if vid else None,
                    "quality_score": round(0.55 + stable_int(new_id + "::rq", 45) / 100.0, 2) if vid else None,
                    "source": REFERENCE_SOURCES[stable_int(new_id + "::rs", len(REFERENCE_SOURCES))],
                    "canopy_cover_pct": round(30 + stable_int(new_id + "::cc", 66) + 0.0, 1),
                    "geometry": {"type": "Point", "coordinates": [nlon, nlat]},
                    "data_origin": "synthetic",
                    "generation_method": "Procedural generator (synthetic demo corpus v2, no real-world data)",
                    "source_url": None,
                }
            )

    enriched = points + extra
    path.write_text(json.dumps(enriched, indent=2) + "\n")
    return len(enriched)


def enrich_alerts(target_per_jurisdiction: int = 48) -> int:
    front_path = FRONTEND_DATA / "deforestationAlerts.json"
    alerts = json.loads(front_path.read_text())

    for a in alerts:
        aid = str(a["id"])
        a["status"] = ALERT_STATUSES[stable_int(aid + "::as", len(ALERT_STATUSES))]
        a["sensor"] = ALERT_SENSORS[stable_int(aid + "::sn", len(ALERT_SENSORS))]
        a["confidence"] = ["low", "nominal", "high", "highest"][stable_int(aid + "::cf", 4)]

    by_j: dict[str, list[dict]] = {}
    for a in alerts:
        by_j.setdefault(a.get("jurisdiction_code", "GH-AH"), []).append(a)

    extra: list[dict] = []
    for jcode, originals in by_j.items():
        rng = random.Random(2000 + stable_int(jcode, 999))
        idx = 0
        while len(originals) + sum(1 for e in extra if e["jurisdiction_code"] == jcode) < target_per_jurisdiction:
            base = originals[idx % len(originals)]
            idx += 1
            lon, lat = base["coordinates"]
            nlon, nlat = _jitter(rng, lon, lat)
            new_id = f"{base['id']}-x{idx}"
            d = EPOCH - timedelta(days=stable_int(new_id + "::ad", 1400))
            extra.append(
                {
                    "id": new_id,
                    "jurisdiction_code": jcode,
                    "coordinates": [nlon, nlat],
                    "date": d.date().isoformat(),
                    "confidence": ["low", "nominal", "high", "highest"][stable_int(new_id + "::cf", 4)],
                    "sensor": ALERT_SENSORS[stable_int(new_id + "::sn", len(ALERT_SENSORS))],
                    "loss_ha": round(0.4 + stable_int(new_id + "::ha", 120) / 10.0, 2),
                    "status": ALERT_STATUSES[stable_int(new_id + "::as", len(ALERT_STATUSES))],
                    "details": "Illustrative demo alert (synthetic).",
                    "data_origin": "synthetic",
                }
            )

    enriched = alerts + extra
    front_path.write_text(json.dumps(enriched, indent=2) + "\n")
    # Mirror to the backend fallback location used by the geospatial API.
    (API_DATA / "deforestation_alerts.json").write_text(json.dumps(enriched, indent=2) + "\n")
    return len(enriched)


def mirror_reference_points_to_api() -> None:
    src = FRONTEND_DATA / "referencePoints.json"
    (API_DATA / "reference_points.json").write_text(src.read_text())


def main() -> None:
    n_parcels = enrich_parcels()
    n_refs = enrich_reference_points()
    n_alerts = enrich_alerts()
    mirror_reference_points_to_api()
    print(f"parcels: {n_parcels} enriched")
    print(f"reference points: {n_refs} total")
    print(f"deforestation alerts: {n_alerts} total")


if __name__ == "__main__":
    main()
