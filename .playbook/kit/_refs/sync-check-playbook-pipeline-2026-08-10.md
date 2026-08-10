---
File: .kit/_refs/sync-check-playbook-pipeline-2026-08-10.md
Date: 2026-08-10
Scope: Full reconciliation — `.kit/03-execution.md` acceptance criteria, `.kit/02-exploration.md` decision log, `playbook/.playbook/**`, `playbook/docs/**`, `packages/create-playbook/**`, `packages/playbook-software-library/**`, `docs/code-standards*.md`.
Method: Compared every unchecked item in `.kit/03-execution.md` against the actual shipped files, then checked shipped files against the decisions logged in `.kit/02-exploration.md` for drift in either direction (decided-but-not-built, or built-but-never-logged). This is a sync check, not an audit — nothing here implies the pipeline is broken. It means the tracking files (`.kit/01-process.md`, `.kit/03-execution.md`, `.kit/04-progress.md`) fell behind the actual work. Findings are grouped so the genuinely open items are easy to tell apart from stale checkboxes.
---

# Sync Check — Playbook Pipeline Reconciliation

---

## 1. Confirmed Complete — checkbox is just stale

These exist, match what was decided, and can be checked off with no further action.

| Item                                                                                       | Where it lives                                                                                                                    |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `.playbook/pipeline.md` drafted                                                            | `playbook/.playbook/pipeline.md`                                                                                                  |
| Updated flow doc format (progressive disclosure, tiered sections, all scope/trigger types) | `playbook/docs/flows/flow.md`                                                                                                     |
| Updated sequencer doc format (full call chain, typed branches)                             | `playbook/.playbook/vocabulary-software/templates.md`                                                                             |
| Updated `.playbook/kit/` templates — all six files                                         | `playbook/.playbook/kit/01–06-*.md`                                                                                               |
| `_archives/` conventions documented                                                        | `playbook/.playbook/maintenance.md`                                                                                               |
| Video insights integration defined                                                         | `playbook/.playbook/guides/video-insights.md`, `kit/00-prompts.md`                                                                |
| `create-playbook` CLI updated                                                              | `packages/create-playbook/*` — actually exceeds the original plan (adds `sync` and `generate` subcommands, library install flow)  |
| `_refs/` folder structure                                                                  | Scaffolded by `packages/create-playbook/lib/scaffold.js` (`video-insights/`, `templates/`, `examples/`, `snippets/`, `research/`) |

---

## 2. Architecture Decisions Needed Before Closing

Per `AI-INSTRUCTIONS.md` rule: _"Never make structural decisions without flagging them
first."_ These are cases where the shipped files disagree with the logged decision, or
with each other, and someone needs to pick the canonical version.

### [FLAG] architectural-decision: `00-rules.md` vs `AI-INSTRUCTIONS.md`

**Location:** `playbook/.playbook/`
**Description:** The 2026-05-23 decision log states `00-playbook.md` → `00-rules.md`. No
file named `00-rules.md` exists anywhere in the shipped pipeline. The AI execution-layer
file is actually named `AI-INSTRUCTIONS.md`, and every other file (`README.md`,
`pipeline.md`, `code-standards.md` §14, all four `vocabulary-*/AI-INSTRUCTIONS.md` files,
`00-prompts.md`) consistently references `AI-INSTRUCTIONS.md`. The rename to `00-rules.md`
appears to have been reversed at some point, but that reversal was never logged as its own
decision.
**Blocking:** K-01 — whether to update the decision log to reflect `AI-INSTRUCTIONS.md` as
final (recommended — it's what's actually wired everywhere), or rename the file.

### [FLAG] architectural-decision: duplicate template sources

