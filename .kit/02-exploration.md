# EXPLORATION
# File: .playbook/kit/02-exploration.md

## Open Topics

<!-- No open topics — all decisions locked for this session -->

---

## Closed Decisions

**2026-05-23 — Progressive Disclosure + Tiering as Core Principle**
- Named as the default method for all structural decisions in the Playbook pipeline
- Progressive Disclosure: plain language first, technical depth below — same content, two audiences
- Tiering: define a required core, add sections only when scope or type demands it
- Applies to: document formats, contract templates, flow templates, ticket types, QA tests, kit file sections
- Lives in `.playbook/00-rules.md` as a named core principle — stated early, never buried
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
- Locked structure:
  ```
  .playbook/
    README.md
    pipeline.md
    00-rules.md
    _index.md
    _concerns/
    _integrations/
    _shared/
    .guides/
  .playbook/kit/
    01-process.md
    02-exploration.md
    03-execution.md
    04-progress.md
    05-kanban.md
    06-qa.md
    _refs/
    _tests/
    _archives/
  docs/
    flows/
    contracts/
    code-standards.md
  ```

**2026-05-23 — File Renaming and Responsibilities**
- `PLAYBOOK.md` → retired, replaced by `.playbook/README.md`
- `00-summary.md` → retired, absorbed into `.playbook/README.md`
- `docs/playbook-guide.md` → renamed `.playbook/pipeline.md`
- `.playbook/00-playbook.md` → renamed `.playbook/00-rules.md`
- `.guides/` → moves inside `.playbook/` as `.playbook/.guides/`
- Each file has one owner, one responsibility, no overlap

**2026-05-23 — File Responsibility Boundaries**
- `.playbook/README.md` — orientation, journey matrix, pipeline at a glance. Points, never explains.
- `.playbook/pipeline.md` — what every stage is and why it exists. Reference, not tutorial.
- `.playbook/00-rules.md` — how AI implements the pipeline right now. Execution layer, no narrative.
- `.playbook/_index.md` — project manifest, living folder tree. Project-specific only.
- `.playbook/kit/01-process.md` — session spark only. Phase, last completed, next, active modules. Updated every session.
- `.playbook/kit/02-exploration.md` — active decisions only. Open topics and closed decisions relevant to current work.
- `.playbook/kit/03-execution.md` — guidelines, plan, acceptance criteria, tasks, known issues.
- `.playbook/kit/04-progress.md` — append-only log. Current phase entries only. Three types: Completed, Decided, Fixed.
- `.playbook/kit/05-kanban.md` — active tickets only. Work state registry.
- `.playbook/kit/06-qa.md` — test registry and sign-off only. Test detail lives in `_tests/`.

**2026-05-23 — Journey Matrix in README.md**
- `.playbook/README.md` contains a journey matrix near the top — after a one-paragraph description, before anything else
- Eight distinct journeys defined:
  - New to Playbook → `.playbook/README.md`
  - New project → `.playbook/README.md` → `.playbook/.guides/new-project.md`
  - Adopting existing (with kit) → `.playbook/.guides/adopt-with-kit.md`
  - Adopting existing (without kit) → `.playbook/.guides/adopt-without-kit.md`
  - Resuming project → `.playbook/kit/00-prompts.md`
  - AI dev session → `.playbook/00-rules.md`
  - AI from rollout → `docs/rollout/[milestone].md` → `.playbook/00-rules.md`
  - Looking up formats → `.playbook/pipeline.md`
  - Looking up prompts → `.playbook/kit/00-prompts.md`

**2026-05-23 — Flow Taxonomy**
- Flows defined by two independent axes: scope and trigger type
- Scope types: Journey | Sequence | Operation | Composite | Compensation
- Trigger types: Request-Response | Event-Driven | Background/Scheduled | Reactive | Webhook | Stream
- Any combination is valid — a Journey can be Event-Driven, an Operation can be Request-Response
- Flow relationships declared in frontmatter: triggers, calls, emits, called-by
- Flows _index.md is a dependency map, not just a table of contents

**2026-05-23 — Flow Document Format**
- Progressive Disclosure + Tiering applied to flow docs
- Frontmatter: id, type, scope, trigger, status, triggers, calls, emits, called-by
- Core sections — required for every flow:
  - ## What It Does — plain language, any audience
  - ## Pre-conditions — what must be true before the flow starts
  - ## Post-conditions — what is guaranteed when the flow completes
  - ## Walkthrough — narrative above divider, technical call chain below
