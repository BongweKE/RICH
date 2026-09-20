# RICH Feature Implementation Master Plan

## Overview

This document provides a **comprehensive, staged implementation plan** for all remaining RICH features, organized by priority and technical dependencies. It consolidates all planned changes from ISSUES_TO_CREATE.csv into executable stages with clear deliverables.

**Current State:**
- ✅ Foundation committed: `e5641ba` on branch `feat/data-viz-cicd-foundation`
- ✅ Pushed to remote: `origin/feat/data-viz-cicd-foundation`
- ✅ Ready for PR to `main`

**Next:** Create PR, merge to main (triggers staging), then implement features in stages below.

---

## 📋 Stage Organization

### Stage Structure
Each stage contains:
- **Goal**: What we achieve
- **Features**: Specific functionality to implement
- **Files Touched**: Expected code changes
- **API Contract**: New endpoints or changes
- **Database**: Schema changes if any
- **Success Criteria**: How we know it's done
- **Estimated Duration**: Time estimate

---

## 🎯 STAGE 1: Core User Workflow (P1 - Must Have)

### Goal
Enable users to upload their own farms and generate compliance reports. This addresses the reviewer's #1 complaint: "There's no way to upload your own farms" and "No downloadable Evidence Pack".

### Stage 1.1: Plot Inbox - User Upload

**Priority:** P1 | **Effort:** 3-4 days | **Issue:** #004

#### Features
1. Drag-and-drop file upload component
2. Support multiple formats: GeoJSON, Shapefile (.zip), KML, CSV
3. File validation and error handling
4. Preview uploaded parcels on map
5. Store uploaded parcels with user association

#### Implementation Details

**Frontend Components:**
```
frontend/src/components/
├── PlotInboxDrawer.tsx          # NEW: Main upload drawer
├── FileUploadZone.tsx           # NEW: Drag-and-drop zone
├── ParcelPreview.tsx           # NEW: Preview before save
└── UploadProgress.tsx          # NEW: Upload status
```

**Backend API:**
```
POST /api/parcels/upload
- Accepts: multipart/form-data with file
- Validates: file type, size (<50MB), geometry validity
- Returns: { success, parcels: Parcel[], errors: string[] }

GET /api/parcels/user
- Returns: All parcels for authenticated user
- Query params: ?page=1&limit=50
```

**Database Schema:**
```sql
-- Add to existing agroforestry_parcels table
ALTER TABLE agroforestry_parcels ADD COLUMN user_id UUID REFERENCES users(id);
ALTER TABLE agroforestry_parcels ADD COLUMN uploaded_at TIMESTAMP;
ALTER TABLE agroforestry_parcels ADD COLUMN source_type VARCHAR(50); -- 'uploaded', 'system', 'imported'

-- New table for upload sessions
CREATE TABLE upload_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    file_name VARCHAR(255),
    file_size_bytes BIGINT,
    file_type VARCHAR(50),
    parcel_count INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT
);
```

**File Upload Service:**
```python
# backend/app/services/upload_service.py
class UploadService:
    async def process_upload(
        self, 
        file: UploadFile, 
        user_id: UUID
    ) -> UploadResult:
        # Validate file
        # Parse geometry
        # Store in database
        # Return preview data
```

**Success Criteria:**
- [ ] Users can drag-and-drop GeoJSON files
- [ ] Uploaded parcels display on map with proper colors
- [ ] Validation errors shown clearly to user
- [ ] Parcels associated with user account
- [ ] Max file size (50MB) enforced
- [ ] Upload progress indicated
- [ ] Supported formats: GeoJSON (P1), others (P2)

---

### Stage 1.2: Evidence Pack Generation

**Priority:** P1 | **Effort:** 3-4 days | **Issue:** #005

#### Features
1. Generate EUDR compliance report (PDF)
2. Export parcel data (GeoJSON)
3. Export full assessment (JSON)
4. Create ZIP archive with all files
5. Generate shareable link
6. Store evidence packs in database

#### Implementation Details

