---
file: '.playbook/kit/04-progress.md'
responsibility: 'Append-only record of Completed items, Settled Decisions, and Fixes.'
ai_instructions: 'Never edit or delete prior entries. Always append to the bottom. Overwrite "In Progress" each session.'
archive_rule: 'Entries older than the current phase move to .playbook/kit/_archives/progress/'
---

## 2026-05-06

- **Decided:** Named and defined Document-Driven Architecture (DDA) — component-first, narrative-rich, relationship-aware, AI-optimized
- **Decided:** Document format — YAML frontmatter + one-paragraph narrative + optional Detail section, single file per component
- **Decided:** Five document types — component, orchestrator, structure, concern, integration
- **Decided:** Folder structure — `.playbook/` at repo root with `_concerns/`, `_integrations/`, `_shared/` reserved folders
- **Decided:** Universal fields for all types — id, type, status
- **Decided:** Naming conventions — kebab-case files and folders, `_index.md` for structure docs, PascalCase events
- **Decided:** Full pipeline — Context Kit -> PRD/Specs -> DDA -> Code -> Rollout Docs
- **Decided:** AI boot sequence — `AI-INSTRUCTIONS.md` -> `code-standards.md` -> `_index.md` -> module docs -> component docs
- **Decided:** Code before doc rule — Playbook doc always exists before any code is written
- **Decided:** Drift prevention strategy — active flagging, pre-PR sync, milestone audits
- **Completed:** Authored `AI-INSTRUCTIONS.md` and `pipeline.md`
- **Completed:** Built create-playbook CLI
- **Fixed:** Nested code block rendering — all such files delivered as downloadable artifacts
- **Fixed:** `code-standards.md` encoding — UTF-8 BOM removed, arrows and dashes restored

## 2026-05-07

- **Decided:** Pipeline named Playbook — natural developer vocabulary, not forced
- **Decided:** Living folder tree — every `_index.md` has a Structure section with linked annotated entries
- **Decided:** Existing project adoption is additive — structured audit, nothing breaks
- **Decided:** Rollout doc serves dual purpose — human-facing support doc and AI context dump
- **Completed:** Generated complete Playbook template zip — all files
- **Completed:** Authored `guides/new-project.md`, `guides/adopt-with-kit.md`, and `guides/adopt-without-kit.md`
- **Completed:** Updated all six kit templates with Playbook references, phase checklist, error mitigation

## 2026-05-23

- **Decided:** Progressive Disclosure + Tiering named as core principle — default method for all structural decisions
- **Decided:** Playbook file structure and boundaries locked — `.playbook/` and `.playbook/kit/` are Playbook's world
- **Decided:** File renaming — `PLAYBOOK.md` and `00-summary.md` retired, `playbook-guide.md` → `pipeline.md`, `00-playbook.md` → `AI-INSTRUCTIONS.md`
- **Decided:** Journey matrix defined — eight distinct reader journeys, lives in `.playbook/README.md`
- **Decided:** Flow taxonomy defined — scope types and trigger types matrix established
- **Decided:** Contract required sections defined — forced comprehensive coverage with N/A and TODO discipline
- **Decided:** Component doc format updated — new frontmatter order, file/export fields, ## What It Does, ## Interface
- **Decided:** `.playbook/kit/01-process.md` stripped to session spark — Phase, Last Completed, Next, Active Modules only
- **Decided:** Kanban ticket type tiering — core, pipeline, and project tiers
- **Decided:** QA tiering — core, standard, full tiers declared in 03-execution.md
- **Decided:** `.playbook/kit/_refs/`, `_tests/`, and `_archives/` folders defined with strict archive rules
- **Decided:** SESSION-SUMMARY.md deprecated — `01-process.md` + `04-progress.md` now perform the session handoff
- **Decided:** Reverse Engineer is a first-class expansion — plugs in before Context Kit for existing projects
- **Decided:** Adoption routing is diagnostic-driven — four questions, not tiered categories
- **Completed:** Updated `.playbook/README.md`, `.playbook/pipeline.md`, and `.playbook/AI-INSTRUCTIONS.md`
- **Completed:** Generated `.playbook/.guides/adopt.md` and `.playbook/.guides/expansions/reverse-engineer.md`
- **Completed:** Built create-playbook CLI v2.0 — zero dependencies, verified scaffold (44 files)
- **Completed:** `create-playbook` v1.0.0 published to npm as public package

## 2026-05-28

- **Decided:** Universal architecture principles over Clean Architecture deferred — adding more structure is the wrong direction right now
- **Decided:** Core friction identified — Playbook asks for investment before returning any value
- **Decided:** Context Kit is the correct standalone entry point — delivers value in session one, no vocabulary to learn first
- **Decided:** Target user is non-technical — someone who uses ChatGPT, Claude, or Gemini for some semblance of work
- **Decided:** The product is the clarity they got, not the system they used — Context Kit is invisible scaffolding
- **Decided:** Next build is the front door — one prompt, starts with their idea, structure happens underneath

## 2026-08-10

- **Completed:** Full sync check across `.playbook/kit/03-execution.md`, `.playbook/kit/02-exploration.md`, `playbook/.playbook/`, `playbook/docs/`, and `packages/create-playbook/`. Findings logged.
- **Decided:** 3 previously-unchecked acceptance criteria in `.playbook/kit/03-execution.md` are confirmed complete.
- **Fixed:** `# File:` header paths in `01-process.md`, `04-progress.md`, and `05-kanban.md` corrected to their actual location (`.playbook/kit/`).
- **Decided:** Flagged core architecture-level discrepancies require human decision before closing out execution checklists (logged as K-01 through K-06).