- Tier additions by scope:
  - Journey + Sequence: ## Compensation
  - Journey + Composite: ## Child Flows
- Tier additions by trigger:
  - Event-Driven: ## Event Contract
  - Background/Scheduled: ## Schedule, ## Timeout Behavior
  - Reactive + Stream: ## Subscription Contract, ## Disconnect Behavior
  - Stream: also ## Reconnect Behavior
  - Webhook: ## Payload Contract, ## Retry Behavior
- ## Detail — always optional, present only for concurrency rules, known constraints, quirks
- N/A — considered and doesn't apply; TODO — not yet documented, blocks status: active
- A flow cannot move to status: active while any required section is TODO

**2026-05-23 — Contract Required Sections**
- Flow contracts have required sections that force comprehensive coverage:
  - ## Happy Path
  - ## Failure Modes
  - ## Edge Cases
  - ## Concurrency Rules
  - ## Constraints
- global.md has its own required sections:
  - ## Architecture Rules
  - ## Auth Boundaries
  - ## Error Handling Rules
  - ## Audit Requirements
  - ## Cross-Cutting Constraints
- N/A = considered and doesn't apply; TODO = not yet documented, blocks status: active
- When a contract grows too large, split by concern — sub-folder with _index.md referencing all parts
- Component docs reference contracts with precision — file and section, not just file
- All behavior lives in contracts. Component docs point, never contain behavior definitions.

**2026-05-23 — Component Doc Format Updates**
- Frontmatter field order: id, export, file, type, status, parent, children, connects, emits, concerns
- New frontmatter fields: file (repo path), export (exported name)
- ## What It Does replaces inline narrative paragraph — plain language, any audience
- ## Interface replaces ## Detail for contracts — cites source contract, declares input/output
- Interface format: language-agnostic contract notation + optional language-specific block
- ## Detail retained for edge cases, concurrency, constraints not inferable from interface
- ## Detail omitted entirely if nothing fits that description
- Progressive Disclosure: ## What It Does → ## Interface → ## Detail

**2026-05-23 — Sequencer Flow Section Upgraded**
- Flow section shows actual method calls with types, not just component names
- All branches explicit — happy path and all failure paths
- Format: ComponentName.method(input) → ok: ResultType → continue | err: ErrorType → action
- Makes the flow section a verifiable call chain, not just a description

**2026-05-23 — .playbook/kit/ Folder Structure**
- _refs/ — supporting material referenced by 02-exploration.md
  - video-insights/ — extracted video insight files
  - templates/ — reusable templates
  - examples/ — examples referenced by topics
  - snippets/ — code or content snippets
- _tests/ — one file per QA test case, referenced by 06-qa.md
- _archives/ — lean history, never deleted, moved not removed
  - exploration/ — deprecated closed decisions
  - progress/ — old phase progress logs
  - kanban/ — done tickets no longer referenced
- Rule: main files point, supporting folders own detail, archives own history

**2026-05-23 — .playbook/kit/01-process.md Responsibility**
- Session spark only — four fields: Phase, Last Completed, Next, Active Modules
- Updated at the end of every session, read at the start of the next
- Rule: if it doesn't change session to session, it doesn't live here
- Everything else moved to .playbook/00-rules.md or .playbook/pipeline.md

**2026-05-23 — .playbook/kit/02-exploration.md Responsibility**
- Active decisions only — Open Topics and Closed Decisions relevant to current work
- Ref: field for supporting material → points to .playbook/kit/_refs/
- Flow: field for flows that resulted from a decision → points to docs/flows/
- Rule: decisions that produce flows must reference them
- Rule: flows must be traceable to a decision
- Deprecated decisions moved to .playbook/kit/_archives/exploration/

**2026-05-23 — .playbook/kit/03-execution.md Responsibility**
- Guidelines — style, voice, constraints, quality bar
- External dependency philosophy declared here as a constraint — prefer native implementations
- Plan — goals, outcomes, scope, acceptance criteria
- Action — current focus, task list
- Known Issues — typed, severity-rated, dependency-aware
- Known Issues fields: #, Issue, Type, Severity, Blocked By, Resolution
- Type values: bug | dependency | design | performance | security
- Severity values: critical | high | low
- Rule: a known issue without type and severity cannot be assessed
- Rule: a known issue without blocked-by cannot be prioritized
- Custom QA tier declared in guidelines: core | standard | full
- Custom ticket types declared in guidelines before use

