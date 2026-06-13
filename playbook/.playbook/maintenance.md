# Maintenance
# File: .playbook/maintenance.md

Playbook files get heavy over time. This guide explains how to keep them lean without losing anything important.

---

## The Rule

Nothing is deleted. Everything is either active or archived.

Active files hold what is current. Archives hold the history. When something is no longer needed for day-to-day work, it moves — it does not disappear.

---

## What to Archive and When

| File | Archive when |
|---|---|
| [02-exploration.md](kit/02-exploration.md) decisions | A settled decision no longer affects any active task |
| [04-progress.md](kit/04-progress.md) entries | Entries are from a completed phase |
| [05-kanban.md](kit/05-kanban.md) tickets | Done tickets are no longer referenced by anything active |
| Planning documents | A component is retired or replaced |
| Flow and contract files | A path no longer exists in the project |

---

## How to Archive

1. Cut the content from the active file
2. Paste it into a new file in `.playbook/kit/_archives/`
3. Name it clearly — `decisions-[phase]-[date].md`, `progress-phase-2.md`, etc.
4. Add a one-line note in the active file where the content was: `Archived to _archives/[filename].md`

---

## Signs a File Needs Attention

- [04-progress.md](kit/04-progress.md) is so long it takes time to scroll to the bottom
- [02-exploration.md](kit/02-exploration.md) has decisions that nobody references anymore
- [03-execution.md](kit/03-execution.md) has tasks that have been done for weeks
- A planning document describes something that was rewritten or removed

When you notice these, archive before the next session — not during it.

---

## Planning Documents

A planning document stays active as long as the component it describes is active. When a component is retired:

1. Mark the document `status: archived`
2. Move it to `_archives/` within its module folder
3. Update the folder map in `_index.md`

---

## _index.md

The folder map in `_index.md` must reflect the actual structure at all times. If a component is added, moved, or archived, update the map in the same session. A stale map is worse than no map.
