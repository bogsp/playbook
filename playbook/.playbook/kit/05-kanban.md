---
File: .playbook/kit/05-kanban.md

MODULE_ID: PLAYBOOK-CORE-05-KANBAN
SYSTEM_CONTEXT: Playbook Work State Registry
UPSTREAM_DEPENDENCIES: [.playbook/kit/03-execution.md]
DOWNSTREAM_IMPACT: [.playbook/kit/04-progress.md]
CORE_SYSTEM_INVARIANTS:
  - Layout Rule: Priority is strictly top-down within individual columns.

Project:
Type: <!-- software / writing / production / manufacturing -->
Domain vocabulary: <!-- .playbook/vocabulary-[domain]/ -->
---

# Kanban

Optional. Use when the project has enough parallel work to benefit from a board.

---

## Backlog

<!-- Work that is defined but not yet started -->
<!-- Format:
- [ID] [title] — [one line description]
-->

---

## In Progress

<!-- Work that is actively being done — limit to what is actually active -->
<!-- Format:
- [ID] [title] — [who or what is working on it]
-->

---

## Blocked

<!-- Work that cannot proceed — must include what is blocking it -->
<!-- Format:
- [ID] [title] — Blocked by: [what]
-->

---

## Done

<!-- Completed work — archive older entries to _archives/ when the board gets heavy -->
<!-- Format:
- [ID] [title] — [date completed]
-->
