# Playbook Rules
# File: .playbook/00-rules.md

---
version: 2.0
requires: docs/code-standards.md
---

> Always load `docs/code-standards.md` alongside this file.
> This file defines how to implement. `pipeline.md` defines what and why.
> Neither is complete without the other.

---

## Core Principle

**Progressive Disclosure + Tiering** is the default for every structural decision:
- Lead with plain language. Add technical depth below.
- Define a required core. Add sections only when scope or type demands them.
- Never burden simple cases with complex requirements.
- Never let complex cases skip required coverage.

When any format, template, or structure decision needs to be made — apply this first.

---

## Folder Structure

```
.playbook/
  README.md              → orientation and journey matrix
  pipeline.md            → complete pipeline reference
  00-rules.md            → this file; AI execution layer
  _index.md              → project manifest and living folder tree
  _concerns/             → cross-cutting capabilities
  _integrations/         → third-party services and libraries
  _shared/               → components used across multiple modules
  .guides/               → adoption and setup guides
  [module]/
    _index.md            → module manifest
    [component].md       → component docs
docs/
  code-standards.md      → always loaded with this file
  flows/
    _index.md            → entry point and dependency map
    global.md            → rules spanning every flow
    flow-N-name.md       → one file per flow
  contracts/
    _index.md            → entry point
    global.md            → system-wide rules; read first always
    flow-N-name.md       → companion to flows/flow-N-name.md
  rollout/               → generated snapshots; never edit directly
.kit/
  01-process.md          → session spark
  02-exploration.md      → active decisions
  03-execution.md        → guidelines, plan, tasks
  04-progress.md         → append-only progress log
  05-kanban.md           → ticketed work breakdown (optional)
  06-qa.md               → test registry and sign-off (optional)
  _refs/                 → supporting material
  _tests/                → one file per QA test case
  _archives/             → lean history
```

---

## AI Load Order

Every dev session loads in this order:

```
1. .playbook/00-rules.md          → this file
2. docs/code-standards.md         → implementation rules
3. docs/flows/_index.md           → flows entry point
4. docs/contracts/_index.md       → contracts entry point
5. .playbook/_index.md            → project shape
6. .playbook/[module]/_index.md   → module shape (as needed)
7. Component and sequencer docs   → task-scoped
8. _concerns/ + _integrations/    → cross-cutting + boundaries
```

**Scoped packages — load only what the task needs:**

| Task | Load |
|---|---|
| New component | `00-rules.md` + `code-standards.md` + module `_index.md` + parent doc + flow + contract + `_concerns/` |
| Bug fix | `00-rules.md` + `code-standards.md` + component doc + its connects + concerns |
| Write tests | Component doc + `code-standards.md` testing section |
| New DDA doc | Relevant flow + contract + parent `_index.md` |
| Rollout doc | Full `.playbook/` tree + `.kit/04-progress.md` |

---

## Document Types

### Universal Frontmatter

```yaml
id:      # kebab-case — must match filename (except _index.md)
export:  # exported name — component and sequencer only
file:    # repo path — component and sequencer only
type:    # component | sequencer | structure | concern | integration
status:  # draft | active | deprecated
```

---

### structure

Project, app, or module manifest. Always includes `## Structure` — a linked
annotated tree of everything in scope. Updated whenever components change.

```yaml
---
id: billing
type: structure
scope: module
status: active
entry: [billing-sequencer]
contains: [billing-sequencer, invoice-validator, invoice-factory]
integrations: [stripe]
concerns: [logging, auth, error-handling]
---
```

```
## What It Does
Plain language description of this module's purpose.

## Structure
- [_index.md](./_index.md) — this file; billing module manifest
- [billing-sequencer.md](./billing-sequencer.md) — coordinates invoice creation
- [invoice-validator.md](./invoice-validator.md) — validates structure and rules
- [invoice-factory.md](./invoice-factory.md) — constructs invoice domain object
```

---

### sequencer

Runtime coordinator. Owns flow and sequencing, not business logic. Always
references `docs/flows/` and `docs/contracts/` — never restates them.
Always includes `## Flow` with full call chain and all branches.

```yaml
---
id: billing-sequencer
export: BillingSequencer
file: src/billing/billing-sequencer.ts
type: sequencer
status: active
parent: billing
triggers: [CreateInvoiceCommand]
sequence: [invoice-validator, invoice-factory, invoice-repository]
emits: [InvoiceCreated, InvoiceFailed]
concerns: [logging, auth]
---
```

```
## What It Does
Coordinates the full invoice creation flow from command receipt to persistence.
Owns sequence, not logic. Stops cleanly on any failure.

## Flow
References: docs/flows/flow-1-billing.md + docs/contracts/flow-1-billing.md

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

## Detail
[Only present when concurrency rules, timeouts, or constraints exist
that cannot be inferred from the flow. Omit entirely if not needed.]
```

---

### component

Single unit of logic. One responsibility. Never throws in business logic —
returns typed Result. References contract for behavior definition.

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

