---
file: '.playbook/kit/_archives/exploration/decisions-2026-08.md'
responsibility: 'Decisions D-01, D-02, D-03 and D-06 (August 2026), rolled out of 02-exploration: three are closed and no longer gate work, D-06 is superseded by D-14. Verbatim.'
ai_instructions: 'History only. Read when a task needs the detail behind these decisions. Never edit.'
archive_rule: 'N/A. Archive file.'
owner: project
source: '_refs/decisions/D-01.md, D-02.md, D-03.md, D-06.md (themselves copied verbatim from git a32ed32:.playbook/kit/02-exploration.md)'
dropped: 'nothing'
---

### D-01

- **[2026-08-11] — Standardized frontmatter adopted for generated flow docs and shipped templates**
  - **Context:** Flow and contract documents needed a consistent frontmatter shape. The shipped templates (`playbook/docs/flows/flow.md`, `playbook/docs/contracts/contract.md`, `playbook/docs/contracts/global.md`) also hardcoded `Type: software`, incorrect for a domain-agnostic template shipped to writing/production/manufacturing projects too.
  - **Decision:** All newly generated flow documents use the four-field standard (`file`/`responsibility`/`ai_instructions`/`archive_rule`) as the primary block, with flow-tracking fields (`id`, `type`, `scope`, `trigger`, `status`, `calls`, `emits`, `called-by`) folded into the same YAML block. Shipped templates updated to match, and hardcoded software values replaced with generic `project-type: software | writing | production | manufacturing` and `domain-vocabulary: '.playbook/vocabulary-[domain]/'` placeholders.
  - **Ref:** `04-progress.md` 2026-08-11 entry.

### D-02

- **[2026-08-11] — K-27 scope expanded to include pipeline user-journey flows**
  - **Context:** Original K-27 scope (three-track plan) covered only internal template-maintenance mechanics — editing template source and the build/publish step.
  - **Decision:** Scope expanded to also document how a person in a consuming project moves through the shipped pipeline — five additional flows (new project, adopt, audit, resume session, milestone handoff/resume), grouped separately from the two build-mechanic flows in `docs/flows/playbook-templates/_index.md`. These journey flows describe `playbook/.playbook/guides/*.md` as executable paths, not just prose.
  - **Ref:** `04-progress.md` 2026-08-11 entry; `05-kanban.md` K-27.

### D-03

- **[2026-08-11] — Root-level stale doc duplicates resolved (Q-04)**
  - **Context:** Root `docs/flows/flow.md`, `docs/contracts/contract.md`, and `docs/contracts/global.md` duplicated the canonical `playbook/docs/` template source but were never updated in the frontmatter standardization pass — still carried the old header style. `docs/contracts/global.md` held unrelated filled-in content (a DragonPay/Stripe/PHP financial platform's global contract), suggesting a stale artifact from a different project.
  - **Decision:** Deleted `docs/flows/flow.md` and `docs/contracts/contract.md` — unedited duplicates, nothing lost. Retained `docs/contracts/global.md` — root `docs/` legitimately holds this repo's own tracked flows (create-playbook, playbook-templates tracks), so a root global contract has a real purpose; kept as a placeholder to be overwritten once contract-writing work (K-28+) reaches it.
  - **Ref:** `04-progress.md` 2026-08-11 entry; `05-kanban.md`.

### D-06 (superseded by D-14: two READMEs and a self-adapting entry replace the single plain README)

- **[2026-08-29] — README/AI-INSTRUCTIONS/_index.md consolidated into a single entry point**
  - **Context:** Session-mechanics review surfaced that Playbook's own orientation content was split across three files (`README.md`, `AI-INSTRUCTIONS.md`, `_index.md`) with overlapping and sometimes disagreeing content — e.g. the two-message kit pattern (`context-kit.md`) grouped kit files differently than `AI-INSTRUCTIONS.md`'s own Session Load Order. Separately, the two-message session-start pattern itself was built around ChatGPT's upload limits; Claude, Gemini, and most current tools don't have that constraint, so forcing a fixed two-message split by default over-serves a shrinking problem.
  - **Decision:** `.playbook/_index.md` is now the single entry point for both templates and scaffolded projects — it carries What This Project Is, Session Start, AI Behavioral Rules (absorbed from the retired `AI-INSTRUCTIONS.md`), How to Use This File, Structure, Project Planning Documents, and Detail. `README.md` is now a plain human-facing project readme with one pointer line back to `_index.md` — no Playbook mechanics. `AI-INSTRUCTIONS.md` no longer exists as a separate file at the project root. The same treatment applies to `vocabulary-[domain]/`: each domain's `README.md` + `AI-INSTRUCTIONS.md` merged into a single `vocabulary-[domain]/_index.md`, since those folders had no `_index.md` of their own before this change (per the general rule: AI-INSTRUCTIONS-style content merges into a directory's `_index.md` where one exists or is being introduced; it only stays a separate file where no `_index.md` scope applies). Session-start guidance in `context-kit.md`, `context-kit-standalone.md`, and `00-prompts.md` rewritten from "always two messages" to "one message by default; fall back to `_index.md` + `01-process.md` + `04-progress.md` first, only pulling in more if the task needs it, on tools with a hard limit."
  - **Ref:** `04-progress.md` 2026-08-29 entry (second pipeline-review session); `05-kanban.md` K-42.
