# Research Summary: LUMENS + God's Eye View Integration

## Overview

This document summarizes the research conducted on the three key open-source projects and the RICH project framework to develop a comprehensive implementation plan for integrating LUMENS land use planning with God's Eye View geospatial visualization, enhanced by AI capabilities.

---

## 1. Project Analysis Summary

### 1.1 God's Eye View (https://github.com/bilawalsidhu/gods-eye-view)

**Architecture**:
- **Frontend**: HTML5 + JavaScript (ES modules) + CSS
- **Rendering**: CesiumJS for 3D globe visualization
- **Build**: Vite bundler with Rollup
- **Data**: Modular data source architecture with live and bundled data

**Key Features**:
- Photorealistic 3D globe with multiple basemap options
- Live data feeds: aircraft (OpenSky, adsb.lol), ships (AISStream), satellites (CelesTrak)
- Environmental layers: earthquakes (USGS), fires (NASA FIRMS), weather (Open-Meteo)
- Traffic simulation and live data (TomTom)
- Public camera feeds (Austin, London, California)
- Voice control with AI agent (OpenAI)
- Sensor modes: CRT, NVG, FLIR, Noir, Snow
- Detection overlay with bounding boxes
- Military HUD with tactical telemetry
- Scene director for cinematic camera tours
- Share links with camera, style, layers serialization

**Data Sources**:
- 20+ live sources (fetched at runtime)
- 5 bundled datasets (with proper attribution)
- Comprehensive attribution system (required in-app)
- Open data philosophy with clear licensing

**Strengths for RICH Integration**:
- Excellent 3D visualization foundation
- Modular layer architecture (easy to add LUMENS layers)
- Voice control infrastructure (can extend for land use queries)
- Live data integration patterns (applicable to LUMENS analysis results)
- Camera control and tracking systems (useful for parcel inspection)
- Open source with MIT license

**Technical Stack**:
- Node.js 24.x or 26.x
- Vite 4.x for building
- CesiumJS for 3D rendering
- Express-like server for API endpoints
- Comprehensive test suite (100+ test files)

**Performance**:
- Cold start: ~1.86 seconds (M5/Chrome baseline)
- Optimized rendering pipeline
- Memory-efficient data loading

**Documentation**:
- Extensive README with usage guides
- Detailed DATA_SOURCES.md with licensing
- SECURITY.md with security guidelines
- CONTRIBUTING.md for development
- TESTING.md for testing approach
- docs/ directory with media and examples

---

### 1.2 LUMENSR (https://github.com/icraf-indonesia/LUMENSR/)

**Overview**:
- R package implementing core LUMENS functions
- Currently offers **Pre-QuES** module (Pre-Quantitative Evaluation System)
- Experimental development status
- Built on devtools framework

**Pre-QuES Module**:
- **Purpose**: Analyze land use changes by comparing land cover maps from two time periods
- **Functions**:
  - `add_legend_to_categorical_raster()`: Add legend using lookup tables
  - `create_crosstab()`: Create frequency table (crosstab) from raster list
  - `abbreviate_by_column()`: Abbreviate column names for readability
  - `create_sankey()`: Create Sankey diagram from crosstab results

**Worked Example**:
```r
library(LUMENSR)

# Load example raster files
lc_t1 <- terra::rast(LUMENSR_example("NTT_LC90.tif"))
t1 <- 1990
lc_t2 <- terra::rast(LUMENSR_example("NTT_LC20.tif"))
t2 <- 2020

# Add legend
lc_t1_attr <- add_legend_to_categorical_raster(raster_file = lc_t1,
                                               lookup_table = lc_lookup_klhk_sequence,
                                               year = t1)
lc_t2_attr <- add_legend_to_categorical_raster(raster_file = lc_t2,
                                               lookup_table = lc_lookup_klhk_sequence,
                                               year = t2)

# Create crosstab
crosstab_result <- create_crosstab(c(lc_t1_attr, lc_t2_attr))

# Abbreviate columns
crosstab_result_abbreviated <- abbreviate_by_column(
  df = crosstab_result$crosstab_long,
  col_names = as.character(c(t1, t2)),
  remove_vowels = FALSE
)

# Create Sankey diagram
create_sankey(crosstab_result_abbreviated, area_cutoff = 10000, change_only = FALSE)
```

