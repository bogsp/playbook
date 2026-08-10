# Software Planning Document Templates
# File: .playbook/vocabulary-software/templates.md

> Software-specific fields and jargon, layered on top of `templates.md`.
> Read [templates.md](../templates.md) first — these are the same five
> document types with software fields added.

---

## structure

```
---
id: [kebab-case]
type: structure
scope: project | app | module
status: draft
entry: []
contains: []
integrations: []
concerns: []
---

## What It Does
Plain language description of this app or module's purpose.

## Structure
- [_index.md](./_index.md) — this file; [scope] manifest
- [sequencer.md](./sequencer.md) — [one line description]
- [component.md](./component.md) — [one line description]
- [sub-module/](./sub-module/)
  - [_index.md](./sub-module/_index.md) — [one line description]

## Detail
_(Architecture decisions, constraints, known assumptions. Omit if nothing fits.)_
```

---

## sequencer (coordinator)

Software's term for `coordinator` — usually lives in the `application` layer.

```
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
Plain language — what this sequencer coordinates. Owns the sequence, not the logic.

Use this doc type when this unit receives a trigger, orders other units,
routes work to multiple handlers, or branches by outcome.

Clean Architecture: sequencers usually live in the application layer. Store
this document under the matching layer folder. If the implementation file is
in interface/router code, keep the document `draft` until the application
sequencer is extracted or the exception is approved.

Rule: sequencer code must not contain leaf component logic. Extract each
meaningful leaf operation into its own component doc and implementation file,
then list it in `sequence`.

## Flow
References: `docs/flows/[flow-file].md` + `docs/contracts/[contract-file].md`

1. On [TriggerEvent](input):
   a. [componentName].[method](input)
      → ok: [ResultType]     → continue to b
      → err: [ErrorType]     → emit [FailureEvent], halt
   b. [componentName].[method](result)
      → ok: [ResultType]     → emit [SuccessEvent]
      → err: [ErrorType]     → compensate, emit [FailureEvent]

## Detail
_(Concurrency rules, timeouts, constraints not inferable from the flow. Omit if nothing fits.)_

## Leaf Components
_(Checklist for generation/review — every item needs its own document and
implementation before this sequencer is active)_
- [ ] [component-id] — [leaf responsibility]
```

---

## component

```
---
id: [kebab-case]
export: [ExportedName]
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
Plain language description of this component's single responsibility.

Clean Architecture: set `layer` to domain, application, infrastructure, or
interface. Store this document under the matching layer folder and keep the
implementation file in that layer.

Use this doc type only for one bounded leaf responsibility: validation,
calculation, persistence, rendering, parsing, policy decision, or adapter
call. If this unit receives triggers, routes between handlers, or sequences
multiple components, use `type: sequencer` instead.

## Interface
Contract: `docs/contracts/[flow]/[file].md#[section]`

input:  [InputType]
output: Result<[SuccessType], [ErrorType]>

```typescript
function [name](input: [InputType]): Result<[SuccessType], [ErrorType]>
```

## Detail
_(Edge cases, concurrency constraints, known quirks. Omit if nothing fits.)_
```

---

## concern

Same shape as [templates.md](../templates.md#concern) — no software-specific
fields needed. Common software concerns: `auth`, `logging`, `error-handling`.

---

## integration

Same shape as [templates.md](../templates.md#integration) — no
software-specific fields needed. Common software integrations: databases,
queues, third-party APIs, build tooling.
