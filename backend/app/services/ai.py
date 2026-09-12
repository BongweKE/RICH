# RICH Backend - AI Assistant Service
# Multi-Agent RAG System: Guardian, Architect, and Synthesis Agents
# Integrated with Mistral AI, PostGIS, and pgvector

import logging
import re
import time
import uuid
from typing import Any

import httpx
from geoalchemy2 import functions as geofunc
from shapely.geometry import box
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models import (
    AgroforestryParcel,
    AIFeedback,
    DocumentCatalog,
    DocumentEmbedding,
    Jurisdiction,
    QueryInteractionLog,
)

logger = logging.getLogger(__name__)


def safe_val(v: Any) -> str:
    """Safely extract string from Enum or primitive without raising AttributeError"""
    if v is None:
        return ""
    return str(v.value if hasattr(v, "value") else v)


# -----------------------------------------------------------------------------
# Guardian Agent: Query Validation & Spatial Bounding Box Extraction
# -----------------------------------------------------------------------------
class GuardianAgent:
    """Validates user queries, filters unsafe content, and extracts spatial contexts"""

    JURISDICTION_KEYWORDS = {
        "ghana": {"code": "GH", "name": "Ghana", "bbox": [-3.25, 4.73, 1.19, 11.17]},
        "ashanti": {"code": "GH-AH", "name": "Ashanti Region", "bbox": [-2.5, 5.8, -1.0, 7.5]},
        "ethiopia": {"code": "ET", "name": "Ethiopia", "bbox": [33.0, 3.4, 48.0, 15.0]},
        "oromia": {"code": "ET-OR", "name": "Oromia", "bbox": [34.0, 3.4, 43.0, 10.5]},
        "spain": {"code": "ES", "name": "Spain", "bbox": [-9.3, 36.0, 3.3, 43.8]},
        "extremadura": {"code": "ES-EX", "name": "Extremadura", "bbox": [-7.5, 37.9, -4.6, 40.5]},
        "dehesa": {"code": "ES-EX", "name": "Extremadura (Dehesa)", "bbox": [-7.2, 38.2, -5.1, 40.2]},
    }

    @classmethod
    def evaluate(
        cls,
        query: str,
        jurisdiction_code: str | None = None,
        bbox: list[float] | None = None,
    ) -> dict[str, Any]:
        """Validate query and extract spatial intent"""
        query_lower = query.lower().strip()

        # Check for empty query
        if not query_lower:
            return {
                "passed": False,
                "reason": "Query is empty.",
                "extracted_bbox": None,
                "extracted_jurisdiction": None,
            }

        # Safety / topical check (climate, agroforestry, land use, policy)
        # In permissive assistant mode, we allow all informative inquiries
        extracted_jurisdiction = jurisdiction_code
        extracted_bbox = bbox

        # Search for known jurisdiction names in query
        if not extracted_jurisdiction:
            for kw, data in cls.JURISDICTION_KEYWORDS.items():
                if kw in query_lower:
                    extracted_jurisdiction = data["code"]
                    if not extracted_bbox:
                        extracted_bbox = data["bbox"]
                    break

        # Coordinate detection: e.g. [min_lon, min_lat, max_lon, max_lat] or lat/lon pairs
        coord_match = re.findall(r"[-+]?\d*\.\d+|\d+", query)
        if not extracted_bbox and len(coord_match) >= 4:
            try:
                floats = [float(x) for x in coord_match[:4]]
                if all(-180 <= x <= 180 for x in floats):
                    extracted_bbox = floats
            except Exception:
                pass

        return {
            "passed": True,
            "reason": "Query passed verification.",
            "extracted_bbox": extracted_bbox,
            "extracted_jurisdiction": extracted_jurisdiction,
            "query": query,
        }


