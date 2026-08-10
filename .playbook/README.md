# README
# File: .playbook/README.md

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
.playbook/          Planning docs — updated as the project evolves
  _index.md         Project map — structure, modules, status
  AI-INSTRUCTIONS.md Session rules — loaded at the start of every session
  guides/           How to use the pipeline for this project type
  vocabulary-[domain]/ Domain-specific language and templates
  _concerns/        Cross-cutting capabilities (logging, auth, error handling)
  _integrations/    External services and libraries
  _solutions/       Shared patterns (software projects)

.playbook/kit/               Session context — updated every session
  00-prompts.md     Session prompts — copy and use at session start
  01-process.md     Current phase, active goal, active expansions
  02-exploration.md Open questions and decisions
  03-execution.md   Current milestone tasks
  04-progress.md    Permanent log of completions and decisions
  05-kanban.md      Active task board (optional)
  06-qa.md          QA plan and sign-off (optional)

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
