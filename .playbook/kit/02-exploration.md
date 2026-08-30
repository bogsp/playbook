---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

- [ ] **[Q-03]:** Frontmatter sweep beyond `guides/` — not a blocker for any current ticket, fix opportunistically when each file is next touched: `playbook/docs/flows/flow.md` and `playbook/docs/contracts/contract.md`/`global.md` are now resolved (see 2026-08-11 decision below) — remaining scope on `playbook/.playbook/templates.md` + `templates/*.md` (HCH block) is resolved by the 2026-08-12 Frontmatter Tiering Rule below; `playbook/.playbook/pipeline.md`, `playbook/.playbook/README.md`, and all four `vocabulary-*/{README,AI-INSTRUCTIONS,templates}.md` (still `# Title` / `# File:` style) remain open.

---

## Settled Decisions

- **[2026-08-29] — README/AI-INSTRUCTIONS/_index.md consolidated into a single entry point**
  - **Context:** Session-mechanics review surfaced that Playbook's own orientation content was split across three files (`README.md`, `AI-INSTRUCTIONS.md`, `_index.md`) with overlapping and sometimes disagreeing content — e.g. the two-message kit pattern (`context-kit.md`) grouped kit files differently than `AI-INSTRUCTIONS.md`'s own Session Load Order. Separately, the two-message session-start pattern itself was built around ChatGPT's upload limits; Claude, Gemini, and most current tools don't have that constraint, so forcing a fixed two-message split by default over-serves a shrinking problem.
  - **Decision:** `.playbook/_index.md` is now the single entry point for both templates and scaffolded projects — it carries What This Project Is, Session Start, AI Behavioral Rules (absorbed from the retired `AI-INSTRUCTIONS.md`), How to Use This File, Structure, Project Planning Documents, and Detail. `README.md` is now a plain human-facing project readme with one pointer line back to `_index.md` — no Playbook mechanics. `AI-INSTRUCTIONS.md` no longer exists as a separate file at the project root. The same treatment applies to `vocabulary-[domain]/`: each domain's `README.md` + `AI-INSTRUCTIONS.md` merged into a single `vocabulary-[domain]/_index.md`, since those folders had no `_index.md` of their own before this change (per the general rule: AI-INSTRUCTIONS-style content merges into a directory's `_index.md` where one exists or is being introduced; it only stays a separate file where no `_index.md` scope applies). Session-start guidance in `context-kit.md`, `context-kit-standalone.md`, and `00-prompts.md` rewritten from "always two messages" to "one message by default; fall back to `_index.md` + `01-process.md` + `04-progress.md` first, only pulling in more if the task needs it, on tools with a hard limit."
  - **Ref:** `04-progress.md` 2026-08-29 entry (second pipeline-review session); `05-kanban.md` K-42.

- **[2026-08-29] — Contract section names finalized (K-05 resolved)**
  - **Context:** Two versions of the five-section contract shape existed and disagreed — the original 2026-05-23 decision log (`Happy Path` / `Failure Modes` / `Edge Cases` / `Concurrency Rules` / `Constraints`) versus what actually shipped everywhere (`The Good Path` / `Ways It Can Fail` / `Edge Cases` / `Ordering Rules` / `Hard Constraints`, no dedicated concurrency section). Neither was acceptable as final: the shipped names use success-framed language ("Good"/"Happy") that assumes the path succeeds, and both versions carry jargon or redundant qualifiers ("Hard" Constraints — a constraint is non-negotiable by definition).
  - **Decision:** Contract sections renamed to plain, neutral, non-jargon terms: **Normal Flow** (was "The Good Path"), **Failures** (was "Ways It Can Fail"), **Edge Cases** (unchanged), **Ordering** (was "Ordering Rules"), **Constraints** (was "Hard Constraints"). Concurrency is not a separate section — it is folded into **Ordering** ("what must happen before what, including anything that cannot happen at the same time"), since most projects using this pipeline have no true concurrency concerns and a dedicated section would sit empty in the common case. `N/A`/`TODO` markers are retained — they are functional status flags, not jargon. Applied to all contract documents carrying this five-section shape: `playbook/docs/contracts/contract.md` (template) and all 8 files under `docs/contracts/playbook-templates/` (flow-0 through flow-7). `docs/contracts/global.md` and `playbook/docs/contracts/global.md` are unaffected — they use a different section shape (numbered cross-cutting rules / named-topic blocks), not the five-part per-flow contract shape this decision governs.
  - **Ref:** `04-progress.md` 2026-08-29 entry; `05-kanban.md` K-05.

