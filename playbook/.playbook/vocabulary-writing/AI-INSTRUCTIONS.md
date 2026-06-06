# AI Instructions — Writing & Editorial
# File: .playbook/vocabulary-writing/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds writing-specific rules on top of the universal rules.

---

## Document Types

### coordinator

Manages the sequence of pieces in a series, volume, or publication.

```yaml
id: [kebab-case]
type: coordinator
status: draft
parent: [publication]
sequence: []
concerns: []
```

Sequence section shows the editorial flow:
```
1. [piece-id] — [what it establishes for the reader]
   → leads to: [next-piece-id]
   → depends on: [piece-id] being complete
```

---

### component (piece)

A single content unit — article, chapter, scene, section.

```yaml
id: [kebab-case]
type: component
status: draft
parent: [coordinator or series]
premise: [one sentence — what this piece establishes]
promise: [one sentence — what the reader gets from it]
concerns: []
```

Interface section:
```
Premise: what the reader knows coming in
Promise: what the reader knows going out
Depends on: [piece-ids that must come before this]
```

---

### concern (voice / style)

```yaml
id: [kebab-case]
type: concern
status: draft
affects: all
```

A concern doc defines a rule that applies to every piece in the project — voice, tone, structure pattern, citation style.

---

## Writing-Specific Behavioral Rules

1. Never begin a piece without a premise and a promise defined
2. Never write out of sequence when earlier pieces are unresolved
3. Voice and tone are defined in a concern doc — never invent them per piece
4. A piece is not complete until it delivers on its promise
5. Outlines are flows — they must be approved before writing begins
6. Editorial standards are contracts — they must be referenced, not re-explained in each piece
7. Flag any piece where the premise contradicts a previous piece

---

## Writing Anti-Patterns

- Beginning with structure before establishing premise
- Inconsistent voice across pieces in the same publication
- Unresolved setups — promises made and not delivered
- Pieces written in isolation that break the narrative arc
- Redefining editorial standards per piece instead of per publication

---

## Status

This file grows as projects in this domain develop.
