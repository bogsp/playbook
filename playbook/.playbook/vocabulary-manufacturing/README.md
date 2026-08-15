---
file: '.playbook/vocabulary-manufacturing/README.md'
responsibility: 'Adapts Playbook vocabulary for manufacturing projects — how the pipeline stages, planning document types, and folder layout map to physical product and production process work.'
ai_instructions: 'Load alongside .playbook/vocabulary-manufacturing/AI-INSTRUCTIONS.md for any manufacturing project.'
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

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map
├── _concerns/                 ← tolerances, compliance, safety standards
├── _integrations/             ← suppliers, external processes, certifications
└── [product or run]/
    ├── _index.md              ← part and assembly map
    └── [part].md             ← one file per component or sub-assembly

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

## Additional Files

- [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md) — manufacturing-specific rules for AI sessions; loaded alongside [.playbook/AI-INSTRUCTIONS.md](../AI-INSTRUCTIONS.md)
