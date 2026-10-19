---
file: '.playbook/templates/_index.md'
responsibility: 'Entry point for planning document templates, and the definition of the card every planning document carries.'
ai_instructions: 'Read before authoring or editing any planning document. Check vocabulary-[domain]/templates/_index.md first; if the type is listed there, use that version.'
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

## The Card

Every planning document begins with a card in its frontmatter. The card tells a neighbour what the document is without opening it. A reader loads the card (about 600 bytes) and the body only when working on that document.

| Field | Meaning | Rule |
|---|---|---|
| `file` | the document's path | matches the real path |
| `responsibility` | what this document is, in one line | 160 characters or fewer |
| `id` | unique and stable | kebab-case, prefixed with its area: `crm-contact-api` |
| `type` | the kind of document | one of the types above, or the domain's own |
| `status` | `draft` · `approved` · `active` · `retired` | `retired` means finished or replaced: archive it (see Planning Documents in [maintenance.md](../maintenance.md)) |
| `parent` | the document that coordinates this one | optional |
| `needs` | ids this document depends on: other documents, concerns, integrations, a milestone summary | every id exists |
| `provides` | what neighbours get, in one line | |
| `invariants` | up to three things that must stay true | the body may hold more |
| `done-when` | an observable check | `TODO` until set; required before `approved` |

Type-specific fields follow the card: `scope` on `structure` and coordinators, `kind` and `docs` on `integration`, and the fields each domain adds (`layer`, `angle`, `audience`, `deadline`, `specification`).

**Never written:** children, downstream impact and who uses a document. Find them by searching for its id in `needs` and `parent`.

**Where a dependency is declared**
- A document lists its own `needs` once. The area's coordinator lists what applies to the whole area (a style guide, the code standards, a shared concern) and its documents do not repeat it.
- Across areas, depend on a contract, a document in `_shared/`, or a milestone summary, never on another area's body (rule D3 in [rules.md](../rules.md)).

Everything that is not a planning document (kit files, flows, contracts, guides, READMEs) carries the purpose block instead: see Frontmatter in [maintenance.md](../maintenance.md).

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
