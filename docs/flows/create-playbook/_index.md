---
file: 'docs/flows/create-playbook/_index.md'
responsibility: 'Entry point for all create-playbook CLI flow documents — lists flows and their dependency map.'
ai_instructions: 'Read before any flow-specific document in this track. Always read docs/contracts/create-playbook/global.md alongside flows.'
archive_rule: 'N/A — living index, updated in the same session a flow is added or removed.'
---

# CLI Flows Index

Entry point for all create-playbook CLI flow documents.

---

## Flows

| ID | Title | Scope | Trigger | Status |
|---|---|---|---|---|
| flow-1-init | Initialize a Project | sequence | request-response | draft |
| flow-2-sync | Sync Library Docs | operation | request-response | draft |
| flow-3-generate | Generate a Document | composite | request-response | draft |

---

## Dependency Map

_calls: flow calls another flow_
_emits: flow emits an event that triggers another flow_

None of the three flows call each other — each is a distinct CLI entry point
selected by `process.argv[2]` in `index.js`. No shared child flows exist yet.
