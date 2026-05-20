#!/usr/bin/env node
// File: create-playbook/bin/index.js

import { createInterface } from 'readline'
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

// ─── CLI Helpers ─────────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, output: process.stdout })

const ask = (question) =>
	new Promise((resolve) =>
		rl.question(question, (answer) => resolve(answer.trim())),
	)

const confirm = async (question) => {
	const answer = await ask(`${question} (Y/n): `)
	return answer.toLowerCase() !== 'n'
}

const choose = async (question, options) => {
	console.log(`\n${question}`)
	options.forEach((opt, i) => console.log(`  ${i + 1}) ${opt}`))
	const answer = await ask('Enter number: ')
	const index = parseInt(answer, 10) - 1
	return options[index] ?? options[0]
}

const log = {
	info: (msg) => console.log(`\x1b[36m${msg}\x1b[0m`),
	success: (msg) => console.log(`\x1b[32m✔ ${msg}\x1b[0m`),
	warn: (msg) => console.log(`\x1b[33m⚠ ${msg}\x1b[0m`),
	error: (msg) => console.log(`\x1b[31m✘ ${msg}\x1b[0m`),
	blank: () => console.log(''),
}

const write = (filePath, content) => {
	const dir = filePath.substring(0, filePath.lastIndexOf('/'))
	if (dir) mkdirSync(dir, { recursive: true })
	writeFileSync(filePath, content, 'utf8')
	log.success(filePath.replace(process.cwd() + '/', ''))
}

const mkdir = (dirPath) => {
	mkdirSync(dirPath, { recursive: true })
	write(`${dirPath}/.gitkeep`, '')
}

// ─── Templates ───────────────────────────────────────────────────────────────

