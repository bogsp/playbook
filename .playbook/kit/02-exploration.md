---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

---

## Closed Decisions

**2026-05-23 — Progressive Disclosure + Tiering as Core Principle**

- Named as the default method for all structural decisions in the Playbook pipeline
- Progressive Disclosure: plain language first, technical depth below — same content, two audiences
- Tiering: define a required core, add sections only when scope or type demands it
- Applies to: document formats, contract templates, flow templates, ticket types, QA tests, kit file sections
- Lives in `.playbook/AI-INSTRUCTIONS.md` as a named core principle — stated early, never buried
- Rule: never burden simple cases with complex requirements; never let complex cases skip required coverage

**2026-05-23 — Playbook as Dev-Dependency**

- Playbook is present during development, invisible in production — like a linter or type checker
- `.playbook/` contains all Playbook pipeline files — never shipped
- `.playbook/kit/` stays at root — planning and ideation layer, drives the pipeline, not subordinate to it
- `docs/flows/` and `docs/contracts/` belong to the project — useful to anyone regardless of Playbook
- Adopting Playbook on an existing project is truly non-destructive — add `.playbook/` and `.playbook/kit/`, nothing changes

**2026-05-23 — Playbook File Structure and Boundaries**

- `.playbook/` and `.playbook/kit/` are Playbook's world
- Everything else is the project's world
- Locked structure defined and strictly followed for all modular and core components

**2026-05-23 — File Renaming and Responsibilities**

- `PLAYBOOK.md` → retired, replaced by `.playbook/README.md`
- `00-summary.md` → retired, absorbed into `.playbook/README.md`
- `docs/playbook-guide.md` → renamed `.playbook/pipeline.md`
- `.playbook/00-playbook.md` → renamed `.playbook/AI-INSTRUCTIONS.md`
- `.guides/` → moves inside `.playbook/` as `.playbook/.guides/`
- Each file has one owner, one responsibility, no overlap

**2026-05-23 — Journey Matrix in README.md**

- `.playbook/README.md` contains a journey matrix near the top — after a one-paragraph description, before anything else
- Eight distinct journeys defined to guide new adoptions, AI sessions, or format lookups

**2026-05-23 — Flow Taxonomy & Document Format**

- Flows defined by two independent axes: scope (Journey, Sequence, Operation, Composite, Compensation) and trigger type (Request-Response, Event-Driven, Background/Scheduled, Reactive, Webhook, Stream)
- Progressive Disclosure + Tiering applied to flow docs (Frontmatter, What It Does, Pre-conditions, Post-conditions, Walkthrough, etc.)
- A flow cannot move to status: active while any required section is TODO

**2026-05-23 — Contract Required Sections**

- Flow contracts have required sections that force comprehensive coverage (Happy Path, Failure Modes, Edge Cases, Concurrency Rules, Constraints)
- N/A = considered and doesn't apply; TODO = not yet documented, blocks status: active
- All behavior lives in contracts. Component docs point, never contain behavior definitions.

**2026-05-23 — Component & Sequencer Doc Format Updates**

- Component Frontmatter field order: id, export, file, type, status, parent, children, connects, emits, concerns
- Interface format: language-agnostic contract notation + optional language-specific block
- Sequencer flow section shows actual method calls with types, explicit branches (happy path and failure paths)

**2026-05-23 — .playbook/kit/ Folder Structure & Responsibilities**

- `_refs/` — supporting material referenced by 02-exploration.md
- `_tests/` — one file per QA test case, referenced by 06-qa.md
- `_archives/` — lean history, never deleted, moved not removed
- 01-process.md stripped to session spark only (Phase, Last Completed, Next, Active Modules)
- 02-exploration.md manages active decisions with traceable references
- 03-execution.md tracks guidelines, plan, known issues, and custom tickets
- 04-progress.md is strictly an append-only log (Completed, Decided, Fixed)

**2026-05-07 — Pipeline Named Playbook & Living Folder Tree**

- Named: Playbook — natural developer vocabulary, not forced
- Folder: `.playbook/` — replaces `.context/` and `.spec/`
- Every `_index.md` has a Structure section with linked annotated entries mirroring the actual folder structure

**2026-05-23 — Reverse Engineer as Pipeline Expansion**

- Defined as a first-class optional expansion — not a guide, not a separate pipeline
- Plugs in before Context Kit for existing and legacy projects
- RE expansion produces three documents in `docs/rewrite/` (system-map, decision-record, risk-register)
- Classification system locked: Keep | Align | Extract | Rewrite | Replace | Discard | Defer | Evaluate

**2026-05-23 — Video Insights as Future Expansion**

- Plugs in during Context Kit exploration phase; Gemini handles extraction
- Base template + five content-type variants, three integration outcomes (Integrate, Discard, Defer)
