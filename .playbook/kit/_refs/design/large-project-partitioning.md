---
file: '.playbook/kit/_refs/design/large-project-partitioning.md'
responsibility: 'Design for K-54: how a large project is split into parts so a task loads only its own neighbourhood, tested on four example projects.'
ai_instructions: 'Design, approved. Build it into the templates at T-07. Decisions are D-20 in 02-exploration.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ once the design is built into the templates (T-07).'
owner: playbook
status: approved
---

# Large-Project Partitioning (K-54)

Approved 2026-10-19 with the answers in section 8. Builds on the slice-1 design (cards, sharded registry, routes) and the Kit Charter. Structure and templates only; no scripts.

## 1. The promise

**What a task loads depends on the task's neighbourhood, not on the size of the project.** A project with 30 units and one with 3,000 should cost about the same to work on, as long as the parts are drawn well.

Target: a working task loads **about 30 KB** (about 8,000 tokens), and a task that crosses one boundary loads **about 5 KB more**.

Measured sizes used below (template files today): entry `_index.md` 3.7 KB, `rules.md` 7.9 KB, `01-process` ≤2 KB. Together the **base load is about 14 KB**. Estimated: area state 3 KB, registry line 0.3 KB, interface card (L1) 0.6 KB, a typical planning-doc body 2–3 KB, a standards or contract section 1.5–6 KB.

## 2. Five mechanisms and one principle

| # | Mechanism | In one line |
|---|---|---|
| M1 | **Areas** | A named part of the project with its own folder and domain pack. Areas nest, but only when size forces it; the nesting is the folder nesting, so no `parent` field is written. |
| M2 | **Area slice, on demand** | The root kit serves a project until an area outgrows it. Then that area gets its own `01-process`, `03-execution` and `04-progress`: same files, same budgets, same roll-over. The root keeps one `Areas:` line per area. |
| M3 | **Shared units** | A unit that lives in `_shared/` is shared. The location is the marker, so no type is needed. One owner; others reference it by id. |
| M4 | **Interfaces** | An area's contract (the existing contract doc) is its interface. The card's `provides` is the surface; the contract section is the detail. |
| M5 | **Milestone summaries** | At a milestone the area writes the existing milestone summary (`docs/rollout/`). A later part `needs` that summary instead of the earlier work. |

**The boundary rule (D3):** *reference another area only through its contract, its shared units or its milestone summary. Needing another area's body means its interface is incomplete: fix the card, do not widen the read.*

**The principle (C11), for every kind of file: current only.** A live file shows what is in use now. When something is finished, replaced or unused, it moves to `_archives/` and leaves one pointer line. This is how every kit file already works; it now covers planning documents, areas, flows, contracts and decisions too. The registry lists live units only.

**Slice trigger.** Create an area slice when the area's lines no longer fit the root files' budgets (for example its checklist pushes `03-execution` past 45 lines), or when two areas are active at once. Use the existing split step in `kit/00-guide.md`; nothing new to learn. A small project never meets this.

## 3. Structure

```
playbook.config.json             areas: path and domain (as in slice 1)
.playbook/
  _index.md  rules.md            entry and rules (constant size)
  kit/                           root kit: cross-area state, decisions, tickets, milestones
  _registry.md                   one line per area with live units (≤1.5 KB)
  _shared/                       shared units, one card each
  <area>/
    _index.md                    area coordinator (its card names the area's standards in `needs`)
    _registry.md                 one line per live unit (≤6 KB; else split a sub-area)
    kit/                         only when the area has outgrown the root kit
    <planning docs>              pieces, components, parts: one card each
  _archives/
    units/_index.md              one line per retired unit: id | date | what | replaced-by | path
```

Rules of thumb:
- **Split by seam, not by size alone.** Split an area when its shard passes about 6 KB (roughly 20 units), cutting where the fewest `needs` cross.
- **Log where it happened.** An area's events go in its own `04-progress` (or the root one if it has no slice). The root log gets milestones and cross-area decisions only.
- **Root kit stays constant.** Its `01-process` holds an `Areas:` line per slice (`area | state | next`).
- **Retire, do not accumulate.** `status: retired` means finished or replaced: the unit moves to `_archives/units/`, leaves the registry, and any `needs` still naming it is re-pointed.

## 4. What a reference costs

