---
file: '.playbook/kit/05-kanban.md'
responsibility: 'Board for work that needs status, blockers or owners.'
ai_instructions: 'Move a ticket by editing its column. Top is next. Keep the last 10 Done as one line each. Older Done: _archives/kanban/. Detail: _refs/kanban/.'
archive_rule: 'Done tickets beyond the latest 10 move to _archives/kanban/.'
owner: project
max-bytes: 5120
max-lines: 50
line-max: 200
entry-shape: '[K-nn] title <=80 | type | blocked-by | -> link'
---

# Kanban

Archived: _archives/kanban/done-2026-08.md (32 tickets and the locked clerical track); done-2026-10.md (K-51..K-54); done-pre-migration.md

## Backlog

[K-19] Map CLI flows (create-playbook) | DDA | none | -> _refs/kanban/cli-track.md
[K-20] Write docs/contracts/create-playbook/ | DDA | K-19 | -> _refs/kanban/cli-track.md
[K-21] Author create-playbook planning docs | DDA | K-20 | -> _refs/kanban/cli-track.md
[K-22] CLI track sync check | SYNC | K-21 | -> _refs/kanban/cli-track.md
[K-23] Map library flows (playbook-software-library) | DDA | none | -> _refs/kanban/library-track.md
[K-24] Write docs/contracts/playbook-software-library/ | DDA | K-23 | -> _refs/kanban/library-track.md
[K-25] Author playbook-software-library planning docs | DDA | K-24 | -> _refs/kanban/library-track.md
[K-26] Library track sync check | SYNC | K-25 | -> _refs/kanban/library-track.md
[K-29] Author playbook-templates planning docs | DDA | none | -> _refs/kanban/templates-track.md
[K-30] Templates track sync check | SYNC | K-29 | -> _refs/kanban/templates-track.md
[K-31] Final cross-track sync check | SYNC | K-22, K-26, K-30 | -> _refs/kanban/templates-track.md
[K-32] Create flows and contracts _index.md for playbook-templates | SYNC | none | -> _refs/kanban/templates-track.md
[K-50] Author the journey flows for playbook-templates | DDA | none | -> _refs/kanban/templates-track.md
[K-55] Distribution: GitHub source, no-terminal scaffolder | DDA | K-56 | -> _refs/kanban/K-55.md
[K-56] Extract a shared core for CLI, web, skill, platform | DDA | none | -> _refs/kanban/K-56.md
[K-57] Audit pass: fold decision-record template into _refs/decisions | DDA | none | -> _refs/kanban/K-57.md

## In Progress
## Blocked
## Done
[K-54] Design large-project partitioning | DDA | 2026-10-19 | -> _archives/kanban/done-2026-10.md
[K-53] Add a drift check for committed generated output | CODE | 2026-10-14 | -> _archives/kanban/done-2026-10.md
[K-52] Stop committing the CLI's generated templates/ | CODE | 2026-10-14 | -> _archives/kanban/done-2026-10.md
[K-51] Single-source the template file list (template-manifest.json) | CODE | 2026-10-14 | -> _archives/kanban/done-2026-10.md
[K-49] Update create-playbook CLI for the K-42 consolidation and new settings | CODE | 2026-08-31 | -> _archives/kanban/done-2026-08.md
[K-48] Package Playbook as a Claude Skill (packages/playbook-skill) | DDA | 2026-08-31 | -> _archives/kanban/done-2026-08.md
[K-47] Generalize the SAGE- MODULE_ID placeholder across all templates | SYNC | 2026-08-31 | -> _archives/kanban/done-2026-08.md
[K-46] Introduce Pipeline Mode as a per-project setting | DDA | 2026-08-31 | -> _archives/kanban/done-2026-08.md
[K-45] Introduce Review Gate as a per-project setting | DDA | 2026-08-31 | -> _archives/kanban/done-2026-08.md
[K-44] Apply the _index.md consolidation to this repo's root .playbook/ | DDA | 2026-08-29 | -> _archives/kanban/done-2026-08.md
