---
file: 'docs/contracts/global.md'
responsibility: 'Rules that apply to every flow in the playbook-templates track without exception — flow-N-*.md contracts extend or specialize these, never repeat them.'
ai_instructions: 'Read this before any per-flow contract in this track (flow-0 through flow-7). Per-flow contracts must not duplicate rules defined here.'
archive_rule: 'N/A — living document, active for the life of the playbook-templates track.'
id: playbook-templates-global-contract
type: contract
scope: global
status: draft
governs:
  [
    flow-0-audit-existing-project,
    flow-1-thinking-resume-session,
    flow-2-discovery-stage,
    flow-3-mapping-stage,
    flow-4-rules-stage,
    flow-5-planning-stage,
    flow-6-work-stage,
    flow-7-handoff-and-resume,
  ]
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Playbook Templates — Global Contract

---

> Rules in this document apply to every flow in `docs/flows/playbook-templates/`
> without exception. Per-flow contracts (`docs/contracts/playbook-templates/flow-N-*.md`)
> must not repeat these rules — they extend or specialize them only where necessary.

---

## 1. Terminal Vocabulary

Every branch in every flow walkthrough resolves to exactly one of four terminals.
No other terminal exists in this track.

| Terminal     | Meaning                                                  |
| ------------ | --------------------------------------------------------- |
| **CONTINUE** | Proceed to the named step within the same flow           |
| **HALT**     | Stop; a human must act before anything resumes           |
| **RETURN**   | Hand control back to whichever context called this flow  |
| **EMIT**     | Fire a named event, then proceed (to CONTINUE or RETURN) |

A branch that does not map cleanly to one of these four is underspecified and
must be flagged, not force-fit.

---

## 2. Human Review Gating

This repo declares `review-gate: strict` in `.playbook/_index.md` (see that
file's Review Gate section for the general three-level model — `strict` /
`balanced` / `lean` — that shipped Playbook projects may choose between).
This repo runs `strict` deliberately: it is the source every future
scaffolded project copies from, so mistakes here propagate outward. No
stage, phase, or sub-step in this track advances autonomously.

- Every step that produces an artifact (a draft flow, a draft contract, a
  planning document, a phase output, a milestone snapshot) requires explicit
  human approval before the next step begins.
- "Approved" means the human reviewed the specific artifact produced at that
  step — not a prior version, not an adjacent artifact.
- A revision request returns control to the same step, not the next one.
- This rule has no exceptions inside this track. `flow-0`'s six audit phases
  enforce it most strictly (every phase gated), but every other flow in this
  track (`flow-2` through `flow-7`) follows the identical principle at its
  own step granularity.

---

## 3. TODO / N/A Markers

- `TODO` marks a section not yet written. A document carrying any `TODO` in a
  required section cannot be marked `status: active`.
- `N/A` marks a section that was considered and does not apply. `N/A` is a
  deliberate decision, not a shortcut — do not use it in place of doing the
  work.
- Every flow and contract document in this track ends with the standard
  reference line pair (`N/A — this section was considered...` /
  `TODO — not yet written; blocks status: active`) per `pipeline.md`'s
  Reference: File Naming conventions.

---

## 4. Escalation Format

When any flow in this track hits ambiguity it cannot resolve from its own
walkthrough, it halts and flags using the standard format from
`_index.md`:

```
Categories: underspecified | missing-contract | undeclared-dependency | architectural-decision | ambiguous-behavior
```

- Silent resolution of ambiguity is never permitted, regardless of how minor
  the decision appears.
- A flagged item blocks only the step that raised it — sibling steps already
  approved are not reopened unless the contract for that flow explicitly says
  otherwise (see `flow-4-rules-stage` contract's Undoing Steps for the one
  documented exception: a `global.md` change surfacing after per-flow
  contracts are already approved).

---

## 5. Shared Component Dedup

Before any flow in this track authors a new planning document, flow, or
contract, it must check whether an equivalent already exists:

- Planning documents check `.playbook/_shared/` first (`flow-5-planning-stage`
  step b.i).
- Flow and contract documents check `docs/flows/_index.md` /
  `docs/contracts/_index.md` for an existing entry covering the same path
  before drafting a new one.
- A duplicate found late is never silently merged — it is flagged, resolved
  by explicit decision, and the loser is retired per `maintenance.md`
  (`status: retired`, moved to `_archives/units/`, never deleted).

---

## 6. Kit File Sync

Every flow in this track that completes a unit of work (a stage, a phase, a
document) updates the kit files in the same session, not deferred:

- `.playbook/kit/01-process.md` — current phase and immediate next step.
- `.playbook/kit/04-progress.md` — append-only; Completed / Decided / Fixed
  entries only, never edited retroactively.
- `.playbook/kit/02-exploration.md` — any decision settled while the flow
  ran, with a `Ref:` back to the artifact that settled it.

A flow is not considered finished — even if its own artifact is approved —
until this sync has happened.

---

## 7. Abort and Undo Handling

- An aborted flow never deletes already-approved output. Approved output is
  valid partial knowledge, not scratch work (see `flow-0`'s Undoing Steps for
  the canonical statement of this rule).
- A flow resumed after an abort restarts from the first step without approved
  output — it never redoes approved work.
- Any in-progress-but-unapproved draft at the point of abort is discarded,
  never partially written to its target location.

---

## 8. Ordering Between Stage Flows

- `flow-2` (Discovery) → `flow-3` (Mapping) → `flow-4` (Rules) →
  `flow-5` (Planning) → `flow-6` (Work) → `flow-7` (Handoff) run in strict
  pipeline order, per `pipeline.md`'s Big Picture table. A later stage flow
  never begins against an unapproved earlier-stage artifact.
- `flow-0` (Audit) and `flow-1` (Thinking) sit outside this linear order —
  `flow-0` runs once, before `flow-1` first engages, for existing projects
  only; `flow-1` re-enters at the start of every session regardless of which
  other stage is current.
- Within `flow-4`, `global.md` is drafted and approved before any per-flow
  contract is drafted — this is restated here because it governs this
  track's own contract-writing work (K-28), not just a rule this track
  documents about other projects.

---

## 9. Plan-Before-Divergence

- If work in `flow-6` needs to diverge from an approved planning document,
  the planning document is updated — and re-reviewed if the divergence is
  structural — before work continues. The plan is never left stale while
  implementation moves ahead of it.
- This rule is stated here, not only in `flow-6`'s own contract, because it
  governs the general relationship between any planning document in this
  track and the work done against it — not a Work-stage-specific quirk.

---

## 10. No Invented Content in Generated Artifacts

- Any artifact this track generates from source files — a milestone
  snapshot (`flow-7`), a planning document (`flow-5`), a flow or contract
  document (`flow-3`, `flow-4`) — states only what is traceable to those
  source files. A claim that cannot be traced back to an attached or
  referenced file is removed or flagged, never included on the assumption
  it is probably correct.
- This is a general prohibition on fabrication across the whole track. It is
  most visible in `flow-7`'s milestone-generation step (which explicitly
  halts on an untraceable claim), but it applies equally to every other
  flow that produces a document from prior state rather than from a human's
  direct instruction in the current step.

---

N/A — this section was considered and does not apply