| Reference | What the reader loads | Cost |
|---|---|---|
| `needs` within an area | neighbour card (L1) | 0.6 KB |
| Shared unit | its card; the body only if the task touches it | 0.6 KB (+2) |
| Another area's interface | interface card + one contract section | about 2 KB |
| An earlier part's outcome | its milestone summary | ≤3 KB |
| Another area's body | not allowed (rule D3) | none |
| "What does changing X touch?" | list of lines whose `needs` name X, from the registries | 0.3 KB per dependant; bodies stay closed |

## 5. What this adds (and what it does not)

| Addition | Why |
|---|---|
| `status: retired` replaces `deprecated` | one word for finished or replaced; it is the archive trigger for units and areas |
| Rule **D3** in `rules.md` (Dependencies, always on) | the boundary rule |
| Rule **C11** in `rules.md` (Core, always on) | current only, for every kind of file |
| `needs` may name any unit, including a milestone summary | makes the milestone summary a normal reference |
| An area's standards are listed in its coordinator card's `needs` | the C11 engine and the Rust shell load different standards without a new field |
| `_archives/units/_index.md` | where retired units are found |

**Considered and dropped, because something existing already does the job:**

| Dropped | Why |
|---|---|
| `work` field (path of the product) | the `structure` doc already maps plans to folders; add it only if a pack turns out to lack that map |
| Unit types `interface`, `shared`, `snapshot` | the contract, the `_shared/` location and the milestone summary already are those things |
| Config fields `parent`, `status`, `standards`, `template` | folder nesting gives `parent`; the coordinator card gives `status` and `standards`; templates wait (below) |
| Area template for repeating areas | not needed to finish the generic structure; revisit in the domain-pack review (T-08) and only if a pack needs it |

Reverse impact is still computed from `needs`, never written.

## 6. Test: the four examples

Each row is a real task. Loads are estimates from the sizes in section 1.

### 6.1 Multi-book novel (three books, 30 chapters each, a shared world)

Areas: `book1`, `book2`, `book3` (writing pack, one sub-area per part when a book passes 20 chapters). Shared units: one per character, place, rule and the timeline, plus the voice concern. Each book ends with a milestone summary ("state of the world at the end of book N").

| Task | Loads | Total |
|---|---|---|
| Draft chapter 14 of book 2 | base 14 + book2 slice 3 + part shard 3 + chapter plan 2 + cards (previous chapter, two characters, a place, voice) 3 + book 1 summary 3 | **about 28 KB** |
| Continuity check: "did Mira already have the scar?" | base 14 + root registry 1 + the character unit with its dated ledger 2 | about 17 KB; no chapter opened |
| Change a character's age | base 14 + unit 2 + dependants list (about 40 lines) 12 | about 28 KB; chapters reviewed in batches, never all at once |

A flat registry of this project (240 units) is about 72 KB before any work starts. The character unit keeps a one-line-per-event ledger (`book1/ch12 | injured left arm`); book 2 reads it up to the point it needs.

**Finding:** the milestone summary (M5) is what makes cross-book detail cheap. It is the existing Handoff milestone, applied to a part instead of the whole project.

### 6.2 Multi-module SaaS (platform, two apps, modules, add-ons)

Areas: `platform` (auth, billing, tenancy), `app-web`, `app-admin`, `crm`, `invoicing`, and add-ons as areas with `parent: platform`. Interfaces: each module's API contract and each add-on extension point. Shared units: the data schema and design tokens, owned by `platform`.

| Task | Loads | Total |
|---|---|---|
| Implement a component in `crm` | base 14 + slice 3 + shard 4 + doc 3 + four cards 2.4 + contract section 1.5 + standards sections 6 | **about 34 KB** |
| Invoicing needs a customer field from `crm` | base 14 + invoicing slice 3 + shard 4 + doc 3 + crm interface card and section 2 + three cards 1.8 | about 28 KB; crm internals stay closed |
| Add an add-on | its first planning doc, the extension point's card and section | about 25 KB |

**Finding:** the extension point is just a contract with `invariants`; no new concept is needed. The ceiling is the standards load; per-area `standards` plus section ids keep it to about 6 KB.

### 6.3 Biomimetic AI (C11 engine, Rust shell, text/audio/image/video input)

