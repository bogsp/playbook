---
file: 'docs/flows/playbook-templates/flow-6-work-stage.md'
responsibility: 'Defines Stage 6 (Work) — executing against approved planning documents, updating the plan before diverging from it, and running the Phase Completion Checklist before closing any phase.'
ai_instructions: 'Read before authoring or revising the Work stage guidance in playbook/.playbook/pipeline.md. Companion contract: docs/contracts/playbook-templates/flow-6-work-stage.md.'
archive_rule: 'N/A — active flow document; archive only if the Work stage is fundamentally restructured.'
id: flow-6-work-stage
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Work

---

## What It Does

Executes the project against approved planning documents. Stage 6 in
`pipeline.md`. Produces the project's actual output — code, content, or
deliverables — never a `docs/` artifact of its own.

## Before It Starts

Planning is approved — every planning document (structure, sequencer or
coordinator, component, concern, integration) is `status: active`,
`.playbook/_index.md`'s Structure section is current, and no planning
document has an unresolved TODO in a required section.

## When It Finishes

All acceptance criteria for the phase are met, all checks pass (lint,
format, type check, tests — per `docs/code-standards.md` or the domain
equivalent), and a sync check is clean — every touched planning document
reflects the current implementation.

## Walkthrough

Every branch resolves to one of four terminals: **CONTINUE** (proceed to
the named step), **HALT** (stop; a human must act), **RETURN** (hand
control back to the calling flow), **EMIT** (fire an event, then proceed).

---

```
1. On [Work Started](approved planning documents):
   a. select the next unit of work per the plan (component, concern,
      integration)
      → planning doc is status: active      → CONTINUE to b
      → planning doc is status: draft       → HALT — flag per
                                               AI-INSTRUCTIONS.md rule 6;
                                               resolve before coding
   b. implement against the planning document's declared interface
      → matches interface                   → CONTINUE to c
      → work requires diverging from the
        planning document                   → HALT — update the planning
                                               document first (re-review if
                                               the divergence is structural),
                                               then resubmit to b
   c. run the Phase Completion Checklist (docs/code-standards.md or the
      domain equivalent) for the touched unit
      → clean                               → CONTINUE to d
      → checklist failure                   → HALT — fix before continuing;
                                               never stack further work on a
                                               failing checklist
   d. sync check — does the planning document reflect current
      implementation?
      → in sync                             → CONTINUE to next unit, or to
                                               e if last
      → drift found                         → HALT — update the planning
                                               document to match, resubmit
                                               to d
   e. verify all acceptance criteria for this phase are met
      → met                                 → EMIT work-approved, RETURN to
                                               caller
      → unmet criteria remain               → CONTINUE to a for the next
                                               unit addressing them
```

---

## Undoing Steps

If already-completed work must be reverted (a checklist failure discovered
after later units already depended on the failing unit), the dependent
units are re-evaluated against the corrected planning document before
resuming — dependents are never left pointing at a version of the plan
that no longer matches the code.

## Detail

- Step b's divergence branch is the explicit enforcement of `pipeline.md`'s
  rule: "if the work diverges from it, update the plan first, then
  continue" — never the reverse.
- The Phase Completion Checklist referenced in step c is project-specific:
  software projects use `docs/code-standards.md`'s checklist section,
  other domains use their own equivalent quality gate.
- No component is coded before its planning document is `status: active` —
  this flow's entry condition at step a is the explicit enforcement point
  for a rule previously stated in `flow-5`'s Detail section without a
  defined check of its own.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
