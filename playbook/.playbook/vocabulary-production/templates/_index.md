---
file: '.playbook/vocabulary-production/templates/_index.md'
responsibility: 'Entry point for production-domain planning document templates — coordinator, deliverable. Concern and integration use the universal templates unchanged.'
ai_instructions: 'Read before authoring any production planning document. Copy the matching file from this folder as a starting point.'
archive_rule: 'N/A — core domain reference file.'
---

# Production Planning Document Templates

Two of the five planning document types have production-specific shapes.

| Type | File | Required fields |
|---|---|---|
| `coordinator` | [coordinator.md](coordinator.md) | — |
| `deliverable` | [deliverable.md](deliverable.md) | `deadline`, `done-when` |

`concern` and `integration` do not vary by domain — use
[../../templates/concern.md](../../templates/concern.md) and
[../../templates/integration.md](../../templates/integration.md) directly.
In this domain, `concern` typically covers quality thresholds, approval,
and compliance standards; `integration` covers external vendors or
platforms.

---

## Field Reference

A `deliverable` is not marked done until its `done-when` check is
explicitly verified, per `vocabulary-production/_index.md` rule 8. `deadline` is a hard
constraint — never treated as flexible without explicit instruction.