Areas: `engine` (software, C11 standards), `shell` (software, Rust standards), `input` with sub-areas `text`, `audio`, `image`, `video`, and `brain-model` (research notes and the design mapping from biology to modules). Interfaces: `engine-abi` (owned by `engine`), `input-event` (the normalised event every input produces). Shared units: the biological-mapping concern and the real-time and memory-ownership invariants.

| Task | Loads | Total |
|---|---|---|
| Add a video decoder in `input/video` | base 14 + slice 3 + shard 3 + doc 3 + `input-event` and `engine-abi` cards with sections (4.2 KB) + two cards 1.2 + C standards sections 6 | **about 34 KB** |
| Change the ABI | base 14 + the `engine-abi` unit 3 + dependants list (shell and four inputs) 1.8 + their cards 3 | about 22 KB |
| Explore the brain-model mapping | base 14 + `brain-model` slice 3 + shard 2 + the notes asked for 4 | about 23 KB; no code area loaded |

**Finding:** the invariants on the interface card (ownership, thread safety, latency budget) are the main protection here. They sit in the 0.6 KB card, so every neighbour sees them without opening the engine. This needs each area's standards named in its coordinator card, otherwise the Rust shell would load the C standards.

### 6.4 3D-printing prototyping service (intake, quoting, printing, QA, delivery, customer jobs)

Areas: `service` (production pack: intake, quoting, scheduling, QA, delivery), `catalog` (manufacturing pack: materials, print profiles, printer capabilities), `portal` (software, the customer site), and **`jobs`**, an area whose children are one area per customer job. Shared units: material specs, printer tolerances, pricing rules, safety rules.

| Task | Loads | Total |
|---|---|---|
| Quote a prototype | base 14 + service slice 3 + shard 3 + quote doc 3 + material, printer and pricing cards 1.8 | **about 25 KB** |
| Start a new job | base 14 + the job's first planning doc 3 + one registry line | about 18 KB |
| Work on job `j-0412` | base 14 + job slice 3 + its shard 2 + the part spec 2 + material and printer cards 1.2 | about 22 KB |

**Finding:** some areas repeat, 500 a year. The design needs the **retire step** (finished jobs leave the registry and move to `_archives/units/`), or the root registry grows without limit. With it, the root registry has one `jobs` line, and `jobs/_registry.md` lists only live jobs (about 100 fit in 6 KB). An **area template** would make new jobs cheaper to start; it is deferred to the domain-pack review.

## 7. Findings

| # | Finding | Handled by |
|---|---|---|
| F1 | Every task in all four examples lands at 17–34 KB, against 60–110 KB today and 70+ KB for a flat registry | M1–M5 |
| F2 | Cross-part detail is cheapest through milestone summaries and shared units, not through reading earlier work | M3, M5 |
| F3 | Repeating areas (jobs, releases, issues) need a way to leave the live view | `status: retired` and `_archives/units/`; a template is deferred (T-08) |
| F4 | Mixed-language projects need standards per area | the area coordinator's `needs` |
| F5 | Shared units have wide impact. Listing dependants is cheap; reviewing them is not | change a shared unit only through a decision (`D-nn`), and review dependants in batches |
| F6 | Per-area kit slices could multiply files | slices exist only when an area outgrows the root kit (M2), and then hold three files |
| F7 | Without a checker, the boundary rule is a convention, so a project can quietly reach into another area | accepted for now; the check comes with the code phase (D-19) |

**Limits of this test.** The loads are arithmetic on measured template sizes, not a run on a real project. The domain-pack words (milestone summary for a book, extension point for a module) are my reading of each pack and need your check when the packs are reviewed (T-08).

## 8. Decisions (answered 2026-10-19)

| # | Question | Answer |
|---|---|---|
| 1 | Area slice | Not sure; the person asked for the optimum. **On demand**, same files and budgets, created by the existing split step when an area outgrows the root kit (M2). |
| 2 | Archive closed areas | **Yes, for every kind of file.** Only current information is visible: principle C11, `status: retired`, `_archives/units/`. |
| 3 | New card and config fields | **Only what is needed:** `retired` replaces `deprecated`; nothing else is added (section 5). |
| 4 | Repeating-area templates | Nothing redundant; build only what the current phase needs. **Deferred** to the domain-pack review. |
| 5 | Rule D3 | **D3 in the Dependencies group, always on**, plus C11 in Core. |

Next: T-07 builds this into the card schema, the planning-doc templates and `rules.md`.
