---
file: '.playbook/kit/_refs/design/t07-review.md'
responsibility: 'Review of the T-07 draft (branch t07-cards) against D-12, D-16 and D-20: what is sound, findings F1-F9 with their decisions, and the merge steps.'
ai_instructions: 'Decisions are recorded in D-21. Apply nothing further unprompted (review-gate strict). F8 and F9 are open and ticketed as K-58.'
archive_rule: 'Archive to .playbook/kit/_archives/ once T-07 is merged and F8, F9 are closed.'
owner: playbook
status: decided
---

# T-07 Review (2026-10-19)

Scope read: card schema (templates/_index.md), 14 planning templates, rules.md (C11, D3), maintenance.md (Frontmatter, Planning Documents), vocabulary _index files. Not seen: CHANGELOG field map, scaffold.js, lib/generate.js.

## Sound

- Card fields match every one of the 14 templates; type-specific fields are present where stated.
- `retired` is used consistently in the card, rules C11, maintenance.md and D-20.
- C11 and D3 are in rules.md as designed in D-20.
- Reverse edges are not written anywhere, as designed.

## Findings and decisions (detail in D-21)

| # | Finding | Decision | Status |
|---|---|---|---|
| F1 | Cards drop ai_instructions and archive_rule | Dropped; C11 and `retired` replace archive_rule | applied |
| F2 | Meta docs say `status: archived` | Now `retired`, moved to `_archives/units/` | applied (3 files) |
| F3 | Registry and routes not on the branch | Not needed yet: no hand-kept registry, no routes.md; routes per pack in T-08 | applied (rules.md, maintenance.md wording) |
| F4 | Template count | 14 (5 + 3 + 2 + 2 + 2), 19 manifest files with the 5 indexes | log corrected |
| F5 | `scope` described on all coordinators | Reworded to "templates that have it" | applied |
| F6 | Placeholders not valid YAML | Quoted, bracket-prefixed; `parent` removed from the 2 structure templates | applied (14 templates) |
| F7 | Root _index.md points to the template's old rules section | Fix under T-11/T-12 | open |
| F8 | Root docs/rewrite/{system-map,decision-record,risk-register}.md are unfilled template copies in this repo's own docs | Delete or archive; decision-record is already K-57 | open, K-58 |
| F9 | Flows and contracts cite AI-INSTRUCTIONS.md rule numbers (flow-0, flow-5, flow-6 and their contracts); rules are now C/D/P IDs | Re-point to rule IDs | open, K-58 |

Also fixed: kit/01-process.md had an unclosed `entry-shape:` value.

## Check before merging

`lib/generate.js` and `lib/scaffold.js` were not available to me. If either matches template text as a whole line (for example `id: [module]-[kebab-case]`), the quoted placeholders will break the match. Run `create-playbook generate component` and a four-domain scaffold after `pnpm build` and read the output.

## Merge steps

1. Copy the delivered files onto `t07-cards` (paths mirror the repo).
2. `pnpm build`, then `pnpm check:drift` (playbook-skill/assets/ is committed and must match a fresh build).
3. Rescaffold the four domains; run `generate component`; read the output for the card fields.
4. `git checkout main && git merge --ff-only t07-cards && git push` (branch policy D-17).
5. Tick T-07 in 03-execution and clear `In flight:` in 01-process.
