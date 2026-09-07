---
file: '.playbook/vocabulary-software/_index.md'
responsibility: 'Combined entry point for the software domain — vocabulary, planning document shapes, and software-specific AI session rules, loaded alongside the universal .playbook/_index.md.'
ai_instructions: 'Load after .playbook/_index.md for any software project. Merges the former README.md and AI-INSTRUCTIONS.md for this domain — both retired as separate files in the 2026-08-29 consolidation.'
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

Templates: [templates/_index.md](templates/_index.md).

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map + session rules
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

## Software-Specific AI Rules

- Every component is defined in a planning doc before any code is written
- AI generates code against planning docs — not ahead of them
- No component is marked `status: active` with unresolved TODOs
- No code path is left unhandled — all branches must be explicit
- Flag ambiguity before writing any code or planning doc
- Do not add anything outside the current task scope
- Do not rename, move, or restructure anything outside the current task
- Do not introduce a dependency not declared in the component's planning doc

## Anti-Patterns

Never do any of the following:

- Cross-layer imports
- Direct module-to-module imports — use declared interfaces
- Business logic in the interface layer
- `any` type anywhere in the codebase
- Raw `throw` in Domain or Application layer
- Stub or partial implementations
- Silently resolving ambiguity
- Generating code ahead of a planning doc

---

## File Header Rule

Every generated file's location is declared in its frontmatter `file:` field — no separate `# Title` / `# File:` comment header above it.

## Frontmatter

Every file in this domain — including `sequencer` and `component` planning docs — follows the Frontmatter Tiering Rule defined in `maintenance.md` (Tier 1 for planning docs, Tier 2 for everything else). Don't invent a different shape here.
