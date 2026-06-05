# Vocabulary — Software Development
# File: .playbook/vocabulary-software/README.md

This folder adapts the Playbook pipeline for software projects. It translates the pipeline stages into the language developers use, and adds the rules that apply specifically to code.

---

## How the Pipeline Maps

| Playbook stage | Software equivalent |
|---|---|
| Discovery | Product requirements (PRD) |
| Mapping | Runtime flows and sequences |
| Rules | Implementation contracts |
| Planning | Document-Driven Architecture (DDA) |
| Coordinator | Sequencer — coordinates other components |
| Component | Service, module, class, or function |
| Concern | Cross-cutting capability (logging, auth, error handling) |
| Integration | Third-party service or library |
| Work | Code |
| Handoff | Deployment milestone |

---

## Planning Document Types

| Type | Used for |
|---|---|
| `structure` | App or module map with a living folder tree |
| `sequencer` | Runtime coordinator — sequences other components |
| `component` | Single unit of logic — one responsibility |
| `concern` | Cross-cutting capability used across modules |
| `integration` | External service or library contract |

---

## Folder Layout

```
.playbook/
  AI-INSTRUCTIONS.md
  _index.md               ← project map
  _concerns/              ← cross-cutting capabilities
  _integrations/          ← external contracts
  _shared/                ← components used across modules
  [module]/
    _index.md
    [sequencer].md
    [component].md
docs/
  flows/
  contracts/
  code-standards.md       ← language and tooling rules
  rollout/
```

---

## Architecture Layers

Every component and sequencer belongs to one layer. The layer determines what it is allowed to depend on.

| Layer | Owns | Can depend on | Cannot depend on |
|---|---|---|---|
| `domain` | Business rules, data shapes | Nothing project-specific | Everything else |
| `application` | Use cases, coordination | Domain, declared ports | Infrastructure, interface |
| `infrastructure` | Connections to outside systems | Application ports, domain | Interface |
| `interface` | HTTP, CLI, UI, entry points | Application | Infrastructure internals |

The declared layer must match both the file location and what the code is allowed to import.

---

## Additional Files

- `AI-INSTRUCTIONS.md` — software-specific rules for AI sessions
- Copy `code-standards.md` into `docs/` — language and tooling rules

---

## What Is Different About Software

- Every component has a typed input and output — what goes in and what comes out is explicit
- Paths can fail in ways that require unwinding what has already happened
- Every outside tool must be declared before it is used
- Code must be tested — coverage requirements apply per layer
- Secrets never appear in code, logs, or documents
