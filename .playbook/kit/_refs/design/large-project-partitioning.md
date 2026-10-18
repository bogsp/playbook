---
file: '.playbook/kit/_refs/design/large-project-partitioning.md'
responsibility: 'Design for K-54: how a large project is split into parts so a task loads only its own neighbourhood, tested on four example projects.'
ai_instructions: 'Design only. Implement nothing until the person approves the decisions in section 8. Record approvals in kit/04-progress.md and 02-exploration.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ once the design is built into the templates (T-07).'
owner: playbook
status: draft
---

# Large-Project Partitioning (K-54)

Draft 2026-10-19. Builds on the slice-1 design (cards, sharded registry, routes) and the Kit Charter. Structure and templates only; no scripts.

## 1. The promise

**What a task loads depends on the task's neighbourhood, not on the size of the project.** A project with 30 units and one with 3,000 should cost about the same to work on, as long as the parts are drawn well.

Target: a working task loads **about 30 KB** (about 8,000 tokens), and a task that crosses one boundary loads **about 5 KB more**.

Measured sizes used below (template files today): entry `_index.md` 3.7 KB, `rules.md` 7.9 KB, `01-process` ≤2 KB. Together the **base load is about 14 KB**. Estimated: area state 3 KB, registry line 0.3 KB, interface card (L1) 0.6 KB, a typical planning-doc body 2–3 KB, a standards or contract section 1.5–6 KB.

## 2. Five mechanisms

| # | Mechanism | In one line |
|---|---|---|
| M1 | **Areas** | A named part of the project with its own folder, domain pack, registry shard and (optionally) kit slice. Areas nest, but only when size forces it. |
| M2 | **Area slice** | The same kit files, scoped to one area. The root kit keeps only what crosses areas. |
| M3 | **Shared units** | Facts and specs many areas use (canon, schemas, materials) live once in `_shared/`, one owner, referenced by id. |
| M4 | **Interface units** | The only thing another area may depend on. A reader loads the card and one section, never the other side's body. |
| M5 | **Snapshots** | At a milestone, an area writes a short "state at the end" unit. Later parts read the snapshot, not the earlier work. |

**The boundary rule** (new rule D3): *reference another area only through its interface units, shared units or snapshots. Needing another area's body means its interface is incomplete: fix the card, do not widen the read.* This is the existing deep-module rule, applied across areas.

## 3. Structure

```
playbook.config.json             areas: path, domain, parent, standards, status
.playbook/
  _index.md  rules.md            entry and rules (constant size)
  kit/                           root slice: cross-area state, decisions, tickets, milestones
  _registry.md                   one line per OPEN area (≤1.5 KB)
  _shared/                       shared units (one card each), registered in the root shard
  <area>/
    _index.md                    area coordinator
    _registry.md                 one line per unit in this area (≤6 KB, else split a sub-area)
    kit/01-process 03-execution 04-progress     the area slice (02, 05, 06 only if needed)
    <planning docs>              pieces, components, parts, each with a card
  _archives/areas/<period>.md    closed areas, one line each
```

Rules of thumb:
- **Split by seam, not by size alone.** Split an area when its shard passes about 6 KB (roughly 20 units) or its slice goes over budget, and cut where the fewest `needs` cross.
- **Log where it happened.** An area's events go in its own `04-progress`. The root log gets milestones and cross-area decisions only, one line each.
- **Root kit stays constant.** Its `01-process` holds an `Areas:` table (`area | state | next`), so the base load does not grow with the project.
- **Area lifecycle:** `open` → `closed` (Handoff done) → `archived`. The root registry lists open areas only.

## 4. What a reference costs

| Reference | What the reader loads | Cost |
|---|---|---|
| `needs` within an area | neighbour card (L1) | 0.6 KB |
| Shared unit | its card; the body only if the task touches it | 0.6 KB (+2) |
| Another area's interface | interface card + one contract section | about 2 KB |
| An earlier part's outcome | its snapshot | ≤3 KB |
| Another area's body | not allowed (rule D3) | none |
| "What does changing X touch?" | list of lines whose `needs` name X, from the registries | 0.3 KB per dependant; bodies stay closed |

