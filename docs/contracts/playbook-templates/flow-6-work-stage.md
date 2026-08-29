---
file: 'docs/contracts/playbook-templates/flow-6-work-stage.md'
responsibility: 'Behavioral rules for the Work stage — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-6-work-stage.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-6-work-stage.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-6-work-stage
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-6-work-stage.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Work — Rules

---

## Normal Flow

Work proceeds unit by unit against approved (`status: active`) planning
documents. Each unit is implemented against its declared interface,
passes the Phase Completion Checklist, and is confirmed in sync with its
planning document before the next unit begins. Once every acceptance
criterion for the phase is met, the phase is emitted as approved and
control returns to the caller.

## Failures

- **Selected unit's planning document is still `status: draft` (step
  a)** — halt, flag per `AI-INSTRUCTIONS.md` rule 6, resolve before
  coding. Code is never written against a draft planning document.
- **Implementation needs to diverge from the planning document (step b)**
  — halt; the planning document is updated first (and re-reviewed if the
  divergence is structural), then work resumes. The plan is never left
  stale while code moves ahead of it.
- **Phase Completion Checklist fails (step c)** — halt; fix before
  continuing. Further work is never stacked on top of a failing checklist.
- **Sync check finds drift between code and planning document (step d)**
  — halt; update the planning document to match, resubmit to d.

## Edge Cases

- **A checklist failure is discovered after later units already depended
  on the failing unit** — per Undoing Steps, dependent units are
  re-evaluated against the corrected planning document before resuming;
  they are never left pointing at a version of the plan that no longer
  matches the code.
- **A unit's acceptance criteria turn out to be unreachable as originally
  scoped** — this is a planning gap, not a Work-stage failure; it returns
  to Planning (`flow-5`) rather than being resolved by improvising in
  Work.

## Ordering

- Step a's `status: active` check always precedes implementation — no
  exceptions for "quick" or "obvious" changes.
- Step b's divergence branch always resolves before step c — the
  checklist is run against the corrected plan, never the stale one.
- Step d's sync check happens after every unit, not batched at the end of
  the phase — drift is caught unit by unit.

## Constraints

- No component is coded before its planning document is `status: active`.
- If work diverges from the plan, the plan is updated first — never the
  reverse, per `pipeline.md`.
- A caught checklist or sync failure is never silently worked around — it
  halts the flow until resolved.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
