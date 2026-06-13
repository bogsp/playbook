# AI Instructions — Production and Operations
# File: .playbook/vocabulary-production/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds production-specific rules on top of the universal rules.

---

## Additional Load Order for Production Tasks

| Task | Also load |
|---|---|
| Any production task | `vocabulary-production/AI-INSTRUCTIONS.md` (this file) |
| Deliverable work | `.playbook/[project]/[deliverable].md` |
| Project or campaign work | `.playbook/[project]/_index.md` + relevant deliverable docs |
| Flow or contract authoring | `docs/flows/_index.md`, `docs/contracts/_index.md` |

---

## Production-Specific Behavioral Rules

1. Every deliverable must have a declared definition of done before any work begins on it
2. Deadlines declared in a deliverable document are hard constraints — never treat them as flexible without an explicit instruction
3. Dependencies between deliverables must be declared before work begins — never assume a dependency is resolved
4. Approval flows are defined in `docs/flows/` — never invent or shortcut an approval path
5. Every external vendor or platform is declared as an integration — never introduce one without flagging it
6. A blocked deliverable must be flagged immediately with what is blocking it and what cannot proceed until it is resolved
7. Quality thresholds are defined in `_concerns/` — never interpret or relax them without explicit instruction
8. Never mark a deliverable done without all definition-of-done criteria explicitly met

---

## Production Anti-Patterns

- Starting work on a deliverable without a declared definition of done
- Treating deadlines as flexible without explicit instruction
- Assuming a dependency is resolved without confirmation
- Inventing or shortcutting approval flows
- Introducing undeclared vendor or platform dependencies
- Marking a deliverable done before all criteria are met
- Resolving blockers silently with assumptions

---

## Phase Completion Checklist

- [ ] All deliverables have declared definitions of done
- [ ] All dependencies between deliverables are declared and resolved or flagged
- [ ] Approval flows match the declared flow documents
- [ ] All external vendors and platforms declared as integrations
- [ ] All blockers flagged with explicit blocking statements
- [ ] Quality thresholds verified against `_concerns/`
- [ ] All deliverable documents updated to reflect current state
- [ ] Progress logged in `.playbook/kit/04-progress.md`
