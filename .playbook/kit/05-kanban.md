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

[K-39] Finish frontmatter sweep — pipeline.md, README.md, vocabulary README/templates
Type: SYNC
Description: Remaining Q-03 scope after this session's AI-INSTRUCTIONS.md rollout: playbook/.playbook/pipeline.md, playbook/.playbook/README.md, and all four vocabulary-[domain]/README.md + templates.md files still carry the old # Title/# File: comment header instead of the four-field YAML block. Convert to Tier 2 frontmatter. Open question to resolve first: does pipeline.md and/or README.md also need a "Frontmatter Tiering" pointer line (per the instruction that any reference to structure/formatting adherence should be clear wherever a reader would look — AI-INSTRUCTIONS, pipeline, or README), or is the pointer sufficient in AI-INSTRUCTIONS.md alone since that's the file every session actually loads for behavioral rules?
Blocked by: none

[K-33] Split playbook/.playbook/templates.md into per-type files
Type: DDA
Description: Generate playbook/.playbook/templates/{structure,coordinator,component,concern,integration}.md using the Frontmatter Tiering Rule (Tier 1: deep-module header + four-field purpose block + type fields) and 4-backtick outer / 3-backtick inner code fencing. Retire templates.md once all five are approved.
Blocked by: none

[K-34] Split vocabulary-software/templates.md into per-type files
Type: DDA
Description: Generate playbook/.playbook/vocabulary-software/templates/{structure,sequencer,component}.md with the same tiered frontmatter and fencing rules. concern/integration stay pointer-only per the current vocabulary file — no split needed for those two.
Blocked by: K-33

[K-35] Delete stray root template duplicates
Type: SYNC
Description: Remove root .playbook/templates.md and .playbook/templates/*.md — duplicates that don't belong in this repo's own planning-only .playbook/ per _index.md. User-owned action, confirmed in session.
Blocked by: none

[K-36] Update references to templates.md across shipped docs
Type: SYNC
Description: Update playbook/.playbook/_index.md (Folder Map + How to Use This File table), playbook/.playbook/README.md (Folder Map), and each vocabulary-[domain]/templates.md's "read templates.md first" pointer to reference the templates/ folder instead.
Blocked by: K-33, K-34

[K-37] Update build.js and scaffold.js for templates/ folder
Type: CODE
Description: packages/create-playbook/build.js must copy all split files (5 universal + 3 software) instead of a single templates.md; lib/scaffold.js must copy the templates/ folder into every scaffolded project instead of a single file.
Blocked by: K-33, K-34

[K-38] Scope domain-specific templates for writing/production/manufacturing
Type: DDA
Description: Deferred. Same split-file treatment will eventually apply to vocabulary-writing/production/manufacturing templates.md, but their per-type field structures haven't been discussed yet. Revisit in a dedicated future session — not scheduled.
Blocked by: none (explicitly deferred)

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

[K-18] Confirm template README/AI-INSTRUCTIONS reference standalone path
Type: SYNC
Description: Confirm playbook/.playbook/README.md and playbook/.playbook/AI-INSTRUCTIONS.md reference the standalone Context Kit path without disrupting the existing boot order or Behavioral Rules.
Blocked by: none

[K-19] Map CLI flows — create-playbook
Type: DDA
Description: docs/flows/create-playbook/{_index,flow-1-init,flow-2-sync,flow-3-generate}.md. Draft content exists but is unconfirmed — paused in favor of Track C. Resume and confirm before starting K-20.
Blocked by: none (deprioritized, not blocked)

[K-20] Write docs/contracts/create-playbook/
Type: DDA
Description: global.md + per-flow contracts for the CLI track.
Blocked by: K-19 (must be confirmed first)

[K-21] Author .playbook/packages/create-playbook/ planning docs
Type: DDA
Description: _index.md + layer-folder planning docs (interface: index.js, prompt.js; application: scaffold.js, generate.js sequencers; infrastructure: install.js).
Blocked by: K-20

[K-22] CLI track sync check
Type: SYNC
Description: Confirm shipped code matches K-19–K-21; log drift, don't silently rewrite code to fit.
Blocked by: K-21

[K-23] Map library flows — playbook-software-library
Type: DDA
Description: docs/flows/playbook-software-library/{_index,flow-1-contribute-doc,flow-2-consume-in-project}.md.
Blocked by: none

[K-24] Write docs/contracts/playbook-software-library/
Type: DDA
Description: global.md + per-flow, cross-referencing CONTRIBUTING.md rather than duplicating it.
Blocked by: K-23

[K-25] Author .playbook/packages/playbook-software-library/ planning docs
Type: DDA
Description: _index.md + flat planning docs (no layer folders — reference content, not layered code).
Blocked by: K-24

[K-26] Library track sync check
Type: SYNC
Description: Confirm CONTRIBUTING.md, CHANGELOG.md, and shipped _concerns/_integrations/_solutions match K-23–K-25.
Blocked by: K-25

[K-29] Author .playbook/playbook-templates/ planning docs
Type: DDA
Description: _index.md + flat planning docs. Resolve the build.js ownership question here — CLI-layer location vs. Templates-track responsibility.
Blocked by: none — K-28 complete

[K-30] Templates track sync check
Type: SYNC
Description: Confirm shipped playbook/ content matches K-27–K-29.
Blocked by: K-29

[K-31] Final cross-track sync check
Type: SYNC
Description: Update .playbook/_index.md Structure section and Folder Map to reflect all three new doc trees.
Blocked by: K-22, K-26, K-30

[K-32] Update docs/flows/playbook-templates/_index.md and docs/contracts/_index.md
Type: SYNC
Description: Add flow-6-work-stage, flow-7-handoff-and-resume, and all seven new per-flow contracts (flow-1 through flow-7) to their respective index/dependency-map tables. Requires reading the current live _index.md files, which were not present in session context when K-28 closed.
Blocked by: none

In Progress
[K-12] Populate playbook/ template structure
[K-18] Confirm template README/AI-INSTRUCTIONS reference standalone path

Blocked
(none)

Done
[K-01] Resolve 00-rules.md vs AI-INSTRUCTIONS.md
(Resolved: 00-rules.md deprecated; AI-INSTRUCTIONS.md is the single source of truth)

[K-03] Standardize YAML Frontmatter adoption
(Resolved: Light YAML frontmatter successfully adopted across framework files)
Fixed 2026-08-12: Frontmatter Tiering Rule (the mechanism this ticket's frontmatter adoption needed but never got) established and rolled out to maintenance.md (both copies), both AI-INSTRUCTIONS.md files, and all four vocabulary-*/AI-INSTRUCTIONS.md files. See K-39 for the files still outstanding.

