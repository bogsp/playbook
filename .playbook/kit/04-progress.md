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
- **Decided**: Adopted the three-track expansion plan (Tracks A/B/C — create-playbook CLI, playbook-software-library, playbook-templates) with tickets K-19 through K-31, worked track by track, each ending in its own sync check.
- **Completed**: Drafted K-19 — CLI flows for `create-playbook` (`flow-1-init`, `flow-2-sync`, `flow-3-generate` + index) under `docs/flows/create-playbook/`. Left unconfirmed and paused — work redirected to Track C per updated priority (active use in other projects).
- **Completed**: K-27 (Templates track flows), scope expanded beyond original ticket text. Authored `docs/flows/playbook-templates/` — `flow-1-edit-template-source` and `flow-2-build-and-publish` (internal build mechanics), then `flow-3-new-project`, `flow-4-adopt-existing-project`, `flow-5-audit-existing-project`, `flow-6-resume-session`, `flow-7-milestone-handoff-and-resume` (pipeline user journeys), plus a rewritten `_index.md` with a Groups split and full dependency map. Logged as a decision in `02-exploration.md`.
- **Completed**: Standardized frontmatter on the shipped templates `playbook/docs/flows/flow.md`, `playbook/docs/contracts/contract.md`, and `playbook/docs/contracts/global.md` — converts to the four-field standard with tracking fields folded in. Fixed an adjacent bug: these templates hardcoded `Type: software`, now generic domain placeholders.
- **Decided**: Logged Q-04 in `02-exploration.md` — root-level `docs/flows/flow.md`, `docs/contracts/contract.md`, `docs/contracts/global.md` are stale duplicates of the canonical `playbook/docs/` source (one, `global.md`, holds unrelated filled content) and were left untouched pending a decision on whether to update, retire, or document them.
- **Decided**: Resolved Q-04. Deleted root `docs/flows/flow.md` and `docs/contracts/contract.md` — unedited duplicates of the `playbook/docs/` canonical source, nothing lost. Retained root `docs/contracts/global.md` — root `docs/` legitimately holds this repo's own tracked flows (`create-playbook`, `playbook-templates` tracks), so a root global contract has a real purpose; it stays as a placeholder to be overwritten with this repo's own cross-track rules once contract-writing work (K-28+) reaches it, rather than being deleted.
- **Completed**: K-28 — drafted and approved `docs/contracts/playbook-templates/global.md`, the cross-cutting contract governing all eight flows in the track (`flow-0-audit-existing-project` through `flow-7-handoff-and-resume`). Fills the placeholder role assigned to root `docs/contracts/global.md` in the Q-04 resolution above.
- **Completed**: K-28 — drafted and approved `docs/contracts/playbook-templates/flow-5-planning-stage.md`, the companion contract to `docs/flows/playbook-templates/flow-5-planning-stage.md`.
- **In Progress**: Continuing K-28 — 2 of 8 contracts done (global.md, flow-5). Remaining: flow-0, flow-1, flow-2, flow-3, flow-4, flow-6, flow-7 per-flow contracts. K-12 and K-18 (populate `playbook/` template structure; confirm template README/AI-INSTRUCTIONS reference standalone path) remain open from prior sessions, not yet resumed.
