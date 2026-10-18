---
file: '.playbook/audit.md'
responsibility: 'The Audit: map an existing project before changing it. Phases, outputs, handoff and rules.'
ai_instructions: 'Load only when 01-process.md declares an active audit, or the person asks for one. Do not load otherwise. Shipped only to projects scaffolded as audit.'
archive_rule: 'N/A — core reference file.'
owner: playbook
---

# Audit

Use the audit when you need to understand an existing project before redesigning or rebuilding any part of it. Mapping what exists first prevents breaking things that work and repeating decisions already made.

## The Phases

The audit runs in six phases, in order. Each phase requires your review before the next one starts. Nothing advances on its own.

| Phase      | What happens                                                               |
| ---------- | -------------------------------------------------------------------------- |
| Inventory  | List everything that exists — files, folders, dependencies, entry points   |
| Audit      | Examine each piece — what it does, what depends on it, what its quality is |
| Classify   | Give every piece a verdict — keep, rewrite, replace, or remove             |
| Risk map   | Identify what breaks if X changes, in what order things can safely change  |
| Gap report | Compare what exists against what is needed — name every gap                |
| Handoff    | Feed findings into the kit files and close the audit                       |

---

## What It Produces

| File                              | What it holds                                                 |
| --------------------------------- | ------------------------------------------------------------- |
| `docs/rewrite/system-map.md`      | What exists, where it lives, what depends on what             |
| `docs/rewrite/decision-record.md` | A verdict on every major piece with reasoning                 |
| `docs/rewrite/risk-register.md`   | What breaks if X changes, and the safe order to change things |

---

## Handoff

When all phases are complete, findings feed directly into:

- [02-exploration.md](kit/02-exploration.md) — settled decisions from the audit
- [03-execution.md](kit/03-execution.md) — known issues, risks, and the plan forward
- [01-process.md](kit/01-process.md) — current stage and what comes next

After handoff, the project continues from whichever pipeline stage the findings point to. Use the four questions in [adopt.md](adopt.md) to determine where that is. If the audit surfaces a project identity that no longer matches `.playbook/_index.md` or `README.md`, update them per Keep Project Identity Current in [maintenance.md](maintenance.md) as part of handoff.

---

## Rules

- No planning documents are written during inventory, audit, or classify phases
- No phase advances without human review
- No findings are discarded — everything goes into the relevant output file or is explicitly marked out of scope with a reason

---

## Starting the Audit with AI

Attach `.playbook/_index.md` and `audit.md`, then send:

```
Start a Playbook session. Follow the Session Start in the attached _index.md.
I'm starting an audit. The current phase is [phase]. Don't advance without my approval.
```
