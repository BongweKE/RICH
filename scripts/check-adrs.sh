#!/usr/bin/env bash
set -euo pipefail

# check-adrs.sh - Validate ADR documentation
# Based on hodaripay pattern

echo "==> Validating ADR documentation..."

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