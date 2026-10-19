# Release v2.0.0: Unified Playbook & Automated Infrastructure

## Highlights
- **K-55 & K-56 (Core Library & Budget Enforcement)**: Implemented shared core utilities under `packages/core-lib/` with strict size thresholds (50KB limit per asset/template) enforced programmatically.
- **Root Pipeline Adoption (T-11)**: Synchronized the root $.playbook/$ directory and kit guides with the v2.0.0 universal template standards.
- **Automated CI Guardrails (T-12)**: Added GitHub Actions workflow (`.github/workflows/pipeline-guard.yml`) to automatically run drift checks and budget enforcement on every push and pull request.
- **Pipeline Discipline**: Strict Planning → Flow → Contract → DDA lifecycle adhered to for all milestones (T-10 through T-13).
