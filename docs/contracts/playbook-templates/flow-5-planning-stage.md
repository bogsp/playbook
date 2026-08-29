---
file: 'docs/contracts/playbook-templates/flow-5-planning-stage.md'
responsibility: 'Behavioral rules for the Planning stage — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-5-planning-stage.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-5-planning-stage.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-5-planning-stage
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-5-planning-stage.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Planning — Rules

---

## Normal Flow

Every piece implied by the approved flows/contracts is identified. For
each, `.playbook/_shared/` is checked first for an existing component
covering the same responsibility; if none exists, a planning document is
drafted using the correct template for its type and presented for human
review. Once every piece is approved, `.playbook/_index.md`'s Structure
section is written or updated, and a final check confirms no planning
document has a TODO in a required section.

## Failures

- **A flow references a piece with no clear owner or type (step a)** —
  halt, flag as missing-contract or ambiguous-behavior, resolve before
  drafting.
- **An existing shared component already covers the same responsibility
  (step b.i)** — halt; do not duplicate. Reference the existing component
  and move to the next piece instead of drafting a new one.
- **Declared layer disagrees with file location or implementation path,
  software domain only (step b.iii)** — halt; status stays `draft` per the
  `clean-architecture-planning-layout` solution's rule. Never silently
  resolved by moving the file to match the doc, or vice versa, without
  review.
- **A TODO remains in a required section after all pieces are drafted
  (step d)** — halt, resolve or mark N/A with a stated reason, resubmit to
  d.

## Edge Cases

- **Two components covering the same responsibility approved separately,
  discovered late** — per Undoing Steps, the newer one is retired
  (`status: archived`, moved to `_archives/`, references repointed to the
  survivor) and logged as a Fixed entry in `04-progress.md` — never
  silently merged.
- **A piece's correct type is ambiguous between `component` and
  `sequencer`/`coordinator`** — resolved using the domain vocabulary's own
  rule (does it sequence others, or is it one bounded leaf
  responsibility?) before drafting, not deferred to review.

## Ordering

- Step b.i (shared-component dedup check) always happens before step b.ii
  (drafting) — never draft first and check for duplicates after.
- Step c (`_index.md` update) only happens after every piece in step b is
  approved.
- Work (`flow-6`) does not begin coding a component until its planning
  document is `status: active`, not `draft` — this flow's step d clean
  check is the entry condition `flow-6` checks at its own first step.

## Constraints

- `.playbook/_shared/` is always checked before authoring a new
  cross-module component — no exceptions, per `AI-INSTRUCTIONS.md` rule 7.
- No planning document reaches `status: active` with an unresolved TODO in
  a required section.
- A duplicate discovered late is never silently merged — always flagged,
  resolved by explicit decision, loser retired per `maintenance.md`.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
