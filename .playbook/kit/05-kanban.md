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

[K-16] Fix terminology drift and standardize frontmatter across pipeline guides
Type: SYNC
Description: Fix "Reverse Engineer" vs. "Audit" naming drift, stray typos, and missing project-identity.md cross-links in guides/new-project.md, guides/adopt.md, guides/audit.md. Also convert all five remaining guides — new-project.md, adopt.md, audit.md, project-identity.md, video-insights.md — from the old `# Title` / `# File:` comment header to the standardized frontmatter block (file / responsibility / ai_instructions / archive_rule), matching context-kit.md, context-kit-standalone.md, and guides/\_index.md.
Blocked by: none

[K-17] Add standalone Context Kit session-start prompt
Type: DDA
Description: Add a session prompt to playbook/.playbook/kit/00-prompts.md for starting with kit files only (no pipeline files) — companion to the existing "Starting a New Project" / "Picking Up Where You Left Off" prompts. Reference context-kit-standalone.md.
Blocked by: none

[K-18] Confirm template README/AI-INSTRUCTIONS reference standalone path
Type: SYNC
Description: Confirm playbook/.playbook/README.md and playbook/.playbook/AI-INSTRUCTIONS.md reference the standalone Context Kit path without disrupting the existing boot order or Behavioral Rules.
Blocked by: none

In Progress
[K-12] Populate playbook/ template structure
[K-16] Fix terminology drift and standardize frontmatter across pipeline guides

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

[K-14] Split Context Kit guide into standalone vs. integrated usage
(Resolved: Authored playbook/.playbook/guides/context-kit-standalone.md — kit files only, no pipeline content. Updated playbook/.playbook/guides/context-kit.md with a cross-link to the standalone guide; pipeline-specific content (stage table, milestone-snapshot fallback) left unchanged there. Resolves Q-02.)

[K-15] Restructure guide entry points for standalone Context Kit path
(Resolved: Added "Which Guide Do I Need?" journey matrix to playbook/.playbook/guides/\_index.md, routing by reader situation. Split the ambiguous "Context kit" row into Standalone / Integrated. Promoted Audit into "Getting Started" and corrected its label to match the actual filename. Resolves K-06. Applied standardized frontmatter to \_index.md — was still using the old `# Title` / `# File:` header, caught during review.)
