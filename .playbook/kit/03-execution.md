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

Phase: [name]
Goal: [<=160 chars]
Done when: [<=160 chars]
Later: [Phase 2 name; Phase 3 name]

## Checklist

- [ ] T-01 [task, <=120 chars] -> [K-nn or doc]

## Known Issues

I-01 | [issue, <=120 chars] | [bug | dependency | design] | [high | medium | low] | [blocked by] | -> link
