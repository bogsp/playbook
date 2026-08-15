---
file: '.playbook/vocabulary-writing/README.md'
responsibility: 'Adapts Playbook vocabulary for writing and editorial projects — how the pipeline stages, planning document types, and folder layout map to writing work.'
ai_instructions: 'Load alongside .playbook/vocabulary-writing/AI-INSTRUCTIONS.md for any writing project.'
archive_rule: 'N/A — core domain reference file.'
---

# Vocabulary — Writing and Editorial

This folder adapts Playbook for writing and editorial projects — articles, books, scripts, content series, and any work where the primary output is written language.

---

## How the Pipeline Maps to Writing

| Playbook stage | Writing equivalent |
|---|---|
| Thinking | Session files — decisions, tasks, progress |
| Discovery | Brief — topic, audience, angle, purpose |
| Mapping | Structure — sections, narrative flow, argument paths |
| Rules | Editorial standards — voice, style, what is and isn't in scope |
| Planning | Piece and section definitions |
| Work | Writing and editing |
| Handoff | Published or delivered work |

---

## Planning Document Types

| Type | Writing equivalent | What it defines |
|---|---|---|
| `coordinator` | Series or publication | The map — what pieces belong, how they connect |
| `piece` | Article, chapter, or script | One piece of writing — angle, structure, audience |
| `concern` | Cross-cutting standard | Voice, tone, formatting — defined once, applied everywhere |
| `integration` | External source or tool | A reference, platform, or tool the project depends on |

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map
├── _concerns/                 ← voice, tone, formatting standards
├── _integrations/             ← external sources and tools
└── [publication or series]/
    ├── _index.md              ← section or series map
    └── [piece].md             ← one file per article, chapter, or script

docs/
├── flows/                     ← narrative flows and reader paths
├── contracts/                 ← editorial standards per flow
└── [brief].md                 ← what you're writing, why, for whom
```

---

## What Makes Writing Different

- The reader path matters as much as the content — map it before writing
- Voice and tone are cross-cutting concerns — define them once and reference them everywhere
- Every piece has an angle and an audience — these are not optional fields
- Editorial decisions are permanent once a piece is published — settle them before work begins
- Revisions are part of the work — plan for them, don't treat them as failures

---

## Additional Files

- [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md) — writing-specific rules for AI sessions; loaded alongside [.playbook/AI-INSTRUCTIONS.md](../AI-INSTRUCTIONS.md)
