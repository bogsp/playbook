---
file: .playbook/[product]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this product or production run covers]
id: [product]-[kebab-case]
type: coordinator
status: draft
scope: product | production-run
needs: []
provides: [One line: what this product or run delivers]
invariants: []
done-when: [TODO — an observable check]
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
