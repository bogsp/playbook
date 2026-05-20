# Playbook — Complete Pipeline Guide

# File: playbook/docs/playbook-guide.md

> From idea to deployed code using Context Kit, Flows + Contracts, DDA, and AI-assisted development.

---

## Table of Contents

1. [Overview](#1-overview)
2. [The Full Pipeline](#2-the-full-pipeline)
3. [Stage 1 — Context Kit](#3-stage-1--context-kit)
4. [Stage 2 — PRD and Specs](#4-stage-2--prd-and-specs)
5. [Stage 3 — Flows and Contracts](#5-stage-3--flows-and-contracts)
6. [Stage 4 — DDA (Playbook Scaffold)](#6-stage-4--dda-playbook-scaffold)
7. [Stage 5 — Code](#7-stage-5--code)
8. [Stage 6 — Rollout](#8-stage-6--rollout)
9. [Adopting an Existing Project](#9-adopting-an-existing-project)
10. [AI Session Management](#10-ai-session-management)
11. [Quick Reference](#11-quick-reference)

---

## 1. Overview

Playbook is a structured development pipeline that keeps humans and AI aligned
at every stage of a project. Every component is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

What makes Playbook different:

- Component-first — every unit of the system has a document before code is written
- Flow-first — every runtime path is mapped before any component is defined
- Narrative-rich — purpose is written in plain language, not just metadata
- Relationship-aware — every connection between components is explicit
- AI-optimized — structured for fast, accurate machine ingestion
- Architecture-agnostic — works with any project structure or stack

Who it is for:

- Solo developers using AI tools
- Teams collaborating with AI
- Non-developers directing AI to build things

You do not need to be a developer to use Playbook.
You define what exists and why. AI handles how it is built.

---

## 2. The Full Pipeline

```
Context Kit -> PRD/Spec -> Flows (docs/flows/) -> Contracts (docs/contracts/) -> DDA -> Code -> Rollout
```

| Stage       | Owner      | AI Role                                      |
| ----------- | ---------- | -------------------------------------------- |
| Context Kit | Human      | Facilitates exploration and decisions        |
| PRD / Specs | Human + AI | Drafts and refines on request                |
| Flows       | Human + AI | Maps runtime paths; finds gaps before code   |
| Contracts   | Human + AI | Locks rules every implementation must honour |
| DDA         | Human + AI | Generates scaffold, authors docs, flags gaps |
| Code        | AI         | Generates against Playbook contracts         |
| Rollout     | AI         | Compiles on demand from DDA                  |

Each stage feeds the next. Nothing overlaps. Nothing is duplicated.

The Flows + Contracts stage is not optional. Components designed without flows
are guesses. Components coded without contracts are inconsistent.
Every issue found in the flow mapping phase is a bug that would otherwise
appear in production.

---

## 3. Stage 1 — Context Kit

The Context Kit is the project management layer. It captures thinking, locks
decisions, and tracks progress across sessions.

### Files

| File                   | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| .kit/01-process.md     | Workflow rules, Current State, Phase Completion Checklist |
| .kit/02-exploration.md | Open questions and closed decisions with dates            |
| .kit/03-execution.md   | Guidelines, plan, tasks, and known issues                 |
| .kit/04-progress.md    | Append-only log of completions, decisions, and fixes      |
| .kit/05-kanban.md      | Ticketed work breakdown (optional)                        |
| .kit/06-qa.md          | Test cases and sign-off (optional)                        |
| .kit/00-prompts.md     | All session prompts — copy and paste as needed            |

### Starting a Fresh Project

Message 1 — upload .kit/01-process.md + .kit/03-execution.md:

I'm starting a new project using the Playbook pipeline. I'll share files in two messages.
This message: Blank templates for Process and Execution.
Next message: Blank templates for Exploration and Progress.
Based on my project [1-2 sentence description], help me populate these files:
draft initial Exploration questions, suggest Execution guidelines, define Current State.
Just provide a brief confirmation.

Message 2 — upload .kit/02-exploration.md + .kit/04-progress.md:

Here are the remaining blank templates. Just provide a brief confirmation.

### Resuming a Project

Message 1 — upload current .kit/01-process.md + .kit/03-execution.md:

I'm resuming a Playbook project. I'll share files in two messages.
Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.

Message 2 — upload current .kit/02-exploration.md + .kit/04-progress.md:

Here is the context from earlier work. Just provide a brief confirmation.

### Rules

- AI focuses only on the active phase in .kit/01-process.md
- AI never reopens closed decisions unless explicitly asked
- Progress log is append-only — entries are never edited or deleted
- Fixed entries are added alongside Completed and Decided entries
- In Progress is always the last entry, overwritten each session

---

## 4. Stage 2 — PRD and Specs

The PRD defines what you are building and why. It is the upstream input for
flows, contracts, and DDA.

### What Belongs Here

- Product goals and user outcomes
- Feature definitions and acceptance criteria
- User flows and interaction design
- Business rules and constraints
- Non-functional requirements (performance, security, compliance)

### What Does Not Belong Here

- Technical implementation details — those go in DDA
- Runtime paths — those go in flows
- Component relationships — those go in DDA
- Code — that comes after DDA

### AI-Assisted PRD Drafting

Once Context Kit decisions are locked:

Based on the closed decisions in my Exploration file [attach 02-exploration.md],
draft a PRD for this project. Include goals, user outcomes, feature definitions,
and acceptance criteria. Flag anything underspecified.

### Handoff to Flows

When the PRD is approved, move to the Flows + Contracts stage.
The PRD is the input — do not start writing DDA docs yet.

---

## 5. Stage 3 — Flows and Contracts

Map every major runtime path and lock implementation rules before any DDA docs
are written. This is the stage where bugs are found cheapest.

### Why This Stage Exists

Flows catch issues that code would hide. Race conditions, missing failure paths,
ambiguous ownership, and edge cases all surface here — in plain language,
before any code exists. Every hour in this stage prevents hours of debugging.

### Flows

Flows live in `docs/flows/`. One file per major runtime path.

```
docs/flows/
  _index.md           — entry point; table of all flow files
  global.md           — optional: rules that span every flow
  flow-0-boot.md      — one file per flow; kept small
  flow-1-task.md
  flow-2-connection.md
  ...
```

Each flow file answers:

- What happens at runtime, step by step?
- What triggers this flow?
- What are the failure paths?
- What happens on disconnect, timeout, or crash?

### Contracts

Contracts live in `docs/contracts/`. One file per flow, plus a `global.md`
that applies to everything.

```
docs/contracts/
  _index.md           — entry point; table of all contract files
  global.md           — architecture, audit, error handling rules (read first always)
  flow-1-task.md      — companion contract to flows/flow-1-task.md
  ...
```

Each contract file answers:

- What rules must every implementation honour?
- What is the exact schema or format?
- What are the concurrency and atomicity rules?
- What must always be audited?

### Read Order

Always read `docs/contracts/global.md` before any flow-specific contract.
Read the flow file and its companion contract together before writing any DDA doc.

```
global.md              → read first, every session
flow-N.md              → read the flow
contracts/flow-N.md    → read the rules for that flow
_index.md              → navigate to the right file
```

### Rules

- Keep flow files small — one flow per file; max ~150 lines
- Both sides of every interaction must be defined (not just the happy path)
- Flows and contracts are locked before any DDA docs are written
- Lock state is recorded in .kit/01-process.md
- Contracts are companion docs — one per flow; never one giant contract file

### Writing Flows with AI

Attach docs/PRD.md, then send:

Given this PRD, define the flows for this project.
Write docs/flows/\_index.md as the entry point table.
Write one flow file per major runtime path.
Include failure paths, disconnection, and edge cases for every flow.
Flag anything in the PRD that is ambiguous or underspecified.
Wait for review before writing contracts or DDA docs.

### Writing Contracts with AI

After flows are reviewed and approved:

Given these approved flow files [attach], write the companion contracts.
Write docs/contracts/global.md first — architecture, audit, error handling.
Then write one contract file per flow.
Each contract should answer: what rules must every implementation honour?
Flag any gaps between what the flows assume and what is not yet decided.

---

## 6. Stage 4 — DDA (Playbook Scaffold)

DDA is the technical architecture layer. It lives in `.playbook/` and defines
every component before any code is written.

### Important

Never write a DDA doc without first reading the relevant flow and contract files.
Flows and contracts are the authoritative source — DDA docs reference them,
they do not restate them.

### Folder Structure

```
.playbook/
  00-playbook.md         — AI boot file — always read first
  _index.md              — project manifest and living folder tree
  apps/                  — app-level manifests and components
  packages/              — package-level manifests and components
  _concerns/             — cross-cutting capabilities (logging, auth, etc.)
  _integrations/         — third-party services and libraries
  _shared/               — components used across multiple apps/modules
  [module]/
    _index.md            — module manifest and folder tree
    [component].md       — individual component docs
docs/
  code-standards.md      — always loaded alongside 00-playbook.md
  flows/                 — flow docs (one per file)
  contracts/             — contract docs (one per flow)
  rollout/               — generated snapshots; never edit directly
```

### Document Types

DDA has five document types. Every file uses YAML frontmatter for metadata,
a short narrative paragraph for purpose, and an optional Detail section.

Universal fields — all types:

```
id:      # kebab-case — must match filename
type:    # component | sequencer | structure | concern | integration
status:  # draft | active | deprecated
```

---

#### structure

Project or module manifest. Always includes a Structure section —
a linked, annotated tree of everything in scope. This is the living folder tree.
Update it whenever components are added, removed, or renamed.

```
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
```

---

#### sequencer

A runtime coordinator that sequences components. Owns flow, not logic.
Always references `docs/flows/` and `docs/contracts/` as source of truth —
does not restate them. Always includes a `## Flow` section and (optionally)
a Mermaid diagram in `## Detail`.

```
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
```

---

#### component

A single unit of logic — service, entity, handler, use case, repository.

```
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
Expanded spec, edge cases, clarifications — only read when needed.
```

---

#### concern

A cross-cutting capability that multiple components depend on silently.

```
---
id: logging
type: concern
status: active
affects: all
provided-by: internal
---
Structured logging available to all components.
Never called directly — injected via DI container.
```

---

#### integration

A third-party service or external library contract.

```
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
```

---

### Living Folder Tree

Every `_index.md` maintains a Structure section — a linked annotated tree
of everything in that scope. It is the at-a-glance map of the project.

Format:

```
## Structure

- [filename.md](./filename.md) — one line description
- [sub-module/](./sub-module/)
  - [_index.md](./sub-module/_index.md) — one line description
```

Rules:

- Every entry is a markdown link
- Descriptions are one line only
- AI updates the tree automatically in sync mode
- Changing the tree and running sync propagates changes to code

### Authoring Order

Always author top-down — shape first, then flow, then logic:

```
1. .playbook/_index.md           — project manifest
2. .playbook/[app]/_index.md     — app or module manifest
3. Sequencers                    — flow coordination docs (read flow files first)
4. Components                    — logic units
5. _concerns/                    — cross-cutting capabilities
6. _integrations/                — external contracts
```

### Authoring Rules

Planned path (preferred):

```
Context Kit -> PRD -> Flows/Contracts -> DDA -> Code
```

Emergent path (acceptable — for components discovered during development):

```
DDA -> Code  (document immediately, then code)
```

Prohibited:

```
DDA doc without an approved flow — never
Code without a DDA doc — never
```

### Generation Modes

Bootstrap — start a project from a PRD + approved flows (use prompt from .kit/00-prompts.md):

Given this PRD and the approved flows and contracts, generate the Playbook scaffold.
Produce \_index.md for the project and each module.
Create stub docs for all identifiable components, sequencers,
concerns, and integrations. Mark all stubs as status: draft.
For any sequencers found, include a stub Flow section referencing the relevant flow files.
Flag anything underspecified.

Authoring — add a new component:

Given this parent doc and relevant flow [attach], create a Playbook [type] doc for [description].
Follow Playbook conventions. Flag any missing relationships.

Sync — update a doc when code drifts:

This Playbook doc [attach] no longer reflects the implementation.
Here is what changed: [description]. Update it. Note change in Detail.

---

## 7. Stage 5 — Code

Code is generated and maintained against Playbook contracts.
The Playbook doc is the source of truth — not the code.

### AI Boot Sequence for Every Dev Session

Always load in this order:

```
1. .playbook/00-playbook.md
2. docs/code-standards.md
3. docs/flows/_index.md         (if flows exist)
4. docs/contracts/_index.md     (if contracts exist)
5. .playbook/_index.md
6. .playbook/[module]/_index.md
7. Relevant component docs
8. _concerns/ and _integrations/ as needed
```

### Scoped Context Packages

Load only what the task needs:

| Task              | Load                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Add new component | 00-playbook.md + code-standards.md + module \_index.md + parent doc + relevant flow/contract + \_concerns/ |
| Fix a bug         | 00-playbook.md + code-standards.md + component doc + its connects + concerns                               |
| Write tests       | Component doc + code-standards.md (testing section)                                                        |
| Generate rollout  | Full `.playbook/` tree + `.kit/04-progress.md`                                                             |

### AI Behavioral Rules

1.  Never write a DDA doc without reading the relevant flow and contract files first
2.  Never write code for a component without its Playbook doc
3.  Never add a dependency not declared in connects or integrations
4.  Never create a component that duplicates an existing responsibility
5.  Always implement against the declared interface in the doc
6.  Flag any doc with status: draft before coding against it
7.  Suggest \_shared/ when a component appears in multiple modules
8.  Run sync mode before closing any task
9.  Confirm all touched Playbook docs are current before every PR
10. Cross-check new components against \_shared/ before creating module-level ones
11. Flag missing connects, emits, or children as TODO during generation
12. Update the living folder tree in \_index.md when components change

### Phase Completion Checklist

Run at the end of every development phase. No phase is complete until all pass.

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

## 8. Stage 6 — Rollout

Rollout docs are generated artifacts — never authored manually. They serve two purposes:

1. Human-facing — deployment guide, release notes, migration steps
2. AI-facing — full project context snapshot for a fresh session

### Generation Prompt

Generate a rollout doc for [milestone name].
Read the full .playbook/ tree [attach all Playbook docs] and .kit/04-progress.md [attach].
Output to docs/rollout/[milestone].md.

### Output Structure

docs/rollout/[milestone].md contains:

- Project structure summary
- All active components with narratives
- All integrations and concerns
- Milestone progress from 04-progress.md
- Known gaps or draft items

### Rules

- Rollout docs are never edited directly
- Edit the source Playbook doc and regenerate
- One rollout doc per milestone or major release
- Use as AI context dump when starting a session on an existing project

---

## 9. Adopting an Existing Project

Playbook adoption is additive. Existing code stays intact throughout.
The pipeline grows around the project first, then pulls it into alignment.

### Which guide to use

- Project already has Context Kit files: read `guides/adopt-with-kit.md`
- Project has no Context Kit files: read `guides/adopt-without-kit.md`

### Adoption Flow (both paths)

```
1. Inventory   — map modules, services, components, dependencies, tech stack
2. Audit       — identify what is missing, drifting, or compliant
3. Gap Report  — prioritized list: Missing / Drifting / Compliant
4. Flows       — draft stub flows from the existing codebase if missing
5. Contracts   — draft stub contracts + global.md if missing
6. Scaffold    — generate .playbook/ around existing code; do not modify anything
7. Adopt       — work through gap report in priority order; document first, then code
```

### Adoption Priority Order

```
1. _concerns/        — cross-cutting capabilities (lowest risk, high value)
2. _integrations/    — external contracts (define boundaries early)
3. _shared/          — cross-module components (reduce duplication)
4. Sequencers        — define flows before touching component code
5. Components        — align one by one; test after each
```

### Key Rules

- Nothing is deleted — adoption is additive only
- Closed decisions in existing kit files stay closed
- Progress log entries are never edited — new entries are appended
- Flag risky structural changes — defer them; compliance is incremental

---

## 10. AI Session Management

### Starting Any Dev Session

Before any work, read:

1. .playbook/00-playbook.md
2. docs/code-standards.md
3. docs/flows/\_index.md (if flows exist)
4. docs/contracts/\_index.md (if contracts exist)
5. .playbook/\_index.md
   Confirm your understanding. Then wait for my instruction.

### Ending Any Dev Session

Before we close:

1. Run Playbook sync check on all docs touched this session
2. Update .kit/04-progress.md with completions, decisions, and fixes
3. Update Current State in .kit/01-process.md
4. Generate updated markdown for all changed kit files

### Error Recovery

Something has gone wrong. Stop all other work.
Identify the category: type error / test failure / Playbook drift / layer violation / other
Isolate: is it in code, in a Playbook doc, or both?
Propose a fix at the source — do not patch symptoms.
After fixing: re-run biome check, tests, and Playbook sync.
Log the resolution in .kit/04-progress.md as a Fixed entry.

### Context Rot Recovery

If AI starts ignoring uploaded files mid-session:

Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read .playbook/00-playbook.md and docs/code-standards.md before continuing.

If rot persists, start a fresh session and load a rollout doc as context.

### Session Limit Management

When approaching 80% context:

We are approaching the session limit.
Update all kit files and any changed Playbook docs now.
Generate markdown for each so I can copy-paste and save before we continue.

---

## 11. Quick Reference

### Document Types

| Type        | Owns                      | Key Fields                        |
| ----------- | ------------------------- | --------------------------------- |
| structure   | Shape and manifest        | scope, entry, contains            |
| sequencer   | Runtime flow coordination | triggers, sequence, emits         |
| component   | Logic unit                | parent, children, connects, emits |
| concern     | Cross-cutting capability  | affects, provided-by              |
| integration | External contract         | kind, used-by, config             |

### Status Values

| Status     | Meaning                                    |
| ---------- | ------------------------------------------ |
| draft      | Stub generated — not ready to code against |
| active     | Approved — safe to code against            |
| deprecated | No longer in use — do not reference        |

### Reserved Folders

| Folder          | Contents                                |
| --------------- | --------------------------------------- |
| \_concerns/     | Cross-cutting capabilities              |
| \_integrations/ | Third-party services and libraries      |
| \_shared/       | Components used across multiple modules |

### Naming Conventions

| Item             | Convention         | Example                           |
| ---------------- | ------------------ | --------------------------------- |
| Files            | kebab-case.md      | invoice-validator.md              |
| IDs              | match filename     | id: invoice-validator             |
| Folders          | kebab-case         | billing/                          |
| Reserved folders | leading underscore | \_concerns/                       |
| Structure docs   | always \_index.md  | billing/\_index.md                |
| Events           | PascalCase         | InvoicePosted                     |
| Commits          | scoped imperative  | playbook: add billing module docs |

### Flow + Contract Conventions

| Item            | Convention                                            |
| --------------- | ----------------------------------------------------- |
| Flow files      | docs/flows/flow-N-name.md                             |
| Contract files  | docs/contracts/flow-N-name.md (mirrors flow filename) |
| Global contract | docs/contracts/global.md (read first always)          |
| Entry points    | docs/flows/\_index.md, docs/contracts/\_index.md      |
| File size       | Max ~150 lines — split if larger                      |

### Authoring Checklist

Before marking a doc status: active:

- [ ] id matches filename exactly
- [ ] type is one of the five valid types
- [ ] parent is declared (except root \_index.md)
- [ ] All connects have their own Playbook doc
- [ ] All concerns exist in \_concerns/
- [ ] All integrations exist in \_integrations/
- [ ] Narrative clearly states purpose in one paragraph
- [ ] No implementation details in narrative — those go in Detail
- [ ] Structure section is accurate (structure types)
- [ ] Flow section references flow files (sequencer types)
- [ ] Flow section complete with linked components (sequencer types)

### PR Checklist Addition

- [ ] Playbook sync check — all touched .playbook/ docs reflect current implementation
- [ ] Living folder trees updated — all \_index.md Structure sections are current
- [ ] No new dependencies added without a Playbook doc
- [ ] No new components coded without a Playbook doc
- [ ] Emergent components traced back — parent and \_index.md updated
- [ ] Kit files updated if phase or state changed

---

_The doc is the contract. The code follows._
