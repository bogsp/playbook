---
file: 'docs/flows/playbook-templates/flow-2-discovery-stage.md'
responsibility: 'Defines Stage 2 (Discovery) — drafting and approving the project brief, with every revision and escalation branch made explicit.'
ai_instructions: 'Read before authoring or revising the Discovery stage guidance in playbook/.playbook/pipeline.md or guides/new-project.md. Companion contract: docs/contracts/playbook-templates/flow-2-discovery-stage.md.'
archive_rule: 'N/A — active flow document; archive only if the Discovery stage is fundamentally restructured.'
id: flow-2-discovery-stage
type: flow
scope: operation
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Discovery

---

## What It Does

Defines what is being made, why, and for whom. Stage 2 in `pipeline.md`.
Produces `docs/[name].md` — goals, audience, constraints, acceptance
criteria.

## Before It Starts

`flow-1-thinking-resume-session` has run this session. For new projects,
kit files are freshly scaffolded. For adopted projects landing here (no
existing documentation at all), kit files hold whatever adoption context
exists.

## When It Finishes

`docs/[name].md` is approved. Acceptance criteria are clear and
independently verifiable. `01-process.md` reflects Discovery complete,
next: Mapping.

## Walkthrough

---

```
1. On [Discovery Started](project context):
   a. draft docs/[name].md — goals, audience, constraints, acceptance criteria
      → ok                                  → CONTINUE to b
      → goal or audience not determinable
        from available context              → HALT — flag (underspecified),
                                               request clarification
   b. present draft for human approval
      → approved                            → CONTINUE to c
      → changes requested                   → HALT — revise per feedback,
                                               resubmit to b
      → rejected outright (wrong direction) → HALT — return to a, redraft
   c. verify acceptance criteria are clear and independently verifiable
      → verifiable                          → CONTINUE to d
      → vague or unverifiable               → HALT — revise, resubmit to c
   d. update 01-process.md (Discovery complete, next: Mapping) and
      02-exploration.md for any decisions settled while drafting
      → ok                                  → EMIT discovery-approved,
                                               RETURN to caller
```

---

## Undoing Steps

N/A for rollback of written state — a rejected draft (branch a→HALT, or
b→"rejected outright") is simply reworked; nothing downstream has consumed
it yet. What must hold: no other stage may treat `docs/[name].md` as settled
until step d completes — Mapping does not begin against an unapproved brief
(see companion contract Ordering Rules).

## Detail

- This stage produces exactly one artifact: `docs/[name].md`. Step a→b is a
  single draft/approve loop, not a fan-out across multiple candidate briefs.
- The escalation branch in step a uses the standard flag format from
  `docs/code-standards.md` §14 / `AI-INSTRUCTIONS.md`.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