const t = {
	// PLAYBOOK.md — repo root pipeline starter
	playbookRoot: (projectName) => `# Playbook

The complete pipeline for this project — from idea to deployed code.

---

## What Is Playbook?

Playbook is a structured development pipeline that keeps humans and AI aligned
at every stage of a project. It combines project management, flows and contracts,
architecture documentation, and code standards into a single coherent system.

Everything is defined before it is built. Everything built is reflected in the docs.
Nothing drifts silently.

---

## The Pipeline

\`\`\`
Context Kit -> PRD/Spec -> Flows (docs/flows/) -> Contracts (docs/contracts/) -> DDA -> Code -> Rollout
\`\`\`

| Stage | What It Is | Where It Lives |
|---|---|---|
| Context Kit | Thinking, decisions, project management | \`.kit/\` |
| PRD / Specs | What to build and why | \`docs/\` |
| Flows | Runtime paths (split into small files) | \`docs/flows/\` |
| Contracts | Implementation boundaries (split into small files) | \`docs/contracts/\` |
| DDA | How it is structured and how parts relate | \`.playbook/\` |
| Code | Implementation | \`src/\` |
| Rollout | Generated snapshots for support and AI context | \`docs/rollout/\` |

---

## Where to Start

### New project
1. Read \`docs/playbook-guide.md\`
2. Upload \`.kit/01-process.md\` + \`.kit/03-execution.md\` to start your first Context Kit session
3. Work through the pipeline stage by stage

### Existing project (adopting Playbook)
1. Read \`guides/adopt-with-kit.md\` or \`guides/adopt-without-kit.md\`
2. Run the structured audit prompt
3. Scaffold \`.playbook/\` around existing code — nothing breaks

### Resuming work
1. Upload your current kit files and relevant \`.playbook/\` docs
2. Use the session prompts in \`.kit/00-prompts.md\`

---

## Key Files

| File | Read When |
|---|---|
| \`.playbook/00-playbook.md\` | Start of every AI dev session |
| \`docs/code-standards.md\` | Always paired with \`00-playbook.md\` |
| \`docs/flows/_index.md\` | Before writing any sequencer or flow-related DDA doc |
| \`docs/contracts/_index.md\` | Alongside flows; before DDA and code changes |
| \`.playbook/_index.md\` | Understanding project structure |
| \`.kit/00-prompts.md\` | Starting or resuming any session |
| \`docs/playbook-guide.md\` | Learning the full pipeline |

---

## Rules

- Nothing gets coded without a \`.playbook/\` doc
- Flows and contracts must be approved before any DDA docs are written
- Docs stay in sync with code — run sync before every PR
- All code passes Biome check and format before commit
- Kit files are updated at the end of every session
- Progress log is append-only — never edit past entries

---

*The doc is the contract. The code follows.*
`,

	// .playbook/00-playbook.md — AI boot file
	playbookAI: () => `---
version: 1.1
requires: docs/code-standards.md
---

# Playbook — Architecture Reference

> Always load \`docs/code-standards.md\` alongside this file.
> This file defines structure. Code standards defines implementation.
> Neither is complete without the other.

---

## What It Is

Playbook is a pipeline where every component is defined in a structured document
before code is written. The document is the contract. AI generates code from it,
not ahead of it.

Pipeline:
Context Kit -> PRD/Spec -> Flows (docs/flows/) -> Contracts (docs/contracts/) -> DDA -> Code -> Rollout

---

## Folder Structure

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
  flows/
    _index.md            — entry point; table of all flow files
    global.md            — rules that apply to every flow
    flow-*.md            — one file per flow
  contracts/
    _index.md            — entry point; table of all contract files
    global.md            — read first always; architecture + audit rules
    flow-*.md            — companion contract to each flow file
  playbook-guide.md      — complete pipeline reference
  rollout/               — generated snapshots; never edit directly
.kit/
  00-prompts.md          — session start prompts
  01-process.md          — workflow rules and current state
  02-exploration.md      — open questions and decisions
  03-exploration.md      — guidelines, plan, tasks
  04-progress.md         — append-only progress log
  05-kanban.md           — ticketed work breakdown (optional)
  06-qa.md               — test cases and sign-off (optional)
PLAYBOOK.md              — pipeline starter; read first on any new machine

Rules:
- _index.md is the manifest at every level — project and module
- _concerns/, _integrations/, _shared/ always live at .playbook/ root
- Files: kebab-case.md — IDs must match filenames exactly
- Folders: kebab-case — reserved folders use leading underscore
- Max ~150 lines per file — split if larger
- No god-components — one responsibility per component, file, doc

---

## Document Types

Universal fields — all types share:

  id:      # kebab-case — must match filename
  type:    # component | sequencer | structure | concern | integration
  status:  # draft | active | deprecated

---

### structure

Project or module manifest. Defines scaffold, shape, and the living folder tree.
Always includes a Structure section — linked annotated tree of everything in scope.

  ---
  id: billing-module
  type: structure
  scope: module
  status: active
  entry: [billing-sequencer]
  contains: [billing-sequencer, invoice-validator, invoice-factory]
  integrations: [stripe]
  concerns: [logging, auth, error-handling]
  ---
  Owns all invoice lifecycle operations from creation to posting.
  Exposes functionality only through its sequencers.

  ## Structure

  - [_index.md](./_index.md) — this file; billing module manifest
  - [billing-sequencer.md](./billing-sequencer.md) — coordinates invoice creation flow
  - [invoice-validator.md](./invoice-validator.md) — validates structure and business rules
  - [invoice-factory.md](./invoice-factory.md) — constructs invoice domain object

---

### sequencer

A runtime coordinator that sequences components. Owns flow, not logic.
Always references docs/flows/ and docs/contracts/ rather than restating them.
Always includes a Flow section and (optionally) a Mermaid diagram in Detail.

  ---
  id: billing-sequencer
  type: sequencer
  status: active
  parent: billing-module
  triggers: [CreateInvoiceCommand]
  sequence: [invoice-validator, invoice-factory, invoice-repository]
  emits: [InvoiceCreated]
  concerns: [logging, auth]
  ---
  Coordinates the full invoice creation flow. Owns sequence, not logic.
  References docs/flows/flow-billing.md and docs/contracts/flow-billing.md.

  ## Flow

  1. Load docs/flows/flow-billing.md + docs/contracts/flow-billing.md
  2. On CreateInvoiceCommand:
     a. [invoice-validator](./invoice-validator.md) — validates structure -> InvoiceValidated or fails
     b. [invoice-factory](./invoice-factory.md) — constructs domain object -> InvoiceDraft
     c. [invoice-repository](./invoice-repository.md) — persists to DB -> InvoiceCreated
  3. InvoiceCreated emitted on success

  ## Detail

  sequenceDiagram
    Command->>BillingSequencer: CreateInvoiceCommand
    BillingSequencer->>InvoiceValidator: validate()
    InvoiceValidator-->>BillingSequencer: InvoiceValidated
    BillingSequencer->>InvoiceFactory: create()
    InvoiceFactory-->>BillingSequencer: InvoiceDraft
    BillingSequencer->>InvoiceRepository: save()
    InvoiceRepository-->>BillingSequencer: InvoiceCreated

---

### component

A single unit of logic — service, entity, handler, use case, repository.

  ---
  id: invoice-validator
  type: component
  status: active
  parent: billing-sequencer
  children: [line-item-checker, tax-calculator]
  connects: [invoice-repository]
  emits: [InvoiceValidated, InvoiceRejected]
  concerns: [logging, error-handling]
  ---
  Validates invoice structure and business rules before posting.
  Returns a typed Result — never throws.

  ## Detail
  Expanded spec, edge cases, clarifications — only read when needed

---

### concern

A cross-cutting capability that multiple components depend on.

  ---
  id: logging
  type: concern
  status: active
  affects: all
  provided-by: internal
  ---
  Structured logging available to all components.
  Never called directly — injected via DI container.

---

### integration

A third-party service or external library contract.

  ---
  id: stripe
  type: integration
  kind: external-service
  status: active
  used-by: [payment-sequencer, invoice-repository]
  config: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET]
  docs: https://stripe.com/docs
  ---
  Handles payment processing and webhook events.
  All interactions go through PaymentSequencer only.

---

## Authoring Rules

Planned path (preferred):
  Context Kit -> PRD/Spec -> Flows/Contracts -> DDA -> Code

Emergent path (acceptable):
  DDA -> Code   (document immediately, then code)

Prohibited:
  DDA doc without an approved flow — never
  Code without a DDA doc — never

---

## AI Ingestion Load Order

  1. .playbook/00-playbook.md          — this file
  2. docs/code-standards.md            — implementation rules
  3. docs/flows/_index.md              — flows entry point (as needed)
  4. docs/contracts/_index.md          — contracts entry point (as needed)
  5. .playbook/_index.md               — project shape
  6. .playbook/[module]/_index.md      — module shape
  7. Relevant component/sequencer docs — task-scoped
  8. _concerns/ + _integrations/       — cross-cutting + boundaries

Scoped packages:
  New component:   00-playbook.md + code-standards.md + module _index.md + parent doc + _concerns/
  Bug fix:         00-playbook.md + code-standards.md + component doc + its connects + concerns
  Rollout doc:     Full .playbook/ tree + 04-progress.md
  DDA doc:         Relevant flow file + contract file + parent _index.md

---

## AI Behavioral Rules

1.  Never write a DDA doc without first reading the relevant flow and contract files
2.  Never write code for a component without its Playbook doc
3.  Never add a dependency not declared in connects or integrations
4.  Never create a component that duplicates an existing responsibility
5.  Always implement against the declared interface in the doc
6.  Flag any doc with status: draft before coding against it
7.  Suggest _shared/ when a component is referenced across modules
8.  Run sync mode before closing any task
9.  Confirm all touched Playbook docs are current before every PR
10. Cross-check new components against _shared/ before creating module-level ones
11. Flag missing connects, emits, or children as TODO during generation
12. Update the living folder tree in _index.md when components change
13. Flows and contracts are locked before any DDA docs are authored

---

## Phase Completion Checklist

Run at the end of every development phase:

  1. biome check        — zero errors
  2. biome format       — zero diffs
  3. vitest run         — all pass, coverage gates met
  4. Playbook sync      — all touched .playbook/ docs reflect current code
  5. Folder trees       — all _index.md Structure sections are current
  6. Kit files          — 01-process.md, 03-execution.md, 04-progress.md updated
  7. Rollout doc        — generated if a milestone completed

---

## Error Mitigation

Categories:
  Type errors         — fix immediately; do not suppress
  Biome failures      — fix before commit; never bypass
  Test failures       — fix before merging; no exceptions
  Playbook drift      — run sync mode; update doc then verify code
  Coverage drop       — add missing tests before PR
  Layer violation     — refactor immediately; do not defer
  Emergent component  — author Playbook doc first; then continue

Immediate response protocol:
  1. Stop      — do not accumulate changes on a broken state
  2. Identify  — what category?
  3. Isolate   — code, doc, or both?
  4. Fix       — resolve at source; do not patch symptoms
  5. Verify    — re-run Phase Completion Checklist
  6. Log       — add Fixed entry to 04-progress.md
`,

	// .playbook/_index.md — project manifest with living tree
	projectIndex: (projectName) => `---
id: ${projectName}
type: structure
scope: project
status: draft
entry: []
modules: []
concerns: [logging, error-handling, auth]
integrations: []
---
<!-- TODO: Describe the project purpose in one paragraph -->

## Structure

- [PLAYBOOK.md](../PLAYBOOK.md) — pipeline starter and project overview
- [.playbook/](./)
  - [00-playbook.md](./00-playbook.md) — Playbook rules; read first every AI session
  - [_index.md](./_index.md) — this file; project manifest and folder tree
  - [_concerns/](./_concerns/)
    - [logging.md](./_concerns/logging.md) — structured JSON logging via DI
    - [error-handling.md](./_concerns/error-handling.md) — typed Result pattern across all layers
    - [auth.md](./_concerns/auth.md) — permission checks at orchestrator boundaries
  - [_integrations/](./_integrations/) — (empty — add as integrations are defined)
  - [_shared/](./_shared/) — (empty — add cross-module components here)
- [docs/](../docs/)
  - [code-standards.md](../docs/code-standards.md) — implementation rules; always paired with 00-playbook.md
  - [playbook-guide.md](../docs/playbook-guide.md) — complete pipeline reference
  - [flows/](../docs/flows/)
    - [_index.md](../docs/flows/_index.md) — flows entry point
    - [global.md](../docs/flows/global.md) — rules that apply to every flow
  - [contracts/](../docs/contracts/)
    - [_index.md](../docs/contracts/_index.md) — contracts entry point
    - [global.md](../docs/contracts/global.md) — architecture + audit rules; read first always
  - [rollout/](../docs/rollout/) — generated milestone snapshots; never edit directly
- [.kit/](../.kit/)
  - [00-prompts.md](../.kit/00-prompts.md) — session start prompts
  - [01-process.md](../.kit/01-process.md) — workflow rules and current state
  - [02-exploration.md](../.kit/02-exploration.md) — open questions and closed decisions
  - [03-execution.md](../.kit/03-execution.md) — guidelines, plan, and tasks
  - [04-progress.md](../.kit/04-progress.md) — append-only progress log
  - [05-kanban.md](../.kit/05-kanban.md) — ticketed work breakdown (optional)
  - [06-qa.md](../.kit/06-qa.md) — test cases and sign-off (optional)

## Detail
<!-- Architecture decisions, constraints, known assumptions -->
`,

	// Concern template
	concern: (id, narrative) => `---
id: ${id}
type: concern
status: active
affects: all
provided-by: internal
---
${narrative}

## Detail
<!-- Configuration, usage notes, examples -->
`,

	// docs/flows/_index.md
	flowsIndex: () => `# Flows Index

> All major runtime paths for this project.
> Each flow is a separate file — read only what you need.
> Flows are defined before any DDA docs are written.
> Update individual flow files when runtime paths change.

---

## Flow Files

| File | Flow | Summary |
|------|------|---------|
| global.md | Global rules | Rules that apply to every flow |

## Rules
- Read the relevant flow file before writing its DDA doc
- Read docs/contracts/_index.md alongside any flow
- Never write component code without both flow and DDA doc approved
- Update flow files when implementation decisions change
- Individual files kept small — one flow per file; max ~150 lines
`,

	// docs/contracts/_index.md
	contractsIndex: () => `# Contracts Index

> Implementation contracts companion to flows.
> Read alongside the relevant flow file.
> Referenced by DDA component docs — not repeated in them.
> Update when decisions change.

---

## Contract Files

| File | Scope |
|------|-------|
| global.md | Applies to every flow and component |

## Rule
Always read global.md first.
Then read the flow-specific contract file.
Then read the flow file.
Then write the DDA doc.
`,

	// docs/flows/global.md
	flowsGlobal: () => `# Global Flow Rules

> Applies to every flow in this project.
> Read before any flow-specific file.

---

<!-- TODO: Define rules that span every runtime path -->
<!-- Examples: audit requirements, error handling conventions,
     auth boundaries, retry policies, timeout behaviour -->
`,

	// docs/contracts/global.md
	contractsGlobal: (language) => `# Global Contracts

> Applies to every flow, every component, every layer.
> Read this before any flow-specific contract.

---

## Architecture

\`\`\`
Domain:          pure logic, no I/O, no framework
Application:     use cases + port interfaces only
Infrastructure:  implements ports, all I/O here
Service adapters: only place concrete tech appears
Presentation:    thin — HTTP, SSE, CLI only
No cross-layer imports — enforced at DDA authoring
No god-components — one responsibility per component
Max ~150 lines per file — split if larger
All third-party services behind IProvider interfaces
\`\`\`

## Audit

\`\`\`
Every significant action audited without exception
Always: async, non-blocking
Audit failures never block execution
Progress events: logged not audited (too frequent)
\`\`\`

## Code Standards

\`\`\`
Primary language: ${language}
No any, no !, no raw throw in Domain/Application
Result<T,E> — no raw throws in Domain/Application
Named exports only (except framework contracts)
Structured logging — no console.log
\`\`\`
`,

	// code-standards.md
	codeStandards: (language) => `# Code Standards

> Canonical reference for all projects.
> Always load alongside \`.playbook/00-playbook.md\` — Playbook defines structure, this defines implementation.

---

## Language

Primary: ${language}

---

## 1. Architecture Patterns

- Clean Architecture — strict layer separation: Domain -> Application -> Infrastructure -> Interface
- Domain-Driven Design (DDD) — domain model reflects business language and rules
- Event-Driven — state changes via domain events, never direct coupling
- Dependency Injection — dependencies injected, never instantiated inside consumers
- Deep Modules — rich internal behavior behind minimal, stable interfaces

Layer rules:
  Domain           -> pure business logic; no framework, no DB, no network
  Application      -> use cases; orchestrates domain; depends on interfaces only
  Infrastructure   -> defines interfaces and abstractions; no concrete SDK imports
  Service Adapters -> only place concrete technologies appear
  Interface        -> tRPC routers, WebSocket handlers; thin translation layer only

- No cross-layer imports
- No direct module-to-module imports — all cross-module calls go through gateway
- Shared logic lives in _shared/ (Playbook) or /packages — never copy-pasted

---

## 2. TypeScript Strictness

Compiler config:
  strict: true
  noUncheckedIndexedAccess: true
  noImplicitOverride: true
  exactOptionalPropertyTypes: true

Rules:
- No any type — anywhere, ever
- No type assertions (as SomeType) except at adapter boundaries with inline justification
- Use satisfies over as where applicable
- Explicit return types on all public functions
- No non-null assertions (!) — handle nullability explicitly
- Zod schemas at every external boundary
- No magic strings or numbers — use const enums or literal union types

---

## 3. Error Handling

All Domain and Application functions return Result<T, E>. No raw throw outside Infrastructure and Interface.

  export type Result<T, E> =
    | { readonly ok: true; readonly value: T }
    | { readonly ok: false; readonly error: E };

Error hierarchy:
  BaseError (base)
  +-- DomainError         — invariant violations, business rule failures
  +-- ApplicationError    — use case failures (not-found, unauthorized, conflict)
  +-- InfrastructureError — DB failures, network errors, external service failures

---

## 4. Code Hygiene

- One function, one responsibility — max ~20 lines; extract if longer
- No deeply nested conditionals — use guard clauses
- No side effects in pure functions
- No commented-out code — delete it; version control preserves history
- Named exports only — no default exports
- No barrel index.ts re-exports — import explicitly from the source file
- No circular imports

---

## 5. Naming Conventions

  Files:             kebab-case          create-invoice.use-case.ts
  Classes / Types:   PascalCase          InvoiceRepository
  Functions:         camelCase           createInvoice()
  Constants:         SCREAMING_SNAKE     MAX_LINE_ITEMS
  Events:            PascalCase          InvoicePosted
  Use cases:         verb + noun         CreateInvoiceUseCase
  Repositories:      noun + Repository   InvoiceRepository
  Errors:            noun + Error        InvoiceNotFoundError

Module-scoped:
  tRPC routes:   module.resource.action    accounting.invoices.create
  Events:        [Module][Entity][Action]  AccountingInvoicePosted
  DB tables:     [module]_[table]          accounting_invoices
  Permissions:   [module]:[action]         accounting:create-invoice

---

## 6. Testing Strategy

Tools:
- Vitest — unit and integration tests
- Playwright — E2E tests
- MSW — mock HTTP and WebSocket in integration tests

Coverage gates (enforced in CI):
  Domain:            100%  — unit tests; pure functions
  Application:       90%+  — integration tests with mocked adapters
  Infrastructure:    integration tests against real DB in CI
  Interface:         key paths + error mapping

Build fails if Domain < 100% or Application < 90%.

---

## 7. Git Workflow

Branch patterns:
  feature/[scope]/[description]   feature/accounting/add-invoice-search
  fix/[scope]/[description]       fix/accounting/invoice-date-validation
  milestone/[number]-[name]       milestone/1-platform-core
  chore/[description]             chore/update-dependencies

- main is always deployable
- Branch from main; merge via PR only
- Delete branches after merge

Commit format: [scope]: short imperative description
  accounting: add invoice line item validation
  playbook: add billing module docs
  kit: update progress log and current state
  fix(auth): handle expired session token

PR checklist:
  - [ ] biome check passes — zero errors
  - [ ] biome format applied — zero diffs
  - [ ] No cross-layer violations
  - [ ] Typed errors — no raw throw in Domain/Application
  - [ ] Tests included for new behavior
  - [ ] No TODO/FIXME in committed code
  - [ ] Playbook sync check — all touched .playbook/ docs reflect current code
  - [ ] Folder trees updated — all _index.md Structure sections are current
  - [ ] Kit files updated if phase or state changed

---

## 8. Tooling

Biome — single tool for linting and formatting. Replaces ESLint + Prettier.
  linter:          enabled; rules: recommended
  formatter:       enabled; indentStyle: space; indentWidth: 2
  organizeImports: enabled

- All code must pass biome check and biome format before commit
- Configure as pre-commit hook — never commit code that fails Biome
- CI fails on Biome errors — no exceptions

---

## 9. AI-Assisted Development

This project uses Playbook. Every AI dev session starts by loading:

  1. .playbook/00-playbook.md    — structure rules and component definitions
  2. docs/code-standards.md      — this file; implementation rules
  3. docs/flows/_index.md        — flows entry point (if flows exist)
  4. docs/contracts/_index.md    — contracts entry point (if contracts exist)
  5. .playbook/_index.md         — project shape
  6. Relevant component docs     — scoped to the task

Never write a DDA doc without first reading the relevant flow and contract.
Never write code without its Playbook doc. The doc is the contract.

---

## 10. Error Mitigation

Category -> Response:
  Type errors         — fix immediately; do not suppress
  Biome failures      — fix before commit; never bypass
  Test failures       — fix before merging; no exceptions
  Playbook drift      — run sync mode; update doc then verify code
  Coverage drop       — add missing tests before PR
  Layer violation     — refactor immediately; do not defer
  Emergent component  — author Playbook doc first; then continue

Immediate response protocol:
  1. Stop      — do not accumulate changes on a broken state
  2. Identify  — what category?
  3. Isolate   — code, doc, or both?
  4. Fix       — resolve at source; do not patch symptoms
  5. Verify    — re-run Phase Completion Checklist
  6. Log       — add Fixed entry to 04-progress.md

Context rot recovery:
  Stop. Re-upload session files.
  Re-read .playbook/00-playbook.md and docs/code-standards.md before continuing.
  If rot persists, start a fresh session with a rollout doc as context.

---

*This document is the source of truth for code standards. When in doubt, refer here first.*
`,

	// .kit/01-process.md
	kitProcess: () => `# PROCESS

## Workflow Stages
1. **Exploration** — Exploring ideas and possibilities
2. **Execution** — Defining guidelines, planning structure, doing the work
3. **Progress** — Tracking what is done

## Rules for AI
- Focus only on the active phase in Current State
- Do not revisit or change closed decisions unless explicitly asked
- Follow naming standards and guidelines defined in Execution
- Always load \`.playbook/00-playbook.md\` and \`docs/code-standards.md\` before any development work
- Never write a DDA doc without first reading the relevant flow and contract files
- When approaching session limit (80%+), proactively offer to update all kit files for easy copy-paste

---

## Phase Completion Checklist

Run at the end of every phase. No phase is complete until all steps pass.

### Development Phase
- [ ] biome check — zero errors
- [ ] biome format --write — zero diffs remaining
- [ ] vitest run — all tests pass, coverage gates met
- [ ] Playbook sync — all touched .playbook/ docs reflect current code
- [ ] Folder trees updated — all _index.md Structure sections are current
- [ ] Git commits — grouped logically by scope, all changes pushed
- [ ] Kit files updated — 01-process.md, 03-execution.md, 04-progress.md
- [ ] Rollout doc generated — if a milestone was completed

### Any Phase
- [ ] Decisions logged in 02-exploration.md (Closed Decisions)
- [ ] Progress logged in 04-progress.md
- [ ] Current State updated in this file
- [ ] Active modules declared below if in use

---

## Error Mitigation

When something breaks — stop, do not accumulate changes on a broken state.

Identify the failure category: type error, test failure, Playbook drift, layer violation, or other.
Isolate whether it is in code, in a Playbook doc, or both.
Fix at the source — do not patch symptoms.
Verify by re-running the Phase Completion Checklist.
Log a Fixed entry in 04-progress.md if a decision was made to resolve it.

Context rot — if AI ignores kit files or Playbook docs:
Re-upload session files. Re-read .playbook/00-playbook.md and docs/code-standards.md.
If rot persists, start a fresh session with a rollout doc as context.

---

# CURRENT STATE

**Phase:** [Current workflow stage]
**Last Completed:** [Most recent milestone]
**Next:** [Active goal]
**Active Modules:** [05-kanban | 06-qa | none]
`,

	// .kit/02-exploration.md
	kitExploration: () => `# EXPLORATION

## Open Topics

**Project Goals:**
- What problem does this project solve?
- Who are the primary users?
- What does success look like?

**Technical Decisions:**
- What architecture pattern best fits this project?
- Which integrations are needed?
- What are the performance or compliance requirements?

**Scope:**
- What is explicitly in scope for v1?
- What is explicitly out of scope?

---

## Closed Decisions

<!-- Decisions are added here as they are made -->
<!-- Format: **YYYY-MM-DD Decision Name** -->
`,

	// .kit/03-execution.md
	kitExecution: () => `# EXECUTION

## Guidelines

**Style & Voice:**
- [Tone and approach]

**Rules & Constraints:**
- Follow Playbook conventions in .playbook/00-playbook.md
- Follow code standards in docs/code-standards.md
- Flows and contracts must be approved before any DDA docs are written
- No component is coded before its Playbook doc exists
- All code must pass biome check and biome format before commit
- All changes pushed with logically grouped commits

**Quality Bar:**
- All flows and contracts reviewed before DDA authoring begins
- All Playbook docs are status: active before coding begins
- All acceptance criteria have corresponding QA test cases
- Phase not complete until Phase Completion Checklist in 01-process.md fully passes

---

## Plan

**Goals:**
- [What you are building]

**Outcomes:**
- As a [role], I can [action] so that [benefit].

**Structure:**
- [Outline or phases]

**Out of Scope:**
- [What is not included]

**Delivery Notes:**
- [Edge cases, dependencies, assumptions]

**Acceptance Criteria:**
- [ ] [Verifiable condition for done]

---

## Action

**Right Now:**
Define project goals and populate Exploration

**Tasks:**

- [ ] Exploration
  - [ ] Define project goals
  - [ ] Lock technical decisions
- [ ] PRD and Specs
  - [ ] Draft PRD
  - [ ] Review and approve
- [ ] Flows + Contracts
  - [ ] Write docs/contracts/global.md
  - [ ] Write flow files for all major runtime paths
  - [ ] Write companion contract files
  - [ ] Review and lock flows and contracts
- [ ] Playbook Scaffold
  - [ ] Bootstrap scaffold from PRD + flows
  - [ ] Review and activate all stubs
  - [ ] Confirm living folder trees are accurate
- [ ] Code
  - [ ] Implement per Playbook docs
  - [ ] Playbook sync check before each PR

---

## Known Issues

| # | Issue | Category | Status | Resolution |
|---|---|---|---|---|
| — | — | — | — | — |
`,

	// .kit/04-progress.md
	kitProgress: () => `# PROGRESS LOG (APPEND-ONLY)

Rules:
- Entries are never edited or deleted.
- New updates are always added at the bottom.
- Each entry is identified as Completed, Decided, or Fixed. NOT grouped.
- Add timestamp per session ## YYYY-MM-DD and follow the line item format.
- In Progress is ALWAYS the last entry, overwritten each session.

---

## ${new Date().toISOString().split('T')[0]}
- **Completed:** Project scaffolded with create-playbook
- **In Progress:** Define project goals and open questions
`,

	// .kit/05-kanban.md
	kitKanban: () => `# KANBAN

## Rules
- Tickets seeded from Acceptance Criteria in 03-execution.md
- One outcome per ticket — no bundling
- Priority within each column is top-down (top = next)
- Blocked tickets stay in their column; blocking relationship is explicit
- When a ticket moves to Done, log it in 04-progress.md
- Each ticket should reference its Playbook doc where applicable

---

## Backlog

### [K-01] Ticket Title
**Description:** What needs to happen and why.
**Playbook Doc:** .playbook/[module]/[component].md
**Blocked by:** none

---

## In Progress

### [K-02] Ticket Title
**Description:** What needs to happen and why.
**Playbook Doc:** .playbook/[module]/[component].md
**Blocked by:** none

---

## Done

### [K-03] Ticket Title
**Completed:** YYYY-MM-DD
`,

	// .kit/06-qa.md
	kitQA: () => `# QA PLAN

## Rules
- Test cases seeded from Acceptance Criteria in 03-execution.md
- Each test case maps to one criterion (reference K-ID if kanban is active)
- AI runs what it can; human signs off on what requires judgment
- A criterion is not done until its test case is marked Pass
- Failures logged and linked back to a new or existing kanban ticket
- All tests must pass before phase completion — no exceptions

---

## Test Cases

### [QA-01] Test Case Title
**Maps to:** K-01
**Description:** What is being verified.
**Steps:**
1. [Step]
2. [Step]
**Expected Result:** What success looks like.
**Executor:** Agent / Human / Both
**Status:** Pending

---

## Failures Log

| ID | Date | What Failed | Ticket | Status |
|---|---|---|---|---|
| QA-01 | YYYY-MM-DD | [What failed] | K-XX | Open / Resolved |

---

## Sign-off
**QA Complete:** YYYY-MM-DD
**Signed off by:** [Human name or "Agent"]
**Notes:** [Exceptions, known issues, or deferred items]
`,

	// .kit/00-prompts.md — brief version pointing to the full file
	kitPrompts: () => `# Playbook — Session Prompts

Quick reference for every session type. Copy and paste as needed.
Full prompt library: docs/playbook-guide.md

---

## Context Kit — Fresh Project

Message 1 — upload .kit/01-process.md + .kit/03-execution.md:

  I'm starting a new project using the Playbook pipeline. I'll share files in two messages.
  This message: Blank templates for Process and Execution
  Next message: Blank templates for Exploration and Progress
  Based on my project [1-2 sentence description], help me populate these files:
  - Draft initial Exploration questions
  - Suggest guidelines for Execution
  - Define my Current State and initial goals
  Just provide a brief confirmation.

Message 2 — upload .kit/02-exploration.md + .kit/04-progress.md:

  Here are the remaining blank templates. Just provide a brief confirmation.

---

## Playbook — Start Dev Session

Upload .playbook/00-playbook.md + docs/code-standards.md + .playbook/_index.md:

  Before any work, read in this order:
  1. .playbook/00-playbook.md
  2. docs/code-standards.md
  3. docs/flows/_index.md (if flows exist)
  4. docs/contracts/_index.md (if contracts exist)
  5. .playbook/_index.md
  [Attach relevant module and component docs]
  Confirm your understanding of the project structure. Then wait for my instruction.

---

## Playbook — Write Flows and Contracts

Attach docs/PRD.md:

  Given this PRD, define the flows and contracts for this project.
  Write docs/contracts/global.md first — architecture, audit, error handling rules.
  Write one flow file per major runtime path under docs/flows/.
  Write one contract file per flow under docs/contracts/.
  Include failure paths for every flow. Keep files small — one flow per file.
  Flag anything underspecified. Wait for review before writing any DDA docs.

---

## Playbook — Bootstrap Scaffold from PRD

Attach the PRD + approved flow/contract files:

  Given this PRD and the approved flows and contracts, generate the Playbook scaffold.
  Produce _index.md with a living folder tree for the project and each module.
  Create stub docs for all identifiable components, sequencers, concerns, and integrations.
  Mark all stubs as status: draft.
  For sequencers, include a stub Flow section referencing the relevant flow files.
  Flag anything underspecified.

---

## Playbook — Sync Check

  Run a Playbook sync check on all files touched this session.
  For each: does the code match the Playbook doc?
  List any mismatches. Update affected docs.
  Update the living folder tree in any _index.md where components changed.

---

## Playbook — Generate Rollout Doc

Attach all .playbook/ docs + .kit/04-progress.md:

  Generate a rollout doc for [milestone name].
  Output to docs/rollout/[milestone].md.

---

## Phase Completion

  Before we close this phase:
  1. Run biome check — confirm zero errors
  2. Run biome format --write — confirm zero diffs
  3. Confirm all tests pass and coverage gates are met
  4. Run Playbook sync check on all touched .playbook/ docs
  5. Update the living folder tree in any _index.md where components changed
  6. Confirm all changes are committed and pushed (grouped by scope)
  7. Update 01-process.md, 03-execution.md, and 04-progress.md
  8. Generate a rollout doc if a milestone was completed
  Generate updated markdown for all changed kit files.

---

## End of Session

  Before we close:
  1. Run Playbook sync check on all docs touched this session
  2. Update 04-progress.md with completions, decisions, and fixes
  3. Update Current State in 01-process.md
  4. Generate updated markdown for all changed kit files

---

## Session Limit Warning

  We are approaching the session limit.
  Update all kit files and any changed Playbook docs now.
  Generate markdown for each so I can copy-paste and save before we continue.
`,
}

