# Vocabulary — Production and Operations
# File: .playbook/vocabulary-production/README.md

This folder adapts Playbook for production and operations projects — campaigns, events, launches, deliverable-based work, and any project where the output is a produced result rather than a written or coded artefact.

---

## How the Pipeline Maps to Production

| Playbook stage | Production equivalent |
|---|---|
| Thinking | Session files — decisions, tasks, progress |
| Discovery | Project brief — what is being produced, for whom, by when |
| Mapping | Production paths — delivery sequences, dependencies, approval flows |
| Rules | Production standards — quality thresholds, approval requirements, constraints |
| Planning | Deliverable and role definitions |
| Work | Production and delivery |
| Handoff | Delivered and signed-off work |

---

## Planning Document Types

| Type | Production equivalent | What it defines |
|---|---|---|
| `coordinator` | Project or campaign | The map — what deliverables belong, dependencies, sequence |
| `deliverable` | A single produced output | What it is, who it's for, what done looks like |
| `concern` | Cross-cutting standard | Quality, approval, compliance — defined once, applied everywhere |
| `integration` | External vendor or platform | What it provides, what the project depends on it for |

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map
├── _concerns/                 ← quality, approval, compliance standards
├── _integrations/             ← vendors, platforms, external dependencies
└── [project or campaign]/
    ├── _index.md              ← deliverable map
    └── [deliverable].md       ← one file per produced output

docs/
├── flows/                     ← production paths and approval flows
├── contracts/                 ← standards per path
└── [brief].md                 ← what is being produced, why, for whom
```

---

## What Makes Production Different

- Deadlines are constraints, not targets — they belong in the planning document, not just in conversation
- Dependencies between deliverables must be mapped before work begins — a blocked deliverable blocks everything after it
- Approval flows are paths — they must be defined at the Mapping stage
- Every deliverable has a clear definition of done — never left to interpretation
- External vendors and platforms are integrations — declare them before depending on them

---

## Additional Files

- [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md) — production-specific rules for AI sessions; loaded alongside [.playbook/AI-INSTRUCTIONS.md](../AI-INSTRUCTIONS.md)
