---
file: 'docs/contracts/playbook-templates/flow-0-audit-existing-project.md'
responsibility: 'Behavioral rules for the six-phase audit expansion — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-0-audit-existing-project.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-0-audit-existing-project.md. Read docs/contracts/playbook-templates/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-0-audit-existing-project
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-0-audit-existing-project.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Audit an Existing Project — Rules

---

## The Good Path

A person or `flow-9-adopt-existing-project` triggers the audit. Active
Expansion is set to `audit: inventory`. Each of the six phases (inventory,
audit, classify, risk-map, gap-report, handoff) runs in strict order, and
each is approved by a human before the next begins — no phase is skipped,
reordered, or run without review. Findings accumulate into
`docs/rewrite/system-map.md`, `decision-record.md`, and `risk-register.md`
as the phases produce them. On handoff, findings are written into
`02-exploration.md`, `03-execution.md`, and `01-process.md`, the Active
Expansion is cleared, and control returns to whichever context started the
audit.

## Ways It Can Fail

- **Human requests revision at any phase** — the phase's draft output is
  reworked and resubmitted for review at the same phase. This is not a
  failure of the audit itself; it is the expected review loop.
- **A later phase discovers a gap in an earlier phase's output** — the audit
  halts, control returns to the earlier phase, and the later phase does not
  resume until the earlier phase is re-approved. This must never be
  silently patched forward — an inventory gap discovered during classify is
  an inventory problem, not a classify problem.
- **Human aborts mid-audit** — any phase in progress but not yet approved is
  discarded; already-approved phases remain on disk; the Active Expansion is
  cleared regardless of which phase the abort occurred in. A resumed audit
  later restarts from the first unapproved phase, never redoing approved
  work.
- **Handoff phase finds findings incomplete or contradictory** — this is
  the one phase-level failure that is not a human revision request; it is a
  data-integrity check. It halts and flags for human decision; it does not
  return control to the caller until resolved.
- **Access to part of the codebase is unavailable during inventory or
  audit** — this must be recorded as an explicit gap in `system-map.md`'s
  Gap Report (`Undocumented`, or a new category as needed), never silently
  omitted from the inventory as if it didn't exist.

## Edge Cases

- **Audit requested standalone (no `flow-9` caller)** — the flow supports
  this per its own Before It Starts condition. On handoff, control returns
  to session end rather than to `flow-9`'s landing logic; the person decides
  the next pipeline stage manually via `guides/adopt.md`'s four questions.
- **A piece is classified `Evaluate` and gap-report or risk-map depends on
  its verdict** — risk-map and gap-report may proceed with an explicit
  `Evaluate — pending` marker rather than blocking entirely, but the
  handoff phase must surface every unresolved `Evaluate` classification as
  an open item in `02-exploration.md`, not silently drop it.
- **Two pieces have a circular dependency discovered during risk-map** —
  recorded in `risk-register.md`'s Circular Dependencies table with an
  explicit resolution strategy; risk-map does not halt for this, since
  circular dependencies are an expected finding type, not an error.
- **The project is large enough that inventory cannot complete in one
  session** — inventory may be approved incrementally (partial inventory,
  explicitly marked as partial), but audit (phase b) may not begin against
  an inventory still marked partial.

## Ordering Rules

- Phase (b) audit requires phase (a) inventory approved.
- Phase (c) classify requires phase (b) audit approved.
- Phase (d) risk-map requires phase (c) classify approved.
- Phase (e) gap-report requires phase (d) risk-map approved.
- Phase (f) handoff requires phase (e) gap-report approved.
- A "return to earlier phase" branch (b→a, c→a, c→b) supersedes forward
  ordering — the audit does not continue forward until the returned-to
  phase is re-approved.
- No planning document (component, concern, integration, coordinator) may
  be written while Active Expansion is `audit: inventory`, `audit: audit`,
  or `audit: classify` — this mirrors `AI-INSTRUCTIONS.md` rule 16 exactly
  and is restated here because it is a hard ordering constraint on this
  specific flow, not just a general rule.

## Hard Constraints

- No phase advances without explicit human review — this flow never
  progresses autonomously, at any phase, under any condition.
- Findings are never discarded — every finding lands in one of the three
  `docs/rewrite/` files or is explicitly marked out of scope with a stated
  reason (per `guides/audit.md`'s Rules section).
- The Active Expansion field in `01-process.md` must reflect the current
  phase at all times during the audit — it is never left stale.
- Aborting the audit never deletes approved phase output — see Undoing
  Steps in the companion flow.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