// ─── Scaffolding ─────────────────────────────────────────────────────────────

const scaffold = (root, projectName, includeKit, language) => {
	// Root
	write(`${root}/PLAYBOOK.md`, t.playbookRoot(projectName))

	// .playbook/
	write(`${root}/.playbook/00-playbook.md`, t.playbookAI())
	write(`${root}/.playbook/_index.md`, t.projectIndex(projectName))

	// .playbook/_concerns/
	write(
		`${root}/.playbook/_concerns/logging.md`,
		t.concern(
			'logging',
			'Structured logging available to all components.\n' +
				'Writes JSON-formatted logs with trace IDs.\n' +
				'Never called directly — injected via DI container.',
		),
	)

	write(
		`${root}/.playbook/_concerns/error-handling.md`,
		t.concern(
			'error-handling',
			'Typed Result pattern used across all Domain and Application layer components.\n' +
				'Returns { ok: true, value } or { ok: false, error } — never throws in business logic.\n' +
				'Errors are caught at Infrastructure and Interface boundaries only.',
		),
	)

	write(
		`${root}/.playbook/_concerns/auth.md`,
		t.concern(
			'auth',
			'Permission checks applied at orchestrator boundaries.\n' +
				'Components do not handle auth directly.\n' +
				'All auth context flows from the request — never queried mid-flow.',
		),
	)

	// .playbook/_integrations/ + _shared/
	mkdir(`${root}/.playbook/_integrations`)
	mkdir(`${root}/.playbook/_shared`)

	// docs/
	write(`${root}/docs/code-standards.md`, t.codeStandards(language))

	// docs/flows/
	write(`${root}/docs/flows/_index.md`, t.flowsIndex())
	write(`${root}/docs/flows/global.md`, t.flowsGlobal())

	// docs/contracts/
	write(`${root}/docs/contracts/_index.md`, t.contractsIndex())
	write(`${root}/docs/contracts/global.md`, t.contractsGlobal(language))

	mkdir(`${root}/docs/rollout`)

	// .kit/ (always included — Playbook requires kit)
	write(`${root}/.kit/01-process.md`, t.kitProcess())
	write(`${root}/.kit/02-exploration.md`, t.kitExploration())
	write(`${root}/.kit/03-execution.md`, t.kitExecution())
	write(`${root}/.kit/04-progress.md`, t.kitProgress())
	write(`${root}/.kit/00-prompts.md`, t.kitPrompts())

	if (includeKit) {
		write(`${root}/.kit/05-kanban.md`, t.kitKanban())
		write(`${root}/.kit/06-qa.md`, t.kitQA())
	} else {
		write(
			`${root}/.kit/05-kanban.md`,
			'# KANBAN\n\n<!-- Activate in 01-process.md when needed -->\n',
		)
		write(
			`${root}/.kit/06-qa.md`,
			'# QA PLAN\n\n<!-- Activate in 01-process.md when needed -->\n',
		)
	}
}

