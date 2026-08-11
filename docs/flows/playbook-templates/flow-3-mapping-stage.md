---
file: 'docs/flows/playbook-templates/flow-3-mapping-stage.md'
responsibility: 'Defines Stage 3 (Mapping) — walking every major path, including failure paths, before any piece is defined, with the per-path review loop and gap cross-check made explicit.'
ai_instructions: 'Read before authoring or revising the Mapping stage guidance in playbook/.playbook/pipeline.md. Companion contract: docs/contracts/playbook-templates/flow-3-mapping-stage.md.'
archive_rule: 'N/A — active flow document; archive only if the Mapping stage is fundamentally restructured.'
id: flow-3-mapping-stage
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-8-new-project, flow-9-adopt-existing-project]
---

# Mapping

---

## What It Does

Walks every major path the project will take — including what happens when
things go wrong — before defining any individual piece. Stage 3 in
`pipeline.md`. Produces `docs/flows/_index.md` + one `flow-N-[name].md` per
path.

## Before It Starts

Discovery is approved (`docs/[name].md` exists and is approved), or — for
adopted projects landing directly at Mapping — existing, accurate
documentation stands in for Discovery.

## When It Finishes

Every major path (happy path and known failure/branch paths) has its own
flow document, all reviewed and agreed on. `docs/flows/_index.md` lists
every path with a dependency map. No acceptance criterion from Discovery is
left without a corresponding path.

## Walkthrough

---

```
1. On [Mapping Started](approved brief or existing docs):
   a. enumerate every major path (happy paths + known failure/branch paths)
      → paths identified                    → CONTINUE to b
      → project too large/unclear to
        enumerate confidently                → HALT — flag (ambiguous-
                                                behavior), request scoping
                                                guidance
   b. for each identified path:
      i.  draft docs/flows/flow-N-[name].md
          (What It Does, Before/After, Walkthrough with branches)
          → ok                               → CONTINUE to ii
      ii. present for human review
          → approved                         → CONTINUE to next path,
                                                or to c if last path
          → changes requested                → HALT — revise, resubmit to ii
          → overlaps/duplicates an
            already-approved path             → HALT — flag (duplicate-
                                                responsibility), merge or
                                                split before resubmitting
   c. write/update docs/flows/_index.md — table + dependency map
      → ok                                    → CONTINUE to d
   d. cross-check: does every Discovery acceptance criterion have a
      corresponding path?
      → complete                              → EMIT mapping-approved,
                                                 RETURN to caller
      → gap found                             → HALT — RETURN to a for the
                                                 missing path
```

---

## Undoing Steps

If a path is rejected after sibling paths are already approved, only the
rejected path's file is reworked — approved sibling flow documents are not
reopened, unless the rejected path's revision changes a dependency a sibling
path relies on (see companion contract Edge Cases), in which case both are
flagged for re-review together.

## Detail

- Step b is a loop, not a single pass — it is the sequence's core repeated
  unit, run once per identified path.
- Step d's cross-check against Discovery's acceptance criteria is the
  explicit mechanism preventing an approved brief from producing an
  incomplete map. Stage 4 (Rules) cannot write contracts for paths that
  don't exist, so an undetected gap here would otherwise propagate forward
  silently.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
