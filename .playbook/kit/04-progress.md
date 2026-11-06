---
file: '.playbook/kit/04-progress.md'
responsibility: 'Append-only log of events: one line each.'
ai_instructions: 'Add one line per event at the bottom, naming what happened, what was decided and why in brief, with refs to the files holding detail. Never edit or delete past lines.'
archive_rule: 'Over budget, the oldest lines move verbatim to _archives/progress/YYYY-MM.md.'
owner: project
max-bytes: 6144
max-lines: 40
line-max: 240
entry-shape: 'date | Completed|Decided|Fixed | <=160 chars | refs'
---

# Progress

2026-10-19 | Completed | Deployed v2.0.7 landing page with domain ZIP download links | docs/index.html
2026-10-20 | Completed | Renamed standards README.md to _index.md to align with Playbook conventions | docs/standards/_index.md
2026-10-20 | Completed | Cleaned up legacy individual code-standards-* files in canonical and template docs | docs/standards/_index.md
2026-10-20 | Completed | Redesigned landing page with modern typography, trust banner, and clean interactive copy flow -> docs/index.html
2026-10-20 | Completed | Moved trust banner below download links -> docs/index.html
2026-10-20 | Completed | Added create-playbook npm package link under technical teams section -> docs/index.html
2026-10-20 | Completed | Expanded technical section on landing page with CLI scaffolding details and npm link -> docs/index.html
2026-10-20 | Completed | Added GitHub Issues support link to footer for safe project communication buffer -> docs/index.html
2026-10-20 | Completed | Added C12 terminal execution rule and created terminal protocol guide -> docs/terminal-protocol.md
2026-10-20 | Completed | Fixed nested code block syntax inside project entry guide -> .playbook/_index.md
2026-10-20 | Completed | Synchronized final kit state and process tracking -> .playbook/kit/01-process.md
2026-10-20 | Completed | Implemented create-playbook update CLI command for automated migrations -> packages/create-playbook/bin/cli.js
2026-10-20 | Fixed | Identified npm registry caching for dlx vs local execution during create-playbook update test -> packages/create-playbook/bin/cli.js
2026-10-20 | Completed | Published create-playbook update package to npm successfully -> packages/create-playbook/package.json
2026-10-20 | Completed | Published create-playbook@3.1.11 and locked expansion roadmap and stage-gate governance | packages/create-playbook/package.json
2026-10-24 | Decided | Recorded Project Sage field report: seven improvements queued as K-58 to K-64 (checker, migrator, one home per fact, executable done-when, protected files, anchors, lean mode) | _refs/kanban/sage-field-report-track.md
2026-11-05 | Decided | Creator: no-workaround rule is shipped C12; the local terminal rule moves to project rule X1; own rules.md now mirrors the shipped file | playbook/.playbook/rules.md
2026-11-05 | Completed | C12 added to source and skill assets, templateVersion 2.1.0, CHANGELOG entry; check:drift and e2e pass; not published | CHANGELOG.md
2026-11-05 | Decided | Found create-playbook templates older than the sources (10-20 content only in templates); left untouched, K-65 raised, Creator to choose | _refs/design/template-drift-2026-11-05.md
2026-11-05 | Fixed | Untracked the four stale create-playbook template files (build output); text kept in _refs; check-drift now fails on tracked build output; verified | _refs/design/cli-roadmap-and-governance-2026-10-20.md
2026-11-05 | Corrected | Earlier drift note wrongly said 3.1.11 was built from the stale files; the published package holds the full 2.0.0 documents; note rewritten | _refs/design/template-drift-2026-11-05.md
