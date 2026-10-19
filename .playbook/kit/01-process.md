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

Phase: [Audit | Discovery | Mapping | Rules | Planning | Work | Handoff]
Last: [what finished, <=160 chars -> refs]
Next: [up to 3, <=160 chars each -> refs]
Open: [flags and open questions -> 02-exploration]
In flight: none
Active Modules: none
Active Expansions: none  [or: name | phase | exclusive files | domain templates in use]
