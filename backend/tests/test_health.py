import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_root_endpoint(async_client: AsyncClient):
    """Test API root status endpoint"""
    response = await async_client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "RICH API"
    assert data["status"] == "operational"


@pytest.mark.asyncio
async def test_health_check(async_client: AsyncClient):
    """Test basic health check endpoint"""
    response = await async_client.get("/health/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "RICH API"
    assert "timestamp" in data


@pytest.mark.asyncio
async def test_liveness_check(async_client: AsyncClient):
    """Test liveness check endpoint"""
    response = await async_client.get("/health/live")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "alive"


@pytest.mark.asyncio
async def test_readiness_check(async_client: AsyncClient):
    """Test readiness check endpoint"""
    response = await async_client.get("/health/ready")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data


@pytest.mark.asyncio
async def test_root_endpoint_html_browser(async_client: AsyncClient):
    """Test browser root request with text/html accept header"""
    headers = {"Accept": "text/html,application/xhtml+xml"}
    response = await async_client.get("/", headers=headers)
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_spa_fallback_route(async_client: AsyncClient):
    """Test SPA client route fallback"""
    headers = {"Accept": "text/html"}
    response = await async_client.get("/explore", headers=headers)
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_api_health_check(async_client: AsyncClient):
    """Test /api/health compatibility endpoint"""
    response = await async_client.get("/api/health/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


@pytest.mark.asyncio
async def test_api_parcels_alias(async_client: AsyncClient):
    """Test /api/parcels compatibility redirect alias"""
    response = await async_client.get("/api/parcels", follow_redirects=False)
    assert response.status_code == 307
    assert "/api/geospatial/parcels" in response.headers["location"]


@pytest.mark.asyncio
async def test_api_jurisdictions_alias(async_client: AsyncClient):
    """Test /api/jurisdictions compatibility redirect alias"""
    response = await async_client.get("/api/jurisdictions", follow_redirects=False)
    assert response.status_code == 307
    assert "/api/geospatial/jurisdictions" in response.headers["location"]
