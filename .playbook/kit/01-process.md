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
Last: Untracked stale create-playbook template copies; drift check now guards the build-output folder -> _refs/design/template-drift-2026-11-05.md
Next: Define DDA and implementation plan for future CLI expansion features -> .playbook/
Open: 2.1.0 (rule C12) is not published; K-66 waits on the Creator -> CHANGELOG.md
In flight: none
Active Modules: none
Active Expansions: CLI Expansion Roadmap & Stage-Gate Governance | Locked | rules.md, pipeline.md
