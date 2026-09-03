---
name: playbook-scaffold
description: Scaffold a new Playbook project, or add Playbook to an existing one, directly in this session — asks domain, project type, review-gate, and pipeline-mode preferences, then writes the .playbook/ and docs/ structure from the bundled assets. Trigger when the person asks to start a new Playbook project, set up Playbook in this repo, or scaffold Playbook without using the create-playbook CLI.
---

# Playbook Scaffold

This skill sets up a Playbook project — the same output as `pnpm dlx create-playbook`,
generated directly by Claude instead of the CLI. Use it in Claude Code, Claude Desktop,
or Cowork when the person wants a Playbook project without leaving the session to run
a command.

## When to Use This

- "Set up a new Playbook project here"
- "Add Playbook to this repo"
- "Scaffold Playbook for a [software / writing / production / manufacturing] project"

**Do not use this if the project already has a `.playbook/_index.md`** — that's an
existing Playbook project. Read it directly instead of re-scaffolding.

## Before Writing Anything, Ask

Ask one question at a time unless the person has already stated their preference.

1. **Domain** — software, writing, production, manufacturing, or none
2. **Existing work?** — starting fresh / adopting an existing project (well understood) /
   auditing an existing project (needs investigating first)
3. **Review gate** — `strict` (approve every step) / `balanced` *(default — halts only on
   new architecture, new content or decisions, dependencies, security/auth/persistence
   changes, and deletions)* / `lean` (balanced's proceed-list, plus similar items
   batched for review instead of one at a time)
4. **Pipeline mode** — `kit-only` *(default — just the six kit files, no flow, contract,
   or planning-document requirement)* / `full` (the complete Discovery-through-Handoff
   pipeline)

If domain requires investigating an existing project first, run the six-phase audit
(`assets/universal/playbook/guides/audit.md`) before scaffolding kit files with
real content — inventory, audit, classify, risk-map, gap-report, handoff, each
gated by human review.

## What to Write

Copy from `assets/` — generated from `playbook/.playbook/` and `playbook/docs/` by
`build.js`. **Never hand-edit anything under `assets/`** — it is a build output; fix
`playbook/.playbook/` upstream and rebuild instead.

1. `assets/universal/playbook/_index.md` → `.playbook/_index.md`. Replace
   `[project-name]` with the actual project name. Set `review-gate:` and
   `pipeline-mode:` in the frontmatter to the answers gathered above.
2. `assets/universal/playbook/README.md` → `.playbook/README.md`.
3. `assets/universal/playbook/pipeline.md` → `.playbook/pipeline.md`.
4. `assets/universal/playbook/maintenance.md` → `.playbook/maintenance.md`.
5. `assets/universal/playbook/templates/*` → `.playbook/templates/*` (the 5 universal
   planning-doc shapes).
6. `assets/universal/playbook/guides/*` → `.playbook/guides/*`. Only include
   `new-project.md` for a fresh project, `adopt.md` for adoption, or both `adopt.md`
   and `audit.md` when the project needs an audit first.
7. `assets/universal/kit/*` → `.playbook/kit/*`. Generate `01-process.md` and
   `04-progress.md` fresh (today's date, one `In Progress` entry reflecting the
   project type — starting from scratch / adopting / auditing) rather than copying
   the raw template verbatim; copy `00-prompts.md`, `02-exploration.md`,
   `03-execution.md`, `05-kanban.md`, `06-qa.md`, and `_tests/test-case.md` as-is.
   Create empty `_archives/{exploration,progress,kanban}/` and
   `_refs/{video-insights,templates,examples,snippets,research}/` folders.
8. If `domain != none`: `assets/[domain]/vocabulary/_index.md` →
   `.playbook/vocabulary-[domain]/_index.md`, and
   `assets/[domain]/vocabulary/templates/*` →
   `.playbook/vocabulary-[domain]/templates/*`.
9. `assets/universal/docs/flow-template.md` → `docs/flows/flow-template.md`; write a
   fresh `docs/flows/_index.md` with an empty flow table.
10. `assets/universal/docs/global.md` → `docs/contracts/global.md`;
    `assets/universal/docs/contract-template.md` →
    `docs/contracts/contract-template.md`; write a fresh `docs/contracts/_index.md`
    listing only `global.md`.
11. Create an empty `docs/rollout/` folder.
12. If project type is audit: also copy `assets/universal/docs/system-map.md`,
    `decision-record.md`, and `risk-register.md` into `docs/rewrite/`.

Empty reserved folders (`.playbook/_concerns/`, `_integrations/`, `_shared/`) get a
`.gitkeep` placeholder, not content.

## After Writing

Confirm what was created, then point to `.playbook/_index.md` as the entry point for
every future session on this project — the same file this skill would read first if
invoked again later, or that any other AI tool (Claude, Gemini, ChatGPT) reads to
resume work.

## Detail

This skill and the `create-playbook` CLI produce equivalent output from the same
`playbook/.playbook/` source. Prefer this skill when already working inside a Claude
session; prefer the CLI when scripting, automating, or working from a tool without
skill support. Neither is more "correct" — they're two entry points into the same
scaffold.