**Location:** `playbook/.playbook/templates.md` vs `playbook/.playbook/templates/*.md`
**Description:** Two separate sources define the same five document types. `templates.md`
is a single file containing `structure`, `coordinator`, `component`, `concern`, and
`integration` inline. A parallel `templates/` folder holds the same five types as separate
files (`structure.md`, `coordinator.md`, `component.md`, `concern.md`, `integration.md`),
with slightly different frontmatter (see HCH finding below). `_index.md`'s Folder Map lists
only `templates.md` — the `templates/` folder isn't documented anywhere, meaning it's
currently an undocumented, un-linked duplicate.
**Blocking:** K-02 — pick one canonical location and retire the other, or explicitly
document why both exist (e.g. `templates.md` = quick reference, `templates/` = copy-paste
originals).

### [FLAG] architectural-decision: Hierarchical Context Header (HCH) inconsistently applied

**Location:** `playbook/.playbook/templates/*.md`, `playbook/.playbook/kit/*.md` vs
`playbook/.playbook/_concerns/*.md`
**Description:** A `MODULE_ID / SYSTEM_CONTEXT / UPSTREAM_DEPENDENCIES / DOWNSTREAM_IMPACT /
CORE_SYSTEM_INVARIANTS` frontmatter block (HCH) appears in `templates.md`, the `templates/`
folder, and all six `kit/*.md` files. It does **not** appear in `_concerns/logging.md`,
`_concerns/auth.md`, or `_concerns/error-handling.md`, which use the older plain
`id/type/status/affects/provided-by` frontmatter. HCH itself is never mentioned in the
`.kit/02-exploration.md` decision log — it isn't traceable to a decision at all.
**Blocking:** K-03 — decide whether HCH is the standard going forward (and backfill
`_concerns/`, `_integrations/`, `_shared/`), or whether it was an experiment that should be
rolled back out of `templates/` and `kit/`. Either way, log the decision.

### [FLAG] architectural-decision: "SAGE-" naming inside generic Playbook templates

**Location:** `playbook/.playbook/templates.md`, `playbook/.playbook/templates/*.md`
**Description:** Every HCH block's `MODULE_ID` example uses a `SAGE-` prefix
(`SAGE-CORE-XX-[NAME]`, `SAGE-COORD-XX-[NAME]`, `SAGE-CONCERN-XX-[NAME]`). This traces back
to the "Great Sage" / Accord naming explored in the 2026-05-28 decision log entries — a
different, unrelated project. It's now baked into the generic templates that ship to every
new Playbook project regardless of domain, which will confuse anyone scaffolding an
unrelated project.
**Blocking:** K-04 — generalize the placeholder (e.g. `PLAYBOOK-CORE-XX-[NAME]` or
`[PROJECT]-CORE-XX-[NAME]`) unless there's a reason to keep it that isn't visible in the
kit files.

### [FLAG] architectural-decision: contract section names diverged from the decision log

**Location:** `playbook/docs/contracts/contract.md`, `playbook/docs/contracts/global.md`
**Description:** The 2026-05-23 decision log specifies contract required sections as
`## Happy Path / ## Failure Modes / ## Edge Cases / ## Concurrency Rules / ## Constraints`,
and `global.md` sections as `## Architecture Rules / ## Auth Boundaries / ## Error Handling
Rules / ## Audit Requirements / ## Cross-Cutting Constraints`. The shipped files use
different, plainer-language headers instead (`## The Good Path`, `## Ways It Can Fail`,
`## Ordering Rules`, `## Hard Constraints` for the flow contract; `## How the Project Is
Structured`, `## Who or What Has Authority Over What`, `## How Failures Are Handled`, `##
What Must Always Be Recorded`, `## Rules That Apply Everywhere` for `global.md`). There's
also no dedicated Concurrency Rules section in the shipped version. This reads like a
deliberate later revision toward the Progressive Disclosure plain-language principle, but
it was never logged, and the shipped versions between the two files aren't fully parallel
(the flow contract lacks concurrency coverage that `global.md`'s structure implies should
exist somewhere).
**Blocking:** K-05 — confirm the plain-language headers are final, log that decision, and
decide whether flow-level contracts need their own concurrency section.

