---
file: .playbook/[module]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this external or internal service or library is for]
id: [module]-[kebab-case]
type: integration
status: draft
needs: []
provides: [One line: what the project gets from this integration]
invariants: []
done-when: [TODO — an observable check]
kind: external-service | external-library | internal-service
docs: [url]
---

# filename

---

## What It Does

What this service or library provides and how it's used in this project.

## Interface

Contract: `docs/contracts/[flow]/[file].md#[section]` _(if applicable)_

What this integration exposes — methods, events, or data the project depends on.

## Behaviour

**Rules:**

- [Rule — stated as must / never]

**Failure modes:**

- [What breaks and how]

## Detail

_(Auth method, rate limits, versioning constraints. Omit if nothing fits.)_
