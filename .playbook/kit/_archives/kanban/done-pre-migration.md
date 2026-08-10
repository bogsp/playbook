---
file: '.playbook/kit/_archives/kanban/done-pre-migration.md'
title: 'Pre-Migration Completed Kanban Tickets'
date_range: '2026-08-10 to 2026-08-11'
phase: 'Planning (Meta-Repo Map)'
archived_date: '2026-08-11'
reason: 'Archived tickets that were explicitly resolved or rendered obsolete by the Meta-Repo structural decisions. They no longer gate active work.'
---

### [K-02] De-duplicate template sources

**Type:** SYNC
**Description:** `templates.md` and the `templates/` folder both define the same five document types with slightly different frontmatter.
**Resolution:** Resolved by meta-repo architecture. Internal templates live in `.playbook/`, distributable ones in `playbook/`.

### [K-08] Scope `@bogsp/playbook-software-library` into the plan

**Type:** DDA
**Description:** Fully shipped (v1.3.0, published-ready) but absent from execution/exploration logs. Needs a planning doc or decision.
**Resolution:** Resolved by meta-repo architecture. Explicitly scoped and mapped into the new `packages/` directory as a publishable package.

### [K-09] Scope the C11 engine / Rust shell subproject

**Type:** DDA
**Description:** `docs/code-standards-c.md` and `docs/code-standards-rust.md` reference engine/shell folders that don't exist anywhere in `_index.md` or `.kit/`.
**Resolution:** Resolved by meta-repo architecture. Explicitly scoped out and discarded as legacy bloat; they do not exist in the locked directory map.
