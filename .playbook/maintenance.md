---
file: '.playbook/maintenance.md'
responsibility: 'How this repo keeps its own kit files lean, and how the Frontmatter Tiering Rule (canonically defined in playbook/.playbook/maintenance.md) applies to this repo's own files.'
ai_instructions: 'Read when archiving this repo's kit content, or when unsure what frontmatter shape a file in root .playbook/ should carry. _index.md points here rather than restating the rule.'
archive_rule: 'N/A — core reference file.'
---

# Maintenance — This Repo

This repo runs its own kit files under the same discipline it prescribes for every Playbook project. This file covers archiving; for the frontmatter shape itself, see below.

---

## The Rule

Nothing is deleted. Everything is either active or archived.

Active files hold what is current. Archives hold the history. When something is no longer needed for day-to-day work, it moves — it does not disappear.

---

## What to Archive and When

| File | Archive when |
|---|---|
| [kit/02-exploration.md](kit/02-exploration.md) decisions | A settled decision no longer gates any open K-ticket |
| [kit/04-progress.md](kit/04-progress.md) entries | Entries belong to a completed phase |
| [kit/05-kanban.md](kit/05-kanban.md) tickets | Done tickets are no longer referenced by anything active |

This repo has no `.playbook/_concerns/`, `_integrations/`, `_shared/`, or planning documents of its own — those live inside `playbook/.playbook/` (template source) and `packages/playbook-software-library/` (published library). There is nothing to archive under "Planning Documents" or component folder-map rules at the root; that section of the canonical `maintenance.md` doesn't apply here.

---

## How to Archive

1. Cut the content from the active file
2. Paste it into a new file in `.playbook/kit/_archives/`
3. Name it clearly — `decisions-[phase]-[date].md`, `progress-phase-2.md`, etc.
4. Add a one-line note in the active file where the content was: `Archived to _archives/[filename].md`

---

## Signs a File Needs Attention

- `kit/04-progress.md` is so long it takes time to scroll to the bottom
- `kit/02-exploration.md` has decisions no open K-ticket references anymore
- `kit/03-execution.md` has tasks that have been done for weeks

When you notice these, archive before the next session — not during it.

---

## _index.md

`.playbook/_index.md`'s Structure section must reflect the actual repo layout at all times. If a package, template file, or kit file is added, moved, or removed, update the map in the same session. A stale map is worse than no map.

---

## Frontmatter Tiering — Applied to This Repo

The Frontmatter Tiering Rule is canonically defined in `playbook/.playbook/maintenance.md` — it's shipped-template material, since it governs every future Playbook project, not just this one. This section states how it lands on root `.playbook/` specifically.

**Tier 1 doesn't apply at the repo root.** Root `.playbook/` carries no planning documents (`structure`, `coordinator`, `component`, `concern`, `integration`) of its own — only kit files and `_index.md`, per `_index.md`'s own Detail note. The deep-module header (`MODULE_ID`, `SYSTEM_CONTEXT`, etc.) has nothing to attach to here. Tier 1 is exercised inside `playbook/.playbook/` (template source) and `packages/playbook-software-library/` (the published library), where real planning documents live.

**Tier 2 applies to every file directly under `.playbook/`** — `_index.md`, `maintenance.md` (this file), and all six `kit/*.md` files. Each carries the four-field purpose block (`file`, `responsibility`, `ai_instructions`, `archive_rule`) as a mandatory floor, plus no additional tracking fields — this repo's kit files don't need `id`/`type`/`status` the way a flow or contract does, since they aren't referenced by ID anywhere.

**When to update:** same rule as the canonical version — update a file's frontmatter in the same pass it's otherwise touched; if a phase leaves files untouched, bring them into line together at the end of that phase (see `.playbook/kit/01-process.md` for the current phase's outstanding items).
