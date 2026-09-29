"""Idempotent demo-validation seeding for the synthetic PoC corpus.

To make the planner and impact viewer demonstrate a realistic mid-progress
landscape, ~50% of synthetic parcels receive a demo validation decision:
25% community_validated, 25% expert_reviewed, 50% left unvalidated so the
validation inbox has real work to show. Validator identity is honestly
labelled as a synthetic demo validator; rows already carrying a human
decision (validator_id set) are never touched, and the routine is a no-op
once the corpus is seeded (guarded by the honest demo validator marker).
"""

import logging
import random
import uuid
from datetime import datetime, timezone

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

logger = logging.getLogger(__name__)

DEMO_VALIDATOR_ID = uuid.UUID("00000000-0000-4000-8000-0000000000d0")
DEMO_VALIDATOR_NAME = "Synthetic demo validator (illustrative workflow)"
SEED_NOTE = "Synthetic demo decision seeded for PoC illustration"


async def seed_demo_validations(engine: AsyncEngine) -> None:
    """Give ~50% of unvalidated synthetic parcels a demo decision (idempotent)."""
    try:
        async with engine.begin() as conn:
            already_seeded = await conn.execute(
                text("SELECT 1 FROM agroforestry_parcels WHERE validator_id = :vid LIMIT 1"),
                {"vid": str(DEMO_VALIDATOR_ID)},
            )
            if already_seeded.first():
                return
            unvalidated = await conn.execute(
                text(
                    "SELECT id FROM agroforestry_parcels "
                    "WHERE validation_status = 'unvalidated' AND validator_id IS NULL"
                )
            )
            ids = [str(row[0]) for row in unvalidated.fetchall()]
            if not ids:
                return
            random.Random(42).shuffle(ids)
            n = len(ids)
            community = ids[: n // 4]
            expert = ids[n // 4 : n // 2]
            now = datetime.now(timezone.utc)

            for parcel_ids, status in ((community, "community_validated"), (expert, "expert_reviewed")):
                for pid in parcel_ids:
                    await conn.execute(
                        text(
                            "UPDATE agroforestry_parcels SET "
                            "validation_status = :status, validation_date = :vdate, "
                            "validator_id = :vid, validation_notes = :note "
                            "WHERE id = :pid AND validator_id IS NULL"
                        ),
                        {
                            "status": status,
                            "vdate": now,
                            "vid": str(DEMO_VALIDATOR_ID),
                            "note": SEED_NOTE,
                            "pid": pid,
                        },
                    )
            logger.info(
                "Demo validation seeding: %d community_validated, %d expert_reviewed, %d left unvalidated.",
                len(community),
                len(expert),
                n - len(community) - len(expert),
            )
    except Exception as e:
        logger.warning("Demo validation seeding deferred (database not ready: %s)", e)
