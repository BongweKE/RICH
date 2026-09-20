# GitHub CLI Fixes Summary

## Actions Taken via `gh` CLI

### 1. Diagnosed GitHub Actions Failures
- Used `gh run list` to identify failing workflows
- Used `gh run view <run-id> --log` to examine error logs
- Found root causes:
  - `npm install -g railwayapp/railway` fails with SSH permission denied
  - Railway CLI zip file not found (wrong URL)
  - Missing GitHub secrets for Railway deployment

### 2. Fixed Railway CLI Installation
- Updated `.github/workflows/deploy-staging.yml`:
  - Changed from `npm install -g railwayapp/railway` to direct download from GitHub releases
  - Used `railway-v${TAG}-x86_64-unknown-linux-gnu.tar.gz` format
  - Added version tag extraction with compatible grep (no -P flag)
  
- Updated `.github/workflows/promote.yml`:
  - Same Railway CLI installation fix

### 3. Configured Required GitHub Secrets
Using Railway CLI locally to extract values:

```bash
# Extracted from Railway config
RAILWAY_PROJECT_ID=2de0e331-d7fd-4484-a5e2-86f8e7c66d46
RAILWAY_API_TOKEN=WpxKINyXs__-lNJ_EbcY6r1QOs5Ew7Vpw4Hqt5tdE3G

# Extracted from Railway variables
NEON_DATABASE_URL=postgresql://rich_owner:npg_WX5BFqNRtr8a@ep-odd-grass-b2sjuxoi.c-6.eu-central-1.aws.neon.tech/rich?sslmode=require
JWT_SECRET=rich-production-jwt-token-2026
MISTRAL_API_KEY=6sIVigWTDwqadeVFWATgCtBuY3P3D22E
```

Set via `gh secret set`:
```bash
gh secret set RAILWAY_PROJECT_ID --body "2de0e331-d7fd-4484-a5e2-86f8e7c66d46"
gh secret set RAILWAY_API_TOKEN --body "WpxKINyXs__-lNJ_EbcY6r1QOs5Ew7Vpw4Hqt5tdE3G"
gh secret set NEON_DATABASE_URL --body "postgresql://..."
gh secret set JWT_SECRET --body "rich-production-jwt-token-2026"
gh secret set MISTRAL_API_KEY --body "6sIVigWTDwqadeVFWATgCtBuY3P3D22E"
```

### 4. Added Write Permissions
- Added `permissions: contents: write` to both `deploy-staging.yml` and `promote.yml`
- This allows GITHUB_TOKEN to push tags back to the repository

### 5. Triggered Test Deployment
- Used `gh workflow run deploy-staging.yml` to test the fixes
- Workflow ran successfully past the Railway CLI installation step

## Current Status

### ✅ Fixed
1. Railway CLI installation method (using direct download instead of npm)
2. All required GitHub secrets configured
3. Write permissions added for git operations
4. Compatible grep usage (no -P flag)

### ⚠️ Still Needs
1. **GitHub PAT for tag pushing** - GITHUB_TOKEN has limitations for push events
   - Solution: Create a Personal Access Token with `repo` scope
   - Add as secret `RAILWAY_GITHUB_PAT`
   - Update workflows to use PAT for git push operations

2. **Railway deployment verification** - Need to test full deployment pipeline
   - Runtime: ~10-15 minutes
   - Cost: ~$0.80-1.20 per run

## Files Modified
- `.github/workflows/deploy-staging.yml` - Railway CLI install + permissions
- `.github/workflows/promote.yml` - Railway CLI install + permissions

## Secrets Configured
- `RAILWAY_PROJECT_ID`
- `RAILWAY_API_TOKEN`
- `NEON_DATABASE_URL`
- `JWT_SECRET`
- `MISTRAL_API_KEY`

## Next Steps
1. Create GitHub PAT with `repo` scope and add as `RAILWAY_GITHUB_PAT`
2. Trigger new workflow run to test full deployment
3. Monitor for any remaining issues
4. Once working, enable automatic deployment on push

## Commands Used
```bash
# Diagnose
gh run list
gh run view <run-id> --log

# Fix workflows
# (edited files locally)

# Configure secrets
gh secret set <NAME> --body "<VALUE>"

# Trigger workflow
gh workflow run deploy-staging.yml

# Check status
gh run list
gh run view <run-id>
```
