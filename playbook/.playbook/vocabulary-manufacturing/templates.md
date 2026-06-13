# Templates — Manufacturing
# File: .playbook/vocabulary-manufacturing/templates.md

Planning doc shapes for manufacturing projects.
Use these as the starting point for every new planning doc in this domain.

---

## Component

```markdown
---
id: [kebab-case]
type: component
status: draft
parent: [module]
children: []
connects: []
concerns: []
---

## What It Does
TODO — plain language description of this component's single responsibility.

## Specifications
TODO — materials, tolerances, dimensions, quantities, and constraints.

## Dependencies
TODO — what this component requires before it can be produced or assembled.

## Detail
_(Edge cases, failure modes, and constraints only. Omit if nothing fits.)_
```

---

## Process

```markdown
---
id: [kebab-case]
type: process
status: draft
parent: [module]
stage: [fabrication | assembly | quality-control | packaging | delivery]
depends-on: []
produces: []
---

## What It Does
TODO — plain language description of what this process achieves.

## Inputs
TODO — materials, components, and conditions required before this process begins.

## Outputs
TODO — what is produced or transformed when this process completes successfully.

## Steps
TODO — ordered sequence of operations.

1. [Operation]
   - Tooling: [tool or equipment]
   - Spec: [tolerance, setting, or parameter]
   - Pass: [what a good result looks like]
   - Fail: [what triggers rejection or rework]

## Quality Gates
TODO — inspection points and acceptance criteria.

## Detail
_(Edge cases, rework procedures, and constraints only. Omit if nothing fits.)_
```

---

## Supply Chain Integration

```markdown
---
id: [kebab-case]
type: integration
kind: supplier | logistics | inventory
status: draft
used-by: []
lead-time: [days]
---

## What It Provides
TODO — what this supplier or logistics partner provides and how it connects
to this project's production process.

## Constraints
TODO — minimums, lead times, substitution rules, and single-source risks.

## Failure Modes
TODO — what happens when supply is delayed, short, or non-conforming.

## Detail
_(Qualification requirements, approved alternatives. Omit if nothing fits.)_
```

---

## Quality Standard

```markdown
---
id: [kebab-case]
type: concern
status: draft
affects: [component or process id]
standard: [internal | ISO | customer-specified]
---

## What It Governs
TODO — which components or processes this standard applies to and why.

## Acceptance Criteria
TODO — measurable pass/fail conditions.

## Inspection Method
TODO — how conformance is verified, by whom, and at what stage.

## Non-Conformance Handling
TODO — what happens when a component or batch fails inspection.

## Detail
_(Record-keeping requirements, traceability rules. Omit if nothing fits.)_
```
