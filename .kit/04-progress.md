# PROGRESS LOG (APPEND-ONLY)
# File: .kit/04-progress.md

Rules:
- Entries are never edited or deleted.
- New updates are always added at the bottom.
- Each entry is identified as Completed, Decided, or Fixed. NOT grouped.
- Add timestamp per session ## YYYY-MM-DD and follow the line item format.
- In Progress is ALWAYS the last entry, overwritten each session.

---

## 2026-05-06
- **Decided:** Named and defined Document-Driven Architecture (DDA) — component-first, narrative-rich, relationship-aware, AI-optimized
- **Decided:** Document format — YAML frontmatter + one-paragraph narrative + optional Detail section, single file per component
- **Decided:** Five document types — component, orchestrator, structure, concern, integration
- **Decided:** Universal fields for all types — id, type, status
- **Decided:** Folder structure — .context/ at repo root with _concerns/, _integrations/, _shared/ reserved folders
- **Decided:** Naming conventions — kebab-case files and folders, _index.md for structure docs, PascalCase events
- **Decided:** Full pipeline — Context Kit -> PRD/Specs -> DDA -> Code -> Rollout Docs
- **Decided:** DDA vs standard docs boundaries — PRDs upstream, rollout docs downstream generated outputs
- **Decided:** AI boot sequence — 00-playbook.md -> code-standards.md -> _index.md -> module docs -> component docs
- **Decided:** Code before doc rule — Playbook doc always exists before any code is written
- **Decided:** Three generation modes — bootstrap, authoring, sync
- **Decided:** Drift prevention strategy — active flagging, pre-PR sync, milestone audits
- **Decided:** Reusability rules — _shared/ for cross-module components, concerns and integrations never duplicated
- **Decided:** DDA as wiki source — all generated docs compiled from .playbook/, never edited directly
- **Completed:** Authored 00-dda.md (now 00-playbook.md)
- **Completed:** Authored dda-guide.md (now playbook-guide.md)
- **Completed:** Built create-dda CLI (now create-playbook)
- **Fixed:** Nested code block rendering — all such files delivered as downloadable artifacts
- **Fixed:** code-standards.md encoding — UTF-8 BOM removed, arrows and dashes restored
- **Completed:** code-standards.md updated — Section 9 references Playbook, Section 10 Error Mitigation added

## 2026-05-07
- **Decided:** Pipeline named Playbook — natural developer vocabulary, not forced
- **Decided:** Folder renamed .playbook/ — replaces .context/ and .spec/
- **Decided:** Pipeline starter is PLAYBOOK.md at repo root
- **Decided:** AI boot file is .playbook/00-playbook.md
- **Decided:** Living folder tree — every _index.md has a Structure section with linked annotated entries
- **Decided:** Orchestrator flow — annotated numbered list in body + Mermaid diagram in Detail
- **Decided:** Existing project adoption is additive — structured audit, nothing breaks
- **Decided:** Two adoption paths — with Context Kit and without Context Kit
- **Decided:** Rollout doc serves dual purpose — human-facing support doc and AI context dump
- **Decided:** pnpm dlx, npx, and yarn dlx all work — CLI has zero external dependencies
- **Completed:** Generated complete Playbook template zip — all files
- **Completed:** Authored guides/new-project.md
- **Completed:** Authored guides/adopt-with-kit.md
- **Completed:** Authored guides/adopt-without-kit.md
- **Completed:** Updated 00-summary.md to cover full Playbook system
- **Completed:** Updated all six kit templates with Playbook references, phase checklist, error mitigation
- **Completed:** Built create-playbook CLI — renamed, all templates updated, living tree and flow included
- **Completed:** Authored playbook-guide.md — full pipeline including adoption and quick reference
- **Completed:** All Playbook deliverables generated — project complete

