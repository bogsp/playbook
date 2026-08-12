---
file: '.playbook/maintenance.md'
responsibility: 'How to keep Playbook files lean over time, and the frontmatter shape every file in a Playbook project carries — canonical definition, ships to every scaffolded project.'
ai_instructions: 'Read when archiving content, or when unsure what frontmatter shape a new or edited file should carry. AI-INSTRUCTIONS.md points here for the frontmatter rule rather than restating it.'
archive_rule: 'N/A — core reference file.'
---

# Maintenance

Playbook files get heavy over time. This guide explains how to keep them lean without losing anything important, and defines the frontmatter shape every file in a Playbook project follows.

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

---

## Frontmatter Tiering

Every file in a Playbook project — kit files, flows, contracts, guides, READMEs, indexes, and planning documents — carries frontmatter. Which shape it carries depends on its tier. This is the canonical definition; `AI-INSTRUCTIONS.md` points here rather than restating it.

**Tier 1 — DDA / planning documents** (`structure`, `coordinator`/`sequencer`, `component`, `concern`, `integration`, and any domain-specific counterpart such as manufacturing's `part`):

- Deep-module header: `MODULE_ID`, `SYSTEM_CONTEXT`, `UPSTREAM_DEPENDENCIES`, `DOWNSTREAM_IMPACT`, `CORE_SYSTEM_INVARIANTS`
- Four-field purpose block: `file`, `responsibility`, `ai_instructions`, `archive_rule`
- Type-specific tracking fields: `id`, `type`, `status`, and whatever else that document type declares (`parent`, `connects`, `emits`, `concerns`, `used-by`, `config`, `docs`, etc.)

The deep-module header is Tier-1-only. It exists to protect AI-generated code against unseen upstream/downstream impact — a risk specific to documents that gate implementation. Kit files, flows, and guides don't gate code the same way, so they don't carry it.

**Tier 2 — everything else** (kit files, flow and contract documents, guides, `README.md`, `AI-INSTRUCTIONS.md`, `_index.md`, and other planning-adjacent docs):

- Four-field purpose block: `file`, `responsibility`, `ai_instructions`, `archive_rule` — mandatory, never dropped
- Plus any tracking fields already established for that specific doc type (flows/contracts keep `id`, `type`, `scope`, `trigger`, `status`, `calls`, `emits`, `called-by`; concerns/integrations keep `id`, `type`, `status`, `affects` or `used-by`, etc.)

The four-field block is the floor for every file regardless of tier. It's what keeps documents with adjacent purposes — `02-exploration.md` vs `03-execution.md` vs `04-progress.md` — from drifting into each other's job.

**When to update frontmatter:**

- Update a file's frontmatter in the same pass you touch that file for any other reason — don't defer it.
- If a phase of work leaves some files untouched, bring their frontmatter into line together at the end of that phase, rather than one at a time later.
- Never invent a third tier or a one-off frontmatter shape. If a file doesn't fit either tier cleanly, flag it — don't guess.
