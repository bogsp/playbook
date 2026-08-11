---
file: 'docs/flows/playbook-templates/flow-4-rules-stage.md'
responsibility: 'Defines Stage 4 (Rules) — writing global.md then per-flow contracts, with the global-first ordering and re-check-on-change loop made explicit.'
ai_instructions: 'Read before authoring or revising the Rules stage guidance in playbook/.playbook/pipeline.md. Companion contract: docs/contracts/playbook-templates/flow-4-rules-stage.md.'
archive_rule: 'N/A — active flow document; archive only if the Rules stage is fundamentally restructured.'
id: flow-4-rules-stage
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Rules

---

## What It Does

Writes what every piece must follow, drawn from the paths mapped in
Stage 3. Stage 4 in `pipeline.md`. Produces `docs/contracts/_index.md` +
`global.md` + one per-flow contract.

## Before It Starts

Mapping is approved — `docs/flows/_index.md` and all `flow-N` documents
exist and are reviewed.

## When It Finishes

All required contract sections are complete for every flow; no required
section marked TODO; `docs/contracts/_index.md` lists every contract.

## Walkthrough

---

```
1. On [Rules Started](approved flow documents):
   a. draft docs/contracts/global.md — cross-cutting rules applying to
      every flow without exception
      → ok                                    → CONTINUE to b
      → a global rule conflicts with an
        already-approved flow's walkthrough    → HALT — flag (architectural-
                                                 decision), resolve before
                                                 continuing
   b. present global.md for human approval
      → approved                              → CONTINUE to c
      → changes requested                     → HALT — revise, resubmit to b
   c. for each approved flow-N document:
      i.  draft companion docs/contracts/flow-N-[name].md
          (Good Path, Ways It Can Fail, Edge Cases, Ordering Rules,
          Hard Constraints) — must not repeat global.md, only extend it
          → ok                                 → CONTINUE to ii
          → would duplicate a global.md rule
            verbatim                            → HALT — remove duplication,
                                                  reference global.md instead
      ii. present for human review
          → approved                           → CONTINUE to next flow,
                                                  or to d if last
          → changes requested                  → HALT — revise, resubmit
                                                  to ii
   d. write/update docs/contracts/_index.md
      → ok                                     → CONTINUE to e
   e. verify no required section across any contract is marked TODO
      → clean                                  → EMIT rules-approved,
                                                  RETURN to caller
      → TODO remains                           → HALT — resolve or mark
                                                  N/A with reason, resubmit
                                                  to e
```

---

## Undoing Steps

If `global.md` changes after some per-flow contracts are already approved
(a new cross-cutting rule surfaces while writing a later contract), every
already-approved contract must be re-checked against the revised `global.md`
before this stage can complete — the one case in this track where an
already-approved sibling document is deliberately reopened, because per-flow
contracts inherit from `global.md` directly.

## Detail

- Step a→b (`global.md`) must fully complete before step c begins — no
  per-flow contract is drafted against a still-draft `global.md`.
- The conflict branch in step a is the fix for an otherwise-undefined case:
  a rule discovered while writing `global.md` that would change an
  already-approved Mapping-stage flow. This flow treats it as an
  architectural-decision escalation, not a silent rewrite of the flow doc.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
