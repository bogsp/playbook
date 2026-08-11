---
file: '.playbook/guides/project-identity.md'
responsibility: 'How and when to keep README.md, AI-INSTRUCTIONS.md, and _index.md current for the specific project — turning a generic scaffold into this project'"'"'s Playbook.'
ai_instructions: 'Load when README.md, AI-INSTRUCTIONS.md, or _index.md need to be brought up to date with the actual project — at scaffold time, after Discovery, or whenever project structure changes.'
archive_rule: 'N/A — orientation guide.'
---

# Project Identity Guide

Use this guide whenever `.playbook/README.md`, `.playbook/AI-INSTRUCTIONS.md`, or
`.playbook/_index.md` need to be brought up to date with the actual project —
at scaffold time, after Discovery, or any time the project's structure changes.

---

## What These Files Are

Three files carry the project's identity — they're what makes a generic
Playbook scaffold into _this_ project's Playbook:

| File                           | Carries                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| `.playbook/_index.md`          | What the project is, its folder structure, its planning documents |
| `.playbook/README.md`          | Orientation — where a new session starts, in what order           |
| `.playbook/AI-INSTRUCTIONS.md` | Session rules — universal ones plus any this project adds         |

They ship generic. They should not stay generic past Discovery.

---

## When to Customize

| Trigger                                                                        | What to update                                                    |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Scaffold complete, Discovery starting                                          | `_index.md` — fill in **What This Project Is**                    |
| Discovery approved                                                             | `_index.md` — confirm scope matches the brief in `docs/[name].md` |
| Any module, component, or concern added, moved, or archived                    | `_index.md` — **Structure** section                               |
| A project-specific rule is needed (e.g. a domain constraint, a non-negotiable) | `AI-INSTRUCTIONS.md` — append, never replace                      |
| Project layout no longer matches the generic Folder Map                        | `README.md` — Folder Map section                                  |

Do not wait for a milestone to do this. Update the relevant file in the same
session the change happens — same rule as `_index.md`'s folder map in general.

---

## What Changes vs. What Stays Fixed

| Stays fixed                                                                               | Customized per project                                                                |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Frontmatter block shape (`file:`, `responsibility:`, `ai_instructions:`, `archive_rule:`) | `_index.md` → **What This Project Is**, **Structure**, **Project Planning Documents** |
| Session Boot Order / Load Order structure                                                 | `AI-INSTRUCTIONS.md` → project-specific rules appended under **Behavioral Rules**     |
| Core Behavioral Rules (1–17 in the universal file)                                        | `README.md` → **Folder Map**, if the project's actual layout diverges                 |
| "Never Do These" list                                                                     | —                                                                                     |
| Expansion mechanics (declared in `kit/01-process.md`)                                     | —                                                                                     |

Core rules are never removed or reworded to fit a project. If a core rule
seems wrong for this project, flag it — don't edit around it.

---

## The Process

**`_index.md`:**

1. Replace `[project-name]` and the placeholder paragraph under **What This Project Is** with the actual one-paragraph description — plain language, matches the Discovery brief once one exists.
2. Keep **Structure** current — add, move, or archive entries the same session the filesystem changes.
3. Add each new planning document to **Project Planning Documents** in top-down order as it's authored.

**`README.md`:**

1. Leave **Start Here**, **Session Boot Order**, and **File Rules** as-is — they're universal.
2. Update **Folder Map** only if the project's real structure has diverged from the generic one (e.g. an expansion added `docs/rewrite/`, a vocabulary folder was added).

**`AI-INSTRUCTIONS.md`:**

1. Leave **Session Load Order**, the numbered **Behavioral Rules**, and **Never Do These** untouched.
2. Append project-specific rules as new numbered items — don't renumber or interleave with the universal set.
3. If a project-specific rule would contradict a universal one, flag it as `architectural-decision` per the escalation format in this file — don't resolve it silently.

---

## Rules

- Never remove a universal rule to make room for a project-specific one.
- Never edit the frontmatter block shape — only its field values.
- A stale `_index.md` Structure section is worse than an empty one — update it before closing any session that touched the filesystem.
- If unsure whether something belongs in `_index.md`, `README.md`, or `AI-INSTRUCTIONS.md`, check the table above before guessing.

---

## Reference

- Universal rules — [AI-INSTRUCTIONS.md](../AI-INSTRUCTIONS.md)
- Project map — [\_index.md](../_index.md)
- Starting a new project — [new-project.md](new-project.md)
- Adopting an existing project — [adopt.md](adopt.md)
- Auditing an existing project — [audit.md](audit.md)
