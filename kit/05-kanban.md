# KANBAN

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

Tickets not yet started, in priority order.

### [K-01] Ticket Title

**Type:** [DDA | CODE | SYNC | other]
**Description:** What needs to happen and why.
**DDA Doc:** `.context/[path/to/doc].md` _(required for CODE tickets)_
**Blocked by:** none

### [K-02] Ticket Title

**Type:** [DDA | CODE | SYNC | other]
**Description:** What needs to happen and why.
**DDA Doc:** `.context/[path/to/doc].md`
**Blocked by:** K-01

---

## In Progress

Actively being worked, in priority order.

### [K-03] Ticket Title

**Type:** [DDA | CODE | SYNC | other]
**Description:** What needs to happen and why.
**DDA Doc:** `.context/[path/to/doc].md`
**Blocked by:** none

---

## Done

### [K-04] Ticket Title

**Completed:** YYYY-MM-DD
