# T-12 Planning: Automated CI Guardrails

## Objective
Implement GitHub Actions workflow to automatically run drift checks and budget enforcement on every push/PR, ensuring v2.0.0 standards cannot be bypassed.

## Scope
- Create `.github/workflows/pipeline-guard.yml`.
- Run root drift check (`node packages/check-drift.mjs`).
- Run budget checker (`packages/core-lib/budget-checker.js`).