[K-11] Migrate internal Context Kit to .playbook/kit/
(Resolved: All tracking files shifted to root .playbook/kit/)

[K-02] De-duplicate template sources
(Resolved by meta-repo architecture: internal templates live in .playbook/, distributable ones in playbook/.playbook/)
Fixed 2026-08-12: Resolution note was incomplete. Stray copies of templates.md and a templates/ folder existed in this repo's own root .playbook/, which per _index.md should hold only kit files and the project map — duplicating playbook/.playbook/templates.md. See K-33–K-37 for the corrected fix.

[K-08] Scope @bogsp/playbook-software-library into the plan
(Resolved by meta-repo architecture: explicitly mapped to packages/)

[K-09] Scope the C11 engine / Rust shell subproject
(Resolved: Legacy C11/Rust subproject explicitly discarded from structure)

[K-14] Split Context Kit guide into standalone vs. integrated usage
(Resolved: Authored playbook/.playbook/guides/context-kit-standalone.md. Updated context-kit.md with a cross-link. Resolves Q-02.)

[K-15] Restructure guide entry points for standalone Context Kit path
(Resolved: Added "Which Guide Do I Need?" journey matrix to guides/\_index.md. Resolves K-06.)

[K-16] Fix terminology drift and standardize frontmatter across pipeline guides
(Resolved: Fixed broken reverse-engineer.md → audit.md links in adopt.md. Added missing project-identity.md cross-links. Converted five guides to standardized frontmatter. Follow-up fix: video-insights.md's embedded output template also converted.)

[K-17] Add standalone Context Kit session-start prompt
(Resolved: Added "Starting or Resuming — Context Kit Standalone" as the first prompt in kit/00-prompts.md, cross-linked to context-kit-standalone.md. Fixed a stray broken placeholder in the existing Video Insights prompt's Source: line, found while editing nearby.)

[K-27] Map template flows — playbook-templates
(Resolved, scope expanded twice beyond original ticket text: authored docs/flows/playbook-templates/ with seven flows — flow-1-edit-template-source and flow-2-build-and-publish for internal build mechanics, plus flow-3-new-project, flow-4-adopt-existing-project, flow-5-audit-existing-project, flow-6-resume-session, flow-7-milestone-handoff-and-resume for pipeline user journeys. _index.md rewritten with a Groups split and full dependency map. Also standardized frontmatter on playbook/docs/flows/flow.md, playbook/docs/contracts/contract.md, and playbook/docs/contracts/global.md as part of the same pass, fixing a hardcoded Type: software bug in those templates. See 02-exploration.md 2026-08-11 decisions and Q-04. Amended again to add the pipeline-stage-numbered flow-6-work-stage.md and flow-7-handoff-and-resume.md needed to companion K-28's contracts — the pipeline-stage flow set (flow-0 through flow-7, matching Audit/Thinking/Discovery/Mapping/Rules/Planning/Work/Handoff) is distinct from the mechanics/journey flow set named above and both currently coexist under docs/flows/playbook-templates/; K-32 should confirm _index.md reflects both sets correctly rather than treating this as a naming conflict to resolve silently.)

[K-28] Write docs/contracts/playbook-templates/
(Resolved: Authored docs/contracts/playbook-templates/flow-1 through flow-7, plus updated docs/contracts/global.md (the playbook-templates track's global contract, retained at root docs/contracts/global.md per the Q-04 decision) with two new sections — §9 Plan-Before-Divergence, §10 No Invented Content. All 8 contracts complete: global.md, flow-0 (already existed from an earlier session), flow-1 through flow-7. Byproduct: authored the two flow documents that were missing despite being listed in global.md's governs field — flow-6-work-stage.md and flow-7-handoff-and-resume.md — logged as an amendment to K-27 above.)

[K-40] Roll out Frontmatter Tiering Rule to maintenance.md, AI-INSTRUCTIONS.md, and vocabulary AI-INSTRUCTIONS.md
(Resolved 2026-08-12: Canonical "Frontmatter Tiering" section added to playbook/.playbook/maintenance.md, own-terms application section added to root .playbook/maintenance.md, pointer rules added to both AI-INSTRUCTIONS.md files, and all four playbook/.playbook/vocabulary-*/AI-INSTRUCTIONS.md files converted to YAML frontmatter with a domain-scoped pointer added. Spawned K-39 for the remaining Q-03 scope — pipeline.md, README.md, vocabulary README/templates.md files, plus an open question on whether pipeline.md/README.md need their own pointer line.)
