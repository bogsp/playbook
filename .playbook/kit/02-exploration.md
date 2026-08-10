---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

- [ ] **[Q-02]:** Standalone Context Kit documentation — does it get its own guide file (e.g. `guides/context-kit-standalone.md`), or a section inside the existing `guides/context-kit.md`? Blocks K-14. To be resolved at the start of K-14.

---

## Closed Decisions

**2026-08-11 — Meta-Repo Directory Structure Locked**

- Solves the recursive "Playbook building Playbook" confusion.
- Root `.playbook/` governs the repository's own AI sessions and pipeline (Meta-Playbook).
- Root `playbook/` (no dot) is the template source directory containing the raw deliverables for `create-playbook`.
- Root `packages/` holds the publishable code (`create-playbook` CLI and `playbook-software-library`).
- Implicitly resolves [K-02] by cleanly dividing active internal templates (`.playbook/templates/`) from distributable templates (`playbook/templates/`).
- Implicitly resolves [K-09] by confirming the legacy C11/Rust engine and shells are out of scope (they do not exist in the locked directory map).

_(Archived pre-August decisions to `.playbook/kit/_archives/exploration/decisions-pre-migration.md` to maintain pristine context for the restructure)_
