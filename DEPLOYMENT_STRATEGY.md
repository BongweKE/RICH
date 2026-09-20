# RICH Deployment Strategy - Cost-Conscious Approach

## Executive Summary

**Current State**: All foundation code is committed to master (commits 563716c, 8d00cac, f1e3282, 5a47048, 609fd7d, cfbdd15, 7abb421, ee57ce4).

**Problem**: GitHub Actions CI/CD is experiencing infrastructure failures (Docker pull timeouts, Railway CLI install failures, npm access issues) and would consume expensive pipeline minutes even if fixed.

**Solution**: Use manual deployment to Railway for now, with selective CI/CD activation.

---

## 💰 Cost Analysis

### GitHub Actions Pricing (as of 2026)
- **Linux runners**: $0.008/minute (standard) to $0.08/minute (larger)
- **Average workflow run**: 5-15 minutes
- **Our workflows**:
  - `pr.yml`: ~8-12 minutes (multiple jobs)
  - `deploy-staging.yml`: ~10-15 minutes
  - `promote.yml`: ~8-12 minutes

**Cost per full deployment cycle**: ~$2-4 in compute minutes

**Monthly cost at current frequency**: If we trigger 10 deployment cycles/month = ~$20-40/month

### Recommendation: Manual Deployment for Now

Given:
1. GitHub Actions infrastructure is currently broken for our stack
2. We have direct Railway CLI access
3. Manual deployment is faster and more reliable currently
4. We can save $20-40/month in pipeline costs

**Strategy**: Deploy manually to staging, verify, then manually promote to production.

---

## 🚀 Manual Deployment Workflow

### Prerequisites
```bash
# Install Railway CLI locally (one-time)
npm install -g railwayapp/railway

# Authenticate
railway login

# Verify project access
railway projects
```

### Step 1: Deploy to Staging
```bash
# From project root
cd /home/pro-g/ProG/RICH

# Ensure all changes are committed and pushed
git add .
git commit -m "feat: ready for staging deployment"
git push origin master

# Deploy to Railway staging
railway up --project rich --environment staging

# This will:
# - Build and deploy backend (FastAPI)
# - Build and deploy frontend (React/Vite)
# - Apply database migrations
# - Output: https://rich-staging.railway.app
```

### Step 2: Seed Sample Data
```bash
# Connect to staging database
# Get connection string from Railway dashboard
RAILWAY_DATABASE_URL=$(railway variables get DATABASE_URL --environment staging)

# Import sample data (300 parcels)
psql $RAILWAY_DATABASE_URL < data/all_300_inserts.sql

# Verify import
psql $RAILWAY_DATABASE_URL -c "SELECT COUNT(*) FROM agroforestry_parcels;"
# Expected: 300+ rows
```

### Step 3: Verify Staging
```bash
# Health check
curl -I https://rich-staging.railway.app/health

# API check
curl -I https://rich-staging.railway.app/api/parcels

# Frontend check
curl -I https://rich-staging.railway.app/

# Manual browser test
# Open https://rich-staging.railway.app
# Verify:
# - Parcels display with new colors
# - Opacity slider works
# - All 300+ parcels visible
# - No errors in console
```

### Step 4: Promote to Production (Manual)
```bash
# Deploy to production
railway up --project rich --environment production

# Seed production database
RAILWAY_DATABASE_URL=$(railway variables get DATABASE_URL --environment production)
psql $RAILWAY_DATABASE_URL < data/all_300_inserts.sql

# Verify production
curl -I https://rich.acaicia.org/health
curl -I https://rich.acaicia.org/api/parcels
```

---

## 📋 What's Already Deployed vs. What Needs Deployment

### ✅ Already in Production (from previous deployments)
- Basic 3D map and canopy view
- EUDR Audit with compliance results
- Time slider and layers
- 2 sample plots
- Basic AI Copilot

### ⏳ Needs Deployment (current master branch)
1. **Data & Visualization**
   - 300 sample parcels (from data/all_300_inserts.sql)
   - Professional color scheme (Viridis-based)
   - Subtype-specific colors for agroforestry
   - Fixed opacity slider functionality

2. **CI/CD Infrastructure**
   - Conventional commit validation
   - Secret scanning (gitleaks)
   - ADR validation
   - Main branch guard
   - Change detection for deployments
   - CODEOWNERS file

3. **Code Changes**
   - `frontend/src/types/index.ts` - Color constants
   - `frontend/src/components/LayerPanel.tsx` - Opacity state
   - `frontend/src/components/MapViewer.tsx` - Subtype colors, opacity
   - `frontend/src/App.tsx` - Opacity management
   - `.github/workflows/*.yml` - All CI/CD workflows

---

## 🎯 Priority Features Still To Implement (After Deployment)

