---
file: .playbook/[module]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this app or module is]
id: [module]-[kebab-case]
type: structure
status: draft
scope: project | app | module
parent: [enclosing structure id, if nested]
needs: []
provides: [One line: what this app or module offers the rest of the project]
invariants: []
done-when: [TODO — an observable check]
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
