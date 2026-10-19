---
file: '.playbook/kit/03-execution.md'
responsibility: 'The current phase: goal, checklist and known issues.'
ai_instructions: 'Tick tasks as they finish. Hold the current phase only; a finished phase moves to _archives/execution/. A task has detail here or in 05-kanban, never both.'
archive_rule: 'Finished phases move to _archives/execution/ once logged in 04-progress.'
owner: project
max-bytes: 4096
max-lines: 45
line-max: 200
entry-shape: '- [ ] T-nn <=120 chars -> K-nn or doc'
---

# Execution

Phase: Work
Goal: Implement static landing page and deploy domain ZIP distribution assets
Done when: Landing page live at GitHub Pages with working direct downloads
Later: Handoff

## Checklist

- [x] T-01 Implement responsive landing page with domain cards -> docs/index.html
- [x] T-02 Tag and push v2.0.7 release -> origin main
- [ ] T-03 Generate domain-specific ZIP assets in docs/downloads/

## Known Issues
