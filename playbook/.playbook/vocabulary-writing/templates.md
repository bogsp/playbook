# Writing Planning Document Templates
# File: .playbook/vocabulary-writing/templates.md

> Writing-specific fields and jargon, layered on top of `templates.md`.
> Read [templates.md](../templates.md) first — these are the same document
> types with writing fields added.

---

## structure (publication)

```
---
id: [kebab-case]
type: structure
scope: publication | series | volume | project
status: draft
contains: []
concerns: []
---

## What It Is
Plain language description of this publication or project.

## Who It Is For
The intended audience and what they get from this project.

## Voice and Tone
The consistent character of this publication — how it sounds, what it
values, what it never does.

## Structure
- [_index.md](./_index.md) — this file; publication map
- [series-name/](./series-name/) — [one line description]
  - [_index.md](./series-name/_index.md) — series map
  - [piece.md](./series-name/piece.md) — [one line description]

## Detail
_(Editorial decisions, constraints, known assumptions. Omit if nothing fits.)_
```

---

## coordinator (series / volume)

```
---
id: [kebab-case]
type: coordinator
status: draft
parent: [publication]
sequence: []
concerns: []
---

## What It Does
Plain language — what this series or volume coordinates and why the pieces
belong together.

## Editorial Arc
The journey a reader takes from the first piece to the last. What they know
at the start, what they know at the end.

## Sequence
References: `docs/flows/[outline].md` + `docs/contracts/[editorial-standards].md`

1. [piece-id] — [what it establishes for the reader]
   → leads to: [next-piece-id]
   → depends on: [piece-id] being published first

## Detail
_(Publishing schedule, platform constraints, known editorial decisions. Omit if nothing fits.)_
```

---

## component (piece)

```
---
id: [kebab-case]
type: component
status: draft
parent: [coordinator or publication]
premise: [one sentence — what the reader knows or believes coming in]
promise: [one sentence — what the reader gains from this piece]
depends-on: []
concerns: []
---

## What It Does
Plain language — what this piece is and what it accomplishes for the reader.

## Premise and Promise
**Premise:** [What the reader knows or believes when they arrive]
**Promise:** [What they'll know, feel, or be able to do when they leave]

## Interface
Outline: `docs/flows/[outline].md#[section]`
Standards: `docs/contracts/[standards].md#[section]`

**Opens with:** [how it draws the reader in]
**Closes with:** [what it leaves the reader with]
**Tone:** [how this piece sounds — consistent with the concern doc]

## Detail
_(Research sources, known constraints, editorial notes. Omit if nothing fits.)_
```

---

## concern (editorial standard)

```
---
id: [kebab-case]
type: concern
status: draft
affects: all | [series, series]
provided-by: internal
---

## What It Does
What this editorial standard defines and why every piece in this project
follows it.

## Rules
- [Rule — stated as always / never]

**Voice:** [how the writing sounds — active/passive, formal/casual, first/third person]
**Tone:** [emotional register — warm, direct, analytical, etc.]
**What it never does:** [things that would break the voice or standard]

## Examples
_(Optional — a brief before/after or illustrative example. Omit if the rules are self-evident.)_

## Detail
_(Citation style, formatting rules, platform-specific requirements. Omit if nothing fits.)_
```

---

## integration (platform / publisher)

```
---
id: [kebab-case]
type: integration
kind: publisher | platform | distribution-channel
status: draft
used-by: []
contact: [name or email]
docs: [url]
---

## What It Does
What this platform or publisher provides and how it fits into this project.

## Requirements
What this platform or publisher requires from every piece submitted to it.

**Format:** [file type, word count, structure requirements]
**Submission process:** [how pieces are submitted]
**Review timeline:** [how long review takes]
**Rights:** [what rights are granted or retained]

## Delivery Rules
- [Rule — what must always be true before submitting]

## Detail
_(Known constraints, style guide references, contact notes. Omit if nothing fits.)_
```
