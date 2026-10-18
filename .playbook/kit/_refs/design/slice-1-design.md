---
file: '.playbook/kit/_refs/design/slice-1-design.md'
responsibility: 'Design for slice 1 of the context architecture: interface cards (E1), generated registry (E2), indexed history (E6), applied first to the Playbook repo itself.'
ai_instructions: 'Design only. Implement nothing until the person approves a step in section 8. Record approvals in kit/04-progress.md and ticket each approved step in kit/05-kanban.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ when slice 1 is shipped.'
---

# Slice 1 — Cards, Registry, Indexed History

Full path (output copy): `/mnt/user-data/outputs/playbook-kit/slice-1-design-cards-registry-history.md`
Date: 2026-10-15 · Status: design for approval · Builds on `pipeline-context-architecture-proposal.md`

## 1. Which domain is Playbook, besides software?

**Writing and Editorial is the primary domain.** About 92% of the repo by size is written language with an audience (578 KB of Markdown against 50 KB of JavaScript): guides, templates, vocabulary packs, flows, contracts, prompts, and the kit files. The writing pack fits point for point:

| Writing pack concept | Playbook equivalent |
|---|---|
| `piece` with required `angle` and `audience` | a guide, template, flow, or contract (audience: human, AI, or both) |
| `coordinator` (series or publication) | each folder `_index.md` (guides, templates, vocabulary, flows, contracts) |
| `concern` (voice, tone, formatting) | frontmatter standard, plain-language-first rule, rule IDs |
| Editorial decisions are permanent once published | settled decisions in `02-exploration.md` |
| Structural decisions made at Mapping, not Work | flows agreed before contracts, contracts before planning docs |
| Never invent citations (`[SOURCE NEEDED]`) | "no invented content" (global contract §10) |

**Software stays as a second, scoped domain** for `packages/` (the CLI, build scripts, drift check). Manufacturing is the nearest analogy for the build step (source files are parts, builds are assembly, `check:drift` is inspection) but it describes the process, not the output, so I would not use it as a pack.

**What this exposes:** today a project has one domain, chosen once at `init`. The repo's own contracts even declare `project-type: software`. Playbook-the-project needs **one pack per area** (writing for `playbook/` and `docs/`, software for `packages/`). That becomes part of slice 1 (section 5). It is also a real finding for the other domains: any mixed project (a book with a website, a product with documentation) has the same need.

## 2. Decisions recorded

| # | Decision (from the person, 2026-10-15) |
|---|---|
| 1 | Cards live in each doc's frontmatter; the registry is generated |
| 2 | Registry is a markdown table with a JSON copy |
| 3 | Routes live in a separate `routes.md`, referenced from `_index.md` (or where necessary) |
| 4 | Manual instructions for every step, automated wherever possible; existing and new projects carry equal weight |
| 5 | First slice: E1 + E2 + E6, in that order |

## 3. What the repo looks like (measured 2026-10-15)

117 Markdown files in the repo's own tree (generated copies and `_to_delete/` excluded), 540 KB.

| Area | Files | Have four-field block | No frontmatter | KB |
|---|---|---|---|---|
| library: reference docs | 23 | 0 | 23 | 50 |
| meta: contracts | 9 | 9 | 0 | 37 |
| meta: flows | 8 | 8 | 0 | 38 |
| meta: kit (process) | 8 | 7 | 0 | 122 |
| meta: `.playbook` root | 3 | 3 | 0 | 18 |
| meta: docs (standards, rewrite) | 5 | 1 | 3 | 47 |
| template: guides | 8 | 8 | 0 | 33 |
| template: vocabulary packs | 17 | 8 | 0 | 33 |
| template: doc templates | 6 | 1 | 0 | 6 |
| template: docs (flows, contracts, standards) | 10 | 4 | 3 | 74 |
| template: kit | 8 | 8 | 0 | 13 |
| template: `.playbook` root + concerns | 7 | 4 | 3 | 35 |
| packages + root readmes | 5 | 0 | 4 | 30 |
| **Total** | **117** | **61** | **36** | **540** |

Notes: the 23 library docs carry `id`/`type`/`kind`/`status` in a mid-file block, not valid frontmatter, so they count as none; 20 more files have frontmatter in another shape (doc templates, standards, `SKILL.md`). `responsibility` is present on all 61 four-field files: median 117 characters, 90th percentile 186, 27 of 56 over 120.

## 4. E1 — the interface card

**Reuse `responsibility` as the one-line summary.** It already exists on 61 files; adding a second summary field would duplicate it. The card is the existing four-field block plus six fields:

| Field | Meaning | Rule |
|---|---|---|
| `file` | repo-relative path | must equal actual path (checked) |
| `responsibility` | what this unit is, one line | ≤160 chars (14 files need tightening) |
| `ai_instructions` | how an AI should use *this* file | unchanged; not part of L1 |
| `archive_rule` | when it moves | unchanged |
| `id` | unique, stable, kebab-case | prefix by area: `tpl-`, `lib-`, `flow-`, `ctr-`, `pkg-` |
| `type` | unit type | from the area's pack (section 5) |
| `status` | `draft` · `approved` · `active` · `deprecated` | enumerated |
| `needs` | ids this unit depends on | resolvable (checked); replaces `UPSTREAM_DEPENDENCIES`, `connects`, `concerns` |
| `provides` | what neighbours get, one line | optional for kit/state files |
| `invariants` | up to 3 things that must stay true | replaces `CORE_SYSTEM_INVARIANTS` |
| `done-when` | observable check | required before `status: approved` |
| `parent` | containing unit id | optional |

