# Playbook Pipeline
# File: .playbook/pipeline.md

> The complete reference for the Playbook pipeline.
> This document explains what each stage is and why it exists.
> For how AI implements it, read `AI-INSTRUCTIONS.md` and your
> vocabulary's `AI-INSTRUCTIONS.md`.
> For the foundation everything stands on, read `THE-STANDARD.md`.

---

## The Pipeline

```
[Map Existing] → Kit → Define → Plan → Flows → Contracts → Structure → Build → Ship
```

`[Map Existing]` is conditional — only for existing projects.
New projects start at Kit.

| Stage | What It Does | Where It Lives | Conditional |
|---|---|---|---|
| Map Existing | Maps what exists before building what should | `docs/rewrite/` | Existing projects only |
| Kit | Captures thinking, decisions, and progress | `.playbook/kit/` | Always |
| Define | Defines what to build and why | `docs/` | Always |
| Plan | Defines runtime or process paths | `docs/flows/` | Always |
| Contract | Defines implementation rules | `docs/contracts/` | Always |
| Structure | Defines every unit before it is built | `.playbook/` | Always |
| Build | Execution against definitions | project root | Always |
| Ship | Generated milestone snapshots | `docs/rollout/` | Always |

---

## Core Principle

### Progressive Disclosure + Tiering

Every format, template, and structure in Playbook follows this principle:

**Progressive disclosure** — surface the simplest, most human-readable version
first. Add depth below it. The same document serves multiple audiences
without sacrificing either.

**Tiering** — define a required core, then add sections only when the scope
or type demands it. Never burden simple cases with complex requirements.
Never let complex cases skip required coverage.

When any structural decision needs to be made — apply this principle first.

---

## Expansions

Expansions are optional pipeline stages that extend Playbook for specific needs.
They plug in around the core pipeline without changing it.

| Expansion | Plugs In | When to Use | Guide |
|---|---|---|---|
| Map Existing | Before Kit | Existing or legacy projects | `guides/expansions/map-existing.md` |

Activating an expansion:
Declare it in `.playbook/kit/01-process.md` under `Active Expansions` before use.

---

## Stage 0 — Map Existing

Only active when declared in `kit/01-process.md`.
New projects skip this stage entirely.

### Why This Stage Exists

Anything that already exists cannot be improved without first understanding
what it actually does — not what it was designed to do, but what it does
right now. Every assumption that turns out wrong costs time and effort.
This stage eliminates assumptions before they become problems.

### What It Produces

Three documents in `docs/rewrite/`:

| Document | What It Contains |
|---|---|
| `system-map.md` | What exists, where it lives, what depends on what |
| `decision-record.md` | Classification per unit with reasoning |
| `risk-register.md` | What breaks if X changes, migration constraints |

### Classification System

Every unit receives one classification:

| Classification | Meaning |
|---|---|
| Keep | Works as-is, no changes needed |
| Align | Works but needs to conform to new standards |
| Extract | Good logic in the wrong place — move it out |
| Rewrite | Wrong or too coupled — rebuild from scratch |
| Replace | Responsibility stays, tool or method changes |
| Discard | No longer needed — remove entirely |
| Defer | Decision not yet possible — needs more information |
| Evaluate | Uncertain — needs investigation before classifying |

Full guide: `guides/expansions/map-existing.md`

---

## Stage 1 — Kit

The Kit is the project management layer. It captures thinking, locks decisions,
and tracks progress across every session — with or without AI.

### Files

| File | Job | Updated |
|---|---|---|
| `kit/01-process.md` | Session spark — where you are, what comes next | Every session |
| `kit/02-exploration.md` | Decision log — open and closed | When decisions change |
| `kit/03-execution.md` | Guidelines, plan, tasks, known issues | When work changes |
| `kit/04-progress.md` | Append-only project history | Every session |
| `kit/05-kanban.md` | Ticket breakdown (optional) | When tickets change |
| `kit/06-qa.md` | Verification registry and sign-off (optional) | When tests change |

### Session Rhythm

```
Start   → load kit files, confirm current state
Work    → focus on what is in current state only
End     → update 01-process.md + 04-progress.md before closing
```

Never close a session without updating these two files.

Full guide: `guides/context-kit.md`

---

## Stage 2 — Define

Defines what is being built and why. The upstream input for everything else.

What belongs here: goals, outcomes, scope, acceptance criteria, constraints.
What does not: process paths, implementation rules, unit relationships, execution.

Stored in `docs/` — the project owns this, not Playbook.

---

## Stage 3 — Plan