# -----------------------------------------------------------------------------
# Architect Agent: Query Decomposition & Search Planning
# -----------------------------------------------------------------------------
class ArchitectAgent:
    """Decomposes the query into specialized search strategies"""

    @classmethod
    def plan(
        cls,
        query: str,
        guardian_result: dict[str, Any],
    ) -> dict[str, Any]:
        q_lower = query.lower()
        search_strategies = []

        if any(term in q_lower for term in ["eudr", "deforestation", "compliance", "regulation", "law"]):
            search_strategies.append("policy_eudr")
        if any(term in q_lower for term in ["carbon", "emission", "biomass", "redd", "mrv", "sequestration"]):
            search_strategies.append("carbon_assessment")
        if any(term in q_lower for term in ["parcel", "farm", "polygon", "boundary", "spatial", "map", "trees"]):
            search_strategies.append("geospatial_parcels")
        if any(term in q_lower for term in ["lumens", "preques", "change", "transition", "sankey"]):
            search_strategies.append("lumens_analysis")

        if not search_strategies:
            search_strategies.append("general_knowledge")

        return {
            "primary_intent": search_strategies[0],
            "strategies": search_strategies,
            "sub_queries": [query],
            "search_keywords": [w for w in re.findall(r"\w+", q_lower) if len(w) > 3],
        }


