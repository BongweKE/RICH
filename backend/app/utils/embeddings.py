# RICH Backend - Embedding Generation Utility
# Hybrid embedding generator:
# Primary: High-accuracy 384-dimensional BGE-small embeddings via serverless Modal Cloud GPU endpoint.
# Fallback: Zero-dependency token n-gram feature hashing with L2 normalization when offline.

import hashlib
import logging
from typing import List

import httpx
import numpy as np

logger = logging.getLogger(__name__)


def generate_embedding(text: str, dim: int = 384) -> List[float]:
    """
    Generate normalized 384-dimensional dense vector matching document_embeddings table.
    Queries the Modal serverless BAAI/bge-small-en-v1.5 endpoint if available.
    Falls back gracefully to deterministic token hashing if Modal is offline or unreachable.
    """
    # 1. Try Modal BGE-small GPU endpoint if reachable
    try:
        from app.core.config import settings
        endpoint = getattr(settings, "MODAL_EMBED_URL", "")
        if endpoint and text.strip():
            with httpx.Client(timeout=3.0) as client:
                resp = client.post(endpoint, json={"text": text[:2000]})
                if resp.status_code == 200:
                    data = resp.json()
                    vec = data.get("embedding")
                    if isinstance(vec, list) and len(vec) == dim:
                        return vec
    except Exception as e:
        logger.debug(f"Modal embedding endpoint unavailable ({e}), using deterministic hash fallback.")

    # 2. Deterministic Hash Fallback
    vec = np.zeros(dim, dtype=np.float32)
    words = text.lower().split()
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