**2026-05-23 — .playbook/kit/04-progress.md Responsibility**
- Append-only log — entries never edited or deleted
- Three entry types: Completed, Decided, Fixed
- In Progress — always the last entry, overwritten each session
- Current phase entries only — older entries moved to .playbook/kit/_archives/progress/
- Rule: if it happened, it gets logged; if it didn't happen, it doesn't get added retroactively

**2026-05-23 — Kanban Ticket Type Tiering**
- Core tier — always available: feature | bug | task
- Pipeline tier — available when .playbook/ exists: doc | sync
- Project tier — flexible, declared in 03-execution.md guidelines before use
- Rule: core and pipeline types need no declaration; project types must be declared first
- Ticket fields: Type, Description, Ref (optional), Blocked by

**2026-05-23 — QA Tiering and Test Files**
- Three tiers declared in 03-execution.md guidelines: core | standard | full
- Core: checklist only — pass or fail
- Standard: structured test cases — steps, expected result, executor, status
- Full: complete coverage — pre-conditions, steps, expected result, edge cases, executor, status
- Each test case is a separate file in .playbook/kit/_tests/
- 06-qa.md is a registry and sign-off document only — points to _tests/ files
- Executor field: Agent | Human | Both | Automated
- Automated only valid when CI/CD pipeline declared in .playbook/_integrations/
- Failures Log fields: ID, Date, What Failed, Ref, Ticket, Mitigation, Status
- Ref = flow or contract that defines correct behavior — required, not optional
- Mitigation = what prevents this class of failure recurring — required, not optional
- Sign-off requires every Acceptance Criterion verified with QA-ID reference
- Known Exceptions must be explicit and reasoned — never silently skipped
- Consequences of Sign-off declared — what this approval gates

**2026-05-23 — Archive Strategy**
- _archives/ is the long-term history folder for .playbook/kit/
- Three sub-folders: exploration/, progress/, kanban/
- Archive rule for exploration: closed decisions no longer gating any active task, flow, or component
- Archive rule for progress: entries older than the current phase
- Archive rule for kanban: Done tickets no longer referenced by any active test, flow, or known issue
- Every archived file gets a header: title, date range, phase, archived date, reason
- Rule: nothing gets deleted — it gets moved
- Rule: main files are current and actionable; archives own the history

**2026-05-23 — SESSION-SUMMARY.md Deprecated**
- Retired — 01-process.md now performs the session handoff cleanly
- The baton pass is: update 01-process.md + 04-progress.md at end of every session
- No separate summary file needed

**2026-05-07 — Pipeline Named Playbook**
- Named: Playbook — natural developer vocabulary, not forced
- Folder: .playbook/ — replaces .context/ and .spec/
- Pipeline starter: PLAYBOOK.md at repo root
- AI boot file: .playbook/00-playbook.md

**2026-05-07 — Living Folder Tree**
- Every _index.md has a Structure section with linked annotated entries
- Mirrors the actual .playbook/ folder structure
- Updated via sync mode whenever components change
- Serves as the at-a-glance project map for humans and AI

**2026-05-07 — Orchestrator Flow Format**
- Two representations in every orchestrator doc
- Flow section in body — annotated numbered sequence with linked components; primary reference
- Mermaid sequence diagram in Detail — visual; kept in sync with Flow section

**2026-05-07 — Full Pipeline as One System**
- Playbook treats the entire pipeline as one system: Context Kit -> PRD/Specs -> DDA -> Code -> Rollout
- PLAYBOOK.md at repo root is the single entry point for any new machine or team member
- 00-summary.md updated to cover the full Playbook system

**2026-05-07 — Existing Project Adoption**
- Structured audit approach: Inventory -> Audit -> Gap Report -> Scaffold -> Adopt
- Additive only — existing code stays intact throughout adoption
- Two separate guides: with Context Kit and without Context Kit
- Adoption priority: concerns -> integrations -> shared -> orchestrators -> components

**2026-05-07 — Rollout Doc Dual Purpose**
- Human-facing: deployment guide, release notes, migration steps
- AI-facing: full project context dump for fresh sessions
- Generated on demand; never edited directly

**2026-05-06 — Document Format**
- YAML frontmatter + one-paragraph narrative + optional Detail section
- Single file per component — no companion files

**2026-05-06 — Five Document Types**
- component — single unit of logic
- sequencer — runtime shell that sequences components
- structure — module/project manifest and scaffold
- concern — cross-cutting capability used across modules
- integration — third-party service or external library contract

