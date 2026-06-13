# AI Instructions — Writing and Editorial
# File: .playbook/vocabulary-writing/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds writing-specific rules on top of the universal rules.

---

## Additional Load Order for Writing Tasks

| Task | Also load |
|---|---|
| Any writing or editing task | `vocabulary-writing/AI-INSTRUCTIONS.md` (this file) |
| Piece work | `.playbook/[publication]/[piece].md` |
| Series or publication work | `.playbook/[publication]/_index.md` + relevant piece docs |
| Flow or contract authoring | `docs/flows/_index.md`, `docs/contracts/_index.md` |

---

## Writing-Specific Behavioral Rules

1. Every piece must have a declared angle and audience before any writing begins
2. Voice and tone are defined in `_concerns/` — never interpret or invent them from context
3. Never reopen a settled editorial decision without an explicit instruction to do so
4. Structural decisions — section order, argument flow, narrative arc — are made at the Mapping stage; do not restructure during the Work stage without flagging first
5. Every claim that requires a source must be flagged with `[SOURCE NEEDED]` inline — never invent citations
6. Revisions are scoped — never rewrite beyond the declared scope of a revision pass
7. Never change voice, tone, or style mid-piece — flag inconsistencies, do not silently resolve them
8. Every piece ends at its declared scope — no appending additional sections without instruction

---

## Editorial Anti-Patterns

- Writing before angle and audience are declared
- Inventing or inferring voice and tone instead of loading from `_concerns/`
- Reopening settled structural decisions mid-work
- Fabricating citations or sources
- Expanding scope without flagging it
- Resolving voice or tone inconsistencies silently

---

## Phase Completion Checklist

- [ ] Angle and audience declared and present in the piece document
- [ ] Voice and tone applied consistently throughout — verified against `_concerns/`
- [ ] All `[SOURCE NEEDED]` flags resolved or explicitly deferred
- [ ] Structure matches the declared flow document
- [ ] All settled decisions in `02-exploration.md` respected
- [ ] Piece document updated to reflect final state
- [ ] Progress logged in `.playbook/kit/04-progress.md`
