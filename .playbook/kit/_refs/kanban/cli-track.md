---
file: '.playbook/kit/_refs/kanban/cli-track.md'
responsibility: 'Detail for the create-playbook CLI doc track (K-19 to K-22).'
ai_instructions: 'Detail behind backlog lines in 05-kanban. Read when working the ticket. Keep the ticket text here; keep 05-kanban to one line.'
archive_rule: 'Delete nothing; a closed ticket moves to _archives/kanban/ with its detail.'
owner: project
source: 'git show 117e11c:.playbook/kit/05-kanban.md (Backlog section), copied verbatim'
---

[K-19] Map CLI flows — create-playbook
Type: DDA
Description: docs/flows/create-playbook/{_index,flow-1-init,flow-2-sync,flow-3-generate}.md. Draft content exists but is unconfirmed — paused in favor of Track C. Resume and confirm before starting K-20.
Blocked by: none (deprioritized, not blocked)
Note 2026-10-14: no draft exists in the repo or on GitHub main — docs/flows/create-playbook/ was never committed. Treat as unstarted unless the person uploads the draft.

[K-20] Write docs/contracts/create-playbook/
Type: DDA
Description: global.md + per-flow contracts for the CLI track.
Blocked by: K-19 (must be confirmed first)

[K-21] Author .playbook/packages/create-playbook/ planning docs
Type: DDA
Description: _index.md + layer-folder planning docs (interface: index.js, prompt.js; application: scaffold.js, generate.js sequencers; infrastructure: install.js).
Blocked by: K-20

[K-22] CLI track sync check
Type: SYNC
Description: Confirm shipped code matches K-19–K-21; log drift, don't silently rewrite code to fit.
Blocked by: K-21
