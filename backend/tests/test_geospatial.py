import pytest
from httpx import AsyncClient
from shapely.geometry import Point

from app.services.geospatial import GeospatialService


def test_bbox_to_geometry():
    """Test converting bounding box list to PostGIS SRID WKT"""
    bbox = [-7.5, 38.0, -5.0, 40.5]
    wkt = GeospatialService.bbox_to_geometry(bbox)
    assert wkt.startswith("SRID=4326;POLYGON")
    assert "-7.5 38" in wkt


def test_geometry_to_geojson():
    """Test geometry conversion to GeoJSON mapping"""
    pt = Point(-6.3, 39.2)
    geojson = GeospatialService.geometry_to_geojson(pt)
    assert geojson is not None
    assert geojson["type"] == "Point"
    assert geojson["coordinates"] == (-6.3, 39.2)


@pytest.mark.asyncio
async def test_list_layers(async_client: AsyncClient):
    """Test geospatial layer listing endpoint"""
    response = await async_client.get("/api/geospatial/layers")
    assert response.status_code == 200
    data = response.json()
    assert "layers" in data
    assert len(data["layers"]) >= 2
    layer_ids = [l["id"] for l in data["layers"]]
    assert "osm" in layer_ids


def test_bbox_to_wkt():
    """Test converting bounding box list to pure WKT"""
    bbox = [-7.5, 38.0, -5.0, 40.5]
    wkt = GeospatialService.bbox_to_wkt(bbox)
    assert wkt.startswith("POLYGON")
    assert not wkt.startswith("SRID=")


@pytest.mark.asyncio
async def test_list_jurisdictions(async_client: AsyncClient):
    """Test list jurisdictions endpoint"""
    response = await async_client.get("/api/geospatial/jurisdictions")
    assert response.status_code == 200
    data = response.json()
    assert "jurisdictions" in data


