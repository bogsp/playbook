---
file: 'docs/contracts/playbook-templates/flow-1-thinking-resume-session.md'
responsibility: 'Behavioral rules for the two-message session-resume pattern — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-1-thinking-resume-session.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-1-thinking-resume-session.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-1-thinking-resume-session
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-1-thinking-resume-session.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Thinking — Resume a Session — Rules

---

## Normal Flow

A session starts. Message 1 (`01-process.md` + `03-execution.md`) is
attached; the AI confirms current state briefly. Message 2
(`02-exploration.md` + `04-progress.md`, plus `05-kanban.md`/`06-qa.md` if
active) is attached; the AI confirms briefly and waits. The person gives a
specific, in-scope task; control returns to whichever stage flow that task
belongs to.

## Failures

- **Kit files missing or empty at Message 1** — halt immediately; do not
  proceed with an assumed or default state. Flag missing kit files per the
  escalation format.
- **Kit files missing at Message 2** — same halt; exploration/progress
  context cannot be inferred from Message 1 alone.
- **Ambiguous task at step e** — halt per escalation protocol before any
  work begins; never guess at scope.
- **Task requests reopening a settled decision** — halt; require explicit
  instruction before reopening, per `AI-INSTRUCTIONS.md`.
- **Context drifts mid-session** — not a failure of this flow itself; the
  documented recovery is to re-read the uploaded files, and if that fails,
  fall back to a fresh session, optionally seeded from
  `flow-7-handoff-and-resume` step b if a milestone snapshot exists.

## Edge Cases

- **Fresh-scaffold placeholders instead of real history** — Message 1/2
  may legitimately contain placeholder content for a brand-new project;
  the AI treats this as valid non-empty state, not a missing-file halt.
- **Kanban or QA files present but inactive** — `05-kanban.md`/`06-qa.md`
  are attached to Message 2 only when active; their absence is not a
  failure condition.
- **A task is given before Message 2 is confirmed** — treated as an
  out-of-order message; the AI halts and requests Message 2 before
  proceeding, since exploration/progress context may change how the task
  is scoped.

## Ordering

- Message 1 always precedes Message 2 — `02-exploration.md` and
  `04-progress.md` reference decisions made against the state in
  `01-process.md`/`03-execution.md`, so reading them first would lack that
  context.
- This flow always runs first in a session, before any stage flow
  (`flow-2` through `flow-7`) begins — per `global.md` §8.
- No work begins until step e's terminal is reached — the two
  confirmation steps (b, d) are brief acknowledgements only, never partial
  work.

## Constraints

- Standalone kit-file use and pipeline-integrated use share this exact
  two-message mechanic without exception.
- This flow re-enters at the start of every session — it is never treated
  as "already done" from a prior session.
- A settled decision is never reopened without explicit human instruction,
  regardless of how the task is phrased.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
