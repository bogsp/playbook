---
file: '.playbook/kit/05-kanban.md'
responsibility: 'Work state registry for active tickets and blocking relationships.'
ai_instructions: 'Update statuses as tasks progress. Seed tickets from 03-execution.md.'
archive_rule: 'Done tickets no longer referenced move to .playbook/kit/_archives/kanban/'
---

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

Tickets not yet started, in priority order. K-01–K-06 need a human decision before any file changes are made.

### [K-01] Resolve `00-rules.md` vs `AI-INSTRUCTIONS.md` naming

**Type:** SYNC
**Description:** Decision log says the AI execution-layer file should be `00-rules.md`; the shipped, universally-referenced file is `AI-INSTRUCTIONS.md`. Decide which is canonical and either update the log or rename the file.
**Blocked by:** human decision

### [K-02] De-duplicate template sources

**Type:** SYNC
**Description:** `templates.md` and the `templates/` folder both define the same five document types with slightly different frontmatter. `templates/` isn't documented in `_index.md`'s Folder Map at all. Pick one canonical source.
**Blocked by:** human decision

### [K-03] Standardize YAML Frontmatter adoption

**Type:** SYNC
**Description:** Legacy HCH frontmatter vs standardized YAML frontmatter inconsistencies. Decide: adopt everywhere and backfill, or define specific boundaries.
**Blocked by:** human decision

### [K-05] Reconcile contract section names against the decision log

**Type:** SYNC
**Description:** Shipped `contract.md` / `global.md` use plainer-language section headers than what's logged in `.playbook/kit/02-exploration.md`. Confirm the shipped version is final, update the log, and decide whether flow-level contracts need their own Concurrency Rules section.
**Blocked by:** human decision

### [K-06] Reconcile journey matrix location

**Type:** SYNC
**Description:** Logged decision places an eight-journey matrix in `README.md`; the actual five-row table lives in `_index.md`. Decide the canonical location and reconcile the row count.
**Blocked by:** human decision

### [K-07] Author `.playbook/kit/_tests/` test file template

**Type:** DDA
**Description:** Genuinely unbuilt — no test file template exists anywhere in the shipped files, only an empty `_tests/.gitkeep`. Needs a template matching the Standard/Full QA tier fields described in `02-exploration.md`.
**DDA Doc:** none yet — this ticket produces it
**Blocked by:** none

### [K-10] Document `_refs/` subfolder structure in `_index.md`

**Type:** SYNC
**Description:** `scaffold.js` creates `video-insights/`, `templates/`, `examples/`, `snippets/`, and `research/` under `_refs/`, none of which are listed in `_index.md`'s Folder Map. Pure documentation gap — no decision needed, just add the rows.
**Blocked by:** none

---

## In Progress

_(none — awaiting decisions on K-01–K-06 before further work begins)_

---

## Blocked

_(see Backlog — K-01, K-02, K-03, K-05, K-06 are blocked on human decisions)_

---

## Done

_(none this session)_
