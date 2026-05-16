---
version: 1.0
requires: docs/code-standards.md
---

# Playbook — Architecture Reference

> Always load `docs/code-standards.md` alongside this file.
> This file defines structure. Code standards defines implementation.
> Neither is complete without the other.

---

## What It Is

Playbook is a pipeline where every component is defined in a structured document
before code is written. The document is the contract. AI generates code from it,
not ahead of it.

```
Context Kit   →   PRD / Specs   →   DDA   →   Code   →   Rollout
```

---

## Folder Structure

```
.playbook/
  00-playbook.md         — this file; always read first
  _index.md              — project manifest and living folder tree
  _concerns/             — cross-cutting capabilities
  _integrations/         — third-party services and libraries
  _shared/               — components used across multiple modules
  [module]/
    _index.md            — module manifest and folder tree
    [component].md       — individual component docs
docs/
  code-standards.md      — always loaded with this file
  playbook-guide.md      — complete pipeline reference
  rollout/               — generated snapshots; never edit directly
kit/
  00-prompts.md          — session start prompts
  01-process.md          — workflow rules and current state
  02-exploration.md      — open questions and decisions
  03-execution.md        — guidelines, plan, tasks
  04-progress.md         — append-only progress log
  05-kanban.md           — ticketed work breakdown (optional)
  06-qa.md               — test cases and sign-off (optional)
PLAYBOOK.md              — pipeline starter; read first on any new machine
```

Rules:
- `_index.md` is the manifest at every level — project and module
- `_concerns/`, `_integrations/`, `_shared/` always live at `.playbook/` root
- Files: `kebab-case.md` — IDs must match filenames exactly
- Folders: `kebab-case` — reserved folders use leading underscore
- Max folder depth: 2 levels unless a module grows complex

---

## Document Types

### Universal Fields

All types share:

```
id:      # kebab-case — must match filename
type:    # component | orchestrator | structure | concern | integration
status:  # draft | active | deprecated
```

---

### structure

Project or module manifest. Defines scaffold, shape, and the living folder tree.

```
---
id: billing-module
type: structure
scope: module
status: active
entry: [billing-orchestrator]
contains: [billing-orchestrator, invoice-validator, invoice-factory, invoice-repository]
integrations: [stripe]
concerns: [logging, auth, error-handling]
---
Owns all invoice lifecycle operations from creation to posting.
Exposes functionality only through its orchestrators.
Nothing outside this module imports directly from it.

## Structure

- [_index.md](./_index.md) — this file; billing module manifest
- [billing-orchestrator.md](./billing-orchestrator.md) — coordinates invoice creation flow
- [invoice-validator.md](./invoice-validator.md) — validates structure and business rules
- [invoice-factory.md](./invoice-factory.md) — constructs invoice domain object
- [invoice-repository.md](./invoice-repository.md) — persists and retrieves invoices
```

---

### orchestrator

A runtime shell that sequences components. Owns flow, not logic.
Always includes a Flow section and a Mermaid diagram in Detail.

```
---
id: billing-orchestrator
type: orchestrator
status: active
parent: billing-module
triggers: [CreateInvoiceCommand]
sequence: [invoice-validator, invoice-factory, invoice-repository]
emits: [InvoiceCreated]
concerns: [logging, auth]
---
Coordinates the full invoice creation flow. Owns sequence, not logic.

## Flow

1. `CreateInvoiceCommand` — triggers this orchestrator
2. [invoice-validator](./invoice-validator.md) — validates structure and rules → `InvoiceValidated` or fails
3. [invoice-factory](./invoice-factory.md) — constructs domain object → `InvoiceDraft`
4. [invoice-repository](./invoice-repository.md) — persists to DB → `InvoiceCreated`
5. `InvoiceCreated` — emitted on success

## Detail

sequenceDiagram
  Command->>BillingOrchestrator: CreateInvoiceCommand
  BillingOrchestrator->>InvoiceValidator: validate()
  InvoiceValidator-->>BillingOrchestrator: InvoiceValidated
  BillingOrchestrator->>InvoiceFactory: create()
  InvoiceFactory-->>BillingOrchestrator: InvoiceDraft
  BillingOrchestrator->>InvoiceRepository: save()
  InvoiceRepository-->>BillingOrchestrator: InvoiceCreated
```

---

### component

A single unit of logic — service, entity, handler, use case, repository.

```
---
id: invoice-validator
type: component
status: active
parent: billing-orchestrator
children: [line-item-checker, tax-calculator]
connects: [invoice-repository]
emits: [InvoiceValidated, InvoiceRejected]
concerns: [logging, error-handling]
---
Validates invoice structure and business rules before posting.
Checks line item balances, tax calculations, and required fields.
Returns a typed Result — never throws.

## Detail
<!-- Expanded spec, edge cases, clarifications -->
```

---

### concern

A cross-cutting capability that multiple components depend on.

