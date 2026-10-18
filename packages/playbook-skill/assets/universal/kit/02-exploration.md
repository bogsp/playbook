---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Index of open questions, closed decisions and constraints, with links to detail.'
ai_instructions: 'One line per question or decision; put detail and reasoning in _refs/questions/ or _refs/decisions/. Do not reopen a closed decision without explicit human instruction.'
archive_rule: 'Closed decisions that affect no active task move to _archives/exploration/; the index line stays.'
owner: project
max-bytes: 4096
max-lines: 40
line-max: 200
entry-shape: 'Q-nn | question | -> link ; D-nn | date | <=160 chars | -> link'
---

# Exploration

## Open Questions

Q-01 | [question on one line] | -> _refs/questions/Q-01.md

## Decisions

D-01 | [YYYY-MM-DD] | [the decision and its key detail, <=160 chars] | -> _refs/decisions/D-01.md

## Constraints

CN-01 | [limit the project must respect, <=160 chars] | -> link
