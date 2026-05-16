# Playbook — System Summary

## What It Is

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Every component is defined before it is
built. Everything built is reflected in the docs. Nothing drifts silently.

It combines three things into one coherent system:
- **Context Kit** — project management and decision tracking
- **DDA (Document-Driven Architecture)** — component-level structure and relationships
- **Code Standards** — implementation rules and tooling

---

## The Pipeline

```
Context Kit   →   PRD / Specs   →   DDA   →   Code   →   Rollout
```

| Stage | What It Does | Where It Lives |
|---|---|---|
| Context Kit | Captures thinking, decisions, and progress across sessions | `kit/` |
| PRD / Specs | Defines what to build and why | `docs/` |
| DDA | Defines how everything is structured and how parts relate | `.playbook/` |
| Code | Implementation built against DDA contracts | `src/` |
| Rollout | Generated snapshots for support and AI context | `docs/rollout/` |

---

## The Files

### Playbook Core

| File | Job |
|---|---|
| `PLAYBOOK.md` | Pipeline starter — where to begin on any machine |
| `.playbook/00-playbook.md` | AI boot file — read first every dev session |
| `.playbook/_index.md` | Project manifest and living folder tree |
| `docs/code-standards.md` | Implementation rules — always paired with `00-playbook.md` |
| `docs/playbook-guide.md` | Complete pipeline reference |

### Context Kit (always present)

| File | Job |
|---|---|
| `kit/01-process.md` | Workflow rules + Current State + Phase Completion Checklist |
| `kit/02-exploration.md` | Open questions + closed decisions with dates and reasoning |
| `kit/03-execution.md` | Guidelines, plan, tasks, and known issues |
| `kit/04-progress.md` | Append-only log of completions, decisions, and fixes |

### Context Kit (optional modules)

| File | Job | When to use |
|---|---|---|
| `kit/05-kanban.md` | Ticketed work breakdown with status and blocking | Complex execution with discrete deliverables |
| `kit/06-qa.md` | Test cases, failures log, and sign-off | Any deliverable needing verification |

### DDA Document Types

| Type | Owns | Key Fields |
|---|---|---|
| `structure` | Shape and manifest | `scope`, `entry`, `contains` |
| `orchestrator` | Runtime flow | `triggers`, `sequence`, `emits` |
| `component` | Logic unit | `parent`, `children`, `connects`, `emits` |
| `concern` | Cross-cutting capability | `affects`, `provided-by` |
| `integration` | External contract | `kind`, `used-by`, `config` |

### Guides

| File | Use When |
|---|---|
| `guides/new-project.md` | Starting a project from scratch |
| `guides/adopt-with-kit.md` | Adopting Playbook — project has Context Kit files |
| `guides/adopt-without-kit.md` | Adopting Playbook — project has no Context Kit files |

---

## How the Files Relate

```
kit/03-execution.md           →  Acceptance Criteria seed  →  kit/05-kanban.md
kit/05-kanban.md (K-IDs)      →  Test case mapping         →  kit/06-qa.md
kit/05-kanban.md (Done)       →  Log completions           →  kit/04-progress.md
kit/06-qa.md (Failures)       →  New or updated tickets    →  kit/05-kanban.md

docs/prd.md                   →  Bootstrap input           →  .playbook/ scaffold
.playbook/ docs               →  Code contracts            →  src/
.playbook/ + 04-progress.md   →  Compiled snapshot         →  docs/rollout/
```

---

## Session Patterns

### A) Starting a new project
1. Read `guides/new-project.md`
2. Upload `kit/01-process.md` + `kit/03-execution.md`
3. Describe the project and ask AI to populate the files
4. Upload `kit/02-exploration.md` + `kit/04-progress.md`
5. Work through the pipeline stage by stage

### B) Resuming a project
1. Upload current `kit/01-process.md` + `kit/03-execution.md`
2. Upload current `kit/02-exploration.md` + `kit/04-progress.md`
3. Add active modules if applicable
4. Use the resume prompt from `kit/00-prompts.md`

### C) Starting a dev session
1. Upload `.playbook/00-playbook.md` + `docs/code-standards.md`
2. Upload `.playbook/_index.md` + relevant component docs
3. Use the dev session boot prompt from `kit/00-prompts.md`

### D) Adopting an existing project
1. Read the appropriate guide in `guides/`
2. Follow the four-step adoption flow
3. Nothing breaks — Playbook grows around the existing project

---

## Rules the AI Follows

- Focus only on the active phase in `kit/01-process.md`
- Do not revisit closed decisions unless explicitly asked
- Never write code without a Playbook doc
- Never add a dependency not declared in the doc
- Always run sync check before closing any task
- Append to `kit/04-progress.md` — never edit or delete entries
- Update the living folder tree when components change
- At 80%+ session length, offer to update all files for copy-paste handoff

---

## Key Conventions

- DDA docs: YAML frontmatter + one-paragraph narrative + optional `## Detail`
- Files: `kebab-case.md` — IDs match filenames exactly
- Reserved folders: `_concerns/`, `_integrations/`, `_shared/`
- Structure docs: always `_index.md` with a `## Structure` living tree
- Orchestrators: always include `## Flow` and Mermaid diagram in `## Detail`
- Kanban tickets: `K-01`, `K-02` prefix; QA tests: `QA-01` prefix
- Progress log: append-only; **In Progress** is always the last entry
- Commits: grouped by scope — `dda:`, `kit:`, `[module]:`, `fix:`, `chore:`
