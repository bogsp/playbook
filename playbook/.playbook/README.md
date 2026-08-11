---
file: '.playbook/README.md'
responsibility: 'Orientation for anyone — human or AI — starting a Playbook-scaffolded project. First file loaded, points to everything else.'
ai_instructions: 'Load first in every session. Do not reorder Start Here or Session Boot Order without a logged architectural decision.'
archive_rule: 'N/A — core orientation file.'
---

# README

This is a Playbook project. Playbook is a planning pipeline for AI-assisted work.
It keeps planning docs, session context, and implementation in sync so nothing
gets lost between sessions and AI never works ahead of what's been decided.

---

## Start Here

If you are new to this project, read in this order:

1. This file — orientation
2. `.playbook/AI-INSTRUCTIONS.md` — rules for every AI session
3. `.playbook/_index.md` — what this project contains and how it is structured
4. `.playbook/kit/01-process.md` — where the project is right now
5. `.playbook/kit/04-progress.md` — what has been completed and decided

> Not running the full pipeline — just want session continuity across
> restarts? See [guides/context-kit-standalone.md](guides/context-kit-standalone.md)
> instead. For any other situation, [guides/\_index.md](guides/_index.md) routes
> you to the right guide.

---

## Session Boot Order

Load these files at the start of every AI session, in order:

1. `.playbook/README.md` — this file
2. `.playbook/AI-INSTRUCTIONS.md` — session rules
3. `docs/code-standards.md` — implementation rules (software projects)
4. `.playbook/_index.md` — project map
5. `.playbook/kit/01-process.md` — current phase and active expansions
6. `.playbook/kit/04-progress.md` — recent completions and decisions
7. `.playbook/kit/05-kanban.md` — active tasks (load if kanban is active)

Then load the module and component docs relevant to the current task.

---

## How Playbook Works

**Planning first.** Every component, flow, and contract is defined in a planning
doc before any work begins. AI works against the planning doc — not ahead of it.

**Kit files track state.** The `.playbook/kit/` folder holds the project's working memory —
current phase, active tasks, progress log, QA plan. These are updated every session.

**Docs are the deliverable.** `docs/flows/` and `docs/contracts/` define how the
project behaves. They are part of the project, not just notes about it.

**Nothing changes without a human deciding.** AI flags ambiguity and waits.
It does not resolve uncertainty silently.

---

## Folder Map

```
.playbook/
  README.md                         — orientation, where to start
  pipeline.md                       — how the pipeline works, all stages
  AI-INSTRUCTIONS.md                — universal AI session rules
  _index.md                         — this file; project map
  maintenance.md                    — keeping files lean and current
  templates.md                      — universal planning document shapes
  _concerns/                        — cross-cutting capabilities (auth, logging, etc.)
  _integrations/                    — external service and library contracts
  _shared/                          — components used across modules
  guides/                           — situational guides; start at guides/_index.md
  kit/                              — session context — updated every session

docs/               Project deliverables — part of the project
  flows/            Runtime flow definitions
  contracts/        Behavior contracts for flows
  rollout/          Milestone summaries
  rewrite/          Audit outputs (audit projects only)
```

---

## File Rules

- Every generated file includes its filename and full path at the top
- Planning docs are never deleted — mark `status: inactive` instead
- Kit files are updated before every session ends or at 80% context — do not wait to be asked
- No code is written without a planning doc for the component
- No planning doc is marked `status: active` with unresolved TODOs
