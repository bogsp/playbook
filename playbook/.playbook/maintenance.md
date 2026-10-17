---
file: '.playbook/maintenance.md'
responsibility: 'How the pipeline cleans up after itself: what to tidy as each stage closes, how to archive without losing anything, how to keep project identity current, and the frontmatter shape every Playbook file carries — canonical, ships to every scaffolded project.'
ai_instructions: 'Read when closing a stage, archiving content, updating the project identity files, or when unsure what frontmatter shape a new or edited file should carry. Kit-file budgets and roll-over live in kit/00-guide.md.'
archive_rule: 'N/A — core reference file.'
owner: playbook
---

# Maintenance

Playbook files get heavy over time, and a pipeline that leaves its own clutter behind stops being used. This guide is the cleanup half of the pipeline: what to tidy as each stage closes, how to archive without losing anything, how to keep a project's identity current, and the frontmatter shape every file in a Playbook project carries. Kit-file budgets and the roll-over procedure are in [kit/00-guide.md](kit/00-guide.md).

---

## The Rule

Nothing is deleted. Everything is either active or archived.

Active files hold what is current. Archives hold the history. When something is no longer needed for day-to-day work, it moves — it does not disappear.

---

## Close Out Each Stage

Cleanup is part of finishing, not a separate chore. Before moving on, tidy what the stage just produced. The close-out line for each stage is also in [pipeline.md](pipeline.md); the detail is in the sections below.

| Stage | Before moving on |
| --- | --- |
| 0 — Audit | Findings are in `02-exploration.md` and `03-execution.md`. Superseded inventory notes in `docs/rewrite/` are archived. The system map, decision record, and risk register stay active until the rewrite they describe is done. |
| 1 — Thinking | At the end of every session: budgets checked, anything over rolled over to `_archives/` (see [kit/00-guide.md](kit/00-guide.md)). |
| 2 — Discovery | The brief is approved and is the only live version. Earlier drafts are archived. |
| 3 — Mapping | `docs/flows/_index.md` lists every flow. A path that no longer exists is archived, with a pointer left behind. |
| 4 — Rules | Every contract maps to a flow. No section is marked `TODO`. Superseded rule versions are archived. |
| 5 — Planning | The project map in `_index.md` matches the filesystem. Retired components are archived (see Planning Documents). No section is marked `TODO` on an approved document. |
| 6 — Work | Plan and work agree (sync check). Done tasks in `03-execution.md` and Done tickets in `05-kanban.md` are rolled over. Fixed issues are closed. |
| 7 — Handoff | The snapshot in `docs/rollout/` is generated. Kit files reflect the final state. The finished phase is archived from `03-execution.md` and `04-progress.md`. |

---

## What to Archive and When

| File | Archive when |
|---|---|
| [02-exploration.md](kit/02-exploration.md) decisions | A settled decision no longer affects any active task (kit thresholds: [kit/00-guide.md](kit/00-guide.md)) |
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

- A kit file is over its budget (see [kit/00-guide.md](kit/00-guide.md))
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

## The Project Map

The project map in `_index.md` (its **Structure** section, and the registry once it exists) must reflect the actual structure at all times. If a component is added, moved, or archived, update the map in the same session. A stale map is worse than no map.

---

## Keep Project Identity Current

Three files make a generic Playbook scaffold into _this_ project's Playbook. Update them in the same session the project changes, not at a milestone.

| File | Carries | Owner |
| --- | --- | --- |
| `README.md` (project root) | Human-facing readme — what a person browsing the repo needs, not Playbook mechanics. Points to `.playbook/README.md` as the Playbook entry. | project |
| `.playbook/README.md` | The Playbook entry for people — how the project is worked with. Same in every project. | Playbook |
| `.playbook/_index.md` | The entry point every AI session starts with — what the project is, session start, project rules, structure, planning documents | project |

They ship generic. `_index.md` should not stay generic past Discovery. The root `README.md` should reflect the actual project as soon as there is something to say about it.

**When to customize**

| Trigger | What to update |
| --- | --- |
| Scaffold complete, Discovery starting | `_index.md` — fill in **What This Project Is** |
| Discovery approved | `_index.md` — confirm scope matches the brief in `docs/[name].md`; root `README.md` — fill in Getting Started once there is something to run |
| Any module, component, or concern added, moved, or archived | `_index.md` — **Structure** section (the registry, once it exists) |
| A project-specific rule is needed (a domain constraint, a non-negotiable) | `_index.md` — **Project Rules**, append `X1`, `X2`, …, never replace |
| Project layout no longer matches the generic Folder Map | `_index.md` — **Structure** section |

