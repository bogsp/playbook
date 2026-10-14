---
file: '.playbook/_index.md'
responsibility: 'The single entry point for sessions on THIS repo (the Playbook meta-repo) — project map, session rules, and structure.'
ai_instructions: 'Read this file completely before doing anything else, every session. This is the repo-specific file. It is NOT the template; the template entry point is playbook/.playbook/_index.md. Update Structure whenever files or folders are added or removed.'
archive_rule: 'N/A — living document, kept current at all times.'
id: playbook-meta-repo
type: structure
scope: project
status: active
review-gate: strict
pipeline-mode: full
contains: []
concerns: []
integrations: []
---

# Playbook Meta-Repo — Project Map & Session Rules

Rebuilt 2026-10-14 from kit records (K-44, K-45, K-46); the original K-44 file was not in the repo. Rules are single-sourced in the template; this file holds only repo-specific rules.

## What This Project Is

The source repo for Playbook: a domain-agnostic, AI-assisted planning pipeline. It contains the template source, two packages that distribute it, a published reference library, and this repo's own planning records.

## Two Playbook Worlds

Every file belongs to exactly one world. Never copy-paste between them; each is authored on its own terms.

| World | Location | Governs |
|---|---|---|
| **Meta** (this repo's own process) | `.playbook/`, `docs/` | How we build Playbook: kit files, tracked flows and contracts, repo-specific rules |
| **Template** (what ships to users) | `playbook/` | The `.playbook/` and `docs/` scaffold every new project receives |

Generated copies (`packages/create-playbook/templates/`, `packages/playbook-skill/assets/`) are build output from `playbook/`. Never hand-edit them. Fix the source, then run `pnpm build`.

---

## Session Start

Attach this file plus the files below in one message, then confirm what you loaded and wait for instruction.

1. `playbook/.playbook/_index.md` — AI Behavioral Rules section only
2. `docs/code-standards.md` (and `code-standards-ts.md` for TypeScript work)
3. `kit/01-process.md` — where things are, what's next
4. `kit/04-progress.md` — what has happened
5. `kit/05-kanban.md` — active tickets

Load on demand: `kit/02-exploration.md` (open questions, decisions), `kit/03-execution.md` (guidelines, plan), `kit/06-qa.md` (sign-off), `pipeline.md` (stage reference), `maintenance.md` (archiving, frontmatter).

Rule X5 applies to every file above.

---

## Rules

This repo runs `pipeline-mode: full` and `review-gate: strict`.

**Load the template's rules too.** Core (C), Dependencies (D) and Pipeline (P) rules are defined once, in the **AI Behavioral Rules** section of `playbook/.playbook/_index.md`. They apply here in full. They are not copied into this file, so they cannot drift. Project-specific rules for this repo are the **X** rules below.

### Project — this repo only

- **X1** Template-affecting changes go to `playbook/`. Repo-affecting changes go to `.playbook/` or `docs/`. Author each on its own terms; never copy-paste between worlds.
- **X2** Never hand-edit generated copies (`packages/create-playbook/templates/`, `packages/playbook-skill/assets/`). Fix the source in `playbook/`, then run `pnpm build`.
- **X3** Never change `review-gate` or `pipeline-mode` unilaterally.
- **X4** When a change could belong to either world, stop and flag it with the repo-specific category `template-vs-meta-ambiguity`, in addition to the categories in the template.
- **X5** Before any work, confirm each Session Start file exists and is non-empty. If one is missing, stop and flag it.

### Review gate: strict

Every artifact-producing step halts for approval. This repo stays `strict` because everything here is copied into every future project. Ambiguity halts at every level. The levels are defined in `playbook/.playbook/_index.md`.

### When something breaks, and session end

Both follow the template's sections of the same names, with one addition: log `Fixed` entries and session-end updates in this repo's own `kit/` files.

---

## Structure

```
.playbook/                          — this repo's own process (meta world)
  _index.md                         — this file
  maintenance.md                    — archiving and Frontmatter Tiering for this repo
  pipeline.md                       — pipeline stage reference
  kit/                              — 00-prompts … 06-qa, _archives/, _refs/
  _to_delete/                       — staged for human deletion (pending cleanup)

docs/                               — this repo's own tracked flows and contracts
  code-standards.md, code-standards-ts.md
  flows/playbook-templates/         — flow-0 … flow-7 (+ global.md)
  contracts/                        — global.md + playbook-templates/ per-flow contracts
  rewrite/                          — audit outputs
  rollout/                          — milestone snapshots

playbook/                           — TEMPLATE SOURCE (template world)
  .playbook/                        — _index.md, pipeline.md, maintenance.md, kit/, guides/,
                                      templates/, _concerns/, vocabulary-[domain]/
  docs/                             — flow/contract templates, rewrite templates, code-standards variants

packages/
  create-playbook/                  — CLI; templates/ is build output
  playbook-skill/                   — Claude Skill; assets/ is build output
  playbook-software-library/        — published reference library (_concerns, _integrations, _solutions)

journey.md                          — narrative guide to the process
README.md                           — repo readme (points to playbook/.playbook/README.md)
```

## Known Open Items

- Root `pipeline.md` is currently identical to the template copy; whether it should diverge is undecided (K-39 note).
- Generated-copy drift between the two packages is tracked under Topic B of the pipeline optimization.