**Dependencies**:
- terra (for raster handling)
- dplyr, tidyr (for data manipulation)
- ggplot2, plotly (for visualization)
- plyr, reshape (for data reshaping)

**Strengths for RICH Integration**:
- Proven methodology for land use change analysis
- Quantitative evaluation framework
- Visualization tools (Sankey diagrams)
- R-based (integrates well with data science ecosystem)

**Limitations**:
- Currently only Pre-QuES module available in R package
- Requires transformation to API for web integration
- Limited to R ecosystem (need Python/JS adaptation)

**Related Repositories**:
- **lumens-shiny**: Full LUMENS Shiny web application with all modules
- **lumensbook**: Complete documentation and tutorials

---

### 1.3 lumens-shiny (https://github.com/icraf-indonesia/lumens-shiny)

**Architecture**:
- **Framework**: R Shiny (web application framework for R)
- **Structure**: Modular with separate directories for each module
- **Organization**: 13+ modules in separate directories (01_pur1 through 12_lasem)

**Available Modules**:

| Module | Code | Description | Priority for RICH |
|--------|------|-------------|-------------------|
| PUR 1 | 01_pur1 | Purpose and Background | LOW |
| PUR 2 | 02_pur2 | Stakeholder Mapping | MEDIUM |
| Pre-QUES | 03_preques | Pre-Quantitative Evaluation System | HIGH |
| QUES-C | 04_quesc | Carbon assessment | HIGH |
| QUES-B | 05_quesb | Biodiversity assessment | HIGH |
| QUES-H | 06_quesh | Hydrology assessment | MEDIUM |
| TA Profit | 07_ta-profit | Profitability analysis | MEDIUM |
| TA Regional 1 | 08_ta-regional1 | Regional analysis 1 | MEDIUM |
| TA Regional 2 | 09_ta-regional2 | Regional analysis 2 | MEDIUM |
| Sciendo Scenario | 10_sciendo-scenario | Scenario development | HIGH |
| Sciendo Simulate | 11_sciendo-simulate | Simulation | HIGH |
| Sciendo Train | 11_sciendo-train | Training | LOW |
| LASEM | 12_lasem | Landscape Scenario Evaluation Model | MEDIUM |

**Module Analysis**:

**03_preques (Pre-QuES)**:
- **Purpose**: Analyze land use changes between two time periods
- **Inputs**: Land cover rasters for T1 and T2 with legends
- **Process**: Create crosstab, calculate changes, generate Sankey diagram
- **Outputs**: Transition matrix, change statistics, visualizations
- **RICH Relevance**: Core functionality for land use change analysis

**04_quesc (QUES-C - Carbon)**:
- **Purpose**: Assess carbon stocks and changes
- **Inputs**: Land cover, biomass, carbon density data
- **Process**: Calculate carbon stocks, emission factors, change analysis
- **Outputs**: Carbon maps, emission estimates, mitigation potential
- **RICH Relevance**: Critical for climate finance (REDD+, carbon markets)

**05_quesb (QUES-B - Biodiversity)**:
- **Purpose**: Assess biodiversity values
- **Inputs**: Land cover, species data, habitat maps
- **Process**: Habitat assessment, species richness estimation, conservation value
- **Outputs**: Biodiversity maps, conservation priorities, impact assessment
- **RICH Relevance**: Important for environmental impact assessment

