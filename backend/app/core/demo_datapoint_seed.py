"""Idempotent demo seeding for the wider synthetic PoC datapoint catalog.

The parcel and reference-point corpora are rich enough to exercise the planner
and impact viewer, but two gaps made several UI features untestable:

* every landscape exposed only its single dominant agroforestry subtype, so the
  planner's subtype filter had almost nothing to filter, and
* ground reference points carried a validation status but no provenance beyond
  it (no validator, no date), so reference-point provenance could not be shown.

This routine widens the subtype mix for a stable subset of parcels and gives
unvalidated reference points an honest synthetic provenance decision. Every
value is derived from a stable hash of the record id, so the routine is a no-op
on subsequent runs and never touches human-entered decisions.
"""

import hashlib
import logging
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

logger = logging.getLogger(__name__)

COMMUNITY_VALIDATOR_ID = uuid.UUID("00000000-0000-4000-8000-0000000000c0")
EXPERT_VALIDATOR_ID = uuid.UUID("00000000-0000-4000-8000-0000000000e0")
EPOCH = datetime(2025, 1, 1, tzinfo=timezone.utc)

# Agronomically plausible secondary subtypes per landscape (widens the filter).
SECONDARY_SUBTYPES: dict[str, list[str]] = {
    "GH-AH": ["shade_coffee", "forest_farming", "homegarden", "parkland", "woodlot"],
    "ET-OR": ["homegarden", "alley_cropping", "parkland", "shade_coffee"],
    "ES-EX": ["parkland", "alley_cropping", "silvopasture", "dehesa"],
}


def _stable_int(value: str, modulus: int) -> int:
    return int(hashlib.md5(value.encode("utf-8")).hexdigest(), 16) % modulus


# Named synthetic validator identities so provenance is honest and referentially
# valid (reference points carry a FK to users).
DEMO_USERS = [
    (
        "00000000-0000-4000-8000-0000000000c0",
        "demo.validator.community@rich.local",
        "Synthetic demo reviewer (community tier)",
        "researcher",
    ),
    (
        "00000000-0000-4000-8000-0000000000d0",
        "demo.validator.parcel@rich.local",
        "Synthetic demo validator (illustrative workflow)",
        "researcher",
    ),
    (
        "00000000-0000-4000-8000-0000000000e0",
        "demo.validator.expert@rich.local",
        "Synthetic demo reviewer (expert tier)",
        "admin",
    ),
]


async def _ensure_demo_users(conn) -> None:
    for uid, email, name, role in DEMO_USERS:
        await conn.execute(
            text(
                "INSERT INTO users (id, email, hashed_password, full_name, role, "
                "organization, is_active, created_at, updated_at) "
                "VALUES (:id, :email, NULL, :name, :role, 'RICH PoC (synthetic)', true, now(), now()) "
                "ON CONFLICT (id) DO NOTHING"
            ),
            {"id": uid, "email": email, "name": name, "role": role},
        )


async def seed_demo_datapoints(engine: AsyncEngine) -> None:
    """Widen parcel subtypes and add reference-point provenance (idempotent)."""
    try:
        async with engine.begin() as conn:
            await _ensure_demo_users(conn)

            parcel_rows = (
                await conn.execute(
                    text(
                        "SELECT p.id, j.code, p.agroforestry_subtype "
                        "FROM agroforestry_parcels p "
                        "LEFT JOIN jurisdictions j ON j.id = p.jurisdiction_id"
                    )
                )
            ).fetchall()
            subtype_updates: list[dict[str, str]] = []
            for pid, jcode, subtype in parcel_rows:
                pool = SECONDARY_SUBTYPES.get(jcode or "", [])
                if not pool or _stable_int(str(pid) + "::st", 100) >= 18:
                    continue
                pick = pool[_stable_int(str(pid) + "::pool", len(pool))]
                if pick != subtype:
                    subtype_updates.append({"pid": str(pid), "sub": pick})
            if subtype_updates:
                await conn.execute(
                    text("UPDATE agroforestry_parcels SET agroforestry_subtype = :sub WHERE id = :pid"),
                    subtype_updates,
                )
                logger.info(
                    "Demo datapoint seeding: widened agroforestry subtypes on %d parcels.",
                    len(subtype_updates),
                )

            ref_rows = (
                await conn.execute(
                    text(
                        "SELECT id FROM land_cover_reference_points "
                        "WHERE validation_status = 'unvalidated' AND validator_id IS NULL"
                    )
                )
            ).fetchall()
            ref_updates: list[dict[str, object]] = []
            for (rid,) in ref_rows:
                bucket = _stable_int(str(rid) + "::vs", 100)
                if bucket < 40:
                    status, vid = "community_validated", COMMUNITY_VALIDATOR_ID
                elif bucket < 75:
                    status, vid = "expert_reviewed", EXPERT_VALIDATOR_ID
                else:
                    continue
                when = EPOCH + timedelta(days=_stable_int(str(rid) + "::vd", 330))
                ref_updates.append({"pid": str(rid), "status": status, "vid": str(vid), "when": when})
            if ref_updates:
                await conn.execute(
                    text(
                        "UPDATE land_cover_reference_points SET "
                        "validation_status = :status, validator_id = :vid, "
                        "validation_date = :when WHERE id = :pid"
                    ),
                    ref_updates,
                )
                logger.info(
                    "Demo datapoint seeding: gave provenance to %d reference points.",
                    len(ref_updates),
                )
    except Exception as e:  # pragma: no cover - defensive, matches sibling seeders
        logger.warning("Demo datapoint seeding deferred (database not ready: %s)", e)
