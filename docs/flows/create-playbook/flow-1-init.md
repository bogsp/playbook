---
file: 'docs/flows/create-playbook/flow-1-init.md'
responsibility: 'Defines the CLI init flow — scaffolding a new Playbook project from a short prompt sequence.'
ai_instructions: 'Read before modifying index.js runInit() or scaffold.js. Companion contract: docs/contracts/create-playbook/flow-1-init.md.'
archive_rule: 'N/A — active flow document; archive only if the init command is removed or fundamentally restructured.'
id: flow-1-init
type: flow
scope: sequence
trigger: request-response
status: draft
calls: [installLibrary, scaffold]
emits: []
called-by: []
---

# Initialize a Project

---

## What It Does

Scaffolds a new Playbook project. Asks the person a small set of questions —
project name, domain, whether existing work exists, and (for software
projects) whether to install the reusable library — then writes the correct
folder structure based on the answers.

## Before It Starts

The CLI is invoked with no subcommand, or with a project name / `.` as the
first argument. The target directory either doesn't exist yet, or is the
current working directory the person wants to scaffold into.

## When It Finishes

A complete Playbook scaffold exists on disk at the target root: `.playbook/`,
`docs/`, and (for software + library-opt-in) library docs copied into
`.playbook/_concerns/`, `_integrations/`, `_solutions/`. Nothing is written
if the person cancels at the final confirmation.

## Walkthrough

The prompt sequence branches on two independent answers — domain and
existing-work status — before a single confirm gates all file writes.

---

```
1. On [CLI invoke](nameArg):
   a. ask.projectName(nameArg)
      → ok: [projectName] → continue to b
   b. choose.domain()
      → ok: [software|writing|production|manufacturing|none] → continue to c
   c. confirm.hasExisting()
      → ok: false → projectType = "new" → continue to e
      → ok: true  → continue to d
   d. confirm.understood()
      → ok: true  → projectType = "adopt" → continue to e
      → ok: false → projectType = "audit" → continue to e
   e. [if domain === "software"] confirm.installLibrary()
      → ok: [installLib: bool] → continue to f
   f. confirm.scaffold(summary)
      → ok: false → print "Cancelled." → halt, no files written
      → ok: true  → continue to g
   g. mkdir(root) [skipped if nameArg === "."]
      → ok: → continue to h
   h. [if installLib] installLibrary(root)
      → ok: [libraryVersion] → continue to i
      → err: pnpm add fails → log error, libraryVersion = "" → continue to i (non-fatal)
   i. scaffold({ projectName, domain, projectType, root, libraryVersion })
      → ok: → print next steps, done
```

---

## Undoing Steps

The only failure point with side effects is step h (library install). A
failed `pnpm add` does **not** halt the flow — it degrades gracefully:
`libraryVersion` is set to `""`, no library docs are copied in `scaffold()`,
and the person is told to run `pnpm add` manually afterward. No compensation
is needed because nothing else has been written yet at that point — `mkdir`
(step g) has already run, so a failed library install leaves a real but
incomplete directory, not an orphaned one.

If the person cancels at step f, no directory operations have occurred at
all — cancellation is clean by construction (confirm gates every write).

## Detail

- `nameArg === "."` scaffolds into `process.cwd()` instead of creating a new
  folder — `root` resolution differs but the rest of the sequence is
  identical.
- `projectType` is never asked directly — it's derived from two yes/no
  answers (`hasExisting`, `understood`). This is a UX simplification over a
  three-way choice; worth flagging if it ever produces a mismatch a person
  didn't intend.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