**10_sciendo-scenario (Scenario Development)**:
- **Purpose**: Create and analyze land use scenarios
- **Inputs**: Current land use, intervention options, constraints
- **Process**: Scenario modeling, impact assessment, trade-off analysis
- **Outputs**: Scenario maps, impact metrics, comparison tools
- **RICH Relevance**: Essential for policy integration and planning

**Key Functions in lumens-shiny**:
- `server.R`: Main application server
- `app.R`: Application entry point
- `helper.R`: Utility functions
- Module-specific R files in each directory

**Data Directory**:
- Contains sample datasets for modules
- Lookup tables for classifications
- Reference data for examples

**www/ Directory**:
- Custom UI components
- CSS styling
- JavaScript enhancements

**Strengths for RICH Integration**:
- Complete land use planning framework
- All LUMENS modules implemented
- Proven in 7 Indonesian provinces
- Stakeholder engagement tools
- Scenario analysis capabilities
- Trade-off assessment methods

**Technical Considerations**:
- Written in R Shiny (need to port to Python/JS or wrap as API)
- Monolithic application structure
- Designed for interactive workshops
- Requires R runtime environment

---

### 1.4 lumensbook (https://github.com/icraf-indonesia/lumensbook)

**Overview**:
- Complete documentation for LUMENS system
- Quarto-based book structure
- Well-organized with clear workflow

**Structure**:
- `index.qmd`: Main entry point
- `01-build.qmd`: Build module documentation
- `02-reconcile.qmd`: Reconcile module
- `03-preques.qmd`: Pre-QuES documentation
- `04-carbon.qmd`: Carbon module
- `05-biodiversity.qmd`: Biodiversity module
- `06-hydrology.qmd`: Hydrology module
- `07-profitability.qmd`: Profitability module
- `08-regional1.qmd`: Regional analysis 1
- `09-regional2.qmd`: Regional analysis 2
- `10-scenario.qmd`: Scenario development
- `11-lucm.qmd`: Land use change modeling
- `12-lasem.qmd`: LASEM documentation
- `13-rice_ID.qmd`: Rice module (Indonesia-specific)
- `13-rice.qmd`: Generic rice module

**Documentation Quality**:
- Well-written with clear explanations
- Step-by-step workflows
- Code examples in R
- Visual outputs (figures, tables)
- References to scientific literature

**Key Insights from lumensbook**:

1. **LUMENS Workflow**:
   - Stakeholder mapping and engagement
   - Data collection and preprocessing
   - Baseline analysis (Pre-QuES)
   - Scenario development
   - Impact assessment (QUES modules)
   - Negotiation support
   - Monitoring and evaluation

2. **Pre-QuES Detailed Workflow**:
   - Prepare land cover maps for two time periods
   - Add legends and metadata
   - Create crosstab of transitions
   - Calculate change statistics
   - Generate Sankey diagrams
   - Interpret results with stakeholders

3. **Scenario Analysis**:
   - Define current situation
   - Develop alternative scenarios
   - Assess impacts (carbon, biodiversity, hydrology, profitability)
   - Compare trade-offs
   - Identify optimal pathways

4. **Integration with Policy**:
   - Connect analysis to spatial planning
   - Inform NDC implementation
   - Support REDD+ MRV
   - Enable climate finance access

**Strengths**:
- Comprehensive documentation
- Clear methodology
- Practical examples
- Integration with policy frameworks

---

## 2. RICH Project Framework Analysis

### 2.1 Project Context

**Institution**: CIFOR-ICRAF (Center for International Forestry Research and World Agroforestry)
- 30+ years of climate, land use, and agroforestry science
- 30+ countries in Africa, including Kenya (Nairobi headquarters)
- Proven geospatial production pipeline from ground truth to policy-ready maps
- LUMENS platform deployed across 7 Indonesian provinces

**Core Problem**: Agroforestry Invisibility
- Global land cover maps classify agroforestry as forest, cropland, or mosaic
- 43% of global agricultural area is agroforestry (Zomer et al., 2016)
- 60-80% of smallholder households in tropical Africa practice agroforestry
- No labelled training data exists at tropical African scale
- Termed "dark matter of land cover maps"

