# Vocabulary — Manufacturing
# File: .playbook/vocabulary-manufacturing/README.md

This folder adapts the Playbook pipeline for manufacturing projects — product design, fabrication, supply chain coordination, quality control, and any project where the output is a physical thing or a repeatable physical process.

---

## How the Pipeline Maps

| Playbook stage | Manufacturing equivalent |
|---|---|
| Discovery | Product brief or engineering brief |
| Mapping | Process flows — design, prototyping, fabrication, QC, delivery |
| Rules | Specifications — tolerances, materials, process standards |
| Planning | Product or process architecture |
| Coordinator | Process coordinator or production lead |
| Component | Part, sub-assembly, or process step |
| Concern | Cross-cutting standard (material spec, safety standard, compliance) |
| Integration | Supplier, tool, machine, or certification body |
| Work | Fabrication, assembly, testing |
| Handoff | Production release — approved design, first article, batch release |

---

## Planning Document Types

| Type | Used for |
|---|---|
| `structure` | Product or process map |
| `coordinator` | Manages the fabrication or assembly sequence |
| `component` | A single part, sub-assembly, or process step |
| `concern` | Material spec, safety standard, compliance requirement |
| `integration` | Supplier, tool, machine, or certification body |

---

## Folder Layout

```
.playbook/
  AI-INSTRUCTIONS.md
  _index.md               ← product or process map
  _concerns/              ← material specs, safety standards
  _integrations/          ← supplier and tool contracts
  [assembly or process]/
    _index.md
    [part or step].md
docs/
  flows/                  ← process flows
  contracts/              ← engineering specifications
  rollout/                ← production release snapshots
```

---

## What Is Different About Manufacturing

- Every part has a specification — tolerances, materials, and process requirements are written down explicitly
- Paths map the fabrication sequence — what must be finished before the next step can begin
- Rules define what "acceptable" means — quality gates are not optional
- A part is not done until it passes inspection
- Drift looks like out-of-spec parts, undocumented process changes, or unapproved material substitutions

---

## Additional Files

- `AI-INSTRUCTIONS.md` — manufacturing-specific rules for AI sessions

---

## Status

Core vocabulary defined. This folder grows as manufacturing projects develop.
