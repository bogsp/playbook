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

Locked Track — Clerical / Upkeep (in progress)

Order confirmed 2026-08-13. K-05 and K-37 were resolved out of band
(2026-08-29, pipeline review session) ahead of this track's original
sequencing — both were declared blockers on calling the pipeline
finalized, so they were closed first regardless of track assignment.

1. K-33 — DONE — confirm universal templates/ split, retire templates.md
2. K-36 — DONE — update templates.md cross-references
3. K-39 — DONE — frontmatter sweep, pipeline.md (both copies, confirmed separate legitimate files) + vocabulary README.md files, plus stale templates.md link fix
4. K-05 — DONE — contract section naming finalized (see 04-progress.md 2026-08-29)
5. K-37 — DONE — build.js/scaffold.js updated for split templates/ folders (see 04-progress.md 2026-08-29)
6. K-07 — DONE — test file template already existed (kit/_tests/test-case.md); confirmed and closed
7. K-10 — DONE — _refs/ subfolders documented in playbook/.playbook/_index.md
8. K-18 — DONE — confirmed, no edits needed; both files already correct

Clerical track fully closed as of 2026-08-29.

Backlog

[K-12] Populate playbook/ template structure
Type: SYNC
Description: Move and organize the domain-agnostic Playbook templates into the new root playbook/ directory (including docs/, .playbook/kit/, and templates/).
Blocked by: none

[K-13] Update packages/create-playbook/ pathing
Type: CODE
Description: Update the CLI scaffold logic to point to the new playbook/ directory instead of the old locations.
Blocked by: K-12

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
Amended 2026-08-29: section names within all 8 flow-N contracts plus playbook/docs/contracts/contract.md renamed per K-05's resolution (Normal Flow / Failures / Edge Cases / Ordering / Constraints, replacing the shipped Good-Path-framed names). Content unchanged — headers only.

[K-40] Roll out Frontmatter Tiering Rule to maintenance.md, AI-INSTRUCTIONS.md, and vocabulary AI-INSTRUCTIONS.md
(Resolved 2026-08-12: Canonical "Frontmatter Tiering" section added to playbook/.playbook/maintenance.md, own-terms application section added to root .playbook/maintenance.md, pointer rules added to both AI-INSTRUCTIONS.md files, and all four playbook/.playbook/vocabulary-*/AI-INSTRUCTIONS.md files converted to YAML frontmatter with a domain-scoped pointer added. Spawned K-39 for the remaining Q-03 scope — pipeline.md, README.md, vocabulary README/templates.md files, plus an open question on whether pipeline.md/README.md need their own pointer line.)