**Cascading Consequences**:
1. **EUDR Compliance Barriers**: Current maps classify shade-grown agroforestry as forest with ~63% probability
2. **Climate Finance Blockage**: Agroforestry sequesters 3.5-9.8 MgCO2/ha/year but no map records this
3. **Restoration Planning Blind Spot**: Policymakers lack baseline data on existing agroforestry

**Research Approach**:
- **ALIA Methodology**: Adaptive Landscape Intelligence in Africa
- Focus on cocoa-growing regions of Ghana and Cote d'Ivoire
- Open, geotagged reference data to improve map accuracy
- Community validation for inclusiveness

---

### 2.2 Research Tracks

**Track 1: AI-Augmented Climate Intelligence for Agroforestry Systems**
- Use ALIA methodology
- Generate new climate-relevant evidence
- AI-augmented mapping with community validation
- Focus on diversity of tropical African agroforestry systems

**Track 2: Climate Governance, Policy, and Climate Finance Pathways**
- Translate validated maps into policy-ready evidence
- How agroforestry mapping enters EUDR compliance chains
- How AI-derived land use data feeds into REDD+ MRV and NDC reporting
- Connect to national spatial planning processes

**Track 3: Scenario-Based AI Risks and Climate Futures in African Contexts**
- Assess how AI systems shape climate adaptation, mitigation, governance
- Model scenarios of AI deployment across climate-relevant use cases
- Examine data gaps, classification choices, validation processes
- Identify conditions where AI systems reinforce or reduce inequalities

---

### 2.3 Research Outputs

**Output 1: AI-Augmented Climate Knowledge Base for Agroforestry Systems**
- 2,000 validated reference points across 1 pilot landscape
- Classification scheme: 8-10 main classes + sub-classes
- Each point: class label, sub-type, validator, GPS date, quality score, AlphaEarth embedding
- License: CC BY 4.0, Hosted on Dataverse

**Output 2: Policy-Relevant AI-Enabled Land Use Intelligence**
- Geospatial maps at 10m resolution for 1 pilot landscape
- Agroforestry as discrete land cover class
- Per-class accuracy metrics and uncertainty layers
- License: CC BY 4.0, Hosted on Dataverse

**Output 3: Multi-Stakeholder Capacities for Spatial Planning Integration Pathway**
- Workshops and training on spatial planning integration
- Policy briefs on utilizing agroforest maps
- Capacity building for government planners, NGO staff, community representatives

**Output 4: Scenario-Based AI Risk and Climate Governance Analysis**
- Scenarios modeling AI deployment pathways
- Environmental implications assessment
- Representation and distributional outcomes
- Policy briefs on governance strategies

**Output 5: Climate-AI Governance and Policy Synthesis Products**
- Comparative research and policy analysis
- Knowledge synthesis reports
- Peer-reviewed publications
- Evidence connecting technical outputs to broader climate questions

---

### 2.4 Methods

**Stage 1: Dataset Production**

**Step 1a: Classification Scheme Development**
- Collaborative definition with experts and community
- Thematic classes, working definitions, diagnostic characteristics
- Community input: seasonal phenology, crop-tree associations, parcel size/shape, harvest evidence
- Spatial priors to constrain predictions to agronomically plausible locations

**Step 1b: AI-Assisted Data Labelling and Candidate Generation**
- Experts classify land cover through AI-assisted visual interpretation
- High-resolution imagery (Google Earth, Planet) + SPAM crop data
- Annotation relies on contextual cues: irregular spatial arrangement, heterogeneous canopy texture
- Each point labelled, QA reviewed, quality controlled
- Community-verified points anchor spectral-temporal similarity search using AlphaEarth embeddings
- Active learning cycle progressively expands reference pool
- Integration of CIFOR-ICRAF existing geotagged agroforest plot database
- Temporal alignment: each reference point matched to corresponding annual AlphaEarth composite

