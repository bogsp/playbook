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
Last: Successfully published create-playbook package to npm from packages/create-playbook -> packages/create-playbook/package.json
Next: Test global pnpm dlx create-playbook update migration
Open: none
In flight: none
Active Modules: none
Active Expansions: none
