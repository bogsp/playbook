# KANBAN
# File: .kit/05-kanban.md

## Rules

- Tickets are seeded from Acceptance Criteria in `03-execution.md`
- One outcome per ticket — no bundling
- Priority within each column is top-down (top = next)
- Blocked tickets stay in their column; blocking relationship is explicit
- When a ticket moves to Done, update `04-progress.md`
- DDA tickets: no coding ticket is created without a corresponding DDA doc

## DDA Ticket Types

- `[DDA]` — authoring or syncing a DDA document
- `[CODE]` — implementation against a DDA doc (requires DDA doc to be status: active)
- `[SYNC]` — drift correction between code and DDA doc

---

## Backlog

Tickets not yet started, in priority order. K-01–K-06 need a human decision before any
file changes are made — see `.kit/_refs/sync-check-playbook-pipeline-2026-08-10.md` for
full context on each.

### [K-01] Resolve `00-rules.md` vs `AI-INSTRUCTIONS.md` naming

**Type:** SYNC
**Description:** Decision log says the AI execution-layer file should be `00-rules.md`;
the shipped, universally-referenced file is `AI-INSTRUCTIONS.md`. Decide which is
canonical and either update the log or rename the file.
**Blocked by:** human decision

### [K-02] De-duplicate template sources

**Type:** SYNC
**Description:** `templates.md` and the `templates/` folder both define the same five
document types with slightly different frontmatter. `templates/` isn't documented in
`_index.md`'s Folder Map at all. Pick one canonical source.
**Blocked by:** human decision

### [K-03] Standardize Hierarchical Context Header (HCH) adoption

**Type:** SYNC
**Description:** HCH frontmatter appears in `templates.md`, `templates/`, and all six
`kit/*.md` files, but not in `_concerns/`, `_integrations/`, or `_shared/`. Never logged
as a decision. Decide: adopt everywhere and backfill, or roll back out of `templates/`
and `kit/`.
**Blocked by:** human decision

### [K-04] Remove/generalize "SAGE-" naming in generic templates

**Type:** SYNC
**Description:** `MODULE_ID` examples in `templates.md` and `templates/*.md` use a
`SAGE-` prefix left over from the unrelated Accord/Great Sage project. Generalize the
placeholder for a tool that ships to every new Playbook project regardless of domain.
**Blocked by:** K-03 (resolve HCH format first, then fix its example values)

### [K-05] Reconcile contract section names against the decision log

**Type:** SYNC
**Description:** Shipped `contract.md` / `global.md` use plainer-language section
headers than what's logged in `.kit/02-exploration.md`. Confirm the shipped version is
final, update the log, and decide whether flow-level contracts need their own
Concurrency Rules section.
**Blocked by:** human decision

### [K-06] Reconcile journey matrix location

**Type:** SYNC
**Description:** Logged decision places an eight-journey matrix in `README.md`; the
actual five-row table lives in `_index.md`. Decide the canonical location and reconcile
the row count.
**Blocked by:** human decision

### [K-07] Author `.playbook/kit/_tests/` test file template

**Type:** DDA
**Description:** Genuinely unbuilt — no test file template exists anywhere in the
shipped files, only an empty `_tests/.gitkeep`. Needs a template matching the
Standard/Full QA tier fields described in `.kit/02-exploration.md`.
**DDA Doc:** none yet — this ticket produces it
**Blocked by:** none

### [K-08] Scope `@bogsp/playbook-software-library` into the plan

**Type:** DDA
**Description:** Fully shipped (v1.3.0, published-ready) but absent from
`.kit/03-execution.md`'s Structure list and `.kit/02-exploration.md`'s decision log.
Needs a planning doc so it's tracked and protected, or an explicit decision that it's
intentionally out-of-band.
**Blocked by:** none — informational decision, low risk

### [K-09] Scope the C11 engine / Rust shell subproject

**Type:** DDA
**Description:** `docs/code-standards-c.md` and `docs/code-standards-rust.md` reference
`src/core/engine/`, `src/shared/`, `rust-shell/`, and module folders
(`.playbook/engine-c/`, `.playbook/rust-shell/`) that don't exist anywhere in `_index.md`
or `.kit/`. Needs a scoping decision: real subproject needing planning docs, or leftover
files that should be removed from this repo.
**Blocked by:** human decision — needs to confirm this is in-scope for this repo at all

### [K-10] Document `_refs/` subfolder structure in `_index.md`

**Type:** SYNC
**Description:** `scaffold.js` creates `video-insights/`, `templates/`, `examples/`,
`snippets/`, and `research/` under `_refs/`, none of which are listed in `_index.md`'s
Folder Map. Pure documentation gap — no decision needed, just add the rows.
**Blocked by:** none

---

## In Progress

_(none — awaiting decisions on K-01–K-06 and K-09 before further work begins)_

---

## Blocked

_(see Backlog — K-01, K-02, K-03, K-05, K-06, K-09 are blocked on human decisions;
K-04 is blocked by K-03)_

---

## Done

_(none this session — see `04-progress.md` 2026-08-10 entry for the 3 acceptance
criteria confirmed complete during the sync check)_