## 5. What this adds to the slice-1 card and config

| Addition | Why |
|---|---|
| Config: `parent`, `status`, `standards` per area | nesting, lifecycle, and a per-area standards file (the C11 engine and the Rust shell need different ones) |
| Config: `template` per area (optional) | areas that repeat (see example 4) are created from a template |
| Card: `work` (path of what the unit governs or produces) | in a project the unit is a plan; the product is elsewhere (a chapter file, a source folder) |
| Card: `type: interface \| shared \| snapshot` | the three kinds M3–M5 need; each pack adds its own words for them |
| Rule D3 in `rules.md` | the boundary rule |
| Unit ids prefixed by area | `book2-ch14`, `crm-contact-api`; stable across moves |

Nothing else changes: `needs` already crosses areas by id, and reverse impact is still computed, never written.

## 6. Test: the four examples

Each row is a real task. Loads are estimates from the sizes in section 1.

### 6.1 Multi-book novel (three books, 30 chapters each, a shared world)

Areas: `book1`, `book2`, `book3` (writing pack, one sub-area per part when a book passes 20 chapters). Shared units: one per character, place, rule and the timeline, plus the voice concern. Each book ends with a snapshot unit ("state of the world at the end of book N").

| Task | Loads | Total |
|---|---|---|
| Draft chapter 14 of book 2 | base 14 + book2 slice 3 + part shard 3 + chapter plan 2 + cards (previous chapter, two characters, a place, voice) 3 + book 1 snapshot 3 | **about 28 KB** |
| Continuity check: "did Mira already have the scar?" | base 14 + root registry 1 + the character unit with its dated ledger 2 | about 17 KB; no chapter opened |
| Change a character's age | base 14 + unit 2 + dependants list (about 40 lines) 12 | about 28 KB; chapters reviewed in batches, never all at once |

A flat registry of this project (240 units) is about 72 KB before any work starts. The character unit keeps a one-line-per-event ledger (`book1/ch12 | injured left arm`); book 2 reads it up to the point it needs.

**Finding:** the snapshot (M5) is what makes cross-book detail cheap. It is the existing Handoff milestone, applied to a part instead of the whole project.

### 6.2 Multi-module SaaS (platform, two apps, modules, add-ons)

Areas: `platform` (auth, billing, tenancy), `app-web`, `app-admin`, `crm`, `invoicing`, and add-ons as areas with `parent: platform`. Interface units: each module's API contract and each add-on extension point. Shared units: the data schema and design tokens, owned by `platform`.

| Task | Loads | Total |
|---|---|---|
| Implement a component in `crm` | base 14 + slice 3 + shard 4 + doc 3 + four cards 2.4 + contract section 1.5 + standards sections 6 | **about 34 KB** |
| Invoicing needs a customer field from `crm` | base 14 + invoicing slice 3 + shard 4 + doc 3 + crm interface card and section 2 + three cards 1.8 | about 28 KB; crm internals stay closed |
| Add an add-on | its area from the template; load the extension point's card and section | about 25 KB |

**Finding:** the extension point is just an interface unit with `invariants`; no new concept is needed. The ceiling is the standards load; per-area `standards` plus section ids keep it to about 6 KB.

### 6.3 Biomimetic AI (C11 engine, Rust shell, text/audio/image/video input)

Areas: `engine` (software, C11 standards), `shell` (software, Rust standards), `input` with sub-areas `text`, `audio`, `image`, `video`, and `brain-model` (research notes and the design mapping from biology to modules). Interface units: `engine-abi` (owned by `engine`), `input-event` (the normalised event every input produces). Shared units: the biological-mapping concern and the real-time and memory-ownership invariants.

