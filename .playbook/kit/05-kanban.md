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

[K-58] Ship a `playbook check` validator | CODE | Q-01 | -> _refs/kanban/sage-field-report-track.md
[K-59] Per-version migration script (v1 to v2 first) | CODE | K-58 | -> _refs/kanban/sage-field-report-track.md
[K-60] One home per fact; checker flags duplicates | DDA | K-58 | -> _refs/kanban/sage-field-report-track.md
[K-61] Executable done-when; derive status | DDA | K-58 | -> _refs/kanban/sage-field-report-track.md
[K-62] Protected files list with the version stamp (Q-06) | DDA | none | -> _refs/kanban/sage-field-report-track.md
[K-63] Stable anchors for citations, not section numbers | DDA | K-58 | -> _refs/kanban/sage-field-report-track.md
[K-64] Lean mode for small projects | DDA | none | -> _refs/kanban/sage-field-report-track.md

## In Progress

## Blocked

## Done
