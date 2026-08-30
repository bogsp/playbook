---
file: '.playbook/guides/project-identity.md'
responsibility: 'How and when to keep _index.md and README.md current for the specific project — turning a generic scaffold into this project'"'"'s Playbook.'
ai_instructions: 'Load when _index.md or README.md need to be brought up to date with the actual project — at scaffold time, after Discovery, or whenever project structure changes.'
archive_rule: 'N/A — orientation guide.'
---

# Project Identity Guide

Use this guide whenever `.playbook/_index.md` or `.playbook/README.md` need to
be brought up to date with the actual project — at scaffold time, after
Discovery, or any time the project's structure changes.

---

## What These Files Are

Two files carry the project's identity — they're what makes a generic
Playbook scaffold into _this_ project's Playbook:

| File                   | Carries                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `.playbook/_index.md`  | The entry point every AI session starts with — what the project is, session rules, folder structure, planning documents |
| `.playbook/README.md`  | Human-facing project readme — what a person browsing the repo needs, not Playbook mechanics                |

They ship generic. `_index.md` should not stay generic past Discovery.
`README.md` should reflect the actual project as soon as there's something to say about it.

---

## When to Customize

| Trigger                                                                        | What to update                                                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Scaffold complete, Discovery starting                                          | `_index.md` — fill in **What This Project Is**                                  |
| Discovery approved                                                             | `_index.md` — confirm scope matches the brief in `docs/[name].md`; `README.md` — fill in Getting Started once there's something to run |
| Any module, component, or concern added, moved, or archived                    | `_index.md` — **Structure** section                                             |
| A project-specific rule is needed (e.g. a domain constraint, a non-negotiable) | `_index.md` — **AI Behavioral Rules** section, append, never replace            |
| Project layout no longer matches the generic Folder Map                       | `_index.md` — Structure section                                                 |

Do not wait for a milestone to do this. Update the relevant file in the same
session the change happens.

---

## What Changes vs. What Stays Fixed

| Stays fixed                                                                               | Customized per project                                                                |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Frontmatter block shape (`file:`, `responsibility:`, `ai_instructions:`, `archive_rule:`) | `_index.md` → **What This Project Is**, **Structure**, **Project Planning Documents** |
| Session Start order in `_index.md`                                                        | `_index.md` → project-specific rules appended under **AI Behavioral Rules**            |
| The numbered AI Behavioral Rules 1–19 in `_index.md`                                       | `README.md` → whatever a human visitor to this project actually needs to know          |
| "Never Do These" list                                                                     | —                                                                                       |
| Expansion mechanics (declared in `kit/01-process.md`)                                     | —                                                                                       |

Core rules are never removed or reworded to fit a project. If a core rule
seems wrong for this project, flag it — don't edit around it.

---

## The Process

**`_index.md`:**

1. Replace `[project-name]` and the placeholder paragraph under **What This Project Is** with the actual one-paragraph description — plain language, matches the Discovery brief once one exists.
2. Keep **Structure** current — add, move, or archive entries the same session the filesystem changes.
3. Add each new planning document to **Project Planning Documents** in top-down order as it's authored.
4. If a project-specific behavioral rule is needed, append it under **AI Behavioral Rules** as a new numbered item — don't renumber or interleave with the universal 1–19.

**`README.md`:**

1. Replace `[Project Name]` and the placeholder paragraph with the real project description — this is for a human reading the repo, not an AI session.
2. Fill in **Getting Started** with the project's actual setup steps once they exist.
3. Leave the pointer line to `.playbook/_index.md` in place — it's how a human contributor finds the AI-facing rules if they need them.

---

## Rules

- Never remove a universal rule from `_index.md` to make room for a project-specific one.
- Never edit the frontmatter block shape — only its field values.
- A stale `_index.md` Structure section is worse than an empty one — update it before closing any session that touched the filesystem.
- If a project-specific rule would contradict a universal one in `_index.md`, flag it as `architectural-decision` per the escalation format in that file — don't resolve it silently.
- `README.md` never carries Playbook session mechanics — that's `_index.md`'s job. If you find yourself writing AI instructions into `README.md`, they belong in `_index.md` instead.

---

## Reference

- Session rules and project map — [\_index.md](../_index.md)
- Starting a new project — [new-project.md](new-project.md)
- Adopting an existing project — [adopt.md](adopt.md)
- Auditing an existing project — [audit.md](audit.md)
