# Vocabulary — Production & Operations
# File: .playbook/vocabulary-production/README.md

This vocabulary folder adapts the Playbook pipeline for production and operations projects — event production, content production, media pipelines, operational workflows, and any project where the output is a produced result delivered at a specific time or in a specific format.

---

## Pipeline Mapping

| Playbook Term | Production Term |
|---|---|
| Discovery | Production brief / Creative brief |
| Flows | Production pipeline — pre-production, production, post |
| Contracts | Production standards — format, delivery specs, quality gates |
| Structure docs | Production architecture — assets, deliverables, dependencies |
| Coordinator | Production coordinator / Director |
| Component | Asset, deliverable, task, scene, segment |
| Concern | Cross-cutting standard (format specs, brand guidelines, compliance) |
| Integration | Vendor, platform, tool, delivery channel |
| Work | Production |
| Rollout | Delivery milestone — final cut, air date, launch |

---

## Document Types

| Type | Used For |
|---|---|
| `structure` | Project or show manifest |
| `coordinator` | Manages sequence of production phases or deliverables |
| `component` | A single asset or deliverable |
| `concern` | Format spec, brand guideline, compliance requirement |
| `integration` | Vendor, tool, delivery platform |

---

## Folder Structure

```
.playbook/
  AI-INSTRUCTIONS.md
  _index.md               ← project manifest
  _concerns/              ← format specs, brand guidelines
  _integrations/          ← vendor and platform contracts
  [phase or segment]/
    _index.md
    [deliverable].md
docs/
  flows/                  ← production pipeline flows
  contracts/              ← delivery specs and quality gates
  rollout/                ← delivery milestone snapshots
```

---

## What Makes Production Different

- Every deliverable has a format spec and a delivery deadline
- Flows follow pre-production → production → post-production phases
- Dependencies between deliverables are explicit — a cut cannot be completed without an approved script
- Quality gates are not optional — they are contracts
- Drift in production looks like missed specs, format mismatches, or late deliverables

---

## Additional Files

- `AI-INSTRUCTIONS.md` — production-specific AI rules

---

## Status

Core vocabulary defined. This folder grows as production projects develop.
