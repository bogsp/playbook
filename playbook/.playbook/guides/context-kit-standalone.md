---
file: '.playbook/guides/context-kit-standalone.md'
responsibility: 'How to use the six Context Kit files on their own — no Playbook pipeline required.'
ai_instructions: 'Load when a session is using only kit files, with no docs/flows, docs/contracts, or planning documents present.'
archive_rule: 'N/A — orientation guide.'
---

# The Context Kit — Standalone Use

You don't need the rest of Playbook to get value from the Context Kit. The six
files below work on their own for any ongoing project — tracking decisions,
tasks, and history across AI sessions without a discovery brief, flow
documents, contracts, or planning documents.

If you later want the full pipeline — mapped paths, written contracts,
planning documents before code — see [context-kit.md](context-kit.md) for the
Playbook-integrated version. Nothing here is wasted if you grow into it: the
same six files carry forward unchanged.

---

## The Files

| File                                          | Job                                       | Update when      |
| --------------------------------------------- | ----------------------------------------- | ---------------- |
| [01-process.md](../kit/01-process.md)         | Where you are and what comes next         | Every session    |
| [02-exploration.md](../kit/02-exploration.md) | Open questions and settled decisions      | Decisions change |
| [03-execution.md](../kit/03-execution.md)     | Guidelines, plan, tasks, known issues     | Work changes     |
| [04-progress.md](../kit/04-progress.md)       | Everything that's happened — never edited | Every session    |
| [05-kanban.md](../kit/05-kanban.md)           | Work tickets — optional                   | Tickets change   |
| [06-qa.md](../kit/06-qa.md)                   | Checks and sign-off — optional            | Checks change    |

Use only what earns its keep. Many standalone projects run for months on just
`01-process.md` and `04-progress.md`.

---

## Session Rhythm

Every session follows the same pattern:

**Start**
Upload the kit files. Use the two-message pattern below if working with AI.
Confirm the current state before doing any work.

**Work**
Stay focused on what is in `01-process.md`. Log decisions and issues as they
come up — don't save them for the end.

**End**
Update `01-process.md` — last completed, what's next.
Append to `04-progress.md` — completions, decisions, fixes, what's in progress.

These two files are updated every session without exception. Everything else
is optional.

---

## Starting a Session with AI — Two Messages

**Message 1** — attach `01-process.md` and `03-execution.md`, then send:

> I'm resuming a project using the Playbook Context Kit standalone.
> Files coming in two messages. This message: process and execution.
> Next: exploration and progress.
> Focus only on what is current. Do not reopen settled decisions unless I ask.
> Brief confirmation only.

**Message 2** — attach `02-exploration.md` and `04-progress.md`, then send:

> Here is the context from earlier work. Brief confirmation only.

Add `05-kanban.md` and `06-qa.md` when active.

Message 1 orients. Message 2 contextualises. Always in that order.

---

## Keeping Files Lean

Active files hold what is current. Archives hold the history.

| File                | Archive when                                             |
| ------------------- | -------------------------------------------------------- |
| `02-exploration.md` | A settled decision no longer affects any active task     |
| `04-progress.md`    | Entries are from a completed phase or milestone          |
| `05-kanban.md`      | Done tickets are no longer referenced by anything active |

Move archived content to `_archives/`. Never delete.

---

## Declaring an Expansion

Standalone use still supports Playbook expansions — video insights is the
common one. Declare it in `01-process.md`:

```
Active Expansions: video-insights
```

Clear it when the expansion is complete. See
[video-insights.md](video-insights.md) for the full process.

---

## If Context Drifts Mid-Session

If the AI starts ignoring the uploaded files or suggesting things already
decided:

> Stop. Your only source of truth is the files uploaded at session start.
> Ignore all prior conversation context. Re-read the uploaded files before
> continuing.

If it persists, start a fresh session and re-upload the current kit files —
there's no milestone snapshot to fall back on outside the full pipeline, so
the kit files themselves are the source of truth.

---

## When You're Ready for More

If the project grows into needing mapped paths, written contracts, or
planning documents before code, nothing here changes — you're adding stages
in front of and around the same six files. Start with
[context-kit.md](context-kit.md) and [pipeline.md](../pipeline.md).
