---
file: 'playbook/.playbook/_index.md'
responsibility: 'The single entry point for a Playbook project — project map, AI session rules, and structure combined. Copied into every new project by create-playbook. Read this file first, every session.'
ai_instructions: 'Read this file completely before doing anything else, every session. It replaces README.md''s boot order and AI-INSTRUCTIONS.md''s session rules — both now live here. Update the Structure section whenever pieces are added or removed.'
archive_rule: 'N/A — living document, kept current at all times.'
id: [project-name]
type: structure
scope: project
status: draft
review-gate: balanced
pipeline-mode: kit-only
contains: []
concerns: []
integrations: []
---

# Playbook — Project Map & Session Rules

## What This Project Is

[One paragraph — plain language description of the project and what it produces.]

---

## Session Start

Read this file first, every session — it is the single entry point.

**Resuming work:** attach this file together with the kit files below in one message. On tools without a hard attachment or message-size limit (Claude, Gemini, and most current tools), this is all you need in a single message to align accurately.

- `kit/01-process.md` — where things are, what's next
- `kit/04-progress.md` — what's happened (append-only; kept lean by regular archiving, not by omission)
- `kit/05-kanban.md` — active tickets, if the project uses one

**If your tool limits what you can attach at once:** send this file + `01-process.md` + `04-progress.md` first — that alone is enough to resume for most sessions. Pull in the rest only if the task calls for it:
- An open question or decision → `kit/02-exploration.md`
- Active execution work → `kit/03-execution.md`
- Ticket detail → `kit/05-kanban.md`
- Testing/sign-off → `kit/06-qa.md`

**Starting fresh:** fill in **What This Project Is** below. If this project's `pipeline-mode` is `kit-only` (the default), that's all you need — start working, tracked through the kit files. If it's `full`, work through [pipeline.md](pipeline.md) stage by stage.

**Domain-specific work:** also load `vocabulary-[domain]/_index.md` — it carries this project's domain vocabulary, planning doc shapes, and domain-specific behavioral rules alongside the universal ones below.

Confirm what you've loaded, then wait for instruction.

---

## AI Behavioral Rules

### Rules

Rules 1, 2, 5, 6, 7, 9, and 12 govern flow, contract, and planning-document
work. They apply only when this project's `pipeline-mode` is `full` — see
the Pipeline Mode section below. In `kit-only` mode, skip directly to
kit-file discipline; there is no flow, contract, or planning-document
requirement to satisfy.

1. Never write a planning document without first reading the relevant flow and contract files.
2. Never begin work on a component without its planning document.
3. Never add an outside dependency without declaring it first.
4. Never duplicate a responsibility that already exists.
5. Always work against the declared interface in the planning document.
6. Flag any `status: draft` document before working against it.
7. Check the `_shared/` folder before creating a new cross-module component.
8. Run a sync check before closing any task — do all touched planning documents reflect current work?
9. Confirm all touched documents are current before every milestone.
10. Flag missing connections as `TODO`.
11. Update the folder map in this file's Structure section when components change.
12. Flow and contract files must be agreed on before any planning documents are written.
13. Prefer built-in solutions over outside tools.
14. Outside tools require explicit justification before adoption.
15. Never move to the next expansion phase without human review.
16. Never write planning documents during inventory, audit, or classify phases.
17. Stop and flag before doing any work when a requirement is unclear.
18. Keep this file's **What This Project Is** and **Structure** sections current with the actual project — see `guides/project-identity.md` for what to update, when, and what must stay fixed.
19. Every file's frontmatter shape follows the Frontmatter Tiering Rule in `maintenance.md` — Tier 1 for planning documents, Tier 2 for everything else. Update frontmatter in the same pass any file is otherwise touched.

### When Something Is Unclear

Stop all work. Flag using this exact format:
`Categories: underspecified | missing-contract | undeclared-dependency | architectural-decision | ambiguous-behavior`

### Never Do These

- Start work ahead of a planning document.
- Add undeclared dependencies or components.
- Resolve ambiguity silently with assumptions.
- Duplicate a responsibility that already exists.
- Leave any path through the work unhandled.
- Make structural decisions without flagging them first.
- Produce placeholder or incomplete work.
- Edit the core Rules or Session Start order in this file to fit a project — append project-specific rules instead (see `guides/project-identity.md`).
- Invent a frontmatter shape outside the two tiers defined in `maintenance.md`.

### Expansions

Active expansions are declared in `kit/01-process.md`. Expansion phases advance only after human review. Never advance autonomously.

### When Something Breaks

1. **Name it** — what broke and what kind of problem it is.
2. **Isolate it** — is it in the work, the planning document, or both?
3. **Fix the source** — do not patch the symptom.
4. **Verify** — confirm the fix holds before continuing.
5. **Log it** — add a Fixed entry in `kit/04-progress.md`.

_If context drifts mid-session:_ re-read the uploaded files. If it persists, start a fresh session using the most recent `docs/rollout/[milestone].md` as context.

### Session End

Update these two files before the session ends or when context reaches 80% — do not wait to be asked:

1. `kit/01-process.md` — current phase and what is next.
2. `kit/04-progress.md` — completions, decisions, fixes. Fold any prior `In Progress` entry into a `Decided`/`Completed` note before adding a new one — only one `In Progress` entry should exist at a time.

**Then:**

3. Run a sync check — do all touched planning documents reflect current work?
4. Update this file's Structure section if any components changed.
5. Confirm every file touched this session has frontmatter matching its tier (`maintenance.md` — Frontmatter Tiering) — fix before logging progress, not after.

---

## Review Gate

This project's review-gate level is declared above in this file's frontmatter
(`review-gate:`). It controls how much AI-produced work stops for approval
before continuing — it does not change whether ambiguous work gets flagged.
Ambiguous or unclear work is always flagged and halted, at every level; the
level only changes how much routine, already-decided work needs a fresh
approval each time it repeats.