**2026-05-06 — Folder Structure**
- DDA lives in .playbook/ at repo root
- Reserved folders: _concerns/, _integrations/, _shared/
- Each level has an _index.md structure doc
- 00-playbook.md is always the first file AI reads
- Max folder depth: 2 levels unless module grows complex

**2026-05-06 — Naming Conventions**
- Files: kebab-case.md — IDs match filename exactly
- Folders: kebab-case — reserved folders use leading underscore
- Structure docs: always _index.md
- Events: PascalCase in frontmatter
- Commits: grouped by scope — playbook:, kit:, [module]:, fix:, chore:

**2026-05-06 — AI Boot Sequence**
- Always load: 00-rules.md -> code-standards.md -> _index.md -> module docs -> component docs
- Scoped context packages — load only what the task needs

**2026-05-06 — pnpm Compatibility**
- CLI has zero external dependencies — works with npx, pnpm dlx, and yarn dlx

**2026-05-23 -- Reverse Engineer as Pipeline Expansion**
- Defined as a first-class optional expansion -- not a guide, not a separate pipeline
- Plugs in before Context Kit for existing and legacy projects
- New projects skip it entirely
- Expansion pattern established -- other expansions can follow same model
- Active Expansions field in 01-process.md declares active expansions
- Multi-phase expansions show current phase inline

**2026-05-23 -- RE Expansion Phases**
- Six sequential phases: inventory, audit, classify, risk-map, gap-report, handoff
- Each phase requires human review before advancing -- no autonomous advancement
- DDA docs cannot be authored during inventory, audit, or classify phases
- Handoff feeds system-map into open topics, decision-record into closed decisions, risk-register into known issues

**2026-05-23 -- Classification System**
- Locked: Keep | Align | Extract | Rewrite | Replace | Discard | Defer | Evaluate
- Flagged for potential reopening -- may need additional states for edge cases
- Aligns with strangler fig and greenfield rewrite strategies
- Flow: docs/rewrite/decision-record.md

**2026-05-23 -- RE Document Structure**
- Three documents: system-map.md, decision-record.md, risk-register.md
- Live in docs/rewrite/ -- belong to the project, not to Playbook
- Can split into sub-folders for large projects using same rules as flows and contracts
- Feed directly into kit files on handoff

**2026-05-23 -- Adoption Guide Consolidation**
- adopt-with-kit.md, adopt-without-kit.md, legacy-code.md retired
- Replaced by single adopt.md with decision-tree routing
- Four diagnostic questions route to the right process
- No rigid tiers -- diagnostic-driven, covers all combinations
- RE expansion activated from adopt.md when codebase cannot be mapped without it

**2026-05-23 -- Video Insights as Future Expansion**
- Acknowledged as a planned expansion
- Plugs in during Context Kit exploration phase
- Feeds .playbook/kit/_refs/video-insights/ and .playbook/kit/02-exploration.md
- Guide to be authored as .playbook/.guides/expansions/video-insights.md
- Status: Coming soon -- not yet defined

**2026-05-23 -- Context Kit as Integral Part of Playbook**
- Context Kit is not Stage 1 -- it is the persistent layer running beneath every stage
- Pipeline diagram updated to reflect this -- Context Kit sits above the pipeline, always active
- Context Kit remains standalone -- works with any AI tool, any project type
- Inside Playbook, the two are inseparable -- sword within a sword
- Dedicated guide authored: .playbook/.guides/context-kit.md
- Guide covers: four files, supporting folders, two-message pattern, session rhythm,
  pipeline touchpoints, expansion declarations, archiving, context rot
- Referenced by README.md, pipeline.md, 00-rules.md, and 00-prompts.md
- 00-prompts.md restructured -- two clear sections: standalone kit prompts and Playbook pipeline prompts
- The book (The Context Kit by Bogs) remains the deep reference for standalone use
- Non-software Playbook expansion deferred -- validate pipeline on software first

**2026-05-23 -- Video Insights Expansion**
- Gemini handles extraction -- free, native YouTube integration, accessible to anyone with Google account
- Gemini extracts, Playbook connects -- mandatory discussion step before any integration
- Base template + five content-type variants: Tutorial, Case Study, Framework, Opinion, Research
- Expansion fires at any stage -- not tied to a specific pipeline stage
- Three outcomes: Integrate (promotes to kit), Discard (stays in _refs/), Defer (stays Pending)
- All integrated insights traceable via Ref: in 02-exploration.md
- Every decision logged in 04-progress.md
- Files live in .playbook/kit/_refs/video-insights/
- Prompts in .playbook/kit/00-prompts.md -- Video Insights section
