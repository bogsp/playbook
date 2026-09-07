---
file: '.playbook/vocabulary-writing/templates/_index.md'
responsibility: 'Entry point for writing-domain planning document templates — coordinator, piece. Concern and integration use the universal templates unchanged.'
ai_instructions: 'Read before authoring any writing planning document. Copy the matching file from this folder as a starting point.'
archive_rule: 'N/A — core domain reference file.'
---

# Writing Planning Document Templates

Two of the five planning document types have writing-specific shapes.

| Type | File | Required fields |
|---|---|---|
| `coordinator` | [coordinator.md](coordinator.md) | — |
| `piece` | [piece.md](piece.md) | `angle`, `audience` |

`concern` and `integration` do not vary by domain — use
[../../templates/concern.md](../../templates/concern.md) and
[../../templates/integration.md](../../templates/integration.md) directly.
In this domain, `concern` typically covers voice, tone, and formatting
standards; `integration` covers external sources or research tools.

---

## Field Reference

A `piece` does not leave `status: draft` until both `angle` and `audience`
are filled in, per `vocabulary-writing/AI-INSTRUCTIONS.md` rule 1.
