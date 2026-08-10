---
file: '.playbook/README.md'
responsibility: 'Orientation for anyone — human or AI — working on the Playbook pipeline repo itself (the CLI, the library, and the template source).'
ai_instructions: 'Read first in every session on this repo. This file describes THIS repo, not a project that consumes Playbook.'
archive_rule: 'N/A — core orientation file.'
---

This is the **Playbook pipeline repository** — the source for `create-playbook`,
`@bogsp/playbook-software-library`, and the template files those tools ship.
If you are looking for how to *use* Playbook in a project, read
[playbook/.playbook/README.md](../playbook/.playbook/README.md) instead — that is
the template a consuming project actually gets.

---

## Start Here

If you're new to working on this repo, read in this order:

1. This file — orientation
2. `.playbook/AI-INSTRUCTIONS.md` — rules for every AI session on this repo
3. `.playbook/_index.md` — the actual repo structure (packages, template source, kit)
4. `.playbook/kit/01-process.md` — where the repo work is right now
5. `.playbook/kit/04-progress.md` — what has been completed and decided

---

## Session Boot Order

Load these files at the start of every AI session on this repo, in order:

1. `.playbook/README.md` — this file
2. `.playbook/AI-INSTRUCTIONS.md` — session rules
3. `.playbook/_index.md` — repo map
4. `.playbook/kit/01-process.md` — current phase and active goal
5. `.playbook/kit/04-progress.md` — recent completions and decisions
6. `.playbook/kit/05-kanban.md` — active tickets (K-IDs)

Then load whatever is relevant to the task:

| Task | Also load |
|---|---|
| Editing the CLI | `packages/create-playbook/README.md`, the file(s) under `lib/` being touched |
| Editing the library | `packages/playbook-software-library/CONTRIBUTING.md` |
| Editing template source | the specific file under `playbook/.playbook/` or `playbook/docs/` being changed |
| Resolving an open decision | `.playbook/kit/02-exploration.md` and the relevant K-ticket in `05-kanban.md` |

---

## The Two Playbook Worlds — Do Not Confuse Them

| | `.playbook/` (this repo's own) | `playbook/.playbook/` (template source) |
|---|---|---|
| Governs | AI sessions working on *this repo* | Nothing directly — it's copied into other projects |
| Who reads it | Contributors to `create-playbook` / the library | A brand-new Playbook project, after scaffolding |
| Edited when | Repo planning changes (new ticket, phase, decision) | The *product* changes (a template, a guide, a rule) |
| Consequence of editing | Changes this repo's own working state | Changes what every future `create-playbook init` produces |

Editing `playbook/` is a product change and must go through `packages/create-playbook/build.js`
(`pnpm build` inside `packages/create-playbook/`) before it reaches `templates/`.
`templates/` itself is never hand-edited.

---

## How This Repo's Playbook Works

**Kit files track this repo's own state.** `.playbook/kit/` holds current phase,
open questions, active tasks, and the append-only history — same discipline as any
Playbook project, applied to this repo's own development.

**`playbook/` is the deliverable.** It is read-only from the perspective of "what
should I edit to fix my own workflow" — it's the output, not the tool.

**Nothing changes without a human deciding.** Same rule as every Playbook project:
AI flags ambiguity and waits, especially for anything that changes the shipped
templates or the CLI's public behavior.

---

## Folder Map

```
.playbook/          This repo's own planning — kit files, session rules, repo map
  kit/               Session state — updated every session
docs/                (N/A at root — see Detail below)
playbook/            Template source — the product being built
packages/            Publishable code — create-playbook, playbook-software-library
```

See `.playbook/_index.md` for the full structure.

---

## File Rules

- Every generated file includes the standardized frontmatter block (`file:`, `responsibility:`, `ai_instructions:`, `archive_rule:`) at the top
- Kit files are updated before every session ends or at 80% context — do not wait to be asked
- `packages/create-playbook/templates/` is a build artifact — never edit directly, run `pnpm build`
- `playbook/` changes are product changes — flag before making structural edits, same as any planning-document change
- No K-ticket closes without a corresponding entry in `.playbook/kit/04-progress.md`
