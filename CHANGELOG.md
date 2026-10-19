---
file: 'CHANGELOG.md'
responsibility: 'Template version history: what changed in the files Playbook ships to projects.'
ai_instructions: 'Add a new entry at the top for every change to shipped templates and bump templateVersion in packages/template-manifest.json to match. Do not rewrite past entries.'
archive_rule: 'N/A — keep all entries; one short block per version.'
owner: playbook
---

# Changelog

Template versions. The current version is `templateVersion` in `packages/template-manifest.json`. Each scaffolded project records the version it started from in `.playbook/.version`.

## 2.0.0 — 2026-10-18

Restructure of the shipped pipeline. Existing projects are not upgraded automatically; an upgrade path comes later.

- `.playbook/_index.md` is the single AI entry. It holds a Session Start handshake that works with and without file access.
- Rules moved to `.playbook/rules.md` (C1–C10, D1–D2, P1–P8). C9 (name what you deliver) and C10 (`In flight:` line) are new.
- The `guides/` folder is gone. Its content now lives in `pipeline.md` (starting, close-out per stage), `expansions.md` (Audit, Video Insights), `maintenance.md` (close-out, project identity) and `kit/00-guide.md` (kit use, prompts, roll-over).
- `kit/00-prompts.md` became `kit/00-guide.md`; prompts are shorter.
- Two READMEs: the project's own root `README.md` (never overwritten if present) and `.playbook/README.md` (the Playbook entry for people).
- Kit Charter: budgets and entry shapes per kit file; roll-over to `_archives/`.
- Kit templates are lean: budgets and entry shapes in each file's frontmatter, no rules prose. Kit file rules moved to `kit/00-guide.md`; the QA sign-off checks moved to `maintenance.md`. Open questions and decisions are one line each, with detail in `_refs/questions/` and `_refs/decisions/`. `01-process` has no Session Notes; `Active Expansions:` names each expansion's phase, exclusive files and domain templates.
- Adopt and audit are separate files, `adopt.md` and `audit.md`, copied only to adopt and audit projects. `pipeline.md` and `expansions.md` point to them.
- Planning documents carry a card: `file`, `responsibility`, `id`, `type`, `status`, `parent`, `needs`, `provides`, `invariants`, `done-when`, plus type-specific fields. It replaces the deep-module header and the tier rule. Old field to new: `MODULE_ID` and `SYSTEM_CONTEXT` dropped (`id`, `parent` and `responsibility` cover them); `UPSTREAM_DEPENDENCIES`, `connects`, `concerns`, `integrations`, `affects`, `used-by` become `needs` (reverse links are found by search, never written); `DOWNSTREAM_IMPACT`, `children`, `contains` computed; `CORE_SYSTEM_INVARIANTS` becomes `invariants`; `definition-of-done` becomes `done-when`; `emits` and `config` are folded into `provides` and the body; `sequence` stays in the body; `provided-by` becomes a `needs` on an integration; `status: deprecated` becomes `retired`. Schema in `templates/_index.md`; frontmatter rules in `maintenance.md` (Frontmatter replaces Frontmatter Tiering).
- New rules: C11 (keep only current information; retire and archive the rest) and D3 (depend on another area only through its contract, `_shared/` documents or milestone summary). Retired planning documents move to `_archives/units/`.
- `.playbook/.version` records the template version and a hash per file as scaffolded.
- Example concerns (auth, error-handling, logging) are no longer copied into projects; concerns are created when a task needs one.
- `04-progress.md` is scaffolded with one `Completed` line instead of an `In Progress` entry.
