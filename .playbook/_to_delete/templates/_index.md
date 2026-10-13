---
file: '.playbook/templates/_index.md'
responsibility: 'Entry point for the five universal planning document templates — structure, coordinator, component, concern, integration. Domain vocabularies override structure/coordinator/component with their own shapes; concern and integration are used directly by every domain.'
ai_instructions: 'Read before authoring any planning document that has no domain-specific override. Check the relevant vocabulary-[domain]/templates/_index.md first — if the type is listed there, use that version instead of this one.'
archive_rule: 'N/A — core reference file.'
---

# Universal Planning Document Templates

The five planning document types, in their domain-agnostic form. A project
with no domain vocabulary selected (`domain: none`) uses these directly.
A project with a domain vocabulary selected uses these only for the types
that domain doesn't override.

| Type | File | Overridden by domain? |
|---|---|---|
| `structure` | [structure.md](structure.md) | Yes — software only (adds `layer`) |
| `coordinator` | [coordinator.md](coordinator.md) | Yes — software (as `sequencer`), writing, production, manufacturing |
| `component` | [component.md](component.md) | Yes — software only (adds `layer`) |
| `concern` | [concern.md](concern.md) | No — used directly by every domain |
| `integration` | [integration.md](integration.md) | No — used directly by every domain |

---

## Resolving Which Template to Use

1. Check `vocabulary-[domain]/templates/_index.md` for the current project's domain
2. If the type is listed there, use that file — it carries domain-specific fields (e.g. `layer` for software, `angle`/`audience` for writing)
3. If the type is not listed there (always true for `concern` and `integration`, sometimes true for others in a given domain), use the matching file in this folder

`domain: none` projects always use this folder directly for all five types.

---

## Domain Vocabulary Index

| Domain | Templates folder |
|---|---|
| Software | `../vocabulary-software/templates/_index.md` |
| Writing | `../vocabulary-writing/templates/_index.md` |
| Production | `../vocabulary-production/templates/_index.md` |
| Manufacturing | `../vocabulary-manufacturing/templates/_index.md` |

---

## Detail

This folder is the retirement target for the former monolithic
`templates.md` (K-33). All five types previously defined there now have
their own file here, matching the one-file-per-thing convention already
used in `_concerns/`, `_integrations/`, `_solutions/`, `docs/flows/`, and
`docs/contracts/`.
