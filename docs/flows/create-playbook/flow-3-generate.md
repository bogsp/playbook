---
file: 'docs/flows/create-playbook/flow-3-generate.md'
responsibility: 'Defines the CLI generate flow — producing a single planning document (flow, contract, component, concern, or integration) inside an existing project.'
ai_instructions: 'Read before modifying index.js runGenerate() or generate.js. Companion contract: docs/contracts/create-playbook/flow-3-generate.md.'
archive_rule: 'N/A — active flow document; archive only if the generate command is removed or fundamentally restructured.'
id: flow-3-generate
type: flow
scope: composite
trigger: request-response
status: draft
calls: [generateFlow, generateContract, generatePlanningDoc]
emits: []
called-by: []
---

# Generate a Document

---

## What It Does

Generates a single planning document (flow, contract, component, concern, or
integration) inside an existing Playbook project, correctly structured and
placed, and updates the relevant `_index.md` where applicable.

## Before It Starts

Must be run inside an initialized Playbook project. A `type` argument is
required and must be one of the five valid document types.

## When It Finishes

Exactly one new file exists at the correct path for its type, pre-filled
with `TODO` markers. For flow and contract types, the companion `_index.md`
has a new row appended.

## Walkthrough

---

```
1. On [CLI invoke "generate" | "g"](cwd, type):
   a. isPlaybookProject(cwd)
      → ok: false → print error, exit 1, halt
      → ok: true  → continue to b
   b. validate type ∈ {flow, contract, component, concern, integration}
      → err: missing/invalid → print usage, exit 1, halt
      → ok: → continue to c
   c. route by type:
      → "flow"     → generateFlow(cwd)              → continue to Child Path A
      → "contract" → generateContract(cwd)           → continue to Child Path B
      → other      → generatePlanningDoc(cwd, type)  → continue to Child Path C
```

---

## Child Paths

**A — generateFlow:** ask flow name, scope, trigger → compute next `flow-N-`
id from existing `docs/flows/` → error if file already exists → build flow
doc with scope/trigger-conditional sections → write file → append row to
`docs/flows/_index.md`.

**B — generateContract:** list existing flows (error if none) → choose
companion flow → error if contract already exists → write contract doc →
append row to `docs/contracts/_index.md`.

**C — generatePlanningDoc:** ask name + parent, plus type-specific fields
(component: emits/connects; integration: config keys/docs URL) → resolve
path by type (`_concerns/`, `_integrations/`, or module root) → error if
file already exists → write file. No index update — the person is told to
add it to the relevant `_index.md` Structure section manually.

## Detail

- Child Path C is the only one that doesn't self-register in an index —
  worth deciding in K-20/K-21 whether that's intentional (component
  placement is context-dependent, so auto-updating would guess wrong) or a
  gap.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
