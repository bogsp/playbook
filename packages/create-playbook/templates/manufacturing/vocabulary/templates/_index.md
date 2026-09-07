---
file: '.playbook/vocabulary-manufacturing/templates/_index.md'
responsibility: 'Entry point for manufacturing-domain planning document templates — coordinator, part. Concern and integration use the universal templates unchanged.'
ai_instructions: 'Read before authoring any manufacturing planning document. Copy the matching file from this folder as a starting point.'
archive_rule: 'N/A — core domain reference file.'
---

# Manufacturing Planning Document Templates

Two of the five planning document types have manufacturing-specific
shapes.

| Type | File | Required fields |
|---|---|---|
| `coordinator` | [coordinator.md](coordinator.md) | — |
| `part` | [part.md](part.md) | `specification`, `definition-of-done` |

`concern` and `integration` do not vary by domain — use
[../../templates/concern.md](../../templates/concern.md) and
[../../templates/integration.md](../../templates/integration.md) directly.
In this domain, `concern` typically covers tolerances, compliance, and
safety standards; `integration` covers suppliers or external processes.

---

## Field Reference

A `part` is not marked done until every `definition-of-done` criterion is
explicitly verified, per `vocabulary-manufacturing/AI-INSTRUCTIONS.md`
rule 8. `specification` is non-negotiable.
