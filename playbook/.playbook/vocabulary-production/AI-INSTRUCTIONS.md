# AI Instructions — Production & Operations
# File: .playbook/vocabulary-production/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds production-specific rules on top of the universal rules.

---

## Document Types

### coordinator

Manages the sequence of production phases or deliverables.

```yaml
id: [kebab-case]
type: coordinator
status: draft
parent: [project]
sequence: []
concerns: []
```

Sequence section shows the production pipeline:
```
1. Pre-production:
   a. [deliverable] — [what it enables]
      → gates: [next deliverable]
      → deadline: [relative deadline]

2. Production:
   a. [deliverable] — [what it produces]
      → depends on: [pre-production deliverable]
```

---

### component (deliverable)

A single asset or deliverable.

```yaml
id: [kebab-case]
type: component
status: draft
parent: [coordinator or phase]
format: [delivery format spec]
deadline: [relative or absolute]
depends-on: []
concerns: []
```

Interface section:
```
Format: [spec — resolution, format, duration, file type, etc.]
Delivery: [how and where it is delivered]
Quality gates: [what must be true before this is approved]
Depends on: [deliverable-ids that must be complete first]
```

---

### concern (format spec / brand guideline)

```yaml
id: [kebab-case]
type: concern
status: draft
affects: all | [phase or deliverable list]
```

A concern doc defines a rule that applies across deliverables — brand guidelines, format specs, compliance requirements.

---

## Production-Specific Behavioral Rules

1. Never begin production on a deliverable without an approved brief and format spec
2. Never skip a quality gate — they are contracts, not suggestions
3. Dependencies between deliverables are explicit — flag missing dependencies before beginning work
4. Format specs live in concern docs — never invent them per deliverable
5. Deadline changes must be reflected in the structure doc before work continues
6. Flag any deliverable where the format spec is unclear or missing

---

## Production Anti-Patterns

- Beginning production before pre-production is approved
- Missing or vague format specs on deliverables
- Undeclared dependencies between deliverables
- Quality gates treated as optional
- Deadline changes not reflected in structure docs

---

## Status

This file grows as projects in this domain develop.
