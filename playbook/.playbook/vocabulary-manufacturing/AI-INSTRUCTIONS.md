---
file: '.playbook/vocabulary-manufacturing/AI-INSTRUCTIONS.md'
responsibility: 'Manufacturing-domain-specific AI session rules — loaded alongside the universal .playbook/AI-INSTRUCTIONS.md.'
ai_instructions: 'Load .playbook/AI-INSTRUCTIONS.md first, then this file.'
archive_rule: 'N/A — core domain reference file.'
---

# AI Instructions — Manufacturing

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds manufacturing-specific rules on top of the universal rules.

---

## Additional Load Order for Manufacturing Tasks

| Task | Also load |
|---|---|
| Any manufacturing task | `vocabulary-manufacturing/AI-INSTRUCTIONS.md` (this file) |
| Part or sub-assembly work | `.playbook/[product]/[part].md` |
| Product or production run work | `.playbook/[product]/_index.md` + relevant part docs |
| Flow or contract authoring | `docs/flows/_index.md`, `docs/contracts/_index.md` |

---

## Frontmatter

Frontmatter for every file in this domain — including `part` planning docs —
follows the Frontmatter Tiering Rule defined in `maintenance.md` (Tier 1 for
planning docs, Tier 2 for everything else). Don't invent a different shape here.

---

## Manufacturing-Specific Behavioral Rules

1. Every part must have a declared specification and definition of done before any work begins on it
2. Tolerances and compliance requirements declared in planning documents are hard constraints — never interpret or relax them without explicit instruction
3. Assembly sequence dependencies must be declared before production begins — never assume a dependency is resolved
4. Quality checkpoints are defined in `docs/flows/` — never skip or reorder them without explicit instruction
5. Every supplier and external process is declared as an integration — never introduce one without flagging it
6. A blocked part or process must be flagged immediately with what is blocking it and what cannot proceed until resolved
7. Compliance and safety standards are defined in `_concerns/` — never interpret or relax them without explicit instruction
8. Never mark a part or process done without all specification criteria explicitly verified

---

## Manufacturing Anti-Patterns

- Starting work on a part without a declared specification
- Interpreting or relaxing tolerances without explicit instruction
- Assuming assembly dependencies are resolved without confirmation
- Skipping or reordering quality checkpoints
- Introducing undeclared supplier or external process dependencies
- Marking a part done before specification criteria are verified
- Resolving blockers silently with assumptions

---

## Phase Completion Checklist

- [ ] All parts have declared specifications and definitions of done
- [ ] All assembly sequence dependencies declared and resolved or flagged
- [ ] Quality checkpoints match the declared flow documents
- [ ] All suppliers and external processes declared as integrations
- [ ] All blockers flagged with explicit blocking statements
- [ ] Compliance and safety standards verified against `_concerns/`
- [ ] All part documents updated to reflect current state
- [ ] Progress logged in `.playbook/kit/04-progress.md`
