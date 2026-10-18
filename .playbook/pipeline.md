---
file: '.playbook/pipeline.md'
responsibility: 'Complete reference for how the Playbook pipeline works — every stage, every output, every format.'
ai_instructions: 'Read as much or as little as needed. Points to templates and guides rather than duplicating them.'
archive_rule: 'N/A — core reference file, kept current as stages evolve.'
---

# Playbook Pipeline

This is the complete reference for how Playbook works — every stage, every
output, every format. Read as much or as little as you need.

---

## The Big Picture

Playbook moves every project through the same stages, in order. Each stage
produces something concrete that the next stage builds on. Skipping a stage
means the next one is built on guesswork.

```
Thinking → Discovery → Mapping → Rules → Planning → Work → Handoff
```

Existing projects add one stage at the front — understanding what already
exists before anything changes.

| Stage | Plain language | Produces |
|---|---|---|
| 0 — Audit | Understand what already exists | Findings in `docs/rewrite/` |
| 1 — Thinking | Get aligned and stay aligned | Session files in [kit/](kit/) |
| 2 — Discovery | Define what you're making and why | A brief in `docs/` |
| 3 — Mapping | Walk every path before building anything | Path documents in `docs/flows/` |
| 4 — Rules | Write what every piece must follow | Rules documents in `docs/contracts/` |
| 5 — Planning | Define every piece before touching it | Planning documents in `.playbook/` |
| 6 — Work | Do the work against the plan | Your output |
| 7 — Handoff | Capture what was built and why | A snapshot in `docs/rollout/` |

---

## Stage 0 — Audit *(existing projects only)*

Before redesigning or rebuilding something, you need to understand what it
actually is — not what you think it is. This stage maps it.

**Phases:** inventory → audit → classify → risk-map → gap-report → handoff

Each phase requires your review before moving to the next. Nothing advances
on its own.

**What it produces:**
- `docs/rewrite/system-map.md` — what exists, where it lives, what depends on what
- `docs/rewrite/decision-record.md` — a verdict on every major piece, with reasoning
- `docs/rewrite/risk-register.md` — what breaks if X changes, and the safe order to change things

When complete, findings feed directly into the session files so the rest of
the pipeline has accurate context to work from.

