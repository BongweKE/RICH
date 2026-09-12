#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating database schemas and migration scripts..."

SQL_FILES=$(find database migrations -name "*.sql" 2>/dev/null || true)

if [ -z "$SQL_FILES" ]; then
    echo "No SQL migration files found."
    exit 0
fi

for f in $SQL_FILES; do
    echo "Checking $f..."

    # Check for forbidden destructive statements in non-test SQL
    if grep -Eiq '^\s*(drop\s+database|truncate)' "$f"; then
        echo "ERROR: Forbidden destructive statement in $f (drop database or truncate)"
        exit 1
    fi

    # Check for balanced single quotes
    quote_count=$(grep -o "'" "$f" | wc -l)
    if [ $((quote_count % 2)) -ne 0 ]; then
        echo "ERROR: Unbalanced single quotes in $f (count: $quote_count)"
        exit 1
    fi

    echo "  [OK] $f"
done

echo "==> All database files passed migration lint."