**Backend Services:**
```
backend/app/services/
├── evidence_service.py        # NEW: Orchestrates pack generation
├── pdf_generator.py          # NEW: PDF report generation
├── report_templates/         # NEW: Jinja2 templates for reports
│   ├── eudr_report.j2
│   ├── executive_summary.j2
│   └── parcel_metadata.j2
└── zip_archive.py           # NEW: Create ZIP with multiple files
```

**API Endpoints:**
```
POST /api/evidence-packs/generate
- Input: { parcel_id: UUID, report_type: 'eudr' }
- Returns: { id: UUID, status: 'pending'|'complete', download_url: string }

GET /api/evidence-packs/{id}
- Returns: Evidence pack metadata and status

GET /api/evidence-packs/{id}/download
- Returns: ZIP file with all reports

POST /api/evidence-packs/{id}/share
- Generates shareable token
- Returns: { share_url: string, expires_at: timestamp }
```

**Database Schema:**
```sql
CREATE TABLE evidence_packs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    parcel_id UUID REFERENCES agroforestry_parcels(id),
    jurisdiction_code VARCHAR(20),
    report_type VARCHAR(20) DEFAULT 'eudr',
    status VARCHAR(20) CHECK (status IN ('pending', 'generating', 'complete', 'failed')),
    pdf_path VARCHAR(500),
    geojson_path VARCHAR(500),
    json_path VARCHAR(500),
    zip_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    file_size_bytes BIGINT
);

CREATE TABLE share_tokens (
    id UUID PRIMARY KEY,
    evidence_pack_id UUID REFERENCES evidence_packs(id),
    token VARCHAR(64) UNIQUE,
    expires_at TIMESTAMP,
    accessed_at TIMESTAMP,
    access_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**PDF Report Structure:**
```
EUDR Compliance Report.pdf
├── Cover Page
│   ├── Project Name
│   ├── Date Generated
│   └── RICH Logo
├── Executive Summary
│   ├── Compliance Status (✅/❌)
│   ├── Overall Risk Level
│   └── Key Findings
├── Parcel Details
│   ├── Geometry (map snapshot)
│   ├── Area (ha)
│   ├── Agroforestry Type
│   └── Coordinates
├── EUDR Assessment
│   ├── Cutoff Date Check (Dec 31, 2020)
│   ├── Forest Loss Detection
│   ├── Degradation Analysis
│   └── Compliance Statement
├── NDVI & Carbon Data
│   ├── NDVI History Chart
│   ├── Carbon Stock Calculation
│   └── Sequestration Potential
└── Legal & Contact
    ├── Issuing Authority
    └── Legal Notice
```

**Success Criteria:**
- [ ] Evidence Pack can be generated for any parcel
- [ ] PDF contains all required sections
- [ ] GeoJSON contains parcel geometry and properties
- [ ] JSON contains full assessment data
- [ ] ZIP archive created with all files
- [ ] Download button works in UI
- [ ] Share link can be generated

---

### Stage 1.3: Share Link Functionality

**Priority:** P2 | **Effort:** 1-2 days | **Issue:** #006

#### Features
1. Generate unique share token for each Evidence Pack
2. Create shareable URL: `/share/{token}`
3. Token-based access control (no login required)
4. Set expiration (7 days default)
5. Track share analytics

#### Implementation Details

**Frontend Components:**
```
frontend/src/components/
├── ShareButton.tsx             # NEW: Share button with modal
├── ShareLinkModal.tsx          # NEW: Generate and copy share link
└── ShareAnalytics.tsx          # NEW: Track views/accesses
```

**Backend Routes:**
```
# New route for share page
frontend/src/pages/SharePage.tsx
- Public route (no auth)
- Displays read-only evidence pack
- Download buttons for files

