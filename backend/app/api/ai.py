# RICH Backend - AI Assistant API Endpoints
# Multi-agent RAG system with geospatial context

from datetime import datetime

from fastapi import APIRouter, Body, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.core.security import get_current_user_optional, require_permission
from app.models import (
    DocumentCatalog,
    QueryInteractionLog,
)
from app.services.ai import (
    AIService,
    process_chat_query,
    submit_feedback,
)

router = APIRouter()


@router.get("/chat")
async def chat_status():
    """AI Assistant status and active capabilities"""
    return {
        "status": "online",
        "agent": "RICH Multi-Agent Climate Copilot",
        "supported_jurisdictions": ["GH-AH", "ES-EX", "ET-OR"],
        "capabilities": [
            "EUDR Deforestation Compliance Verification",
            "LUMENS Land Use Scenario Analysis",
            "QUES-C Carbon Accounting",
            "God's Eye View Tactical Intelligence",
        ],
    }


@router.post("/chat")
async def chat(
    query: str = Body(..., description="User query"),
    session_id: str | None = Body(None, description="Session ID for conversation continuity"),
    user_id: str | None = Body(None, description="User ID (optional)"),
    conversation_history: list[dict[str, str]] | None = Body(None, description="Previous messages"),
    jurisdiction_code: str | None = Body(None, description="Jurisdiction context"),
    bbox: list[float] | None = Body(None, description="Bounding box context [min_lon, min_lat, max_lon, max_lat]"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user_optional),
):
    """Process a chat query through the multi-agent AI system"""

    # Use authenticated user if available
    effective_user_id = user.get("sub") if user else user_id

    # Process query through AI pipeline
    result = await process_chat_query(
        query=query,
        session_id=session_id,
        user_id=effective_user_id,
        conversation_history=conversation_history or [],
        jurisdiction_code=jurisdiction_code,
        bbox=bbox,
        db=db,
    )

    return result