## 2026-05-23
- **Decided:** Progressive Disclosure + Tiering named as core principle — default method for all structural decisions
- **Decided:** Playbook is a dev-dependency — present during development, invisible in production
- **Decided:** Playbook file structure and boundaries locked — .playbook/ and .kit/ are Playbook's world
- **Decided:** File renaming — PLAYBOOK.md and 00-summary.md retired, playbook-guide.md → pipeline.md, 00-playbook.md → 00-rules.md
- **Decided:** File responsibility boundaries defined for all Playbook and .kit/ files — single responsibility, no overlap
- **Decided:** Journey matrix defined — eight distinct reader journeys, lives in .playbook/README.md
- **Decided:** .guides/ moves inside .playbook/ as .playbook/.guides/
- **Decided:** docs/flows/ and docs/contracts/ belong to the project — useful to anyone regardless of Playbook
- **Decided:** .kit/ stays at root — planning and ideation layer, drives the pipeline, not subordinate to it
- **Decided:** Flow taxonomy defined — scope types (Journey, Sequence, Operation, Composite, Compensation) and trigger types (Request-Response, Event-Driven, Background/Scheduled, Reactive, Webhook, Stream)
- **Decided:** Flow relationships declared in frontmatter — triggers, calls, emits, called-by
- **Decided:** Flow document format defined — progressive disclosure, tiered required sections by scope and trigger
- **Decided:** ## Walkthrough as single section for narrative + technical call chain, separated by divider
- **Decided:** Contract required sections defined — forced comprehensive coverage with N/A and TODO discipline
- **Decided:** TODO blocks status: active on any contract or flow file
- **Decided:** Contracts own all behavior — component docs point, never contain behavior definitions
- **Decided:** Component doc format updated — new frontmatter order, file/export fields, ## What It Does, ## Interface
- **Decided:** Interface section cites source contract — not standalone, always references contract file and section
- **Decided:** Sequencer flow section upgraded — full call chain with all branches, actual method calls with types
- **Decided:** .kit/01-process.md stripped to session spark — Phase, Last Completed, Next, Active Modules only
- **Decided:** .kit/02-exploration.md — Ref: and Flow: fields added for supporting material and flow references
- **Decided:** .kit/03-execution.md — Known Issues formalized with Type, Severity, Blocked By fields
- **Decided:** External dependency philosophy declared as constraint in 03-execution.md guidelines
- **Decided:** .kit/04-progress.md — three entry types only: Completed, Decided, Fixed
- **Decided:** Kanban ticket type tiering — core, pipeline, and project tiers
- **Decided:** QA tiering — core, standard, full tiers declared in 03-execution.md
- **Decided:** Each QA test case is a separate file in .kit/_tests/
- **Decided:** 06-qa.md is registry and sign-off only — points to _tests/ files
- **Decided:** Failures Log requires Ref and Mitigation fields — neither optional
- **Decided:** QA sign-off requires all Acceptance Criteria verified with QA-ID, explicit exceptions, consequences declared
- **Decided:** .kit/_refs/ folder defined — supporting material for exploration, organized by type
- **Decided:** .kit/_tests/ folder defined — one file per QA test case
- **Decided:** .kit/_archives/ folder defined — exploration/, progress/, kanban/ sub-folders
- **Decided:** Archive rules defined — nothing deleted, moved not removed, every archive file gets a header
- **Decided:** SESSION-SUMMARY.md deprecated — 01-process.md + 04-progress.md now perform the session handoff
- **Completed:** All .kit/ file responsibilities defined and locked
- **Completed:** .kit/ folder structure defined and locked
- **In Progress:** Drafting updated Playbook pipeline files — .playbook/README.md next

## 2026-05-23 (continued)
- **Decided:** Reverse Engineer is a first-class expansion -- plugs in before Context Kit for existing projects
- **Decided:** Expansions are optional pipeline stages that extend Playbook without changing core pipeline
- **Decided:** Active Expansions field added to 01-process.md -- simple list, expands to phase tracking when needed
- **Decided:** RE expansion has six phases -- inventory, audit, classify, risk-map, gap-report, handoff
- **Decided:** RE expansion produces three documents in docs/rewrite/ -- system-map, decision-record, risk-register
- **Decided:** Classification system locked -- Keep, Align, Extract, Rewrite, Replace, Discard, Defer, Evaluate
- **Decided:** Classification system flagged for potential reopening in future
- **Decided:** Adoption guides consolidated into single adopt.md with decision-tree routing
- **Decided:** adopt-with-kit.md, adopt-without-kit.md, legacy-code.md retired -- absorbed into adopt.md
- **Decided:** Adoption routing is diagnostic-driven -- four questions, not tiered categories
- **Decided:** RE expansion phases require human review before advancing -- no autonomous phase advancement
- **Decided:** Video Insights expansion acknowledged as future expansion -- Coming soon
- **Completed:** Updated .playbook/README.md with expansions section
- **Completed:** Updated .playbook/pipeline.md with Stage 0 and expansions
- **Completed:** Updated .playbook/00-rules.md with expansion rules and RE document formats
- **Completed:** Generated .playbook/.guides/adopt.md -- decision-tree adoption guide
- **Completed:** Generated .playbook/.guides/expansions/reverse-engineer.md -- full expansion guide
- **Completed:** Generated docs/rewrite/system-map.md template
- **Completed:** Generated docs/rewrite/decision-record.md template
- **Completed:** Generated docs/rewrite/risk-register.md template
- **Completed:** Updated .kit/01-process.md template with Active Expansions field
- **Completed:** Updated .kit/00-prompts.md with RE expansion prompts
- **Completed:** Generated Raket.PH platform analysis document for team sharing
- **In Progress:** Update create-playbook CLI to reflect new structure
