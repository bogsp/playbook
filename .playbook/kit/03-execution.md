---
file: '.playbook/kit/03-execution.md'
responsibility: 'The current phase: goal, checklist and known issues.'
ai_instructions: 'Tick tasks as they finish. Hold the current phase only; a finished phase moves to _archives/execution/. A task has detail here or in 05-kanban, never both.'
archive_rule: 'Finished phases move to _archives/execution/ once logged in 04-progress.'
owner: project
max-bytes: 4096
max-lines: 45
line-max: 200
entry-shape: '- [ ] T-nn <=120 chars -> K-nn or doc'
---

# Execution

Archived: _archives/execution/restructure-phase.md (the directory-restructure phase: guidelines, plan, acceptance criteria)
Phase: Pipeline rewrite. Fix the pipeline, then templates, then the shared core.
Goal: Playbook runs lean in any domain and any AI tool; this repo adopts it last.
Done when: templates and structure complete (T-05 to T-09), no scripts; then code phase (T-10), then this repo adopts it (T-11).
Later: code phase: checker, generator, shared core (K-56), no-terminal scaffolder (K-55), platform prep

## Checklist

- [x] T-01 R1-R6: guides dissolved, rules.md, two READMEs, versioning -> _archives/progress/2026-10.md
- [x] T-02 K1-K2: Kit Charter, lean kit templates, adopt.md and audit.md split -> _refs/design/kit-charter.md
- [x] T-03 K3: migrate this repo's kit: 04, 05, 02 done -> 04-progress
- [x] T-04 K3: migrate this repo's kit to the lean shape (all six files) -> 04-progress
- [ ] T-05 Audit pass: fold decision-record template into _refs/decisions -> K-57
- [x] T-06 Large-project partitioning: designed, tested on the four examples, approved -> D-20
- [ ] T-07 Card schema (status retired), hand-kept registry and routes; rules C11 and D3; update planning-doc and domain templates -> D-12, D-20
- [ ] T-08 Review domain packs (writing for books); decide Q-05; replace Frontmatter Tiering in maintenance.md
- [ ] T-09 Freeze the templates at 2.0.0: changelog, rebuild, scaffold test
- [ ] T-10 Code phase: budget checker, registry generator, shared core, no-terminal scaffolder -> K-56, K-55, D-19
- [ ] T-11 Adopt the new pipeline in this repo's own .playbook/ -> D-14
- [ ] T-12 Close old-restructure leftovers: root playbook/ clean, code-standards-c/rust archived, _index.md references checked -> _archives/execution/restructure-phase.md

## Known Issues

I-01 | Nested code blocks break markdown rendering | design | low | none | standard formatting containment delivered
