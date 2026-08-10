---
file: '.playbook/kit/03-execution.md'
responsibility: 'Holds ONLY Guidelines, Active Phase Plan, In-Flight Tasks, and Acceptance Criteria.'
ai_instructions: 'Use this as the source of truth for guidelines and task checklists.'
archive_rule: 'Completed tasks move to 04-progress.md and are pruned from here.'
---

Guidelines

Style & Voice:

- Clear, concise, practical — no filler
- Docs skimmable for humans, dense for AI
- Progressive Disclosure + Tiering is the default for all structural decisions

Rules & Constraints:

- Follow all conventions in closed decisions in 02-exploration.md
- Playbook docs use YAML frontmatter + ## What It Does + ## Interface + optional ## Detail
- File and folder naming strictly follows kebab-case conventions
- Code must pass biome check and biome format before commit

Quality Bar:

- Phase not complete until Phase Completion Checklist in .playbook/pipeline.md fully passes
- QA Tier: standard

Plan

Goals:

- Execute the directory restructure to strictly separate the project's Playbook (`.playbook/`) from the template Playbook (`playbook/`).

Outcomes:

- The repository perfectly mirrors the newly defined dichotomy.
- All unresolved blocked tickets (K-01 to K-06) are conclusively answered and closed.
- `create-playbook` CLI successfully points to the new template paths.

Acceptance Criteria:

- [x] Root `.playbook/` contains ONLY the project's own meta-pipeline files.
- [ ] Root `playbook/` contains ONLY the clean, domain-agnostic template source files.
- [ ] `packages/create-playbook/` pathing logic updated to pull from the newly mapped `playbook/` template directory.
- [ ] `docs/code-standards-c.md` and `docs/code-standards-rust.md` are archived or deleted.
- [ ] Sync check confirms no broken references in `_index.md` or `AI-INSTRUCTIONS.md`.

Action

Right Now: Execute `playbook/` template population (K-12).
Tasks:

- [x] Migrate current `.kit/` files to root `.playbook/kit/`.
- [ ] Move template sources into `playbook/` template structure (`playbook/.playbook/kit/` and `playbook/templates/`).
- [ ] Clean up root directory (remove old docs/ and standalone files not in the new structure).

Known Issues

| #   | Issue                                       | Type   | Severity | Blocked By | Resolution                                |
| --- | ------------------------------------------- | ------ | -------- | ---------- | ----------------------------------------- |
| 1   | Nested code blocks break markdown rendering | design | low      | —          | Delivered standard formatting containment |
