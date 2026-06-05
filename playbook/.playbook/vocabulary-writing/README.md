# Vocabulary — Writing & Editorial
# File: .playbook/vocabulary-writing/README.md

This vocabulary folder adapts the Playbook pipeline for writing and editorial projects — long-form articles, books, scripts, newsletters, content series, and any project where the output is words.

---

## Pipeline Mapping

| Playbook Term | Writing Term |
|---|---|
| Discovery | Brief / Editorial brief |
| Flows | Content paths — outlines, chapter flow, narrative arc |
| Contracts | Editorial standards — voice, style, structure rules |
| Structure docs | Content architecture — sections, pieces, assets |
| Coordinator | Editor / Series coordinator |
| Component | Article, chapter, section, scene |
| Concern | Cross-cutting standard (voice, formatting, citations) |
| Integration | External source, publisher, platform |
| Work | Writing, editing, publishing |
| Rollout | Published milestone — issue, volume, release |

---

## Document Types

| Type | Used For |
|---|---|
| `structure` | Publication or series manifest |
| `coordinator` | Manages sequence of pieces — series, chapters, issue flow |
| `component` | A single piece of content — article, chapter, section |
| `concern` | Voice guide, style guide, citation rules |
| `integration` | Publisher, platform, distribution channel |

---

## Folder Structure

```
.playbook/
  AI-INSTRUCTIONS.md
  _index.md               ← publication or project manifest
  _concerns/              ← voice, style, citation guides
  _integrations/          ← publisher and platform contracts
  [series or volume]/
    _index.md
    [piece].md
docs/
  flows/                  ← outline flows, narrative arcs
  contracts/              ← editorial standards
  rollout/                ← published milestone snapshots
```

---

## What Makes Writing Different

- The "interface" of a piece is its premise and its promise to the reader
- Flows map the reader's journey — what they know at each point and what they need next
- Contracts define voice, tone, structure, and what is always true about this publication
- A piece is not done when it is written — it is done when it is edited, approved, and published
- Drift in writing looks like inconsistent voice, broken narrative thread, or unresolved premises

---

## Additional Files

- `AI-INSTRUCTIONS.md` — writing-specific AI rules

---

## Status

Core vocabulary defined. This folder grows as writing projects develop.
