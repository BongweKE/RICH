# RICH - What Remains to be Done

## Current Status (2026-09-19)

### ✅ Completed & Committed to Master
1. **Foundation code** - All data/viz/CI/CD foundation on master (commit 563716c + 7 follow-ups)
2. **300 sample parcels** - Generated and ready to import (`data/all_300_inserts.sql`)
3. **Professional color scheme** - Viridis-based, subtype-specific colors implemented
4. **Opacity slider fix** - Fully functional with dynamic updates
5. **CI/CD workflows** - All enhanced with hodaripay patterns
6. **CODEOWNERS** - Created for required reviews
7. **14 GitHub issues** - Generated and ready for implementation

### ❌ Blocked / Not Yet Done
1. **GitHub Actions deployment** - Infrastructure failures (Docker, Railway CLI, npm)
2. **Sample data in production** - Needs database seeding
3. **Feature implementation** - All 14 issues still need coding

---

## 🎯 What Remains (Prioritized)

### P0 - Deploy Current Changes (Manual - Cost: $0)
**Time: 40-60 minutes**

1. Manual deploy to staging via Railway CLI
2. Seed staging database with 300 parcels
3. Verify staging works (colors, opacity, all parcels visible)
4. Manual deploy to production
5. Seed production database with 300 parcels
6. Verify production works

**Commands:**
```bash
# Deploy
railway up --project rich --environment staging
railway up --project rich --environment production

# Seed data
psql $DATABASE_URL < data/all_300_inserts.sql
```

### P1 - Core User Workflow (Address Reviewer's Top Complaints)
**Time: 7-10 days**

1. **Issue #004: Plot Inbox** - User upload their own farms
   - Drag-and-drop GeoJSON upload
   - Validation and preview
   - Database storage with user association
   
2. **Issue #005: Evidence Pack** - Downloadable compliance report
   - PDF generation (EUDR assessment)
   - GeoJSON export
   - JSON assessment data
   - ZIP archive creation
   
3. **Issue #006: Share Link** - Shareable report links
   - Token-based access (no login)
   - 7-day expiration
   - Access analytics

### P2 - Visualization & UX Improvements
**Time: 3-4 days**

4. **Issue #007: Mobile Responsiveness**
   - Phone layout (320px-600px)
   - Tablet layout (600px-1024px)
   - Touch-friendly controls (44x44px min)
   
5. **Issue #008: AI Copilot Edit/Copy**
   - Edit button on AI responses
   - Copy to clipboard
   - Citation copy functionality

### P3 - Real Data Integration
**Time: 2-3 days**

6. **Issue #001: Load Real Geospatial Data**
   - CERSGIS Ghana Cocoa (21,031 parcels)
   - SITEX Dehesa Spain (~5,000+ parcels)
   - Ethiopia Coffee (1,000+ parcels)

### P4 - Infrastructure & Process
**Time: 4 days**

7. **Issue #009: CI/CD Enhancements**
   - Dependency audit (non-blocking)
   - Test coverage reporting
   - Performance benchmarks
   
8. **Issue #010: Issue Templates**
   - Bug report template
   - Feature request template
   - Task template
   
9. **Issue #011: Documentation Updates**
   - Update CONTRIBUTING.md
   - Add ADR directory
   - Document data ingestion

---

## 📊 Reviewer Feedback Status

| Feedback | Status | Issue | Priority |
|----------|--------|-------|----------|
| Only 2 sample plots | ✅ FIXED | - | - |
| No way to upload farms | ⏳ TODO | #004 | P1 |
| No Evidence Pack | ⏳ TODO | #005 | P1 |
| No edit/copy on AI Copilot | ⏳ TODO | #008 | P2 |
| Opacity slider doesn't work | ✅ FIXED | - | - |
| Unclear handling of 50+ plots | ✅ FIXED | - | - |
| Mobile interface doesn't fit | ⏳ TODO | #007 | P2 |
| No share link | ⏳ TODO | #006 | P1 |

**Reviewer's Biggest Recommendation**: "Prioritise building a Plot Inbox → Evidence Pack flow" - This is our P1

---

## 💰 Cost-Conscious CI/CD Approach

Given user's concern about pipeline costs:

### Current Problem
- GitHub Actions failing (Docker pull timeouts, Railway CLI issues)
- Even if fixed: ~$2-4 per deployment cycle
- At 10 cycles/month: ~$20-40/month

### Recommended Strategy
**Manual deployment for next 2-4 weeks**
- Use Railway CLI directly (local, $0 cost)
- Skip GitHub Actions until infrastructure stabilizes
- Save ~$20-40/month
- Faster iteration (no CI wait times)

### When to Re-enable CI/CD
1. Fix Railway CLI installation in GitHub Actions
2. Create GitHub PAT for git write operations
3. Reduce pipeline complexity (caching, conditional jobs)
4. After P1 features are stable

---

## 📅 Implementation Timeline

### Week 1 (Current)
- [ ] Manual deploy to staging
- [ ] Seed 300 parcels to staging
- [ ] Verify staging
- [ ] Manual deploy to production
- [ ] Seed 300 parcels to production
- [ ] Verify production
- [ ] Start Plot Inbox (Issue #004)

### Week 2
- [ ] Complete Plot Inbox
- [ ] Start Evidence Pack (Issue #005)
- [ ] Start Share Link (Issue #006)

### Week 3-4
- [ ] Complete Evidence Pack
- [ ] Complete Share Link
- [ ] Start Mobile Responsiveness (Issue #007)
- [ ] Start AI Copilot Edit/Copy (Issue #008)

### Week 5-6
- [ ] Complete Mobile Responsiveness
- [ ] Complete AI Copilot Edit/Copy
- [ ] Start Real Data Import (Issue #001)

### Week 7-8
- [ ] Complete Real Data Import
- [ ] CI/CD Enhancements (Issue #009)
- [ ] Issue Templates (Issue #010)
- [ ] Documentation (Issue #011)

---

## 🎯 Immediate Next Steps (Today)

1. **Deploy current master to staging** (manual, Railway CLI)
2. **Seed staging database** with 300 parcels
3. **Verify staging** works correctly
4. **Deploy to production** (manual, Railway CLI)
5. **Seed production database** with 300 parcels
6. **Verify production** works correctly
7. **Tag deployment** in git

Then start **Issue #004: Plot Inbox** implementation.

---

## 📈 Success Metrics

### After Manual Deployment (Today)
- [ ] Staging: https://rich-staging.railway.app works
- [ ] Production: https://rich.acaicia.org works
- [ ] 300+ parcels visible on both
- [ ] Colors display correctly
- [ ] Opacity slider works

### After P1 Features (2-3 weeks)
- [ ] Users can upload their own farms
- [ ] Evidence Pack can be generated and downloaded
- [ ] Share links work
- [ ] All reviewer feedback addressed

### Project Complete (6-8 weeks)
- [ ] All 14 issues implemented
- [ ] 26,000+ real parcels in database
- [ ] Mobile responsive design
- [ ] All UX improvements done

---

## 📝 Summary

**What's Done**: Foundation code, data, colors, opacity, CI/CD workflows
**What Remains**: Deployment + 14 feature issues
**Top Priority**: Manual deploy current changes, then implement Plot Inbox → Evidence Pack → Share Link
**Cost Strategy**: Manual deployment (saves $20-40/month) while fixing CI/CD infrastructure

**Bottom Line**: We're ~25% done with the work. ~75% remains (mostly feature implementation). Deploy what we have now manually, then build the core user workflow (P1 issues).
