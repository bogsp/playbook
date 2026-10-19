---
file: '.playbook/kit/_archives/templates/decision-record.md'
responsibility: 'Retired audit classify template. Live classify verdicts are D-nn files in kit/_refs/decisions/.'
ai_instructions: 'History only. Do not copy this into a project. K-57 / T-05.'
archive_rule: 'N/A. Archive file.'
owner: playbook
source: 'playbook/docs/rewrite/decision-record.md (git mv 2026-10-19)'
---

# Decision Record

# File: docs/rewrite/decision-record.md

> Output of the Reverse Engineer expansion - Phase 3 (Classify).
> Every major component receives one classification with reasoning.
> For large projects, split into docs/rewrite/decision-record/ with \_index.md.

---

## Summary

| Classification | Count |
| -------------- | ----- |
| Keep           | 0     |
| Align          | 0     |
| Extract        | 0     |
| Rewrite        | 0     |
| Replace        | 0     |
| Discard        | 0     |
| Defer          | 0     |
| Evaluate       | 0     |
| **Total**      | **0** |

---

## Decisions

One entry per major component.

### [Component Name]

**Classification:** Keep | Align | Extract | Rewrite | Replace | Discard | Defer | Evaluate

**What it does:**
Plain language - what this component currently does.

**Reasoning:**
Why this classification was chosen.

**Dependencies affected:**
What else is impacted by this decision.

**Risk:** low | medium | high | critical

---

_Classification definitions:_
_Keep - works as-is, no changes needed_
_Align - works but needs to conform to new architecture or standards_
_Extract - good logic in the wrong place - move it out cleanly_
_Rewrite - logic is wrong, unclear, or too coupled - rebuild from scratch_
_Replace - responsibility stays but the tool changes_
_Discard - no longer needed - remove entirely_
_Defer - decision not yet possible - needs more information_
_Evaluate - uncertain - needs investigation before classifying_
