---
file: 'docs/flows/playbook-templates/flow-5-planning-stage.md'
responsibility: 'Defines Stage 5 (Planning) — identifying and drafting every piece before work begins, with the shared-component dedup check and layer-mismatch branch made explicit.'
ai_instructions: 'Read before authoring or revising the Planning stage guidance in playbook/.playbook/pipeline.md. Companion contract: docs/contracts/playbook-templates/flow-5-planning-stage.md.'
archive_rule: 'N/A — active flow document; archive only if the Planning stage is fundamentally restructured.'
id: flow-5-planning-stage
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Planning

---

## What It Does

Defines every piece of the project before any work is done on it. Stage 5
in `pipeline.md`. Produces `.playbook/_index.md` + one planning document per
piece (structure, coordinator/sequencer, component, concern, integration).

## Before It Starts

Rules stage is approved — all contracts complete, no required section
marked TODO.

## When It Finishes

All planning documents are approved; `.playbook/_index.md`'s project map is
current; no planning document has an unresolved TODO in a required section.

## Walkthrough

---

```
1. On [Planning Started](approved contracts):
   a. identify every piece implied by the approved flows/contracts
      → pieces identified                    → CONTINUE to b
      → a flow references a piece with no
        clear owner or type                   → HALT — flag (missing-
                                                 contract or ambiguous-
                                                 behavior), resolve before
                                                 drafting
   b. for each identified piece:
      i.   check .playbook/_shared/ for an existing component covering the
           same responsibility
           → none found                        → CONTINUE to ii
           → existing shared component found   → HALT — do not duplicate;
                                                  reference the existing
                                                  component, skip to next
                                                  piece
      ii.  draft the planning document using the correct template for its
           type (structure/coordinator/component/concern/integration)
           → ok                                → CONTINUE to iii
      iii. present for human review
           → approved                          → CONTINUE to next piece,
                                                  or to c if last
           → changes requested                 → HALT — revise, resubmit
                                                  to iii
           → declared layer disagrees with
             file location or implementation
             path (software domain)             → HALT — status stays draft
                                                  per clean-architecture-
                                                  planning-layout rule;
                                                  resolve before resubmitting
   c. write/update .playbook/_index.md — Structure section, project map
      → ok                                     → CONTINUE to d
   d. verify no planning document has a TODO in a required section
      → clean                                  → EMIT planning-approved,
                                                  RETURN to caller
      → TODO remains                           → HALT — resolve or mark
                                                  N/A with reason, resubmit
                                                  to d
```

---

## Undoing Steps

If a duplicated piece is found late (two components covering the same
responsibility, approved separately), the newer one is retired per
`maintenance.md` — marked `status: archived`, moved to `_archives/`, never
deleted — and every reference to it is repointed to the surviving
component. This is logged as a Fixed entry in `04-progress.md`, not
silently corrected.

## Detail

- Step b.i is the explicit wiring of `AI-INSTRUCTIONS.md` rule 7 ("check
  `_shared/` before creating a new cross-module component") into an actual
  walkthrough branch — previously stated as a rule with no defined
  enforcement point.
- No component is coded before its planning document is `status: active`
  (not `draft`) — this is the entry condition `flow-6-work-stage` checks at
  its own step a.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
