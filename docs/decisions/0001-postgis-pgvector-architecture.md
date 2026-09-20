# 1. Neon PostGIS and pgvector Hybrid Storage

Date: 2026-09-19

## Status

Accepted

## Context

The RICH platform requires high-interactivity 3D geospatial intelligence alongside RAG-driven policy and compliance search (EUDR, REDD+, GDPR). We need spatial indexing for 26,000+ parcels and vector similarity search across compliance documents.

## Decision

We adopt Neon Serverless PostgreSQL with PostGIS (SRID 4326/3857) and pgvector (Vector 384 dimensions) as our single database backend.

## Consequences

- Spatial queries and vector searches can be joined within single ACID transactions.
- Embedding dimensionality is fixed to 384 dimensions (`BAAI/bge-small-en-v1.5`).
