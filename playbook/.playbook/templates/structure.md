---
File: .playbook/[module]/[kebab-case].md

MODULE_ID: PLAYBOOK-CORE-XX-[NAME]
SYSTEM_CONTEXT: [Project Name Context]
UPSTREAM_DEPENDENCIES: []
DOWNSTREAM_IMPACT: []
CORE_SYSTEM_INVARIANTS:
  - [Invariant 1]

id: [kebab-case]
type: structure
scope: project | app | module
status: draft
contains: []
concerns: []
integrations: []
---

# filename

---

## What It Does

Plain language description of this app or module's purpose.

## Structure

- [\_index.md](./_index.md) — this file; [scope] manifest
- [coordinator.md](./coordinator.md) — [one line description]
- [component.md](./component.md) — [one line description]
- [sub-module/](./sub-module/)
  - [\_index.md](./sub-module/_index.md) — [one line description]

## Detail

_(Optional — decisions, constraints, known assumptions. Omit if nothing fits.)_
