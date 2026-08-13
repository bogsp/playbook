---
file: '.playbook/vocabulary-software/templates/_index.md'
responsibility: 'Entry point for software-domain planning document templates — structure, sequencer, component. Concern and integration use the universal templates unchanged.'
ai_instructions: 'Read before authoring any software planning document. Copy the matching file from this folder as a starting point.'
archive_rule: 'N/A — core domain reference file.'
---

# Software Planning Document Templates

Three of the five planning document types have software-specific shapes.
Each carries a `layer` field — see `clean-architecture-planning-layout` in
`@bogsp/playbook-software-library` if the library is installed.

| Type | File | Layer field |
|---|---|---|
| `structure` | [structure.md](structure.md) | Yes |
| `sequencer` | [sequencer.md](sequencer.md) | Yes (`application`) |
| `component` | [component.md](component.md) | Yes |

`concern` and `integration` do not vary by domain — use
[../../templates/concern.md](../../templates/concern.md) and
[../../templates/integration.md](../../templates/integration.md) directly.

---

## Layer Reference

| Layer | Owns | May depend on | Must not depend on |
|---|---|---|---|
| `domain` | Business rules, data shapes | Nothing project-specific | Everything else |
| `application` | Use cases, coordination | Domain, declared ports | Infrastructure, interface |
| `infrastructure` | Connections to outside systems | Application ports, domain types | Interface |
| `interface` | HTTP, CLI, UI, entry points | Application | Infrastructure internals |

The declared `layer` must match both the file location and what the code
is allowed to import. If they disagree, the document stays `status: draft`
until resolved.
