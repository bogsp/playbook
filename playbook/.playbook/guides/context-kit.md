# The Context Kit
# File: .playbook/guides/context-kit.md

Every project loses context between sessions. Without a system, every restart wastes time re-explaining what was already decided and re-discovering what was already built.

The context kit solves this with a small set of files — each with one job. Upload them at the start of any session and pick up exactly where you left off.

---

## The Files

| File | Job | Update when |
|---|---|---|
| [01-process.md](../kit/01-process.md) | Where you are and what comes next | Every session |
| [02-exploration.md](../kit/02-exploration.md) | Open questions and settled decisions | Decisions change |
| [03-execution.md](../kit/03-execution.md) | Guidelines, plan, tasks, known issues | Work changes |
| [04-progress.md](../kit/04-progress.md) | Everything that's happened — never edited | Every session |
| [05-kanban.md](../kit/05-kanban.md) | Work tickets — optional | Tickets change |
| [06-qa.md](../kit/06-qa.md) | Checks and sign-off — optional | Checks change |

---

## Session Rhythm

Every session follows the same pattern:

**Start**
Load the kit files. Use the two-message pattern below if working with AI. Confirm the current state before doing any work.

**Work**
Stay focused on what is in `01-process.md`. Log decisions and issues as they come up — don't save them for the end.

**End**
Update `01-process.md` — last completed, what's next.
Append to `04-progress.md` — completions, decisions, fixes, what's in progress.

These two files are updated every session without exception. Everything else is optional.

---

## Starting a Session with AI — Two Messages

**Message 1** — attach `01-process.md` and `03-execution.md`, then send:

> I'm resuming a Playbook project. Files coming in two messages.
> This message: process and execution. Next: exploration and progress.
> Focus only on what is current. Do not reopen settled decisions unless I ask.
> Brief confirmation only.

**Message 2** — attach `02-exploration.md` and `04-progress.md`, then send:

> Here is the context from earlier work. Brief confirmation only.

Add `05-kanban.md` and `06-qa.md` when active.

Message 1 orients. Message 2 contextualises. Always in that order.

---

## How the Kit Fits the Pipeline

The kit is not a stage — it runs beneath every stage from start to finish.

| Pipeline stage | Kit touchpoint |
|---|---|
| Audit | Findings feed into `02-exploration.md` and `03-execution.md` on handoff |
| Discovery | Goals and criteria live in `03-execution.md` |
| Mapping | Flow decisions close in `02-exploration.md` with references |
| Rules | Contract decisions close in `02-exploration.md` |
| Planning | Component decisions close in `02-exploration.md` |
| Work | Progress in `04-progress.md`; issues in `03-execution.md` |
| Handoff | Milestone logged in `04-progress.md`; state updated in `01-process.md` |

---

## Keeping Files Lean

Active files hold what is current. Archives hold the history.

| File | Archive when |
|---|---|
| `02-exploration.md` | A settled decision no longer affects any active task |
| `04-progress.md` | Entries are from a completed phase |
| `05-kanban.md` | Done tickets are no longer referenced by anything active |

Move archived content to `_archives/`. Never delete.

---

## Declaring an Expansion

When an expansion is active, declare it in `01-process.md`:

```
Active Expansions: video-insights

Active Expansions:
  reverse-engineer: inventory
```

Update the phase as it advances. Clear it when the expansion is complete.

---

## If Context Drifts Mid-Session

If the AI starts ignoring the uploaded files or suggesting things already decided:

> Stop. Your only source of truth is the files uploaded at session start.
> Ignore all prior conversation context. Re-read the uploaded files before continuing.

If it persists, start a fresh session using the most recent [milestone snapshot](../../../docs/rollout/) as context.