| Level | Always halts for approval | Proceeds without waiting |
|---|---|---|
| `strict` | Every artifact-producing step | Nothing |
| `balanced` *(default)* | New architecture, new content or decisions, dependencies, security/auth/persistence changes, deletions | Propagating an already-approved decision across similar files, frontmatter/formatting fixes, reference corrections, kit housekeeping |
| `lean` | Only true architectural or security-impacting decisions | Everything `balanced` allows, plus: similar approval-needing items are reviewed together as one batch instead of one at a time |

Change the level anytime by editing the frontmatter above — the AI never
changes it unilaterally. When it's unclear which category something falls
into, treat it as the stricter case and ask.

---

## Pipeline Mode

This project's pipeline mode is declared above in this file's frontmatter
(`pipeline-mode:`). It determines whether flows, contracts, and planning
documents are required before work begins — simple entry by default,
complex base available when the work actually needs it.

| Mode | What applies |
|---|---|
| `kit-only` *(default)* | Just the six kit files — track decisions, tasks, and history. No flow documents, contracts, or planning documents required. See `guides/context-kit-standalone.md`. |
| `full` | The complete pipeline — Discovery through Handoff, flow and contract documents before planning documents, planning documents before code. See `pipeline.md`. |

Switch from `kit-only` to `full` anytime by editing the frontmatter —
nothing already built is wasted; the same kit files carry forward
unchanged. Switching back down from `full` to `kit-only` isn't
recommended once flow, contract, or planning documents already exist for
the project, since those documents don't disappear just because the mode
changes.

---

## How to Use This File

| If you're...                  | Do this                                                                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting fresh                | Fill in **What This Project Is**, then work through [pipeline.md](pipeline.md) stage by stage                                                                                                                             |
| Resuming a session            | Read **Session Start** above, then `kit/01-process.md`                                                                                                                                                                    |
| Adding a piece                | Find its place in **Structure** below, create the planning document using [templates/](templates/_index.md) or [vocabulary-[domain]/templates/](vocabulary-software/templates/_index.md), then update this file's Structure section |
| Looking for a template        | [templates/](templates/_index.md) — universal shapes; [vocabulary-[domain]/templates/](vocabulary-software/templates/_index.md) — domain-specific fields                                                                            |
| Looking for domain rules      | [vocabulary-[domain]/_index.md](vocabulary-software/_index.md) — domain vocabulary, planning doc shapes, and domain-specific AI rules, layered on top of the universal rules above                                       |

## Structure

```
.playbook/
  README.md                         — human-facing project README (not Playbook mechanics)
  pipeline.md                       — how the pipeline works, all stages
  _index.md                         — this file; project map + session rules (entry point)
  maintenance.md                    — keeping files lean and current
  templates/                        — universal planning document shapes (entry: _index.md)
  _concerns/                        — cross-cutting capabilities (auth, logging, etc.)
  _integrations/                    — external service and library contracts
  _shared/                          — components used across modules
  guides/
    _index.md                       — all guides in one place
    new-project.md                  — starting from scratch
    adopt.md                        — bringing an existing project in
    audit.md                        — mapping a project before changing it
    context-kit.md                  — how the session files work (pipeline-integrated)
    context-kit-standalone.md       — how the session files work (kit files only, no pipeline)
    project-identity.md             — keeping this file and README.md current for this project
    video-insights.md               — using video as research and reference
  kit/
    00-prompts.md                   — session prompts, copy and paste
    01-process.md                   — where you are and what's next
    02-exploration.md               — open questions and settled decisions
    03-execution.md                 — guidelines, plan, tasks, known issues
    04-progress.md                  — project history, never edited, one In Progress entry at a time
    05-kanban.md                    — work tracker (optional)
    06-qa.md                        — checks and sign-off (optional)
    _archives/                      — older history, moved not deleted
    _refs/                          — supporting material, by category:
      video-insights/               — structured insight files extracted from videos
      templates/                    — reusable file shapes or snippets
      examples/                     — worked examples kept for reference
      snippets/                     — small reusable text fragments
      research/                     — outside research material
    _tests/                         — one file per QA check (template: _tests/test-case.md)
  vocabulary-[domain]/
    _index.md                       — domain vocabulary, planning doc shapes, domain-specific AI rules — combined entry point for this folder
    templates/                      — domain-specific planning document shapes (entry: _index.md)

docs/
  [brief or PRD].md                 — discovery document
  flows/
    _index.md                       — entry point for all path documents
    global.md                       — rules spanning every path (optional)
    flow-N-[name].md                — one file per path
  contracts/
    _index.md                       — entry point for all rules documents
    global.md                       — rules that apply everywhere
    flow-N-[name].md                — companion rules file per path
  code-standards.md                 — your own implementation standards (optional)
  rewrite/                          — audit outputs for existing projects
  rollout/
    [milestone].md                  — generated milestone snapshots
```

## Project Planning Documents

[Add links here as planning documents are created — top-down order]

- [\_index.md](./_index.md) — this file
- [Add structures, coordinators, components, concerns, integrations as they're authored]

## Detail

This file absorbed `README.md`'s session-boot content and `AI-INSTRUCTIONS.md`'s behavioral rules in a 2026-08-29 consolidation — both previously duplicated orientation content across three separate files. `README.md` is now a standard human-facing project readme; `AI-INSTRUCTIONS.md` no longer exists as a separate file. `vocabulary-[domain]/README.md` and `AI-INSTRUCTIONS.md` received the same treatment, merged into `vocabulary-[domain]/_index.md`.

[Additional architecture decisions, constraints, or known assumptions specific to this project. Remove this section if nothing fits.]
