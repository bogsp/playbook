---
file: .playbook/[module]/[kebab-case].md
responsibility: [One line, 160 characters or fewer: what this sequencer runs]
id: [module]-[kebab-case]
type: sequencer
status: draft
layer: application
parent: [structure id]
needs: []
provides: [One line: the outcome this sequencer delivers]
invariants: []
done-when: [TODO — an observable check]
---

# filename

---

## What It Does

Plain language — what this coordinates and what it produces. Owns the
call sequence, not the logic — logic lives in the components it calls.

## Sequence

References: `docs/flows/[flow-file].md` + `docs/contracts/[contract-file].md`

```
1. [piece].[action](input)
   → ok: [Result] → continue to 2
   → err: [Error] → [what happens]
```

```
2. [piece].[action](result)
   → ok: [Result] → [outcome]
   → err: [Error] → [what happens]
```

## Detail

_(Optional — concurrency, timeouts, constraints. Omit if nothing fits.)_

## Pieces to Define

_(Remove once all are active)_

- [ ] [piece-id] — [responsibility]
