---
id: [kebab-case — matches filename]
export: [ExportedName]
file: [src/module/component.ts]
type: component
status: draft
parent: [parent-sequencer-or-module]
children: []
connects: []
emits: []
concerns: []
---

## What It Does
Plain language description of this component's single responsibility.
Any reader understands this without technical knowledge.

## Interface
Contract: `docs/contracts/[flow]/[file].md#[section]`

input:  [InputType]
output: Result<[SuccessType], [ErrorType]>

```[language]
// language-specific signature
function [name](input: [InputType]): Result<[SuccessType], [ErrorType]>
```

## Detail
_(Only present when edge cases, concurrency constraints, or known quirks
exist that would cause bugs if missed. Omit entirely if nothing fits.)_