```
---
id: logging
type: concern
status: active
affects: all
provided-by: internal
---
Structured logging available to all components.
Writes JSON-formatted logs with trace IDs.
Never called directly — injected via DI container.

## Detail
<!-- Configuration, log levels, output format -->
```

---

### integration

A third-party service or external library contract.

```
---
id: stripe
type: integration
kind: external-service
status: active
used-by: [payment-orchestrator, invoice-repository]
config: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET]
docs: https://stripe.com/docs
---
Handles payment processing and webhook events.
All interactions go through PaymentOrchestrator only.
No other component imports or calls Stripe directly.

## Detail
<!-- Webhook events handled, error codes, rate limits -->
```

---

## Authoring Rules

Planned path (preferred):
```
Context Kit → PRD/Spec → Playbook doc → Code
```

Emergent path (acceptable):
```
Playbook doc → Code   (document immediately, then code)
```

Prohibited:
```
Code without a Playbook doc — never
```

---

## Generation Modes

Bootstrap — generate full scaffold from PRD:
```
Given this PRD [attach], generate the Playbook scaffold.
Produce _index.md for the project and each module.
Create stub docs for all identifiable components, orchestrators,
concerns, and integrations. Mark all stubs as status: draft.
Flag anything underspecified.
```

Authoring — add a new component:
```
Given this parent doc [attach _index.md], create a Playbook [type] doc
for [plain description]. Flag any missing relationships.
```

Sync — update a doc when code drifts:
```
This Playbook doc [attach] no longer reflects the implementation.
Here is what changed: [description]. Update it.
Note the change in the Detail section.
```

---

## AI Ingestion Load Order

```
1. .playbook/00-playbook.md          — this file
2. docs/code-standards.md            — implementation rules
3. .playbook/_index.md               — project shape
4. .playbook/[module]/_index.md      — module shape
5. Relevant component docs           — specific context
6. _concerns/ + _integrations/       — dependencies
```

Scoped packages — load only what the task needs:

```
New component:   00-playbook.md + code-standards.md + module _index.md + parent doc + _concerns/
Bug fix:         00-playbook.md + code-standards.md + component doc + its connects + concerns
Rollout doc:     Full .playbook/ tree + 04-progress.md
Write tests:     Component doc + code-standards.md (testing section)
```

---

## AI Behavioral Rules

```
1.  Never write code for a component without its Playbook doc
2.  Never add a dependency not declared in connects or integrations
3.  Never create a component that duplicates an existing responsibility
4.  Always implement against the declared interface in the doc
5.  Flag any doc with status: draft before coding against it
6.  Suggest _shared/ when a component is referenced across modules
7.  Run sync mode before closing any task
8.  Confirm all touched Playbook docs are current before every PR
9.  Cross-check new components against _shared/ before creating module-level ones
10. Flag missing connects, emits, or children as TODO during generation
11. Update the living folder tree in _index.md when components are added or removed
```

---

## Living Folder Tree

Every `_index.md` maintains a Structure section — a linked, annotated tree
of everything in that scope. Update it whenever components are added, removed,
or renamed. AI updates this automatically in sync mode.

Format:
```
## Structure

- [_index.md](./_index.md) — [one line description]
- [component.md](./component.md) — [one line description]
- [sub-module/](./ sub-module/)
  - [_index.md](./sub-module/_index.md) — [one line description]
```

---

## Orchestrator Flow

Every orchestrator doc includes:

1. A Flow section in the body — annotated numbered sequence with linked components.
   This is the primary reference. Edit here; code follows via sync.

2. A Mermaid sequence diagram in Detail — visual representation.
   Keep it in sync with the Flow section above it.

---

## Phase Completion Checklist

Run at the end of every development phase:

```
1. biome check        — zero errors
2. biome format       — zero diffs
3. vitest run         — all pass, coverage gates met
4. Playbook sync      — all touched .playbook/ docs reflect current code
5. Folder trees       — all _index.md Structure sections are current
6. Git commits        — grouped by scope; all changes pushed
7. Kit files          — 01-process.md, 03-execution.md, 04-progress.md updated
8. Rollout doc        — generated if a milestone completed
```

---

## Error Mitigation

Categories and responses:

```
Type errors          — fix immediately; do not suppress
Biome failures       — fix before commit; never bypass
Test failures        — fix before merging; no exceptions
Playbook drift       — run sync mode; update doc then verify code
Coverage drop        — add missing tests before PR
Layer violation      — refactor immediately; do not defer
Emergent component   — author Playbook doc first; then continue
```

Immediate response protocol:
```
1. Stop      — do not accumulate changes on a broken state
2. Identify  — what category?
3. Isolate   — code, doc, or both?
4. Fix       — resolve at source; do not patch symptoms
5. Verify    — re-run Phase Completion Checklist
6. Log       — add Fixed entry to 04-progress.md
```