**Step 1c: Data Collection Process Design**
- Document sources of uncertainty, class ambiguity, data gaps
- Serve as inputs into Stage 4 modeling of representation and distributional risks

**Stage 2: Map Production**
- AI-augmented community-validated labels train lightweight classifiers on AlphaEarth embeddings
- AlphaEarth Foundations: 64-dimensional embeddings at 10m resolution
- Integrates Sentinel-2, Sentinel-1 SAR, GEDI lidar, ERA5 climate, elevation
- Contextual spatial priors (crop suitability, road networks) constrain predictions
- Participatory map review sessions with community members
- Per-class accuracy metrics and uncertainty layers produced

**Stage 3: Capacity Building and Policy Integration Pathways**
- Adapt LUMENS platform for African spatial planning contexts
- Training materials on land use/land cover map utilisation
- Policy briefs on using agroforest maps for spatial planning
- Government planners, NGO staff, community representatives participate in workshops

**Stage 4: Scenario-Based Risk Analysis**
- Develop scenarios based on desk research and project data
- Model how AI systems used in land-use mapping may shape environmental and equity outcomes
- Variations in model complexity, data volumes, update frequency, compute infrastructure
- Assess environmental implications (energy demand, water use, emissions)
- Review representation and distributional outcomes
- Identify risk pathways and governance recommendations

---

### 2.5 Activity Plan & Timeline

| Quarter | Key Activities | Primary Outputs |
|---------|----------------|-----------------|
| Q1 | Consortium mobilization, pilot selection, governance framework | All Outputs |
| Q1-Q2 | Classification scheme development, policy research questions | Outputs 1, 5 |
| Q2-Q4 | AI-assisted reference data generation, community validation | Output 1 |
| Q3-Q5 | AI-enabled agroforestry mapping pipeline, pilot products | Output 2 |
| Q4-Q8 | Research on visibility, governance, compliance, MRV, NDC | Output 5 |
| Q4-Q8 | Comparative analysis of AI-enabled climate applications | Output 5 |
| Q5-Q7 | LUMENS adaptation for Africa, spatial planning pathways | Output 3 |
| Q5-Q8 | Stakeholder consultations, capacity strengthening | Output 3 |
| Q5-Q8 | Scenario development, environmental/equity modeling | Output 4 |
| Q6-Q8 | Governance recommendations for responsible AI | Outputs 4, 5 |
| Q6-Q8 | Policy briefs, comparative analyses, synthesis reports | Output 5 |
| Q7-Q8 | Peer-reviewed publications, dissemination | Output 5 |

**Timeline**: 24 months total
**Budget**: KES 28,000,000 (~$185,000 USD)

---

### 2.6 Impact Pathways

**2026: EUDR Compliance**
- Pilot agroforest map serves Ghana, Cote d'Ivoire, Cameroon, Ethiopia, Kenya
- Transforms compliance barrier into compliance pathway

**2025-2030: Climate Finance and MRV**
- Agroforestry maps fill data gaps in REDD+ monitoring systems
- Enable results-based payments
- Ghana's FCPF program has disbursed $4.8M for verified agroforestry emission reductions

**NDC Revision Cycles (2024-2026)**
- Most tropical African countries revise NDCs
- Pilot map provides evidence for enhanced agroforestry targets

**LUMENS as Policy Integration Pathway**
- Proven in 7 Indonesian provinces
- Adaptation to African contexts as core deliverable

---

## 3. Reference Project Analysis

### 3.1 acAIcia Project (Internal Reference)

**Architecture**:
- **Frontend**: Vite + React 18 SPA
- **Backend**: FastAPI (Python) on Modal Serverless
- **Database**: Supabase (PostgreSQL + pgvector + RRF)
- **AI**: Multi-agent system (Guardian, Architect, Synthesis)

