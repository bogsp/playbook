# AI Instructions — Manufacturing
# File: .playbook/vocabulary-manufacturing/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds manufacturing-specific rules on top of the universal rules.

---

## Document Types

### coordinator (process coordinator)

Manages the fabrication or assembly sequence.

```yaml
id: [kebab-case]
type: coordinator
status: draft
parent: [product or assembly]
sequence: []
concerns: []
```

Sequence section shows the process flow:
```
1. [step] — [what it produces]
   → gates: [next step]
   → requires: [tooling, materials, or prior steps]
   → inspection: [what is checked before proceeding]
```

---

### component (part or process step)

A single part, sub-assembly, or process step.

```yaml
id: [kebab-case]
type: component
status: draft
parent: [coordinator or assembly]
specification: [drawing number or spec reference]
material: []
depends-on: []
concerns: []
```

Interface section:
```
Specification: [drawing or spec reference]
Material: [material and grade]
Tolerances: [key dimensions and tolerances]
Inspection criteria: [what must be true before this part is accepted]
Depends on: [parts or steps that must be complete first]
```

---

### concern (material spec / standard)

```yaml
id: [kebab-case]
type: concern
status: draft
affects: all | [assembly or process list]
```

A concern doc defines a standard that applies across the product — material specs, safety standards, compliance requirements.

---

## Manufacturing-Specific Behavioral Rules

1. Never begin fabrication on a part without an approved specification
2. Never skip an inspection step — quality gates are contracts
3. Material substitutions must be documented and approved before use
4. Process deviations must be flagged and documented before the step is marked complete
5. Dependencies between parts and steps are explicit — flag missing dependencies before beginning work
6. Specifications live in concern docs or component docs — never assume a standard applies without declaring it

---

## Manufacturing Anti-Patterns

- Beginning fabrication without an approved drawing or specification
- Undocumented material substitutions
- Skipped or undocumented inspection steps
- Process deviations not captured in the structure doc
- Undeclared dependencies between parts or steps

---

## Status

This file grows as projects in this domain develop.
