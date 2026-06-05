# The Context Kit
# File: .playbook/guides/context-kit.md

The Kit is the session and decision layer of the Playbook pipeline.
It keeps you — and anyone helping you, including AI — aligned across
every session, every stage, and every decision from the first idea
to the finished work.

The Kit works without AI. AI makes it more efficient.
The discipline is yours regardless.

---

## What the Kit Is

Every project loses context between sessions. Without a system,
every restart wastes time re-explaining what was already decided,
re-discovering what was already built, and re-correcting what was
already resolved.

The Kit solves this with four files, each with one job:

| File | Job |
|---|---|
| `01-process.md` | Session spark — where you are, what comes next |
| `02-exploration.md` | Decision log — what is open, what is closed |
| `03-execution.md` | Work definition — guidelines, plan, tasks, issues |
| `04-progress.md` | Project history — append-only record of everything done |

Two optional modules activate when the work demands them:

| File | Job | When |
|---|---|---|
| `05-kanban.md` | Ticket breakdown | Complex execution with discrete deliverables |
| `06-qa.md` | Verification registry and sign-off | Any deliverable needing verification |

---

## How It Fits in the Pipeline

The Kit is not a stage that completes and hands off.
It is the persistent layer running beneath every stage.

```
                    Kit (always active)
                         |
[Map] → Define → Plan → Contract → Structure → Build → Ship
```

Every stage has a kit touchpoint:

| Stage | Kit Touchpoint |
|---|---|
| Map Existing | Findings feed `02-exploration.md` and `03-execution.md` on handoff |
| Define | Goals and criteria live in `03-execution.md` |
| Plan | Flow decisions close in `02-exploration.md` with Flow references |
| Contract | Contract decisions close in `02-exploration.md` |
| Structure | Unit decisions close in `02-exploration.md` |
| Build | Progress in `04-progress.md`; issues in `03-execution.md` |
| Ship | Milestone in `04-progress.md`; state updated in `01-process.md` |

---

## The Four Files

### `01-process.md` — Session Spark

Updated at the end of every session. Read at the start of the next.

```
Phase:              Define | Plan | Contract | Structure | Build | Ship
Last Completed:     Most recent milestone
Next:               Active goal
Active Modules:     05-kanban | 06-qa | none
Active Expansions:  map-existing: [phase] | none
```

This is the baton pass. When you open a new session, this file tells
anyone — including AI — exactly where to pick up.

**Rule:** Never close a session without updating this file.

---

### `02-exploration.md` — Decision Log

Two states. Nothing else.

**Open Topics** — questions still being explored.
Gets resolved or dropped. Never stays open indefinitely.

**Closed Decisions** — dated, reasoned, permanent.
Once closed, never edited. Only reopened explicitly
with a new dated entry explaining why.

```
## Open Topics

**Authentication Approach**
- Evaluating options A, B, C
- Constraint: must work with existing system
- Ref: kit/_refs/research/auth-comparison.md

---

## Closed Decisions

**2026-06-04 — Primary Database**
- What: PostgreSQL over alternatives
- Why: Team familiarity, proven at scale
- Alternatives considered: SQLite (too limited), MySQL (licensing)
- Flow: docs/flows/flow-1-data-access.md
```

**Rule:** If a decision produces a flow, it must reference it.
If a flow exists, it must be traceable to a closed decision.

---

### `03-execution.md` — Work Definition

Three sections:

**Guidelines** — how the work is done. Declared once, followed every session.

**Plan** — what is being built. Goals, outcomes, scope, acceptance criteria.
Criteria seed both `05-kanban.md` and `06-qa.md`.

**Action** — what is left to do.

Plus a **Known Issues** table — typed, severity-rated, dependency-aware.

**Rule:** A known issue without type and severity cannot be assessed.

---

### `04-progress.md` — Project History

Append-only. Entries never edited or deleted. Ever.

Three entry types:
- **Completed** — a deliverable or task finished
- **Decided** — a decision made and closed
- **Fixed** — a known issue resolved

