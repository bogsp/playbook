---
file: 'docs/flows/playbook-templates/flow-4-adopt-existing-project.md'
responsibility: 'Defines the adoption journey — routing an existing project into Playbook via four diagnostic questions, landing at whichever stage its real state calls for.'
ai_instructions: 'Read before authoring or revising playbook/.playbook/guides/adopt.md. Companion contract: docs/contracts/playbook-templates/flow-4-adopt-existing-project.md.'
archive_rule: 'N/A — active flow document; archive only if the diagnostic routing questions are fundamentally restructured.'
id: flow-4-adopt-existing-project
type: flow
scope: journey
trigger: request-response
status: draft
calls: [flow-5-audit-existing-project, flow-6-resume-session]
emits: []
called-by: []
---

# Adopt an Existing Project

---

## What It Does

Routes an existing project into Playbook using four diagnostic questions,
landing at whichever pipeline stage the project's actual state calls for.
Stages already effectively done are skipped — never assumed.

## Before It Starts

An existing project exists without Playbook kit files yet, or with only a
partial kit-file setup.

## When It Finishes

Kit files are set up and reflect the project's real state. The project has
landed at the correct stage — Discovery, Mapping, or Planning — or, if an
audit was required first, at whatever stage the audit's findings point to.
From here the project proceeds under `flow-3-new-project`'s stage mechanics.

## Walkthrough

---

```
1. On [Adopt Existing Project](project directory):
   a. Q1 — does the project have any documentation?
      → no  → land at Discovery → continue to e
      → yes → continue to b
   b. Q2 — is the documentation current and accurate?
      → no  → call flow-5-audit-existing-project → continue to e
      → yes → continue to c
   c. Q3 — are the paths and rules defined?
      → no  → land at Mapping → continue to e
      → yes → continue to d
   d. Q4 — does every piece have a planning document?
      → no  → land at Planning → continue to e
      → yes → already running Playbook → set up kit files, resume steady-state
   e. copy kit files from .playbook/kit/ into the project
      → ok: → continue to f
   f. fill 01-process.md, 02-exploration.md, 03-execution.md with what is
      already known
      → ok: → continue to g
   g. update .playbook/_index.md, README.md, AI-INSTRUCTIONS.md to reflect
      this specific project
      → ok: → done; project continues from the landed stage
```

---

## Detail

- Q2's "no" branch is the only one that leaves this flow to run a full child
  flow (`flow-5-audit-existing-project`) before returning — every other
  branch lands directly at a stage with no further routing.
- This is a diagnostic routing flow, not a stage itself — once landed, the
  project is governed by `flow-3-new-project`'s stage sequence from that
  point forward.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
