---
file: 'docs/contracts/playbook-templates/flow-7-handoff-and-resume.md'
responsibility: 'Behavioral rules for the Handoff/Resume pattern — every failure mode, edge case, and hard constraint governing docs/flows/playbook-templates/flow-7-handoff-and-resume.md.'
ai_instructions: 'Companion to docs/flows/playbook-templates/flow-7-handoff-and-resume.md. Read docs/contracts/global.md before this file — do not repeat global rules here, only extend or specialize them.'
archive_rule: 'N/A — active contract document; archive alongside its companion flow if that path no longer exists.'
id: flow-7-handoff-and-resume
type: contract
scope: global
status: draft
companion-flow: 'docs/flows/playbook-templates/flow-7-handoff-and-resume.md'
project: 'Playbook Pipeline'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Handoff and Resume — Rules

---

## The Good Path

**Generate:** source material — approved (`status: active`) planning
documents plus current kit files — is gathered, a milestone snapshot is
drafted from it alone, approved by a human, and kit files are updated to
reflect the milestone.
**Resume:** a person attaches a previously generated snapshot alongside
`AI-INSTRUCTIONS.md` and `01-process.md`; the AI confirms state briefly
and waits for a specific task.

## Ways It Can Fail

- **A referenced planning document is still `status: draft` at generation
  time (step a.i)** — halt; a milestone cannot snapshot unapproved work.
- **A claim in the draft snapshot cannot be traced to a source file (step
  a.ii)** — halt; remove or flag it. Never invent or infer content not
  present in the gathered source material — this mirrors the standing
  rule in the Generating a Milestone Summary prompt.
- **Milestone file is missing at resume time (step b.i)** — halt and fall
  back to the standard kit-file resume pattern in
  `flow-1-thinking-resume-session` rather than proceeding without it.
- **Ambiguous task at resume step b.iii** — halt per escalation protocol,
  same as `flow-1`.

## Edge Cases

- **A generated and approved snapshot is later found to contain an
  invented claim** — per Undoing Steps, it is corrected via a new
  revision logged as a Fixed entry in `04-progress.md`; never quietly
  edited without a trace, since a milestone snapshot is treated as a
  durable record, not scratch work.
- **Handoff is invoked mid-pipeline, not only at project end** — this
  flow supports generation at any milestone boundary (end of a Work-stage
  phase, or an explicit person request), not only at final project
  completion; step a.iv's CONTINUE-to-2-or-RETURN branch reflects this.
- **Resume is invoked with no milestone file available at all** — not a
  failure of this flow; resume simply proceeds entirely through `flow-1`'s
  standard pattern instead, per this flow's own step b.i fallback.

## Ordering Rules

- Generation's step a.i (gather source) always precedes step a.ii (draft)
  — the snapshot is never drafted first and backfilled with sources.
- Step a.iv (kit file update) is the last generation step — a milestone
  is not considered complete until `01-process.md` and `04-progress.md`
  reflect it.
- Resume's step b.i (attach snapshot) always precedes step b.ii (AI
  confirmation) — same two-step orientation pattern as `flow-1`.

## Hard Constraints

- A milestone snapshot is always generated from planning documents and
  kit files — never written by hand or from unstated memory.
- Each milestone snapshot is its own file (`docs/rollout/[milestone].md`)
  — snapshots are not overwritten or merged into one another.
- Resume always ends at the same terminal as `flow-1` (person gives a
  specific task) — downstream stage flows do not need to distinguish
  which resume path was used.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
