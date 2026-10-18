---
file: '.playbook/kit/_refs/design/context-architecture.md'
responsibility: 'Proposal: apply Progressive Disclosure and Deep Modules to Playbook itself, so an AI gets exactly the context a task needs, per phase and domain, through cheap predictable paths.'
ai_instructions: 'Proposal only. Implement nothing until the person approves an element. Record decisions in kit/04-progress.md and re-ticket approved elements in kit/05-kanban.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ once every element is decided.'
---

# Playbook Context Architecture — Deep Modules and Progressive Disclosure

Full path (output copy): `/mnt/user-data/outputs/playbook-kit/pipeline-context-architecture-proposal.md`
Date: 2026-10-15 · Status: proposal · Supersedes the focus of `pipeline-optimization-recommendations.md` (R1–R18 are process and enforcement; this is information architecture. Some R-items fold in below.)

## 1. What the repo does today (verified)

| Finding | Evidence |
|---|---|
| There is no per-phase or per-task read set. `pipeline.md` says "read as much or as little as you need"; `_index.md` routes by situation ("resuming", "adding a piece"), not by phase × task. | `pipeline.md` header; template `_index.md` "How to Use This File" |
| Planning docs have no cheap one-line identity. No Tier-1 template (0 of 14) carries the four-field block (`responsibility`, `ai_instructions`…) the Tiering Rule says they should. To know what a doc is, the AI must open it. | grep of `playbook/.playbook/templates/*` and `vocabulary-*/templates/*` |
| Relationships are hand-declared in both directions (`UPSTREAM_DEPENDENCIES` / `DOWNSTREAM_IMPACT`, `parent` / `children`, `connects` / `emits`). Reverse edges are a manual drift source and cannot be queried cheaply. | all five universal templates |
| The `Interface` section holds a pointer to a contract, not the interface. A neighbour must open two files to learn what a doc offers. | `templates/component.md` |
| The deep-module header uses software vocabulary (`MODULE_ID`, `SYSTEM_CONTEXT`, `CORE_SYSTEM_INVARIANTS`) and duplicates `id`, `parent`, `connects`. | same |
| Standards are monolithic. `code-standards-ts.md` is 38 KB in 15 sections of about 2.5 KB each, loaded whole; §14 (≈6 KB) restates Playbook rules. | `playbook/docs/code-standards-ts.md` |
| The entry file mixes rules with hand-maintained maps. The template `_index.md` is 14.4 KB (+4.9 KB domain index), loaded every session; Structure and Planning Documents sections are manual upkeep. | template `_index.md` |
| History is loaded as state. This repo's session start is ≈110 KB; ≈76% is `04-progress` + `05-kanban`. | wc -c, 2026-10-14 |

What already works and stays: the `What It Does / Interface / Detail` shape, folder `_index.md` entry points, per-domain vocabulary, the stage model, and the principle statement in `pipeline.md`. The gap is that the principle is stated but not wired into the files.

## 2. The model

**A deep module has a small interface and a large hidden body. A reader depends only on the interface.** Applied to context, every unit (planning doc, folder, standards file, kit file, history) gets four layers, and a task declares which layer of which unit it needs:

| Layer | What it is | Budget | Who reads it |
|---|---|---|---|
| **L0 — registry line** | one line: id · type · status · summary · needs | ≤200 B | every task (whole project in one file) |
| **L1 — interface card** | summary, provides, needs, invariants, done-when (frontmatter) | ≤600 B | neighbours of the task's target |
| **L2 — body** | What It Does, Interface detail, Detail | as needed | the target of the task only |
| **L3 — history** | progress, decisions, archives, superseded drafts | unbounded | on demand, by ID |

Rule that keeps it deep: **a task may read L2 only of its target, and L1 of its neighbours. Needing a neighbour's L2 means the neighbour's interface is incomplete — fix the card, do not widen the read.**

## 3. Elements

**E1. Interface card.** Replace the deep-module header and the scattered relationship fields with one lean, domain-neutral card in frontmatter: `id`, `type`, `status`, `summary` (one line), `provides`, `needs` (ids), `parent`, `invariants`, `done-when`, `contract`. Drop `MODULE_ID`, `SYSTEM_CONTEXT`, `UPSTREAM_DEPENDENCIES`, `DOWNSTREAM_IMPACT`, `children`, `connects`. Keep the four-field purpose block (which also fixes the missing-block gap). Domain templates add typed fields only (`layer`, `angle`, `deadline`, `specification`).

