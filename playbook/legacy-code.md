# Legacy Codebase Mapping Playbook

A practical guide for analyzing, documenting, and preparing old codebases for structured rewrites.

---

## Goal

Create a clear understanding of an existing codebase so it can be:

- Reviewed efficiently
- Refactored or rewritten
- Integrated into a pipeline (even without Context Kit files)

---

## Overview Workflow

1. Scan and map structure
2. Identify architecture layers
3. Trace runtime flows
4. Build module inventory
5. Detect anti-patterns
6. Generate Context Kit
7. Map to playbook pipeline

---

## 1. Codebase Structure Mapping

### Tools

- tree
- ripgrep
- madge
- dependency-cruiser
- ts-morph

### Output

```json
{
	"pages": [],
	"components": [],
	"services": [],
	"dependencies": {},
	"entryPoints": []
}
```

## 2. Architecture Layers

Group files into:

- Presentation (UI, pages)
- Application (hooks, state, controllers)
- Domain (business logic)
- Infrastructure (API, DB, external services)

## 3. Runtime Flow Mapping

Format:

```
User Action → Route → Component → Hook → Service → API → Response → UI
```

Focus on:

- Authentication
- Core business flows
- Data lifecycle

## 4. Module Inventory

| Module | Responsibility | Inputs | Outputs | Dependencies | Risk |

Look for:

- Tight coupling
- Side effects
- Hidden dependencies

## 5. Anti-Patterns

Flag:

- God components
- Mixed concerns
- Business logic in UI
- Duplicate logic
- Global state misuse
- API calls inside components

## 6. Context Kit (Retroactive)

```
project:
name: legacy-project

architecture:
type: monolith

layers:

- presentation
- application
- domain
- infrastructure

flows:

- name: auth
  steps: []

modules:

- name: ExampleService
  responsibility: business logic
```

## 7. Mapping to Playbook Pipeline

| Legacy Pattern    | Target Pattern       |
| ----------------- | -------------------- |
| API in components | Service layer        |
| Mixed concerns    | Separation by domain |
| Global state      | Scoped state         |
| Large components  | Modular components   |

## 8. Automation

Build a CLI tool that outputs:

- structure.json
- dependency-graph.json
- flows.md

## 9. Visualization

Use:

- Mermaid
- Graphviz

Generate:

- Dependency graphs
- Flow diagrams
- Architecture maps

## Checklist

- [ ] Structure mapped
- [ ] Layers defined
- [ ] Flows traced
- [ ] Modules listed
- [ ] Anti-patterns identified
- [ ] Context Kit created
- [ ] Pipeline mapping defined

### Outcome

You will have:

- Clear system map
- Rewrite-ready architecture
- Pipeline-compatible Context Kit
- Repeatable process
