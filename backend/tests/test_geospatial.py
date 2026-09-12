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
    assert "eudr_audit" in telemetry
    assert telemetry["eudr_audit"]["compliance_status"] == "COMPLIANT_ZERO_DEFORESTATION"

