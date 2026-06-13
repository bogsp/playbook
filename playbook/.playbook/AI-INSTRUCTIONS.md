# AI Instructions
# File: .playbook/AI-INSTRUCTIONS.md

> Load this file at the start of every session.
> Read it. Then load additional files based on the task.

---

## Session Load Order

Read these files at the start of every session, in this order:

1. `.playbook/README.md`
2. `.playbook/AI-INSTRUCTIONS.md` — this file
3. `docs/code-standards.md`
4. `.playbook/_index.md`
5. `.playbook/kit/01-process.md`
6. `.playbook/kit/04-progress.md`
7. `.playbook/kit/05-kanban.md` — if active

**Load based on the task:**

| Task | Also load |
|---|---|
| Any coding task | `vocabulary-[domain]/AI-INSTRUCTIONS.md` |
| Planning or structure work | `docs/flows/_index.md`, `docs/contracts/_index.md` |
| Specific module work | `.playbook/[module]/_index.md` + relevant component docs |
| Audit expansion | `docs/rewrite/` files as they exist |

Confirm what you have loaded. Then wait for instruction.

---

## Session End

Update these two files before the session ends or when context reaches 80% — do not wait to be asked:

1. `.playbook/kit/01-process.md` — current phase and what is next
2. `.playbook/kit/04-progress.md` — completions, decisions, fixes

Then:

3. Run a sync check — do all touched planning documents reflect current work?
4. Update the folder map in `_index.md` if any components changed

---

## Behavioral Rules

1. Never write a planning document without first reading the relevant flow and contract files
2. Never begin work on a component without its planning document
3. Never add an outside dependency without declaring it first
4. Never duplicate a responsibility that already exists
5. Always work against the declared interface in the planning document
6. Flag any `status: draft` document before working against it
7. Check the `_shared/` folder before creating a new cross-module component
8. Run a sync check before closing any task — do all touched planning documents reflect current work?
9. Confirm all touched documents are current before every milestone
10. Flag missing connections as `TODO`
11. Update the folder map in `_index.md` when components change
12. Flow and contract files must be agreed on before any planning documents are written
13. Prefer built-in solutions over outside tools
14. Outside tools require explicit justification before adoption
15. Never move to the next expansion phase without human review
16. Never write planning documents during inventory, audit, or classify phases
17. Stop and flag before doing any work when a requirement is unclear

---

## When Something Is Unclear

Stop all work. Flag using this format:

```
[FLAG] Category: description
       Options: (if applicable)
       Blocking: what cannot move forward until this is resolved
```

Categories: `underspecified` | `missing-contract` | `undeclared-dependency` | `architectural-decision` | `ambiguous-behavior`

---

## Never Do These

- Start work ahead of a planning document
- Add undeclared dependencies or components
- Resolve ambiguity silently with assumptions
- Duplicate a responsibility that already exists
- Leave any path through the work unhandled
- Make structural decisions without flagging them first
- Produce placeholder or incomplete work

---

## Expansions

Active expansions are declared in `.playbook/kit/01-process.md`:

```
Active Expansions: video-insights

Active Expansions:
  audit: inventory
```

Expansion phases advance only after human review. Never advance autonomously.

---

## When Something Breaks

1. Name it — what broke and what kind of problem it is
2. Isolate it — is it in the work, the planning document, or both?
3. Fix the source — do not patch the symptom
4. Verify — confirm the fix holds before continuing
5. Log it — add a Fixed entry in `.playbook/kit/04-progress.md`

If context drifts mid-session — re-read the uploaded files. If it persists, start a fresh session using the most recent `docs/rollout/[milestone].md` as context.
