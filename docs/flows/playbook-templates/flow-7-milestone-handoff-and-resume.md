---
file: 'docs/flows/playbook-templates/flow-7-milestone-handoff-and-resume.md'
responsibility: 'Defines how a milestone is closed into a rollout snapshot, and how a later session resumes from that snapshot instead of the full kit-file trail.'
ai_instructions: 'Read before authoring or revising the Generating a Milestone Summary / Resuming from a Milestone prompts in playbook/.playbook/kit/00-prompts.md. Companion contract: docs/contracts/playbook-templates/flow-7-milestone-handoff-and-resume.md.'
archive_rule: 'N/A — active flow document; archive only if the Handoff stage mechanism is fundamentally restructured.'
id: flow-7-milestone-handoff-and-resume
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-3-new-project]
---

# Milestone Handoff and Resume

---

## What It Does

Closes out a milestone by generating a rollout snapshot from planning
documents and session history, then defines how a later session picks the
project back up from that snapshot instead of the full kit-file trail.

## Before It Starts

All acceptance criteria for the milestone are met, all checks pass, and the
sync check is clean — the Stage 6 (Work) done-when conditions from
`pipeline.md`.

## When It Finishes

`docs/rollout/[milestone].md` exists, generated only from attached files,
nothing invented. Kit files reflect the project's final state for that
milestone.

## Walkthrough

---

```
1. On [Milestone Complete](milestone name):
   a. attach AI-INSTRUCTIONS.md, 01-process.md, 02-exploration.md,
      03-execution.md, 04-progress.md
      → ok: → continue to b
   b. generate docs/rollout/[milestone].md — what was built, key decisions,
      what's next
      → ok: [uses only attached files, nothing invented] → continue to c
      → err: gap in attached files → flag missing context, halt
   c. save to docs/rollout/[milestone].md
      → ok: → continue to d
   d. [later session] resume from milestone — attach
      docs/rollout/[milestone].md + AI-INSTRUCTIONS.md + 01-process.md
      → ok: [AI confirms state from snapshot] → wait for a specific task
```

---

## Detail

- Step b's "never invent" constraint mirrors `flow-5`'s audit-findings
  discipline — a milestone summary is a derived artifact, not a creative
  one.
- Resuming from a milestone (step d) is a lighter-weight alternative to
  `flow-6-resume-session`'s full two-message kit load — it's used
  specifically when picking up in a fresh session with the rollout snapshot
  as the anchor, per `pipeline.md` Stage 7.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
