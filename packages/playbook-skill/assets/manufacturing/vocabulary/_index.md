---
file: '.playbook/vocabulary-manufacturing/_index.md'
responsibility: 'Combined entry point for the manufacturing domain — vocabulary, planning document shapes, and manufacturing-specific AI session rules, loaded alongside the universal .playbook/_index.md.'
ai_instructions: 'Load after .playbook/_index.md for any manufacturing project. Merges the former README.md and AI-INSTRUCTIONS.md for this domain — both retired as separate files in the 2026-08-29 consolidation.'
archive_rule: 'N/A — core domain reference file.'
---

# Vocabulary — Manufacturing

This folder adapts Playbook for manufacturing projects — product development, production runs, process design, and any work where the output is a physical product or repeatable production process.

---

## How the Pipeline Maps to Manufacturing

| Playbook stage | Manufacturing equivalent |
|---|---|
| Thinking | Session files — decisions, tasks, progress |
| Discovery | Product brief — what is being made, for whom, to what specification |
| Mapping | Production flows — assembly sequences, process paths, quality checkpoints |
| Rules | Manufacturing standards — tolerances, compliance requirements, process constraints |
| Planning | Part and process definitions |
| Work | Manufacture and assembly |
| Handoff | Delivered and verified product |

---

## Planning Document Types

| Type | Manufacturing equivalent | What it defines |
|---|---|---|
| `coordinator` | Product or production run | The map — what parts belong, assembly sequence, dependencies |
| `part` | A single component or sub-assembly | What it is, its specification, what done looks like |
| `concern` | Cross-cutting standard | Tolerances, compliance, safety — defined once, applied everywhere |
| `integration` | Supplier or external process | What it provides, what the product depends on it for |

Templates: [templates/_index.md](templates/_index.md).

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map + session rules
├── _concerns/                 ← tolerances, compliance, safety standards
├── _integrations/             ← suppliers, external processes, certifications
└── [product or run]/
    ├── _index.md              ← part and assembly map
    └── [part].md              ← one file per component or sub-assembly

docs/
├── flows/                     ← production flows and quality checkpoints
├── contracts/                 ← standards per flow
└── [brief].md                 ← what is being made, why, to what specification
```

---

## What Makes Manufacturing Different

- Specifications are non-negotiable — tolerances and compliance requirements belong in planning documents, not conversation
- Assembly sequences have dependencies — they must be mapped before production begins
- Supplier and external process dependencies are integrations — declare them before depending on them
- Every part has a definition of done tied to its specification — never left to interpretation
- Quality checkpoints are part of the flow — define them at the Mapping stage, not during production

---

## Manufacturing-Specific AI Rules

1. Every part must have a declared specification and definition of done before any work begins on it
2. Tolerances and compliance requirements declared in planning documents are hard constraints — never interpret or relax them without explicit instruction
3. Assembly sequence dependencies must be declared before production begins — never assume a dependency is resolved
4. Quality checkpoints are defined in `docs/flows/` — never skip or reorder them without explicit instruction
5. Every supplier and external process is declared as an integration — never introduce one without flagging it
6. A blocked part or process must be flagged immediately with what is blocking it and what cannot proceed until resolved
7. Compliance and safety standards are defined in `_concerns/` — never interpret or relax them without explicit instruction
8. Never mark a part or process done without all specification criteria explicitly verified

## Manufacturing Anti-Patterns

- Starting work on a part without a declared specification
- Interpreting or relaxing tolerances without explicit instruction
- Assuming assembly dependencies are resolved without confirmation
- Skipping or reordering quality checkpoints
- Introducing undeclared supplier or external process dependencies
- Marking a part done before specification criteria are verified
- Resolving blockers silently with assumptions

## Phase Completion Checklist

- [ ] All parts have declared specifications and definitions of done
- [ ] All assembly sequence dependencies declared and resolved or flagged
- [ ] Quality checkpoints match the declared flow documents
- [ ] All suppliers and external processes declared as integrations
- [ ] All blockers flagged with explicit blocking statements
- [ ] Compliance and safety standards verified against `_concerns/`
- [ ] All part documents updated to reflect current state
- [ ] Progress logged in `kit/04-progress.md`

---

## Frontmatter

Frontmatter for every file in this domain — including `part` planning docs —
follows the Frontmatter Tiering Rule defined in `maintenance.md` (Tier 1 for
planning docs, Tier 2 for everything else). Don't invent a different shape here.
