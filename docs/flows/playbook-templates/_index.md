---
file: 'docs/flows/playbook-templates/_index.md'
responsibility: 'Entry point for all playbook-templates track flow documents — lists flows and their dependency map.'
ai_instructions: 'Read before any flow-specific document in this track. Always read docs/contracts/playbook-templates/global.md alongside flows.'
archive_rule: 'N/A — living index, updated in the same session a flow is added or removed.'
---

# Templates Flows Index

Entry point for all playbook-templates process flow documents. This track
covers the `playbook/` template source directory — the deliverable that
`create-playbook` scaffolds into every new project — and both how that
source is maintained, and how a person actually uses what it ships.

---

## Flows

| ID | Title | Scope | Trigger | Status |
|---|---|---|---|---|
| flow-1-edit-template-source | Edit Template Source | operation | request-response | draft |
| flow-2-build-and-publish | Build and Publish | sequence | request-response | draft |
| flow-3-new-project | New Project | journey | request-response | draft |
| flow-4-adopt-existing-project | Adopt an Existing Project | journey | request-response | draft |
| flow-5-audit-existing-project | Audit an Existing Project | composite | request-response | draft |
| flow-6-resume-session | Resume a Session | operation | request-response | draft |
| flow-7-milestone-handoff-and-resume | Milestone Handoff and Resume | sequence | request-response | draft |

---

## Groups

**Maintaining the template (flow-1, flow-2)** — how this repo's own
maintainers change `playbook/` and ship it. Internal to this repo.

**Using the shipped pipeline (flow-3 through flow-7)** — how a person in a
*consuming* project moves through Playbook once it's scaffolded into their
own repo. These flows describe the guides under `playbook/.playbook/guides/`
as executable paths, not just prose.

---

## Dependency Map

_calls: flow calls another flow_
_emits: flow emits an event that triggers another flow_

- `flow-1-edit-template-source` precedes `flow-2-build-and-publish` by
  convention, not a programmatic call — a manual handoff.
- `flow-3-new-project` calls `flow-6-resume-session` (every session) and
  `flow-7-milestone-handoff-and-resume` (at each Handoff).
- `flow-4-adopt-existing-project` calls `flow-5-audit-existing-project`
  (only when existing docs are not current/accurate) and
  `flow-6-resume-session` (every session).
- `flow-5-audit-existing-project` is called by `flow-4` only — it has no
  standalone entry point of its own outside adoption.
- `flow-7-milestone-handoff-and-resume` is called by `flow-3` at each
  Handoff stage, and re-entered directly by a person resuming from a
  snapshot in a fresh session (step d of that flow).

**Cross-track note:** the build step (`packages/create-playbook/build.js`)
physically lives in the CLI track's package, but its responsibility belongs
here. See `flow-2-build-and-publish.md` → Detail, and K-29.
