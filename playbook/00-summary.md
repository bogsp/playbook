# Playbook — System Summary

# File: playbook/00-summary.md

## What It Is

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Every component is defined before it is
built. Everything built is reflected in the docs. Nothing drifts silently.

It combines four things into one coherent system:

- **Context Kit** — project management and decision tracking
- **Flows + Contracts** — runtime paths and implementation boundaries (before DDA)
- **DDA (Document-Driven Architecture)** — component-level structure and relationships
- **Code Standards** — implementation rules and tooling

---

## The Pipeline

```
Context Kit -> PRD/Spec -> Flows (docs/flows/) -> Contracts (docs/contracts/) -> DDA -> Code -> Rollout
```

| Stage       | What It Does                                                         | Where It Lives    |
| ----------- | -------------------------------------------------------------------- | ----------------- |
| Context Kit | Captures thinking, decisions, and progress across sessions           | `.kit/`           |
| PRD / Specs | Defines what to build and why                                        | `docs/`           |
| Flows       | Defines major runtime paths (split into small files)                 | `docs/flows/`     |
| Contracts   | Defines implementation boundaries and rules (split into small files) | `docs/contracts/` |
| DDA         | Defines how everything is structured and how parts relate            | `.playbook/`      |
| Code        | Implementation built against DDA contracts                           | `src/`            |
| Rollout     | Generated snapshots for support and AI context                       | `docs/rollout/`   |

---

## The Files

### Playbook Core

| File                       | Job                                                        |
| -------------------------- | ---------------------------------------------------------- |
| `PLAYBOOK.md`              | Pipeline starter — where to begin on any machine           |
| `.playbook/00-playbook.md` | AI boot file — read first every dev session                |
| `.playbook/_index.md`      | Project manifest and living folder tree                    |
| `docs/code-standards.md`   | Implementation rules — always paired with `00-playbook.md` |
| `docs/flows/_index.md`     | Flows entry point (chunked flow docs)                      |
| `docs/contracts/_index.md` | Contracts entry point (chunked contract docs)              |
| `docs/playbook-guide.md`   | Complete pipeline reference                                |

### Context Kit (always present)

| File                     | Job                                                         |
| ------------------------ | ----------------------------------------------------------- |
| `.kit/01-process.md`     | Workflow rules + Current State + Phase Completion Checklist |
| `.kit/02-exploration.md` | Open questions + closed decisions with dates and reasoning  |
| `.kit/03-execution.md`   | Guidelines, plan, tasks, and known issues                   |
| `.kit/04-progress.md`    | Append-only log of completions, decisions, and fixes        |

### Context Kit (optional modules)

| File                | Job                                              | When to use                                  |
| ------------------- | ------------------------------------------------ | -------------------------------------------- |
| `.kit/05-kanban.md` | Ticketed work breakdown with status and blocking | Complex execution with discrete deliverables |
| `.kit/06-qa.md`     | Test cases, failures log, and sign-off           | Any deliverable needing verification         |

### DDA Document Types

| Type          | Owns                      | Key Fields                                |
| ------------- | ------------------------- | ----------------------------------------- |
| `structure`   | Shape and manifest        | `scope`, `entry`, `contains`              |
| `sequencer`   | Runtime flow coordination | `triggers`, `sequence`, `emits`           |
| `component`   | Logic unit                | `parent`, `children`, `connects`, `emits` |
| `concern`     | Cross-cutting capability  | `affects`, `provided-by`                  |
| `integration` | External contract         | `kind`, `used-by`, `config`               |

### Guides

| File                          | Use When                                             |
| ----------------------------- | ---------------------------------------------------- |
| `guides/new-project.md`       | Starting a project from scratch                      |
| `guides/adopt-with-kit.md`    | Adopting Playbook — project has Context Kit files    |
| `guides/adopt-without-kit.md` | Adopting Playbook — project has no Context Kit files |

---

## How the Files Relate

```
.kit/03-execution.md           -> Acceptance Criteria seed  -> .kit/05-kanban.md
.kit/05-kanban.md (K-IDs)      -> Test case mapping         -> .kit/06-qa.md
.kit/05-kanban.md (Done)       -> Log completions           -> .kit/04-progress.md
.kit/06-qa.md (Failures)       -> New or updated tickets    -> .kit/05-kanban.md

docs/PRD.md                   -> Bootstrap input           -> docs/flows/ + docs/contracts/
docs/flows/ + docs/contracts/ -> Runtime + constraints      -> .playbook/ scaffold
.playbook/ docs               -> Code contracts            -> src/
.playbook/ + .kit/04-progress.md -> Compiled snapshot       -> docs/rollout/
```

---

## Rules the AI Follows

- Focus only on the active phase in `.kit/01-process.md`
- Do not revisit closed decisions unless explicitly asked
- Never write a DDA doc without an approved flow and contract
- Never write code without a Playbook doc
- Never add a dependency not declared in the doc
- Always run sync check before closing any task
- Append to `.kit/04-progress.md` — never edit or delete dated entries
- Update the living folder tree when components change

---

## Key Conventions

- Flows and contracts are chunked: many small files + `_index.md` entry points
- DDA docs: YAML frontmatter + one-paragraph narrative + optional `## Detail`
- Files: `kebab-case.md` — IDs match filenames exactly
- Reserved folders: `_concerns/`, `_integrations/`, `_shared/`
- Structure docs: always `_index.md` with a `## Structure` living tree
- Sequencers: include `## Flow` and (optionally) Mermaid in `## Detail`
- Kanban tickets: `K-01`, `K-02` prefix; QA tests: `QA-01` prefix
- Progress log: append-only; **In Progress** is always the last section
