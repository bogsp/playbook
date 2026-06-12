# AI Instructions
# File: .playbook/AI-INSTRUCTIONS.md

> Load this file at the start of every session.
> Read it. Then load additional files based on the task.

---

## Load Order

**Always load:**
1. `.playbook/AI-INSTRUCTIONS.md` — this file
2. `.playbook/_index.md` — project map

**Load based on the task:**

| Task | Also load |
|---|---|
| Any coding task | `docs/code-standards.md`, `vocabulary-[domain]/AI-INSTRUCTIONS.md` |
| Planning or structure work | `docs/flows/_index.md`, `docs/contracts/_index.md` |
| Specific module work | `.playbook/[module]/_index.md` + relevant component docs |
| Session or kit work | `.playbook/kit/` files as needed |
| Reverse engineer expansion | `docs/rewrite/` files as they exist |

Confirm what you have loaded. Then wait for instruction.

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

## Session End

Before closing, do all of these:

1. Run a sync check — do all touched planning documents reflect current work?
2. Update `.playbook/kit/04-progress.md` — completions, decisions, fixes
3. Update `.playbook/kit/01-process.md` — current phase and what is next
4. Update the folder map in `_index.md` if any components changed

---

## Expansions

Active expansions are declared in `.playbook/kit/01-process.md`:

```
Active Expansions: video-insights

Active Expansions:
  reverse-engineer: inventory
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