**E2. Generated registry (L0).** `.playbook/_registry.md` is built from the cards by one command; nobody edits it. It replaces the hand-maintained Structure map and Project Planning Documents lists in `_index.md`. A markdown table so upload-only tools can read it; a JSON twin for tools. At 50 docs ≈ 10 KB, and it is the *only* map the AI needs to choose what to open.

**E3. Context routes.** A table (task × phase → typed load set) shipped in the domain pack and the universal core. Example, `implement-unit` in software:
`state:L1 → registry → self:L2 → needs:L1 → concerns:L1 → contract#section → standards#sections(layer)`
A command prints the packet in order with its byte count; agents without the CLI follow the same recipe by hand. The route also states its **sufficiency test**: stop loading when the route is satisfied; anything more is a flagged exception.

**E4. Phase maps per domain.** Each domain pack states what each stage means and what its route loads. The core stays domain-free; the pack supplies names, artifacts, and standards:

| Stage | Software | Writing | Manufacturing |
|---|---|---|---|
| Discovery | brief, constraints | premise, audience | requirement, spec limits |
| Mapping | flows | outline, reader journey | process flow |
| Rules | contracts, standards | style guide | tolerances, safety rules |
| Planning | component docs | piece plans | part docs |
| Work | code against docs | drafts against plans | build against part docs |
| Route loads | self, needs, contract, layer standards | self, neighbouring pieces, style rules | self, needs, tolerances |

**E5. Sectioned standards.** Give every standards section a stable ID and make routes cite sections (`standards#error-handling`). Each domain pack has its own standards file (code standards, style guide, SOP). A typical task then loads 3–8 KB instead of 38 KB. De-duplicate §14 against the rules in `_index.md`.

**E6. History as an index.** `04-progress`, decisions, and kanban each get a one-line-per-entry index (`D-nn | date | one line | file`) with bodies in per-period files. A state file stays ≤2 KB and the resume route is `state + registry + open flags`. Writing each decision once (by ID) removes the three-way restatement seen today.

**E7. Interface-bounded change.** Reverse edges are computed from `needs`, never written. When a card's `provides` or `invariants` change, the dependents are listed automatically; when only the body changes, nothing ripples. This is the deep-module property made checkable, and it answers "what does changing X touch?" in one lookup.

**E8. Budgets as contract.** The layer budgets above, plus entry file ≤6 KB, folder `_index.md` ≤1.5 KB, state ≤2 KB. A checker enforces them (this is R4 from the earlier list, now with a purpose).

## 4. Expected effect (estimates, not measurements)

| Task | Today | Proposed |
|---|---|---|
| Resume, this repo | ≈110 KB | ≈25 KB (entry 6 + state 2 + registry ~6 + active board ~5 + standards pointer) |
| Implement one component, scaffolded software project | ≈60 KB+ (index 19 + standards 38 + doc) | ≈20–25 KB (entry 6 + state 2 + registry ~6 + self 2 + three neighbours 2 + 6 standards) |
| Author a planning doc | whole template folder + guides | registry + one template + contract section |

## 5. Decisions needed

1. **Source of truth for cards:** frontmatter in each doc, with a generated registry (recommended), or a registry-only file.
2. **Registry format:** markdown table as primary with a JSON twin (recommended), or JSON only.
3. **Route definition:** a table in each pack's `_index.md` (readable by AI and by the checker), or a separate `routes.md`.
4. **Backward compatibility:** a one-shot migration command for existing projects, or new-projects-only first.
5. **Order.** Recommended: E1 → E2 → E6 (together they remove most load and most drift), then E3/E4/E5, then E7/E8.

## 6. Risks and limits

- **Only software has been tested end to end.** The phase-map rows for writing and manufacturing are my reading of the domain templates, not validated by a real project.
- **Cards can themselves drift** from bodies. E8's checker (required `summary`, `done-when`, resolvable `needs`) is what keeps them honest; without it this adds a new place to be wrong.
- **Upload-only tools** cannot run the packet command. They rely on the registry plus the written route, which costs more attention but the same bytes.
- **Byte figures are estimates** from the current files; they need re-measuring after E1–E2 exist.
