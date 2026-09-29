import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_frameworks(async_client: AsyncClient):
    """Test policy frameworks listing"""
    response = await async_client.get("/api/policy/frameworks")
    assert response.status_code == 200
    data = response.json()
    assert "frameworks" in data
    assert len(data["frameworks"]) >= 1
    codes = [f["code"] for f in data["frameworks"]]
    assert any("EUDR" in c for c in codes)


@pytest.mark.asyncio
async def test_get_framework_eudr(async_client: AsyncClient):
    """Test specific framework detail query"""
    response = await async_client.get("/api/policy/frameworks/EUDR")
    assert response.status_code == 200
    data = response.json()
    assert data["code"] == "EUDR"
    assert "cutoff_date" in data["requirements"]
    assert data["requirements"]["cutoff_date"] == "2020-12-31"


@pytest.mark.asyncio
async def test_eudr_check_coordinates_alone_are_insufficient(async_client: AsyncClient):
    """A bare coordinate carries no evidence: must never be compliant (issue #3)."""
    payload = {
        "coordinates": [-1.74, 6.66],
        "commodity": "cocoa",
        "store_assessment": False,
    }
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["assessment_status"] == "INSUFFICIENT_DATA"
    assert data["is_compliant"] is False
    assert len(data["gaps"]) > 0
    assert data["compliance_score"] < 0.85
    assert data["deforestation_risk"] == "UNKNOWN"


@pytest.mark.asyncio
async def test_eudr_check_polygon_required_for_large_plots(async_client: AsyncClient):
    """Article 9: plots >= 4 ha require a polygon; a point alone is insufficient."""
    payload = {
        "coordinates": [-1.74, 6.66],
        "commodity": "cocoa",
        "store_assessment": False,
    }
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["checks"]["geolocation"]["status"] == "INSUFFICIENT_DATA"
    assert any("polygon" in g.lower() for g in data["gaps"])


@pytest.mark.asyncio
async def test_eudr_check_no_fabricated_evidence(async_client: AsyncClient):
    """The checker must not claim satellite time-series or registry verification it never did."""
    payload = {"coordinates": [-1.74, 6.66], "commodity": "cocoa"}
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    data = response.json()
    assert "national_registry_verified" not in str(data)
    assert "satellite time-series confirms" not in str(data).lower()
    assert all(c.get("evidence") != "fabricated" for c in data["checks"].values())
    assert data["checks"]["cutoff_compliance"]["status"] == "INSUFFICIENT_DATA"
    assert data["checks"]["legality"]["status"] == "INSUFFICIENT_DATA"


@pytest.mark.asyncio
async def test_eudr_check_missing_geolocation(async_client: AsyncClient):
    """Test EUDR check fails or reports gaps when coordinates are omitted"""
    payload = {
        "commodity": "coffee",
        "store_assessment": False,
    }
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_compliant"] is False
    assert len(data["gaps"]) > 0
    assert any("geolocation" in g.lower() for g in data["gaps"])


@pytest.mark.asyncio
async def test_redd_report(async_client: AsyncClient):
    """Test REDD+ MRV reporting endpoint"""
    payload = {
        "jurisdiction_code": "GH-AH",
        "reference_years": [2015, 2020],
        "monitoring_year": 2024,
    }
    response = await async_client.post("/api/policy/redd-report", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "metrics" in data
    assert "forest_reference_emission_level_tco2e_yr" in data["metrics"]
    assert "total_climate_benefit_tco2e_yr" in data["metrics"]
    assert data["metrics"]["total_climate_benefit_tco2e_yr"] > 0
    assert "tier_compliance" in data


@pytest.mark.asyncio
async def test_ndc_alignment(async_client: AsyncClient):
    """Test NDC AFOLU alignment endpoint"""
    payload = {
        "jurisdiction_code": "ES-EX",
        "target_year": 2030,
    }
    response = await async_client.post("/api/policy/ndc-alignment", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["sector"].startswith("AFOLU")
    assert data["alignment_status"] == "ON_TRACK"
    assert data["alignment_score"] > 0.8
    assert len(data["commitments"]) >= 1


@pytest.mark.asyncio
async def test_create_compliance_assessment(async_client: AsyncClient):
    """Test creating and persisting compliance assessment"""
    payload = {
        "framework_code": "EUDR",
        "jurisdiction_code": "ES-EX",
    }
    response = await async_client.post("/api/policy/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "assessment_id" in data
    assert data["framework_code"] == "EUDR"
    assert data["compliance_status"] is True


@pytest.mark.asyncio
async def test_create_assessment_with_arbitrary_string_ids(async_client: AsyncClient):
    """Test creating assessment when scenario_id or parcel_id are arbitrary non-UUID strings"""
    payload = {
        "framework_code": "EUDR",
        "jurisdiction_code": "ES-EX",
        "scenario_id": "arbitrary-string-scenario",
        "parcel_id": "not-a-valid-hex-uuid",
    }
    response = await async_client.post("/api/policy/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "assessment_id" in data


@pytest.mark.asyncio
async def test_get_assessment_invalid_id(async_client: AsyncClient):
    """Test querying assessment with invalid UUID string returns 404 cleanly"""
    response = await async_client.get("/api/policy/assessments/invalid-uuid-format")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_eudr_check_non_uuid_parcel_id(async_client: AsyncClient):
    """Test EUDR check with non-UUID parcel_id returns 404 instead of 500 DataError"""
    payload = {
        "parcel_id": "p-1-mock-fallback",
        "commodity": "cocoa",
        "store_assessment": False,
    }
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_eudr_check_store_assessment_safe_uuid(async_client: AsyncClient):
    """Test EUDR check storing assessment succeeds without crashing on string user/parcel IDs"""
    payload = {
        "coordinates": [-1.74, 6.66],
        "commodity": "cocoa",
        "store_assessment": True,
    }
    response = await async_client.post("/api/policy/eudr-check", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "assessment_id" in data
