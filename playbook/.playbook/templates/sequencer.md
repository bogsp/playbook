---
id: [kebab-case — matches filename]
export: [ExportedName]
file: [src/module/sequencer.ts]
type: sequencer
status: draft
parent: [module]
triggers: []
sequence: []
emits: []
concerns: []
---

## What It Does
Plain language description of what this sequencer coordinates.
Owns sequence, not logic. Any reader understands this without technical knowledge.

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
_(Only present when concurrency rules, timeouts, or constraints exist
that cannot be inferred from the flow. Omit entirely if not needed.)_
