---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Pipeline optimization assessment (2026-10-14, read-only — no repo files changed except these two kit files). Findings: (1) root `.playbook/_index.md` is a byte-identical copy of the template `_index.md` (`id: [project-name]`, `review-gate: balanced`, `pipeline-mode: kit-only`), contradicting the K-44 note that it was made repo-specific (`strict`/`full`); (2) three committed copies of template content (`playbook/`, `packages/create-playbook/templates/`, `packages/playbook-skill/assets/`) with differing `docs/` layouts — only `_index.md` was diffed in K-49 verification; (3) kit hygiene debt — duplicate ticket IDs in `05-kanban.md` (K-12, K-18, K-43, K-44), stale `03-execution.md`, `04-progress.md` at 46 KB, retired AI-INSTRUCTIONS/README files still present under root `.playbook/vocabulary-software/`; (4) broken links in both `pipeline.md` copies (`templates/flow.md`, `contract.md`, `global-contract.md`); (5) `docs/flows/playbook-templates/` has `flows--` filename prefix glitch and no `_index.md`.
Next: Work one topic at a time, in this order, each only after the person approves the previous: (A) Repair integrity — root `_index.md` made repo-specific, stale files removed, dup tickets fixed, links fixed; (B) Single-source the template (one source, generated copies not committed, a check that fails on drift); (C) Drift guards — session-start verification, plan-before-work check, bounded rule set; (D) Domain-agnostic pass — move software-only items out of the universal entry. Topic A is first; confirm scope with the person before editing.
Active Modules: kanban
Active Expansions: none
