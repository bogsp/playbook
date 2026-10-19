---
file: .playbook/[product]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this part is]
id: [product]-[kebab-case]
type: part
status: draft
parent: [product or production run id]
needs: []
provides: [One line: what this part supplies to the assembly]
invariants: []
done-when: [TODO — an observable check]
specification: [TODO — the exact spec this part must meet]
---

# filename

---

## What It Does

Plain language — what this part or sub-assembly is and what it does within
the larger product. Specification and `done-when` are not optional; a part does
not move past draft without both.

## Interface

Contract: `docs/contracts/[flow]/[file].md#[section]` _(if applicable)_

Quality checkpoints this part must pass, and any tolerance or compliance
standard it must meet — reference `_concerns/`, do not restate.

## Detail

_(Supplier dependency, tolerance edge cases. Omit if nothing fits.)_
