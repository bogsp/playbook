# [Component Name]
# File: .playbook/[path]/[kebab-name].md

---
id: [kebab-case]
export: [ExportedClassName]
file: src/[module]/[layer]/[kebab-name].ts
layer: domain | application | infrastructure | interface
type: component
status: draft
parent: [sequencer or module]
children: []
connects: []
emits: []
concerns: []
---

## What It Does
Plain language — this component's single responsibility.
Any reader understands this without technical knowledge.

## Interface
Contract: `docs/contracts/[flow]/[file].md#[section]`

input:  [InputType]
output: Result<[SuccessType], [ErrorType]>

```typescript
function [name](input: [InputType]): Result<[SuccessType], [ErrorType]>
```

## Detail
_(Edge cases and constraints only — things that would cause bugs if missed. Omit if nothing fits.)_
