---
file: '.playbook/kit/_archives/exploration/decisions-pre-migration.md'
title: 'Pre-Migration Architectural Decisions'
date_range: '2026-05-06 to 2026-05-23'
phase: 'Execution (Legacy Pipeline Build)'
archived_date: '2026-08-11'
reason: 'Archived to clear the context window for the meta-repo directory restructure. These decisions governed the initial pipeline generation and are no longer actively gating current tasks.'
---

## Closed Decisions

**2026-05-23 — Progressive Disclosure + Tiering as Core Principle**

- Named as the default method for all structural decisions in the Playbook pipeline
- Progressive Disclosure: plain language first, technical depth below — same content, two audiences
- Tiering: define a required core, add sections only when scope or type demands it

**2026-05-23 — Playbook as Dev-Dependency**

- Playbook is present during development, invisible in production — like a linter or type checker
- `.playbook/kit/` stays at root — planning and ideation layer, drives the pipeline, not subordinate to it
- `docs/flows/` and `docs/contracts/` belong to the project — useful to anyone regardless of Playbook

**2026-05-23 — File Responsibility Boundaries**

- `.playbook/README.md` — orientation, journey matrix, pipeline at a glance. Points, never explains.
- `.playbook/pipeline.md` — what every stage is and why it exists. Reference, not tutorial.
- `.playbook/kit/01-process.md` — session spark only. Phase, last completed, next, active modules.
- `.playbook/kit/02-exploration.md` — active decisions only. Open topics and closed decisions.
- `.playbook/kit/03-execution.md` — guidelines, plan, acceptance criteria, tasks, known issues.
- `.playbook/kit/04-progress.md` — append-only log. Current phase entries only. Three types: Completed, Decided, Fixed.
- `.playbook/kit/05-kanban.md` — active tickets only. Work state registry.
- `.playbook/kit/06-qa.md` — test registry and sign-off only. Test detail lives in `_tests/`.

**2026-05-23 — Journey Matrix in README.md**

- Eight distinct journeys defined: New to Playbook, New project, Adopting existing (with kit), Adopting existing (without kit), Resuming project, AI dev session, AI from rollout, Looking up formats, Looking up prompts.

**2026-05-23 — Flow Taxonomy & Document Format**

- Scope types: Journey | Sequence | Operation | Composite | Compensation
- Trigger types: Request-Response | Event-Driven | Background/Scheduled | Reactive | Webhook | Stream
- Core sections required for every flow: What It Does, Pre-conditions, Post-conditions, Walkthrough.
- A flow cannot move to status: active while any required section is TODO

**2026-05-23 — Contract Required Sections**

- Flow contracts require: Happy Path, Failure Modes, Edge Cases, Concurrency Rules, Constraints.
- global.md requires: Architecture Rules, Auth Boundaries, Error Handling Rules, Audit Requirements, Cross-Cutting Constraints.
- All behavior lives in contracts. Component docs point, never contain behavior definitions.

**2026-05-23 — Component Doc Format Updates**

- Frontmatter field order: id, export, file, type, status, parent, children, connects, emits, concerns
- Interface format: language-agnostic contract notation + optional language-specific block

**2026-05-23 — .playbook/kit/ Folder Structure & Responsibilities**

- `_refs/` — supporting material referenced by 02-exploration.md (video-insights/, templates/, examples/, snippets/)
- `_tests/` — one file per QA test case, referenced by 06-qa.md
- `_archives/` — lean history, never deleted, moved not removed (exploration/, progress/, kanban/)

**2026-05-23 — Kanban & QA Tiering**

- Core tier, pipeline tier, project tier.
- Custom QA tiers declared in guidelines: core | standard | full. Each test case is a separate file in `_tests/`.
- Failures Log requires Ref and Mitigation fields — neither optional.

**2026-05-23 — Reverse Engineer as Pipeline Expansion**

- Defined as a first-class optional expansion — not a guide, not a separate pipeline.
- Six sequential phases: inventory, audit, classify, risk-map, gap-report, handoff.
- Classification system locked: Keep | Align | Extract | Rewrite | Replace | Discard | Defer | Evaluate.

**2026-05-23 — Video Insights Expansion**

- Gemini handles extraction, Playbook connects. One base template + five content-type variants.
- Three outcomes: Integrate, Discard, Defer.

**2026-05-07 — Pipeline Named Playbook**

- Named: Playbook — natural developer vocabulary, not forced
- Living folder tree — every `_index.md` has a Structure section with linked annotated entries.
- Rollout doc serves dual purpose — human-facing support doc and AI context dump.

**2026-05-06 — Document Format & Folders**

- Five document types: component, orchestrator, structure, concern, integration
- Folders: `_concerns/`, `_integrations/`, `_shared/`
- AI boot sequence: `AI-INSTRUCTIONS.md` -> `code-standards.md` -> `_index.md` -> module docs -> component docs
