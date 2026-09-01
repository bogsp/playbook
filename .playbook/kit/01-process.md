---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-46 — introduced Pipeline Mode as a per-project setting (`pipeline-mode: kit-only | full`), same pattern as review-gate. Template default is now `kit-only` — no flow/contract/planning-doc requirement until a project opts into `full`. This repo's own root `.playbook/` declares `full`. Scoped Behavioral Rules 1, 2, 5, 6, 7, 9, 12 to full-mode-only. Cross-referenced from both context-kit guides. Closes the Progressive Disclosure item from the broader pipeline review — document-level tiering (flow.md) was already correct; the gap was entirely at the project level, now fixed.
Next: The three-part broader pipeline review (session mechanics, human-review-gate weight, Progressive Disclosure) is complete: K-42/K-43/K-44 (single-entry-point consolidation), K-45 (review-gate), K-46 (pipeline-mode). Remaining items: Skill/plugin packaging feasibility and domain-agnostic tooling cleanup (largest scope, lowest priority — tackled last). CLI/library code changes remain deferred to their own session: build.js/scaffold.js need updating for K-42/K-43/K-44's file consolidation, and create-playbook init should eventually ask for review-gate and pipeline-mode preferences the same way it asks for domain.
Active Modules: kanban
Active Expansions: none
