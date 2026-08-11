---
file: 'docs/flows/playbook-templates/flow-5-audit-existing-project.md'
responsibility: 'Defines the audit expansion — six sequential, human-reviewed phases that map an existing project before anything about it changes.'
ai_instructions: 'Read before authoring or revising playbook/.playbook/guides/audit.md. Companion contract: docs/contracts/playbook-templates/flow-5-audit-existing-project.md.'
archive_rule: 'N/A — active flow document; archive only if the six-phase audit sequence is fundamentally restructured.'
id: flow-5-audit-existing-project
type: flow
scope: composite
trigger: request-response
status: draft
calls: []
emits: []
called-by: [flow-4-adopt-existing-project]
---

# Audit an Existing Project

---

## What It Does

Maps an existing, poorly understood project before anything about it
changes. Six sequential phases, each requiring human review before the next
begins. Produces the three `docs/rewrite/` files.

## Before It Starts

`flow-4-adopt-existing-project` has determined the existing documentation is
not current or accurate — or an audit is requested standalone. Active
Expansions in `01-process.md` is set to `audit: inventory`.

## When It Finishes

`docs/rewrite/system-map.md`, `decision-record.md`, and `risk-register.md`
are complete. Findings have been fed into `02-exploration.md`,
`03-execution.md`, and `01-process.md`. The Active Expansion is cleared and
the project returns to `flow-4`'s landing logic.

## Walkthrough

---

```
1. On [Audit Requested](existing project):
   a. Phase: inventory — list everything that exists (files, folders,
      dependencies, entry points)
      → human review approves → continue to b
   b. Phase: audit — examine each piece (what it does, what depends on it,
      its quality)
      → human review approves → continue to c
   c. Phase: classify — verdict per piece (Keep / Align / Extract / Rewrite
      / Replace / Discard / Defer / Evaluate) → decision-record.md
      → human review approves → continue to d
   d. Phase: risk-map — what breaks if X changes, safe change order →
      risk-register.md
      → human review approves → continue to e
   e. Phase: gap-report — compare existing vs needed, name every gap →
      system-map.md Gap Report section
      → human review approves → continue to f
   f. Phase: handoff — feed findings into 02-exploration.md,
      03-execution.md, 01-process.md; clear Active Expansion
      → ok: → return to flow-4-adopt-existing-project landing logic
```

---

## Child Paths

The six phases above are this flow's child paths — each is a phase within
one expansion, not a separate flow document, per `pipeline.md`'s decision to
keep Audit as a single expansion rather than six independent flows.

## Detail

- No phase advances without human review — this is the one journey in this
  track where autonomous stage progression is explicitly disallowed at
  every step, not just at the outer boundary.
- No planning documents are written during inventory, audit, or classify —
  only risk-map and gap-report start shaping what Discovery, Mapping, and
  Planning will look like once the project resumes.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
