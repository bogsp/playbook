# AI Instructions
# File: .playbook/AI-INSTRUCTIONS.md

> Load this file at the start of every AI session.
> Then load your domain file: `vocabulary-[domain]/AI-INSTRUCTIONS.md`
> This file covers universal rules. The domain file covers project-specific ones.

---

## Session Start

Load in this order:
1. `.playbook/AI-INSTRUCTIONS.md` ← this file
2. `vocabulary-[domain]/AI-INSTRUCTIONS.md` ← domain rules
3. `docs/flows/_index.md`
4. `docs/contracts/_index.md`
5. `.playbook/_index.md`
6. Module and component docs as needed

Confirm understanding. Then wait for instruction.

---

## Session End

Before closing:
1. Check sync — do all touched planning documents reflect the current state of work?
2. Update `.kit/04-progress.md` — completions, decisions, fixes
3. Update `.kit/01-process.md` — current phase and what is next
4. Update the folder map if any pieces changed

---

## Core Principle

Progressive Disclosure + Tiering:
- Lead with plain language. Add depth below.
- Define what is always required. Add sections only when the project demands them.
- Never make a simple project carry the weight of a complex one.
- Never let a complex project skip what a simple one must do.

Apply this to every structural decision.

---

## Behavioural Rules

1. Never write a planning document without first reading the relevant path and rules files
2. Never begin work on a piece without its planning document
3. Never add an outside dependency without declaring it first
4. Never duplicate a responsibility that already exists
5. Always work against the declared interface in the planning document
6. Flag any `status: draft` document before working against it
7. Suggest the shared folder when a piece appears in multiple sections
8. Check sync before closing any task
9. Confirm all touched documents are current before every milestone
10. Check the shared folder before creating a new section-level piece
11. Flag missing connections as `TODO`
12. Update the folder map when pieces change
13. Paths and rules must be agreed on before any planning documents are written
14. Apply Progressive Disclosure + Tiering to every structural decision
15. Prefer built-in solutions over outside tools
16. Outside tools require a clear reason before being added
17. Never move to the next audit phase without human review
18. Never write planning documents during the inventory, audit, or classify phases
19. Stop and flag before doing any work when a requirement is unclear

---

## When Something Is Unclear

Stop all work and flag when any of the following occur:

- A requirement is unclear or not fully defined
- A path is not described in the planning document or rules
- An outside tool is needed but has not been declared
- A decision would affect more than the current piece
- The right answer cannot be determined without making assumptions

**Flag format:**
```
[FLAG] Category: description
       Options: (if applicable)
       Blocking: what cannot move forward until this is resolved
```

**Categories:** `underspecified` | `missing-rules` | `undeclared-dependency` | `structural-decision` | `ambiguous-behaviour`

---

## What Not To Do

- Start work ahead of a planning document
- Add undeclared tools or pieces
- Quietly resolve an unclear situation with assumptions
- Duplicate a piece that already exists
- Leave any path through the work unhandled
- Make structural decisions without flagging them first
- Produce placeholder or incomplete work — every path must be handled explicitly

---

## Expansions

Declare active expansions in `.kit/01-process.md`:

```
Active Expansions: video-insights

Active Expansions:
  reverse-engineer: inventory
```

**Audit expansion phases:** `inventory` → `audit` → `classify` → `risk-map` → `gap-report` → `handoff`

Rules:
- Never move to the next phase without human review and approval
- Never write planning documents during inventory, audit, or classify phases
- The handoff step must feed back into the session files before the expansion is marked complete

---

## When Something Breaks

Stop all other work.

1. **Name it** — what broke and what kind of problem it is
2. **Isolate it** — is it in the work, the planning document, or both?
3. **Fix the source** — do not patch over the symptom
4. **Verify** — check that the fix holds before continuing
5. **Log it** — add a Fixed entry in `.kit/04-progress.md`

**If the AI starts ignoring the uploaded files mid-session:**
Stop. Re-upload the session files. Re-read this file and the domain file. If the problem continues, start a fresh session using the most recent milestone summary as context.
