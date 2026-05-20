# EXPLORATION

## Open Topics

<!-- No open topics — all decisions locked for this project -->

---

## Closed Decisions

**2026-05-07 — Pipeline Named Playbook**
- Named: Playbook — natural developer vocabulary, not forced
- Folder: .playbook/ — replaces .context/ and .spec/
- Pipeline starter: PLAYBOOK.md at repo root
- AI boot file: .playbook/00-playbook.md

**2026-05-07 — Living Folder Tree**
- Every _index.md has a Structure section with linked annotated entries
- Mirrors the actual .playbook/ folder structure
- Updated via sync mode whenever components change
- Serves as the at-a-glance project map for humans and AI

**2026-05-07 — Orchestrator Flow Format**
- Two representations in every orchestrator doc
- Flow section in body — annotated numbered sequence with linked components; primary reference
- Mermaid sequence diagram in Detail — visual; kept in sync with Flow section
- Keeps the file light and browseable while providing visual depth when needed

**2026-05-07 — Full Pipeline as One System**
- Playbook treats the entire pipeline as one system: Context Kit -> PRD/Specs -> DDA -> Code -> Rollout
- PLAYBOOK.md at repo root is the single entry point for any new machine or team member
- 00-summary.md updated to cover the full Playbook system

**2026-05-07 — Existing Project Adoption**
- Structured audit approach: Inventory -> Audit -> Gap Report -> Scaffold -> Adopt
- Additive only — existing code stays intact throughout adoption
- Two separate guides: with Context Kit and without Context Kit
- Adoption priority: concerns -> integrations -> shared -> orchestrators -> components

**2026-05-07 — Rollout Doc Dual Purpose**
- Human-facing: deployment guide, release notes, migration steps
- AI-facing: full project context dump for fresh sessions
- Generated on demand; never edited directly

**2026-05-06 — Document Format**
- YAML frontmatter + one-paragraph narrative + optional Detail section
- Single file per component — no companion files

**2026-05-06 — Five Document Types**
- component — single unit of logic
- orchestrator — runtime shell that sequences components
- structure — module/project manifest and scaffold
- concern — cross-cutting capability used across modules
- integration — third-party service or external library contract

**2026-05-06 — Folder Structure**
- DDA lives in .playbook/ at repo root
- Reserved folders: _concerns/, _integrations/, _shared/
- Each level has an _index.md structure doc
- 00-playbook.md is always the first file AI reads
- Max folder depth: 2 levels unless module grows complex

**2026-05-06 — Naming Conventions**
- Files: kebab-case.md — IDs match filename exactly
- Folders: kebab-case — reserved folders use leading underscore
- Structure docs: always _index.md
- Events: PascalCase in frontmatter
- Commits: grouped by scope — dda:, kit:, [module]:, fix:, chore:

**2026-05-06 — Code Standards**
- Encoding fixed — UTF-8 BOM removed, arrows and dashes restored
- Section 9 updated to reference Playbook
- Section 10 Error Mitigation added
- PR checklist updated with Playbook sync and kit file checks

**2026-05-06 — AI Boot Sequence**
- Always load: 00-playbook.md -> code-standards.md -> _index.md -> module docs -> component docs
- 00-playbook.md declares requires: docs/code-standards.md
- Scoped context packages — load only what the task needs

**2026-05-06 — Phase Completion and Error Mitigation**
- Eight-step phase completion checklist in 01-process.md and 00-playbook.md
- Immediate response protocol: Stop -> Identify -> Isolate -> Fix -> Verify -> Log
- All categories and responses defined in code-standards.md Section 10

**2026-05-06 — pnpm Compatibility**
- CLI has zero external dependencies — works with npx, pnpm dlx, and yarn dlx
