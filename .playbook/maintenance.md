---
file: ".playbook/maintenance.md"
responsibility: "How this repo keeps its own kit files lean, and frontmatter standards for files in this repo."
ai_instructions: "Read when archiving kit content or checking frontmatter requirements for root .playbook/ files."
archive_rule: "N/A — core reference file."
---

# Maintenance — This Repo

This repo runs its own kit files under the same discipline it prescribes for every Playbook project. This file covers archiving and frontmatter rules for files at the repo root.

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

---

## How to Archive

1. Cut the content from the active file.
2. Paste it into a new file in `.playbook/kit/_archives/`.
3. Name it clearly — `decisions-[phase]-[date].md`, `progress-phase-2.md`, etc.
4. Add a one-line note in the active file where the content was: `Archived to _archives/[filename].md`.

---

## Frontmatter Standard

Root `.playbook/` kit files (`01`–`06`), `_index.md`, `maintenance.md`, `pipeline.md`, and `rules.md` use the standard 4-field purpose block:

```yaml
---
file: ".playbook/maintenance.md"
responsibility: "Description of what this file does."
ai_instructions: "Directives for AI handling this file."
archive_rule: "N/A or rule governing when content moves."
---
```

Planning documents in `playbook/.playbook/` use the interface card header block per D-21.
