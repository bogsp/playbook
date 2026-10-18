---
file: '.playbook/kit/_refs/kanban/templates-track.md'
responsibility: 'Detail for the playbook-templates doc track and cross-track sync (K-29 to K-32, K-50).'
ai_instructions: 'Detail behind backlog lines in 05-kanban. Read when working the ticket. Keep the ticket text here; keep 05-kanban to one line.'
archive_rule: 'Delete nothing; a closed ticket moves to _archives/kanban/ with its detail.'
owner: project
source: 'git show 117e11c:.playbook/kit/05-kanban.md (Backlog section), copied verbatim'
---

[K-29] Author .playbook/playbook-templates/ planning docs
Type: DDA
Description: _index.md + flat planning docs. Resolve the build.js ownership question here — CLI-layer location vs. Templates-track responsibility.
Blocked by: none — K-28 complete

[K-30] Templates track sync check
Type: SYNC
Description: Confirm shipped playbook/ content matches K-27–K-29.
Blocked by: K-29

[K-31] Final cross-track sync check
Type: SYNC
Description: Update .playbook/_index.md Structure section and Folder Map to reflect all three new doc trees.
Blocked by: K-22, K-26, K-30

[K-32] Create docs/flows/playbook-templates/_index.md and docs/contracts/_index.md
Type: SYNC
Description: Corrected 2026-10-14 after checking the live repo and GitHub main: neither _index.md exists (the earlier log entries assumed they did). Author both for the files that exist today — eight stage flows (flow-0 … flow-7) and their eight per-flow contracts plus docs/contracts/global.md — then extend when K-50 lands.
Blocked by: none

[K-50] Author the journey flows for docs/flows/playbook-templates/
Type: DDA
Description: Raised 2026-10-14. K-27's Done note and the 2026-08-11 progress log describe five journey flows (edit-template-source, build-and-publish, new-project, adopt-existing-project, resume-session) plus a rewritten flows _index.md with a Groups split and dependency map. None exist in the repo or on GitHub main; only the eight pipeline-stage flows do. Author them (or upload the originals), then fold into K-32's index.
Blocked by: none
