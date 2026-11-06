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
Last: Added core rule C12 (fix the source, never work around it) as templateVersion 2.1.0 -> CHANGELOG.md
Next: Define DDA and implementation plan for future CLI expansion features -> .playbook/
Open: create-playbook templates are older than the 2.0.0 sources; 2.1.0 not published (K-65) -> _refs/design/template-drift-2026-11-05.md
In flight: none
Active Modules: none
Active Expansions: CLI Expansion Roadmap & Stage-Gate Governance | Locked | rules.md, pipeline.md