Defines every major process path before any unit is designed.
Every path has a name, a trigger, a walkthrough, and all outcomes accounted for —
including the ones that fail.

### Path Taxonomy

By scope: Journey | Sequence | Operation | Composite | Compensation
By trigger: Request | Event | Background | Reactive | Webhook | Stream

Required sections for every path:
- What It Does — plain language
- Pre-conditions
- Post-conditions
- Walkthrough — narrative, then step-by-step with all branches

Stored in `docs/flows/`.

N/A — section considered, does not apply.
TODO — not documented; blocks active status.

---

## Stage 4 — Contract

Extracts implementation rules from paths.
All rules live here. Unit definitions reference contracts — never restate them.

Required sections for every contract:
- Happy Path
- Failure Modes
- Edge Cases
- Concurrency or Sequencing Rules
- Constraints

Required sections for `global.md`:
- Foundation Rules
- Trust and Access Boundaries
- Error and Recovery Rules
- Audit Requirements
- Cross-Cutting Constraints

Read `global.md` before any path-specific contract. Always.

Stored in `docs/contracts/`.

---

## Stage 5 — Structure

Defines every unit before it is built.
The definition is the contract. Execution follows it.

### Unit Types

| Type | Owns |
|---|---|
| Structure | Shape, manifest, and index of a project, app, or module |
| Coordinator | Runtime or process coordination — owns sequence, not logic |
| Unit | A single bounded responsibility |
| Concern | A cross-cutting capability |
| Integration | An external dependency contract |

**Coordinator vs unit:**
- Coordinator: receives a trigger, orders other units, routes work, branches by outcome
- Unit: performs one bounded responsibility — calculation, validation, storage, transformation
- Coordinators own sequence, not logic
- Logic inside a coordinator must be extracted into a unit with its own definition

### Document Structure

Every definition follows progressive disclosure:

```
What It Does    — plain language, any audience
Process         — required for coordinators; trigger, sequence, branches
Interface       — required for units; contract reference + signature
Detail          — edge cases, constraints — omit if nothing fits
```

Stored in `.playbook/` — domain subfolders defined by vocabulary guide.

---

## Stage 6 — Build

Execution against definitions.
The definition is the source of truth. Execution follows it — never ahead of it.

### What Compliant Execution Means

- All definitions are complete and active before execution begins
- Every path is handled — happy, failure, and edge cases
- No silent failures — every outcome is explicit
- No undefined dependencies — everything declared before use
- No partial implementations — all branches complete
- Definitions stay current as execution evolves — never let them drift
- Every session ends with updated kit files

### AI Boot Sequence

```
1. .playbook/AI-INSTRUCTIONS.md
2. vocabulary-[domain]/AI-INSTRUCTIONS.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md
6. Unit and coordinator definitions as needed
```

---

## Stage 7 — Ship

Generated artifacts — never authored manually.

Two purposes:
- Human-facing — delivery guide, release notes, migration steps
- Context-facing — full project snapshot for a fresh session or new team member

Stored in `docs/rollout/`.

---

## Adopting an Existing Project

For all adoption paths:
`guides/adopt.md`

---

## Phase Completion Checklist

### Any Stage

- [ ] Decisions logged in `kit/02-exploration.md`
- [ ] Progress logged in `kit/04-progress.md`
- [ ] Current state updated in `kit/01-process.md`
- [ ] Active expansions declared in `kit/01-process.md`

### Build Stage

- [ ] All definitions complete and active before execution
- [ ] All paths handled — happy, failure, edge cases
- [ ] No undefined dependencies
- [ ] No partial implementations
- [ ] Definitions updated to reflect current execution state
- [ ] Kit files updated
- [ ] Rollout doc generated if a milestone was completed

---

## Quick Reference

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | kebab-case | invoice-validator.md |
| IDs | match filename | id: invoice-validator |
| Folders | kebab-case | billing/ |
| Reserved folders | leading underscore | _concerns/ |
| Structure docs | always _index.md | billing/_index.md |
| Identity docs | ALL-CAPS | THE-STANDARD.md |

### Classification System (Map Existing expansion)

| Classification | Meaning |
|---|---|
| Keep | Works as-is |
| Align | Works but needs to conform to new standards |
| Extract | Good logic in the wrong place |
| Rewrite | Wrong or too coupled — rebuild |
| Replace | Responsibility stays, method changes |
| Discard | No longer needed |
| Defer | Decision not yet possible |
| Evaluate | Needs investigation |

---

*The work begins before the work begins.*
*The definition is the contract. Execution follows.*
