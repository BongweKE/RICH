---
title: [Task]: Add CODEOWNERS Based on hodaripay Pattern
labels: ci", P2 - Medium Priority, infra, ci
---

## Context\nhodaripay uses CODEOWNERS for segregation of duties and required reviews.\n\n## Proposed CODEOWNERS for RICH\n```\n# Default owner\n* @BongweKE\n\n# Governance\n/.github/ @BongweKE\n\n# Backend - highest risk\n/backend/ @BongweKE\n\n# Frontend\n/frontend/ @BongweKE\n\n# Database & migrations\n/database/ @BongweKE\n/migrations/ @BongweKE\n\n# CI/CD & scripts\n/.github/workflows/ @BongweKE\n/scripts/ @BongweKE\n\n# Documentation\n/docs/ @BongweKE\n*.md @BongweKE\n\n# Data & ingestion\n/data/ @BongweKE\ningestion/ @BongweKE\n```\n\n## Tasks\n- [ ] Create CODEOWNERS file\n- [ ] Enable \Require review from Code Owners\" in branch protection\n- [ ] Test CODEOWNERS with PR\n\n## Priority\nP2 - Governance\n\n## Area\ninfra

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: P2*
*Area: infra, ci*
