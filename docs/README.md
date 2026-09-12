# RICH: AI4D Research and Innovation for Climate Hub

**LUMENS + God's Eye View Integration Project**

This repository contains the comprehensive implementation plan for integrating **LUMENS** (Land Use Planning for Multiple Environmental Services) with **God's Eye View** geospatial visualization, enhanced with **AI capabilities**, to address the invisibility of agroforestry in African land cover maps and enable climate-smart land use planning.

---

## Project Overview

### The Problem

African agroforestry systems (cocoa, coffee, parklands, homegardens) are systematically invisible on global and regional land cover maps. They are misclassified as forest, cropland, or undifferentiated mosaics. This creates cascading problems:

1. **EUDR Compliance Barriers**: Shade-grown agroforestry is classified as forest with ~63% probability, creating false non-compliance
2. **Climate Finance Blockage**: Agroforestry sequesters 3.5-9.8 MgCO2/ha/year but no map recognizes this contribution
3. **Planning Blind Spots**: Policymakers lack baseline data on existing agroforestry, risking displacement of working systems

### The Solution

Integrate three proven systems:
- **LUMENS**: Land use planning and scenario analysis (7 Indonesian provinces)
- **God's Eye View**: 3D geospatial visualization with live data feeds
- **acAIcia AI**: Multi-agent RAG system for domain-specific intelligence

To create a platform that:
- Makes agroforestry **visible** as a discrete land cover class
- Enables **climate action** through EUDR compliance and finance access
- Supports **policy making** with evidence-based spatial planning
- Leverages **AI** for intelligent analysis and assistance
- Scales across **African jurisdictions**

---

## Repository Structure

```
RICH/
├── README.md                    # This file - Project overview
├── IMPLEMENTATION_PLAN.md       # Comprehensive 24-month implementation plan
│                               #   - Architecture overview
│                               #   - Phased approach (5 phases)
│                               #   - Detailed milestones
│                               #   - Technical specifications
│
├── RESEARCH_SUMMARY.md          # Analysis of source projects
│                               #   - God's Eye View architecture
│                               #   - LUMENS/LUMENSR modules
│                               #   - lumens-shiny workflows
│                               #   - lumensbook documentation
│                               #   - acAIcia AI patterns
│                               #   - hodaripay CI/CD patterns
│
├── DATA_SOURCES_CATALOG.md      # Comprehensive data source directory
│                               #   - Satellite imagery (Sentinel, Landsat, GEDI)
│                               #   - Land cover products
│                               #   - Reference datasets
│                               #   - Thematic data (climate, soils, biodiversity)
│                               #   - Administrative boundaries
│                               #   - Jurisdiction-specific sources (Ghana, Ethiopia, etc.)
│
├── RICH_Project_Framework_v5-4.pdf  # Original project framework document
└── RICH_Project_Framework_v5-4.txt  # Text version of framework
```

---

## Documentation

### Core Documents

| Document | Purpose | Status |
|----------|---------|--------|
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | 24-month phased plan with milestones, architecture, and technical details | ✅ Complete |
| [RESEARCH_SUMMARY.md](RESEARCH_SUMMARY.md) | Analysis of all source projects and recommendations | ✅ Complete |
| [DATA_SOURCES_CATALOG.md](DATA_SOURCES_CATALOG.md) | Comprehensive catalog of available data sources | ✅ Complete |

### Quick Links

