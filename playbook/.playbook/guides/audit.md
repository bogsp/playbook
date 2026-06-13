# Audit Guide
# File: .playbook/guides/audit.md

Use this guide when you need to understand an existing project before redesigning or rebuilding any part of it. Mapping what exists first prevents breaking things that work and repeating decisions already made.

---

## The Phases

The audit runs in six phases, in order. Each phase requires your review before the next one starts. Nothing advances on its own.

| Phase | What happens |
|---|---|
| Inventory | List everything that exists — files, folders, dependencies, entry points |
| Audit | Examine each piece — what it does, what depends on it, what its quality is |
| Classify | Give every piece a verdict — keep, rewrite, replace, or remove |
| Risk map | Identify what breaks if X changes, in what order things can safely change |
| Gap report | Compare what exists against what is needed — name every gap |
| Handoff | Feed findings into the kit files and close the audit |

---

## What It Produces

| File | What it holds |
|---|---|
| `docs/rewrite/system-map.md` | What exists, where it lives, what depends on what |
| `docs/rewrite/decision-record.md` | A verdict on every major piece with reasoning |
| `docs/rewrite/risk-register.md` | What breaks if X changes, and the safe order to change things |

---

## Declaring the Expansion

In [01-process.md](../kit/01-process.md), declare the active phase:

```
Active Expansions:
  audit: inventory
```

Update the phase as it advances. Clear the expansion when handoff is complete.

---

## Handoff

When all phases are complete, findings feed directly into:
- [02-exploration.md](../kit/02-exploration.md) — settled decisions from the audit
- [03-execution.md](../kit/03-execution.md) — known issues, risks, and the plan forward
- [01-process.md](../kit/01-process.md) — current stage and what comes next

After handoff, the project continues from whichever pipeline stage the findings point to. Use the [adoption guide](adopt.md) to determine where that is.

---

## Rules

- No planning documents are written during inventory, audit, or classify phases
- No phase advances without human review
- No findings are discarded — everything goes into the relevant output file or is explicitly marked out of scope with a reason

---

## Starting the Audit with AI

Open [00-prompts.md](../kit/00-prompts.md) and use the **Starting a Audit Audit** prompt.
