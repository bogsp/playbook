---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

- [ ] **[Q-03]:** Frontmatter sweep beyond `guides/` — not a blocker for any current ticket, fix opportunistically when each file is next touched: `playbook/docs/flows/flow.md` and `playbook/docs/contracts/contract.md`/`global.md` are now resolved (see 2026-08-11 decision below) — remaining scope is `playbook/.playbook/templates.md` + `templates/*.md` (HCH block — already an open item from the 2026-08-10 sync check); `playbook/.playbook/pipeline.md`, `playbook/.playbook/README.md`, and all four `vocabulary-*/{README,AI-INSTRUCTIONS,templates}.md` (still `# Title` / `# File:` style).

---

## Closed Decisions

**2026-08-11 — Q-04 resolved: root-level stale doc duplicates**

- **Context:** Root `docs/flows/flow.md`, `docs/contracts/contract.md`, and
  `docs/contracts/global.md` duplicated the canonical `playbook/docs/`
  template source but were never updated in the 2026-08-11 frontmatter
  standardization pass — they still carried the old `File:`/`id:`/`type:`
  header style instead of the four-field standard. `docs/contracts/global.md`
  was not even a placeholder — it held unrelated filled-in content (a
  DragonPay/Stripe/PHP financial platform's global contract), suggesting it
  was a stale artifact from a different project predating the meta-repo
  restructure.
- **Decision:**
  - `docs/flows/flow.md` and `docs/contracts/contract.md` — deleted. They
    were pure unedited duplicates of `playbook/docs/flows/flow.md` and
    `playbook/docs/contracts/contract.md` with no distinct content, so
    nothing was lost.
  - `docs/contracts/global.md` — retained. Root `docs/` is confirmed to hold
    real, tracked work for this repo's own three tracks (create-playbook
    CLI, playbook-software-library, playbook-templates — see
    `docs/flows/create-playbook/`, `docs/flows/playbook-templates/`), so a
    root `docs/contracts/global.md` has a legitimate purpose: the global
    contract governing all flows across those three tracks. The file is kept
    as a placeholder to be overwritten with content scoped to this repo's
    own flows once contract-writing work reaches it (see K-28 and beyond) —
    not deleted, since deleting would remove a correctly-located file
    pending correct content.
- **Ref:** `.playbook/kit/04-progress.md` 2026-08-11 entry; `.playbook/kit/05-kanban.md`.

**2026-08-11 — K-27 scope expanded to include pipeline user-journey flows**

- Original K-27 scope (per the three-track plan) covered only internal
  template-maintenance mechanics: editing template source and the
  build/publish step.
- Scope expanded after review: the Templates track also needs to document
  how a person in a *consuming* project actually moves through the shipped
  pipeline — five additional flows (new project, adopt, audit, resume
  session, milestone handoff/resume), grouped separately from the two
  build-mechanic flows in `docs/flows/playbook-templates/_index.md`.
- These journey flows describe `playbook/.playbook/guides/*.md` as
  executable paths, not just prose — direct working reference for updating
  Playbook-integrated pipelines in other projects.

**2026-08-11 — Standardized frontmatter adopted for generated flow docs and shipped templates**

- All newly generated flow documents (`docs/flows/create-playbook/`,
  `docs/flows/playbook-templates/`) use the four-field standard
  (`file:`/`responsibility:`/`ai_instructions:`/`archive_rule:`) as the
  primary frontmatter block, with flow-tracking fields (`id`, `type`,
  `scope`, `trigger`, `status`, `calls`, `emits`, `called-by`) folded into
  the same YAML block rather than a second frontmatter section.
- The shipped templates `playbook/docs/flows/flow.md`,
  `playbook/docs/contracts/contract.md`, and
  `playbook/docs/contracts/global.md` were updated to match — every future
  project scaffolded from these templates will produce flow/contract docs
  in this shape by default.
- Adjacent fix made in the same pass: these three templates hardcoded
  `Type: software` / `Domain vocabulary: .playbook/vocabulary-software/`,
  which is incorrect for a domain-agnostic template shipped to
  writing/production/manufacturing projects too. Replaced with generic
  `project-type: software | writing | production | manufacturing` and
  `domain-vocabulary: '.playbook/vocabulary-[domain]/'` placeholders.

---

## Constraints

- **[C-01]:** [System requirement or technological constraint]