Full guide: [Audit in expansions.md](../playbook/.playbook/expansions.md#audit)

---

## Stage 1 — Thinking *(always active)*

This isn't a stage that completes — it runs underneath every other stage from
start to finish. It's how you and your AI stay aligned across sessions.

| File | What it holds |
|---|---|
| [kit/01-process.md](kit/01-process.md) | Where you are and what comes next |
| [kit/02-exploration.md](kit/02-exploration.md) | Open questions and settled decisions |
| [kit/03-execution.md](kit/03-execution.md) | Guidelines, plan, tasks, known issues |
| [kit/04-progress.md](kit/04-progress.md) | Everything that's happened — never edited, only added to |
| [kit/05-kanban.md](kit/05-kanban.md) | Work tickets, when the project needs them (optional) |
| [kit/06-qa.md](kit/06-qa.md) | Checks and sign-off, when the project needs them (optional) |

Update `kit/01-process.md` and `kit/04-progress.md` at the end of every
session. These two files are never optional.

Full guide and session prompts: [kit/00-guide.md](../playbook/.playbook/kit/00-guide.md)

---

## Stage 2 — Discovery

Define what you're making, why, and for whom. Everything else flows from
this. This stage is complete when anyone can read the document and understand
the goal.

**Produces:** `docs/[name].md` — goals, audience, constraints, acceptance criteria
**Done when:** document approved, acceptance criteria are clear and verifiable

---

## Stage 3 — Mapping

Walk through every major path the project will take — including what happens
when things go wrong — before defining any individual piece. Problems live in
the connections between things, not inside the things themselves.

**Produces:** `docs/flows/_index.md` + one `docs/flows/flow-N-[name].md` per path
**Done when:** every major path has a document, all reviewed and agreed on

Template: [playbook/docs/flows/flow.md](../playbook/docs/flows/flow.md)

---

## Stage 4 — Rules

Write down what every piece must follow, drawn from the paths you mapped.
This is where behaviour lives — individual planning documents point here,
they never repeat it.

**Produces:** `docs/contracts/_index.md` + `docs/contracts/global.md` + one `docs/contracts/flow-N-[name].md` per path
**Done when:** all required sections complete, no section marked TODO

Templates: [playbook/docs/contracts/contract.md](../playbook/docs/contracts/contract.md), [playbook/docs/contracts/global.md](../playbook/docs/contracts/global.md)

---

## Stage 5 — Planning

Define every piece of the project before doing any work on it. A planning
document is the agreement — the work follows it.

**Produces:** `_index.md` + one planning document per piece
**Done when:** all documents approved, project map current, no section marked TODO

Templates: [vocabulary-[domain]/templates/](../playbook/.playbook/vocabulary-software/templates/_index.md) and [templates/](../playbook/.playbook/templates/_index.md)

### Planning Document Types

Every piece in a project gets one of these document types:

| Type | What it's for | Plain language |
|---|---|---|
| `structure` | A module or app | The map of a section — what's in it and how the pieces relate |
| `coordinator` | Something that sequences other pieces | Owns the order of operations, not the logic itself |
| `component` | A single piece of work | One job, one responsibility, clearly defined inputs and outputs |
| `concern` | A rule or capability that applies everywhere | Things like security, logging, error handling — defined once, used everywhere |
| `integration` | A connection to an outside tool or service | What the outside thing provides and how the project depends on it |

Every planning document follows the same shape — plain language first,
technical detail below:

```
## What It Does    → plain language, any reader
## Interface       → what goes in, what comes out, what rules apply
## Detail          → edge cases and constraints only — leave this out if nothing fits
```

---

## Stage 6 — Work

Do the work against the planning documents. The plan is the source of truth —
if the work diverges from it, update the plan first, then continue.

**Done when:** all acceptance criteria met, all checks pass, sync check clean

Run the Phase Completion Checklist in [docs/code-standards.md](../docs/code-standards.md)
(if your project has one) before closing any phase.

---

## Stage 7 — Handoff

A snapshot of what was built and why, generated at each milestone. Never
written by hand — always generated from the planning documents and session
history.

**Produces:** `docs/rollout/[milestone].md`
**Done when:** snapshot generated, kit files reflect final state

Use prompt: [kit/00-guide.md](../playbook/.playbook/kit/00-guide.md) → **Generate a milestone summary**

**Resuming from a milestone:** If you're starting a fresh AI session and want
to pick up from a previous milestone, load `docs/rollout/[milestone].md`
alongside [_index.md](_index.md). The snapshot gives the AI the full context
of where the project stands.

---

## Why Playbook Works This Way

Playbook is built on one principle: **Progressive Disclosure + Tiering**.

Start with the simplest version. Add depth only when the work demands it.
Define what's always required, then add sections only when the project's
scope makes them necessary.

This means:
- Simple projects carry only what they need — no extra weight
- Complex projects never skip what simpler ones must do
- Every reader, human or AI, stops when they have enough — the detail is
  always there if they need it

---

## Reference: File Naming

| Thing | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `invoice-validator.md` |
| IDs | match the filename | `id: invoice-validator` |
| Folders | `kebab-case` | `billing/` |
| Reserved folders | underscore prefix | `_concerns/` |
| Index files | always `_index.md` | `billing/_index.md` |

**Two markers used throughout:**
- `N/A` — this section was considered and does not apply
- `TODO` — not yet written; a document can't be marked approved until all TODOs are resolved

**Declaring an active expansion** in [kit/01-process.md](kit/01-process.md):

```
Active Expansions: video-insights

Active Expansions:
  audit: classify
```
