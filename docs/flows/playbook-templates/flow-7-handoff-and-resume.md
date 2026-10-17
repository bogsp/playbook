---
file: 'docs/flows/playbook-templates/flow-7-handoff-and-resume.md'
responsibility: 'Defines Stage 7 (Handoff) — generating a milestone snapshot from planning documents and session history, and how a future session resumes from it.'
ai_instructions: 'Read before authoring or revising the Handoff stage guidance in playbook/.playbook/pipeline.md. Companion contract: docs/contracts/playbook-templates/flow-7-handoff-and-resume.md.'
archive_rule: 'N/A — active flow document; archive only if the Handoff/Resume pattern is fundamentally restructured.'
id: flow-7-handoff-and-resume
type: flow
scope: composite
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project, flow-1-thinking-resume-session]
---

# Handoff and Resume

---

## What It Does

Captures what was built at a milestone and generates a snapshot from
planning documents and session history — never written by hand or from
memory. Also defines how a fresh AI session resumes work from a
previously generated snapshot. Stage 7 in `pipeline.md`.

## Before It Starts

**Generate:** a phase or set of planning documents has reached a milestone
worth snapshotting — normally the end of a Stage 6 (Work) phase, or an
explicit person request.
**Resume:** a `docs/rollout/[milestone].md` file exists and the person is
starting a fresh session wanting to pick up from it instead of the
standard kit-file resume pattern.

## When It Finishes

**Generate:** `docs/rollout/[milestone].md` exists, reflects only what
planning documents and kit files state, and `01-process.md` /
`04-progress.md` are updated to reflect the milestone.
**Resume:** the AI has confirmed the milestone's state back to the person
and is ready for a specific task — the same terminal pattern as
`flow-1-thinking-resume-session`.

## Walkthrough

Every branch resolves to one of four terminals: **CONTINUE** (proceed to
the named step), **HALT** (stop; a human must act), **RETURN** (hand
control back to the calling flow), **EMIT** (fire an event, then proceed).

---

```
1. On [Handoff Requested](milestone name):
   a. Generate Milestone Summary
      i.   gather source material — approved (status: active) planning
           documents, 01-process.md, 02-exploration.md, 03-execution.md,
           04-progress.md
           → ok                                → CONTINUE to ii
           → a referenced planning document is
             status: draft                      → HALT — a milestone
                                                  cannot snapshot unapproved
                                                  work
      ii.  draft docs/rollout/[milestone].md — what was built, key
           decisions, what is next — using only the gathered material
           → ok                                 → CONTINUE to iii
           → a claim cannot be traced to a
             source file                        → HALT — remove or flag;
                                                  never invent content
      iii. present for human approval
           → approved                           → CONTINUE to iv
           → changes requested                  → HALT — revise, resubmit
                                                  to iii
      iv.  update 01-process.md and 04-progress.md to reflect the
           milestone
           → ok                                 → EMIT milestone-generated,
                                                  CONTINUE to 2, or RETURN
                                                  to caller if handoff-only
   b. Resume From Milestone
      i.   person attaches docs/rollout/[milestone].md + AI-INSTRUCTIONS.md
           + 01-process.md
           → files present                      → CONTINUE to ii
           → milestone file missing              → HALT — fall back to
                                                  flow-1's standard
                                                  kit-file resume pattern
      ii.  AI reads the snapshot, gives brief confirmation of state, waits
           → ok                                  → CONTINUE to iii
      iii. person gives a specific task
           → clear, in-scope task                → RETURN — work begins
                                                    under whichever stage
                                                    flow the task belongs to
           → ambiguous task                      → HALT — flag per
                                                    escalation protocol
```

---

## Undoing Steps

A milestone snapshot already generated and approved is never deleted or
silently rewritten by a later milestone — each is its own file
(`docs/rollout/[milestone].md`), effectively append-only across the
project's history. If a generated snapshot is found to contain an
invented claim after approval, it is corrected via a new revision logged
as a Fixed entry in `04-progress.md` — never quietly edited without a
trace.

## Child Paths

This flow's two branches are child paths of one Handoff/Resume flow
rather than two separate flow documents, since they share the same
artifact and are two directions of the same relationship.

**a. Generate Milestone Summary** — produces the snapshot at a milestone
boundary, generated only from existing planning documents and kit files,
never written by hand or from memory.

**b. Resume From Milestone** — the mirror operation: a fresh session loads
a previously generated snapshot instead of the standard kit-file resume
pattern in `flow-1-thinking-resume-session`. This is the "step d" fallback
already referenced in `flow-1`'s Detail section for when kit-file context
alone has drifted too far to recover.

## Detail

- Step a.ii's "never invent content" rule mirrors the person-facing rule
  already stated in `00-guide.md`'s Generating a Milestone Summary
  prompt: "Use only the attached files as your source. Do not invent or
  infer anything not present."
- Step b is deliberately not a full re-run of `flow-1` — it substitutes
  the milestone file for the standard two-message kit-file pattern, but
  still ends at the same terminal (person gives a specific task) so
  downstream stage flows don't need to distinguish which resume path was
  used.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