# API
GET /api/share/{token}
- Validates token
- Returns evidence pack data (without user info)
- Increments access count
```

**Success Criteria:**
- [ ] Share link generated for each Evidence Pack
- [ ] Link opens report without login
- [ ] Token expires after configured period (7 days)
- [ ] Analytics tracked for shares
- [ ] UI has share button
- [ ] Share page displays properly

---

## 🎨 STAGE 2: Visualization & UX Improvements (P1)

### Goal
Improve map visualization, fix remaining UX issues, and ensure mobile compatibility.

### Stage 2.1: Mobile Responsiveness

**Priority:** P2 | **Effort:** 2-3 days | **Issue:** #007

#### Features
1. Responsive layout for phone (320px-600px)
2. Responsive layout for tablet (600px-1024px)
3. Touch-friendly controls (min 44x44px)
4. Optimized map interactions for touch
5. Performance optimization for mobile

#### Implementation Details

**Frontend Changes:**
```
frontend/src/
├── components/
│   ├── MobileNav.tsx          # NEW: Mobile navigation
│   ├── TouchControls.tsx      # NEW: Touch-optimized controls
│   └── ResponsivePanel.tsx    # NEW: Collapsible side panels
├── styles/
│   └── responsive.css        # NEW: Mobile-first responsive styles
└── App.tsx                  # MODIFIED: Responsive layout
```

**Tailwind CSS Classes:**
```css
/* Mobile breakpoints */
@media (max-width: 640px) {
  .layer-panel { display: none; } /* Hidden by default on mobile */
  .mobile-menu { display: flex; }
}

/* Touch targets */
button, [role="button"] {
  min-width: 44px;
  min-height: 44px;
}

/* Map touch optimization */
.map-container {
  touch-action: manipulation;
}
```

**Success Criteria:**
- [ ] Layout works on phone (320px-600px)
- [ ] Layout works on tablet (600px-1024px)
- [ ] Touch gestures work (pan, zoom, tap)
- [ ] Touch targets >= 44x44px
- [ ] Performance acceptable on mobile (<2s load)
- [ ] Reduced layer complexity on mobile

---

### Stage 2.2: AI Copilot Edit/Copy

**Priority:** P2 | **Effort:** 1 day | **Issue:** #008

#### Features
1. Add edit button to ChatMessage
2. Add copy-to-clipboard button
3. Implement response modification flow
4. Add citation click-to-copy

#### Implementation Details

**Frontend Components:**
```
frontend/src/components/AIChatDrawer.tsx
├── ChatMessage.tsx           # MODIFIED: Add edit/copy buttons
│   ├── EditButton.tsx        # NEW: Edit message
│   ├── CopyButton.tsx        # NEW: Copy to clipboard
│   └── Citation.tsx          # MODIFIED: Click to copy
├── EditModal.tsx            # NEW: Edit response modal
└── ChatInput.tsx             # MODIFIED: Handle edited responses
```

**Success Criteria:**
- [ ] Edit button visible on AI responses
- [ ] Copy button copies response to clipboard
- [ ] User can modify response before sending
- [ ] Citations can be copied individually
- [ ] Success feedback shown to user

---

## 🔧 STAGE 3: Real Data Integration (P1)

### Goal
Load real, verified geospatial datasets into the system for meaningful analysis.

### Stage 3.1: Load Real Geospatial Data

**Priority:** P1 | **Effort:** 2-3 days | **Issue:** #001

#### Features
1. Import CERSGIS Ghana Cocoa dataset (21,031 parcels)
2. Import SITEX Dehesa dataset (~5,000+ parcels)
3. Import Ethiopia Coffee dataset (1,000+ parcels)
4. Validate and clean imported data
5. Create data source attribution

#### Implementation Details

**Data Pipeline:**
```python
# scripts/import_real_data.py
class DataImporter:
    async def import_ghana_cocoa(self):
        # Download from Zenodo
        # Parse GeoJSON
        # Transform to match schema
        # Batch insert into database
        pass
    
    async def import_sitex_dehesa(self):
        # Download from sitex.gobex.es
        # Handle Spanish coordinate system
        # Transform to EPSG:4326
        pass
    
    async def import_ethiopia_coffee(self):
        # Download from opendataforafrica
        # Validate geometries
        pass
