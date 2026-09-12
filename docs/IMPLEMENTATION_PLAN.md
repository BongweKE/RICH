# RICH LUMENS + God's Eye View: Implementation Plan

## Executive Summary

This document outlines a comprehensive plan to integrate **LUMENS** (Land Use Planning for Multiple Environmental Services) with **God's Eye View** (GEV) geospatial visualization, enhanced with **AI capabilities** from acAIcia, to create a cutting-edge system for climate-smart land use planning and agroforestry intelligence in African contexts.

### Key Innovations
- AI-Augmented Community Validation: Combining AlphaEarth embeddings with local expert knowledge
- Multi-Scale Visualization: From satellite overview to parcel-level detail
- Real-Time AI Interpretation: Voice and text interfaces for map exploration
- Scenario Modeling: What-if analysis for land use interventions
- Policy Integration Pathways: Direct connection to EUDR, REDD+, NDC systems

---

## 1. Project Context & Objectives

### 1.1 Problem Statement
From the RICH Project Framework:
- **Invisibility of Agroforestry**: Global land cover maps classify agroforestry as forest, cropland, or undifferentiated mosaic
- **Policy Barriers**: EUDR compliance, climate finance access, spatial planning exclusion
- **Data Gaps**: No labelled training data for tropical African agroforestry at scale
- **Technical Challenge**: Need AI-augmented mapping that integrates community knowledge

### 1.2 Core Objectives
1. Make agroforestry visible as discrete land cover class in African landscapes
2. Enable climate finance access through EUDR-compliant, verified mapping
3. Support spatial planning with AI-enabled scenario analysis
4. Build responsible AI governance frameworks for African contexts
5. Scale across jurisdictions with modular, extensible architecture

### 1.3 Target Jurisdictions
**Phase 1-2**: Ghana (cocoa), Ethiopia (coffee)
**Phase 3**: Cote d'Ivoire, Kenya
**Phase 4**: Cameroon, Tanzania, Uganda

---

## 2. Architecture Overview

### 2.1 System Components
```
RICH LUMENS-GEV System Architecture
┌─────────────────────────────────────────────────────────────┐
│  USER INTERFACE: Vite+React + GEV 3D + Custom LUMENS UI          │
├─────────────────────────────────────────────────────────────┤
│  API LAYER: FastAPI + GEV Server + AI Service (Mistral)          │
├─────────────────────────────────────────────────────────────┤
│  DATA LAYER: Neon Postgres (pgvector+PostGIS) + S3 (Rasters)      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack
| Component | Technology | Source |
|-----------|------------|--------|
| Frontend | Vite + React 18 + TypeScript | acAIcia |
| 3D Rendering | CesiumJS | GEV |
| Backend | FastAPI (Python) | acAIcia |
| AI Services | Mistral AI API | User req. |
| Vector DB | Neon Postgres + pgvector | acAIcia |
| Raster Storage | Neon Object Storage | New |
| Hosting | Railway | hodaripay |
| CI/CD | GitHub Actions | hodaripay |
| Embeddings | Mistral Embeddings / BGE | acAIcia |

### 2.3 Data Flow
```
User Query → AI Assistant → Context Retrieval → Geospatial Analysis → Visualization
                    ↑                        ↑
               Document DB ◄────── Vector DB (Geospatial)
