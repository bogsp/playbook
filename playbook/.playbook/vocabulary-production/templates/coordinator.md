# [Phase or Pipeline Name]
# File: .playbook/[path]/[kebab-name].md

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

1. Pre-production:
   a. [deliverable] — [what it enables]
      → gates: [next deliverable]
      → deadline: [relative — e.g. 2 weeks before shoot]
      → approved by: [who signs off]

2. Production:
   a. [deliverable] — [what it produces]
      → depends on: [pre-production deliverable]
      → quality gate: [what must be true before moving forward]

3. Post-production:
   a. [deliverable] — [what it finalises]
      → depends on: [production deliverable]
      → delivery: [how and where it is delivered]

## Detail
_(Scheduling constraints, crew dependencies, location or equipment requirements. Omit if nothing fits.)_