```

**Database Seeding:**
```sql
-- Jurisdictions for each dataset
INSERT INTO jurisdictions (id, name, code, geometry) VALUES
  ('gh-ah', 'Ashanti Region', 'GH-AH', ...),
  ('es-ex', 'Extremadura', 'ES-EX', ...),
  ('et-or', 'Oromia Region', 'ET-OR', ...);

-- Batch insert parcels (50 at a time)
INSERT INTO agroforestry_parcels (...) VALUES (...), (...), ...;
```

**Data Source Tracking:**
```sql
CREATE TABLE data_sources (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(50) UNIQUE,
    url VARCHAR(500),
    license VARCHAR(100),
    attribution VARCHAR(500),
    parcel_count INTEGER,
    last_imported TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE agroforestry_parcels ADD COLUMN source_id UUID REFERENCES data_sources(id);
```

**Success Criteria:**
- [ ] 100+ real parcels loaded in database
- [ ] Parcels display on map with proper geometries
- [ ] All 3 regions (GH-AH, ET-OR, ES-EX) have data
- [ ] Source attribution preserved in metadata
- [ ] Data validation passes (no null geometries)

---

## 🏗️ STAGE 4: Infrastructure & Process Improvements (P2)

### Goal
Strengthen CI/CD, documentation, and team processes based on hodaripay patterns.

### Stage 4.1: CI/CD Enhancements

**Priority:** P2 | **Effort:** 2 days | **Issue:** #009

#### Features
1. ✅ Conventional commit validation (DONE)
2. ✅ Secret scanning with gitleaks (DONE)
3. ✅ ADR validation (DONE)
4. ✅ Main branch guard (DONE)
5. ✅ Change detection for deploys (DONE)
6. Dependency audit (non-blocking)
7. Test coverage reporting
8. Performance benchmarks

#### Implementation Details

**PR Checks Enhancement:**
```yaml
# .github/workflows/pr.yml additions
jobs:
  dependency_audit:
    name: Dependency audit
    runs-on: ubuntu-latest
    continue-on-error: true  # Non-blocking
    steps:
      - uses: actions/checkout@v4
      - name: Audit Python dependencies
        run: |
          cd backend
          pip-audit
      - name: Audit Node dependencies
        run: |
          cd frontend
          npm audit
  
  coverage:
    name: Test coverage
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check coverage
        run: |
          # Verify coverage > 80%
          coverage_threshold=80
          actual_coverage=$(grep -oP '\d+(?=\% coverage)' coverage.xml | head -1)
          if [ "$actual_coverage" -lt "$coverage_threshold" ]; then
            echo "::error::Test coverage below threshold: ${actual_coverage}%"
            exit 1
          fi
```

**Success Criteria:**
- [ ] All PR checks pass for valid PRs
- [ ] Invalid PRs are blocked with clear messages
- [ ] Dependency audit runs but doesn't block
- [ ] Coverage threshold enforced (80%+)
- [ ] Performance benchmarks captured

---

### Stage 4.2: Issue Templates

**Priority:** P2 | **Effort:** 1 day | **Issue:** #010

#### Features
1. Config.yml to disable blank issues
2. Structured bug report template
3. Structured feature request template
4. Structured task template

#### Implementation Details

**Config:**
```yaml
# .github/config.yml
blank_issues_enabled: false
contact_links:
  - name: Documentation
    url: https://github.com/BongweKE/RICH/wiki
    about: Check the wiki for answers
  - name: Discussions
    url: https://github.com/BongweKE/RICH/discussions
    about: Ask questions in discussions
```

**Templates:**
```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
about: Report a bug in RICH
labels: [bug]

body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug! Please fill out this template.
  - type: dropdown
    id: environment
    attributes:
      label: Environment
      options:
        - production
        - staging
        - local
  - type: input
    id: version
    attributes:
      label: Version
      placeholder: e.g., v1.0.0, commit SHA
  - type: dropdown
    id: area
    attributes:
      label: Area
      options:
        - frontend
        - backend
        - database
        - ci
        - data
        - geospatial
  - type: textarea
    id: description
    attributes:
      label: Description
      placeholder: What happened?
```

**Success Criteria:**
- [ ] Blank issues disabled
- [ ] Bug report template with all required fields
- [ ] Feature request template with problem/solution/alternatives
- [ ] Task template with definition of done
- [ ] All templates include area classification

---

### Stage 4.3: Documentation Updates

**Priority:** P2 | **Effort:** 1 day | **Issue:** #011 (partial)

#### Features
1. Update CONTRIBUTING.md with CI/CD rules
2. Update README.md with quick start
3. Add architecture decision records (ADR)
4. Document data ingestion process

**Success Criteria:**
- [ ] CONTRIBUTING.md documents all CI/CD requirements
- [ ] README.md has up-to-date setup instructions
- [ ] ADR directory created with decision templates
- [ ] Data ingestion process documented

---

## 📊 Implementation Roadmap

### Sprint 1 (Week 1-2): Core User Workflow
- **Stage 1.1**: Plot Inbox - User Upload (3-4 days)
- **Stage 1.2**: Evidence Pack Generation (3-4 days)
- **Stage 1.3**: Share Link Functionality (1-2 days)
- **Total**: 7-10 days

### Sprint 2 (Week 3-4): Visualization & UX
- **Stage 2.1**: Mobile Responsiveness (2-3 days)
- **Stage 2.2**: AI Copilot Edit/Copy (1 day)
- **Total**: 3-4 days

### Sprint 3 (Week 5-6): Real Data
- **Stage 3.1**: Load Real Geospatial Data (2-3 days)
- **Total**: 2-3 days

### Sprint 4 (Week 7-8): Infrastructure
- **Stage 4.1**: CI/CD Enhancements (2 days)
- **Stage 4.2**: Issue Templates (1 day)
- **Stage 4.3**: Documentation Updates (1 day)
- **Total**: 4 days

### Overall Timeline: 4-6 weeks

---

## 🎯 Dependency Graph

```
STAGE 1 (Core Workflow)
├── 1.1 Plot Inbox
│   └── Required for: Evidence Pack, Share Link
├── 1.2 Evidence Pack
│   └── Depends on: Plot Inbox (for user data), Parcel data
└── 1.3 Share Link
    └── Depends on: Evidence Pack

STAGE 2 (UX)
├── 2.1 Mobile Responsiveness
│   └── Independent (can run in parallel)
└── 2.2 AI Copilot Edit/Copy
    └── Independent (can run in parallel)

STAGE 3 (Data)
└── 3.1 Real Data
    └── Independent (can run in parallel with Stage 2)

STAGE 4 (Infra)
├── 4.1 CI/CD
│   └── Should be done early (impacts all development)
├── 4.2 Issue Templates
│   └── Independent
└── 4.3 Documentation
    └── Can be done throughout
```

**Recommended Parallelization:**
- Run Stage 1 sequentially (1.1 → 1.2 → 1.3)
- Run Stage 2 in parallel with Stage 3
- Run Stage 4.1 early (first week)
- Run Stage 4.2 and 4.3 throughout

---

## 📦 Deliverables Checklist

### Per Stage Deliverables

#### Stage 1: Core User Workflow
- [ ] PR: feat(upload): implement Plot Inbox with drag-and-drop
- [ ] PR: feat(evidence): generate Evidence Pack (PDF + GeoJSON)
- [ ] PR: feat(share): add shareable links for reports
- [ ] Test: Upload 50+ parcels successfully
- [ ] Test: Generate evidence pack for each parcel type
- [ ] Test: Share link opens without authentication

#### Stage 2: Visualization & UX
- [ ] PR: feat(mobile): responsive design for all screen sizes
- [ ] PR: feat(chat): add edit/copy to AI Copilot
- [ ] Test: Mobile layout on iPhone, Android, tablet
- [ ] Test: Touch interactions work correctly
- [ ] Test: Edit/copy buttons functional

#### Stage 3: Real Data
- [ ] PR: feat(data): import CERSGIS Ghana dataset
- [ ] PR: feat(data): import SITEX Dehesa dataset
- [ ] PR: feat(data): import Ethiopia Coffee dataset
- [ ] Test: All parcels display correctly on map
- [ ] Test: Data validation passes for all imports

#### Stage 4: Infrastructure
- [ ] PR: ci: enhance PR checks with dependency audit
- [ ] PR: docs: add issue templates
- [ ] PR: docs: update CONTRIBUTING.md
- [ ] Test: All CI checks pass
- [ ] Test: Issue templates work correctly

---

## 🛠️ Technical Stack Reference

### Backend (FastAPI)
- Python 3.11+
- FastAPI + Uvicorn
- SQLAlchemy + asyncpg
- PostGIS (PostgreSQL)
- Pydantic models
- Neondatabase (serverless Postgres)

### Frontend (React + TypeScript)
- React 18+
- TypeScript
- MapLibre GL (for maps)
- Tailwind CSS (for styling)
- Vite (for bundling)

### Cloud
- Railway (deployment)
- Neon (Postgres + PostGIS)
- Modal (for ML/GIS compute)

### Data Sources
- CERSGIS Ghana: 21,031 cocoa parcels
- SITEX Spain: ~5,000+ dehesa parcels
- Ethiopia Open Data: 1,000+ coffee parcels

---

## 📝 Next Actions

### Immediate (Today)
1. ✅ Branch `feat/data-viz-cicd-foundation` created and pushed
2. ⏳ Create PR to `main` for current changes
3. ⏳ Monitor CI checks (should pass)
4. ⏳ Merge PR to trigger staging deployment

### This Week
1. Start Stage 1.1: Plot Inbox implementation
2. Start Stage 4.1: CI/CD enhancements (dependency audit)
3. Begin Stage 3.1: Real data import scripts

### This Sprint (2 weeks)
1. Complete Stage 1 (Core Workflow)
2. Complete Stage 4 (Infrastructure)
3. Start Stage 2 (UX)

---

## 🎉 Success Metrics

### Sprint 1 Completion
- [ ] Users can upload their own farm parcels
- [ ] Users can generate Evidence Packs
- [ ] Users can share reports via link
- [ ] 100+ real parcels in database
- [ ] All CI/CD checks passing
- [ ] Mobile-responsive design

### Project Completion
- [ ] All 14 issues implemented
- [ ] All reviewer feedback addressed
- [ ] 26,000+ real parcels available
- [ ] Professional visualization with proper colors
- [ ] Full Plot Inbox → Evidence Pack flow working
- [ ] Production deployment successful

---

## 📚 References

- `IMPLEMENTATION_STATUS.md` - Current implementation progress
- `DATA_AND_IMPROVEMENT_FINDINGS.md` - Data source analysis
- `CI_CD_IMPROVEMENTS.md` - CI/CD enhancement details
- `.github/ISSUES/001-014.md` - Individual issue specifications
- `ISSUES_TO_CREATE.csv` - Source CSV for all issues

---

## 💡 Architecture Decisions

### ADR-001: Feature Branch Workflow
**Status:** Accepted
**Decision:** Use feature branches with PR to main for all changes.
**Rationale:** Enables code review, CI checks, and main-guard enforcement.

### ADR-002: Staging Before Production
**Status:** Accepted
**Decision:** All changes deploy to staging first, then manually promoted to production.
**Rationale:** Reduces production risk, enables testing.

### ADR-003: Evidence Pack as ZIP
**Status:** Proposed
**Decision:** Generate Evidence Pack as ZIP archive containing PDF + GeoJSON + JSON.
**Rationale:** Single downloadable file, easy to share, preserves all formats.

### ADR-004: Token-Based Sharing
**Status:** Proposed
**Decision:** Use time-limited tokens for shareable links instead of public URLs.
**Rationale:** Better security, can expire, trackable analytics.

---

*Document Version: 1.0*
*Last Updated: 2026-09-19*
*Author: Mistral Vibe*
*Status: Ready for Implementation*
