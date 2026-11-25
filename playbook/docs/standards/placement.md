---
file: 'docs/standards/placement.md'
responsibility: 'Placement test (D156, X6): decides whether new work is mechanism (code) or policy (graph).'
ai_instructions: 'Run this test for every new function, constant, list, threshold or rule, in every layer. Record the answer in the flow or DDA. If unsure, flag it (C1) and give options (custom rule 7).'
archive_rule: 'N/A — living standard.'
project: 'Project Sage'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Placement test: mechanism or policy

Decision record: `.playbook/kit/_refs/decisions/D156.md`. Direction: `D136`. Audit: `docs/rewrite/engine-minimal-audit.md`.

Ask in order and stop at the first yes.

1. **Is it needed to read or protect the graph at all?** Sensing, storage, identity, integrity, the operators, the generic part of a guard, hardening, log, memory, delivery. Yes: mechanism. Write it as code, small and generic.
2. **Does it decide what something means, or whether, when, how much or which one?** A word the engine looks for, a list, a threshold, a condition, an eligibility rule, a ranking, a classification. Yes: policy. It goes in the graph as units and relations, found by role key, written through the ordinary pipeline, protected where it must not change.
3. **Is it a capacity limit?** Yes: the resource manager measures it (D128). Do not fix it in C.
4. **Is it the content of a guard?** The check is mechanism; what it checks is policy (question 2).
5. **Still unsure?** Flag it (C1) and decide with options. Do not leave a constant in C for now (C12).

## Where each answer lives

| Kind | Lives in | Written how | Protected by |
|---|---|---|---|
| Mechanism | `src/`, `rust-shell/` | code, tests, DDA | the C and Rust standards |
| Policy | the graph | ordinary pipeline, role-key concepts | Type 2 under g5; sealed with the Core |
| Derived set | memory | built from the graph at load | never persisted; rebuilt every load |
| Capacity | resource manager | measured | D128 |

## Never

- A rule language or interpreter in the engine.
- A second store for policy next to the graph.
- A genesis or seeding step for policy (D130).
- Policy kept in code as a temporary constant.
- A guard that falls back to permitting when its policy cannot be read.
