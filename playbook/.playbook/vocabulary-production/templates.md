# Production Planning Document Templates
# File: .playbook/vocabulary-production/templates.md

> Production-specific fields and jargon, layered on top of `templates.md`.
> Read [templates.md](../templates.md) first — these are the same document
> types with production fields added.

---

## structure (project)

```
---
id: [kebab-case]
type: structure
scope: project | show | event | campaign
status: draft
contains: []
concerns: []
integrations: []
---

## What It Is
Plain language description of this production project.

## What Gets Made
The deliverables — what's produced, in what format, and for whom.

## Structure
- [_index.md](./_index.md) — this file; project map
- [pre-production/](./pre-production/) — planning and preparation phase
  - [_index.md](./pre-production/_index.md) — phase map
  - [deliverable.md](./pre-production/deliverable.md) — [one line description]
- [production/](./production/) — active production phase
- [post-production/](./post-production/) — finishing and delivery phase

## Detail
_(Budget constraints, key dates, known risks, stakeholder requirements. Omit if nothing fits.)_
```

---

## coordinator (phase / pipeline)

```
---
id: [kebab-case]
type: coordinator
status: draft
parent: [project]
phase: pre-production | production | post-production
sequence: []
concerns: []
---

## What It Does
Plain language — what this phase coordinates and what it produces.

## Production Pipeline
References: `docs/flows/[pipeline].md` + `docs/contracts/[specs].md`

1. [deliverable] — [what it enables]
   → gates: [next deliverable]
   → deadline: [relative — e.g. 2 weeks before shoot]
   → approved by: [who signs off]

## Detail
_(Scheduling constraints, crew dependencies, location or equipment requirements. Omit if nothing fits.)_
```

---

## component (deliverable)

```
---
id: [kebab-case]
type: component
status: draft
parent: [coordinator or phase]
format: [delivery format spec]
deadline: [YYYY-MM-DD or relative]
depends-on: []
concerns: []
---

## What It Is
Plain language — what this deliverable is and what it does for the project.

## Specification
Contract: `docs/contracts/[pipeline].md#[section]`

**Format:** [file type, resolution, duration, dimensions, or other format requirements]
**Delivery:** [how and where it's handed off]
**Quality gates:** [what must be true before this is approved]

## Dependencies
What must be complete before work on this deliverable can begin:
- [deliverable-id] — [why it's needed first]

## Detail
_(Technical requirements, creative brief reference, known constraints. Omit if nothing fits.)_
```

---

## concern (format spec / brand guideline)

```
---
id: [kebab-case]
type: concern
status: draft
affects: all | [phase, deliverable]
provided-by: internal
---

## What It Does
What this standard defines and why every deliverable in this project follows it.

## Rules
- [Rule — stated as must / never]

**Applies to:** [which deliverables or phases this governs]
**Enforced at:** [which quality gate checks this]
**Exception process:** [how deviations are approved, if at all]

## Detail
_(Compliance references, brand guideline sources, safety requirements. Omit if nothing fits.)_
```

---

## integration (vendor / platform / tool)

```
---
id: [kebab-case]
type: integration
kind: vendor | platform | tool | delivery-channel
status: draft
used-by: []
contact: [name or email]
contract-ref: [contract or PO reference]
docs: [url]
---

## What It Does
What this vendor, platform, or tool provides and how it fits into this project.

## What It Requires
**Lead time:** [how far in advance bookings or orders must be placed]
**Format requirements:** [what it needs delivered and in what form]
**Access or credentials:** [what must be set up before use]

## Delivery Rules
- [Rule — what must always be true when working with this vendor or platform]

## Known Constraints
- [Constraint — availability windows, capacity limits, technical restrictions]

## Detail
_(Contract terms, cancellation policy, escalation contacts. Omit if nothing fits.)_
```
