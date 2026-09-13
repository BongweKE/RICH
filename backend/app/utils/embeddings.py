# RICH Backend - Embedding Generation Utility
# Hybrid embedding generator:
# Primary: High-accuracy 384-dimensional BGE-small embeddings via serverless Modal Cloud GPU endpoint.
# Fallback: Zero-dependency token n-gram feature hashing with L2 normalization when offline.

import functools
import hashlib
import logging
import time
from typing import Any, Dict, List

import httpx
import numpy as np

logger = logging.getLogger(__name__)


def _compute_hash_embedding(text: str, dim: int = 384) -> List[float]:
    """Deterministic hash fallback embedding"""
    vec = np.zeros(dim, dtype=np.float32)
    words = text.lower().split() if text else []
    if not words:
        vec[0] = 1.0
        return vec.tolist()

    for idx, word in enumerate(words):
        # Unigram hash
        h1 = int(hashlib.md5(word.encode("utf-8")).hexdigest(), 16) % dim
        vec[h1] += 1.0
        # Bigram hash
        if idx < len(words) - 1:
            bigram = f"{word}_{words[idx+1]}"
            h2 = int(hashlib.sha256(bigram.encode("utf-8")).hexdigest(), 16) % dim
            vec[h2] += 1.5

    # L2 normalize
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.tolist()


@functools.lru_cache(maxsize=1024)
def _cached_embedding_lookup(text: str, dim: int = 384) -> tuple[float, ...]:
    """Internal LRU-cached embedding lookup"""
    # 1. Try Modal BGE-small GPU endpoint if reachable
    try:
        from app.core.config import settings
        endpoint = getattr(settings, "MODAL_EMBED_URL", "")
        if endpoint and text.strip():
            with httpx.Client(timeout=10.0) as client:
                resp = client.post(endpoint, json={"text": text[:2000]})
                if resp.status_code == 200:
                    data = resp.json()
                    vec = data.get("embedding")
                    if isinstance(vec, list) and len(vec) == dim:
                        return tuple(vec)
    except Exception as e:
        logger.debug(f"Modal embedding endpoint unavailable ({e}), using deterministic hash fallback.")

    return tuple(_compute_hash_embedding(text, dim))


def generate_embedding(text: str, dim: int = 384) -> List[float]:
    """
    Generate normalized 384-dimensional dense vector matching document_embeddings table.
    Queries the Modal serverless BAAI/bge-small-en-v1.5 endpoint if available.
    Falls back gracefully to deterministic token hashing if Modal is offline or unreachable.
    Uses an in-memory LRU cache for 0ms repeated query lookups.
    """
    if not text or not text.strip():
        return _compute_hash_embedding(text, dim)
    return list(_cached_embedding_lookup(text.strip(), dim))


def generate_embeddings_batch(texts: List[str], dim: int = 384) -> List[List[float]]:
    """
    Generate embeddings for multiple texts, batching over Modal if available.
    """
    if not texts:
        return []

    results: List[List[float] | None] = [None] * len(texts)
    uncached_indices = []
    uncached_texts = []

    for idx, t in enumerate(texts):
        clean = (t or "").strip()
        if not clean:
            results[idx] = _compute_hash_embedding("", dim)
        else:
            uncached_indices.append(idx)
            uncached_texts.append(clean)

    if not uncached_texts:
        return [r for r in results if r is not None]

    # Try batch query to Modal
    try:
        from app.core.config import settings
        endpoint = getattr(settings, "MODAL_EMBED_URL", "")
        if endpoint:
            with httpx.Client(timeout=15.0) as client:
                resp = client.post(endpoint, json={"texts": uncached_texts})
                if resp.status_code == 200:
                    data = resp.json()
                    embeddings = data.get("embeddings")
                    if isinstance(embeddings, list) and len(embeddings) == len(uncached_texts):
                        for i, emb in zip(uncached_indices, embeddings):
                            results[i] = emb
                        return [r for r in results if r is not None]
    except Exception as e:
        logger.debug(f"Modal batch embedding unavailable ({e}): {e}")

    # Fallback: process individually
    for i in uncached_indices:
        results[i] = generate_embedding(texts[i], dim)

    return [r for r in results if r is not None]


def check_modal_embedding_status() -> Dict[str, Any]:
    """Health check for Modal Cloud Compute embedding service"""
    try:
        from app.core.config import settings
        endpoint = getattr(settings, "MODAL_EMBED_URL", "")
        if not endpoint:
            return {
                "status": "unconfigured",
                "provider": "Deterministic Hash (Local Fallback)",
                "latency_ms": 0,
                "error": "MODAL_EMBED_URL not set",
            }

        start = time.perf_counter()
        with httpx.Client(timeout=8.0) as client:
            resp = client.post(endpoint, json={"ping": True})
            elapsed_ms = round((time.perf_counter() - start) * 1000, 1)

            if resp.status_code == 200:
                data = resp.json()
                return {
                    "status": "online",
                    "provider": data.get("provider", "Modal Cloud Compute"),
                    "model": data.get("model", "BAAI/bge-small-en-v1.5"),
                    "gpu": data.get("gpu", "T4"),
                    "dimensions": data.get("dim", 384),
                    "latency_ms": elapsed_ms,
                    "endpoint": endpoint,
                }
            else:
                return {
                    "status": "error",
                    "provider": "Deterministic Hash (Fallback)",
                    "http_status": resp.status_code,
                    "latency_ms": elapsed_ms,
                }
    except Exception as e:
        return {
            "status": "offline",
            "provider": "Deterministic Hash (Fallback)",
            "error": str(e),
            "latency_ms": 0,
        }


async def trigger_cloud_ingest(force: bool = False) -> Dict[str, Any]:
    """Trigger cloud document ingestion on Modal"""
    try:
        from app.core.config import settings
        endpoint = getattr(settings, "MODAL_INGEST_URL", "")
        if not endpoint:
            return {"success": False, "error": "MODAL_INGEST_URL not configured"}

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(endpoint, json={"force": force})
            if resp.status_code == 200:
                return {"success": True, "data": resp.json()}
            return {"success": False, "status_code": resp.status_code, "body": resp.text}
    except Exception as e:
        return {"success": False, "error": str(e)}