- **[2026-08-12] — Frontmatter Tiering Rule established**
  - **Context:** Splitting `playbook/.playbook/templates.md` into per-type files (K-33) required deciding what frontmatter each file carries. The deep-module header (`MODULE_ID`, `SYSTEM_CONTEXT`, `UPSTREAM_DEPENDENCIES`, `DOWNSTREAM_IMPACT`, `CORE_SYSTEM_INVARIANTS`) was flagged as unresolved in the 2026-08-10 sync check (K-03) — present in templates/kit files, absent from `_concerns/`, never traced to a decision. Separately, prior drift between `02-exploration.md`/`03-execution.md`/`04-progress.md` (see archived 2026-05-23 decision) was only resolved by giving each kit file an explicit `responsibility`/`ai_instructions` boundary, establishing that the four-field purpose block is what prevents this class of drift.
  - **Decision:** Progressive Disclosure applied to frontmatter itself, in two tiers. Tier 1 (DDA/planning docs — the five universal types and domain-specific counterparts like software's `sequencer`): deep-module header + four-field purpose block (`file`, `responsibility`, `ai_instructions`, `archive_rule`) + type-specific tracking fields (`id`, `type`, `status`, etc.). Tier 2 (kit files, flows, contracts, guides, READMEs, indexes): the four-field purpose block is mandatory and never dropped, since it prevents drift between documents with adjacent purposes — plus any already-established tracking fields for that doc type (flows/contracts keep `id`/`type`/`scope`/`trigger`/`status`/`calls`/`emits`/`called-by`). The deep-module header stays Tier-1-only — it exists to protect AI-generated code against upstream/downstream impact, a risk specific to docs that gate implementation.
  - **Ref:** `04-progress.md` 2026-08-12 entry; `05-kanban.md` K-33, K-34.

- **[2026-08-11] — Root-level stale doc duplicates resolved (Q-04)**
  - **Context:** Root `docs/flows/flow.md`, `docs/contracts/contract.md`, and `docs/contracts/global.md` duplicated the canonical `playbook/docs/` template source but were never updated in the frontmatter standardization pass — still carried the old header style. `docs/contracts/global.md` held unrelated filled-in content (a DragonPay/Stripe/PHP financial platform's global contract), suggesting a stale artifact from a different project.
  - **Decision:** Deleted `docs/flows/flow.md` and `docs/contracts/contract.md` — unedited duplicates, nothing lost. Retained `docs/contracts/global.md` — root `docs/` legitimately holds this repo's own tracked flows (create-playbook, playbook-templates tracks), so a root global contract has a real purpose; kept as a placeholder to be overwritten once contract-writing work (K-28+) reaches it.
  - **Ref:** `04-progress.md` 2026-08-11 entry; `05-kanban.md`.

- **[2026-08-11] — K-27 scope expanded to include pipeline user-journey flows**
  - **Context:** Original K-27 scope (three-track plan) covered only internal template-maintenance mechanics — editing template source and the build/publish step.
  - **Decision:** Scope expanded to also document how a person in a consuming project moves through the shipped pipeline — five additional flows (new project, adopt, audit, resume session, milestone handoff/resume), grouped separately from the two build-mechanic flows in `docs/flows/playbook-templates/_index.md`. These journey flows describe `playbook/.playbook/guides/*.md` as executable paths, not just prose.
  - **Ref:** `04-progress.md` 2026-08-11 entry; `05-kanban.md` K-27.

- **[2026-08-11] — Standardized frontmatter adopted for generated flow docs and shipped templates**
  - **Context:** Flow and contract documents needed a consistent frontmatter shape. The shipped templates (`playbook/docs/flows/flow.md`, `playbook/docs/contracts/contract.md`, `playbook/docs/contracts/global.md`) also hardcoded `Type: software`, incorrect for a domain-agnostic template shipped to writing/production/manufacturing projects too.
  - **Decision:** All newly generated flow documents use the four-field standard (`file`/`responsibility`/`ai_instructions`/`archive_rule`) as the primary block, with flow-tracking fields (`id`, `type`, `scope`, `trigger`, `status`, `calls`, `emits`, `called-by`) folded into the same YAML block. Shipped templates updated to match, and hardcoded software values replaced with generic `project-type: software | writing | production | manufacturing` and `domain-vocabulary: '.playbook/vocabulary-[domain]/'` placeholders.
  - **Ref:** `04-progress.md` 2026-08-11 entry.

---

## Constraints

- **[C-01]:** [System requirement or technological constraint]
