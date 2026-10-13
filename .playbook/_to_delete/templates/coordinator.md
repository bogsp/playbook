---
File: .playbook/[module]/[kebab-case].md

MODULE_ID: SAGE-COORD-XX-[NAME]
SYSTEM_CONTEXT: [Macro System Block Context]
UPSTREAM_DEPENDENCIES: []
DOWNSTREAM_IMPACT: []
CORE_SYSTEM_INVARIANTS:
  - [Invariant 1]

id: [kebab-case]
type: coordinator
status: draft
parent: [module]
sequence: []
concerns: []
---

# filename

---

## What It Does

Plain language — what this coordinates and what it produces.

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