### [FLAG] architectural-decision: journey matrix location

**Location:** `playbook/.playbook/README.md` vs `playbook/.playbook/_index.md`
**Description:** The 2026-05-23 log states: _"Journey matrix defined — eight distinct
reader journeys, lives in `.playbook/README.md`."_ The shipped `README.md` has a numbered
"Start Here" list and a "Session Boot Order," but no journey-matrix table. The closest
equivalent — a "How to Use This File" table mapping reader situation to action — lives in
`_index.md` instead, and covers five rows, not eight journeys.
**Blocking:** K-06 — decide whether the journey matrix belongs in `README.md` (per the
original decision) or `_index.md` (where it actually is), and reconcile the eight-journey
scope against the five rows currently present.

---

## 3. Genuinely Outstanding — not just a stale checkbox

| Item                                       | Status                                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `.playbook/kit/_tests/` test file template | Does not exist anywhere in the shipped files. `_tests/.gitkeep` is present but no template. Still needs to be authored. |

---

## 4. Shipped but Never Logged

Real, working scope that exists in the repo but has no corresponding entry in
`.kit/02-exploration.md` or `.kit/03-execution.md` — meaning nothing currently tracks it or
protects it from being torn out by accident.

- **`@bogsp/playbook-software-library` (`packages/playbook-software-library/`)** — a full
  npm package of reusable `_concerns/`, `_integrations/`, and `_solutions/` docs, versioned
  independently (currently 1.3.0), with its own `CONTRIBUTING.md`, `CHANGELOG.md`, and
  install/sync flow wired into the CLI (`lib/install.js`). None of this appears in the
  original plan's "Structure" list (`.playbook/README.md`, `pipeline.md`, `00-rules.md`,
  formats, kit templates, CLI — six items). It's a seventh major deliverable with no
  planning doc of its own.
- **A C11 engine / Rust shell subproject** — `docs/code-standards-c.md` and
  `docs/code-standards-rust.md` both reference `src/core/engine/`, `src/shared/`, and
  `rust-shell/`, and `docs/code-standards.md` §14's boot-order table routes "C11 engine
  work" and "Rust shell work" to these files plus `.playbook/engine-c/_index.md` and
  `.playbook/rust-shell/_index.md`. Neither of those module folders, nor any mention of a
  C/Rust component, appears in `_index.md`'s Structure map or anywhere in `.kit/`. This is
  either a real subproject that needs its own planning docs, or leftover scaffolding from
  a different project that shouldn't be in this repo's `docs/` at all.

---

## 5. Minor / Low-Risk — no decision needed, safe to fix directly

- `_index.md`'s Folder Map doesn't list the `_refs/` subfolders (`video-insights/`,
  `templates/`, `examples/`, `snippets/`, `research/`) that `scaffold.js` actually creates.
  Pure documentation gap.
- Several `.kit/` root files (`01-process.md`, `02-exploration.md`, `03-execution.md`,
  `04-progress.md`, `00-prompts.md`) carry a `# File:` header pointing at
  `.playbook/kit/[name].md` — the scaffold-template path — rather than their actual
  location at `.kit/[name].md`. `05-kanban.md`, `06-qa.md`, and `00-summary.md` are missing
  a `# File:` header entirely. Cosmetic, but worth a pass — corrected in this session's
  updated `01-process.md`, `04-progress.md`, and `05-kanban.md` as those files were already
  being touched.

---

## Summary

- **3 items** were simply stale checkboxes — now confirmed complete.
- **6 items** need a human decision before they can be closed (K-01–K-06) — these are
  architecture-level per `AI-INSTRUCTIONS.md` and are not being resolved unilaterally here.
- **1 item** is genuinely unbuilt (K-07).
- **2 items** are shipped-but-untracked scope that need a planning doc or an explicit
  decision to exclude them (K-08, K-09).
- **1 item** is a low-risk documentation gap (K-10).

See `.kit/05-kanban.md` for the corresponding tickets.