One special entry:
- **In Progress** — always the last entry, overwritten each session

**Rule:** If it happened, it gets logged.
If it did not happen, it does not get added retroactively.

---

## Session Rhythm

Every session follows the same rhythm:

```
Start    Load kit files (2 messages if using AI, ~2 minutes)
         Confirm current state before any work begins

Work     Focus only on what is in Current State
         Log decisions and issues as they arise

End      Update 01-process.md — Last Completed, Next
         Append to 04-progress.md — Completed, Decided, Fixed, In Progress
         Update 03-execution.md if tasks or issues changed
         Archive if files are getting long
```

**Rule:** Never close a session without updating `01-process.md`
and `04-progress.md`. Everything else is optional. These two never are.

---

## The Two-Message Pattern (with AI)

**Message 1** — upload `01-process.md` + `03-execution.md`

```
I'm resuming a Playbook project. I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.
```

**Message 2** — upload `02-exploration.md` + `04-progress.md`

```
Here is the context from earlier work. Just provide a brief confirmation.
```

Add `05-kanban.md` and `06-qa.md` when active.

**Why this order matters:**
Message 1 orients. Message 2 contextualizes.
Orientation before context. Always.

---

## Research Insights

When external research — videos, articles, papers — is relevant to the project,
capture it in `kit/_refs/research/` and discuss it before integrating.

**The workflow:**

```
Find source
    ↓
Extract with an AI tool → kit/_refs/research/[kebab-title].md
    ↓
Discuss in a Playbook session
    ↓
Decide: Integrate | Discard | Defer
    ↓
Log in 04-progress.md
```

**Rules:**
- Never integrate directly from a reference without discussion first
- Connections are filled during session — not during extraction
- Discarded references stay in `_refs/` as a record
- Every integrated insight is traceable via `Ref:` in `02-exploration.md`

See `kit/00-prompts.md` for extraction and discussion prompts.

---

## Keeping Files Lean

**Active files are current and actionable.**
**Archives own the history.**

When to archive:

| File | Archive when |
|---|---|
| `02-exploration.md` | Closed decision no longer gates any active task or definition |
| `04-progress.md` | Entries older than the current phase |
| `05-kanban.md` | Done tickets no longer referenced by any active test or issue |

Move archived content to `kit/_archives/`. Never delete.

---

## Declaring Expansions

When an expansion is active, declare it in `01-process.md`:

```
Active Expansions: map-existing: inventory
```

Update the phase as it advances:
```
Active Expansions: map-existing: classify
```

Mark complete when handoff is done:
```
Active Expansions: map-existing: complete
```

Clear next session:
```
Active Expansions: none
```

---

## Context Rot

Signs that context has drifted:
- Ignoring Current State in `01-process.md`
- Suggesting decisions already in Closed Decisions
- Producing output inconsistent with uploaded files

**Recovery:**
```
Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read AI-INSTRUCTIONS.md and vocabulary AI-INSTRUCTIONS.md.
```

If rot persists, start a fresh session with a Ship doc as context.

**Prevention:**
- Keep files under 300 lines where possible
- Archive regularly
- Start a new session at major milestones

---

## Quick Reference

| File | Owns | Does Not Own |
|---|---|---|
| `01-process.md` | Session state | Rules, conventions, history |
| `02-exploration.md` | Active decisions | Deprecated decisions (archive) |
| `03-execution.md` | Active work definition | Pipeline conventions |
| `04-progress.md` | Project history | Anything not yet done |
| `05-kanban.md` | Active tickets | Task definitions (03-execution.md) |
| `06-qa.md` | Verification registry, sign-off | Test detail (_tests/) |

### Non-Negotiables

- `01-process.md` updated every session — no exceptions
- `04-progress.md` append-only — entries never edited or deleted
- Closed decisions stay closed unless explicitly reopened
- Known issues have type, severity, and blocked-by — or they are not actionable
- Files are current and lean — history lives in `_archives/`