```
## What It Does
Checks whether an invoice is valid before it gets created.
If anything is wrong — missing line items, bad totals — it stops
the process and explains why.

## Interface
Contract: docs/contracts/flow-1-billing/validation.md#failure-modes

input:  CreateInvoiceInput
output: Result<InvoiceValidated, ValidationError>

```[typescript]
function validate(input: CreateInvoiceInput): Result<InvoiceValidated, ValidationError>
```

## Detail
[Edge cases, concurrency constraints, known quirks that would cause bugs
if a developer missed them. Omit entirely if nothing fits.]
```

---

### concern

Cross-cutting capability that multiple components depend on.

```yaml
---
id: logging
type: concern
status: active
affects: all
provided-by: internal
---
```

```
## What It Does
Structured logging available to all components via DI container.
Never called directly — always injected.
```

---

### integration

External service or library contract.

```yaml
---
id: stripe
type: integration
kind: external-service
status: active
used-by: [billing-sequencer, invoice-repository]
config: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET]
docs: https://stripe.com/docs
---
```

```
## What It Does
Handles payment processing and webhook events.
All interactions go through BillingSequencer only.
```

---

## Flow Document Format

```yaml
---
id: flow-1-billing
type: flow
scope: sequence
trigger: request-response
status: draft
triggers: [CreateInvoiceCommand]
calls: []
emits: [InvoiceCreated, InvoiceFailed]
called-by: []
---
```

**Core sections — required for every flow:**
- `## What It Does` — plain language
- `## Pre-conditions` — what must be true before the flow starts
- `## Post-conditions` — what is guaranteed on completion
- `## Walkthrough` — narrative + technical call chain (separated by `---`)

**Additional sections by scope:**

| Scope | Add |
|---|---|
| Journey | `## Compensation`, `## Child Flows` |
| Sequence | `## Compensation` |
| Composite | `## Child Flows` |

**Additional sections by trigger:**

| Trigger | Add |
|---|---|
| Event-Driven | `## Event Contract` |
| Background/Scheduled | `## Schedule`, `## Timeout Behavior` |
| Reactive | `## Subscription Contract`, `## Disconnect Behavior` |
| Webhook | `## Payload Contract`, `## Retry Behavior` |
| Stream | `## Subscription Contract`, `## Disconnect Behavior`, `## Reconnect Behavior` |

`## Detail` — always optional.
`N/A` — considered, does not apply.
`TODO` — not documented; **blocks `status: active`**.

---

## Contract Document Format

**Flow contract — required sections:**
- `## Happy Path`
- `## Failure Modes`
- `## Edge Cases`
- `## Concurrency Rules`
- `## Constraints`

**`global.md` — required sections:**
- `## Architecture Rules`
- `## Auth Boundaries`
- `## Error Handling Rules`
- `## Audit Requirements`
- `## Cross-Cutting Constraints`

Same `N/A` / `TODO` discipline. `TODO` blocks `status: active`.

When a contract grows beyond ~150 lines, split by concern into a sub-folder
with `_index.md` referencing all parts.

Component docs reference contracts with precision:
```
Contract: docs/contracts/flow-1-billing/validation.md#failure-modes
```

---

## Behavioral Rules

```
1.  Never write a DDA doc without first reading the relevant flow and contract
2.  Never write code for a component without its Playbook doc
3.  Never add a dependency not declared in connects or integrations
4.  Never create a component that duplicates an existing responsibility
5.  Always implement against the declared interface in the doc
6.  Flag any doc with status: draft before coding against it
7.  Suggest _shared/ when a component appears in multiple modules
8.  Run sync mode before closing any task
9.  Confirm all touched Playbook docs are current before every PR
10. Cross-check new components against _shared/ before creating module-level ones
11. Flag missing connects, emits, or children as TODO during generation
12. Update the living folder tree in _index.md when components change
13. Flows and contracts must be approved before any DDA doc is authored
14. Apply Progressive Disclosure + Tiering to every structural decision
15. Prefer native implementations over external libraries
16. External dependencies require explicit justification before adoption
```

---

## Authoring Order

**Planned path (preferred):**
```
Context Kit → PRD → Flows → Contracts → DDA → Code
```

**Emergent path (acceptable — for components discovered during development):**
```
DDA → Code   (document immediately, then code)
```

**Prohibited:**
```
DDA doc without an approved flow and contract — never
Code without a DDA doc — never
```

---

## Session Start

```
Before any work, load in order:
1. .playbook/00-rules.md
2. docs/code-standards.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md

Confirm understanding. Then wait for instruction.
```

---

## Session End

```
Before closing:
1. Run Playbook sync check on all docs touched this session
2. Update .kit/04-progress.md — completions, decisions, fixes
3. Update Current State in .kit/01-process.md
4. Update living folder tree if components changed
```

---

## Error Recovery

```
Something broke. Stop all other work.

1. Identify   — type error | test failure | Playbook drift | layer violation | other
2. Isolate    — code, Playbook doc, or both?
3. Fix        — resolve at source; do not patch symptoms
4. Verify     — re-run checks before continuing
5. Log        — Fixed entry in .kit/04-progress.md
```

**Context rot** — if AI ignores uploaded files mid-session:
```
Stop. Re-upload session files.
Re-read .playbook/00-rules.md and docs/code-standards.md.
If rot persists, start a fresh session with a rollout doc as context.
```
