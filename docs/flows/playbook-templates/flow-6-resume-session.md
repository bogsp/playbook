---
file: 'docs/flows/playbook-templates/flow-6-resume-session.md'
responsibility: 'Defines the two-message pattern for loading project context at the start of any session, standalone or pipeline-integrated.'
ai_instructions: 'Read before authoring or revising playbook/.playbook/guides/context-kit.md or context-kit-standalone.md. Companion contract: docs/contracts/playbook-templates/flow-6-resume-session.md.'
archive_rule: 'N/A — active flow document; archive only if the kit-file session pattern is fundamentally restructured.'
id: flow-6-resume-session
type: flow
scope: operation
trigger: request-response
status: draft
calls: []
emits: []
called-by: []
---

# Resume a Session

---

## What It Does

Loads project context at the start of any AI session using a fixed
two-message pattern — either the six kit files standalone, or alongside the
full pipeline. Used at the start of every session in every other journey in
this track.

## Before It Starts

Kit files exist from a prior session, or hold fresh-scaffold placeholders.
The person is starting a new AI session and wants continuity with prior
work.

## When It Finishes

The AI has confirmed current phase, last completed work, and next step. No
work has begun — the session proceeds only after the person gives a
specific task.

## Walkthrough

---

```
1. On [Session Start](kit files):
   a. Message 1 — attach 01-process.md + 03-execution.md
      → ok: [AI confirms current state] → continue to b
   b. Message 2 — attach 02-exploration.md + 04-progress.md
      (+ 05-kanban.md, 06-qa.md if active)
      → ok: [AI gives brief confirmation, waits] → continue to c
   c. person gives a specific task
      → ok: → work begins under whichever journey the task belongs to
      → ambiguous → AI flags before proceeding, halts until clarified
```

---

## Detail

- Message 1 orients, Message 2 contextualizes — always in that order. This
  ordering is deliberate: `02-exploration.md` and `04-progress.md` reference
  decisions made against the state described in `01-process.md` and
  `03-execution.md`.
- Standalone context-kit use and pipeline-integrated use share this exact
  two-message mechanic — the only difference is whether `flow-3` /
  `flow-4` stage machinery exists to resume into.
- If context drifts mid-session, recovery is to re-read the uploaded files.
  In the standalone case specifically, the fallback is a fresh session
  re-uploading current kit files — there is no rollout snapshot to fall back
  to outside the full pipeline.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