**Key Features**:
- Persistent multi-session chat history
- Guest query limits (20 max)
- Hybrid search RRF (Reciprocal Rank Fusion)
- Context-guarded semantic caching
- In-chat response feedback
- Custom research instructions
- Granular latency telemetry
- Automated RAG evaluation suite

**Database Schema** (relevant to RICH):
```sql
-- Documents catalog
CREATE TABLE documents_catalog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text[],
  publication_year integer,
  topic_keywords text[],
  url_link text,
  doi text,
  created_at timestamp
);

-- Document embeddings
CREATE TABLE document_embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents_catalog(id),
  chunk_text text not null,
  embedding vector(768) not null, -- BAAI/bge-base-en-v1.5
  created_at timestamp
);

-- HNSW index for vector search
CREATE INDEX ON document_embeddings USING hnsw (embedding vector_cosine_ops);

-- Match documents function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
) RETURNS TABLE (...) LANGUAGE sql stable;

-- Ingestion logs
CREATE TABLE ingestion_logs (
  log_id uuid primary key default gen_random_uuid(),
  timestamp timestamp,
  filename text,
  chunks_created integer,
  status text,
  error_message text
);

-- Query interaction logs
CREATE TABLE query_interaction_logs (
  log_id uuid primary key default gen_random_uuid(),
  timestamp timestamp,
  session_id text,
  original_query text,
  guardian_passed boolean,
  architect_query text,
  retrieved_doc_ids uuid[],
  synthesis_source text,
  total_tokens_used integer,
  latency_ms integer
);
```

**Multi-Agent System**:
1. **Guardian Agent**: Query validation, safety checks, context guarding
2. **Architect Agent**: Query decomposition, planning, rewrite
3. **Synthesis Agent**: Response generation with citation

**Deployment**:
- Frontend: Railway (automated build on main branch push)
- Backend: Modal Serverless Python
- Database: Supabase
- Docker-based containerization

**Relevance to RICH**:
- **Database Schema**: Can be adapted for geospatial + embeddings
- **AI Architecture**: Proven multi-agent pattern for domain-specific AI
- **RAG Pipeline**: Hybrid search with BM25 + vector + keyword
- **Caching**: Semantic caching for frequently asked queries
- **Evaluation**: Automated RAG evaluation suite
- **Frontend**: React + Vite + TypeScript pattern
- **Deployment**: Railway + Modal pattern

### 3.2 hodaripay Project (Internal Reference)

**Architecture**:
- **Frontend**: Flutter (mobile + web)
- **Backend**: Dart Frog (Dart server framework)
- **Database**: Supabase/Postgres
- **Hosting**: Railway

**CI/CD Patterns** (relevant to RICH):

