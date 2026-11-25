---
file: '.playbook/_index.md'
responsibility: 'The single entry point for this project — what it is, strict AI session rules, human guide, project rules, and structure. Playbook rules live in rules.md. Read this file first, every session.'
ai_instructions: 'Read this file completely before doing anything else, every session, then follow AI Session Rules. Keep What This Project Is and Structure current.'
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

## AI Session Rules (Strict)

Apply these rules automatically whenever Playbook context is loaded or `.playbook/` is present.

1. **Boot & state check:** Read `rules.md`, then `kit/01-process.md`, then only what the current task needs (see **Where to Go Next**). If `01-process.md` has an `In flight:` line, resolve it first (C10). If base files are unavailable in this environment, ask for `rules.md` and `kit/01-process.md` once—otherwise confirm loaded state briefly and proceed.
2. **Get out of the way at start:** Do not stall the user with long checklists or rigid turn-1 gates. Let the user's prompt lead immediately.
3. **Assume the user will forget:** Do not rely on the user remembering to update kit files, plans, flows, or contracts. Whenever work produces a decision, scope shift, new flow, or rule/contract change, carry or propose the matching Playbook update automatically.
4. **Quiet, transparent guidance:** Never lecture or block flow. Keep guidance brief and always transparent—state plainly in a short note what was updated or which pipeline stage/kit file fits the cue.
5. **Progressive disclosure:** Default to `kit-only` for straightforward tasks. Surface deeper stages (`Discovery`, `Mapping`, `Rules`, `Planning`) only when ambiguity, risk, or multi-part scope warrants them.
6. **Agent orchestration standard:** Never compete with the user's agent runner or require paid services. When lead/worker (or lead/follower) agents are used in any domain, keep the user's orchestrator in charge and include a compact Playbook block in worker briefs (stage/mode, scope boundaries, governing rules, done criteria, and factual report).

---

## Human Guide (Using Playbook)

- **Starting a session:** Point your AI assistant to `.playbook/_index.md` (or work inside a repo containing `.playbook/`) and state what you want to build or change. You do not need to memorize pipeline commands or update kit files manually.
- **Modes:** `kit-only` (default) tracks work lightly in `.playbook/kit/`. Switch `pipeline-mode` to `full` when a project grows enough to benefit from stage-by-stage briefs, flows, contracts, and plans in `pipeline.md`.
- **Transparency:** Your assistant will briefly note any kit or stage updates it makes as you go so the project record stays current without slowing you down.

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

- **X1 (Terminal Protocol)** When executing terminal-driven workflows, adhere strictly to the Terminal Execution Protocol (`docs/terminal-protocol.md`): issue precise, deterministic commands, require explicit stdout/stderr feedback from the user, and never guess error states.

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
