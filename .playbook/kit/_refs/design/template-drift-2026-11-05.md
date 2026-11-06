# create-playbook templates: stale tracked build output (found and resolved 2026-11-05)

## What it was

`packages/create-playbook/templates/` is gitignored build output: `build.js` regenerates it from `playbook/`, and `prepublishOnly` runs that build, so the published package always carries the sources. On 2026-10-20 four short files (`expansions.md`, `maintenance.md`, `pipeline.md`, `rules.md`) were committed into that folder by hand (`6992f58`, `5215816`). They stayed tracked, stale, and were never published.

## Correction to this note's first version

The first version said `create-playbook@3.1.11` was built from those files and that regenerating would delete shipped content. Both were wrong. Downloading the published package showed the full 2.0.0 documents (100, 158 and 318 lines for expansions, maintenance and pipeline), rule C11 and none of the stub text. Nothing locked on 2026-10-20 ever shipped.

## Resolution

- The four files are untracked. Their text is preserved verbatim in `cli-roadmap-and-governance-2026-10-20.md`, not adopted as rules and not promoted into the shipped sources (it is Playbook's own planning, not downstream guidance).
- `packages/check-drift.mjs` now fails if any file under the gitignored `templates/` folder is tracked. Proven: a tracked stray file fails the check; without it the check passes.
- Regenerated: the local templates equal their sources in all four files, the skill assets match a fresh build, and the end-to-end scaffold test passes. The software library holds no copies of the shipped files.

## Effect on C12

C12 is in the source and the skill assets, and the next `create-playbook` publish will carry it. Published `3.1.11` does not have it. Publishing is a separate step (K-66).