**.github/workflows/**:
- `deploy-staging.yml`: Automated deployment to staging
- `promote.yml`: Promotion to production
- `pr.yml`: Pull request checks (linting, security)
- `release-apk-production.yml`: APK release workflow
- `release-apk-staging.yml`: Staging APK release

**railway.json**:
```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/api/Dockerfile",
    "watchPatterns": ["backend/**", "packages/shared/**"]
  },
  "deploy": {
    "startCommand": "./hodaripay-server",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

**Relevance to RICH**:
- **CI/CD Workflows**: Proven GitHub Actions patterns
- **Docker Deployment**: Containerization best practices
- **Railway Configuration**: Deployment configuration templates
- **Health Checks**: Production monitoring patterns
- **Watch Patterns**: Efficient rebuild triggers

---

## 4. Key Insights & Recommendations

### 4.1 Architecture Insights

**From God's Eye View**:
- Modular layer architecture is excellent for adding LUMENS-specific layers
- 3D visualization with CesiumJS provides superior user experience
- Voice control infrastructure can be extended for land use queries
- Live data integration patterns are applicable to LUMENS analysis results
- Camera control and tracking systems enable parcel-level inspection

**From LUMENS/LUMENSR**:
- Pre-QuES module provides core quantitative analysis foundation
- Scenario modeling enables what-if analysis for policy
- Stakeholder engagement methods are crucial for validation
- Modular module structure allows incremental implementation

**From acAIcia**:
- Multi-agent AI architecture works well for domain-specific applications
- Hybrid RAG (vector + keyword + geospatial) is ideal for our use case
- Supabase/Neon Postgres with pgvector provides necessary infrastructure
- Semantic caching improves performance for frequent queries

**From hodaripay**:
- GitHub Actions CI/CD provides robust automation
- Docker-based deployment ensures consistency
- Railway hosting is proven and cost-effective
- Health checks and monitoring are essential for production

### 4.2 Technical Recommendations

**Frontend**:
- Use Vite + React 18 + TypeScript (from acAIcia pattern)
- Integrate CesiumJS from GEV for 3D visualization
- Add MapLibre GL JS for 2D mapping
- Use Tailwind CSS + Headless UI for styling
- Zustand for state management

**Backend**:
- FastAPI (Python) for main API (from acAIcia)
- Node.js server for GEV integration (from GEV)
- Celery for async tasks (long-running analysis)
- Python workers for LUMENS processing

**Database**:
- Neon Postgres with pgvector extension (from acAIcia)
- PostGIS for geospatial operations
- Separate buckets for raster data in Neon Object Storage
- Time-series support for historical analysis

**AI/ML**:
- Mistral AI API as primary LLM (user requirement)
- BAAI/bge-base-en-v1.5 for document embeddings (768-dim)
- AlphaEarth Foundations for geospatial embeddings (64-dim)
- Hybrid RAG with geospatial + vector + keyword search

**Hosting**:
- Railway for full-stack deployment (from hodaripay pattern)
- Neon for database and storage
- Modal Serverless for AI inference (optional, from acAIcia)

**CI/CD**:
- GitHub Actions workflows (from hodaripay)
- Automated testing with pytest (backend) and Vitest (frontend)
- Security scanning (Snyk)
- Linting with ruff, black, mypy

### 4.3 Data Strategy Insights

**Available Data**:
- Sentinel-2: Primary optical imagery (10m, 5-day revisit, open access)
- Sentinel-1: Primary SAR imagery (10-40m, 6-12 day revisit, open access)
- GEDI: Primary LiDAR for canopy structure (25m, open access)
- Sample Earth: Primary reference data for Ghana cocoa/coffee
- CIFOR-ICRAF: Primary field plot data for Africa
- ESA WorldCover: Baseline land cover (10m, annual, no agroforestry class)

**Data Gaps**:
- No agroforestry class in any existing land cover product
- Limited reference data for tropical African agroforestry
- Need to create 2,000 new validated reference points per jurisdiction

**Mitigation Strategy**:
- Use AI-assisted visual interpretation for label generation
- Community validation for quality assurance
- Active learning to expand reference pool
- Multi-sensor fusion (Sentinel-2 + Sentinel-1 + GEDI) for improved classification

### 4.4 Integration Strategy

**LUMENS + GEV Integration**:
1. Implement LUMENS modules as REST API endpoints
2. Add LUMENS-specific layers to GEV visualization
3. Create custom UI components for LUMENS analysis
4. Integrate analysis results with 3D visualization
5. Add voice commands for LUMENS functions

**AI + Geospatial Integration**:
1. Extend RAG pipeline with geospatial search
2. Add geospatial context to AI responses
3. Enable natural language queries on maps
4. Generate automated reports from analysis
5. Provide policy compliance analysis

**Policy + Technical Integration**:
1. Connect to EUDR compliance frameworks
2. Integrate with REDD+ MRV systems
3. Support NDC reporting requirements
4. Enable climate finance eligibility assessment
5. Provide spatial planning integration pathways

### 4.5 Phased Approach Rationale

**Phase 0 (Foundation)**:
- Establish infrastructure before development
- Research data sources to ensure feasibility
- Create base system for incremental development

**Phase 1 (Core Integration)**:
- Focus on one jurisdiction (Ghana) for proof of concept
- Implement core LUMENS function (Pre-QuES)
- Integrate basic AI capabilities
- Validate with community partners

**Phase 2 (Enhancement)**:
- Add advanced LUMENS modules (QUES-C, QUES-B)
- Expand to second jurisdiction (Ethiopia)
- Implement community validation system
- Add policy integration tools

**Phase 3 (Production)**:
- Harden system for production use
- Complete documentation
- Conduct training
- Final validation

**Phase 4 (Scale)**:
- Expand to additional jurisdictions
- Add advanced analytics
- Integrate with external systems
- Measure impact

---

## 5. Questions for Stakeholders

To finalize the implementation plan, we need clarification on:

### 5.1 Technical Questions

1. **Infrastructure**: Do we have Railway account access and credentials?
2. **Database**: Do we have Neon account access for database and storage?
3. **AI Access**: What is the Mistral AI API access arrangement (keys, billing)?
4. **Data Access**: What CIFOR-ICRAF datasets can we access immediately?
5. **Technology Preferences**: Any strong preferences for specific technologies?

### 5.2 Project Questions

6. **Jurisdiction Priority**: Should Ghana or Ethiopia be Phase 1 focus?
7. **Timeline**: Any hard deadlines for initial deliverables?
8. **Budget**: What is the available budget for Phase 1 (Months 1-6)?
9. **Partners**: Who are the key contacts at LDRI and AfriClimate AI?
10. **Branding**: Use RICH branding or create new identity?

### 5.3 Data Questions

11. **Existing Data**: What geospatial data does CIFOR-ICRAF already have for target jurisdictions?
12. **Partnerships**: Are there existing partnerships for data access (government, industry)?
13. **Field Data**: Can we access CIFOR-ICRAF field plot data for model training?
14. **Reference Data**: Can we leverage Sample Earth data for Ghana?
15. **Storage**: Any existing cloud storage or should we set up new?

### 5.4 Strategic Questions

16. **Scope**: Should we focus on cocoa/coffee or include other agroforestry systems?
17. **Users**: Who are the primary users (researchers, policymakers, farmers)?
18. **Deployment**: Should we deploy as a single system or modular components?
19. **Open Source**: Should all code be open source (MIT license)?
20. **Commercial**: Any plans for commercialization or is this purely research?

---

## 6. Conclusion

The research reveals that:

1. **God's Eye View** provides an excellent foundation for 3D geospatial visualization with a modular architecture that can readily accommodate LUMENS functionality.

2. **LUMENS/LUMENSR** offers a proven land use planning framework with quantitative analysis tools (Pre-QuES) and scenario modeling capabilities that are directly applicable to RICH objectives.

3. **acAIcia** demonstrates a robust AI architecture (multi-agent system, hybrid RAG, semantic caching) that can be adapted for geospatial applications.

4. **hodaripay** provides proven CI/CD patterns and deployment configurations that can be replicated.

5. **The RICH Framework** presents a clear research agenda with specific outputs, timeline, and budget that can guide our implementation.

**Key Integration Insight**: The combination of GEV's visualization, LUMENS' analysis, and acAIcia's AI creates a powerful platform that addresses the core RICH objectives: making agroforestry visible, enabling climate action, and supporting policy with evidence-based tools.

**Recommended Next Steps**:
1. Answer stakeholder questions (above)
2. Set up infrastructure (Railway, Neon, GitHub)
3. Begin Phase 0 implementation (Foundation)
4. Establish data partnerships
5. Start with Ghana as Phase 1 jurisdiction

---

*Document Version: 1.0*
*Last Updated: 2026-09-10*
*Status: Complete*
