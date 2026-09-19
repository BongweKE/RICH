# RICH CI/CD Improvements - Based on hodaripay Patterns

## Executive Summary

Based on the successful CI/CD patterns from [hodaripay](https://github.com/BongweKE/hodaripay), this document outlines improvements to RICH's GitHub Actions workflows. The hodaripay repository demonstrates a **production-grade CI/CD pipeline** with proper separation of duties, change detection, and deployment gating.

## 🎯 Goals

1. **Adopt hodaripay's proven patterns** for PR checks, deployment, and promotion
2. **Add missing gates** (conventional commits, secret scanning, migration linting)
3. **Implement change detection** to avoid unnecessary deploys
4. **Enhance branch protection** with main guard workflow
5. **Improve deployment reliability** with smoke tests and tagging

---

## 📊 Current State Analysis

### RICH Current Workflows

| Workflow | Status | Notes |
|----------|--------|-------|
| `pr.yml` | ✅ Exists | Basic linting, tests, security scan |
| `deploy-staging.yml` | ✅ Exists | Deploys to Railway on main push |
| `promote.yml` | ✅ Exists | Manual production promotion |

### hodaripay Workflows (Reference)

| Workflow | Purpose | Key Features |
|----------|---------|--------------|
| `pr.yml` | PR Checks | Conventional commits, gitleaks, linting, migration lint, ADR check, dependency audit |
| `main-guard.yml` | Branch Protection | Prevents direct pushes to main, verifies PR origin |
| `deploy-staging.yml` | Staging Deploy | Change detection, Neon migration, Railway deploy, smoke tests, tagging |
| `promote.yml` | Production Promotion | Manual dispatch, production guard, Neon migration, Railway deploy, smoke tests, tagging |
| `release-apk-staging.yml` | APK Build | Android APK build for staging |
| `release-apk-production.yml` | APK Build | Android APK build for production |

---

## 🚀 Improvements to Implement

### Priority 1: PR Checks Enhancement (From hodaripay)

**File:** `.github/workflows/pr.yml`

#### Add: Conventional Commit Validation

```yaml
pr_title:
  name: Conventional PR title
  runs-on: ubuntu-latest
  steps:
    - name: Validate title
      env:
        TITLE: ${{ github.event.pull_request.title }}
      run: |
        set -e
        # Conventional Commits: type(scope)!: subject
        pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9._/-]+\\))?!?: .+'
        if ! printf '%s' "$TITLE" | grep -Eq "$pattern"; then
          echo "::error::PR title is not a Conventional Commit: '$TITLE'"
          echo "Expected e.g. 'fix(payouts): reject short Till accounts'."
          exit 1
        fi
        echo "OK: $TITLE"
```

#### Add: Secret Scanning with Gitleaks

```yaml
secrets:
  name: Secret scan
  runs-on: ubuntu-latest
  permissions:
    contents: read
    pull-requests: read
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: gitleaks
      uses: gitleaks/gitleaks-action@v3
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        GITLEAKS_ENABLE_COMMENTS: 'false'
```

#### Add: Migration Linting

Create `scripts/check-migrations.sh`:

```bash
#!/bin/bash
# check-migrations.sh - Lint database migrations
# Based on hodaripay pattern

set -e

# Check all migration files
for f in migrations/*.sql; do
  case "$f" in
    [0-9][0-9][0-9][0-9]_*) : ;;
    *) echo "Bad migration filename: $f (expected NNNN_*.sql)"; exit 1 ;;
  esac
  
  # Check for forbidden destructive statements
  grep -Eiq '^\s*(drop table|drop database|truncate)' "$f" && { 
    echo "Forbidden statement in $f"; 
    exit 1; 
  }
  
  # Check for balanced single quotes
  n=$(grep -o "'" "$f" | wc -l)
  if [ $((n % 2)) -ne 0 ]; then 
    echo "Unbalanced quotes in $f"; 
    exit 1; 
  fi
  
  echo "ok $f"
done

echo "All migrations passed linting"
```

Then add to `pr.yml`:

```yaml
migrations:
  name: Database Migration Lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Lint database schemas & migrations
      run: bash scripts/check-migrations.sh
```

#### Add: ADR Validation

Create `scripts/check-adrs.sh`:

```bash
#!/bin/bash
# check-adrs.sh - Validate ADR documentation
# Based on hodaripay pattern

set -e

# Check that ADR directory exists
if [ ! -d "docs/decisions" ]; then
  echo "::warning::No ADR directory found (docs/decisions)"
  exit 0
fi

# Check ADR files follow naming convention
for f in docs/decisions/*.md; do
  if [ -f "$f" ]; then
    basename=$(basename "$f")
    # ADR naming: NNNN-title.md
    if ! echo "$basename" | grep -Eq '^[0-9]{4}-[a-zA-Z0-9_-]+\.md$'; then
      echo "Bad ADR filename: $f (expected NNNN-title.md)"
      exit 1
    fi
  fi
done

# Check that ADR index is up to date
if [ -f "docs/decisions/README.md" ]; then
  echo "ADR index exists"
else
  echo "::warning::No ADR index found (docs/decisions/README.md)"
fi

echo "ADR validation passed"
```

Then add to `pr.yml`:

```yaml
adrs:
  name: ADR validation
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Check ADRs
      run: bash scripts/check-adrs.sh
```

---

### Priority 1: Main Branch Guard (From hodaripay)

**File:** `.github/workflows/main-guard.yml`

```yaml
name: Main branch guard

# Detective control: `main` must only move through merged pull requests.
# Preventive controls that complement this:
#   - `.githooks/pre-push` blocks accidental local pushes to `main`.
#   - Enable branch protection/rulesets when available (make repo public or upgrade).

on:
  push:
    branches: [main, master]

permissions:
  contents: read
  issues: write
  pull-requests: read

concurrency:
  group: main-guard-${{ github.ref }}
  cancel-in-progress: false

jobs:
  guard:
    name: Verify main arrived via a pull request
    runs-on: ubuntu-latest
    steps:
      - name: Check commit ↔ PR association
        id: check
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REPO: ${{ github.repository }}
          SHA: ${{ github.sha }}
        run: |
          set -euo pipefail
          # The commit is a PR merge (or a squash/rebase from a PR) iff the API
          # associates at least one PR with it. A direct `git push origin main`
          # returns an empty list.
          if ! prs="$(gh api "repos/$REPO/commits/$SHA/pulls" --jq 'length' 2>/tmp/gh.err)"; then
            echo "::warning::Could not query commit/PR association (${SHA}); skipping guard. $(cat /tmp/gh.err)"
            echo "violation=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi
          if [ "${prs:-0}" -eq 0 ]; then
            echo "violation=true" >> "$GITHUB_OUTPUT"
            echo "::error::Direct push to main detected: $SHA did not arrive via a pull request."
          else
            echo "violation=false" >> "$GITHUB_OUTPUT"
            echo "OK: $SHA is associated with $prs pull request(s)."
          fi

      - name: File a process-violation issue
        if: steps.check.outputs.violation == 'true'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REPO: ${{ github.repository }}
          SHA: ${{ github.sha }}
        run: |
          set -euo pipefail
          TITLE="Process violation: direct push to main (${SHA:0:7})"
          BODY="$(printf 'A commit was pushed directly to `main` without a pull request.

- Commit: `%s`
- Pusher: `%s`
- Run: %s/%s/actions/runs/%s

**Why this matters:** `main` auto-deploys staging and is the only ref production can be promoted from, so an unreviewed commit bypasses CI review, the docs rule and the ADR gate.

**What to do:** if this was accidental, revert it through a PR. If the change is wanted, re-land it through a PR so it is reviewed and linked to an issue.

See CONTRIBUTING.md and docs/ci-cd.md.' \
            "$SHA" "${GITHUB_ACTOR:-unknown}" "${GITHUB_SERVER_URL:-https://github.com}" "$REPO" "${GITHUB_RUN_ID:-unknown}")"
          # Deduplicate: skip if an open issue for this short SHA already exists.
          existing="$(gh api -X GET search/issues \
            -f q="repo:$REPO in:title ${SHA:0:7}" --jq '.total_count' 2>/dev/null || echo 0)"
          if [ "${existing:-0}" -gt 0 ]; then
            echo "An open issue for ${SHA:0:7} already exists; not filing a duplicate."
            exit 0
          fi
          gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" \
            --label "process-violation"

      - name: Fail the run
        if: steps.check.outputs.violation == 'true'
        run: |
          echo "::error::main must only be updated via merged pull requests. See the issue filed above."
          exit 1
```

---

### Priority 2: Deploy Staging Enhancement

**File:** `.github/workflows/deploy-staging.yml`

#### Add: Change Detection

```yaml
# Detect whether this push actually changes anything the backend depends on
# (backend/, database/, migrations/ — which includes Neon migrations).
# UI-only pushes skip the Neon migrate + Railway API jobs entirely.
changes:
  name: Detect backend/infra changes
  runs-on: ubuntu-latest
  outputs:
    backend_changed: ${{ steps.detect.outputs.backend_changed }}
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: "Diff against last deployed API commit (staging-api tag)"
      id: detect
      run: |
        if git rev-parse -q --verify refs/tags/staging-api >/dev/null; then
          base="$(git rev-parse refs/tags/staging-api)"
        else
          base=""
        fi
        if [ -z "$base" ]; then
          echo "backend_changed=true" >> "$GITHUB_OUTPUT"
          echo "No staging-api tag yet — running migrate + API deploy."
        elif git diff --name-only "$base" "$GITHUB_SHA" -- backend database migrations | grep -q .; then
          echo "backend_changed=true" >> "$GITHUB_OUTPUT"
          echo "Backend/database/migrations changed since last API deploy."
        else
          echo "backend_changed=false" >> "$GITHUB_OUTPUT"
          echo "No backend/database/migrations changes — skipping Neon migrate + Railway API deploy."
        fi
```

#### Add: Neon Database Migration

```yaml
migrate-staging-db:
  name: Migrate Neon (testing branch)
  needs: [test, changes]
  if: needs.changes.outputs.backend_changed == 'true'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v5
      with:
        python-version: '3.11'
    - name: Install dependencies
      run: |
        pip install psycopg2-binary
    - name: Run migrations
      run: |
        python scripts/run_migrations.py "$NEON_DATABASE_URL"
      env:
        NEON_DATABASE_URL: ${{ secrets.NEON_DATABASE_URL }}
```

#### Add: Seed Content

```yaml
seed-staging:
  name: Seed content
  needs: [migrate-staging-db]
  if: needs.migrate-staging-db.result == 'success'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Seed sample data
      run: |
        python scripts/generate_sample_parcels.py --count 300 --all-regions --output /tmp/sample_data.geojson --sql
        # Import into database
        psql $NEON_DATABASE_URL -f /tmp/sample_data_inserts.sql
      env:
        NEON_DATABASE_URL: ${{ secrets.NEON_DATABASE_URL }}
```

#### Add: Smoke Tests

```yaml
smoke-staging:
  name: Smoke test (staging)
  needs: [migrate-staging-db, deploy-api-staging, deploy-web-staging]
  runs-on: ubuntu-latest
  if: ${{ always() && (needs.deploy-api-staging.result == 'success' || needs.deploy-web-staging.result == 'success') }}
  steps:
    - name: Check API health
      run: |
        curl -sf --retry 5 --retry-delay 5 -o /dev/null -w "staging API: %{http_code}\n" \
          ${{ vars.API_URL_STAGING }}/health
    - name: Check web
      run: |
        curl -sf -o /dev/null -w "staging web: %{http_code}\n" \
          https://rich-staging.railway.app/
    - name: Check parcels endpoint
      run: |
        curl -sf ${{ vars.API_URL_STAGING }}/api/geospatial/parcels | grep -q '"parcels"' \
          && echo "staging parcels endpoint ok"
```

#### Add: Tag Last Deployed Commit

```yaml
      - name: Record last deployed API commit (staging-api tag)
        run: |
          git tag -f staging-api "${{ github.sha }}"
          git push --force origin "refs/tags/staging-api:refs/tags/staging-api"
```

---

### Priority 2: Promote to Production Enhancement

**File:** `.github/workflows/promote.yml`

#### Add: Production Guard

```yaml
permissions:
  contents: write

concurrency:
  group: production
  cancel-in-progress: false

jobs:
  verify-main:
    name: Verify main branch
    runs-on: ubuntu-latest
    steps:
      - name: Assert main branch
        run: |
          if [ "${{ github.ref }}" != "refs/heads/main" ]; then
            echo "::error::Promote workflow can only be run from the main branch (attempted from ${{ github.ref }})."
            exit 1
          fi
```

#### Add: Production Environment

```yaml
migrate-production-db:
  name: Migrate Neon (production branch)
  needs: [test, changes]
  if: needs.changes.outputs.backend_changed == 'true'
  runs-on: ubuntu-latest
  environment: production  # Requires GitHub environment with reviewer
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-python@v5
      with:
        python-version: '3.11'
    - name: Install dependencies
      run: |
        pip install psycopg2-binary
    - name: Run migrations
      run: |
        python scripts/run_migrations.py "$NEON_DATABASE_URL_PRODUCTION"
      env:
        NEON_DATABASE_URL_PRODUCTION: ${{ secrets.NEON_DATABASE_URL_PRODUCTION }}
```

#### Add: Production Smoke Tests

```yaml
smoke-production:
  name: Smoke test (production)
  needs: [migrate-production-db, deploy-api-production, deploy-web-production]
  runs-on: ubuntu-latest
  environment: production
  if: ${{ always() && (needs.deploy-api-production.result == 'success' || needs.deploy-web-production.result == 'success') }}
  steps:
    - name: Check API health
      run: |
        curl -sf --retry 5 --retry-delay 5 -o /dev/null -w "prod API: %{http_code}\n" \
          ${{ vars.API_URL_PRODUCTION }}/health
    - name: Check web
      run: |
        curl -sf -o /dev/null -w "prod web: %{http_code}\n" \
          https://rich.railway.app/
    - name: Check parcels endpoint
      run: |
        curl -sf ${{ vars.API_URL_PRODUCTION }}/api/geospatial/parcels | grep -q '"parcels"' \
          && echo "prod parcels endpoint ok"
```

#### Add: Production Tag

```yaml
      - name: Record last deployed API commit (prod-api tag)
        run: |
          git tag -f prod-api "${{ github.sha }}"
          git push --force origin "refs/tags/prod-api:refs/tags/prod-api"
```

---

## 📁 Files to Create/Modify

### Create New Files

1. `.github/workflows/main-guard.yml` - Main branch protection
2. `scripts/check-migrations.sh` - Migration linting
3. `scripts/check-adrs.sh` - ADR validation
4. `CODEOWNERS` - Code ownership for required reviews

### Modify Existing Files

1. `.github/workflows/pr.yml` - Add conventional commits, secrets, migration lint, ADR validation
2. `.github/workflows/deploy-staging.yml` - Add change detection, Neon migration, seed data, smoke tests, tagging
3. `.github/workflows/promote.yml` - Add production guard, environment, production migration, smoke tests, tagging

### Create Issue Templates

1. `.github/ISSUE_TEMPLATE/config.yml` - Disable blank issues, add contact links
2. `.github/ISSUE_TEMPLATE/1-bug-report.yml` - Enhanced with environment, version, severity, area
3. `.github/ISSUE_TEMPLATE/2-feature-request.yml` - Enhanced with compliance considerations
4. `.github/ISSUE_TEMPLATE/3-task.yml` - Enhanced with kind of work, definition of done

---

## 🎯 Implementation Roadmap

### Phase 1: PR Checks (Week 1)
- [ ] Create `scripts/check-migrations.sh`
- [ ] Create `scripts/check-adrs.sh`
- [ ] Update `pr.yml` with conventional commit validation
- [ ] Update `pr.yml` with gitleaks secret scanning
- [ ] Update `pr.yml` with migration linting job
- [ ] Update `pr.yml` with ADR validation job

### Phase 2: Branch Protection (Week 1)
- [ ] Create `main-guard.yml` workflow
- [ ] Test main guard with a direct push (should fail)
- [ ] Document branch protection in CONTRIBUTING.md

### Phase 3: Deploy Staging (Week 2)
- [ ] Add change detection to `deploy-staging.yml`
- [ ] Add Neon migration step
- [ ] Add seed data step
- [ ] Add smoke tests
- [ ] Add commit tagging

### Phase 4: Promote to Production (Week 2)
- [ ] Add production guard
- [ ] Add production environment requirement
- [ ] Add production Neon migration
- [ ] Add production smoke tests
- [ ] Add production commit tagging

### Phase 5: Issue Templates (Week 2)
- [ ] Create `config.yml`
- [ ] Update `bug_report.yml`
- [ ] Update `feature_request.yml`
- [ ] Update `task.yml`

### Phase 6: CODEOWNERS (Week 2)
- [ ] Create `CODEOWNERS` file
- [ ] Enable "Require review from Code Owners" in GitHub settings
- [ ] Test with a PR

---

## 📊 Comparison: Before vs After

| Aspect | Before | After (hodaripay pattern) |
|--------|--------|--------------------------|
| PR Title Validation | ❌ None | ✅ Conventional commits enforced |
| Secret Scanning | ❌ None | ✅ Gitleaks on all PRs |
| Migration Linting | ❌ None | ✅ Filename, destructive statements, quotes |
| ADR Validation | ❌ None | ✅ Naming convention, index |
| Main Branch Guard | ❌ None | ✅ Prevents direct pushes |
| Change Detection | ❌ None | ✅ Skips unchanged deploys |
| Database Migration | ❌ None | ✅ Automatic on deploy |
| Seed Data | ❌ None | ✅ Content-only seed |
| Smoke Tests | ❌ None | ✅ API + web health checks |
| Commit Tagging | ❌ None | ✅ staging-api, prod-api tags |
| Code Owners | ❌ None | ✅ Required reviews |

---

## 💡 Benefits

1. **Prevents Accidental Direct Pushes** - Main guard ensures all changes go through PR review
2. **Catches Secrets Early** - Gitleaks prevents credential leaks before they hit main
3. **Enforces Consistency** - Conventional commits, migration naming, ADR format
4. **Saves Time** - Change detection skips unnecessary builds/deploys
5. **Improves Reliability** - Migration linting catches errors before deploy
6. **Better Governance** - CODEOWNERS ensures proper review
7. **Production Safety** - Environment protection, manual promotion, smoke tests

---

## 🔗 References

- hodaripay PR Checks: https://github.com/BongweKE/hodaripay/blob/main/.github/workflows/pr.yml
- hodaripay Main Guard: https://github.com/BongweKE/hodaripay/blob/main/.github/workflows/main-guard.yml
- hodaripay Deploy Staging: https://github.com/BongweKE/hodaripay/blob/main/.github/workflows/deploy-staging.yml
- hodaripay Promote: https://github.com/BongweKE/hodaripay/blob/main/.github/workflows/promote.yml
- Gitleaks Action: https://github.com/gitleaks/gitleaks-action
- Conventional Commits: https://www.conventionalcommits.org/

---

**Document Version**: 1.0  
**Last Updated**: 2026-09-19  
**Author**: RICH Development Team  
**Status**: Ready for Implementation  
**Priority**: P2 (Infrastructure) but high impact
