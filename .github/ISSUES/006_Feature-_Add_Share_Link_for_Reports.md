---
title: [Feature]: Add Share Link for Reports
labels: frontend", P2 - Medium Priority, backend, frontend
---

## Problem\nNo way to share parcel reports with others. Reviewer feedback: \There is no share link or download button for the report\"\n\n## Solution\n1. Generate unique share token for each Evidence Pack\n2. Create shareable URL: /share/{token}\n3. Add token-based access control\n4. Set expiration (7 days default)\n5. Track share analytics\n\n## Acceptance Criteria\n- [ ] Share link generated for each Evidence Pack\n- [ ] Link opens report without login\n- [ ] Token expires after configured period\n- [ ] Analytics tracked for shares\n- [ ] UI has share button\n\n## Priority\nP2 - Important feature\n\n## Area\nbackend

---
*Generated from ISSUES_TO_CREATE.csv on 2026-09-19*
*Priority: P2*
*Area: backend, frontend*
