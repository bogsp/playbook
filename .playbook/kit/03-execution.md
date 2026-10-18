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
Done when: R1-R6, K2-K5 and slice 1 installed; K-54 designed; this repo migrated; all 12 scaffolds pass.
Later: Phase 2 templates and domain packs; Phase 3 distribution (K-55); Phase 4 shared core and platform prep (K-56)

## Checklist

- [x] T-01 R1-R6: guides dissolved, rules.md, two READMEs, versioning -> _archives/progress/2026-10.md
- [x] T-02 K1-K2: Kit Charter, lean kit templates, adopt.md and audit.md split -> _refs/design/kit-charter.md
- [x] T-03 K3: migrate this repo's kit: 04, 05, 02 done -> 04-progress
- [ ] T-04 K3: migrate 03-execution and 01-process (this file is the first) -> 04-progress
- [ ] T-05 K4: budget checker and roll-over command -> _refs/design/kit-charter.md
- [ ] T-06 K5: rebuild, scaffold the four domains, run the checker -> CHANGELOG.md
- [ ] T-07 Audit pass: fold decision-record template into _refs/decisions -> K-57
- [ ] T-08 Large-project partitioning, tested on the four examples -> K-54
- [ ] T-09 Slice 1 S1-S7: cards, registry, routes, history -> _refs/design/slice-1-design.md
- [ ] T-10 Adopt the new pipeline in this repo's own .playbook/ -> D-14
- [ ] T-11 Shared core, then the no-terminal scaffolder -> K-56, K-55
- [ ] T-12 Close old-restructure leftovers: root playbook/ clean, code-standards-c/rust archived, _index.md references checked -> _archives/execution/restructure-phase.md

## Known Issues

I-01 | Nested code blocks break markdown rendering | design | low | none | standard formatting containment delivered