```

---

## 3. Phased Implementation Plan

### 3.1 Phase Overview

| Phase | Duration | Focus | Deliverables |
|-------|----------|-------|--------------|
| Phase 0: Foundation | Month 1-2 | Infrastructure, Data Research | Base system, data catalog |
| Phase 1: Core Integration | Month 3-6 | LUMENS + GEV + AI | Working prototype in 1 jurisdiction |
| Phase 2: Enhancement | Month 7-12 | Advanced features, validation | Multi-jurisdiction support |
| Phase 3: Production | Month 13-18 | Hardening, documentation | Production-ready system |
| Phase 4: Scale | Month 19-24 | Additional jurisdictions | Full deployment |

### 3.2 Detailed Milestones

#### Phase 0: Foundation (Months 1-2)
**M0.1**: Infrastructure Setup
- Create repo structure
- Set up Railway + Neon
- Configure CI/CD (from hodaripay)
- Base Docker images
- Monitoring (Sentry)

**M0.2**: Data Source Research
- Catalog geospatial data for Ghana/Ethiopia
- Identify authoritative sources:
  - Satellite: Sentinel-2, Sentinel-1, GEDI
  - Land cover: ESA WorldCover
  - Boundaries: GADM
  - Climate: ERA5, CHIRPS
  - Soils: SoilGrids
- Document licensing
- Create ingestion pipelines

**M0.3**: Base System Deployment
- Deploy GEV frontend with 3D globe
- Integrate base map layers (OSM, Esri)
- Set up authentication
- Basic AI chat interface
- Deploy to Railway staging

**M0.4**: LUMENS Research
- Analyze LUMENSR functions
- Study lumens-shiny modules
- Document workflows
- Create API specs

#### Phase 1: Core Integration (Months 3-6)
**M1.1**: Database Schema
- Land cover reference points (with embeddings)
- Agroforestry parcels
- Scenarios and results
- LUMENS analysis outputs

**M1.2**: AI Integration
- Document embedding pipeline (from acAIcia)
- Geospatial RAG system
- Mistral AI for queries, reports, compliance
- Prompt engineering for domain

**M1.3**: LUMENS API
- Pre-QuES module as REST API
- Land use change analysis
- Crosstab and transition matrices
- Sankey diagram generation

**M1.4**: GEV + LUMENS Integration
- Adapt GEV layers for LUMENS data
- Custom visualization for land use
- Parcel-level inspection
- Scenario comparison views
- Voice commands for LUMENS

**M1.5**: First Jurisdiction (Ghana)
- Ingest baseline data
- Run initial LUMENS analysis
- Validate with community
- Create demo workflow

**M1.6**: Testing
- Unit tests (pytest)
- Integration tests
- User acceptance testing
- Performance benchmarking

#### Phase 2: Enhancement (Months 7-12)
**M2.1**: Advanced AI
- Multi-turn conversation
- Citation and source attribution
- Feedback loop
- Custom prompts by role

**M2.2**: Scenario Analysis
- QUES-C (Carbon)
- QUES-B (Biodiversity)
- Intervention modeling
- Trade-off analysis
- Uncertainty quantification

**M2.3**: Multi-Jurisdiction
- Add Ethiopia
- Jurisdiction-specific configs
- Cross-jurisdiction comparison
- Data harmonization

**M2.4**: Community Validation
- Validation UI
- Quality control workflows
- Active learning
- Validator dashboard

**M2.5**: Policy Tools
- EUDR compliance checker
- REDD+ MRV reporting
- NDC alignment analysis
- Climate finance eligibility

#### Phase 3: Production (Months 13-18)
**M3.1**: Security & Compliance
- Authentication/authorization
- Data access controls
- Audit logging
- GDPR compliance
- Security testing

**M3.2**: Performance
- Database optimization
- Caching strategies
- Load testing
- Cost optimization

**M3.3**: Documentation
- Technical docs
- User guides
- Developer docs
- Policy maker docs

**M3.4**: Training
- Training materials
- Workshops
- Demo datasets
- Support channels

**M3.5**: Validation
- End-to-end testing
- User acceptance
- Performance benchmarks

#### Phase 4: Scale (Months 19-24)
**M4.1**: Additional Jurisdictions
- Cameroon
- Tanzania
- Uganda
- Harmonization

**M4.2**: Advanced Analytics
- QUES-H (Hydrology)
- Profitability analysis
- Regional modeling
- Machine learning patterns

**M4.3**: External Integration
- National planning systems
- Climate finance platforms
- EUDR systems
- Partner data exchange

**M4.4**: Continuous Improvement
- Regular model updates
- Community validation
- Feature enhancements
- Performance monitoring

**M4.5**: Impact Assessment
- Climate finance access
- EUDR compliance rates
- Planning integration
- Lessons learned

---

## 4. Technical Details

### 4.1 Database Design (Neon Postgres + pgvector)

**Core Tables**:
```sql
-- Land cover reference data
CREATE TABLE land_cover_reference_points (
  id UUID PRIMARY KEY,
  geometry GEOMETRY(POINT, 4326),
  class_label VARCHAR(50),
  validation_status VARCHAR(20),
  embedding_vector vector(768),
  metadata JSONB
);

-- Agroforestry parcels
CREATE TABLE agroforestry_parcels (
  id UUID PRIMARY KEY,
  geometry GEOMETRY(POLYGON, 4326),
  land_cover_class VARCHAR(50),
  confidence_score FLOAT,
  area_ha FLOAT,
  uncertainty FLOAT
);

-- Scenarios
CREATE TABLE scenarios (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  parameters JSONB,
  created_by UUID
);

-- Document embeddings (from acAIcia)
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY,
  document_id UUID,
  chunk_text TEXT,
  embedding vector(768)
);
```

**Indexing**:
- HNSW index on embedding vectors
- GIST index on geometries
- B-tree indexes on foreign keys

### 4.2 API Design

**Key Endpoints**:
```
Geospatial:
GET  /api/layers
GET  /api/parcels
POST /api/parcels/search

