---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

- [ ] **[Q-03]:** Frontmatter sweep beyond `guides/` — not a blocker for any current ticket, fix opportunistically when each file is next touched: `playbook/docs/flows/flow.md`, `playbook/docs/contracts/contract.md`, `playbook/docs/contracts/global.md` (own `id/type/status` frontmatter family — decide whether to align to the 4-field guide standard or leave distinct); `playbook/.playbook/templates.md` + `templates/*.md` (HCH block — already an open item from the 2026-08-10 sync check); `playbook/.playbook/pipeline.md`, `playbook/.playbook/README.md`, and all four `vocabulary-*/{README,AI-INSTRUCTIONS,templates}.md` (still `# Title` / `# File:` style).

---

## Closed Decisions

**2026-08-11 — Standalone Context Kit gets its own guide file (Q-02)**

- Resolves Q-02, gating K-14.
- Standalone Context Kit usage is documented in its own file, `guides/context-kit-standalone.md` — not a section inside `guides/context-kit.md`.
- Reaffirms the 2026-05-28 decision that Context Kit is the correct low-friction, standalone entry point.
- `guides/context-kit.md` remains the Playbook-integrated version; each guide cross-links to the other.
- Both guides share the same six kit files (`kit/01-process.md` through `06-qa.md`) — no divergence in file structure between standalone and integrated use.

**2026-08-11 — Meta-Repo Directory Structure Locked**

- Solves the recursive "Playbook building Playbook" confusion.
- Root `.playbook/` governs the repository's own AI sessions and pipeline (Meta-Playbook).
- Root `playbook/` (no dot) is the template source directory containing the raw deliverables for `create-playbook`.
- Root `packages/` holds the publishable code (`create-playbook` CLI and `playbook-software-library`).
- Implicitly resolves [K-02] by cleanly dividing active internal templates (`.playbook/templates/`) from distributable templates (`playbook/templates/`).
- Implicitly resolves [K-09] by confirming the legacy C11/Rust engine and shells are out of scope (they do not exist in the locked directory map).

_(Archived pre-August decisions to `.playbook/kit/_archives/exploration/decisions-pre-migration.md` to maintain pristine context for the restructure)_
