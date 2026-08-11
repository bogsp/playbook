---
file: 'docs/flows/playbook-templates/flow-3-new-project.md'
responsibility: 'Defines the new-project journey — moving a brand-new project through every pipeline stage from Thinking to Handoff.'
ai_instructions: 'Read before authoring or revising playbook/.playbook/guides/new-project.md. Companion contract: docs/contracts/playbook-templates/flow-3-new-project.md.'
archive_rule: 'N/A — active flow document; archive only if the pipeline stage sequence is fundamentally restructured.'
id: flow-3-new-project
type: flow
scope: journey
trigger: request-response
status: draft
calls: [flow-6-resume-session, flow-7-milestone-handoff-and-resume]
emits: []
called-by: []
---

# New Project

---

## What It Does

A person starts a brand-new project with Playbook. This journey walks kit-
file setup, then all seven pipeline stages in order — each stage a
checkpoint the next one will not start without.

## Before It Starts

The project has been scaffolded by `create-playbook` (or kit files copied
manually), a domain vocabulary is chosen, and `.playbook/kit/01-process.md`
exists but is unfilled.

## When It Finishes

The Handoff stage is complete for at least one milestone —
`docs/rollout/[milestone].md` exists, and kit files reflect the project's
final state for that milestone.

## Walkthrough

---

```
1. On [New Project Started](scaffolded project):
   a. fill 01-process.md — project name, stage: Thinking, next: Discovery
      → ok: → continue to b
   b. populate kit files — goals, open questions, constraints
      → ok: → continue to c
   c. Stage: Discovery — write docs/[name].md (goals, audience, constraints,
      acceptance criteria)
      → approved      → continue to d
      → not approved  → revise, repeat c
   d. Stage: Mapping — walk every major path, write docs/flows/_index.md +
      flow-N documents
      → ok: all paths documented and reviewed → continue to e
   e. Stage: Rules — write docs/contracts/_index.md + global.md + per-flow
      contracts
      → ok: no TODO sections remain → continue to f
   f. Stage: Planning — define every piece, write .playbook/_index.md +
      planning documents
      → ok: all approved, no TODO → continue to g
   g. Stage: Work — implement against the plan
      → ok: acceptance criteria met, checks pass → continue to h
      → drift from plan → update the plan first, then continue g
   h. Stage: Handoff — generate docs/rollout/[milestone].md
      → ok: → done for this milestone; loop to g for the next phase, or end
```

---

## Detail

- Every session inside this journey, regardless of stage, opens with
  `flow-6-resume-session` and closes by updating `01-process.md` and
  `04-progress.md` — this journey sequences the stages themselves and does
  not repeat that per-session mechanic.
- Stages are checkpoints, not hard phase boundaries — a project cycles
  through Work (step g) repeatedly across many milestones without re-running
  Discovery through Planning, as long as each new piece of work still has
  its own approved planning document first.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
