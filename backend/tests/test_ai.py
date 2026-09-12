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
