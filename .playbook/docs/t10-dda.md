# T-10 Detailed Design Architecture

## Module Breakdown
- `packages/core/` (or shared helper module): Common I/O, manifest parsing, and validation routines.
- `packages/create-playbook/lib/budget.js`: K-55 budget enforcement logic integrated into build/check-drift flows.
- `packages/playbook-skill/lib/budget.js`: Synchronized asset budget check.
