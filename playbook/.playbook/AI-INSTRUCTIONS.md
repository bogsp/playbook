# AI Instructions — Universal
# File: .playbook/AI-INSTRUCTIONS.md

---
version: 1.0
requires: THE-STANDARD.md + vocabulary-[domain]/AI-INSTRUCTIONS.md
---

> Always load your vocabulary's `AI-INSTRUCTIONS.md` alongside this file.
> This file defines universal AI behavior. The vocabulary file defines
> domain-specific behavior. Neither is complete without the other.
> Always read `THE-STANDARD.md` before any session begins.

---

## Core Principle

Progressive Disclosure + Tiering is the default for every structural decision:

- Lead with plain language. Add technical depth only when context demands it.
- Define a required core. Add sections only when scope or type demands them.
- Never burden simple cases with complex requirements.
- Never let complex cases skip required coverage.

When any format, template, or structure decision needs to be made — apply this first.

---

## Session Start

Before any work, load in this order:

```
1. .playbook/AI-INSTRUCTIONS.md         — this file
2. vocabulary-[domain]/AI-INSTRUCTIONS.md — domain rules
3. docs/flows/_index.md                  — path entry point
4. docs/contracts/_index.md             — contract entry point
5. .playbook/_index.md                  — project manifest
6. Unit and coordinator definitions     — task-scoped
7. _concerns/ + _integrations/          — cross-cutting + boundaries
```

When Map Existing expansion is active, also load:
```
docs/rewrite/system-map.md
docs/rewrite/decision-record.md
docs/rewrite/risk-register.md
```

Scoped loading — load only what the task needs:

| Task | Load |
|---|---|
| New unit | AI-INSTRUCTIONS + domain AI + _index.md + parent def + flow + contract + _concerns/ |
| Fix | AI-INSTRUCTIONS + domain AI + unit def + its connects + concerns |
| New definition | Relevant flow + contract + parent _index.md |
| Ship doc | Full .playbook/ tree + kit/04-progress.md |
| Map Existing | system-map.md + decision-record.md + risk-register.md |

Confirm understanding. Then wait for instruction.

---

## Behavioral Rules

```
1.  Never write a definition without first reading the relevant flow and contract
2.  Never execute on a unit without its definition
3.  Never add a dependency not declared in connects or integrations
4.  Never create a unit that duplicates an existing responsibility
5.  Always implement against the declared interface in the definition
6.  Flag any definition with draft status before executing against it
7.  Suggest _shared/ when a unit appears in multiple modules
8.  Run sync check before closing any task
9.  Confirm all touched definitions are current before every delivery
10. Cross-check new units against _shared/ before creating module-level ones
11. Flag missing connects, emits, or children as TODO during generation
12. Update the living folder tree in _index.md when units change
13. Flows and contracts must be approved before any definition is authored
14. Apply Progressive Disclosure + Tiering to every structural decision
15. Prefer native implementations over external dependencies
16. External dependencies require explicit justification before adoption
17. Never advance Map Existing phases without human review and approval
18. Never begin definitions while Map Existing is in inventory, audit, or classify
19. Never stub implementations — no placeholder bodies, no hardcoded returns
20. Never leave any path unhandled — all branches must be explicit
21. Stop and flag before any execution when a requirement is unclear
22. Coordinators own sequence — extract leaf logic into units
23. Every unit in a coordinator sequence must have an active definition
```

---

## Uncertainty Protocol

When any of the following occur — stop all work and flag before proceeding:

- A requirement is unclear or underspecified
- A path is not defined in the definition or contract
- A dependency is needed but not declared
- A decision would affect more than the current unit
- The correct behavior cannot be inferred without assumptions

Flag format:

```
[FLAG] Category: description
       Options:  (if applicable)
       Blocking: what cannot proceed until this is resolved
```

Categories:
`underspecified` | `missing-contract` | `undeclared-dependency` |
`structural-decision` | `ambiguous-behavior`

---

## Expansions

Expansions are optional pipeline stages declared in `kit/01-process.md`.

### Declaring an expansion

Single-phase:
```
Active Expansions: map-existing
```

Multi-phase:
```
Active Expansions:
  map-existing: inventory
```

### Map Existing phases

```
inventory | audit | classify | risk-map | gap-report | handoff
```

Each phase advances only after human review and approval.
Expansion complete when handoff feeds `kit/02-exploration.md`
and `kit/03-execution.md`.

### Expansion rules

1. Never advance a phase without human review and approval
2. Never begin definitions while in inventory, audit, or classify phase
3. Every unit must be classified before risk-map phase begins
4. Handoff is not complete until rewrite docs are referenced in kit files

---

## Anti-Patterns

Never do any of the following:

**Structure**
- Units without definitions
- Definitions without flows or contracts
- Duplicating an existing unit's responsibility
- Coordinators hiding leaf logic instead of extracting it
- Cross-boundary imports that violate declared dependencies

**Implementation**
- Stub implementations — placeholder bodies, hardcoded returns
- Partial implementations — all paths must be handled explicitly
- Magic values — use named constants
- Commented-out work — delete it; version control preserves history
- Silent failures — every outcome is explicit

**AI-specific**
- Executing ahead of a definition
- Adding undeclared dependencies
- Silently resolving ambiguity with assumptions
- Making structural decisions unilaterally — flag and wait
- Leaving any path unhandled or silently ignored
- Updating definitions without flagging the change

---

## Session End

Before closing:

```
1. Run sync check on all definitions touched this session
2. Update kit/04-progress.md — completions, decisions, fixes
3. Update current state in kit/01-process.md
4. Update living folder tree if units changed
```

---

## Error Recovery

Something broke. Stop all other work.

```
1. Identify   — what category? drift, boundary violation, undefined path, other
2. Isolate    — definition, execution, or both?
3. Fix        — resolve at source; do not patch symptoms
4. Verify     — re-run checks before continuing
5. Log        — Fixed entry in kit/04-progress.md
```

Context rot — if AI ignores uploaded files mid-session:

```
Stop. Re-upload session files.
Re-read AI-INSTRUCTIONS.md and vocabulary AI-INSTRUCTIONS.md.
If rot persists, start a fresh session with a Ship doc as context.
```
