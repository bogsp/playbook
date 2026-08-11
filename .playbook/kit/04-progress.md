---
file: '.playbook/kit/04-progress.md'
responsibility: 'Append-only record of Completed items, Settled Decisions, and Fixes.'
ai_instructions: 'Never edit or delete prior entries. Always append to the bottom. Overwrite "In Progress" each session.'
archive_rule: 'Entries older than the current phase move to .playbook/kit/_archives/progress/'
---

2026-08-10

- **Decided**: The Accord work is paused (not closed) to run a full reconciliation of the Playbook pipeline tracking files against actual shipped state.
- **Completed**: Full sync check across `.kit/03-execution.md`, `.kit/02-exploration.md`, `playbook/.playbook/`, `playbook/docs/`, `packages/create-playbook/`, `packages/playbook-software-library/`.
- **Decided**: 3 previously-unchecked acceptance criteria in `.kit/03-execution.md` (`pipeline.md`, sequencer format, `_archives/` conventions) are confirmed complete.
- **Fixed**: `# File:` header paths in `.kit/01-process.md`, `.kit/04-progress.md`, and `.kit/05-kanban.md` corrected to their actual location (`.kit/`).

2026-08-11

- **Decided**: Locked the new meta-repo directory structure. Root `.playbook/` governs the repo; root `playbook/` acts as the template source.
- **Decided**: Discarded legacy C11/Rust engine references (resolves K-09).
- **Completed**: Closed K-01 (deprecated `00-rules.md` in favor of `AI-INSTRUCTIONS.md`) and K-03 (locked YAML frontmatter adoption and agreed to add frontmatter rules to code standards).
- **Completed**: Closed K-11 (migrated internal Context Kit to `.playbook/kit/`).
- **Decided**: Scoped the guides modernization work — five tickets (K-14–K-18) to bring `playbook/.playbook/guides/*.md` in line with the current pipeline, with the Context Kit split into standalone and Playbook-integrated documentation as the centerpiece.
- **Completed**: Logged open question Q-02 (standalone Context Kit — own guide file vs. section in `context-kit.md`) in `02-exploration.md`, gating K-14.
- **Completed**: Seeded K-14 through K-18 in `05-kanban.md` Backlog, with K-15 marked as the resolution path for K-06.
- **Decided**: Resolved Q-02 — standalone Context Kit gets its own guide file, `guides/context-kit-standalone.md`, reaffirming the 2026-05-28 decision.
- **Completed**: Closed K-14. Authored `playbook/.playbook/guides/context-kit-standalone.md` (kit files, session rhythm, two-message pattern, expansions, drift recovery — no pipeline content). Updated `playbook/.playbook/guides/context-kit.md` with a cross-link to the standalone guide, pipeline-specific sections unchanged.
- **Completed**: Closed K-15. Added a "Which Guide Do I Need?" journey matrix to `guides/_index.md`, routing readers by situation rather than pipeline stage; resolves K-06. Caught and fixed a missing standardized frontmatter block on `_index.md` during review.
- **Decided**: Expanded K-16's scope to also standardize frontmatter (old `# Title` / `# File:` header → `file` / `responsibility` / `ai_instructions` / `archive_rule` block) across all five remaining guides — `new-project.md`, `adopt.md`, `audit.md`, `project-identity.md`, `video-insights.md` — not just the three originally listed for terminology fixes.
- **In Progress**: Executing K-12 (populate `playbook/` template structure) and K-16 (terminology drift + frontmatter standardization across the five remaining guides).
