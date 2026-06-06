# [Sequencer Name]
# File: .playbook/[path]/[kebab-name].md

---
id: [kebab-case]
export: [ExportedClassName]
file: src/[module]/[layer]/[kebab-name].ts
layer: application
type: sequencer
status: draft
parent: [module]
triggers: []
sequence: []
emits: []
concerns: []
---

## What It Does
Plain language — what this sequencer coordinates.
Owns the sequence, not the logic. Any reader understands this without technical knowledge.

## Flow
References: `docs/flows/[flow-file].md` + `docs/contracts/[contract-file].md`

1. On [TriggerEvent](input):
   a. [componentName].[method](input)
      → ok: [ResultType]     → continue to b
      → err: [ErrorType]     → emit [FailureEvent], halt
   b. [componentName].[method](result)
      → ok: [ResultType]     → continue to c
      → err: [ErrorType]     → compensate, emit [FailureEvent]
   c. [componentName].[method](result)
      → ok: [ResultType]     → emit [SuccessEvent]
      → err: [ErrorType]     → compensate, emit [FailureEvent]

## Detail
_(Optional — concurrency rules, timeouts, constraints that cannot be inferred from the flow. Omit if nothing fits.)_

## Components to Extract
_(Remove once all are active — every item needs its own planning doc before this sequencer is active)_
- [ ] [component-id] — [leaf responsibility]