- **Start Here**: [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) - Complete implementation roadmap
- **Technical Details**: [RESEARCH_SUMMARY.md](RESEARCH_SUMMARY.md#4-key-insights--recommendations) - Architecture and technology recommendations
- **Data Strategy**: [DATA_SOURCES_CATALOG.md](DATA_SOURCES_CATALOG.md) - All available data with priorities

---

## Implementation Plan Summary

### 5-Phase Approach (24 Months)

| Phase | Duration | Focus | Key Deliverables |
|-------|----------|-------|-----------------|
| **0: Foundation** | Month 1-2 | Infrastructure, Data Research | Base system, data catalog |
| **1: Core Integration** | Month 3-6 | LUMENS + GEV + AI | Working prototype in Ghana |
| **2: Enhancement** | Month 7-12 | Advanced features, validation | Multi-jurisdiction, policy tools |
| **3: Production** | Month 13-18 | Hardening, documentation | Production-ready system |
| **4: Scale** | Month 19-24 | Additional jurisdictions | Full deployment across Africa |

### Target Jurisdictions

- **Phase 1-2**: Ghana (cocoa), Ethiopia (coffee)
- **Phase 3**: Cote d'Ivoire, Kenya
- **Phase 4**: Cameroon, Tanzania, Uganda

### Technology Stack

| Component | Technology | Source |
|-----------|------------|--------|
| Frontend | Vite + React 18 + TypeScript + CesiumJS | acAIcia + GEV |
| Backend | FastAPI (Python) | acAIcia |
| AI/ML | Mistral AI API + Hybrid RAG | acAIcia pattern |
| Database | Neon Postgres + pgvector + PostGIS | acAIcia |
| Storage | Neon Object Storage (rasters) | New |
| Hosting | Railway | hodaripay |
| CI/CD | GitHub Actions | hodaripay |

---

## Key Features

### 1. AI-Augmented Agroforestry Mapping

- **AI-Assisted Labeling**: Experts use AI to classify land cover from high-resolution imagery
- **Community Validation**: Local stakeholders verify and correct classifications
- **AlphaEarth Embeddings**: 64-dimensional geospatial embeddings integrating Sentinel-2, Sentinel-1, GEDI, ERA5
- **Lightweight Classifiers**: Train models on community-validated labels
- **Uncertainty Quantification**: Per-class accuracy metrics and uncertainty layers

### 2. Geospatial Visualization

- **3D Globe**: CesiumJS-based photorealistic visualization
- **Multi-Scale Views**: From continental overview to parcel-level detail
- **Temporal Comparison**: View land use changes over time
- **Scenario Overlays**: Visualize what-if scenarios
- **Custom Layers**: Agroforestry classification, uncertainty, policy boundaries

### 3. AI Assistant

- **Natural Language Queries**: Ask questions about land use, agroforestry, climate impacts
- **Geospatial Context**: AI understands location, time periods, land cover types
- **Policy Analysis**: EUDR compliance, REDD+ reporting, NDC alignment
- **Report Generation**: Automated analysis summaries with citations
- **Voice Interface**: Hands-free operation for field use

### 4. LUMENS Analysis Modules

- **Pre-QuES**: Land use change analysis with crosstab and Sankey diagrams
- **QUES-C**: Carbon stock assessment and emission modeling
- **QUES-B**: Biodiversity assessment and conservation prioritization
- **QUES-H**: Hydrology assessment
- **Scenario Development**: What-if analysis for land use interventions
- **Trade-off Analysis**: Multi-criteria decision support

### 5. Policy Integration Tools

- **EUDR Compliance Checker**: Assess compliance with deforestation-free regulations
- **REDD+ MRV Reporting**: Generate reports for results-based payments
- **NDC Alignment Analysis**: Connect to national climate commitments
- **Climate Finance Eligibility**: Assess access to climate finance mechanisms
- **Spatial Planning Integration**: Connect to national planning systems

---

## Data Strategy

### Primary Data Sources

| Data Type | Source | Resolution | Coverage | License |
|-----------|--------|------------|----------|---------|
| Optical Imagery | Sentinel-2 | 10m | Global | Open (ESA) |
| SAR Imagery | Sentinel-1 | 10-40m | Global | Open (ESA) |
| LiDAR | GEDI L4A | 25m | 51°N-51°S | Open (NASA) |
| Land Cover | ESA WorldCover | 10m | Global | Open (ESA) |
| Boundaries | GADM | Variable | Global | Open (CC-BY) |
| Climate | ERA5 | 31km | Global | C3S Terms |
| Soils | SoilGrids | 250m | Global | Open (CC-BY) |
| Reference | Sample Earth | 10m | Ghana, Vietnam | Open |
| Plots | CIFOR-ICRAF | Point | Africa | Internal |

### Data Gap Mitigation

- **No Agroforestry Class**: Create new reference dataset with community validation
- **Cloud Cover**: Use SAR (Sentinel-1) to complement optical imagery
- **Historical Gaps**: Multi-sensor fusion and interpolation
- **Field Data**: AI-assisted interpretation + active learning

---

## Questions for Stakeholders

To proceed with implementation, we need input on:

### Technical
1. Do we have Railway account access and credentials?
2. Do we have Neon account access for database and storage?
3. What is the Mistral AI API access arrangement?
4. What CIFOR-ICRAF datasets can we access immediately?

### Project
5. Should Ghana or Ethiopia be Phase 1 focus?
6. Any hard deadlines for initial deliverables?
7. What is the available budget for Phase 1?
8. Who are key contacts at LDRI and AfriClimate AI?
9. Use RICH branding or create new identity?

### Data
10. What geospatial data does CIFOR-ICRAF have for target jurisdictions?
11. Are there existing partnerships for data access?
12. Can we access CIFOR-ICRAF field plot data?
13. Can we leverage Sample Earth data for Ghana?

### Strategic
14. Focus on cocoa/coffee or include other agroforestry systems?
15. Who are the primary users?
16. Deploy as single system or modular components?
17. All code open source (MIT)?
18. Any commercialization plans?

---

## Getting Started

### Prerequisites

1. **Read the Implementation Plan**: [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)
2. **Review Research Summary**: [RESEARCH_SUMMARY.md](RESEARCH_SUMMARY.md)
3. **Explore Data Sources**: [DATA_SOURCES_CATALOG.md](DATA_SOURCES_CATALOG.md)
4. **Answer Stakeholder Questions**: See above

### Quick Start (Phase 0)

```bash
# Clone the repository (when set up)
git clone <repository-url>
cd RICH

# Set up infrastructure
# 1. Create Railway project
# 2. Set up Neon database with pgvector and PostGIS
# 3. Configure GitHub Actions CI/CD

# Set up development environment
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Development Workflow

1. **Phase 0**: Foundation (Month 1-2)
   - Set up infrastructure
   - Research and ingest data
   - Create base system

2. **Phase 1**: Core Integration (Month 3-6)
   - Implement LUMENS API
   - Integrate with GEV
   - Add AI capabilities
   - Deploy Ghana prototype

3. **Phase 2**: Enhancement (Month 7-12)
   - Add advanced LUMENS modules
   - Expand to Ethiopia
   - Implement validation
   - Add policy tools

---

## Resources

### Source Projects

- [God's Eye View](https://github.com/bilawalsidhu/gods-eye-view) - 3D geospatial visualization
- [LUMENSR](https://github.com/icraf-indonesia/LUMENSR/) - LUMENS R package
- [lumens-shiny](https://github.com/icraf-indonesia/lumens-shiny) - LUMENS Shiny web app
- [lumensbook](https://github.com/icraf-indonesia/lumensbook) - LUMENS documentation

### Reference Projects (Internal)

- [acAIcia](../acAIcia/) - AI assistant with RAG and embeddings
- [hodaripay](../hodaripay/) - CI/CD patterns and deployment

### Tools & Services

- [Railway](https://railway.app/) - Hosting infrastructure
- [Neon](https://neon.tech/) - Postgres database and object storage
- [Mistral AI](https://mistral.ai/) - LLM provider
- [Copernicus Open Access Hub](https://scihub.copernicus.eu/) - Sentinel data
- [NASA Earthdata](https://earthdata.nasa.gov/) - GEDI, Landsat, etc.
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation

---

## Team & Partners

### Core Team

| Role | Responsibilities |
|------|------------------|
| Technical Lead | Architecture, coordination |
| Backend Developer (2) | API, database, integration |
| Frontend Developer | UI, visualization |
| Geospatial Scientist | Data processing, analysis |
| AI/ML Engineer | Model development, AI integration |
| Project Manager | Coordination, reporting |

### Key Partners

- **CIFOR-ICRAF**: Technical leadership, research, data, policy
- **LDRI**: African policy expertise, stakeholder connections
- **AfriClimate AI**: Climate AI, community connections
- **Mistral AI**: LLM access, technical support
- **Neon**: Database hosting, technical support

---

## License

All code in this repository is licensed under **MIT License** unless otherwise specified.

---

## Contributing

Contributions are welcome! Please see the implementation plan for development guidelines and contact the technical lead for coordination.

---

## Status

- ✅ **Research Complete**: All source projects analyzed
- ✅ **Planning Complete**: Implementation plan created
- ⏳ **Waiting**: Stakeholder input on questions above
- ⏳ **Next**: Phase 0 infrastructure setup

---

*Project Version: 1.0*
*Last Updated: 2026-09-10*
*Status: Planning Complete - Awaiting Stakeholder Review*
