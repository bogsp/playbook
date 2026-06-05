# Playbook Pipeline
# File: .playbook/pipeline.md

> The complete reference for how Playbook works.
> Applies to any kind of project.
> For AI session setup: `AI-INSTRUCTIONS.md`
> For project-specific language: `vocabulary-[domain]/`

---

## Core Principle

**Progressive Disclosure + Tiering**

Start with the simplest, most human-readable version. Add depth below it only when needed. Define what is always required, then add sections only when the project demands them.

Never make a simple project carry the weight of a complex one.
Never let a complex project skip what a simple one must do.

This applies to every document, template, and decision in Playbook.

---

## The Pipeline

```
Thinking → Discovery → Mapping → Rules → Planning → Work → Handoff
```

Each stage feeds the next. Skipping a stage means the next one is built on guesswork.

---

## Stage 0 — Audit *(existing projects only)*

Understand what already exists before deciding what to change.

**Why it matters:** You cannot redesign something you do not fully understand. Every assumption that turns out wrong costs time to undo.

**What it produces:**
- `docs/rewrite/system-map.md` — what exists, where it lives, what depends on what
- `docs/rewrite/decision-record.md` — a verdict on every major piece, with reasoning
- `docs/rewrite/risk-register.md` — what breaks if X changes, and in what order things can safely change

**Steps:** inventory → audit → classify → risk-map → gap-report → handoff

Each step requires human review before moving to the next. The final step feeds back into the Thinking stage.

Full guide: `guides/reverse-engineer.md`

---

## Stage 1 — Thinking *(always active)*

The session and decision layer. It runs underneath every other stage, start to finish.

**Files:**

| File | What it holds | When to update |
|---|---|---|
| `.kit/01-process.md` | Where you are and what is next | Every session |
| `.kit/02-exploration.md` | Open questions and settled decisions | When decisions change |
| `.kit/03-execution.md` | Guidelines, plan, tasks, known problems | When work changes |
| `.kit/04-progress.md` | Running history — append only | Every session |
| `.kit/05-kanban.md` | Work tickets | When tickets change |
| `.kit/06-qa.md` | Checks and sign-off | When checks change |

**Each session:**
```
Start  → load your session files (2 messages)
Work   → stay focused on what is current
End    → update 01-process.md and 04-progress.md before closing
```

Full guide: `guides/context-kit.md`

---

## Stage 2 — Discovery

Define what you are making, why, and for whom. Everything else flows from this.

**What belongs here:** goals, outcomes, audience, constraints, what done looks like, what is out of scope.

**What does not belong here:** how it works, how it is built, what the parts are.

**Output:** a discovery document or brief, saved in `docs/`

---

## Stage 3 — Mapping

Walk through every major path through the project before any piece is defined.

**Why it matters:** Pieces designed without a map are guesses. Problems live in the connections between things, not inside the things themselves. One hour of mapping prevents four hours of rework.

**Rules:**
- One file per path — small and focused
- Every path includes what happens when something goes wrong, not just when it goes right
- All paths are agreed on before any planning begins

**Output:** `docs/flows/` — one file per path, `_index.md` as the entry point

---

## Stage 4 — Rules

Write down what every piece must follow, drawn from the paths you mapped.

**Why it matters:** Behaviour lives here. Plans point to rules — they never repeat them.

**Every rules file must cover:**
- What the good path looks like
- Every way it can go wrong
- Edge cases — the unusual situations that still have to work
- Ordering requirements — what must happen before what
- Hard constraints — things that must always be true

**The `global.md` file must cover:**
- How the project is structured overall
- Who or what has authority over what
- How failures are handled
- What must always be recorded
- Rules that apply everywhere with no exceptions

Read `global.md` before any path-specific rules file. Always.

**Output:** `docs/contracts/` — `global.md` plus one file per path

---

## Stage 5 — Planning

Define every piece of the project before doing any work on it.

**Why it matters:** The plan is the agreement. Work follows it. Starting work without a plan means making invisible decisions that are expensive to change.

**Document types:**

| Type | Used for |
|---|---|
| `index` | A map and summary of a section or the whole project |
| `coordinator` | Something that sequences other pieces and routes outcomes |
| `component` | A single piece with one clear job |
| `concern` | Something that applies across the whole project |
| `integration` | An outside tool, service, or dependency |

**Every planning document follows the same shape:**
```
What It Does   → plain language, anyone can understand it
Interface      → what goes in, what comes out, what rules apply
Detail         → edge cases and constraints — leave this out if nothing fits
```

**Output:** `.playbook/` — one planning document per piece

---

## Stage 6 — Work

Do the work against the plan. The plan is the source of truth.

**Rules:**
- Nothing gets built without a planning document for it
- No new outside dependency without a declared document for it
- Planning documents stay up to date with the actual work
- Run the completion checklist before closing any phase

**Completion checklist:**
- [ ] All work meets the quality bar for this project
- [ ] All planning documents reflect the current state of work
- [ ] No planning documents marked `draft` are in active work paths
- [ ] Session files updated — `01-process.md` and `04-progress.md`
- [ ] All changes saved and backed up
- [ ] Handoff document generated if a milestone was reached

---

## Stage 7 — Handoff

A snapshot of what was built and why, generated at each milestone. Never written by hand.

**Two uses:**
1. For people — what changed, how to use it, what to do next
2. For AI — full project context for starting a fresh session

**Output:** `docs/rollout/[milestone].md`

---

## Bringing an Existing Project In

For all paths into Playbook from an existing project: `guides/adopt.md`

Answer four questions to find where to start:
1. Does the project already have a `.kit/` folder?
2. Can you describe every major piece without going back to the source material?
3. Is there existing documentation?
4. Is this a partial update or a full rebuild?

---

## Quick Reference

**File naming:**

| Thing | Style | Example |
|---|---|---|
| Files | lowercase, hyphens | `invoice-validator.md` |
| IDs | match the filename | `id: invoice-validator` |
| Folders | lowercase, hyphens | `billing/` |
| Reserved folders | underscore prefix | `_concerns/` |
| Index files | always `_index.md` | `billing/_index.md` |

**Two markers used throughout:**
- `N/A` — this section was considered and does not apply
- `TODO` — this section is not yet written; the document cannot be marked active until it is

**Declaring an active expansion** (in `.kit/01-process.md`):
```
Active Expansions: video-insights

Active Expansions:
  reverse-engineer: classify
```

---

The plan is the agreement. The work follows.