| Task | Loads | Total |
|---|---|---|
| Add a video decoder in `input/video` | base 14 + slice 3 + shard 3 + doc 3 + `input-event` and `engine-abi` cards with sections (4.2 KB) + two cards 1.2 + C standards sections 6 | **about 34 KB** |
| Change the ABI | base 14 + the `engine-abi` unit 3 + dependants list (shell and four inputs) 1.8 + their cards 3 | about 22 KB |
| Explore the brain-model mapping | base 14 + `brain-model` slice 3 + shard 2 + the notes asked for 4 | about 23 KB; no code area loaded |

**Finding:** the invariants on the interface card (ownership, thread safety, latency budget) are the main protection here. They sit in the 0.6 KB card, so every neighbour sees them without opening the engine. This needs the per-area `standards` entry, otherwise the Rust shell would load the C standards.

### 6.4 3D-printing prototyping service (intake, quoting, printing, QA, delivery, customer jobs)

Areas: `service` (production pack: intake, quoting, scheduling, QA, delivery), `catalog` (manufacturing pack: materials, print profiles, printer capabilities), `portal` (software, the customer site), and **`jobs`**, an area whose children are one area per customer job, made from a job template. Shared units: material specs, printer tolerances, pricing rules, safety rules.

| Task | Loads | Total |
|---|---|---|
| Quote a prototype | base 14 + service slice 3 + shard 3 + quote doc 3 + material, printer and pricing cards 1.8 | **about 25 KB** |
| Start a new job | base 14 + job template 3 + one registry line | about 18 KB |
| Work on job `j-0412` | base 14 + job slice 3 + its shard 2 + the part spec 2 + material and printer cards 1.2 | about 22 KB |

**Finding:** some areas repeat, 500 a year. The design needs the **area lifecycle** (open, closed, archived) and an **area template**, or the root registry grows without limit. With them, the root registry has one `jobs` line, and `jobs/_registry.md` lists only open jobs (about 100 fit in 6 KB). Closed jobs roll over to `_archives/areas/<year>.md`.

## 7. Findings

| # | Finding | Handled by |
|---|---|---|
| F1 | Every task in all four examples lands at 17–34 KB, against 60–110 KB today and 70+ KB for a flat registry | M1–M5 |
| F2 | Cross-part detail is cheapest through snapshots and shared units, not through reading earlier work | M3, M5 |
| F3 | Repeating areas (jobs, releases, issues) need a lifecycle and a template | section 3, `template` in config |
| F4 | Mixed-language projects need standards per area | `standards` in config |
| F5 | Shared units have wide impact. Listing dependants is cheap; reviewing them is not | change a shared unit only through a decision (`D-nn`), and review dependants in batches |
| F6 | Per-area kit slices could multiply files | default slice is three files (01, 03, 04); 02, 05, 06 only when the area needs them |
| F7 | Without a checker, the boundary rule is a convention, so a project can quietly reach into another area | accepted for now; the check comes with the code phase (D-19) |

**Limits of this test.** The loads are arithmetic on measured template sizes, not a run on a real project. The domain-pack words (snapshot for a book, extension point for a module) are my reading of each pack and need your check when the packs are reviewed (T-08).

## 8. Decisions needed

1. **Area slice:** the same kit files, scoped per area, default 01 + 03 + 04. OK?
2. **Root registry lists open areas only;** closed areas move to `_archives/areas/`. OK?
3. **Add** `work` and the three unit kinds (`interface`, `shared`, `snapshot`) to the card, and `parent`, `status`, `standards`, `template` to the area config. OK?
4. **Repeating areas (example 4):** design the template now, or leave it to the domain-pack review (T-08)?
5. **Rule D3** (the boundary rule) goes into `rules.md` as a Dependencies rule, active in both modes. OK?

If you approve, the next step is T-07: the card schema and the planning-doc templates, with these additions built in.