@pytest.mark.asyncio
async def test_search_parcels(async_client: AsyncClient):
    """Test searching parcels with bounding box"""
    payload = {
        "bbox": [-7.5, 38.0, -5.0, 40.5],
        "min_confidence": 0.7,
        "limit": 10,
    }
    response = await async_client.post("/api/geospatial/parcels/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "parcels" in data
    assert "count" in data


@pytest.mark.asyncio
async def test_get_parcel_telemetry(async_client: AsyncClient):
    """Test deep parcel biophysical telemetry and EUDR audit trail"""
    response = await async_client.get("/api/geospatial/parcels/sample-parcel-123/telemetry")
    assert response.status_code == 200
    telemetry = response.json()
    assert telemetry["parcel_id"] == "sample-parcel-123"
    assert "ndvi_history" in telemetry
    assert len(telemetry["ndvi_history"]) >= 6
    assert any(pt.get("is_eudr_cutoff") for pt in telemetry["ndvi_history"])
    assert "canopy_strata" in telemetry
    assert "gedi_profile" in telemetry
    assert telemetry["eudr_audit"]["compliance_status"] == "NOT_ASSESSED"
    assert telemetry["eudr_audit"]["risk_level"] == "UNKNOWN"
    assert telemetry["eudr_audit"]["assessment_endpoint"] == "/api/policy/eudr-check"
    assert "illustrative demo values" in telemetry["eudr_audit"]["legal_notice"]


@pytest.mark.asyncio
async def test_search_parcels_malformed_bbox(async_client: AsyncClient):
    """Test searching parcels with invalid bbox returns 400 Bad Request"""
    # Empty bbox
    resp_empty = await async_client.post("/api/geospatial/parcels/search", json={"bbox": []})
    assert resp_empty.status_code == 400

    # Insufficient coordinates
    resp_short = await async_client.post("/api/geospatial/parcels/search", json={"bbox": [1.0, 2.0]})
    assert resp_short.status_code == 400


@pytest.mark.asyncio
async def test_search_parcels_inverted_bbox(async_client: AsyncClient):
    """Test searching parcels with inverted min/max bbox bounds succeeds"""
    payload = {
        "bbox": [-5.0, 40.5, -7.5, 38.0],  # inverted min/max
        "min_confidence": 0.5,
        "limit": 5,
    }
    response = await async_client.post("/api/geospatial/parcels/search", json=payload)
    assert response.status_code == 200
    assert "parcels" in response.json()


@pytest.mark.asyncio
async def test_get_parcel_telemetry_jurisdiction_tailored(async_client: AsyncClient):
    """Test parcel telemetry tailors biophysical metrics for Spain Dehesa vs Ghana vs Ethiopia"""
    # Spain dehesa parcel
    resp_es = await async_client.get("/api/geospatial/parcels/es-dehesa-p1/telemetry")
    assert resp_es.status_code == 200
    data_es = resp_es.json()
    assert "dominant_tree_species" in data_es["canopy_strata"]

    # Real sample parcel (mock_db returns Ghana sample parcel)
    resp_gh = await async_client.get("/api/geospatial/parcels/44444444-4444-4000-8000-000000000001/telemetry")
    assert resp_gh.status_code == 200
    data_gh = resp_gh.json()
    assert data_gh["soil_climate"]["mean_annual_precipitation_mm"] > 0
    assert "DDS-RICH-2024-" in data_gh["eudr_audit"]["reference_id"]


def test_safe_jurisdiction_code_utility():
    """Test safe_jurisdiction_code helper across various inputs"""
    from app.api.geospatial import safe_jurisdiction_code

    assert safe_jurisdiction_code(None) is None

    class MockJurisdiction:
        code = "GH-AH"

    assert safe_jurisdiction_code(MockJurisdiction()) == "GH-AH"

    class FailingJurisdiction:
        @property
        def code(self):
            raise RuntimeError("MissingGreenlet simulation")

    assert safe_jurisdiction_code(FailingJurisdiction()) is None


@pytest.mark.asyncio
async def test_search_parcels_with_jurisdiction(async_client: AsyncClient):
    """Test searching parcels with explicit jurisdiction code"""
    payload = {
        "bbox": [-2.4, 5.8, -1.0, 7.4],
        "jurisdiction_code": "GH-AH",
        "limit": 5,
    }
    response = await async_client.post("/api/geospatial/parcels/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "parcels" in data
    assert "count" in data


@pytest.mark.asyncio
async def test_list_reference_points(async_client: AsyncClient):
    """Test listing ground reference points"""
    response = await async_client.get("/api/geospatial/reference-points")
    assert response.status_code == 200
    data = response.json()
    assert "reference_points" in data


@pytest.mark.asyncio
async def test_list_satellite_imagery(async_client: AsyncClient):
    """Test listing satellite imagery metadata"""
    response = await async_client.get("/api/geospatial/satellite-imagery")
    assert response.status_code == 200
    data = response.json()
    assert "imagery" in data


@pytest.mark.asyncio
async def test_get_parcel_by_id(async_client: AsyncClient):
    """Test fetching parcel by ID including malformed UUIDs and valid parcel retrieval"""
    # Malformed non-UUID should return 404, NOT crash with 500 DataError
    resp_invalid = await async_client.get("/api/geospatial/parcels/p-1-non-uuid")
    assert resp_invalid.status_code == 404

    # Valid UUID parcel fetch
    resp_real = await async_client.get("/api/geospatial/parcels/44444444-4444-4000-8000-000000000001")
    assert resp_real.status_code == 200
    data = resp_real.json()
    assert "id" in data
    assert data["class_label"] == "agroforestry"
    assert "jurisdiction_code" in data


def test_safe_uuid_geospatial_utility():
    """Test safe_uuid in geospatial module"""
    import uuid

    from app.api.geospatial import safe_uuid

    assert safe_uuid(None) is None
    assert safe_uuid("") is None
    assert safe_uuid("invalid-string") is None
    real_uuid = uuid.uuid4()
    assert safe_uuid(str(real_uuid)) == real_uuid
    assert safe_uuid(real_uuid) == real_uuid


@pytest.mark.asyncio
async def test_list_deforestation_alerts(async_client: AsyncClient):
    """Test GFW deforestation and canopy disturbance alerts endpoint"""
    resp = await async_client.get("/api/geospatial/deforestation-alerts?jurisdiction_code=GH-AH")
    assert resp.status_code == 200
    data = resp.json()
    assert "alerts" in data
    assert "count" in data
    assert data["count"] > 0
    alert = data["alerts"][0]
    assert "id" in alert
    assert "confidence" in alert
    assert "status" in alert


@pytest.mark.asyncio
async def test_get_datapoints_summary(async_client: AsyncClient):
    """Test consolidated open-access datapoints summary across jurisdictions"""
    resp = await async_client.get("/api/geospatial/datapoints-summary")
    assert resp.status_code == 200
    data = resp.json()
    assert "summary" in data
    assert "GH-AH" in data["summary"]
    assert "ES-EX" in data["summary"]
    assert "ET-OR" in data["summary"]
    gh = data["summary"]["GH-AH"]
    assert gh["parcels"] > 0
    assert gh["reference_points"] > 0
    assert gh["deforestation_alerts"] > 0
    assert gh["total_datapoints"] == gh["parcels"] + gh["reference_points"] + gh["deforestation_alerts"]


@pytest.mark.asyncio
async def test_list_reference_points_for_jurisdiction(async_client: AsyncClient):
    """Test listing ground truth reference points filtered by jurisdiction"""
    resp = await async_client.get("/api/geospatial/reference-points?jurisdiction_code=GH-AH")
    assert resp.status_code == 200
    data = resp.json()
    assert "reference_points" in data
    assert "count" in data
    assert data["count"] > 0

