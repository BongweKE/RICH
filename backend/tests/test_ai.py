import pytest
from httpx import AsyncClient

from app.services.ai import AIService, ArchitectAgent, GuardianAgent


def test_guardian_agent_evaluation():
    """Test Guardian query validation and bounding box extraction"""
    # Empty query rejection
    res_empty = GuardianAgent.evaluate("")
    assert res_empty["passed"] is False

    # Ghana keyword extraction
    res_gh = GuardianAgent.evaluate("What is the cocoa canopy density in Ghana?")
    assert res_gh["passed"] is True
    assert res_gh["extracted_jurisdiction"] == "GH"
    assert res_gh["extracted_bbox"] is not None

    # Extremadura / Dehesa keyword extraction
    res_ex = GuardianAgent.evaluate("Tell me about agroforestry parcels in Extremadura Dehesa")
    assert res_ex["passed"] is True
    assert res_ex["extracted_jurisdiction"] == "ES-EX"


def test_architect_agent_planning():
    """Test Architect query intent decomposition"""
    guardian_res = {"extracted_jurisdiction": "GH-AH", "extracted_bbox": None}
    plan = ArchitectAgent.plan("How do I verify EUDR compliance for cocoa?", guardian_res)
    assert "policy_eudr" in plan["strategies"]
    assert "eudr" in plan["search_keywords"]


@pytest.mark.asyncio
async def test_get_prompt_pills(async_client: AsyncClient):
    """Test retrieving context-aware prompt pills"""
    response = await async_client.get("/api/ai/prompt-pills")
    assert response.status_code == 200
    data = response.json()
    assert "pills" in data
    assert len(data["pills"]) >= 4
    labels = [p["label"] for p in data["pills"]]
    assert any("EUDR" in l for l in labels)


@pytest.mark.asyncio
async def test_list_ai_models(async_client: AsyncClient):
    """Test list AI models endpoint"""
    response = await async_client.get("/api/ai/models")
    assert response.status_code == 200
    data = response.json()
    assert "models" in data
    model_ids = [m["id"] for m in data["models"]]
    assert "mistral-tiny" in model_ids


@pytest.mark.asyncio
async def test_process_chat_query_unit():
    """Test complete AIService multi-agent execution pipeline"""
    result = await AIService.process_chat_query(
        query="What are the main EUDR requirements for shade cocoa in Ghana?",
        jurisdiction_code="GH-AH",
        conversation_history=[],
    )
    assert result["guardian_passed"] is True
    assert len(result["response"]) > 20
    assert "session_id" in result


@pytest.mark.asyncio
async def test_ai_chat_status_endpoint(async_client: AsyncClient):
    """Test AI chat endpoint status info"""
    response = await async_client.get("/api/ai/chat")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "RICH" in data["agent"]
    assert "capabilities" in data