[K-41] Log Session End frontmatter-check enforcement as its own ticket
Type: SYNC
(Resolved 2026-08-13, retroactive: the fifth Session End checklist item — confirm every touched file's frontmatter matches its tier before logging progress — was added to both AI-INSTRUCTIONS.md files on 2026-08-12 and logged in 04-progress.md, but never given its own K-ID. Created and closed in the same pass for traceability; no further work required.)

[K-34] Split vocabulary-software/templates.md into per-type files
(Resolved 2026-08-13: Authored playbook/.playbook/vocabulary-software/templates/{_index,structure,sequencer,component}.md. concern/integration confirmed pointer-only to ../../templates/ — no software-specific fields exist for either. Files delivered as downloadable artifacts; not yet committed — see 04-progress.md 2026-08-13 entry.)

[K-38] Scope domain-specific templates for writing/production/manufacturing
(Resolved 2026-08-13, ahead of schedule — was explicitly deferred with no target session. Authored playbook/.playbook/vocabulary-{writing,production,manufacturing}/templates/{_index,coordinator,[type]}.md for all three, following the K-34 split-file pattern. Field structures settled: writing/piece → angle + audience; production/deliverable → deadline + definition-of-done; manufacturing/part → specification + definition-of-done. Files delivered as downloadable artifacts; not yet committed — see 04-progress.md 2026-08-13 entry.)

[K-33] Split playbook/.playbook/templates.md into per-type files
(Resolved 2026-08-13: Confirmed all 5 universal templates/*.md files complete and correctly cross-referenced by all 4 domain templates/_index.md files. templates.md confirmed retired — no longer present, proceeded without a diff per explicit instruction. Authored the missing playbook/.playbook/templates/_index.md, closing an asymmetry flagged mid-ticket — domain templates/ folders each had an index, the universal one didn't. Folded in on request rather than spun into a separate ticket.)

[K-36] Update references to templates.md across shipped docs
(Resolved 2026-08-13: Updated playbook/.playbook/_index.md (Folder Map + How to Use This File table) and playbook/.playbook/README.md (Folder Map) to reference templates/_index.md. Corrected vocabulary-software/AI-INSTRUCTIONS.md's Domain Vocabulary section — the only domain AI-INSTRUCTIONS.md that named templates.md directly; writing/production/manufacturing had no equivalent reference. A stale templates.md link found in pipeline.md's Stage 5 section during this ticket was flagged and folded into K-39's scope instead of fixed here, since it fell outside K-36's agreed file list.)

[K-39] Finish frontmatter sweep — pipeline.md, vocabulary README.md
(Resolved 2026-08-13: Converted playbook/.playbook/pipeline.md, root .playbook/pipeline.md, and all four vocabulary-[domain]/README.md files to Tier 2 four-field frontmatter. Fixed the stale [templates/](templates.md) link (found during K-36) in both pipeline.md copies. Clarified mid-ticket: root .playbook/pipeline.md and playbook/.playbook/pipeline.md are two separate, both-legitimate files — not a K-33-style duplicate; an initial proposal to delete the root copy was corrected by the person. Flagged, not resolved: root pipeline.md's content is currently identical to the template source copy, unlike maintenance.md and AI-INSTRUCTIONS.md which were each authored on their own terms for this repo — noted in the file's responsibility field for a future decision, not rewritten as part of this frontmatter-only ticket.)

[K-05] Reconcile contract section names
(Resolved 2026-08-29, pipeline review session: Both prior candidates rejected — original decision-log names (Happy Path/Failure Modes/Concurrency Rules/Constraints) and shipped names (The Good Path/Ways It Can Fail/Ordering Rules/Hard Constraints) both carried success-framed language or redundant qualifiers. Final naming: Normal Flow, Failures, Edge Cases, Ordering, Constraints — plain, neutral, no assumption the path succeeds. Concurrency folded into Ordering rather than broken out, since most projects have no concurrency concerns and a dedicated section would sit empty by default. Applied to playbook/docs/contracts/contract.md and all 8 docs/contracts/playbook-templates/flow-N-*.md files. See 02-exploration.md 2026-08-29 decision.)

[K-37] Update build.js and scaffold.js for templates/ folder — all four domains
(Resolved 2026-08-29, pipeline review session: Rewrote packages/create-playbook/build.js source list and lib/scaffold.js copy logic to use the split per-type templates/ folders instead of the retired single templates.md per scope. Universal: 6 files (_index, structure, coordinator, component, concern, integration). Software: 4 files (_index, structure, sequencer, component). Writing/production/manufacturing: 3 files each (_index, coordinator, + domain leaf type). Both files now share explicit UNIVERSAL_TEMPLATE_FILES / DOMAIN_TEMPLATE_FILES constants to stay in sync. Scope flagged and expanded during the fix: build.js/scaffold.js were also missing guides/context-kit-standalone.md, guides/project-identity.md, and kit/_tests/test-case.md — none had ever been wired into the CLI despite existing in the repo. Included in this ticket rather than left as a second undetected gap, since K-18 (standalone-path verification) cannot be tested against a real scaffold without it. Flagged to the person per escalation protocol before proceeding.)

[K-07] Author .playbook/kit/_tests/ test file template
(Resolved 2026-08-29, pipeline review session: Found already authored — playbook/.playbook/kit/_tests/test-case.md exists and is complete (frontmatter, Description, Steps, Expected Result, Execution, Notes). The ticket was never marked closed and the file was never wired into the CLI's copy list until K-37 fixed that gap this same session. No new content needed — confirmed and closed.)

[K-10] Document _refs/ subfolder structure in _index.md
(Resolved 2026-08-29, pipeline review session: playbook/.playbook/_index.md's Folder Map expanded _refs/ from a single flat line into its five actual subfolders — video-insights/, templates/, examples/, snippets/, research/ — matching what scaffold.js already creates via gitkeep. This repo's own root .playbook/_index.md was checked and left as-is: its _refs/ holds sync-check reports, a different structure specific to this repo, not the template's five-folder pattern.)

[K-18] Confirm template README/AI-INSTRUCTIONS reference standalone path
(Resolved 2026-08-29, pipeline review session: Confirmed, no edits needed. playbook/.playbook/README.md already has a callout right after "Start Here" pointing to guides/context-kit-standalone.md, placed before Session Boot Order — doesn't disrupt it. playbook/.playbook/AI-INSTRUCTIONS.md's "Load based on the task" table already has the row for standalone kit-only sessions pointing to the same guide, placed after Session Load Order (1-7) — doesn't touch Behavioral Rules 1-19. Both were correct already; the ticket had simply never been verified and closed.)

[K-44] Apply the same _index.md consolidation to this repo's own root .playbook/
Type: DDA
(Resolved 2026-08-29, pipeline review session: root .playbook/_index.md now absorbs README.md's orientation content and AI-INSTRUCTIONS.md's session/behavioral rules, mirroring K-42's template treatment. README.md reduced to a plain human-facing repo readme with a pointer to _index.md. AI-INSTRUCTIONS.md retired — flagged for git rm. maintenance.md's file listing under "Tier 2 applies to every file directly under .playbook/" corrected to drop the now-retired AI-INSTRUCTIONS.md reference. Frontmatter Standard, Behavioral Rules 1-12 (rule 12 added: fold prior In Progress entries — the fix from earlier this session, now made a standing rule rather than a one-off correction), escalation format including the repo-specific template-vs-meta-ambiguity category, Never Do These, Expansions, When Something Breaks, and Session End checklist all carried over from the retired AI-INSTRUCTIONS.md content, adapted for this repo's own structure.)

[K-42] Consolidate README/AI-INSTRUCTIONS/_index.md into a single entry point (template)
Type: DDA
(Resolved 2026-08-29, pipeline review session: playbook/.playbook/_index.md is now the single entry point — absorbed AI-INSTRUCTIONS.md's Session Load Order, Behavioral Rules 1-19, Never Do These, escalation format, Expansions, When Something Breaks, and Session End checklist. playbook/.playbook/README.md reduced to a plain human-facing readme with one pointer line. playbook/.playbook/AI-INSTRUCTIONS.md retired — flagged for deletion (git rm), not generated as a file this session. Same merge applied to all four vocabulary-[domain]/ folders: README.md + AI-INSTRUCTIONS.md -> single vocabulary-[domain]/_index.md each, since none of those folders had their own _index.md before this change. context-kit.md, context-kit-standalone.md, and 00-prompts.md rewritten for single-message session start, with the two-message pattern kept only as an explicit fallback for hard-limited tools. guides/project-identity.md rewritten for the two-file (index+readme) model. guides/adopt.md's stale AI-INSTRUCTIONS.md reference fixed. See 02-exploration.md 2026-08-29 decision for full rationale.)

[K-43] Cross-reference sweep — remaining AI-INSTRUCTIONS.md mentions
Type: SYNC
Description: K-42 rewrote _index.md, README.md, both context-kit guides, 00-prompts.md, project-identity.md, and adopt.md. Not yet checked: playbook/.playbook/pipeline.md, playbook/.playbook/maintenance.md, guides/audit.md, guides/new-project.md, guides/video-insights.md, guides/_index.md, and all four docs/code-standards*.md variants (root and playbook/ copies) — several of the code-standards files explicitly reference "AI-INSTRUCTIONS.md" in their AI-Assisted Development sections and need updating to point at _index.md instead, or need their own review given they're optional add-ons rather than core Playbook files. Also unchecked: whether templates/*.md or vocabulary-*/templates/*.md reference the retired file anywhere.
Blocked by: none

[K-44] Apply the same _index.md consolidation to this repo's own root .playbook/
Type: DDA
Description: Root .playbook/README.md and AI-INSTRUCTIONS.md need the same merge into root .playbook/_index.md, per the person's explicit instruction to avoid confusion in future sessions on this repo. Queued as the next task after K-42/K-43.
Blocked by: none

[K-43] Cross-reference sweep — remaining AI-INSTRUCTIONS.md mentions
(Resolved 2026-08-29, pipeline review session: Checked all files not yet touched by K-42/K-44. Clean, no changes needed: guides/audit.md, guides/new-project.md, guides/video-insights.md, guides/_index.md. Fixed: playbook/.playbook/pipeline.md and root .playbook/pipeline.md (stale "alongside [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md)" link in the Handoff stage's Resuming-from-a-milestone note, now points to _index.md); playbook/.playbook/maintenance.md (Tier 2 file listing under Frontmatter Tiering dropped the AI-INSTRUCTIONS.md reference); docs/code-standards.md and playbook/docs/code-standards.md (Section 6 intro sentence updated to reference _index.md); docs/code-standards-ts.md and playbook/docs/code-standards-ts.md (Section 14 intro sentence and AI Session Boot Order table both updated -- boot order collapsed from a 7-step README/AI-INSTRUCTIONS/_index.md/code-standards/kit sequence to a 5-step _index.md-first sequence, version bumped to 3.2 in the file's own header comment). Not in scope for this ticket and left untouched: code-standards-c.md and code-standards-rust.md (playbook copies only, no AI-INSTRUCTIONS.md references found in either -- these are separately flagged as legacy/should-be-discarded per K-09's C11/Rust decision, an unrelated open item). Template and this repo's own root files are now both fully consistent -- no remaining AI-INSTRUCTIONS.md references anywhere in the repo outside of the retired files themselves, which are flagged for git rm.)

[K-45] Introduce Review Gate as a per-project setting (strict/balanced/lean)
Type: DDA
(Resolved 2026-08-31, pipeline review session: Added `review-gate` frontmatter field + a "Review Gate" section under AI Behavioral Rules to both playbook/.playbook/_index.md (template default: `balanced`) and root .playbook/_index.md (this repo: `strict`). Three levels defined -- strict (approve every step, no exceptions), balanced (halt on new architecture/content/decisions/dependencies/security/deletions; propagation of already-approved decisions and mechanical fixes proceed without a fresh approval), lean (balanced's proceed-list plus batched review for similar items). Ambiguity always halts regardless of level. Updated docs/contracts/global.md (root, playbook-templates track) SS2 to declare this repo's `strict` setting explicitly and point to the general model, rather than asserting an unexplained absolute rule -- flow docs (flow-3/4/5) needed no changes since their existing strict per-step behavior already matches this repo's chosen level. Found and fixed an additional stale AI-INSTRUCTIONS.md reference in global.md SS4 (Escalation Format) while rewriting -- this file was never generated as an artifact during K-43's sweep, so it was missed then. Future hook (asking review-gate level at `create-playbook init`, mirroring the domain question) noted but deferred to a CLI/library session, per standing instruction.)

[K-46] Introduce Pipeline Mode as a per-project setting (kit-only/full)
Type: DDA
(Resolved 2026-08-31, pipeline review session: Added `pipeline-mode` frontmatter field + a "Pipeline Mode" section to both playbook/.playbook/_index.md (default: `kit-only`) and root .playbook/_index.md (this repo: `full`). Added a scoping note above the numbered Rules list identifying which rules (1, 2, 5, 6, 7, 9, 12) apply only in `full` mode. Updated Session Start's "Starting fresh" line to route kit-only projects straight to kit files. Cross-referenced the setting from both context-kit.md and context-kit-standalone.md, so the guides now point back to the declared state instead of being two independent things to remember. This is the "simple entry, complex base" fix for the broader pipeline review's Progressive Disclosure item -- flow.md's own document-level tiering (optional sections gated by scope/trigger) was already correct and needed no change; the gap was entirely at the project level. CLI/scaffold.js changes (asking for pipeline-mode at `create-playbook init`, mirroring domain and the future review-gate question) noted, deferred to a CLI/library session.)

[K-47] Generalize the SAGE- MODULE_ID placeholder across all templates
Type: SYNC
(Resolved 2026-08-31, pipeline review session: All 14 Tier 1 template files carried a MODULE_ID placeholder prefixed SAGE- (SAGE-CORE-, SAGE-COORD-, SAGE-CONCERN-, SAGE-INTEGRATE-, SAGE-PIECE-, SAGE-DELIV-, SAGE-PART-) tracing back to an unrelated project explored in this repo's own early history (2026-05-28 decisions), baked into templates shipped to every new Playbook project regardless of domain. Flagged once as candidate K-04 in the old pre-migration sync-check reference but never turned into a ticket or resolved. Generalized to PLAYBOOK- across all 5 universal templates/*.md files and all 9 domain-specific vocabulary-*/templates/*.md files (software: structure, sequencer, component; writing: coordinator, piece; production: coordinator, deliverable; manufacturing: coordinator, part). No other content changed. The deep-module header field names themselves (MODULE_ID, SYSTEM_CONTEXT, UPSTREAM_DEPENDENCIES, DOWNSTREAM_IMPACT, CORE_SYSTEM_INVARIANTS) were considered but left as-is -- they read as software/systems vocabulary but aren't necessarily wrong for other domains, and there's no practical non-software project experience yet to validate a rename against. Revisit once a real writing/production/manufacturing project has run through Playbook.)

[K-48] Package Playbook as a Claude Skill (packages/playbook-skill)
Type: DDA
(Resolved 2026-08-31, pipeline review session: Created packages/playbook-skill/ -- SKILL.md (trigger conditions, setup questions mirroring create-playbook init, step-by-step scaffold instructions, explicit "never hand-edit assets/" note), build.js (generates assets/ from playbook/.playbook/ + playbook/docs/, same source tree as packages/create-playbook/build.js, sharing the UNIVERSAL_TEMPLATE_FILES/DOMAIN_TEMPLATE_FILES constant pattern so the two build scripts don't silently drift), package.json (@bogsp/playbook-skill), and README.md explaining provenance. Built against the current, already-consolidated source (single vocabulary-[domain]/_index.md per K-42, PLAYBOOK- MODULE_ID per K-47) rather than replicating create-playbook's still-pending build.js/scaffold.js tech debt -- this package has no equivalent debt to inherit since it's new. assets/ folder itself not generated in this session (build.js has not been executed against the real repo tree); SKILL.md instructs Claude to run `pnpm build` before first use. Anthropic's own Skill packaging/installation steps intentionally not documented here -- README points to "Anthropic's current Skill packaging documentation" rather than duplicating platform-specific instructions that may change independently of Playbook.)
