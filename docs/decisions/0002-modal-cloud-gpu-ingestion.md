# 2. Serverless Modal Cloud GPU for Document Ingestion

Date: 2026-09-19

## Status

Accepted

## Context

Extracting text and structural metadata from large PDF documents (EUR-Lex EUDR regulations, CIFOR papers) and generating sentence embeddings using transformer models requires GPU acceleration, which is expensive if hosted continuously.

## Decision

We use Modal serverless cloud compute with `gpu="T4"` running `BAAI/bge-small-en-v1.5` on demand. Persistent PDF storage is handled via `modal.Volume("rich-documents-volume")`.

## Consequences

- Compute costs are zero when idle.
- Ingestion jobs are isolated from the web backend service.
