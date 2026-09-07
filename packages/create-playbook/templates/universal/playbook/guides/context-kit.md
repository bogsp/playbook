---
file: '.playbook/guides/context-kit.md'
responsibility: 'How the Context Kit works inside the full Playbook pipeline — session files plus staged planning.'
ai_instructions: 'Load when a session is running the full pipeline (Discovery, Mapping, Rules, Planning, Work, Handoff), not just kit files alone.'
archive_rule: 'N/A — orientation guide.'
---

# The Context Kit

Every project loses context between sessions. Without a system, every restart wastes time re-explaining what was already decided and re-discovering what was already built.

The context kit solves this with a small set of files — each with one job. `.playbook/_index.md` is the entry point every session starts with; the kit files below carry the working history on top of it.

> This guide covers Context Kit usage **inside the full Playbook pipeline**
> (`pipeline-mode: full` in `.playbook/_index.md`) — alongside Discovery,
> Mapping, Rules, Planning, Work, and Handoff. If `pipeline-mode` is
> `kit-only` (the default for new projects), see
> [context-kit-standalone.md](context-kit-standalone.md) instead — same
> files, none of the pipeline overhead.

---

## The Files

| File                                          | Job                                       | Update when      |
| --------------------------------------------- | ------------------------------------------ | ---------------- |
| [01-process.md](../kit/01-process.md)         | Where you are and what comes next         | Every session    |
| [02-exploration.md](../kit/02-exploration.md) | Open questions and settled decisions      | Decisions change |
| [03-execution.md](../kit/03-execution.md)     | Guidelines, plan, tasks, known issues     | Work changes     |
| [04-progress.md](../kit/04-progress.md)       | Everything that's happened — never edited | Every session    |
| [05-kanban.md](../kit/05-kanban.md)           | Work tickets — optional                   | Tickets change   |
| [06-qa.md](../kit/06-qa.md)                   | Checks and sign-off — optional            | Checks change    |

---

## Session Rhythm

Every session follows the same pattern:

**Start**
Read [`_index.md`](../_index.md) first — session rules and structure live there. Then load the kit files (see "Starting a Session" below). Confirm the current state before doing any work.

**Work**
Stay focused on what is in `01-process.md`. Log decisions and issues as they come up — don't save them for the end.

**End**
Update `01-process.md` — last completed, what's next.
Append to `04-progress.md` — completions, decisions, fixes. Fold any prior `In Progress` entry into a `Decided`/`Completed` note first — only one should exist at a time.

These two files are updated every session without exception. Everything else is optional.

---

## Starting a Session with AI

Attach `_index.md` and the current kit files together, in one message. Most current AI tools (Claude, Gemini, and similar) have no hard limit that requires splitting this up.

**Attach:** `.playbook/_index.md`, `kit/01-process.md`, `kit/02-exploration.md`, `kit/03-execution.md`, `kit/04-progress.md` (+ `kit/05-kanban.md`, `kit/06-qa.md` if active)

> I'm resuming a Playbook project. Everything you need is attached —
> `_index.md` for session rules and structure, plus the current kit files.
> Confirm the current state briefly, then wait for my instruction. Do not
> reopen settled decisions unless I ask.

**If your tool limits what you can attach at once:** send `_index.md` + `01-process.md` + `04-progress.md` first — that alone is usually enough to resume. Send the rest only if the task needs it: an open decision → `02-exploration.md`; active tasks → `03-execution.md`; tickets → `05-kanban.md`; QA → `06-qa.md`.

---

## How the Kit Fits the Pipeline

The kit is not a stage — it runs beneath every stage from start to finish.

| Pipeline stage | Kit touchpoint                                                          |
| -------------- | ------------------------------------------------------------------------ |
| Audit          | Findings feed into `02-exploration.md` and `03-execution.md` on handoff |
| Discovery      | Goals and criteria live in `03-execution.md`                            |
| Mapping        | Flow decisions close in `02-exploration.md` with references             |
| Rules          | Contract decisions close in `02-exploration.md`                         |
| Planning       | Component decisions close in `02-exploration.md`                        |
| Work           | Progress in `04-progress.md`; issues in `03-execution.md`               |
| Handoff        | Milestone logged in `04-progress.md`; state updated in `01-process.md`  |

---

## Keeping Files Lean

Active files hold what is current. Archives hold the history.

| File                | Archive when                                             |
| -------------------- | ---------------------------------------------------------- |
| `02-exploration.md` | A settled decision no longer affects any active task     |
| `04-progress.md`    | Entries are from a completed phase                       |
| `05-kanban.md`      | Done tickets are no longer referenced by anything active |

Move archived content to `_archives/`. Never delete.

---

## Declaring an Expansion

When an expansion is active, declare it in `01-process.md`:

```
Active Expansions: video-insights

Active Expansions: audit: inventory
```

Update the phase as it advances. Clear it when the expansion is complete.

---

## If Context Drifts Mid-Session

If the AI starts ignoring the uploaded files or suggesting things already decided:

> Stop. Your only source of truth is the files uploaded at session start.
> Ignore all prior conversation context. Re-read the uploaded files before continuing.

If it persists, start a fresh session using the most recent [milestone snapshot](../../../docs/rollout/) as context.
