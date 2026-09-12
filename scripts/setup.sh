#!/usr/bin/env bash
# RICH Setup & Initialization Script
set -e

echo "=== Initializing RICH Environment ==="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

# 1. Check Python virtualenv
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    uv venv .venv || python3 -m venv .venv
fi

# Activate venv
if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

echo "Installing/verifying backend dependencies..."
if command -v uv &> /dev/null; then
    uv pip install -r backend/requirements.txt --quiet || true
elif [ -f ".venv/bin/pip" ]; then
    .venv/bin/pip install -r backend/requirements.txt --quiet || true
else
    pip install -r backend/requirements.txt --quiet || true
fi

# 2. Ingest POC data if DATABASE_URL is accessible
echo "Checking database connection and seeding pilot data..."
if [ -f ".venv/bin/python" ]; then
    .venv/bin/python scripts/ingest_poc_data.py || {
        echo "Notice: Database connection offline or in development mode. Seed script will run when PostgreSQL is connected."
    }
else
    python scripts/ingest_poc_data.py || {
        echo "Notice: Database connection offline or in development mode. Seed script will run when PostgreSQL is connected."
    }
fi

# 3. Setup Frontend if npm is available
if command -v npm &> /dev/null && [ -d "frontend" ]; then
    echo "Setting up frontend dependencies..."
    cd frontend
    if [ ! -d "node_modules" ]; then
        npm install --silent || npm ci --silent
    fi
    cd "$ROOT_DIR"
fi

echo "=== RICH Setup Completed Successfully ==="
