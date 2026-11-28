---
file: '.playbook/kit/01-process.md'
responsibility: 'Entry state: phase, last, next, open flags, active expansions.'
ai_instructions: 'Read first, every session. Overwrite in place at session end. Keep each line within line-max; detail goes to a linked file.'
archive_rule: 'N/A. Overwrite in place.'
owner: project
max-bytes: 2048
max-lines: 20
line-max: 200
entry-shape: 'Last: <=160 chars -> refs'
---

# Process

Phase: Work
Last: Implemented K-62 protected files list & .version hash checks in update.js -> packages/create-playbook/lib/update.js
Next: Verify K-62 behavior with dry-run/test or continue K-58 validator -> 05-kanban.md
Open: 2.1.0 (rule C12) not published (K-66); questions Q-07 to Q-10 logged for discussion -> 02-exploration.md
In flight: none
Active Modules: none
Active Expansions: CLI Expansion Roadmap & Stage-Gate Governance | Locked | rules.md, pipeline.md