@router.get("/chat/{session_id}")
async def get_chat_history(
    session_id: str,
    limit: int = Query(50, description="Maximum messages to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user_optional),
):
    """Get chat history for a session"""

    stmt = select(QueryInteractionLog).where(
        QueryInteractionLog.session_id == session_id
    ).order_by(QueryInteractionLog.created_at.desc()).limit(limit).offset(offset)

    result = await db.execute(stmt)
    logs = result.scalars().all()

    return {
        "session_id": session_id,
        "messages": [
            {
                "id": str(log.id),
                "query": log.original_query,
                "response": log.response_text,
                "sources": log.sources,
                "citations": log.citations,
                "rating": log.rating,
                "feedback_text": log.feedback_text,
                "latency_ms": log.latency_ms,
                "cache_hit": log.cache_hit,
                "created_at": log.created_at.isoformat(),
            }
            for log in reversed(logs)  # Reverse to show oldest first
        ],
        "count": len(logs),
    }


@router.post("/chat/feedback")
async def chat_feedback(
    log_id: str = Body(..., description="Query log ID"),
    rating: int = Body(..., description="Rating: -1 (downvote), 0 (neutral), 1 (upvote)"),
    correction_text: str | None = Body(None, description="Correction or feedback text"),
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(get_current_user_optional),
):
    """Submit feedback on an AI response"""

    result = await submit_feedback(
        log_id=log_id,
        rating=rating,
        correction_text=correction_text,
        user_id=user.get("sub") if user else None,
        db=db,
    )

    return result


@router.get("/prompt-pills")
async def get_prompt_pills(
    jurisdiction_code: str | None = Query(None, description="Jurisdiction for context-aware prompts"),
    category: str | None = Query(None, description="Prompt category"),
    db: AsyncSession = Depends(get_db_session),
):
    """Get suggested prompt pills for the AI assistant"""

    pills = await AIService.get_prompt_pills(
        jurisdiction_code=jurisdiction_code,
        category=category,
        db=db,
    )

    return {"pills": pills}


@router.post("/search")
async def semantic_search(
    query: str = Body(..., description="Search query"),
    search_type: str = Body("hybrid", description="Search type: vector, keyword, hybrid, geospatial"),
    jurisdiction_code: str | None = Body(None, description="Jurisdiction filter"),
    bbox: list[float] | None = Body(None, description="Bounding box for geospatial search"),
    limit: int = Body(10, description="Maximum results"),
    db: AsyncSession = Depends(get_db_session),
):
    """Perform semantic search across documents and geospatial data"""

    from app.services.ai import hybrid_search

    results = await hybrid_search(
        query=query,
        search_type=search_type,
        jurisdiction_code=jurisdiction_code,
        bbox=bbox,
        limit=limit,
        db=db,
    )

    return {"results": results}


@router.post("/geospatial-query")
async def geospatial_query(
    query: str = Body(..., description="Natural language query about geospatial data"),
    jurisdiction_code: str | None = Body(None, description="Jurisdiction context"),
    bbox: list[float] | None = Body(None, description="Bounding box context"),
    db: AsyncSession = Depends(get_db_session),
):
    """Process a natural language query about geospatial data"""

    from app.services.ai import process_geospatial_query

    result = await process_geospatial_query(
        query=query,
        jurisdiction_code=jurisdiction_code,
        bbox=bbox,
        db=db,
    )

    return result


@router.get("/models")
async def list_models():
    """List available AI models"""

    return {
        "models": [
            {
                "id": "mistral-tiny",
                "name": "Mistral Tiny",
                "provider": "Mistral AI",
                "type": "chat",
                "description": "Fast, cost-effective model for simple queries",
                "max_tokens": 32768,
                "cost_per_1k_tokens": 0.00025,
            },
            {
                "id": "mistral-small",
                "name": "Mistral Small",
                "provider": "Mistral AI",
                "type": "chat",
                "description": "Balanced model for complex reasoning",
                "max_tokens": 32768,
                "cost_per_1k_tokens": 0.002,
            },
            {
                "id": "bge-small-en-v1.5",
                "name": "BGE Small English v1.5",
                "provider": "BAAI",
                "type": "embedding",
                "description": "384-dimensional embeddings for semantic search",
                "dimensions": 384,
            },
        ]
    }


@router.get("/documents")
async def list_documents(
    limit: int = Query(20, ge=1, le=100, description="Maximum documents to return"),
    db: AsyncSession = Depends(get_db_session),
):
    """List authoritative compliance documents and scientific literature in the catalog"""
    stmt = select(DocumentCatalog).order_by(DocumentCatalog.created_at.desc()).limit(limit)
    res = await db.execute(stmt)
    docs = res.scalars().all()
    return {
        "documents": [
            {
                "id": str(d.id),
                "title": d.title,
                "authors": d.authors,
                "publication_year": d.publication_year,
                "topic_keywords": d.topic_keywords,
                "source": d.source,
                "url_link": d.url_link,
                "license": d.license,
            }
            for d in docs
        ],
        "count": len(docs),
    }



@router.get("/stats")
async def get_ai_stats(
    db: AsyncSession = Depends(get_db_session),
    user: dict = Depends(require_permission("read:all")),
):
    """Get AI system statistics"""

    # Total queries
    stmt = select(func.count(QueryInteractionLog.id))
    result = await db.execute(stmt)
    total_queries = result.scalar()

    # Average latency
    stmt = select(func.avg(QueryInteractionLog.latency_ms))
    result = await db.execute(stmt)
    avg_latency = result.scalar()

    # Cache hit rate
    stmt = select(
        func.count(QueryInteractionLog.id).filter(QueryInteractionLog.cache_hit.is_(True)).label("hits"),
        func.count(QueryInteractionLog.id).label("total"),
    )
    result = await db.execute(stmt)
    row = result.one()
    cache_hit_rate = (row.hits / row.total * 100) if row.total > 0 else 0

    # User satisfaction
    stmt = select(
        func.avg(QueryInteractionLog.rating).filter(QueryInteractionLog.rating.isnot(None)).label("avg_rating"),
        func.count(QueryInteractionLog.rating).filter(QueryInteractionLog.rating.isnot(None)).label("rated_count"),
    )
    result = await db.execute(stmt)
    row = result.one()
    avg_rating = row.avg_rating
    rated_count = row.rated_count

    # Queries by day (last 30 days)
    from datetime import timedelta
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    stmt = select(
        func.date(QueryInteractionLog.created_at).label("date"),
        func.count(QueryInteractionLog.id).label("count"),
    ).where(QueryInteractionLog.created_at >= thirty_days_ago).group_by(
        func.date(QueryInteractionLog.created_at)
    ).order_by(func.date(QueryInteractionLog.created_at))
    result = await db.execute(stmt)
    daily_queries = [
        {"date": row.date.isoformat(), "count": row.count}
        for row in result.all()
    ]

    return {
        "total_queries": total_queries,
        "avg_latency_ms": float(avg_latency or 0),
        "cache_hit_rate_pct": round(cache_hit_rate, 2),
        "avg_rating": float(avg_rating or 0),
        "rated_count": rated_count,
        "daily_queries": daily_queries,
    }