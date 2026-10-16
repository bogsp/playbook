---
file: '.playbook/rules.md'
responsibility: 'The rules every Playbook session follows — core, dependency, and pipeline rules, escalation, session end, and what the review-gate and pipeline-mode settings mean.'
ai_instructions: 'Read in full at session start, after _index.md. Cite rules by ID (C1, P3). Never edit, remove, or renumber a rule to fit a project; project-specific rules go in _index.md as X1, X2, …'
archive_rule: 'N/A — core reference file.'
owner: playbook
---

# Playbook Rules

The rules your AI follows in every session, written once so the same rules apply to every project. They keep the AI from guessing, from building without a plan, and from leaving the project in a state you cannot pick up again. You do not need to read past this page to use Playbook; your AI reads the rest.

| Group | Applies | What it covers |
|---|---|---|
| Core (C) | always | flagging unclear work, no placeholders, sync checks, keeping the project's identity current, delivering files, and marking changes in progress |
| Dependencies (D) | always | declaring and justifying anything brought in from outside |
| Pipeline (P) | `pipeline-mode: full` | flows and contracts before planning documents, planning documents before work |
| Project (X) | this project only | rules added for this project, kept in `_index.md` |

How much work stops for your approval is set by `review-gate`, and whether the full pipeline applies is set by `pipeline-mode`. Both settings are in `_index.md`; the two sections below explain them.

---

## Rules

Every rule appears once, grouped by what it governs. IDs are stable — cite them (e.g. "per P3"), never by position. Project-specific rules are appended as `X1`, `X2`, … in the **Project** group; the core groups are never edited to fit a project.

### Core — always apply

- **C1** When a requirement is unclear, stop all work and flag it. Never resolve ambiguity silently with an assumption.
- **C2** Never duplicate a responsibility that already exists.
- **C3** Never produce placeholder or incomplete work. Leave no path through the work unhandled.
- **C4** Flag a structural decision before making it.
- **C5** Flag any missing connection as `TODO`.
- **C6** Run a sync check before closing any task and before every milestone: do all touched documents reflect current work?
- **C7** Frontmatter follows the Frontmatter Tiering Rule in `maintenance.md` — Tier 1 for planning documents, Tier 2 for everything else. Fix it in the same pass a file is otherwise touched.
- **C8** Keep **What This Project Is** and the project's structure in `_index.md` current (see Keep Project Identity Current in `maintenance.md`).
- **C9** A file is delivered only when it has been attached or written to the agreed location. Say what you delivered and where. Never describe a file you have not produced as done.
- **C10** Before changing more than one file, write an `In flight:` line in `kit/01-process.md` naming the files and the step. Clear it when the change is finished and logged. If a session starts with an `In flight:` line, finish or revert that change before any new work.

### Dependencies — always apply

- **D1** Declare any outside dependency or component before adding it.
- **D2** Prefer built-in solutions. An outside tool needs explicit justification before adoption.

### Pipeline — apply only when `pipeline-mode: full`

- **P1** Read the relevant flow and contract files before writing a planning document.
- **P2** Agree flow and contract files before any planning document is written.
- **P3** Never begin work on a component without its planning document.
- **P4** Work against the interface declared in the planning document.
- **P5** Flag any `status: draft` document before working against it.
- **P6** Check `_shared/` before creating a new cross-module component.
- **P7** Never write planning documents during inventory, audit, or classify phases.
- **P8** Never advance to the next expansion phase without human review. Active expansions are declared in `kit/01-process.md`.

### Review gate and domain rules

How much work stops for approval is set by `review-gate` (see **Review Gate**), not by a rule here. Domain rules live in `vocabulary-[domain]/_index.md`.

### Project — appended per project

Project-specific rules (`X1`, `X2`, …) live in this project's `_index.md`, never here.

### When something is unclear

Flag using this exact format:
`Categories: underspecified | missing-contract | undeclared-dependency | architectural-decision | ambiguous-behavior`

### When something breaks

1. **Name it** — what broke and what kind of problem it is.
2. **Isolate it** — is it in the work, the planning document, or both?
3. **Fix the source** — do not patch the symptom.
4. **Verify** — confirm the fix holds before continuing.
5. **Log it** — add a Fixed entry in `kit/04-progress.md`.

_If context drifts mid-session:_ re-read the uploaded files. If it persists, start a fresh session using the most recent `docs/rollout/[milestone].md` as context.

### Session end

Update these before the session ends or when context reaches 80% — do not wait to be asked:

1. `kit/01-process.md` — current phase and what is next.
2. `kit/04-progress.md` — one line per event: Completed, Decided, or Fixed, with references.
3. Check each kit file against its budget (see `kit/00-guide.md`); roll over any file that is over.

Then: run a sync check (C6), update the project's structure if components changed (C8), and confirm every touched file's frontmatter matches its tier (C7) — before logging progress, not after.

---

## Review Gate

This project's review-gate level is declared in `_index.md`'s frontmatter
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

Change the level anytime by editing that frontmatter — the AI never
changes it unilaterally. When it's unclear which category something falls
into, treat it as the stricter case and ask.

---

## Pipeline Mode

This project's pipeline mode is declared in `_index.md`'s frontmatter
(`pipeline-mode:`). It determines whether flows, contracts, and planning
documents are required before work begins — simple entry by default,
complex base available when the work actually needs it.

| Mode | What applies |
|---|---|
| `kit-only` *(default)* | Just the six kit files — track decisions, tasks, and history. No flow documents, contracts, or planning documents required. See `kit/00-guide.md`. |
| `full` | The complete pipeline — Discovery through Handoff, flow and contract documents before planning documents, planning documents before code. See `pipeline.md`. |

Switch from `kit-only` to `full` anytime by editing the frontmatter —
nothing already built is wasted; the same kit files carry forward
unchanged. Switching back down from `full` to `kit-only` isn't
recommended once flow, contract, or planning documents already exist for
the project, since those documents don't disappear just because the mode
changes.

---
