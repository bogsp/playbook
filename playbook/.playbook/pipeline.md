# Playbook Pipeline
# File: .playbook/pipeline.md

> The complete reference for the Playbook pipeline.
> This document explains what each stage is and why it exists.
> For how AI implements it, read `.playbook/00-rules.md`.

---

## Table of Contents

1. [The Pipeline](#1-the-pipeline)
2. [Core Principle — Progressive Disclosure + Tiering](#2-core-principle)
3. [Stage 1 — Context Kit](#3-stage-1--context-kit)
4. [Stage 2 — PRD and Specs](#4-stage-2--prd-and-specs)
5. [Stage 3 — Flows](#5-stage-3--flows)
6. [Stage 4 — Contracts](#6-stage-4--contracts)
7. [Stage 5 — DDA](#7-stage-5--dda)
8. [Stage 6 — Code](#8-stage-6--code)
9. [Stage 7 — Rollout](#9-stage-7--rollout)
10. [Adopting an Existing Project](#10-adopting-an-existing-project)
11. [Phase Completion Checklist](#11-phase-completion-checklist)
12. [Quick Reference](#12-quick-reference)

---

## 1. The Pipeline

```
Context Kit → PRD → Flows → Contracts → DDA → Code → Rollout
```

| Stage | What It Does | Where It Lives | Owner |
|---|---|---|---|
| Context Kit | Captures thinking, decisions, and progress | `.kit/` | Human |
| PRD | Defines what to build and why | `docs/` | Human + AI |
| Flows | Defines runtime paths | `docs/flows/` | Human + AI |
| Contracts | Defines implementation boundaries | `docs/contracts/` | Human + AI |
| DDA | Defines structure and relationships | `.playbook/` | Human + AI |
| Code | Implementation against contracts | `src/` | AI |
| Rollout | Generated milestone snapshots | `docs/rollout/` | AI |

Each stage feeds the next. Nothing overlaps. Nothing is duplicated.

**Playbook is a dev-dependency.** It is present during development and invisible
in production. `.playbook/` and `.kit/` are Playbook's world. Everything else
belongs to the project.

---

## 2. Core Principle

### Progressive Disclosure + Tiering

Every format, template, and structure in Playbook follows this principle:

**Progressive Disclosure** — surface the simplest, most human-readable version
first. Add technical depth below it. Never bury the plain language version.
The same document serves two audiences without sacrificing either.

**Tiering** — define a required core, then add sections only when the scope
or type demands it. Never burden simple cases with complex requirements.
Never let complex cases skip required coverage.

This applies to everything: document formats, flow templates, contract sections,
ticket types, QA test cases, and kit file sections.

**When any structural decision needs to be made — apply this principle first.**

---

## 3. Stage 1 — Context Kit

The Context Kit is the project management layer. It captures thinking, locks
decisions, and tracks progress across sessions. It operates above the pipeline
and drives it.

### Files

| File | Job | Updated |
|---|---|---|
| `.kit/01-process.md` | Session spark — phase, last completed, next, active modules | Every session |
| `.kit/02-exploration.md` | Active decisions — open topics and closed decisions | When decisions change |
| `.kit/03-execution.md` | Guidelines, plan, tasks, known issues | When work changes |
| `.kit/04-progress.md` | Append-only log of completions, decisions, fixes | Every session |
| `.kit/05-kanban.md` | Active ticket breakdown (optional) | When tickets change |
| `.kit/06-qa.md` | Test registry and sign-off (optional) | When tests change |

### Supporting Folders

| Folder | Contains |
|---|---|
| `.kit/_refs/` | Supporting material referenced by `02-exploration.md` |
| `.kit/_tests/` | One file per QA test case |
| `.kit/_archives/` | Lean history — exploration, progress, kanban |

### The Two-Message Pattern

Every session starts with two messages:

**Message 1** — upload `01-process.md` + `03-execution.md`
Active files — how to work and what's in focus.

**Message 2** — upload `02-exploration.md` + `04-progress.md`
Context files — what's been decided and what's been done.

Add `05-kanban.md` and `06-qa.md` when active.

### Session Rhythm

```
Start   → upload kit files (2 messages)
Work    → focus on Current State only
End     → update 01-process.md + 04-progress.md before closing
```

Two minutes of filing at session end prevents twenty minutes of
re-explanation at session start.

### Kit File Rules

- `01-process.md` — four fields only; updated every session without exception
- `02-exploration.md` — active decisions only; deprecated decisions move to `_archives/`
- `04-progress.md` — append only; entries never edited or deleted
- Closed decisions stay closed unless explicitly reopened with a new dated entry
- In Progress is always the last entry in `04-progress.md`, overwritten each session

---

## 4. Stage 2 — PRD and Specs

The PRD defines what you are building and why. It is the upstream input for
flows, contracts, and DDA.

### What Belongs Here

- Product goals and user outcomes
- Feature definitions and acceptance criteria
- Business rules and constraints
- Non-functional requirements

### What Does Not Belong Here

- Runtime paths — those go in flows
- Implementation rules — those go in contracts
- Component relationships — those go in DDA
- Code — that comes after DDA

### Handoff to Flows

When the PRD is approved, move to flows. Do not start writing DDA docs yet.
Flows and contracts must be approved before any DDA doc is written.

---

## 5. Stage 3 — Flows

Flows define every major runtime path before any component is designed.
This is where bugs are found cheapest — in plain language, before any code exists.

Every hour in flows prevents hours of debugging.

### Flow Taxonomy

Flows are defined by two independent axes:

**By scope:**

| Scope | What It Describes |
|---|---|
| Journey | End-to-end path spanning multiple components and triggers |
| Sequence | A defined series of steps within a single context |
| Operation | A single focused action, possibly just a few calls |
| Composite | A flow that calls other flows |
| Compensation | Undoing partial state changes when a multi-step flow fails |

**By trigger type:**

| Trigger | What Starts It |
|---|---|
| Request-Response | An explicit call expecting a result back |
| Event-Driven | An emitted event with no direct caller waiting |
| Background/Scheduled | Time or queue, no interactive caller |
| Reactive | A state change or subscription |
| Webhook | An external system calling back into yours |
| Stream | Continuous data — WebSocket, SSE |

Any combination is valid. A Journey can be Event-Driven. An Operation can be
Request-Response. Scope and trigger are independent.

### Flow Frontmatter

```yaml
---
id: flow-1-billing
type: flow
scope: sequence
trigger: request-response
status: draft | active
triggers: [CreateInvoiceCommand]
calls: [flow-2-validation]
emits: [InvoiceCreated, InvoiceFailed]
called-by: [flow-0-boot]
---
```

### Flow Document Structure

**Core sections — required for every flow:**

- `## What It Does` — plain language, any audience
- `## Pre-conditions` — what must be true before the flow starts
- `## Post-conditions` — what is guaranteed when the flow completes
- `## Walkthrough` — narrative above the divider, technical call chain below

**Tier additions by scope:**

| Scope | Additional Required Sections |
|---|---|
| Journey | `## Compensation`, `## Child Flows` |
| Sequence | `## Compensation` |
| Composite | `## Child Flows` |
| Operation | none |
| Compensation | none |

**Tier additions by trigger:**

| Trigger | Additional Required Sections |
|---|---|
| Event-Driven | `## Event Contract` |
| Background/Scheduled | `## Schedule`, `## Timeout Behavior` |
| Reactive | `## Subscription Contract`, `## Disconnect Behavior` |
| Webhook | `## Payload Contract`, `## Retry Behavior` |
| Stream | `## Subscription Contract`, `## Disconnect Behavior`, `## Reconnect Behavior` |
| Request-Response | none |

**`## Detail`** — always optional; present only for concurrency rules, known
constraints, or quirks that cannot be inferred from the walkthrough.

### Completion Rules

- `N/A` — section considered and does not apply
- `TODO` — section not yet documented; blocks `status: active`
- A flow cannot reach `status: active` while any required section is `TODO`

### Walkthrough Format

```
## Walkthrough

Plain language narrative — what happens and why.
Any reader understands this without technical knowledge.

---

1. On TriggerEvent(input):
   a. componentName.method(input)
      → ok: ResultType     → continue to b
      → err: ErrorType     → emit FailureEvent, halt
   b. componentName.method(result)
      → ok: ResultType     → continue to c
      → err: ErrorType     → compensate, emit FailureEvent
```

### Folder Structure

```
docs/flows/
  _index.md          → entry point and dependency map
  flow-0-boot.md
  flow-1-billing.md
  flow-1-billing/    → split when file exceeds ~150 lines
    _index.md
    validation.md
    persistence.md
```

---

## 6. Stage 4 — Contracts

Contracts extract implementation rules from flows and lock them as constraints
every component must honour. They are the downstream companion to flows and the
upstream input to DDA.

**All behavior lives in contracts. Component docs point to contracts — they
never contain behavior definitions.**

### Contract Document Structure

**Flow contracts — required sections:**

- `## Happy Path` — the expected successful execution
- `## Failure Modes` — every way this flow can fail
- `## Edge Cases` — boundary conditions and non-obvious scenarios
- `## Concurrency Rules` — atomicity, race conditions, ordering constraints
- `## Constraints` — rules every implementation must honour

**`global.md` — required sections:**

- `## Architecture Rules` — layer boundaries, module rules
- `## Auth Boundaries` — where auth is enforced and how
- `## Error Handling Rules` — Result pattern, error hierarchy, mapping
- `## Audit Requirements` — what must always be logged
- `## Cross-Cutting Constraints` — rules that apply everywhere

### Completion Rules

Same discipline as flows:
- `N/A` — considered and does not apply
- `TODO` — not yet documented; blocks `status: active`

### Splitting Large Contracts

When a contract grows beyond ~150 lines, split by concern:

```
docs/contracts/
  flow-1-billing.md        → grows large, split into:
  flow-1-billing/
    _index.md              → references all sub-contracts
    validation.md
    persistence.md
    concurrency.md
```

Component docs reference with precision — file and section:

```
Contract: docs/contracts/flow-1-billing/validation.md#failure-modes
```

### Read Order

Always read `global.md` before any flow-specific contract.
Read the flow file and its companion contract together before writing any DDA doc.

```
docs/contracts/global.md         → read first, every session
docs/flows/flow-N.md             → read the flow
docs/contracts/flow-N.md         → read the rules
```

### Folder Structure

```
docs/contracts/
  _index.md          → entry point
  global.md          → system-wide rules; read first always
  flow-1-billing.md  → companion to flows/flow-1-billing.md
```

---

## 7. Stage 5 — DDA

DDA is the technical architecture layer. It defines every component before
any code is written. The document is the contract. Code follows it.

**Never write a DDA doc without first reading the relevant flow and contract files.**

### Document Types

| Type | Owns | Key Fields |
|---|---|---|
| `structure` | Shape and manifest | `scope`, `entry`, `contains` |
| `sequencer` | Runtime flow coordination | `triggers`, `sequence`, `emits` |
| `component` | Logic unit | `parent`, `children`, `connects`, `emits` |
| `concern` | Cross-cutting capability | `affects`, `provided-by` |
| `integration` | External contract | `kind`, `used-by`, `config` |

### Universal Frontmatter Fields

All document types share:

```yaml
id:      # kebab-case — must match filename
export:  # exported name (component and sequencer only)
file:    # repo path (component and sequencer only)
type:    # component | sequencer | structure | concern | integration
status:  # draft | active | deprecated
```

### Document Structure

Every DDA doc follows progressive disclosure:

```
## What It Does
Plain language. Any reader understands this.

## Interface
Contract reference and language-agnostic signature.
Optional language-specific block below.

## Detail
Edge cases, concurrency rules, known constraints.
Only present when behavior cannot be inferred from the interface.
Omitted entirely when nothing fits.
```

### Component Frontmatter

```yaml
---
id: invoice-validator
export: InvoiceValidator
file: src/billing/invoice-validator.ts
type: component
status: active
parent: billing-sequencer
children: [line-item-checker, tax-calculator]
connects: [invoice-repository]
emits: [InvoiceValidated, InvoiceRejected]
concerns: [logging, error-handling]
---
```

### Sequencer Flow Section

```
## Flow
1. On CreateInvoiceCommand(input):
   a. invoiceValidator.validate(input)
      → ok: InvoiceValidated     → continue to b
      → err: ValidationError     → emit InvoiceRejected, halt
   b. invoiceFactory.create(validated)
      → ok: InvoiceDraft         → continue to c
      → err: FactoryError        → emit InvoiceFailed, halt
   c. invoiceRepository.save(draft)
      → ok: InvoiceCreated       → emit InvoiceCreated
      → err: PersistenceError    → compensate, emit InvoiceFailed
```

### Interface Section

```
## Interface
Contract: docs/contracts/flow-1-billing/validation.md#failure-modes

input:  CreateInvoiceInput
output: Result<InvoiceValidated, ValidationError>

```[language]
// language-specific signature
```
```

### Authoring Order

Always top-down:

```
1. .playbook/_index.md           → project manifest
2. .playbook/[app]/_index.md     → app or module manifest
3. Sequencers                    → flow coordination docs
4. Components                    → logic units
5. _concerns/                    → cross-cutting capabilities
6. _integrations/                → external contracts
```

### Status Values

| Status | Meaning |
|---|---|
| `draft` | Stub generated — not ready to code against |
| `active` | Approved — safe to code against |
| `deprecated` | No longer in use — do not reference |

### Reserved Folders

| Folder | Contains |
|---|---|
| `_concerns/` | Cross-cutting capabilities |
| `_integrations/` | Third-party services and libraries |
| `_shared/` | Components used across multiple modules |

---

## 8. Stage 6 — Code

Code is generated and maintained against Playbook contracts.
The Playbook doc is the source of truth — not the code.

### AI Boot Sequence

Every dev session loads in this order:

```
1. .playbook/00-rules.md
2. docs/code-standards.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md
6. Module and component docs as needed
```

### Scoped Context Packages

Load only what the task needs:

| Task | Load |
|---|---|
| Add new component | `00-rules.md` + `code-standards.md` + module `_index.md` + parent doc + flow + contract + `_concerns/` |
| Fix a bug | `00-rules.md` + `code-standards.md` + component doc + its connects + concerns |
| Write tests | Component doc + `code-standards.md` testing section |
| Generate rollout | Full `.playbook/` tree + `.kit/04-progress.md` |

---

## 9. Stage 7 — Rollout

Rollout docs are generated artifacts — never authored manually.

**Two purposes:**
1. Human-facing — deployment guide, release notes, migration steps
2. AI-facing — full project context snapshot for a fresh session

### Rules

- Never edit rollout docs directly — edit the source and regenerate
- One rollout doc per milestone or major release
- Use as AI context when starting a session on an existing project

---

## 10. Adopting an Existing Project

Playbook adoption is additive. Existing code stays intact throughout.

### Which Guide

- Has Context Kit files → `.playbook/.guides/adopt-with-kit.md`
- No Context Kit files → `.playbook/.guides/adopt-without-kit.md`

### Adoption Priority

```
1. _concerns/      → cross-cutting capabilities (lowest risk, high value)
2. _integrations/  → external contracts (define boundaries early)
3. _shared/        → cross-module components (reduce duplication)
4. Sequencers      → define flows before touching component code
5. Components      → align one by one; test after each
```

---

## 11. Phase Completion Checklist

Run at the end of every development phase. No phase is complete until all pass.

### Development Phase

- [ ] `biome check` — zero errors
- [ ] `biome format --write` — zero diffs
- [ ] `vitest run` — all tests pass, coverage gates met
- [ ] Playbook sync — all touched `.playbook/` docs reflect current code
- [ ] Folder trees updated — all `_index.md` Structure sections current
- [ ] Git commits — grouped by scope, all changes pushed
- [ ] Kit files updated — `01-process.md` and `04-progress.md`
- [ ] Rollout doc generated — if a milestone was completed

### Any Phase

- [ ] Decisions logged in `02-exploration.md`
- [ ] Progress logged in `04-progress.md`
- [ ] Current State updated in `01-process.md`
- [ ] Active modules declared in `01-process.md`

---

## 12. Quick Reference

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | `kebab-case.md` | `invoice-validator.md` |
| IDs | match filename | `id: invoice-validator` |
| Folders | `kebab-case` | `billing/` |
| Reserved folders | leading underscore | `_concerns/` |
| Structure docs | always `_index.md` | `billing/_index.md` |
| Events | PascalCase | `InvoicePosted` |
| Commits | scoped imperative | `playbook: add billing module` |

### Flow + Contract Conventions

| Item | Convention |
|---|---|
| Flow files | `docs/flows/flow-N-name.md` |
| Contract files | `docs/contracts/flow-N-name.md` |
| Global contract | `docs/contracts/global.md` — read first always |
| Entry points | `_index.md` in both folders |
| Max file size | ~150 lines — split if larger |

### Authoring Checklist

Before marking a doc `status: active`:

- [ ] `id` matches filename exactly
- [ ] `type` is one of the five valid types
- [ ] `file` and `export` declared (component and sequencer)
- [ ] `parent` declared (except root `_index.md`)
- [ ] All `connects` have their own Playbook doc
- [ ] All `concerns` exist in `_concerns/`
- [ ] All `integrations` exist in `_integrations/`
- [ ] `## What It Does` written in plain language
- [ ] `## Interface` references a contract file and section
- [ ] `## Flow` complete with full call chain (sequencer only)
- [ ] Structure section accurate (`structure` type)

---

_The doc is the contract. The code follows._
