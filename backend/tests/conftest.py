# RICH Backend Test Configuration and Fixtures
import os
import sys
import uuid
from unittest.mock import AsyncMock, MagicMock

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ["APP_ENV"] = "test"
os.environ["DATABASE_URL"] = "postgresql://user:password@localhost:5432/rich_test"

from app.core.database import get_db_session
from app.main import app
from app.models import (
    AgroforestryParcel,
    Jurisdiction,
    LandCoverReferencePoint,
    PolicyComplianceAssessment,
    PolicyFramework,
)
from app.models.geospatial import AgroforestrySubtype, LandCoverClass, ValidationStatus


@pytest.fixture
def mock_db():
    """Mock SQLAlchemy AsyncSession routing queries by table"""
    session = AsyncMock()
    session.add = MagicMock()
    session.delete = MagicMock()

    sample_jurisdiction = Jurisdiction(
        id=uuid.UUID("11111111-1111-4000-8000-000000000002"),
        name="Extremadura",
        code="ES-EX",
        level=1,
        area_km2=41634.0,
        geometry=None,
        centroid=None,
        metadata_={"system": "Dehesa"},
    )

    sample_framework = PolicyFramework(
        id=uuid.UUID("77777777-7777-4000-8000-000000000001"),
        name="EU Deforestation Regulation (EUDR)",
        code="EUDR",
        description="Regulation (EU) 2023/1115 deforestation-free requirements post Dec 31, 2020.",
        jurisdiction_ids=[],
        requirements={"cutoff_date": "2020-12-31", "geolocation_required": True},
        metadata_={"version": "2023/1115"},
    )

    sample_parcel = AgroforestryParcel(
        id=uuid.UUID("44444444-4444-4000-8000-000000000001"),
        jurisdiction_id=sample_jurisdiction.id,
        geometry=None,
        class_label=LandCoverClass.AGROFORESTRY,
        agroforestry_subtype=AgroforestrySubtype.DEHESA,
        confidence_score=0.95,
        area_ha=48.5,
        uncertainty=0.04,
        source="Sentinel-2",
        source_year=2023,
    )

    sample_assessment = PolicyComplianceAssessment(
        id=uuid.UUID("99999999-9999-4000-8000-000000000001"),
        framework_id=sample_framework.id,
        compliance_status=True,
        compliance_score=0.92,
        gaps={"items": []},
        recommendations={"items": []},
        report_json={"status": "COMPLIANT"},
    )

    sample_ref_point = LandCoverReferencePoint(
        id=uuid.UUID("55555555-5555-4000-8000-000000000001"),
        jurisdiction_id=sample_jurisdiction.id,
        geometry=None,
        class_label=LandCoverClass.AGROFORESTRY,
        agroforestry_subtype=AgroforestrySubtype.DEHESA,
        validation_status=ValidationStatus.EXPERT_REVIEWED,
        quality_score=0.96,
        metadata_={"name": "CSIC Station Cáceres"},
    )

    async def mock_execute(stmt, *args, **kwargs):
        res = MagicMock()
        stmt_str = str(stmt).lower()

        if "land_cover_reference_points" in stmt_str:
            res.scalar_one_or_none.return_value = sample_ref_point
            res.scalar_one.return_value = sample_ref_point
            res.scalars.return_value.all.return_value = [sample_ref_point]
        elif "policy_frameworks" in stmt_str:
            res.scalar_one_or_none.return_value = sample_framework
            res.scalar_one.return_value = sample_framework
            res.scalars.return_value.all.return_value = [sample_framework]
        elif "policy_compliance_assessments" in stmt_str:
            res.scalar_one_or_none.return_value = sample_assessment
            res.scalar_one.return_value = sample_assessment
            res.scalars.return_value.all.return_value = [sample_assessment]
        elif "agroforestry_parcels" in stmt_str:
            res.scalar_one_or_none.return_value = sample_parcel
            res.scalar_one.return_value = sample_parcel
            res.scalars.return_value.all.return_value = [sample_parcel]
        elif "jurisdictions" in stmt_str:
            res.scalar_one_or_none.return_value = sample_jurisdiction
            res.scalar_one.return_value = sample_jurisdiction
            res.scalars.return_value.all.return_value = [sample_jurisdiction]
        else:
            res.scalar_one_or_none.return_value = None
            res.scalar_one.return_value = None
            res.scalars.return_value.all.return_value = []

        res.all.return_value = []
        res.one.return_value = MagicMock(hits=1, total=1, avg_rating=1.0, rated_count=1)
        res.scalar.return_value = 1
        return res

    session.execute.side_effect = mock_execute
    session.get.return_value = sample_jurisdiction
    session.commit.return_value = None
    session.flush.return_value = None
    session.add.return_value = None

    return session


@pytest_asyncio.fixture
async def async_client(mock_db):
    """Async HTTP test client with overridden database dependency"""

    async def override_get_db():
        yield mock_db

    app.dependency_overrides[get_db_session] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def admin_client(mock_db):
    """Async HTTP test client with admin permissions and overridden database dependency.
    Overrides get_current_user (transitively used by require_permission) so that
    permission-gated endpoints (e.g. /api/ai/modal/ingest) can be exercised in tests
    without a real JWT token.
    """
    from app.core.security import get_current_user, get_current_user_optional

    _admin_user = {"sub": "test-admin", "role": "admin"}

    async def override_get_db():
        yield mock_db

    async def override_get_current_user():
        return _admin_user

    async def override_get_current_user_optional():
        return _admin_user

    app.dependency_overrides[get_db_session] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[get_current_user_optional] = override_get_current_user_optional

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

    app.dependency_overrides.clear()