**What changes vs. what stays fixed**

| Stays fixed | Customized per project |
| --- | --- |
| Frontmatter block shape (`file:`, `responsibility:`, `ai_instructions:`, `archive_rule:`) | `_index.md` → **What This Project Is**, **Structure**, **Project Planning Documents**, **Project Rules** |
| Session Start order in `_index.md` | root `README.md` → whatever a human visitor needs to know |
| The Core (C), Dependencies (D), and Pipeline (P) rules in `rules.md`, and their IDs (`C1`, `P3`, … — stable, never renumbered) | — |
| Expansion mechanics (declared in `kit/01-process.md`) | — |

Core rules are never removed or reworded to fit a project. If a core rule seems wrong for this project, flag it — don't edit around it.

**The process**

*`_index.md`:*

1. Replace `[project-name]` and the placeholder paragraph under **What This Project Is** with the actual one-paragraph description — plain language, matches the Discovery brief once one exists.
2. Keep **Structure** current — add, move, or archive entries the same session the filesystem changes.
3. Add each new planning document to **Project Planning Documents** in top-down order as it is authored.
4. If a project-specific behavioral rule is needed, append it under **Project Rules** as the next `X` rule — never edit or interleave with the rules in `rules.md`.

*Root `README.md`:*

1. Replace `[Project Name]` and the placeholder paragraph with the real project description — this is for a human reading the repo, not an AI session.
2. Fill in **Getting Started** with the project's actual setup steps once they exist.
3. Leave the pointer to `.playbook/README.md` in place — it is how a person finds the Playbook entry.

**Rules**

- Never remove a Playbook rule from `rules.md` to make room for a project-specific one.
- Never edit the frontmatter block shape — only its field values.
- A stale **Structure** section is worse than an empty one — update it before closing any session that touched the filesystem.
- If a project-specific rule would contradict a Playbook rule, flag it as `architectural-decision` per the escalation format in `rules.md` — don't resolve it silently.
- The root `README.md` never carries Playbook session mechanics. Those belong in `.playbook/README.md` for people and in `_index.md` and `rules.md` for the AI.

---

## Frontmatter Tiering

Every file in a Playbook project — kit files, flows, contracts, guides, this file itself, and planning documents — carries frontmatter. Which shape it carries depends on its tier. This is the canonical definition; `_index.md` points here rather than restating it.

**Tier 1 — DDA / planning documents** (`structure`, `coordinator`/`sequencer`, `component`, `concern`, `integration`, and any domain-specific counterpart such as manufacturing's `part`):

- Deep-module header: `MODULE_ID`, `SYSTEM_CONTEXT`, `UPSTREAM_DEPENDENCIES`, `DOWNSTREAM_IMPACT`, `CORE_SYSTEM_INVARIANTS`
- Four-field purpose block: `file`, `responsibility`, `ai_instructions`, `archive_rule`
- Type-specific tracking fields: `id`, `type`, `status`, and whatever else that document type declares (`parent`, `connects`, `emits`, `concerns`, `used-by`, `config`, `docs`, etc.)

The deep-module header is Tier-1-only. It exists to protect AI-generated code against unseen upstream/downstream impact — a risk specific to documents that gate implementation. Kit files, flows, and guides don't gate code the same way, so they don't carry it.

**Tier 2 — everything else** (kit files, flow and contract documents, guides, `_index.md`, `README.md`, and other planning-adjacent docs):

- Four-field purpose block: `file`, `responsibility`, `ai_instructions`, `archive_rule` — mandatory, never dropped
- Plus any tracking fields already established for that specific doc type (flows/contracts keep `id`, `type`, `scope`, `trigger`, `status`, `calls`, `emits`, `called-by`; concerns/integrations keep `id`, `type`, `status`, `affects` or `used-by`, etc.)

The four-field block is the floor for every file regardless of tier. It's what keeps documents with adjacent purposes — `02-exploration.md` vs `03-execution.md` vs `04-progress.md` — from drifting into each other's job.

**When to update frontmatter:**

- Update a file's frontmatter in the same pass you touch that file for any other reason — don't defer it.
- If a phase of work leaves some files untouched, bring their frontmatter into line together at the end of that phase, rather than one at a time later.
- Never invent a third tier or a one-off frontmatter shape. If a file doesn't fit either tier cleanly, flag it — don't guess.
