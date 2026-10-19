---
file: '.playbook/kit/01-process.md'
responsibility: 'Entry state: phase, last, next, open flags, active expansions.'
ai_instructions: 'Read first, every session. Overwrite in place at session end. Keep each line within line-max; detail goes to a linked file.'
archive_rule: 'N/A. Overwrite in place.'
owner: project
max-bytes: 2048
max-lines: 20
line-max: 200
entry-shape: 'Last: T-08 and T-09 completed: maintenance updated, handoff prompt extracted, 2.0.0 freeze verified -> 04-progress
---

# Process

Phase: Planning (pipeline rewrite)
Last: T-07 findings decided (D-21); fixes for F1-F6 delivered; merge waits on build, drift check and a scaffold read -> 04-progress
Next: T-10 code phase (K-55, K-56) or T-11 adopt pipeline in root
Open: Q-03, Q-05, Q-06 -> 02-exploration; F7-F9 -> t07-review (K-58); code checks deferred until code work
In flight:
Active Modules: kanban
Active Expansions: none
