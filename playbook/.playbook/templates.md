# Planning Document Templates
# File: .playbook/templates.md

> Universal, domain-agnostic shapes for every planning document type.
> For domain-specific fields and jargon, see `vocabulary-[domain]/templates.md`.

Every planning document follows the same shape:

```
## What It Does    → plain language, any reader
## Interface       → what goes in, what comes out, what rules apply
## Detail          → edge cases and constraints only — omit if nothing fits
```

Two markers used throughout:
- **N/A** — considered, doesn't apply
- **TODO** — not yet written; blocks `status: active`

---

## structure

A module, app, or project manifest — the map of a section.

```
---
id: [kebab-case]
type: structure
scope: project | app | module
status: draft
contains: []
concerns: []
integrations: []
---

## What It Does
Plain language description of this app or module's purpose.

## Structure
- [_index.md](./_index.md) — this file; [scope] manifest
- [coordinator.md](./coordinator.md) — [one line description]
- [component.md](./component.md) — [one line description]
- [sub-module/](./sub-module/)
  - [_index.md](./sub-module/_index.md) — [one line description]

## Detail
_(Optional — decisions, constraints, known assumptions. Omit if nothing fits.)_
```

---

## coordinator

Sequences other pieces. Owns the order of operations, not the logic.

```
---
id: [kebab-case]
type: coordinator
status: draft
parent: [module]
sequence: []
concerns: []
---

## What It Does
Plain language — what this coordinates and what it produces.

## Sequence
References: `docs/flows/[flow-file].md` + `docs/contracts/[contract-file].md`

1. [piece].[action](input)
   → ok: [Result]   → continue to 2
   → err: [Error]   → [what happens]
2. [piece].[action](result)
   → ok: [Result]   → [outcome]
   → err: [Error]   → [what happens]

## Detail
_(Optional — concurrency, timeouts, constraints. Omit if nothing fits.)_

## Pieces to Define
_(Remove once all are active)_
- [ ] [piece-id] — [responsibility]
```

---

## component

A single piece of work. One job, clearly defined input and output.

```
---
id: [kebab-case]
type: component
status: draft
parent: [coordinator or module]
children: []
connects: []
emits: []
concerns: []
---

## What It Does
Plain language description of this component's single responsibility.

## Interface
Contract: `docs/contracts/[flow]/[file].md#[section]`

What goes in, what comes out, what rules apply.

## Detail
_(Edge cases and constraints only. Omit if nothing fits.)_
```

---

## concern

A rule or capability that applies everywhere — security, logging, error
handling — defined once, used everywhere.

```
---
id: [kebab-case]
type: concern
status: draft
affects: all | [module, module]
provided-by: internal | external
---

## What It Does
What this capability provides, how pieces use it, and what depends on it.

## Behaviour
**Rules:**
- [Rule — stated as must / never]

**What must always be true:**
- [Invariant]

**What must never happen:**
- [Prohibition]

## Detail
_(Injection pattern, configuration, known constraints. Omit if nothing fits.)_
```

---

## integration

A connection to an outside tool or service.

```
---
id: [kebab-case]
type: integration
kind: external-service | external-library | internal-service
status: draft
used-by: []
config: []
docs: [url]
---

## What It Does
What this service or library provides and how it's used in this project.

## Interface
Contract: `docs/contracts/[flow]/[file].md#[section]` _(if applicable)_

What this integration exposes — methods, events, or data the project depends on.

## Behaviour
**Rules:**
- [Rule — stated as must / never]

**Failure modes:**
- [What breaks and how]

## Detail
_(Auth method, rate limits, versioning constraints. Omit if nothing fits.)_
```