@pytest.mark.asyncio
async def test_ai_chat_endpoint_execution(async_client: AsyncClient):
    """Test AI chat endpoint with non-UUID user_id and parcel bounding box"""
    payload = {
        "query": "Verify EUDR compliance for Ashanti parcels",
        "jurisdiction_code": "GH-AH",
        "bbox": [-2.4, 5.8, -1.0, 7.4],
        "user_id": "anonymous-agent-tester",
    }
    response = await async_client.post("/api/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert len(data["response"]) > 0
    assert "citations" in data


def test_guardian_agent_bbox_resilience():
    """Test GuardianAgent resilience against malformed bounding boxes and coordinates"""
    from app.services.ai import GuardianAgent

    # Empty bbox
    res_empty = GuardianAgent.evaluate("analyze trees", bbox=[])
    assert res_empty["passed"] is True
    assert res_empty["extracted_bbox"] is None

    # Malformed length
    res_short = GuardianAgent.evaluate("analyze trees", bbox=[1.0, 2.0])
    assert res_short["passed"] is True
    assert res_short["extracted_bbox"] is None

    # NaN coordinates
    res_nan = GuardianAgent.evaluate("analyze trees", bbox=[float("nan"), 5.0, -1.0, 7.0])
    assert res_nan["passed"] is True
    assert res_nan["extracted_bbox"] is None

    # Inverted min/max coordinates
    res_inverted = GuardianAgent.evaluate("analyze trees", bbox=[-1.0, 7.5, -2.5, 5.8])
    assert res_inverted["passed"] is True
    assert res_inverted["extracted_bbox"] == [-2.5, 5.8, -1.0, 7.5]


def test_architect_agent_stopword_filtering():
    """Test ArchitectAgent filters stopwords and preserves domain keywords"""
    from app.services.ai import ArchitectAgent, GuardianAgent

    guardian = GuardianAgent.evaluate("What is the EUDR cutoff date for cocoa agroforestry?")
    plan = ArchitectAgent.plan("What is the EUDR cutoff date for cocoa agroforestry?", guardian)

    keywords = plan["search_keywords"]
    assert "what" not in keywords
    assert "eudr" in keywords
    assert "cutoff" in keywords
    assert "agroforestry" in keywords


@pytest.mark.asyncio
async def test_semantic_search_endpoint(async_client: AsyncClient):
    """Test semantic vector search endpoint"""
    payload = {
        "query": "EUDR cutoff date and agroforestry shade trees",
        "limit": 3,
    }
    response = await async_client.post("/api/ai/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "results" in data


@pytest.mark.asyncio
async def test_geospatial_query_endpoint(async_client: AsyncClient):
    """Test natural language geospatial query endpoint"""
    payload = {
        "query": "Summarize agroforestry parcels in Ashanti",
        "jurisdiction_code": "GH-AH",
    }
    response = await async_client.post("/api/ai/geospatial-query", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "response" in data


@pytest.mark.asyncio
async def test_chat_feedback_non_uuid_handling(async_client: AsyncClient):
    """Test chat feedback handles non-UUID log IDs gracefully without ValueError"""
    payload = {
        "log_id": "1726262400000-non-uuid",
        "rating": 1,
        "correction_text": "Great response",
    }
    response = await async_client.post("/api/ai/chat/feedback", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "error"
    assert "Invalid query log UUID" in data["message"]


def test_domain_synthesis_with_chunks():
    """Test that domain synthesis incorporates retrieved pgvector chunks and citations"""
    from app.models import DocumentEmbedding
    from app.services.ai import SynthesisAgent

    chunk = DocumentEmbedding(
        chunk_text="Article 2(4-6) establishes that crops grown under tree cover constitute agricultural plantations.",
        metadata_={"regulation": "Regulation (EU) 2023/1115", "article": "Article 2", "page": 11},
    )

    resp = SynthesisAgent._domain_synthesis(
        query="What are the definitions in EUDR?",
        jurisdiction=None,
        parcels=[],
        citations=[{"title": "EUDR Article 2", "type": "regulatory_clause"}],
        chunks=[chunk],
    )
    assert "Grounded Legal & Scientific Corpus Excerpts" in resp
    assert "Article 2" in resp
    assert "crops grown under tree cover" in resp


@pytest.mark.asyncio
async def test_list_documents(async_client: AsyncClient):
    """Test listing compliance documents from documents_catalog"""
    resp = await async_client.get("/api/ai/documents")
    assert resp.status_code == 200
    data = resp.json()
    assert "documents" in data
    assert "count" in data
    assert isinstance(data["documents"], list)


def test_generate_embedding_utility():
    """Test hybrid embedding generator output format and fallback"""
    from app.utils.embeddings import generate_embedding

    vec = generate_embedding("EUDR agroforestry compliance", dim=384)
    assert len(vec) == 384
    assert isinstance(vec, list)
    assert isinstance(vec[0], float)

    # Empty string edge case
    empty_vec = generate_embedding("", dim=384)
    assert len(empty_vec) == 384
    assert empty_vec[0] == 1.0


def test_generate_embeddings_batch_utility():
    """Test batch embedding generator and caching"""
    from app.utils.embeddings import generate_embeddings_batch

    vecs = generate_embeddings_batch(["EUDR cocoa", "Ghana shade trees"], dim=384)
    assert len(vecs) == 2
    assert len(vecs[0]) == 384
    assert len(vecs[1]) == 384
    assert isinstance(vecs[0][0], float)


@pytest.mark.asyncio
async def test_modal_status_endpoint(async_client: AsyncClient):
    """Test /api/ai/modal/status returns live status or graceful fallback"""
    resp = await async_client.get("/api/ai/modal/status")
    assert resp.status_code == 200
    data = resp.json()
    assert "status" in data
    assert "provider" in data


@pytest.mark.asyncio
async def test_modal_ingest_endpoint(async_client: AsyncClient, monkeypatch: pytest.MonkeyPatch):
    """Test /api/ai/modal/ingest endpoint"""
    async def mock_ingest(force=False):
        return {"success": True, "processed": 4}

    monkeypatch.setattr("app.utils.embeddings.trigger_cloud_ingest", mock_ingest)
    resp = await async_client.post("/api/ai/modal/ingest", json={"force": False})
    assert resp.status_code == 200
    data = resp.json()
    assert "success" in data
    assert data["success"] is True





