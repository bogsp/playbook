---
file: 'docs/flows/playbook-templates/flow-1-thinking-resume-session.md'
responsibility: 'Defines the two-message pattern for loading project context at the start of any session — Stage 1 (Thinking), always active beneath every other stage.'
ai_instructions: 'Read before authoring or revising playbook/.playbook/kit/00-guide.md. Companion contract: docs/contracts/playbook-templates/flow-1-thinking-resume-session.md.'
archive_rule: 'N/A — active flow document; archive only if the kit-file session pattern is fundamentally restructured.'
id: flow-1-thinking-resume-session
type: flow
scope: operation
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Thinking — Resume a Session

---

## What It Does

Loads project context at the start of any AI session using a fixed
two-message pattern — either the six kit files standalone, or alongside the
full pipeline. This is Stage 1 in `pipeline.md` — always active, re-entered
at the start of every session regardless of which other stage is current.

## Before It Starts

Kit files exist from a prior session, or hold fresh-scaffold placeholders.
The person is starting a new AI session and wants continuity with prior
work.

## When It Finishes

The AI has confirmed current phase, last completed work, and next step. No
work has begun — the session proceeds only after the person gives a
specific task.

## Walkthrough

Every branch resolves to one of four terminals: **CONTINUE** (proceed to the
named step), **HALT** (stop; a human must act), **RETURN** (hand control
back to the calling flow), **EMIT** (fire an event, then proceed).

---

```
1. On [Session Start](kit files):
   a. Message 1 — attach 01-process.md + 03-execution.md
      → files present and non-empty     → CONTINUE to b
      → files missing or empty          → HALT — flag missing kit files;
                                           do not proceed until provided or
                                           scaffolded
   b. AI reads message 1, gives brief confirmation of current state
      → ok                               → CONTINUE to c
   c. Message 2 — attach 02-exploration.md + 04-progress.md
      (+ 05-kanban.md, 06-qa.md if active)
      → files present                   → CONTINUE to d
      → files missing                   → HALT — flag; request or scaffold
   d. AI reads message 2, gives brief confirmation, waits
      → ok                               → CONTINUE to e
   e. person gives a specific task
      → clear, in-scope task            → RETURN — work begins under
                                           whichever stage flow (flow-2
                                           through flow-7) the task belongs to
      → ambiguous task                  → HALT — flag per escalation
                                           protocol before proceeding
      → task requests reopening a
        settled decision                → HALT — flag; require explicit
                                           instruction before reopening
```

---

## Undoing Steps

N/A — this flow only reads kit files; it writes nothing that could require
rollback.

## Detail

- Message 1 orients, Message 2 contextualizes — always in that order. This
  ordering is deliberate: `02-exploration.md` and `04-progress.md` reference
  decisions made against the state described in `01-process.md` and
  `03-execution.md`.
- Standalone context-kit use and pipeline-integrated use share this exact
  two-message mechanic — the only difference is whether stage-flow (flow-2
  through flow-7) machinery exists to resume into.
- This flow is re-entered at the start of every session, not invoked once
  per project. Every stage flow in this track assumes it has already run
  for the current session.
- If context drifts mid-session, recovery is to re-read the uploaded files
  (see companion contract). If it persists, the fallback is a fresh session
  re-uploading current kit files, or resuming from a rollout snapshot via
  `flow-7-handoff-and-resume` step d if one exists.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
