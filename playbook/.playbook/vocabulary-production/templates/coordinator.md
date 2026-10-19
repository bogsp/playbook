---
file: .playbook/[project]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this project or campaign covers]
id: [project]-[kebab-case]
type: coordinator
status: draft
scope: project | campaign
needs: []
provides: [One line: what this project or campaign delivers]
invariants: []
done-when: [TODO — an observable check]
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
