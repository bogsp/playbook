---
file: 'docs/flows/create-playbook/flow-2-sync.md'
responsibility: 'Defines the CLI sync flow — checking the installed library version against the latest and reporting changes.'
ai_instructions: 'Read before modifying index.js runSync() or install.js syncLibrary(). Companion contract: docs/contracts/create-playbook/flow-2-sync.md.'
archive_rule: 'N/A — active flow document; archive only if the sync command is removed or fundamentally restructured.'
id: flow-2-sync
type: flow
scope: operation
trigger: request-response
status: draft
calls: [syncLibrary]
emits: []
called-by: []
---

# Sync Library Docs

---

## What It Does

Checks whether `@bogsp/playbook-software-library` has a newer version than
what's installed, and tells the person what changed — it never writes files
itself, only reports and instructs.

## Before It Starts

Must be run inside an initialized Playbook project (`.playbook/_index.md`
exists). The library may or may not already be installed.

## When It Finishes

The person knows one of three things: the library isn't installed, it's
already up to date, or an update is available with instructions to apply it
manually.

## Walkthrough

---

```
1. On [CLI invoke "sync"](cwd):
   a. isPlaybookProject(cwd)
      → ok: false → print error, exit 1, halt
      → ok: true  → continue to b
   b. getInstalledVersion(cwd)
      → ok: "" (not installed) → print instructions, halt
      → ok: [installedVersion] → continue to c
   c. pnpm view [latest version]
      → err: registry unreachable → print error, halt
      → ok: [latestVersion] → continue to d
   d. compare installedVersion vs latestVersion
      → equal     → print "Already up to date", halt
      → not equal → print update available + dist-tags/changelog pointer, halt
```

---

## Detail

- This flow is read-only by design — it deliberately stops short of
  auto-updating (`pnpm add ... @latest`) or auto-copying changed docs. Both
  steps are left to the person, matching the library's own rule: "No doc in
  your project should be updated without a human reviewing the diff."
- The changelog step (`pnpm view ... dist-tags`) is a soft fallback — if it
  fails, the person is pointed to the npm package page instead. Neither path
  blocks the flow.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