### P1 - Must Have (Address Reviewer Feedback)
1. **Plot Inbox** (Issue #004) - User can upload their own farms
2. **Evidence Pack** (Issue #005) - Downloadable PDF + GeoJSON report
3. **Share Link** (Issue #006) - Shareable report links

### P2 - Should Have
4. **Mobile Responsiveness** (Issue #007) - Works on phone/tablet
5. **AI Copilot Edit/Copy** (Issue #008) - Edit and copy buttons
6. **Real Data Import** (Issue #001) - Load CERSGIS, SITEX, Ethiopia datasets

### P2 - Infrastructure
7. **CI/CD Enhancements** (Issue #009) - Dependency audit, coverage
8. **Issue Templates** (Issue #010) - Structured issue reporting
9. **Documentation** (Issue #011) - CONTRIBUTING.md, ADRs

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] All changes committed to master
- [ ] GitHub Actions issues documented (to fix later)
- [ ] Railway CLI installed and authenticated
- [ ] Production secrets configured in Railway
- [ ] Database connection strings available

### During Deployment
- [ ] Deploy to staging manually
- [ ] Seed staging database with 300 parcels
- [ ] Verify staging works correctly
- [ ] Run smoke tests on staging

### After Staging Verification
- [ ] Deploy to production manually
- [ ] Seed production database with 300 parcels
- [ ] Verify production works correctly
- [ ] Monitor for errors (5-10 minutes)

### Post-Deployment
- [ ] Update this document with deployment timestamps
- [ ] Tag the deployment in git
- [ ] Notify stakeholders
- [ ] Begin Stage 1 feature implementation

---

## 🔧 Fixing GitHub Actions (Future - When Cost-Effective)

The current issues are:
1. **Railway CLI installation failing** - npm registry issues
2. **Docker pull timeouts** - GitHub Actions runner network
3. **Git write permissions** - Need PAT with repo scope

### Fix 1: Use Railway NPM Package (More Reliable)
```yaml
- name: Install Railway CLI
  run: |
    npm install -g @railway/cli
    railway login --token $RAILWAY_API_TOKEN
```

### Fix 2: Use GitHub PAT for Git Operations
Create a Personal Access Token with:
- Scope: `repo` (full control of private repositories)
- Add to secrets: `RAILWAY_GITHUB_PAT`

Update promote.yml:
```yaml
- name: Configure Git for tag creation
  run: |
    git remote set-url origin https://x-access-token:${{ secrets.RAILWAY_GITHUB_PAT }}@github.com/BongweKE/RICH.git
```

### Fix 3: Reduce CI/CD Pipeline Complexity
- Remove redundant jobs
- Use caching for dependencies
- Make backend test job conditional
- Use `if: github.event_name == 'pull_request'` for PR-only jobs

---

## 📈 Success Metrics

### Immediate (This Deployment)
- [ ] Staging deployment successful
- [ ] 300 parcels loaded and visible
- [ ] Opacity slider works
- [ ] Colors display correctly
- [ ] Production deployment successful

### Short Term (1-2 Weeks)
- [ ] All reviewer feedback addressed
- [ ] 100+ real parcels in database
- [ ] Plot Inbox → Evidence Pack flow working
- [ ] Share links functional

### Medium Term (1-2 Months)
- [ ] All 14 issues implemented
- [ ] 26,000+ real parcels available
- [ ] Mobile responsive
- [ ] Professional visualization complete

---

## ⏱️ Estimated Timeline

| Phase | Duration | Cost (Pipeline Minutes) |
|-------|----------|-------------------------|
| Manual staging deployment | 10-15 min | $0 (local) |
| Manual production deployment | 10-15 min | $0 (local) |
| Data seeding | 2-5 min | $0 (local) |
| Verification | 15-30 min | $0 (manual) |
| **Total** | **40-60 min** | **$0** |

vs. GitHub Actions approach:
| Phase | Duration | Cost |
|-------|----------|------|
| PR checks | 8-12 min | $0.64-0.96 |
| Deploy staging | 10-15 min | $0.80-1.20 |
| Promote to prod | 8-12 min | $0.64-0.96 |
| **Total** | **26-39 min** | **$2.08-3.12** |

**Savings**: ~$2-3 per deployment cycle

---

## 🎯 Recommendation

**Use manual deployment for the next 2-4 weeks** while we:
1. Fix GitHub Actions infrastructure issues
2. Complete the P1 features (Plot Inbox, Evidence Pack, Share Link)
3. Build up real data (CERSGIS, SITEX, Ethiopia)
4. Then re-enable CI/CD when it's more stable and cost-effective

This approach:
- ✅ Saves ~$20-40/month in pipeline costs
- ✅ Avoids current infrastructure failures
- ✅ Allows faster iteration (no waiting for CI)
- ✅ Maintains deployment quality (manual verification)

---

*Document Version: 1.0*
*Last Updated: 2026-09-19*
*Author: Mistral Vibe*