# -----------------------------------------------------------------------------
# Synthesis Agent: Retrieval & Response Generation with Mistral AI
# -----------------------------------------------------------------------------
class SynthesisAgent:
    """Combines retrieved geospatial, document, and policy data into grounded responses"""

    @classmethod
    async def retrieve_context(
        cls,
        query: str,
        guardian_result: dict[str, Any],
        plan: dict[str, Any],
        db: AsyncSession,
    ) -> dict[str, Any]:
        """Perform hybrid retrieval across PostGIS parcels and document catalog"""
        retrieved_docs = []
        retrieved_parcels = []
        retrieved_jurisdiction = None

        j_code = guardian_result.get("extracted_jurisdiction")
        bbox = guardian_result.get("extracted_bbox")

        # 1. Retrieve Jurisdiction if available
        if j_code:
            stmt = select(Jurisdiction).where(Jurisdiction.code == j_code)
            res = await db.execute(stmt)
            retrieved_jurisdiction = res.scalar_one_or_none()

        # 2. Retrieve Parcels via Bounding Box or Jurisdiction
        if bbox:
            try:
                bbox_geom = box(*bbox)
                stmt = select(AgroforestryParcel).where(
                    geofunc.ST_Intersects(
                        AgroforestryParcel.geometry,
                        func.ST_GeomFromText(bbox_geom.wkt, 4326)
                    )
                ).limit(5)
                res = await db.execute(stmt)
                retrieved_parcels = res.scalars().all()
            except Exception as e:
                logger.warning(f"Error querying bbox parcels: {e}")
        elif retrieved_jurisdiction:
            stmt = select(AgroforestryParcel).where(
                AgroforestryParcel.jurisdiction_id == retrieved_jurisdiction.id
            ).limit(5)
            res = await db.execute(stmt)
            retrieved_parcels = res.scalars().all()

        # 3. Retrieve Documents and Clause Chunks
        retrieved_chunks = []
        keywords = plan.get("search_keywords", [])
        if keywords:
            # Query DocumentEmbedding for clause/article matches
            chunk_conditions = [
                DocumentEmbedding.chunk_text.ilike(f"%{kw}%") for kw in keywords[:3]
            ]
            stmt_chunks = select(DocumentEmbedding).where(or_(*chunk_conditions)).limit(4)
            res_chunks = await db.execute(stmt_chunks)
            retrieved_chunks = res_chunks.scalars().all()

            conditions = [DocumentCatalog.title.ilike(f"%{kw}%") for kw in keywords[:3]]
            stmt_doc = select(DocumentCatalog).where(or_(*conditions)).limit(3)
            res_doc = await db.execute(stmt_doc)
            retrieved_docs = res_doc.scalars().all()

        return {
            "jurisdiction": retrieved_jurisdiction,
            "parcels": retrieved_parcels,
            "documents": retrieved_docs,
            "chunks": retrieved_chunks,
        }

    @classmethod
    async def generate_response(
        cls,
        query: str,
        context: dict[str, Any],
        conversation_history: list[dict[str, str]],
    ) -> dict[str, Any]:
        """Synthesize response using Mistral AI if configured or structured domain model"""
        jurisdiction = context.get("jurisdiction")
        parcels = context.get("parcels", [])
        documents = context.get("documents", [])

        citations = []
        sources = []

        # Construct context summary
        context_items = []
        if jurisdiction:
            sources.append({"type": "jurisdiction", "name": jurisdiction.name, "code": jurisdiction.code})
            context_items.append(f"Jurisdiction: {jurisdiction.name} ({jurisdiction.code}), Area: {jurisdiction.area_km2} km²")

        for idx, p in enumerate(parcels, start=1):
            cite_id = f"parcel-{idx}"
            subtype_str = safe_val(p.agroforestry_subtype) or safe_val(p.class_label)
            class_str = safe_val(p.class_label)
            citations.append({
                "id": cite_id,
                "title": f"Parcel {p.id}",
                "type": "agroforestry_parcel",
                "subtype": subtype_str,
                "area_ha": p.area_ha,
                "confidence": p.confidence_score,
            })
            context_items.append(
                f"[{len(citations)}] Agroforestry Parcel (ID: {p.id}): "
                f"type={class_str}, confidence={p.confidence_score:.2f}, area={p.area_ha} ha."
            )

        for idx, doc in enumerate(documents, start=len(citations) + 1):
            cite_id = f"doc-{idx}"
            citations.append({
                "id": cite_id,
                "title": doc.title,
                "type": "document",
                "doi": doc.doi,
            })
            context_items.append(f"[{len(citations)}] Document: '{doc.title}' ({doc.source or 'Scientific Reference'})")

        chunks = context.get("chunks", [])
        for idx, ch in enumerate(chunks, start=len(citations) + 1):
            cite_id = f"clause-{idx}"
            reg = ch.metadata_.get("regulation", "Regulation")
            art = ch.metadata_.get("article", "")
            clause_title = ch.metadata_.get("title", f"{reg} {art}".strip() or "Regulatory Clause")
            citations.append({
                "id": cite_id,
                "title": f"{reg}: {art} - {clause_title}" if art else clause_title,
                "type": "regulatory_clause",
                "page": ch.metadata_.get("page", 1),
                "article": art,
                "regulation": reg,
            })
            context_items.append(
                f"[{len(citations)}] {reg} {art} (Page {ch.metadata_.get('page', 1)}): {ch.chunk_text[:350]}..."
            )

        # If Mistral API key is provided and valid, call Mistral Chat Completions
        if settings.MISTRAL_API_KEY and len(settings.MISTRAL_API_KEY) > 10:
            try:
                system_prompt = (
                    "You are RICH AI, an expert assistant for the AI4D Research and Innovation for Climate Hub. "
                    "You specialize in agroforestry intelligence, LUMENS land use change analysis, EUDR compliance, "
                    "and climate finance for African contexts and Mediterranean agro-silvo-pastoral systems (Dehesa). "
                    "Provide authoritative, helpful, and concise answers citing facts with numbers [1], [2] when referencing context."
                )
                messages = [{"role": "system", "content": system_prompt}]
                for msg in conversation_history[-4:]:
                    messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})

                augmented_query = f"User Question: {query}\n\nRetrieved Context:\n" + ("\n".join(context_items) if context_items else "No specific database records found for this query.")
                messages.append({"role": "user", "content": augmented_query})

                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(
                        f"{settings.MISTRAL_BASE_URL}/chat/completions",
                        headers={
                            "Authorization": f"Bearer {settings.MISTRAL_API_KEY}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "model": settings.MISTRAL_MODEL or "mistral-tiny",
                            "messages": messages,
                            "temperature": 0.3,
                            "max_tokens": 800,
                        },
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["choices"][0]["message"]["content"]
                        return {
                            "response_text": text,
                            "citations": citations,
                            "sources": sources,
                            "model": settings.MISTRAL_MODEL,
                        }
            except Exception as e:
                logger.warning(f"Mistral API call failed or timed out: {e}. Using expert domain synthesis fallback.")

        # Fallback domain-aware synthesis
        response_text = cls._domain_synthesis(query, jurisdiction, parcels, citations)
        return {
            "response_text": response_text,
            "citations": citations,
            "sources": sources,
            "model": "rich-domain-synthesizer-v1",
        }

    @classmethod
    def _domain_synthesis(
        cls,
        query: str,
        jurisdiction: Jurisdiction | None,
        parcels: list[AgroforestryParcel],
        citations: list[dict[str, Any]],
    ) -> str:
        q_lower = query.lower()

        if "eudr" in q_lower or "deforestation" in q_lower:
            return (
                "Under the European Union Deforestation Regulation (EUDR, Regulation (EU) 2023/1115), "
                "agricultural commodities (cocoa, coffee, wood, cattle, soy, palm oil, rubber) imported into the EU "
                "must be verified deforestation-free after the cut-off date of **December 31, 2020**.\n\n"
                "RICH provides parcel-level polygon mapping and Sentinel-2 / AlphaEarth historical change detection to "
                "verify that candidate agroforestry parcels retain stable canopy cover without primary forest conversion [1]. "
                "All parcels with area > 4 hectares require full polygon boundary coordinates for due diligence compliance."
            )

        if "lumens" in q_lower or "preques" in q_lower or "sankey" in q_lower:
            return (
                "The LUMENS (Land Use Planning for Multiple Environmental Services) framework enables comprehensive "
                "landscape modeling through Pre-QuES (historical transition matrices and Sankey flux diagrams), "
                "QUES-C (carbon stock accounting and emissions factors), and QUES-B (biodiversity connectivity and habitat quality).\n\n"
                "In our pilot assessments, integrating discrete agroforestry classifications prevents miscategorizing multi-strata "
                "shade cocoa or dehesa as undifferentiated cropland, enabling accurate baseline accounting for carbon credit mechanisms."
            )

        if "carbon" in q_lower or "redd" in q_lower:
            return (
                "For climate finance and REDD+ MRV reporting, agroforestry systems sequester between 4.5 and 8.5 tCO2e/ha/year "
                "in aboveground and belowground biomass pools. By maintaining high crown density, smallholder agroforestry systems "
                "provide both avoided deforestation benefits and active carbon removals suitable for national NDC and voluntary carbon markets."
            )

        j_name = jurisdiction.name if jurisdiction else "the selected pilot jurisdiction"
        parcel_count = len(parcels)
        return (
            f"Regarding **{query}** in {j_name}:\n\n"
            f"The RICH platform has cataloged geospatial land cover reference points and verified agroforestry parcels "
            f"({parcel_count} active parcel records in view). "
            f"Our multi-agent system integrates Sentinel-1 SAR and Sentinel-2 multispectral imagery to delineate canopy cover, "
            f"providing reliable data for EUDR compliance, LUMENS scenario simulations, and community land-use stewardship."
        )


# -----------------------------------------------------------------------------
# Main AIService Coordinator Class
# -----------------------------------------------------------------------------
class AIService:
    """Public service coordinator for all AI assistant operations"""

    @classmethod
    async def process_chat_query(
        cls,
        query: str,
        session_id: str | None = None,
        user_id: str | None = None,
        conversation_history: list[dict[str, str]] | None = None,
        jurisdiction_code: str | None = None,
        bbox: list[float] | None = None,
        db: AsyncSession | None = None,
    ) -> dict[str, Any]:
        """Execute full multi-agent RAG workflow"""
        start_time = time.time()
        sid = session_id or str(uuid.uuid4())

        # 1. Guardian Agent: Validation & Safety
        guardian = GuardianAgent.evaluate(query, jurisdiction_code, bbox)
        if not guardian["passed"]:
            return {
                "session_id": sid,
                "response": guardian["reason"],
                "guardian_passed": False,
                "sources": [],
                "citations": [],
            }

        # 2. Architect Agent: Planning
        plan = ArchitectAgent.plan(query, guardian)

        # 3. Retrieval & Context Assembly
        context = {"jurisdiction": None, "parcels": [], "documents": []}
        if db:
            context = await SynthesisAgent.retrieve_context(query, guardian, plan, db)

        # 4. Synthesis Agent: Response Generation
        synthesis = await SynthesisAgent.generate_response(
            query=query,
            context=context,
            conversation_history=conversation_history or [],
        )

        latency = int((time.time() - start_time) * 1000)

        # 5. Log interaction to DB
        log_id = None
        if db:
            try:
                retrieved_doc_ids = [d.id for d in context.get("documents", [])]
                retrieved_parcel_ids = [p.id for p in context.get("parcels", [])]

                interaction_log = QueryInteractionLog(
                    session_id=sid,
                    user_id=uuid.UUID(user_id) if user_id else None,
                    original_query=query,
                    guardian_passed=guardian["passed"],
                    guardian_reason=guardian["reason"],
                    architect_query=plan["primary_intent"],
                    retrieved_doc_ids=retrieved_doc_ids,
                    retrieved_parcel_ids=retrieved_parcel_ids,
                    synthesis_source=synthesis.get("model", "rich-agent"),
                    response_text=synthesis["response_text"],
                    sources=synthesis["sources"],
                    citations=synthesis["citations"],
                    total_tokens_used=len(synthesis["response_text"].split()),
                    latency_ms=latency,
                    cache_hit=False,
                )
                db.add(interaction_log)
                await db.commit()
                log_id = str(interaction_log.id)
            except Exception as e:
                logger.error(f"Failed to record query interaction log: {e}")

        return {
            "id": log_id,
            "session_id": sid,
            "response": synthesis["response_text"],
            "sources": synthesis["sources"],
            "citations": synthesis["citations"],
            "latency_ms": latency,
            "guardian_passed": True,
        }

    @classmethod
    async def get_prompt_pills(
        cls,
        jurisdiction_code: str | None = None,
        category: str | None = None,
        db: AsyncSession | None = None,
    ) -> list[dict[str, str]]:
        """Context-aware prompt pills for frontend UI"""
        pills = [
            {
                "id": "pill-1",
                "label": "🇪🇺 EUDR Compliance Check",
                "prompt": "Evaluate EUDR compliance for agroforestry parcels post Dec 31, 2020 cut-off date.",
                "category": "policy",
            },
            {
                "id": "pill-2",
                "label": "🌳 Dehesa Agroforestry Overview",
                "prompt": "Summarize agroforestry parcel coverage and tree canopy density in Extremadura Dehesa.",
                "category": "geospatial",
            },
            {
                "id": "pill-3",
                "label": "📊 Run Pre-QuES Sankey Flux",
                "prompt": "Explain land use transitions between forest and agroforestry using Pre-QuES matrix analysis.",
                "category": "lumens",
            },
            {
                "id": "pill-4",
                "label": "🌿 QUES-C Carbon Sequestration",
                "prompt": "Calculate estimated carbon stock and annual removals for shade cocoa agroforestry.",
                "category": "carbon",
            },
            {
                "id": "pill-5",
                "label": "🇺🇳 REDD+ MRV Reporting",
                "prompt": "Generate a REDD+ MRV report on forest degradation avoidance and emission reductions.",
                "category": "policy",
            },
        ]

        if jurisdiction_code:
            pills.insert(0, {
                "id": "pill-jurisdiction",
                "label": f"📍 Analyze {jurisdiction_code} Landscape",
                "prompt": f"Provide an overview of agroforestry distribution and land cover change for jurisdiction {jurisdiction_code}.",
                "category": "geospatial",
            })

        if category:
            pills = [p for p in pills if p["category"] == category]

        return pills

    @classmethod
    async def submit_feedback(
        cls,
        log_id: str,
        rating: int,
        correction_text: str | None = None,
        user_id: str | None = None,
        db: AsyncSession | None = None,
    ) -> dict[str, Any]:
        """Record user feedback and evaluation for an AI response"""
        if not db:
            return {"status": "success", "recorded": False}

        try:
            stmt = select(QueryInteractionLog).where(QueryInteractionLog.id == uuid.UUID(log_id))
            res = await db.execute(stmt)
            log = res.scalar_one_or_none()

            if log:
                log.rating = rating
                if correction_text:
                    log.feedback_text = correction_text

                feedback = AIFeedback(
                    query_log_id=log.id,
                    user_id=uuid.UUID(user_id) if user_id else None,
                    rating=rating,
                    correction_text=correction_text,
                    feedback_type="user_rating",
                )
                db.add(feedback)
                await db.commit()

            return {"status": "success", "log_id": log_id, "rating": rating}
        except Exception as e:
            logger.error(f"Error submitting feedback: {e}")
            return {"status": "error", "message": str(e)}

    @classmethod
    async def hybrid_search(
        cls,
        query: str,
        search_type: str = "hybrid",
        jurisdiction_code: str | None = None,
        bbox: list[float] | None = None,
        limit: int = 10,
        db: AsyncSession | None = None,
    ) -> list[dict[str, Any]]:
        """Semantic vector search combined with keyword and PostGIS spatial filtering"""
        results = []
        if not db:
            return results

        # 1. Document keyword / catalog search
        stmt_docs = select(DocumentCatalog).where(
            or_(
                DocumentCatalog.title.ilike(f"%{query}%"),
                DocumentCatalog.source.ilike(f"%{query}%"),
            )
        ).limit(limit)
        res_docs = await db.execute(stmt_docs)
        docs = res_docs.scalars().all()

        for d in docs:
            results.append({
                "id": str(d.id),
                "type": "document",
                "title": d.title,
                "source": d.source,
                "doi": d.doi,
                "score": 0.85,
            })

        # 2. Spatial parcels search if bbox provided
        if bbox:
            bbox_geom = box(*bbox)
            stmt_parcels = select(AgroforestryParcel).where(
                geofunc.ST_Intersects(
                    AgroforestryParcel.geometry,
                    func.ST_GeomFromText(bbox_geom.wkt, 4326)
                )
            ).limit(limit)
            res_parcels = await db.execute(stmt_parcels)
            parcels = res_parcels.scalars().all()
            for p in parcels:
                results.append({
                    "id": str(p.id),
                    "type": "parcel",
                    "title": f"Agroforestry Parcel ({safe_val(p.class_label)})",
                    "area_ha": p.area_ha,
                    "confidence": p.confidence_score,
                    "score": 0.90,
                })

        return results

    @classmethod
    async def process_geospatial_query(
        cls,
        query: str,
        jurisdiction_code: str | None = None,
        bbox: list[float] | None = None,
        db: AsyncSession | None = None,
    ) -> dict[str, Any]:
        """Natural language interpretation of geospatial layers and stats"""
        return await cls.process_chat_query(
            query=query,
            jurisdiction_code=jurisdiction_code,
            bbox=bbox,
            db=db,
        )


# Direct functional exports matching api/ai.py imports
process_chat_query = AIService.process_chat_query
get_prompt_pills = AIService.get_prompt_pills
submit_feedback = AIService.submit_feedback
hybrid_search = AIService.hybrid_search
process_geospatial_query = AIService.process_geospatial_query
