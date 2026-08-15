---
file: '.playbook/vocabulary-software/README.md'
responsibility: 'Adapts Playbook vocabulary for software development projects — how the pipeline stages, planning document types, and folder layout map to software development work.'
ai_instructions: 'Load alongside .playbook/vocabulary-software/AI-INSTRUCTIONS.md for any software project.'
archive_rule: 'N/A — core domain reference file.'
---

# Vocabulary — Software Development

This folder adapts Playbook for software projects. Every stage of the pipeline maps directly to something developers already do — the difference is that Playbook makes it explicit, ordered, and AI-ready.

---

## How the Pipeline Maps to Software

| Playbook stage | Software equivalent |
|---|---|
| Thinking | Session files — decisions, tasks, progress |
| Discovery | Product requirements document (PRD) |
| Mapping | Runtime flows and sequences |
| Rules | Implementation contracts |
| Planning | Component and module architecture (DDA) |
| Work | Code |
| Handoff | Deployment milestone |

---

## Planning Document Types

| Type | Software equivalent | What it defines |
|---|---|---|
| `structure` | App or module | The map — what's in it, how pieces connect |
| `sequencer` | Use case coordinator | Owns the call sequence, not the logic |
| `component` | Service, class, or function | One responsibility, typed input and output |
| `concern` | Cross-cutting capability | Auth, logging, error handling — defined once |
| `integration` | Third-party service or library | What it provides, how the project depends on it |

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map
├── _concerns/                 ← cross-cutting capabilities
├── _integrations/             ← external contracts
├── _shared/                   ← components used across modules
└── [module]/
    ├── _index.md              ← module map
    ├── [sequencer].md
    └── [component].md

docs/
├── flows/                     ← runtime flows and sequences
├── contracts/                 ← implementation contracts
└── code-standards.md          ← language and tooling standards
```

---

## Architecture Layers

Every component and sequencer belongs to one layer. The layer determines what it is allowed to depend on.

| Layer | Owns | May depend on | Must not depend on |
|---|---|---|---|
| `domain` | Business rules, data shapes | Nothing project-specific | Everything else |
| `application` | Use cases, coordination | Domain, declared ports | Infrastructure, interface |
| `infrastructure` | Connections to outside systems | Application ports, domain types | Interface |
| `interface` | HTTP, CLI, UI, entry points | Application | Infrastructure internals |

The declared layer in every planning document must match the file location and what the code is allowed to import. If they disagree, the document stays `status: draft` until resolved.

---

## What Makes Software Different

- Every component has a typed input and output — the interface is always explicit
- Paths can fail in ways that require unwinding what's already happened — plan for it
- Every outside dependency must be declared before it is used
- Code must be tested — coverage requirements apply per layer
- Secrets never appear in code, logs, or planning documents

---

## Additional Files

- `AI-INSTRUCTIONS.md` — software-specific rules for AI sessions; loaded alongside `.playbook/AI-INSTRUCTIONS.md`
- `docs/code-standards.md` — canonical language and tooling standards; copy into `docs/` for each project
