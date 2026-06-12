# AI Instructions
# File: .playbook/AI-INSTRUCTIONS.md

> Load this file at the start of every session.
> Read it. Then load additional files based on the task.

This file applies to every project, regardless of type. For rules specific to
your project type, see [vocabulary-[domain]/AI-INSTRUCTIONS.md](vocabulary-software/AI-INSTRUCTIONS.md).

---

## Core Principle

Everything in Playbook follows **Progressive Disclosure + Tiering**:

- Plain language first, technical depth below
- A required core for every document, with extra sections only when the
  project's scope demands them
- Never burden a simple project with complexity it doesn't need
- Never let a complex project skip what simpler ones must do

Apply this whenever you're deciding how much detail to include, or whether a
section is needed.

---

## Load Order

**Always load:**
1. [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md) — this file
2. [vocabulary-[domain]/AI-INSTRUCTIONS.md](vocabulary-software/AI-INSTRUCTIONS.md) — project-type rules
3. [_index.md](_index.md) — project map

**Load based on the task:**

| Task | Also load |
|---|---|
| Any coding task | [docs/code-standards.md](../docs/code-standards.md) _(if the project has one)_ |
| Mapping or rules work | [docs/flows/_index.md](../docs/flows/_index.md), [docs/contracts/_index.md](../docs/contracts/_index.md) |
| Specific module work | `[module]/_index.md` + relevant planning documents |
| Session work | [kit/](kit/) files as needed |
| Audit | [docs/rewrite/](../docs/rewrite/) files as they exist |

Confirm what you have loaded. Then wait for instruction.

---

## Document Format

Every planning document follows the same shape:

```
## What It Does    — plain language, any reader
## Interface       — what goes in, what comes out, what rules apply
## Detail          — edge cases and constraints only — omit if nothing fits
```

Two markers used throughout Playbook:

- **N/A** — this section was considered and does not apply
- **TODO** — not yet written; a document cannot move to `status: active` while
  any required section is TODO

---

## Behavioral Rules

1. Never write a planning document without first reading the relevant path
   and rules documents
2. Never begin work on a piece without its planning document
3. Never add an outside dependency without declaring it first
4. Never duplicate a responsibility that already exists
5. Always work against the declared interface in the planning document
6. Flag any `status: draft` document before working against it
7. Check `_shared/` before creating a new cross-module piece
8. Run a sync check before closing any task — do all touched planning
   documents reflect current work?
9. Confirm all touched documents are current before every milestone
10. Flag missing connections as `TODO`
11. Update the folder map in `_index.md` when pieces change
12. Paths and rules must be agreed on before any planning documents are written
13. Prefer built-in solutions over outside tools
14. Outside tools require explicit justification before adoption
15. Never advance an expansion phase without human review
16. Never write planning documents during the inventory, audit, or classify
    phases of the Audit expansion
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
- Add undeclared dependencies or pieces
- Resolve ambiguity silently with assumptions
- Duplicate a responsibility that already exists
- Leave any path through the work unhandled
- Make structural decisions without flagging them first
- Produce placeholder or incomplete work

---

## Session End

Before closing, do all of these:

1. Run a sync check — do all touched planning documents reflect current work?
2. Update [kit/04-progress.md](kit/04-progress.md) — completions, decisions, fixes
3. Update [kit/01-process.md](kit/01-process.md) — current phase and what is next
4. Update the folder map in `_index.md` if any pieces changed

---

## Expansions

Active expansions are declared in [kit/01-process.md](kit/01-process.md):

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
5. Log it — add a Fixed entry in [kit/04-progress.md](kit/04-progress.md)

If context drifts mid-session, re-read the uploaded files. If it persists,
start a fresh session using the most recent `docs/rollout/[milestone].md` as
context.
