---
title: [Task]: Enhance CI/CD Based on hodaripay Patterns
labels: P2, ci, infra
---

## Context\nReview hodaripay repository CI/CD patterns and apply best practices to RICH.\n\n## hodaripay Patterns to Adopt\n1. **PR Checks**:\n   - Conventional commit title validation\n   - Secret scanning with gitleaks\n   - Shared package checks (ruff, black, mypy, ESLint)\n   - Migration linting\n   - ADR validation\n   - Dependency audit (non-blocking)\n\n2. **Main Branch Guard**:\n   - Prevent direct pushes to main\n   - Verify commits arrive via PR\n   - File issue on violation\n\n3. **Deploy Staging**:\n   - Run tests before deploy\n   - Detect backend changes to skip unnecessary deploys\n   - Migrate Neon database\n   - Seed content\n   - Deploy to Railway\n   - Smoke tests\n   - Tag last deployed commit\n\n4. **Promote to Production**:\n   - Manual workflow_dispatch\n   - Requires GitHub environment with reviewer\n   - Migrate production database\n   - Deploy to Railway\n   - Smoke tests\n   - Tag production commit\n\n## Current RICH State\n- [x] PR Checks workflow exists\n- [x] Deploy to Staging workflow exists\n- [x] Promote workflow exists\n- [ ] Main branch guard missing\n- [ ] Migration linting in PR checks\n- [ ] Secret scanning in PR checks\n- [ ] ADR validation missing\n- [ ] Conventional commit validation missing\n- [ ] Change detection for backend deploys missing\n\n## Tasks\n- [ ] Add conventional commit validation to pr.yml\n- [ ] Add secret scanning (gitleaks) to pr.yml\n- [ ] Add migration linting script and job\n- [ ] Add ADR validation to pr.yml\n- [ ] Create main-guard.yml workflow\n- [ ] Add change detection to deploy-staging.yml\n- [ ] Add database migration step to deploy-staging.yml\n- [ ] Add smoke tests to deploy-staging.yml\n- [ ] Enhance promote.yml with production guard\n\n## Priority\nP2 - Infrastructure improvement\n\n## Area\nci, infra\n\n## Compliance\n- [x] Changes CI/CD infrastructure\n- [x] Needs ADR for architecture changes

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: ci, infra*
*Area: *
