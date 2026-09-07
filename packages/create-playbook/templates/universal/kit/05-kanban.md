---
file: '.playbook/kit/05-kanban.md'
responsibility: 'Active work state registry tracking tasks across Backlog, In Progress, Blocked, and Done.'
ai_instructions: 'Update ticket status dynamically during the session. Map tickets directly to Acceptance Criteria in 03-execution.md. Maintain strict top-down priority. Never bundle multiple outcomes into one ticket.'
archive_rule: "Move 'Done' tickets to `.playbook/kit/_archives/kanban/` when they are logged in 04-progress.md and no longer referenced by active work."
---

# Kanban

## Rules

- Tickets are seeded from Acceptance Criteria in `03-execution.md`.
- One outcome per ticket — no bundling.
- Priority within each column is strictly top-down (top = next).
- Blocked tickets stay in their column; blocking relationship must be explicit.
- DDA tickets: No coding ticket is created without a corresponding planning doc.

## Ticket Types

- **[DDA]** — Authoring or syncing a planning document.
- **[CODE]** — Implementation against a DDA doc (requires DDA doc to be `status: active`).
- **[SYNC]** — Drift correction between code and DDA doc.

---

## Backlog

- **[K-01]** [Example Task] — [Description of work to be done]

---

## In Progress

---

## Blocked

---

## Done
