---
file: 'docs/flows/playbook-templates/flow-0-audit-existing-project.md'
responsibility: 'Defines the audit expansion — six sequential, human-reviewed phases that map an existing project before anything about it changes, with every phase transition, revision loop, and abort path made explicit.'
ai_instructions: 'Read before authoring or revising the Audit section of playbook/.playbook/expansions.md. Companion contract: docs/contracts/playbook-templates/flow-0-audit-existing-project.md.'
archive_rule: 'N/A — active flow document; archive only if the six-phase audit sequence is fundamentally restructured.'
id: flow-0-audit-existing-project
type: flow
scope: composite
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-9-adopt-existing-project]
---

# Audit an Existing Project

---

## What It Does

Maps an existing, poorly understood project before anything about it
changes. Six sequential phases, each gated by human review before the next
begins. Produces the three `docs/rewrite/` files. Positioned as Stage 0 in
`pipeline.md` — it runs before Stage 1 (Thinking), not as part of the main
Discovery→Handoff sequence.

## Before It Starts

One of two entry conditions is true:

- `flow-9-adopt-existing-project` has determined the project's existing
  documentation is not current or accurate (its Q2 branch), or
- A person requests an audit directly, standalone, without going through
  adoption routing.

`.playbook/kit/01-process.md` Active Expansions is set to `audit: inventory`
before phase (a) begins.

## When It Finishes

`docs/rewrite/system-map.md`, `decision-record.md`, and `risk-register.md`
are complete. Findings have been fed into `02-exploration.md`,
`03-execution.md`, and `01-process.md`. The Active Expansion is cleared.
Control returns to whichever context started the audit (`flow-9`'s landing
logic, or the standalone caller).

## Walkthrough

Each phase below is a Child Path — full detail in **Child Paths**. This
section shows only the sequencing and every terminal each phase can reach.
Every branch below resolves to one of four terminals: **CONTINUE** (proceed
to the named step), **HALT** (stop; a human must act before anything
resumes), **RETURN** (hand control back to whichever context called this
flow), **EMIT** (fire an event, then proceed).

---

```
1. On [Audit Requested](existing project):
   a. Phase: inventory
      → human approves                    → CONTINUE to b
      → human requests revision           → HALT — revise inventory, resubmit to a
      → human aborts                      → HALT — see Undoing Steps, RETURN to caller
   b. Phase: audit
      → human approves                    → CONTINUE to c
      → human requests revision           → HALT — revise, resubmit to b
      → gap found in inventory coverage   → HALT — RETURN to a
      → human aborts                      → HALT — see Undoing Steps, RETURN to caller
   c. Phase: classify → decision-record.md
      → human approves                    → CONTINUE to d
      → human requests revision           → HALT — revise, resubmit to c
      → gap found in inventory or audit   → HALT — RETURN to a or b as applicable
      → human aborts                      → HALT — see Undoing Steps, RETURN to caller
   d. Phase: risk-map → risk-register.md
      → human approves                    → CONTINUE to e
      → human requests revision           → HALT — revise, resubmit to d
      → human aborts                      → HALT — see Undoing Steps, RETURN to caller
   e. Phase: gap-report → system-map.md Gap Report section
      → human approves                    → CONTINUE to f
      → human requests revision           → HALT — revise, resubmit to e
      → human aborts                      → HALT — see Undoing Steps, RETURN to caller
   f. Phase: handoff — feed findings into 02-exploration.md, 03-execution.md,
      01-process.md; clear Active Expansion
      → ok                                 → EMIT audit-complete, RETURN to caller
      → findings incomplete/contradictory  → HALT — flag for human decision;
                                              does not RETURN until resolved
```

---

## Undoing Steps

An aborted audit (any phase, human-initiated) does not roll back files
already written and approved in earlier phases — approved phase output is
treated as valid partial knowledge, not scratch work. What happens on abort:

- Any phase currently in progress but not yet approved is discarded — its
  draft content is never written to `docs/rewrite/`.
- Already-approved phases (system-map.md sections from inventory/audit,
  decision-record.md from classify, risk-register.md from risk-map) remain
  on disk as-is. They are marked incomplete by the absence of later phases,
  not deleted.
- `.playbook/kit/01-process.md` Active Expansion is cleared regardless of
  where the abort occurred — an audit is never left silently "in progress"
  with no record of its state.
- If the audit is resumed later, it restarts from the first phase without
  approved output, not from phase (a) — approved work is not redone.

## Child Paths

The six phases are this flow's child paths — each is a phase within one
expansion, not a separate flow document, per `pipeline.md`'s decision to
keep Audit as a single expansion rather than six independent flows.

**a. Inventory** — list everything that exists: files, folders,
dependencies, entry points. No judgment applied yet — this phase is
descriptive only.

**b. Audit** — examine each inventoried piece: what it does, what depends on
it, its quality. Requires (a) approved first; a gap found here in what (a)
covered is not silently patched — it returns to (a).

**c. Classify** — assign a verdict per piece (Keep / Align / Extract /
Rewrite / Replace / Discard / Defer / Evaluate) into `decision-record.md`.
Requires (a) and (b) approved.

**d. Risk-map** — for each classified piece, determine what breaks if it
changes and the safe order to change things, into `risk-register.md`.
Requires (c) approved — risk cannot be assessed against an unclassified
piece.

**e. Gap-report** — compare existing state against what is needed; name
every gap into `system-map.md`'s Gap Report section. Requires (d) approved.

**f. Handoff** — feed all findings into the kit files and clear the Active
Expansion. Requires (e) approved. This phase's own failure mode (findings
incomplete or contradictory) is the only phase that can HALT without a
human-requested revision — it is a data-integrity check, not a review gate.

## Detail

- No phase advances without human review — this is the one journey in this
  track where autonomous stage progression is explicitly disallowed at
  every step, not just at the outer boundary (`AI-INSTRUCTIONS.md` rule 15).
- No planning documents are written during inventory, audit, or classify
  (`AI-INSTRUCTIONS.md` rule 16) — only risk-map and gap-report start
  shaping what Discovery, Mapping, and Planning will look like once the
  project resumes.
- The "flag a gap in an earlier phase" branches (b→a, c→a/b) are an explicit
  fix for a failure mode the pre-renumbering version of this flow left
  undefined: discovering during a later phase that an earlier phase's
  output was incomplete. Without this branch, the AI would have had to
  either silently patch the gap out-of-sequence or halt with no defined
  path back — both are exactly the kind of assumption this rebuild removes.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
