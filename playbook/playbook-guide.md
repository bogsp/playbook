# Playbook — Complete Pipeline Guide

> From idea to deployed code using Context Kit, DDA, and AI-assisted development.

---

## Table of Contents

1. [Overview](#1-overview)
2. [The Full Pipeline](#2-the-full-pipeline)
3. [Stage 1 — Context Kit](#3-stage-1--context-kit)
4. [Stage 2 — PRD and Specs](#4-stage-2--prd-and-specs)
5. [Stage 3 — DDA (Playbook Scaffold)](#5-stage-3--dda-playbook-scaffold)
6. [Stage 4 — Code](#6-stage-4--code)
7. [Stage 5 — Rollout](#7-stage-5--rollout)
8. [Adopting an Existing Project](#8-adopting-an-existing-project)
9. [AI Session Management](#9-ai-session-management)
10. [Quick Reference](#10-quick-reference)

---

## 1. Overview

Playbook is a structured development pipeline that keeps humans and AI aligned
at every stage of a project. Every component is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

What makes Playbook different:

- Component-first — every unit of the system has a document before code is written
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

Context Kit -> PRD / Specs -> Flows -> Contracts ->DDA -> Code -> Rollout

| Stage       | Owner      | AI Role                                      |
| ----------- | ---------- | -------------------------------------------- |
| Context Kit | Human      | Facilitates exploration and decisions        |
| PRD / Specs | Human + AI | Drafts and refines on request                |
| Flows       | Human + AI | Maps out user journeys and interactions      |
| Contracts   | Human + AI | Defines interfaces and data contracts        |
| DDA         | Human + AI | Generates scaffold, authors docs, flags gaps |
| Code        | AI         | Generates against Playbook contracts         |
| Rollout     | AI         | Compiles on demand from DDA                  |

Each stage feeds the next. Nothing overlaps. Nothing is duplicated.

---

## 3. Stage 1 — Context Kit

The Context Kit is the project management layer. It captures thinking, locks
decisions, and tracks progress across sessions. It is the starting point for
every project.

### Files

| File                  | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| kit/01-process.md     | Workflow rules, Current State, Phase Completion Checklist |
| kit/02-exploration.md | Open questions and closed decisions with dates            |
| kit/03-execution.md   | Guidelines, plan, tasks, and known issues                 |
| kit/04-progress.md    | Append-only log of completions, decisions, and fixes      |
| kit/05-kanban.md      | Ticketed work breakdown (optional)                        |
| kit/06-qa.md          | Test cases and sign-off (optional)                        |
| kit/00-prompts.md     | All session prompts — copy and paste as needed            |

### Starting a Fresh Project

Message 1 — upload kit/01-process.md + kit/03-execution.md:

I'm starting a new project using the Playbook pipeline. I'll share files in two messages.
This message: Blank templates for Process and Execution.
Next message: Blank templates for Exploration and Progress.
Based on my project [1-2 sentence description], help me populate these files:
draft initial Exploration questions, suggest Execution guidelines, define Current State.
Just provide a brief confirmation.

Message 2 — upload kit/02-exploration.md + kit/04-progress.md:

Here are the remaining blank templates. Just provide a brief confirmation.

### Resuming a Project

Message 1 — upload current kit/01-process.md + kit/03-execution.md:

I'm resuming a Playbook project. I'll share files in two messages.
Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.

Message 2 — upload current kit/02-exploration.md + kit/04-progress.md:

Here is the context from earlier work. Just provide a brief confirmation.

### Rules

- AI focuses only on the active phase in kit/01-process.md
- AI never reopens closed decisions unless explicitly asked
- Progress log is append-only — entries are never edited or deleted
- Fixed entries are added alongside Completed and Decided entries
- In Progress is always the last entry, overwritten each session

---

## 4. Stage 2 — PRD and Specs

The PRD defines what you are building and why. It is the upstream input for DDA.

### What Belongs Here

- Product goals and user outcomes
- Feature definitions and acceptance criteria
- User flows and interaction design
- Business rules and constraints
- Non-functional requirements (performance, security, compliance)

### What Does Not Belong Here

- Technical implementation details — those go in DDA
- Component relationships — those go in DDA
- Code — that comes after DDA

### AI-Assisted PRD Drafting

Once Context Kit decisions are locked:

Based on the closed decisions in my Exploration file [attach 02-exploration.md],
draft a PRD for this project. Include goals, user outcomes, feature definitions,
and acceptance criteria. Flag anything underspecified.

### Handoff to DDA

When the PRD is approved, use the Bootstrap prompt from kit/00-prompts.md.
The PRD becomes the primary input for the Playbook scaffold.

---

## 5. Stage 3 — DDA (Playbook Scaffold)

DDA is the technical architecture layer. It lives in .playbook/ at the root
of the repository and defines every component before any code is written.

### Folder Structure

```
.playbook/
  00-playbook.md         — AI boot file — always read first
  _index.md              — project manifest and living folder tree
  _concerns/             — cross-cutting capabilities (logging, auth, etc.)
  _integrations/         — third-party services and libraries
  _shared/               — components used across multiple modules
  [module]/
    _index.md            — module manifest and folder tree
    [component].md       — individual component docs
docs/
  code-standards.md      — always loaded alongside 00-playbook.md
  rollout/               — generated snapshots; never edit directly
```

### Document Types

DDA has five document types. Every file uses YAML frontmatter for metadata,
a short narrative paragraph for purpose, and an optional Detail section.

Universal fields — all types:

```yaml
id: # kebab-case — must match filename
type: # component | orchestrator | structure | concern | integration
status: # draft | active | deprecated
```

---

#### structure

Project or module manifest. Always includes a Structure section —
a linked, annotated tree of everything in scope. This is the living folder tree.
Update it whenever components are added, removed, or renamed.

```
id: billing-module
type: structure
scope: module
status: active
entry: [billing-orchestrator]
contains: [billing-orchestrator, invoice-validator, invoice-factory]
integrations: [stripe]
concerns: [logging, auth, error-handling]

---

Owns all invoice lifecycle operations from creation to posting.
Exposes functionality only through its orchestrators.

## Structure

- [\_index.md](./_index.md) — this file; billing module manifest
- [billing-orchestrator.md](./billing-orchestrator.md) — coordinates invoice creation flow
- [invoice-validator.md](./invoice-validator.md) — validates structure and business rules
- [invoice-factory.md](./invoice-factory.md) — constructs invoice domain object
```

---

#### orchestrator

A runtime shell that sequences components. Owns flow, not logic.
Always includes a Flow section and a Mermaid diagram in Detail.

The Flow section is the primary reference — edit here, code follows via sync.
The Mermaid diagram provides a visual representation in Detail.

---

```
id: billing-orchestrator
type: orchestrator
status: active
parent: billing-module
triggers: [CreateInvoiceCommand]
sequence: [invoice-validator, invoice-factory, invoice-repository]
emits: [InvoiceCreated]
concerns: [logging, auth]

Coordinates the full invoice creation flow. Owns sequence, not logic.

## Flow

1. CreateInvoiceCommand — triggers this orchestrator
2. [invoice-validator](./invoice-validator.md) — validates structure -> InvoiceValidated or fails
3. [invoice-factory](./invoice-factory.md) — constructs domain object -> InvoiceDraft
4. [invoice-repository](./invoice-repository.md) — persists to DB -> InvoiceCreated
5. InvoiceCreated — emitted on success

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

#### component

A single unit of logic — service, entity, handler, use case, repository.

---

```
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
Returns a typed Result — never throws.

## Detail

Expanded spec, edge cases, clarifications — only read when needed.
```

---

#### concern

A cross-cutting capability that multiple components depend on silently.

---

```
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

---

```
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
```

---

### Living Folder Tree

Every \_index.md maintains a Structure section — a linked annotated tree
of everything in that scope. It is the at-a-glance map of the project.

Format:

- [filename.md](./filename.md) — one line description
- [sub-module/](./sub-module/)
  - [\_index.md](./sub-module/_index.md) — one line description

Rules:

- Every entry is a markdown link
- Descriptions are one line only
- AI updates the tree automatically in sync mode
- Changing the tree and running sync propagates changes to code

### Authoring Order

Always author top-down — shape first, then flow, then logic:

1. .playbook/\_index.md — project manifest
2. .playbook/[module]/\_index.md — module manifest
3. Orchestrators — sequence and flow
4. Components — logic units
5. \_concerns/ — cross-cutting capabilities
6. \_integrations/ — external contracts

### Authoring Rules

Planned path (preferred):
Context Kit -> PRD/Spec -> Playbook doc -> Code

Emergent path (acceptable — for components discovered during development):
Playbook doc -> Code (document immediately, then code)

Prohibited:
Code without a Playbook doc — never allowed

### Generation Modes

Bootstrap — start a project from a PRD (use prompt from kit/00-prompts.md)
Authoring — add a new component mid-project
Sync — update a doc when code drifts

### Reusability Rules

- \_concerns/ and \_integrations/ are always shared — never duplicated per module
- Components used across modules live in \_shared/
- AI cross-checks new components against \_shared/ before creating module-level ones

### Drift Prevention

| When            | Action                                                               |
| --------------- | -------------------------------------------------------------------- |
| During coding   | AI flags any implementation that diverges from the doc               |
| Before every PR | Run sync check — confirm all touched docs are current                |
| Each milestone  | Full Playbook audit — AI reads all docs and code, reports mismatches |

Add a Playbook sync check to your PR checklist.

---

## 6. Stage 4 — Code

Code is generated and maintained against Playbook contracts.
The Playbook doc is the source of truth — not the code.

### AI Boot Sequence for Every Dev Session

Always load in this order:

1. .playbook/00-playbook.md
2. docs/code-standards.md
3. .playbook/\_index.md
4. .playbook/[module]/\_index.md
5. Relevant component docs
6. \_concerns/ and \_integrations/ as needed

Boot prompt:

Before any work, read in this order:

1. .playbook/00-playbook.md
2. docs/code-standards.md
3. .playbook/\_index.md
   [Attach relevant module and component docs]
   Confirm your understanding. Then wait for my instruction.

### Scoped Context Packages

Load only what the task needs:

| Task              | Load                                                                              |
| ----------------- | --------------------------------------------------------------------------------- |
| Add new component | 00-playbook.md + code-standards.md + module \_index.md + parent doc + \_concerns/ |
| Fix a bug         | 00-playbook.md + code-standards.md + component doc + its connects + concerns      |
| Write tests       | Component doc + code-standards.md (testing section)                               |
| Generate rollout  | Full .playbook/ tree + kit/04-progress.md                                         |

### AI Behavioral Rules

1.  Never write code for a component without its Playbook doc
2.  Never add a dependency not declared in connects or integrations
3.  Never create a component that duplicates an existing responsibility
4.  Always implement against the declared interface in the doc
5.  Flag any doc with status: draft before coding against it
6.  Suggest \_shared/ when a component appears in multiple modules
7.  Run sync mode before closing any task
8.  Confirm all touched Playbook docs are current before every PR
9.  Cross-check new components against \_shared/ before creating module-level ones
10. Flag missing connects, emits, or children as TODO during generation
11. Update the living folder tree in \_index.md when components change

### Phase Completion Checklist

Run at the end of every development phase. No phase is complete until all pass.

1. biome check — zero errors
2. biome format — zero diffs
3. vitest run — all pass, coverage gates met
4. Playbook sync — all touched .playbook/ docs reflect current code
5. Folder trees — all \_index.md Structure sections are current
6. Git commits — grouped by scope; all changes pushed
7. Kit files — 01-process.md, 03-execution.md, 04-progress.md updated
8. Rollout doc — generated if a milestone completed

---

## 7. Stage 5 — Rollout

Rollout docs are generated artifacts — never authored manually. They serve two purposes:

1. Human-facing — deployment guide, release notes, migration steps
2. AI-facing — full project context snapshot for a fresh session

### Generation Prompt

Generate a rollout doc for [milestone name].
Read the full .playbook/ tree [attach all Playbook docs] and kit/04-progress.md [attach].
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

### Resuming with a Rollout Doc

I'm resuming work on an existing project.
Read this rollout doc first [attach docs/rollout/[milestone].md].
Then read .playbook/00-playbook.md and docs/code-standards.md.
Confirm your understanding before we begin.

---

## 8. Adopting an Existing Project

Playbook adoption is additive. Existing code stays intact throughout.
The pipeline grows around the project first, then pulls it into alignment.

### Which guide to use

- Project already has Context Kit files: read guides/adopt-with-kit.md
- Project has no Context Kit files: read guides/adopt-without-kit.md

### Adoption Flow (both paths)

1. Inventory — map modules, services, components, dependencies, tech stack
2. Audit — identify what is missing, drifting, or compliant
3. Gap Report — prioritized list: Missing / Drifting / Compliant
4. Scaffold — generate .playbook/ around existing code; do not modify anything
5. Adopt — work through gap report in priority order; document first, then code

### Adoption Priority Order

1. \_concerns/ — cross-cutting capabilities (lowest risk, high value)
2. \_integrations/ — external contracts (define boundaries early)
3. \_shared/ — cross-module components (reduce duplication)
4. Orchestrators — define flows before touching component code
5. Components — align one by one; test after each

### Key Rules

- Nothing is deleted — adoption is additive only
- Closed decisions in existing kit files stay closed
- Progress log entries are never edited — new entries are appended
- Flag risky structural changes — defer them; compliance is incremental

---

## 9. AI Session Management

### Starting Any Dev Session

Before any work, read:

1. .playbook/00-playbook.md
2. docs/code-standards.md
3. .playbook/\_index.md
   Confirm your understanding. Then wait for my instruction.

### Ending Any Dev Session

Before we close:

1. Run Playbook sync check on all docs touched this session
2. Update kit/04-progress.md with completions, decisions, and fixes
3. Update Current State in kit/01-process.md
4. Generate updated markdown for all changed kit files

### Error Recovery

Something has gone wrong. Stop all other work.
Identify the category: type error / test failure / Playbook drift / layer violation / other
Isolate: is it in code, in a Playbook doc, or both?
Propose a fix at the source — do not patch symptoms.
After fixing: re-run biome check, tests, and Playbook sync.
Log the resolution in kit/04-progress.md as a Fixed entry.

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

## 10. Quick Reference

### Document Types

| Type         | Owns                     | Key Fields                        |
| ------------ | ------------------------ | --------------------------------- |
| structure    | Shape and manifest       | scope, entry, contains            |
| orchestrator | Runtime flow             | triggers, sequence, emits         |
| component    | Logic unit               | parent, children, connects, emits |
| concern      | Cross-cutting capability | affects, provided-by              |
| integration  | External contract        | kind, used-by, config             |

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
- [ ] Structure section is accurate (structure and orchestrator types)
- [ ] Flow section is complete (orchestrator type only)

### PR Checklist Addition

- [ ] Playbook sync check — all touched .playbook/ docs reflect current implementation
- [ ] Living folder trees updated — all \_index.md Structure sections are current
- [ ] No new dependencies added without a Playbook doc
- [ ] No new components coded without a Playbook doc
- [ ] Emergent components traced back — parent and \_index.md updated
- [ ] Kit files updated if phase or state changed

---

_The doc is the contract. The code follows._
