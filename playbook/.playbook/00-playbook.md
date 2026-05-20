---
version: 1.1
requires: docs/code-standards.md
---

# Playbook — Architecture Reference

# File: playbook/.playbook/00-playbook.md

> Always load `docs/code-standards.md` alongside this file.
> This file defines structure. Code standards defines implementation.
> Neither is complete without the other.

---

## What It Is

Playbook is a pipeline where every component is defined in a structured document
before code is written. The document is the contract. AI generates code from it,
not ahead of it.

```
Context Kit -> PRD/Spec -> Flows (docs/flows/) -> Contracts (docs/contracts/) -> DDA -> Code -> Rollout
```

---

## Folder Structure

```
.playbook/
  00-playbook.md         — this file; always read first
  _index.md              — project manifest and living folder tree
  apps/                  — app-level DDA manifests and components
  packages/              — package-level DDA manifests and components
  _concerns/             — cross-cutting capabilities
  _integrations/         — third-party services and libraries
  _shared/               — components used across multiple apps/modules
  [module]/
    _index.md            — module manifest and folder tree
    [component].md       — individual component docs
docs/
  code-standards.md      — always loaded with this file
  flows/
    _index.md            — flows entry point (read this first)
    global.md            — rules that apply to every flow
    flow-*.md            — one file per flow
  contracts/
    _index.md            — contracts entry point (read this first)
    global.md            — rules that apply to every contract
    flow-*.md            — one file per flow, companion to flows/
  rollout/               — generated snapshots; never edit directly
.kit/
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

- `_index.md` is the manifest at every level — project, app, and module
- `_concerns/`, `_integrations/`, `_shared/` always live at `.playbook/` root
- Files: `kebab-case.md` — IDs must match filenames exactly (except `_index.md`)
- Folders: `kebab-case` — reserved folders use leading underscore
- Keep docs small: one responsibility per doc/file; max ~150 lines

---

## Document Types

### Universal Fields

All types share:

```
id:      # kebab-case — must match filename (except _index.md)
type:    # component | sequencer | structure | concern | integration
status:  # draft | active | deprecated
```

---

### structure

Project/module/app manifest. Defines scaffold, shape, and the living folder tree.
Always includes a `## Structure` section — linked annotated tree of everything in scope.

```
---
id: orchestrator
type: structure
scope: app
status: active
entry: [orchestrator-flow]
contains: [orchestrator-flow, task-claimer, task-scheduler]
integrations: [convex]
concerns: [logging, auth, error-handling]
---
Orchestrator app for the AI stack. Owns task coordination and agent dispatch.

## Structure
- [_index.md](./_index.md) — this file; manifest
- [orchestrator-flow.md](./orchestrator-flow.md) — sequencer doc
- [task-claimer.md](./task-claimer.md) — atomic task claim transaction
- [task-scheduler.md](./task-scheduler.md) — FIFO dispatch and resource gating
```

---

### sequencer

A runtime coordinator. Owns flow and sequencing, not business logic. Always references
`docs/flows/` and `docs/contracts/` rather than restating them. Always includes a
`## Flow` section and (optionally) a Mermaid diagram in `## Detail`.

```
---
id: orchestrator-flow
type: sequencer
status: active
parent: orchestrator
triggers: [TaskSubmitted]
sequence: [task-claimer, task-scheduler, role-resolver]
emits: [TaskDispatched]
concerns: [logging, auth]
---
Coordinates the orchestrator-side portions of the task lifecycle.
References docs/flows/flow-1-task.md and docs/contracts/flow-1-task.md
as source of truth — does not restate them.

## Flow
1. Load docs/flows/flow-1-task.md + docs/contracts/flow-1-task.md
2. On TaskSubmitted:
   a. [task-claimer](./task-claimer.md) — atomic claim
   b. [task-scheduler](./task-scheduler.md) — resource-aware dispatch gate
   c. [role-resolver](./role-resolver.md) — resolve role from task metadata
```

---

### component

A single unit of logic — service, use case, handler, repository, adapter implementation.

```
---
id: task-claimer
type: component
status: active
parent: orchestrator-flow
connects: [task-scheduler]
emits: [TaskClaimed]
concerns: [logging, error-handling]
---
Performs atomic Convex transaction to claim a queued task.
First write wins — prevents duplicate execution on concurrent dispatch or restart.

## Detail
- Atomic Convex transaction: claim + attempt increment in one write
- Concurrent claim attempt: first write wins, second discarded
- Follows docs/contracts/flow-1-task.md (CLAIMING section)
```

---

### concern

Cross-cutting capability that affects multiple modules/apps (logging, auth, error handling).

---

### integration

External boundary contract (Convex, Postgres, WorkOS, Docker, llama.cpp).

---

## Authoring Rules

Planned path (preferred):

```
Context Kit -> PRD/Spec -> Flows/Contracts -> DDA -> Code
```

Emergent path (acceptable):

```
DDA -> Code   (document immediately, then code)
```

Prohibited:

```
DDA doc without an approved flow — never
Code without a DDA doc — never
```

---

## AI Ingestion Load Order

```
1. .playbook/00-playbook.md          — this file
2. docs/code-standards.md            — implementation rules
3. docs/flows/_index.md              — flows entry point (as needed)
4. docs/contracts/_index.md          — contracts entry point (as needed)
5. .playbook/_index.md               — project shape
6. .playbook/apps/*/_index.md        — app shapes (as needed)
7. Relevant component/sequencer docs — task-scoped
8. _concerns/ + _integrations/       — cross-cutting + boundaries
```

Scoped packages — load only what the task needs:

```
New component:   00-playbook.md + code-standards.md + module _index.md + parent doc + _concerns/
Bug fix:         00-playbook.md + code-standards.md + component doc + its connects + concerns
Rollout doc:     Full .playbook/ tree + .kit/04-progress.md
Write tests:     Component doc + code-standards.md (testing section)
DDA doc:         Relevant flow file + contract file + parent _index.md
```

---

## AI Behavioral Rules

```
1.  Never write a DDA doc without first reading the relevant flow and contract files
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
13. Flows and contracts are locked before any DDA docs are authored
```

---

## Phase Completion Checklist

Run at the end of every development phase:

```
1. biome check        — zero errors
2. biome format       — zero diffs
3. tests              — all pass (where configured)
4. Playbook sync      — all touched .playbook/ docs reflect current code
5. Folder trees       — all _index.md Structure sections are current
6. Kit files          — 01-process.md, 03-execution.md, 04-progress.md updated
7. Rollout doc        — generated if a milestone completed
```
