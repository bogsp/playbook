---
file: '.playbook/vocabulary-writing/_index.md'
responsibility: 'Combined entry point for the writing and editorial domain — vocabulary, planning document shapes, and writing-specific AI session rules, loaded alongside the universal .playbook/_index.md.'
ai_instructions: 'Load after .playbook/_index.md for any writing project. Merges the former README.md and AI-INSTRUCTIONS.md for this domain — both retired as separate files in the 2026-08-29 consolidation.'
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

Templates: [templates/_index.md](templates/_index.md).

---

## Folder Layout

```
.playbook/
├── _index.md                  ← project map + session rules
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

## Writing-Specific AI Rules

1. Every piece must have a declared angle and audience before any writing begins
2. Voice and tone are defined in `_concerns/` — never interpret or invent them from context
3. Never reopen a settled editorial decision without an explicit instruction to do so
4. Structural decisions — section order, argument flow, narrative arc — are made at the Mapping stage; do not restructure during the Work stage without flagging first
5. Every claim that requires a source must be flagged with `[SOURCE NEEDED]` inline — never invent citations
6. Revisions are scoped — never rewrite beyond the declared scope of a revision pass
7. Never change voice, tone, or style mid-piece — flag inconsistencies, do not silently resolve them
8. Every piece ends at its declared scope — no appending additional sections without instruction

## Editorial Anti-Patterns

- Writing before angle and audience are declared
- Inventing or inferring voice and tone instead of loading from `_concerns/`
- Reopening settled structural decisions mid-work
- Fabricating citations or sources
- Expanding scope without flagging it
- Resolving voice or tone inconsistencies silently

## Phase Completion Checklist

- [ ] Angle and audience declared and present in the piece document
- [ ] Voice and tone applied consistently throughout — verified against `_concerns/`
- [ ] All `[SOURCE NEEDED]` flags resolved or explicitly deferred
- [ ] Structure matches the declared flow document
- [ ] All settled decisions in `kit/02-exploration.md` respected
- [ ] Piece document updated to reflect final state
- [ ] Progress logged in `kit/04-progress.md`

---

## Frontmatter

Frontmatter for every file in this domain — including `piece` planning docs —
follows the frontmatter rules in `maintenance.md`: the card for planning
documents, the purpose block for everything else. Don't invent a different
shape here.
