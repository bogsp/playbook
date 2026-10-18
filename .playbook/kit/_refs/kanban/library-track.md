---
file: '.playbook/kit/_refs/kanban/library-track.md'
responsibility: 'Detail for the playbook-software-library doc track (K-23 to K-26).'
ai_instructions: 'Detail behind backlog lines in 05-kanban. Read when working the ticket. Keep the ticket text here; keep 05-kanban to one line.'
archive_rule: 'Delete nothing; a closed ticket moves to _archives/kanban/ with its detail.'
owner: project
source: 'git show 117e11c:.playbook/kit/05-kanban.md (Backlog section), copied verbatim'
---

[K-23] Map library flows — playbook-software-library
Type: DDA
Description: docs/flows/playbook-software-library/{_index,flow-1-contribute-doc,flow-2-consume-in-project}.md.
Blocked by: none

[K-24] Write docs/contracts/playbook-software-library/
Type: DDA
Description: global.md + per-flow, cross-referencing CONTRIBUTING.md rather than duplicating it.
Blocked by: K-23

[K-25] Author .playbook/packages/playbook-software-library/ planning docs
Type: DDA
Description: _index.md + flat planning docs (no layer folders — reference content, not layered code).
Blocked by: K-24

[K-26] Library track sync check
Type: SYNC
Description: Confirm CONTRIBUTING.md, CHANGELOG.md, and shipped _concerns/_integrations/_solutions match K-23–K-25.
Blocked by: K-25
