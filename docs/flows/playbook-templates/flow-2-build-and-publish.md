---
file: 'docs/flows/playbook-templates/flow-2-build-and-publish.md'
responsibility: 'Defines the build step that copies playbook/ template source into packages/create-playbook/templates/ before publish.'
ai_instructions: 'Read before modifying packages/create-playbook/build.js or its `sources` array. Companion contract: docs/contracts/playbook-templates/flow-2-build-and-publish.md.'
archive_rule: 'N/A — active flow document; archive only if the build/publish mechanism is fundamentally restructured.'
id: flow-2-build-and-publish
type: flow
scope: sequence
trigger: request-response
status: draft
calls: []
emits: []
called-by: []
---

# Build and Publish

---

## What It Does

Copies every template source file listed in `build.js`'s `sources` array
from `playbook/.playbook/` and `playbook/docs/` into
`packages/create-playbook/templates/`, replacing the directory's contents
entirely. This is the only mechanism by which template edits reach the
published CLI package.

## Before It Starts

`flow-1-edit-template-source` has been completed for any pending changes.
Run manually via `pnpm build` inside `packages/create-playbook/`, or
automatically via the `prepublishOnly` npm lifecycle hook before `npm
publish`.

## When It Finishes

`packages/create-playbook/templates/` exactly mirrors the current state of
`playbook/.playbook/` and `playbook/docs/` for every path listed in
`sources`. The build reports a copied-file count. If any source file was
missing, the build exits non-zero and publish cannot proceed.

## Walkthrough

---

```
1. On [pnpm build | npm prepublishOnly](none):
   a. rm(templatesDir, { recursive: true, force: true })
      → ok: [templates/ removed] → continue to b
   b. mkdir(templatesDir, { recursive: true })
      → ok: [templates/ recreated empty] → continue to c
   c. for each { from, to } in sources[]:
        mkdir(dirname(to), { recursive: true })
        cp(from, to)
        → ok:  → log "✓ [to]", copied++
        → err: → log "✗ [from] — [error]", push to errors[]
      → after all entries processed, continue to d
   d. print "[copied] files copied."
      → errors.length > 0 → print error count, process.exit(1), halt
                              (blocks npm publish via prepublishOnly)
      → errors.length === 0 → print "Build complete.", done
```

---

## Detail

- **Cross-track ownership (flagged for K-29):** this script physically lives
  at `packages/create-playbook/build.js` — inside the CLI package — but its
  entire responsibility is Templates-track: turning `playbook/` source into
  a shippable artifact. The planning doc for this logic needs a decision on
  whether it sits under the CLI's infrastructure layer (matches file
  location, per `clean-architecture-planning-layout`) or under
  `.playbook/playbook-templates/` (matches responsibility), with a
  cross-reference either way.
- The `sources` array is the single source of truth for what gets copied —
  it is not derived by scanning `playbook/` directory contents. A file that
  exists in `playbook/` but has no matching array entry is silently never
  copied; the build has no way to detect this (see `flow-1`, Detail).
- The full destructive `rm` + `mkdir` at steps a–b means `templates/` is
  never partially updated — every build is a complete regeneration, so
  there's no drift accumulation between builds, only staleness if the build
  simply isn't run after an edit.
- `prepublishOnly` guarantees the build runs before every `npm publish`, so
  a stale `templates/` can reach the registry only if someone publishes
  outside the normal npm lifecycle (e.g. manually copying files) — that path
  is explicitly prohibited by `.playbook/AI-INSTRUCTIONS.md` rule 1.

---

N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