**Computed, never written:** downstream impact, children, reverse `needs`.
**Dropped:** `MODULE_ID` (duplicates `id`), `SYSTEM_CONTEXT` (parent + `responsibility`).
**Pack-specific extras stay in the pack:** software `layer`; writing `angle`, `audience`; production `deadline`; manufacturing `specification`.
**L1 = `responsibility` + `provides` + `needs` + `invariants` + `done-when`, ≤600 B.**
**Exception:** `packages/playbook-skill/SKILL.md` keeps its own frontmatter (the claude.ai upload allows only certain keys); it is registered from a sidecar entry, not given a card.

## 5. Packs per area

`playbook.config.json` at the project root maps areas to packs:

```json
{ "areas": [
  { "path": "playbook",  "domain": "writing"  },
  { "path": "docs",      "domain": "writing"  },
  { "path": "packages",  "domain": "software" }
] }
```

A unit's `type` must belong to its area's pack. A single-domain project has one line. `init` keeps asking for a domain and writes the one-line config, so nothing changes for people who never need two.

## 6. E2 — the registry (sharded)

A flat registry of 117 lines at about 300 B is ≈33 KB, too big to load wholesale. So the registry is itself a deep module: one small root file, one file per area, loaded only when a route touches that area.

```
.playbook/_registry.md                  root: one line per area (≤1.5 KB)
<area>/_registry.md                     one line per unit (≤6 KB; split an area deeper when it exceeds that)
.playbook/_registry.json                flat twin for tools; AI does not load it by default
```

Root line: `area | path | pack | units | KB | registry`.
Unit line: `id | type | status | path | responsibility | needs | bytes` — `bytes` lets a route price a load before making it. **L0 budget is now ≤300 B per line** (I proposed 200 B earlier; the measured `responsibility` lengths make that unrealistic without losing meaning).

**How it is produced**
- *Automated:* `create-playbook index` reads every card, validates it, and writes both files. A zero-dependency copy ships at `.playbook/tools/index.mjs` for projects without the CLI.
- *Manual:* a guide (`guides/registry-manual.md`) gives the exact column format and the update steps; `00-prompts.md` gets a "rebuild the registry" prompt for upload-only tools.
- *Existing projects:* `create-playbook index --suggest` proposes a card for every file lacking one (id from path, type from folder, `responsibility` from the first heading line) and `--write` applies it after the person reviews. New projects get cards from the templates.
- Both paths produce the same bytes (verified by `check:drift`-style test).

## 7. E6 — indexed history

Goal: resume reads state, not the log.

| File | Today | After |
|---|---|---|
| `01-process.md` | state, ≈1.5 KB | stays; budget ≤2 KB |
| `04-progress.md` | 53 KB, append-only, all history | rolling current window only (≤8 KB); older months move to `_archives/progress/YYYY-MM.md` |
| `_history.md` (new, generated) | none | one line per entry: `id | date | tag | tickets | first sentence | file#anchor` |
| `05-kanban.md` | 31 KB incl. all Done | active tickets only (≤5 KB); Done → `_archives/kanban/`, indexed the same way |
| `02-exploration.md` | decisions inline | decision headings already carry date + title; generated into the same index |

The generator needs no rewrite of existing entries: it takes the tag (`Decided`/`Completed`/`Fixed`) and the first sentence of each bullet. **Resume route** becomes `entry + state + active kanban + current window`; history is queried by line, then opened by anchor.

Estimated resume load for this repo: ≈110 KB → ≈25 KB (root `_index` 6 + state 2 + kanban ~5 + window ~8 + standards pointer). To be re-measured once built.

## 8. Build order — each step needs your approval

| Step | Deliverable | Where | Verifies |
|---|---|---|---|
| S1 | Card schema + `type` lists per pack, written as the schema doc and updated `component`/`piece`-style templates | `playbook/` (template source) | templates validate against schema |
| S2 | Index generator (`index.mjs`, then `create-playbook index`) with `--suggest`/`--write`; unit tests on fixtures | `packages/create-playbook/` + manifest | output identical across CLI and zero-dep copy |
| S3 | Dogfood: add cards to the 117 files in Playbook itself (writing for `playbook/`+`docs/`, software for `packages/`), generate registries | repo root | every `needs` resolves; budgets met |
| S4 | History generator + archive roll-over for progress and kanban; apply to this repo's kit | `.playbook/kit/` | resume load measured against 25 KB estimate |
| S5 | `routes.md` skeleton and entry-file pointers (full routes are slice 2) | `.playbook/`, template | route loads match budget |
| S6 | Manual guide + prompts for upload-only tools; migration guide for existing projects | `guides/`, `00-prompts.md` | a manual run reproduces the generated registry |
| S7 | Rebuild generated copies, `pnpm check:drift`, scaffold all four domains | packages | no drift; scaffolds pass the checker |

Recommended order: S1 → S2 → S3 (proves it on real content before anything ships), then S4, S5, S6, S7.

## 9. Answers (2026-10-15)

1. **Domain:** confirmed. Writing primary, Software scoped to `packages/`.
2. **`responsibility` cap:** 160 characters.
3. **Library docs (23):** yes, real frontmatter. All documents that should have frontmatter get it.
4. **Kit files:** state, outside the registry. Their shape is governed by `kit-charter-proposal.md`, which now precedes S1.
5. **`id` prefixes:** accepted where the pipeline needs them.

## 10. Risks

- **Cards drift from bodies.** S2's validator (required fields, resolvable `needs`, `done-when` before approval, path match) is the control; without it this adds a new place to be wrong.
- **Mixed packs** are new behaviour; S3 is the first real test of them.
- **Only software has been verified end to end.** The writing mapping in section 1 is my reading of the pack against this repo; S3 is where it is proven.
- **Estimates** (resume ≈25 KB, registry sizes) are calculated from current file sizes and need re-measuring after S3–S4.
