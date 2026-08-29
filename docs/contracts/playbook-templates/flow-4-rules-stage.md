---
file: 'docs/contracts/playbook-templates/flow-4-rules-stage.md'
responsibility: 'Behavioral rules for the Rules stage — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-4-rules-stage.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-4-rules-stage.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-4-rules-stage
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-4-rules-stage.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Rules — Rules

---

## Normal Flow

`docs/contracts/global.md` is drafted first and approved before any
per-flow contract begins. For each approved flow, a companion contract is
drafted (Normal Flow, Failures, Edge Cases, Ordering, Constraints) that
extends rather than repeats `global.md`, then approved.
`docs/contracts/_index.md` is written or updated. A final check confirms
no required section across any contract is marked TODO.

## Failures

- **A global rule conflicts with an already-approved flow's walkthrough
  (step a)** — halt, flag as architectural-decision, resolve before
  continuing. Never quietly adjust the flow to fit the rule, or the rule
  to avoid the conflict, without a logged decision.
- **A per-flow contract would duplicate a `global.md` rule verbatim (step
  c.i)** — halt, remove the duplication, reference `global.md` instead.
  This is the direct enforcement of this document's own dedup principle.
- **A TODO remains in a required section after all contracts are drafted
  (step e)** — halt, resolve or mark N/A with a stated reason, resubmit to
  e.

## Edge Cases

- **`global.md` changes after some per-flow contracts are already
  approved** — per Undoing Steps, every already-approved contract must be
  re-checked against the revised `global.md` before Rules can complete.
  This is the one deliberate exception to "approved siblings are never
  reopened" in this track.
- **A per-flow contract needs a rule that applies to only that flow and
  nowhere else** — it belongs in that flow's own contract, not promoted
  into `global.md`; promotion to global scope only happens once a rule is
  discovered to apply across multiple flows.

## Ordering

- `global.md` (steps a–b) fully completes before any per-flow contract
  (step c) begins — no per-flow contract is drafted against a still-draft
  `global.md`.
- Step d (`_index.md`) only happens after every per-flow contract in step
  c is approved.
- Planning (`flow-5`) does not begin against an unapproved contract set —
  step e's clean check is the gate.

## Constraints

- No per-flow contract repeats a `global.md` rule — extension and
  specialization only.
- A `global.md` revision surfacing mid-stage reopens every already-approved
  sibling contract — mandatory, not discretionary, per Undoing Steps.
- No contract may be marked `status: active` with a TODO in a required
  section.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
