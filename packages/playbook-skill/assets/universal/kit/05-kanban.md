---
file: '.playbook/kit/05-kanban.md'
responsibility: 'Optional board for work that needs status, blockers or owners.'
ai_instructions: 'Move a ticket by editing its column. Top of a column is next. Keep the last 10 Done as one line each.'
archive_rule: 'Done tickets beyond the latest 10 move to _archives/kanban/.'
owner: project
max-bytes: 5120
max-lines: 50
line-max: 200
entry-shape: '[K-nn] title <=80 | type | blocked-by | -> link'
---

# Kanban

## Backlog

[K-01] [title, <=80 chars] | [type] | [blocked-by or none] | -> link

## In Progress

## Blocked

## Done
