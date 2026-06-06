# Mapping What Already Exists
# File: .playbook/guides/reverse-engineer.md

> You cannot design what should exist without understanding what does exist.
> Every assumption about existing work that turns out wrong costs time to undo.

Use this guide when bringing an existing project into Playbook or when rebuilding something that already has a history.

Activate before starting:

```
Active Expansions:
  reverse-engineer: inventory
```

---

## What It Produces

Three documents saved in `docs/rewrite/`:

| Document | What it contains |
|---|---|
| `system-map.md` | What exists, where it lives, what depends on what |
| `decision-record.md` | A verdict on every major piece, with reasoning |
| `risk-register.md` | What breaks if X changes and what order things can safely change in |

For large projects, any of these can be split into a sub-folder with its own `_index.md`.

---

## What "Inventory" Means in Your Domain

Inventory is not one-size-fits-all. What you are mapping depends on what your project is made of.

**Software project:**
Map the codebase — apps, modules, services, data models, external APIs, configuration, entry points, and what imports what.

**Writing project:**
Map the body of work — published pieces, drafts, outlines, the publication structure, editorial standards that exist (written or unwritten), platforms or publishers in use, and what each piece depends on.

**Production project:**
Map the production history — deliverables produced, phases completed, vendors and tools used, assets created and where they live, approvals obtained, and what is still outstanding.

**Manufacturing project:**
Map what has been built or is in progress — parts, assemblies, process steps, suppliers, specifications on file, inspection records, and anything with a known defect or open question.

The phases below apply to all domains. Interpret each prompt through the lens of what your project is actually made of.

---

## Classification System

Every major piece receives one of these verdicts:

| Verdict | Meaning |
|---|---|
| `Keep` | Works as-is — no changes needed |
| `Align` | Works but needs to conform to new standards or structure |
| `Extract` | Good work in the wrong place — move it cleanly |
| `Rewrite` | Wrong, unclear, or too tangled — rebuild from scratch |
| `Replace` | The responsibility stays but the tool or method changes |
| `Discard` | No longer needed — remove it |
| `Defer` | Cannot decide yet — needs more information |
| `Evaluate` | Uncertain — needs investigation before a verdict can be given |

---

## Phases

Each phase requires your review before moving to the next. No phase advances automatically.

---

### Phase 1 — Inventory

**Goal:** Map what exists.

```
Run an inventory of this project.

Map and document:
1. All major pieces, sections, or components and what they do
2. All outside tools, services, or dependencies and what they provide
3. The information structure — what data or content exists and how it is organised
4. Entry points — how the project is accessed, used, or consumed
5. What depends on what

Use plain language throughout.
Flag anything that is unclear or needs investigation.
Produce a draft docs/rewrite/system-map.md.
Wait for review before moving on.
```

**Output:** Draft `docs/rewrite/system-map.md`
**Move on when:** the map is reviewed and approved.

---

### Phase 2 — Audit

**Goal:** Understand the quality and condition of what exists.

```
Audit the project against the system map.

For each major piece, identify:
1. What it actually does versus what it appears designed to do
2. What other parts depend on it
3. Whether it has a clear, single purpose or mixed responsibilities
4. Known problems, fragility, or technical debt

Flag: pieces doing too many jobs, unclear boundaries,
tight coupling between things that should be independent,
hidden dependencies, and anything significantly out of date.

Update system-map.md with findings.
Wait for review before moving on.
```

**Output:** Updated `docs/rewrite/system-map.md`
**Move on when:** audit findings are reviewed and approved.

---

### Phase 3 — Classify

**Goal:** Give every major piece a verdict.

```
Using the audited system map, classify every major piece.

For each piece document:
- Verdict (from the classification system)
- Reasoning — why this verdict
- What else is affected by this decision
- Risk level — low | medium | high | critical

Produce a draft docs/rewrite/decision-record.md.
Wait for review before moving on.
```

**Output:** Draft `docs/rewrite/decision-record.md`
**Move on when:** every piece is classified, the record is reviewed and approved.

---

### Phase 4 — Risk Map

**Goal:** Understand what breaks if X changes.

```
For every piece classified as Extract, Rewrite, Replace, or Discard:
1. What currently depends on it?
2. What breaks if it changes or disappears?
3. What must happen before it can be safely changed?
4. Are there circular dependencies — two things that each depend on the other?
5. Is there a safe order for making changes?

Produce a draft docs/rewrite/risk-register.md.
Wait for review before moving on.
```

**Output:** Draft `docs/rewrite/risk-register.md`
**Move on when:** the risk register is reviewed and approved.

---

### Phase 5 — Gap Report

**Goal:** Name what is missing, broken, or undocumented.

```
Using all three documents, produce a gap report.

Identify:
- Missing — things needed but not yet existing
- Broken — things that do not work correctly right now
- Undocumented — things with no written record, spec, or clear owner
- Quality concerns — anything known to cause problems under real conditions

Format as a prioritised list.
Append the gap report to docs/rewrite/system-map.md.
Wait for review before moving on.
```

**Output:** Gap report appended to `docs/rewrite/system-map.md`
**Move on when:** the gap report is reviewed and approved.

---

### Phase 6 — Handoff

**Goal:** Feed everything learned into the Playbook pipeline.

```
The mapping phase is complete. Run the handoff.

1. Pull open questions from system-map.md
   → add to .kit/02-exploration.md under Open Questions

2. Pull settled verdicts from decision-record.md
   → add to .kit/02-exploration.md under Settled Decisions

3. Pull known problems from risk-register.md
   → add to .kit/03-execution.md under Known Problems

4. Update .kit/01-process.md
   → mark this expansion complete
   → update Current State to reflect where the project now stands

Generate updated kit files for review.
```

**Output:** Updated `.kit/02-exploration.md`, `.kit/03-execution.md`, `.kit/01-process.md`
**Complete when:** all three kit files are updated and reviewed.

---

## Rules

- Never move to the next phase without your review and approval
- Never write planning documents during inventory, audit, or classify phases
- Every piece must be classified before the risk map phase begins
- The handoff is not complete until the rewrite documents feed the kit files
