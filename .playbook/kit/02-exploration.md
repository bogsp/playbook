---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Holds ONLY Open Questions, Settled Architectural Decisions, and System Constraints.'
ai_instructions: 'Active decisions only. Do not revisit closed decisions unless explicitly asked.'
archive_rule: 'Closed decisions no longer gating any active task move to .playbook/kit/_archives/exploration/'
---

## Open Topics

- [ ] **[Q-03]:** Frontmatter sweep beyond `guides/` — not a blocker for any current ticket, fix opportunistically when each file is next touched: `playbook/docs/flows/flow.md` and `playbook/docs/contracts/contract.md`/`global.md` are now resolved (see 2026-08-11 decision below) — remaining scope is `playbook/.playbook/templates.md` + `templates/*.md` (HCH block — already an open item from the 2026-08-10 sync check); `playbook/.playbook/pipeline.md`, `playbook/.playbook/README.md`, and all four `vocabulary-*/{README,AI-INSTRUCTIONS,templates}.md` (still `# Title` / `# File:` style).
- [ ] **[Q-04]:** Root-level `docs/flows/flow.md`, `docs/contracts/contract.md`, and `docs/contracts/global.md` duplicate the canonical `playbook/docs/` template source but were not updated in the 2026-08-11 frontmatter standardization pass. `docs/contracts/global.md` at root is not a template at all — it holds unrelated filled-in content (DragonPay/Stripe/PHP financial rules), suggesting these root copies are stale artifacts predating the meta-repo restructure rather than tracked deliverables. Gates: whether to update, retire, or explicitly document these root files before closing out the Templates track's frontmatter work.

---

## Closed Decisions

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
