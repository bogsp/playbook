---
file: 'docs/contracts/playbook-templates/flow-2-discovery-stage.md'
responsibility: 'Behavioral rules for the Discovery stage — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-2-discovery-stage.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-2-discovery-stage.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-2-discovery-stage
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-2-discovery-stage.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Discovery — Rules

---

## Normal Flow

A brief (`docs/[name].md`) is drafted covering goals, audience,
constraints, and acceptance criteria, then approved by a human. Acceptance
criteria are verified as clear and independently verifiable.
`01-process.md` is updated to reflect Discovery complete, next: Mapping,
and any decisions settled while drafting are logged in
`02-exploration.md`.

## Failures

- **Goal or audience not determinable from available context (step a)** —
  halt, flag as underspecified, request clarification. Never invent a goal
  or audience to keep moving.
- **Draft rejected outright as the wrong direction (step b)** — return to
  step a and redraft; distinct from a revision request, since the whole
  direction is wrong, not just details.
- **Acceptance criteria are vague or unverifiable (step c)** — halt,
  revise, resubmit to c. A criterion that cannot be checked is not a
  criterion.

## Edge Cases

- **Adopted project landing directly at Discovery with no prior
  documentation** — kit files may hold only adoption context, not project
  history; this is a valid starting state, not a missing-file halt.
- **Draft changes requested repeatedly** — the b→b revision loop has no
  iteration cap; it runs until approved or rejected outright, since
  Discovery produces a single artifact and rushing approval here
  propagates ambiguity into every later stage.

## Ordering

- Step a→b must complete before step c — acceptance criteria are only
  checked for verifiability once the draft itself is approved in
  principle.
- Step d (updating kit files) is the last step — Mapping does not begin
  until `01-process.md` reflects Discovery complete.
- Mapping (`flow-3`) never begins against an unapproved `docs/[name].md`
  — this flow's step d is the explicit gate.

## Constraints

- This stage produces exactly one artifact — no fan-out across multiple
  candidate briefs.
- The escalation branch in step a always uses the standard flag format
  from `docs/code-standards.md` §14 / `AI-INSTRUCTIONS.md`.
- Acceptance criteria must be independently verifiable before this stage
  can complete — no exceptions for small or seemingly obvious projects.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