LUMENS Analysis:
POST /api/analysis/preques
POST /api/analysis/scenario
GET  /api/analysis/{id}/results

AI Assistant:
POST /api/chat
GET  /api/chat/{session_id}
POST /api/chat/feedback

Policy Tools:
POST /api/policy/eudr-check
POST /api/policy/redd-report
```

### 4.3 AI System

**Multi-Agent Architecture (from acAIcia)**:
- **Guardian**: Query validation, safety checks
- **Architect**: Query decomposition, planning
- **Synthesis**: Response generation, citation

**Embedding Strategy**:
- Document embeddings: BAAI/bge-base-en-v1.5 (768-dim)
- Geospatial embeddings: AlphaEarth Foundations (64-dim)
- Hybrid search: BM25 + vector similarity

**RAG Pipeline**:
1. Query understanding (intent classification, entity extraction)
2. Retrieval (geospatial + vector + keyword)
3. Re-ranking (cross-encoder)
4. Context assembly (chunk concatenation with metadata)

---

## 5. Data Strategy

### 5.1 Data Sources by Category

| Data Type | Source | Resolution | License |
|-----------|--------|------------|---------|
| Satellite Imagery | Sentinel-2 | 10m | Open (ESA) |
| SAR Imagery | Sentinel-1 | 10-40m | Open (ESA) |
| Elevation | GEDI | 25m | Open (NASA) |
| Land Cover | ESA WorldCover | 10m | Open (ESA) |
| Boundaries | GADM | Variable | Open |
| Climate | ERA5 | Global | C3S Terms |
| Soil | SoilGrids | Global | Open |
| Reference Data | Sample Earth | Ghana | Available |
| Plots | CIFOR-ICRAF | Africa | Available |

### 5.2 Data Ingestion Pipeline
```
Source → Preprocessing (clean, validate) → Processing (analyze, transform) → Storage
                                                                           │
                          ┌─────────────────────────────────┐
                          │  Vector DB (Neon Postgres)       │
                          │  Raster Store (S3/COG)           │
                          │  Document DB (Supabase)          │
                          └─────────────────────────────────┘
```

### 5.3 Quality Control

**QC Levels**:
1. Automated: Spatial validity, attribute completeness
2. Statistical: Outlier detection, distribution analysis
3. Expert: Visual inspection, cross-source comparison
4. Community: Stakeholder workshops, active learning

---

## 6. Deployment & Infrastructure

### 6.1 Infrastructure (Railway + Neon + Mistral)
```
Railway Project:
- Frontend (Vite/React/Nginx)
- Backend (FastAPI)
- Workers (Celery for async tasks)

Neon Database:
- Primary (Production)
- Read Replicas (Scaling)
- Branches (Dev/Test)

Mistral AI: Primary LLM provider
```

### 6.2 CI/CD (from hodaripay pattern)
- GitHub Actions workflows:
  - `deploy.yml`: Test → Staging → Production
  - `pr.yml`: Linting, security scans
- Docker-based deployment
- Automated testing

### 6.3 Monitoring
- System metrics: Response times, error rates, uptime
- AI metrics: Query latency, cache hit rate, accuracy
- User metrics: Active users, feature usage
- Business metrics: Jurisdictions covered, policy impact

---

## 7. Testing Strategy

**Test Pyramid**:
- **Unit Tests** (60-70%): pytest (backend), Vitest (frontend)
- **Integration Tests** (20-30%): API interactions, database integration
- **E2E Tests** (5-10%): Cypress/Playwright user workflows

### 7.1 Test Examples

**Backend Unit Test**:
```python
# test_analysis.py
def test_preques_analysis():
    response = client.post("/api/analysis/preques", json=test_data)
    assert response.status_code == 200
    assert "crosstab" in response.json()