// ─── Main ────────────────────────────────────────────────────────────────────

const main = async () => {
	console.log('\n\x1b[1m create-playbook \x1b[0m — Playbook project scaffold\n')

	const rawName = await ask('? Project name: ')
	const projectName = rawName || 'my-project'
	const includeKit = await confirm(
		'? Include optional kit modules (05-kanban, 06-qa)?',
	)
	const language = await choose('? Primary language:', [
		'TypeScript',
		'JavaScript',
		'Python',
		'Other',
	])

	rl.close()

	const root = join(process.cwd(), projectName)

	if (existsSync(root)) {
		log.error(`Directory "${projectName}" already exists.`)
		process.exit(1)
	}

	log.blank()
	log.info(`Scaffolding Playbook project in ./${projectName}...\n`)

	try {
		scaffold(root, projectName, includeKit, language)
	} catch (err) {
		log.error(`Failed: ${err.message}`)
		process.exit(1)
	}

	log.blank()
	log.info('Done!\n')
	console.log('Next steps:')
	console.log(`  cd ${projectName}`)
	console.log('  Read PLAYBOOK.md to get started')
	console.log('  Upload .kit/ files to start your first Context Kit session')
	console.log(
		'  Use "Playbook — Write Flows and Contracts" prompt after PRD is approved',
	)
	log.blank()
	console.log('Run with:')
	console.log('  npx create-playbook')
	console.log('  pnpm dlx create-playbook')
	console.log('  yarn dlx create-playbook')
	log.blank()
}

main()
