# [Process Name]
# File: .playbook/[path]/[kebab-name].md

---
id: [kebab-case]
type: coordinator
status: draft
parent: [product or assembly]
sequence: []
concerns: []
---

## What It Does
Plain language — what this process coordinates and what it produces.

## Process Flow
References: `docs/flows/[process].md` + `docs/contracts/[specifications].md`

1. [Step name] — [what it produces]
   → requires: [tooling, materials, or prior steps]
   → inspection: [what is checked before moving forward]
   → gates: [next step]

2. [Step name] — [what it produces]
   → requires: [prior step] to be complete and approved
   → inspection: [what is checked]
   → gates: [next step]

3. [Step name] — [final step — what it delivers]
   → requires: [prior steps]
   → final inspection: [acceptance criteria before release]

## Detail
_(Cycle time, tooling requirements, environmental conditions, known failure modes. Omit if nothing fits.)_
