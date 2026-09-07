---
File: .playbook/[project]/[kebab-case].md

MODULE_ID: PLAYBOOK-COORD-XX-[NAME]
SYSTEM_CONTEXT: [Project or Campaign Context]
UPSTREAM_DEPENDENCIES: []
DOWNSTREAM_IMPACT: []
CORE_SYSTEM_INVARIANTS:
  - [Invariant 1]

id: [kebab-case]
type: coordinator
status: draft
scope: project | campaign
contains: []
concerns: []
---

# filename

---

## What It Does

Plain language — what this project or campaign produces, and how its
deliverables depend on each other. The map, not the deliverables
themselves.

## Structure

- [\_index.md](./_index.md) — this file; project or campaign manifest
- [deliverable-1.md](./deliverable-1.md) — [one line description]
- [deliverable-2.md](./deliverable-2.md) — [one line description]

## Dependency Order

_(Which deliverables must complete before others can begin — see
`docs/flows/` for the approval flow each dependency follows.)_

## Detail

_(Optional — deadlines, vendor constraints. Omit if nothing fits.)_
