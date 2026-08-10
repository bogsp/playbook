---
file: '.playbook/kit/05-kanban.md'
responsibility: 'Work state registry for active tickets and blocking relationships.'
ai_instructions: 'Update statuses as tasks progress. Seed tickets from 03-execution.md.'
archive_rule: 'Done tickets no longer referenced move to .playbook/kit/_archives/kanban/'
---

Rules

- Tickets are seeded from Acceptance Criteria in `03-execution.md`
- One outcome per ticket — no bundling
- Priority within each column is top-down (top = next)
- Blocked tickets stay in their column; blocking relationship is explicit
- When a ticket moves to Done, update `04-progress.md`

DDA Ticket Types

- [DDA] — authoring or syncing a DDA document
- [CODE] — implementation against a DDA doc (requires DDA doc to be status: active)
- [SYNC] — drift correction between code and DDA doc

Backlog

[K-12] Populate playbook/ template structure
Type: SYNC
Description: Move and organize the domain-agnostic Playbook templates into the new root playbook/ directory (including docs/, .playbook/kit/, and templates/).
Blocked by: none

[K-13] Update packages/create-playbook/ pathing
Type: CODE
Description: Update the CLI scaffold logic to point to the new playbook/ directory instead of the old locations.
Blocked by: K-12

[K-07] Author .playbook/kit/\_tests/ test file template
Type: DDA
Description: Author the missing test file template for the playbook/ template directory.
Blocked by: none

[K-10] Document \_refs/ subfolder structure in \_index.md
Type: SYNC
Description: Add video-insights/, templates/, examples/, snippets/, and research/ to the folder map.
Blocked by: none

[K-05] Reconcile contract section names
Type: SYNC
Description: Confirm the shipped version of global.md is final before moving it to playbook/docs/contracts/.
Blocked by: human decision

[K-06] Reconcile journey matrix location
Type: SYNC
Description: Decide the canonical location (README.md vs \_index.md) before placing the final template in playbook/.
Blocked by: human decision
Note: Targeted for resolution by K-15 (guide entry point restructure) — see below.

[K-14] Split Context Kit guide into standalone vs. integrated usage
Type: DDA
Description: Rewrite playbook/.playbook/guides/context-kit.md so standalone use (kit files only, no pipeline) and Playbook-integrated use (kit files + full pipeline) are both clearly documented, with a boundary a reader can't miss.
Blocked by: human decision (Q-02 — own guide file vs. section within context-kit.md)

[K-15] Restructure guide entry points for standalone Context Kit path
Type: SYNC
Description: Update playbook/.playbook/guides/\_index.md so standalone Context Kit is its own path, not buried under full-pipeline guides (New Project / Adopt / Audit). Resolves K-06 by giving the journey matrix a home that matches actual reader paths.
Blocked by: K-14

[K-16] Fix terminology drift across pipeline guides
Type: SYNC
Description: Fix "Reverse Engineer" vs. "Audit" naming drift, stray typos, and missing project-identity.md cross-links in guides/new-project.md, guides/adopt.md, guides/audit.md.
Blocked by: none

[K-17] Add standalone Context Kit session-start prompt
Type: DDA
Description: Add a session prompt to playbook/.playbook/kit/00-prompts.md for starting with kit files only (no pipeline files) — companion to the existing "Starting a New Project" / "Picking Up Where You Left Off" prompts.
Blocked by: K-14

[K-18] Confirm template README/AI-INSTRUCTIONS reference standalone path
Type: SYNC
Description: Confirm playbook/.playbook/README.md and playbook/.playbook/AI-INSTRUCTIONS.md reference the standalone Context Kit path without disrupting the existing boot order or Behavioral Rules.
Blocked by: K-14, K-15

In Progress
[K-12] Populate playbook/ template structure

Blocked
(none)

Done
[K-01] Resolve 00-rules.md vs AI-INSTRUCTIONS.md
(Resolved: 00-rules.md deprecated; AI-INSTRUCTIONS.md is the single source of truth)

[K-03] Standardize YAML Frontmatter adoption
(Resolved: Light YAML frontmatter successfully adopted across framework files)

[K-11] Migrate internal Context Kit to .playbook/kit/
(Resolved: All tracking files shifted to root .playbook/kit/)

[K-02] De-duplicate template sources
(Resolved by meta-repo architecture: internal templates live in .playbook/, distributable ones in playbook/)

[K-08] Scope @bogsp/playbook-software-library into the plan
(Resolved by meta-repo architecture: explicitly mapped to packages/)

[K-09] Scope the C11 engine / Rust shell subproject
(Resolved: Legacy C11/Rust subproject explicitly discarded from structure)
