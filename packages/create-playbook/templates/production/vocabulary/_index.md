---
file: '.playbook/vocabulary-production/_index.md'
responsibility: 'Combined entry point for the production and operations domain — vocabulary, planning document shapes, and production-specific AI session rules, loaded alongside the universal .playbook/_index.md.'
ai_instructions: 'Load after .playbook/_index.md for any production project. Merges the former README.md and AI-INSTRUCTIONS.md for this domain — both retired as separate files in the 2026-08-29 consolidation.'
archive_rule: 'N/A — core domain reference file.'
---

# Vocabulary — Production and Operations

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

Templates: [templates/_index.md](templates/_index.md).

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map + session rules
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

## Production-Specific AI Rules

1. Every deliverable must have a declared definition of done before any work begins on it
2. Deadlines declared in a deliverable document are hard constraints — never treat them as flexible without an explicit instruction
3. Dependencies between deliverables must be declared before work begins — never assume a dependency is resolved
4. Approval flows are defined in `docs/flows/` — never invent or shortcut an approval path
5. Every external vendor or platform is declared as an integration — never introduce one without flagging it
6. A blocked deliverable must be flagged immediately with what is blocking it and what cannot proceed until it is resolved
7. Quality thresholds are defined in `_concerns/` — never interpret or relax them without explicit instruction
8. Never mark a deliverable done without all definition-of-done criteria explicitly met

## Production Anti-Patterns

- Starting work on a deliverable without a declared definition of done
- Treating deadlines as flexible without explicit instruction
- Assuming a dependency is resolved without confirmation
- Inventing or shortcutting approval flows
- Introducing undeclared vendor or platform dependencies
- Marking a deliverable done before all criteria are met
- Resolving blockers silently with assumptions

## Phase Completion Checklist

- [ ] All deliverables have declared definitions of done
- [ ] All dependencies between deliverables are declared and resolved or flagged
- [ ] Approval flows match the declared flow documents
- [ ] All external vendors and platforms declared as integrations
- [ ] All blockers flagged with explicit blocking statements
- [ ] Quality thresholds verified against `_concerns/`
- [ ] All deliverable documents updated to reflect current state
- [ ] Progress logged in `kit/04-progress.md`

---

## Frontmatter

Frontmatter for every file in this domain — including `deliverable` planning docs —
follows the Frontmatter Tiering Rule defined in `maintenance.md` (Tier 1 for
planning docs, Tier 2 for everything else). Don't invent a different shape here.
