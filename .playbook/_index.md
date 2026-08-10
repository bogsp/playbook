---
file: '.playbook/_index.md'
responsibility: 'Living map of THIS repo — the Playbook pipeline meta-project (CLI, library, and template source). Not a template — this describes the actual repo structure.'
ai_instructions: 'Read this right after AI-INSTRUCTIONS.md. Update the Structure section in the same session as any file is added, moved, or removed.'
archive_rule: 'N/A — kept current at all times, never archived.'
---

# The Playbook Meta-Pipeline

---

## What This Project Is

This repo builds and maintains **Playbook** itself: the `create-playbook` CLI, the
`@bogsp/playbook-software-library` npm package, and the domain-agnostic template
source that `create-playbook` scaffolds into consuming projects. It is not a
project that _uses_ Playbook for an app — it is the tooling and templates that
other projects install.

Two Playbook worlds exist side by side in this repo, and they must not be confused:

| Path                                             | What it is                                                                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.playbook/` (this folder, dotted)               | The **meta-pipeline** — governs AI sessions working on this repo's own code and templates                                                         |
| `playbook/.playbook/`, `playbook/docs/` (no dot) | The **template source** — the deliverable that gets copied into `packages/create-playbook/templates/` and scaffolded into other people's projects |

Never edit files under `playbook/` as if they were this repo's own planning docs —
they are product source, not meta-pipeline state.

## How to Use This File

| If you're...                                                | Do this                                                                                                                                 |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Resuming a session on this repo                             | Read this file, then `kit/01-process.md`                                                                                                |
| Editing the CLI (`packages/create-playbook/`)               | Also read `packages/create-playbook/README.md`                                                                                          |
| Editing the library (`packages/playbook-software-library/`) | Also read `CONTRIBUTING.md` and `README.md` in that package                                                                             |
| Editing template source (`playbook/`)                       | Remember: `packages/create-playbook/templates/` is a **build artifact** — never hand-edit it; edit `playbook/` then run `node build.js` |
| Adding a kit file or planning doc                           | Follow `.playbook/AI-INSTRUCTIONS.md` behavioral rules                                                                                  |

## Structure

```
.playbook/                          — THIS repo's meta-pipeline (dotted, own AI sessions)
  README.md                         — orientation for working on this repo
  AI-INSTRUCTIONS.md                — session rules for this repo
  _index.md                         — this file
  kit/
    00-prompts.md
    01-process.md                   — current phase, active goal
    02-exploration.md               — decision log
    03-execution.md                 — active plan and tasks
    04-progress.md                  — append-only history
    05-kanban.md                    — ticket board (K-IDs)
    06-qa.md
    _archives/                      — exploration/, progress/, kanban/
    _refs/                          — sync-check reports, research

playbook/                           — TEMPLATE SOURCE (no dot) — the shipped product
  .playbook/
    README.md, AI-INSTRUCTIONS.md, pipeline.md, maintenance.md, templates.md, _index.md
    guides/                         — new-project, adopt, audit, context-kit, video-insights
    kit/                            — the six kit file templates
    vocabulary-software/            — README, AI-INSTRUCTIONS, templates
    vocabulary-writing/
    vocabulary-production/
    vocabulary-manufacturing/
    _concerns/, _integrations/, _shared/
  docs/
    flows/flow.md
    contracts/contract.md, global.md
    rewrite/system-map.md, decision-record.md, risk-register.md
    code-standards.md               — generic template
    code-standards-ts.md            — TypeScript-specific template
    code-standards-c.md             — C11-specific template
    code-standards-rust.md          — Rust-specific template

packages/
  create-playbook/                  — the CLI (published to npm)
    index.js                        — entry: init / sync / generate
    build.js                        — copies playbook/ → templates/ before publish
    lib/                            — prompt.js, scaffold.js, install.js, generate.js
    templates/                      — BUILD ARTIFACT — generated, never hand-edited
    package.json
    README.md
  playbook-software-library/        — @bogsp/playbook-software-library (published to npm)
    _concerns/                      — auth, logging, error-handling
    _integrations/                  — postgres, convex, workos, r2, vite, trpc, tanstack-router, docker-compose, llama-cpp
    _solutions/                     — clean-architecture-planning-layout, platform-planning-coverage,
                                       dependency-registry, docker-compose-boot-groups, local-model-runtime,
                                       convex-reactive-state, missing-script-drift-check, signed-url-delivery
    CONTRIBUTING.md                 — doc standard and submission process
    CHANGELOG.md
    README.md
    package.json

Root
  package.json                      — workspace root, lint/format scripts
  pnpm-workspace.yaml                — packages/*
  biome.json                        — lint + format config (this repo's own code standard)
  nx.json                           — task caching
  README.md                         — points to playbook/.playbook/README.md for template consumers
```

## Active Packages

| Package                     | Version | Published as                       |
| --------------------------- | ------- | ---------------------------------- |
| `create-playbook`           | 3.0.0   | `create-playbook` (npm bin)        |
| `playbook-software-library` | 1.3.0   | `@bogsp/playbook-software-library` |

## Project Planning Documents

- [\_index.md](./_index.md) — this file
- [kit/01-process.md](kit/01-process.md) — current phase
- [kit/05-kanban.md](kit/05-kanban.md) — active tickets (K-05, K-06, K-07, K-10, K-12, K-13 open)

## Detail

- This repo has no `.playbook/_concerns/`, `_integrations/`, or `_shared/` of its own —
  those folders exist only inside `playbook/.playbook/` (template source) and
  `packages/playbook-software-library/` (published library). Root `.playbook/` stays
  planning-only: kit files and this map.
- There is no root-level `docs/code-standards.md` for this repo's own code. This repo's
  own coding standard is enforced via `biome.json` + `package.json` scripts
  (`lint`, `lint:fix`, `format`). The `docs/code-standards*.md` files under `playbook/`
  are template deliverables for _consuming_ projects, not standards for this repo.
