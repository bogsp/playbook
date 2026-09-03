---
File: .playbook/[product]/[kebab-case].md

MODULE_ID: PLAYBOOK-COORD-XX-[NAME]
SYSTEM_CONTEXT: [Product or Production Run Context]
UPSTREAM_DEPENDENCIES: []
DOWNSTREAM_IMPACT: []
CORE_SYSTEM_INVARIANTS:
  - [Invariant 1]

id: [kebab-case]
type: coordinator
status: draft
scope: product | production-run
contains: []
concerns: []
---

# filename

---

## What It Does

Plain language — what this product or production run consists of, and the
assembly sequence its parts follow. The map, not the parts themselves.

## Structure

- [\_index.md](./_index.md) — this file; product or run manifest
- [part-1.md](./part-1.md) — [one line description]
- [part-2.md](./part-2.md) — [one line description]

## Assembly Sequence

_(Which parts must be complete before others can be assembled — see
`docs/flows/` for quality checkpoints in this sequence.)_

## Detail

_(Optional — supplier lead times, known constraints. Omit if nothing
fits.)_
