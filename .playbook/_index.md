---
file: '.playbook/_index.md'
responsibility: 'The single entry point for this project — what it is, how a session starts, the project rules, and where things are. Playbook rules live in rules.md. Read this file first, every session.'
ai_instructions: 'Read this file completely before doing anything else, every session, then follow Session Start. Keep What This Project Is and Structure current.'
archive_rule: 'N/A — living document, kept current at all times.'
owner: project
id: playbook
type: structure
scope: project
status: active
review-gate: balanced
pipeline-mode: kit-only
contains: []
concerns: []
integrations: []
---

# Playbook — Project Entry

## What This Project Is

Playbook is the premier framework for AI-assisted project management—transforming chaotic chats into self-governing, structured execution via lightweight markdown kits, strict execution rules, and domain-specific ZIP distributions hosted through a static GitHub Pages landing page.

---

## Session Start

Read this file first, every session. It is the only file you need to be given; it tells you what to load next.

1. **Check what you can do.** Can you open files by path (a linked repo, a folder, or file tools)?
2. **If you can,** read `rules.md`, then `kit/01-process.md`, then whatever the task needs (see **Where to Go Next**). If `01-process.md` has an `In flight:` line, resolve it first (C10).
3. **If you cannot,** do not guess and do not start work. Reply once with the base files you need — `rules.md` (the rules) and `kit/01-process.md` (where the project stands) — and ask what the person is working on. Pasted text works as well as attachments.
4. **After the base files are loaded,** ask for any task-specific files in one batch, never one at a time.
5. **If a file is missing,** say what is missing, flag any assumption, and do not continue on it as if you had it.
6. **Confirm** what you actually loaded, the current phase, and the next step. Then wait for instruction.

Until `rules.md` is loaded: do no project work, flag anything unclear, and say what you have loaded.

**Starting fresh:** fill in **What This Project Is** above. If `pipeline-mode` is `kit-only` (the default), that is all you need — start working, tracked through the kit files. If it is `full`, work through pipeline.md stage by stage.

---

## Where to Go Next

Load only what the task needs.

| If the task is... | Load |
|---|---|
| Resuming | `kit/01-process.md`, then `kit/04-progress.md` (recent entries) and `kit/05-kanban.md` if the project uses one |
| An open question or decision | `kit/02-exploration.md` |
| Active execution work | `kit/03-execution.md` |
| CLI / Terminal-driven execution | `docs/terminal-protocol.md` |
| Ticket detail or testing and sign-off | `kit/05-kanban.md`, `kit/06-qa.md` |
| Adding a piece | its place in Structure below, then the template it needs: templates/ (universal) or the domain pack's templates |
| Domain vocabulary or domain rules | vocabulary-[domain]/_index.md, only when the work touches that domain |
| A concern or integration | its planning document, only when the unit being worked on declares it |

---

## Project Rules

Rules specific to this project, appended as `X1`, `X2`, … and never edited into the Playbook rules in `rules.md`.

_None yet._

---

## Structure

The project's own modules and planning documents, kept current in the same session they change. The generic Playbook folder layout is in the Folder Map in pipeline.md.

- `.playbook/`          # Core framework kit and rules
- `docs/`               # Static landing page (GitHub Pages), downloads, and protocol guides
- `packages/`           # CLI scaffolding package (create-playbook) and libraries

## Project Planning Documents

- `_index.md` — this file

## Detail

Maintains a static GitHub Pages landing page (`docs/index.html`) offering direct ZIP downloads for Software, Writing, Production, Manufacturing, and Universal domain kits, alongside a CLI scaffolding tool (`create-playbook`) and terminal execution protocol guides (`docs/terminal-protocol.md`).
