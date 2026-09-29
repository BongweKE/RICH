# RICH: AI4D Research and Innovation for Climate Hub

**LUMENS + God's Eye View + AI Integration**

An extension of [acAIcia](../acAIcia) - Landscape Alliance Knowledge Base AI Assistant, specialized for **climate-smart land use planning and agroforestry intelligence**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: MVP Development](https://img.shields.io/badge/Status-MVP_Development-blue.svg)]
[![Railway](https://img.shields.io/badge/Railway-Deployed-purple.svg)](https://railway.app/)

---

## 🌍 Overview

RICH extends the acAIcia AI assistant with **geospatial intelligence** capabilities, integrating:

- **Impact Viewer**: MapLibre-based 3D-extrusion visualization for donors and Hub partners (demo data)
- **LUMENS**: Land use planning and scenario analysis framework
- **Mistral AI**: Small, efficient models for geospatial reasoning

### The Problem

African agroforestry systems (dehesa, montado, silvopasture, shade coffee/cocoa) are **invisible** on global land cover maps. They're misclassified as forest, cropland, or undifferentiated mosaics, creating:

- **EUDR Compliance Barriers**: False deforestation flags
- **Climate Finance Blockage**: Unrecognized carbon sequestration
- **Planning Blind Spots**: No baseline for restoration planning

### The Solution

Make agroforestry **visible, measurable, and actionable** through:

1. **AI-Augmented Mapping**: Community-validated reference data + geospatial AI
2. **Interactive Visualization**: 3D globe with parcel-level inspection
3. **Intelligent Analysis**: AI assistant for land use queries and policy analysis
4. **Scenario Modeling**: What-if analysis for land use interventions

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Railway CLI
- Neon CLI
- GitHub CLI

### Installation

```bash
# Clone the repository
git clone git@github.com:BongweKE/RICH.git
cd RICH

# Set up environment
cp .env.example .env
# Edit .env with your API keys

# Install dependencies
npm install
pip install -r requirements.txt

# Run locally
docker-compose up
```

### Deployment

```bash
# Deploy to Railway
gh workflow run deploy-staging

# Promote to production
gh workflow run promote
```

---

## 📁 Project Structure

```
RICH/
├── backend/                    # FastAPI server
│   ├── app/                   # Application code
│   │   ├── main.py           # FastAPI app entry
│   │   ├── api/              # API endpoints
│   │   │   ├── geospatial.py # GEV integration
│   │   │   ├── lumens.py     # LUMENS analysis
│   │   │   ├── ai.py         # AI assistant
│   │   │   └── policy.py     # Policy tools
│   │   ├── core/             # Core utilities
│   │   │   ├── config.py     # Configuration
│   │   │   ├── database.py   # DB connection
│   │   │   └── security.py   # Auth utilities
│   │   └── models/           # Data models
│   ├── tests/                # Backend tests
│   └── Dockerfile
│
├── frontend/                   # Vite + React UI
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── globe/       # GEV 3D components
│   │   │   ├── map/         # 2D map components
│   │   │   ├── analysis/    # LUMENS UI
│   │   │   ├── ai/          # AI chat interface
│   │   │   └── policy/      # Policy tools UI
│   │   ├── pages/           # Page components
│   │   ├── api/             # API client
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # CSS/Tailwind
│   ├── public/               # Static assets
│   └── Dockerfile
│
├── database/                  # Database schema
│   ├── schema.sql            # PostgreSQL schema
│   └── migrations/           # Alembic migrations
│
├── docs/                     # Documentation
│   ├── IMPLEMENTATION_PLAN.md  # 24-month roadmap
│   ├── RESEARCH_SUMMARY.md     # Source project analysis
│   ├── DATA_SOURCES_CATALOG.md # Data source directory
│   └── API_SPECIFICATIONS.md    # API documentation
│
├── scripts/                   # Utility scripts
│   ├── setup.sh              # Setup script
│   ├── data_ingestion.py     # Data ingestion
│   └── validate.py           # Data validation
│
├── .github/
│   ├── workflows/            # GitHub Actions
│   │   ├── deploy-staging.yml
│   │   ├── promote.yml
│   │   └── pr.yml
│   └── ISSUE_TEMPLATE/        # Issue templates
│
├── .env.example              # Environment template
├── docker-compose.yml         # Docker orchestration
├── railway.json              # Railway configuration
└── README.md                 # This file
```

---

## 🎯 Proof of Concept

### Target: **Spain (Extremadura Region)**

**Important data status:** all parcels, reference points, and alerts currently served by this PoC are **synthetic demo data**, clearly labeled with `data_origin: synthetic`. No real field-validated records exist yet. The governance planner app (`/planner`) exposes this provenance on every record.

**Why Spain?**
- **Dehesa System**: World's most documented agroforestry (oak + crops + livestock)
- **Excellent Open Data**: 
  - Sentinel-2: Full coverage, frequent updates
  - Copernicus: Land cover, elevation, climate
  - Spanish Government: High-resolution orthoimagery (PNOA)
  - OpenStreetMap: Detailed boundaries, infrastructure
  - EU Data Portal: Environmental, agricultural data
- **Research-Rich**: Extensive literature on dehesa ecology, management, economics
- **HuggingFace Datasets**: Multiple geospatial datasets available
- **Similar to RICH Targets**: Mediterranean climate comparable to parts of Africa

**Classification Scheme** (for PoC):
- Dehesa (oak + pasture)
- Montado (cork oak + crops)
- Forest (dense tree cover)
- Cropland (intensive agriculture)
- Grassland (natural pasture)
- Settlement (urban areas)
- Water bodies
- Bare soil

**Data Sources** (all open):
- Sentinel-2: 10m optical imagery
- Sentinel-1: 10-40m SAR (cloud-penetrating)
- Copernicus DEM: 30m elevation
- CORINE Land Cover: EU land cover
- PNOA: Spanish orthoimagery (50cm-2m)
- OpenStreetMap: Infrastructure, boundaries
- ERA5: Climate data
- SoilGrids: Soil properties

### MVP Features

1. **✅ Phase 0: Foundation** (Week 1)
   - [ ] Initialize GitHub repo with structure
   - [ ] Set up Railway project
   - [ ] Configure Neon database
   - [ ] Deploy base system

2. **✅ Phase 1: Core Integration** (Week 2-4)
   - [ ] Ingest Spain data (Sentinel-2, CORINE, OSM)
   - [ ] Implement GEV 3D visualization
   - [ ] Add basic AI chat with geospatial context
   - [ ] Create LUMENS Pre-QuES API
   - [ ] Deploy to staging

3. **✅ Phase 2: Enhancement** (Week 5-8)
   - [ ] Add scenario analysis (QUES-C, QUES-B)
   - [ ] Implement community validation UI
   - [ ] Add policy tools (EUDR, REDD+, NDC)
   - [ ] Deploy to production

4. **✅ Phase 3: Documentation** (Week 9-10)
   - [ ] Complete technical documentation
   - [ ] Create user guides
   - [ ] Set up monitoring and analytics
   - [ ] Conduct user testing

---

## 🛠 Technology Stack

| Component | Technology | Purpose | Status |
|-----------|------------|---------|--------|
| **Frontend** | Vite + React 18 + TypeScript | Primary UI | ✅ |
| **3D Visualization** | MapLibre GL fill-extrusion | Pseudo-3D canopy visualization | ✅ |
| **2D Mapping** | MapLibre GL JS | Map visualization | ✅ |
| **UI Framework** | Tailwind CSS + Headless UI | Styling | ✅ |
| **State Management** | Zustand | Client state | ✅ |
| **Backend** | FastAPI (Python 3.11+) | API server | ✅ |
| **Database** | Neon Postgres + pgvector + PostGIS | Geospatial + embeddings | ✅ |
| **Storage** | Neon Object Storage | Raster data | ✅ |
| **AI Models** | Mistral AI (mistral-small, mistral-tiny) | LLM inference | ✅ |
| **Embeddings** | BAAI/bge-small-en-v1.5 (384-dim) | Document embeddings | ✅ |
| **Geospatial Embeddings** | Not yet implemented (AlphaEarth/alternatives) | Satellite embeddings | ⬜ |
| **Hosting** | Railway | Full-stack deployment | ✅ |
| **CI/CD** | GitHub Actions | Automated testing & deployment | ✅ |
| **Containerization** | Docker + docker-compose | Development & deployment | ✅ |

### Model Selection (Cost-Optimized)

| Task | Model | Provider | Size | Cost | Status |
|------|-------|----------|------|------|--------|
| General LLM | mistral-tiny | Mistral AI | Small | Low | ✅ Primary |
| General LLM | mistral-small | Mistral AI | Small | Low | ✅ Fallback |
| Embeddings | bge-small-en-v1.5 | HuggingFace | 384-dim | Free | ✅ |
| Geospatial | [Research needed] | HuggingFace | Variable | Free | 🔄 |

---

## 🔧 Configuration

### Environment Variables

```bash
# Railway
RAILWAY_PROJECT_ID=your_project_id
RAILWAY_ENVIRONMENT=staging

# Neon Database
DATABASE_URL=postgres://...
NEON_PROJECT_ID=your_neon_project

# Mistral AI
MISTRAL_API_KEY=your_api_key
MISTRAL_MODEL=mistral-tiny

# Optional: Google Maps / Cesium ion
GOOGLE_MAPS_KEY=your_key
CESIUMION_KEY=your_key

# Application
APP_NAME=RICH
APP_ENV=development
LOG_LEVEL=INFO
```

### railway.json

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile",
    "watchPatterns": ["backend/**", "frontend/**"]
  },
  "deploy": {
    "startCommand": "docker-compose -f docker-compose.yml up",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

---

## 📊 Data Strategy

### PoC Data Sources (Spain/Extremadura)

| Data Type | Source | Resolution | Format | License | Status |
|-----------|--------|------------|--------|---------|--------|
| Optical Imagery | Sentinel-2 | 10m | COG | Open (ESA) | ✅ Available |
| SAR Imagery | Sentinel-1 | 10-40m | COG | Open (ESA) | ✅ Available |
| Land Cover | CORINE | 100m | Vector | Open (EEA) | ✅ Available |
| Elevation | Copernicus DEM | 30m | COG | Open (EEA) | ✅ Available |
| Orthoimagery | PNOA | 50cm-2m | COG | Open (IGN) | ✅ Available |
| Boundaries | OpenStreetMap | Variable | Vector | ODbL | ✅ Available |
| Climate | ERA5 | 31km | NetCDF | C3S Terms | ✅ Available |
| Soils | SoilGrids | 250m | GeoTIFF | Open (CC-BY) | ✅ Available |
| Reference | HuggingFace Datasets | Variable | Various | Open | 🔄 Researching |

### Data Ingestion Pipeline

```
1. Discovery
   └── Identify available datasets for target region

2. Ingestion
   ├── API download (Sentinel, Copernicus)
   ├── Bulk download (CORINE, PNOA)
   └── Stream from HuggingFace

3. Preprocessing
   ├── Reproject to EPSG:4326 or local UTM
   ├── Convert to Cloud Optimized GeoTIFF (COG)
   ├── Validate geometry and attributes
   └── Extract metadata

4. Processing
   ├── Create vector tiles for visualization
   ├── Generate embeddings (geospatial + document)
   ├── Build spatial indexes
   └── Store in Neon Postgres / Object Storage

5. Cataloging
   └── Register in database with provenance
```

---

## 🤖 AI System

### Multi-Agent Architecture

```
User Query → Guardian → Architect → Synthesis → Response
                     ↓            ↓            ↓
               Validation     Planning     Generation
               + Safety       + Search      + Citation
```

**Guardian Agent** (Query Validation):
- Validates queries are on-topic (land use, agroforestry, climate)
- Extracts geographic entities (coordinates, place names)
- Identifies time periods and land cover types
- Normalizes terminology

**Architect Agent** (Query Decomposition):
- Determines optimal approach (spatial query, statistical analysis, both)
- Selects relevant data sources
- Plans analysis steps
- Identifies visualization requirements

**Synthesis Agent** (Response Generation):
- Integrates information from geospatial data, LUMENS analysis, documents
- Generates natural language responses with citations
- Formats responses with markdown, tables, code blocks
- Acknowledges uncertainties and limitations

### Hybrid RAG Pipeline

```
Query → Understanding → Retrieval → Re-ranking → Context → Generation

Understanding:
- Intent classification (description, comparison, trend, prediction)
- Entity extraction (locations, time periods, land cover classes)

Retrieval:
- Geospatial search (ST_Intersects, ST_DWithin)
- Vector similarity search (embeddings)
- Keyword search (BM25)

Re-ranking:
- Cross-encoder for passage re-ranking
- Confidence-based filtering
- Temporal relevance filtering

Context:
- Chunk concatenation with metadata
- Citation generation
- Source attribution

Generation:
- LLM response with context
- Formatted output
- Citation inclusion
```

---

## 🌐 API Documentation

### Geospatial Endpoints

```
GET    /api/layers                  # List available map layers
GET    /api/layers/{id}/tiles/{z}/{x}/{y}  # Vector tile endpoint
POST   /api/parcels/search         # Search agroforestry parcels
GET    /api/parcels/{id}           # Get parcel details
POST   /api/bbox-query             # Query by bounding box
```

### LUMENS Analysis Endpoints

```
POST   /api/analysis/preques        # Pre-QuES land use change analysis
POST   /api/analysis/ques-c        # Carbon assessment
POST   /api/analysis/ques-b        # Biodiversity assessment
POST   /api/analysis/scenario      # Run land use scenario
GET    /api/analysis/{id}/results   # Get analysis results
GET    /api/analysis/{id}/status    # Check analysis status
```

### AI Assistant Endpoints

```
POST   /api/chat                   # Send chat message
GET    /api/chat/{session_id}      # Get chat history
POST   /api/chat/feedback          # Provide feedback on response
GET    /api/prompt-pills            # Get suggested prompts
```

### Policy Tools Endpoints

```
POST   /api/policy/eudr-check      # EUDR compliance check
POST   /api/policy/redd-report     # REDD+ MRV report
POST   /api/policy/ndc-align       # NDC alignment analysis
POST   /api/policy/finance-check   # Climate finance eligibility
```

---

## 🎨 Branding (acAIcia-esque)

### Visual Identity

- **Color Palette**: Forestry dark green (`#0F291E`) + emerald accents (`#10B981`)
- **Typography**: Clean, modern sans-serif (Inter recommended)
- **Logo**: Tree + globe integration (similar to acAIcia)
- **Theme**: Dark mode with glassmorphism effects

### Naming

- **RICH**: AI4D Research and Innovation for Climate Hub
- **Tagline**: "Making Agroforestry Visible"
- **Product Name**: RICH LUMENS (for the integrated platform)

### Deployment Domain

- **Staging**: `rich-staging.railway.app` (Railway default)
- **Production**: `rich-production-d1d3.up.railway.app` (Railway) — eventual target `rich.acaicia.org`
- **Landing page**: `<deployment>/` (feature links, learn section, honest data-cost labels)
- **Governance planner**: `<deployment>/planner` (same app, planner workspace)
- **Impact viewer**: `<deployment>/impact` (3D map experience; was previously at `/`)
- **Development**: `localhost:4173` (Vite frontend) + `localhost:8000` (FastAPI backend)

---

## 📋 Development Workflow

### GitHub Issues

All work is tracked via GitHub Issues with the following labels:

- `priority:high` / `priority:medium` / `priority:low`
- `type:feature` / `type:bug` / `type:documentation` / `type:infrastructure`
- `status:backlog` / `status:ready` / `status:in-progress` / `status:review` / `status:done`
- `phase:0` / `phase:1` / `phase:2` / `phase:3` (matching implementation phases)

### Pull Request Process

1. **Create Issue**: Describe the feature/bug
2. **Create Branch**: `git checkout -b feature/your-feature` or `fix/your-bug`
3. **Develop**: Make changes with tests
4. **Open PR**: Link to issue, include description
5. **Review**: Team review with approvals
6. **Merge**: Squash merge to `main`
7. **Deploy**: Automatic deployment to staging
8. **Promote**: Manual promotion to production

### Branch Strategy

```
main (production)
  └── staging (automatic deploy)
      └── feature/* (development branches)
      └── fix/* (bug fix branches)
      └── docs/* (documentation branches)
```

### Commit Messages

```
Format: type(scope): description

Examples:
- feat(geospatial): add Sentinel-2 data ingestion
- fix(api): resolve CORS issue with /chat endpoint
- docs: update README with deployment instructions
- chore: update dependencies
- refactor(lumens): extract Pre-QuES logic to separate module
```

---

## 🔒 Security

### Authentication

- **JWT Tokens**: Secure API endpoints
- **Rate Limiting**: Prevent abuse
- **CORS**: Restrict to trusted origins

### Data Protection

- **Encryption**: At rest (Neon) and in transit (TLS)
- **Access Control**: Role-based permissions
- **Audit Logging**: Track all sensitive operations

### Roles & Permissions

| Role | Read | Write | Admin | Rate Limit |
|------|------|-------|-------|------------|
| Guest | Public | None | None | 20/day |
| Researcher | All | Own | None | 100/day |
| Policy Maker | All | All | None | 200/day |
| Admin | All | All | All | Unlimited |

---

## 📈 Monitoring & Analytics

### System Metrics

- **Uptime**: >99.5% target
- **Response Time**: P50 < 500ms, P95 < 2s
- **Error Rate**: < 0.1%

### AI Metrics

- **Query Latency**: Breakdown by agent (Guardian, Architect, Synthesis)
- **Cache Hit Rate**: >70% target for semantic caching
- **Model Accuracy**: >85% target for classification

### User Metrics

- **Active Users**: Daily/weekly/monthly
- **Session Duration**: Average time per session
- **Feature Usage**: Most/least used features
- **Satisfaction**: Feedback scores and ratings

---

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Create an issue** for your contribution
3. **Set up development environment**
4. **Submit a pull request**

### Code Standards

- **Python**: ruff, black, mypy
- **TypeScript**: ESLint, Prettier
- **SQL**: SQLFluff (if applicable)
- **Git**: Conventional commits

### Testing

- **Backend**: pytest with >80% coverage
- **Frontend**: Vitest + React Testing Library
- **E2E**: Cypress/Playwright

---

## 📄 License

All code in this repository is licensed under the **MIT License**.

See [LICENSE](../LICENSE) for full license text.

---

## 🙏 Acknowledgments

- [God's Eye View](https://github.com/bilawalsidhu/gods-eye-view) - 3D geospatial visualization
- [LUMENS](https://github.com/icraf-indonesia/LUMENSR/) - Land use planning framework
- [acAIcia](../acAIcia) - AI assistant architecture and patterns
- [hodaripay](../hodaripay/) - CI/CD and deployment patterns
- [CIFOR-ICRAF](https://www.cifor-icraf.org/) - Research and methodology

---

## 📞 Contact

- **Repository**: https://github.com/BongweKE/RICH
- **Issues**: https://github.com/BongweKE/RICH/issues
- **Discussions**: https://github.com/BongweKE/RICH/discussions

---

*Project Version: 0.1.0 - Proof of Concept*
*Last Updated: 2026-09-10*
*Status: MVP Development in Progress*