```

**Frontend Component Test**:
```typescript
// ChatInterface.test.tsx
test('sends message on Enter', async () => {
  render(<ChatInterface onSend={vi.fn()} />);
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onSend).toHaveBeenCalled();
});
```

**E2E Test**:
```typescript
// land-use-workflow.spec.ts
test('complete workflow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Run Pre-QuES');
  await expect(page.locator('text=Analysis Complete')).toBeVisible();
});
```

---

## 8. Security & Compliance

### 8.1 Authentication & Authorization
**Roles**:
- Guest: Public data, 20 queries/day
- Researcher: All data, own analyses, 100 queries/day
- Policy Maker: All + reports, 200 queries/day
- Admin: All access, unlimited

### 8.2 Data Protection
- Encryption at rest and in transit
- Access controls and permissions
- Audit logging
- GDPR compliance
- Consent management

### 8.3 License Compliance
- Respect all data source licenses
- Proper attribution
- No redistribution of non-permissive data
- Open-source code (MIT license)

---

## 9. Impact & Evaluation

### 9.1 Impact Metrics

**Direct Impacts**:
- Agroforestry parcels mapped
- Jurisdictions covered
- EUDR compliance assessments
- Climate finance applications supported

**Indirect Impacts**:
- Training sessions conducted
- Publications generated
- System accuracy improvements
- User satisfaction scores

### 9.2 Evaluation Framework

| Category | Target | Measurement |
|----------|--------|-------------|
| System uptime | >99.5% | Automated monitoring |
| Query accuracy | >85% | User feedback + validation |
| User satisfaction | >4.5/5 | Surveys |
| Agroforestry visibility | 100% of target areas | Coverage mapping |

---

## 10. Risks & Mitigation

### 10.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API rate limiting | Medium | High | Caching, queue system |
| Data source unavailability | Medium | High | Multiple fallbacks, caching |
| Model accuracy issues | Medium | High | Validation workflows, ensembles |
| System downtime | Low | High | Redundant deployment, monitoring |

### 10.2 Data Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data quality issues | Medium | High | Comprehensive QC, validation |
| Data gaps | Medium | Medium | Multiple sources, interpolation |
| Licensing conflicts | Low | High | Legal review, source selection |

### 10.3 Operational Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Cost overruns | Medium | Medium | Budget monitoring, optimization |
| Partner engagement | Medium | Medium | Regular communication |
| Staff turnover | Low | Medium | Documentation, knowledge transfer |

---

## 11. Budget & Resources

### 11.1 Cost Estimation (Monthly)
| Service | Estimated Cost | Notes |
|---------|----------------|-------|
| Railway | $50-200 | Hosting |
| Neon Postgres | $50-200 | Database |
| Neon Object Storage | $20-100 | Raster storage |
| Mistral AI API | $100-500 | Depends on usage |
| **Total** | **$220-1,200** | |

### 11.2 Human Resources
| Role | Count | Responsibilities |
|------|-------|------------------|
| Technical Lead | 1 | Architecture, coordination |
| Backend Developer | 2 | API, database, integration |
| Frontend Developer | 1 | UI, visualization |
| Geospatial Scientist | 1 | Data processing, analysis |
| AI/ML Engineer | 1 | Model development |
| Project Manager | 1 | Coordination, reporting |
| Community Coordinators | 3-5 | Validation, engagement |

---

## 12. Partners & Collaboration

### 12.1 Key Partners
- **CIFOR-ICRAF**: Technical leadership, research, data, policy
- **LDRI**: African policy expertise, stakeholder connections
- **AfriClimate AI**: Climate AI, community connections
- **Mistral AI**: LLM access, technical support
- **Neon**: Database hosting, technical support

### 12.2 Collaboration Framework
- Weekly technical meetings
- Monthly stakeholder meetings
- Quarterly steering committee
- Knowledge sharing: Documentation, workshops, publications

---

## 13. Sustainability

### 13.1 Technical
- Open source (MIT license)
- Comprehensive documentation
- Community building
- Modular, extensible design
- Standards compliance

### 13.2 Financial
- Diversified funding
- Cost optimization
- Potential paid features
- Grant funding
- Partnership contributions

---

## 14. Questions for Stakeholders

To guide implementation, we need input on:

1. **Prioritization**: Which jurisdiction for Phase 1? (Ghana or Ethiopia?)
2. **Data Access**: What datasets can we leverage from CIFOR-ICRAF?
3. **Partner Connections**: Key contacts at LDRI and AfriClimate AI?
4. **Technical Preferences**: Any technology preferences?
5. **Budget Constraints**: Available budget for Phase 1?
6. **Timeline**: Any hard deadlines?
7. **Branding**: Use RICH branding or new identity?
8. **AI Model Access**: Confirm Mistral AI API access and billing

---

## 15. Next Steps

**Immediate (Week 1-2)**:
1. Set up infrastructure (Railway, Neon, repo)
2. Research data sources for Ghana
3. Create base system with GEV + AI
4. Begin LUMENS integration planning

**Short-term (Month 1-3)**:
1. Deploy base system
2. Ingest first dataset
3. Implement Pre-QuES API
4. Create first analysis workflow

**Medium-term (Month 3-6)**:
1. Complete Phase 1 in Ghana
2. Add Ethiopia support
3. Implement advanced AI features
4. Begin community validation

---

*Document Version: 1.0*
*Last Updated: 2026-09-10*
*Status: Draft - Awaiting Stakeholder Review*

**Supporting Documents**:
- `DATA_SOURCES_CATALOG.md` - Detailed data source information
- `API_SPECIFICATIONS.md` - Complete API documentation
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `TESTING_STRATEGY.md` - Testing approach details
