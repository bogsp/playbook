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
- **Decided**: Resolved Q-02 — standalone Context Kit gets its own guide file, `guides/context-kit-standalone.md`.
- **Completed**: Closed K-14. Authored `playbook/.playbook/guides/context-kit-standalone.md`; cross-linked from `context-kit.md`.
- **Completed**: Closed K-15. Added journey matrix to `guides/_index.md`; resolves K-06.
- **Completed**: Closed K-16. Fixed broken `reverse-engineer.md` → `audit.md` links, added missing `project-identity.md` cross-links, standardized frontmatter across five guides.
- **Fixed**: `video-insights.md`'s "Output Format" template still used the old header after K-16 closed — converted to standardized frontmatter.
- **Decided**: Logged Q-03 in `02-exploration.md` — deferred frontmatter sweep for files outside `guides/` (flow/contract templates, `templates.md` + HCH block, `pipeline.md`, `README.md`, all four `vocabulary-*/` files). No dedicated ticket; fix opportunistically when next touched.
- **Completed**: Closed K-17. Added "Starting or Resuming — Context Kit Standalone" as the first prompt in `kit/00-prompts.md`, cross-linked to `context-kit-standalone.md`.
- **Fixed**: A stray broken placeholder in `00-prompts.md`'s existing Video Insights prompt (`Source:` line referenced a dictionary URL instead of `[URL or description]`) — found and corrected while adding the standalone prompt.
- **In Progress**: Executing K-12 (populate `playbook/` template structure) and K-18 (confirm `playbook/.playbook/README.md` and `AI-INSTRUCTIONS.md` reference the standalone path).
