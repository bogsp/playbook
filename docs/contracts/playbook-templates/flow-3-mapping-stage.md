---
file: 'docs/contracts/playbook-templates/flow-3-mapping-stage.md'
responsibility: 'Behavioral rules for the Mapping stage — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-3-mapping-stage.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-3-mapping-stage.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-3-mapping-stage
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-3-mapping-stage.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Mapping — Rules

---

## The Good Path

Every major path (happy paths and known failure/branch paths) is
enumerated. For each, a `docs/flows/flow-N-[name].md` document is drafted
and approved. `docs/flows/_index.md` is written or updated with the table
and dependency map. A final cross-check confirms every Discovery
acceptance criterion has a corresponding path.

## Ways It Can Fail

- **Project too large or unclear to enumerate paths confidently (step
  a)** — halt, flag as ambiguous-behavior, request scoping guidance from
  the person rather than guessing at scope.
- **A drafted path overlaps or duplicates an already-approved path (step
  b.ii)** — halt, flag as duplicate-responsibility, merge or split before
  resubmitting. Never silently keep both.
- **A Discovery acceptance criterion has no corresponding path (step
  d)** — halt, return to step a for the missing path. Rules (`flow-4`)
  cannot write contracts for paths that don't exist, so this gap must
  close before Mapping is considered done.

## Edge Cases

- **Adopted project with existing, accurate documentation standing in for
  Discovery** — Mapping may begin directly per this flow's Before It
  Starts condition, without a fresh `docs/[name].md`.
- **A later-drafted path changes a dependency an already-approved sibling
  path relies on** — both are flagged for re-review together, not just
  the later one; see Undoing Steps in the companion flow.

## Ordering Rules

- Step b is a loop run once per identified path — not a single pass
  across all paths at once.
- Step c (writing `_index.md`) only happens after every path in step b is
  approved.
- Step d's cross-check happens last — Rules (`flow-4`) does not begin
  until Mapping's cross-check is clean.

## Hard Constraints

- Every major path — happy path and known failure/branch paths — gets its
  own flow document; none are merged into a single "everything" document.
- `docs/flows/_index.md`'s dependency map must be current before Mapping
  can complete.
- A rejected or duplicate path is never silently merged — always flagged
  and resolved by explicit decision.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
