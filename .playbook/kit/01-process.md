---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Both `pnpm build` runs (packages/create-playbook, packages/playbook-skill) verified clean against the real repo — 49 files copied each, no errors. Two real-repo gaps found and fixed along the way: a missing `playbook/.playbook/templates/_index.md` (K-33 leftover, never actually committed), and three template files with `file:` frontmatter pointing at this repo's own path instead of the consuming project's future path.
Next: Run a real `create-playbook init` scaffold in a scratch directory — walk all 6 questions, confirm `.playbook/_index.md`'s frontmatter carries the chosen `review-gate`/`pipeline-mode`, confirm the file tree matches what's documented in the CLI's README. Then spot-check that the Skill's `assets/` and the CLI's scaffold output agree on content for the same files. Once both pass, K-42 through K-49 are fully verified — nothing scoped from this entire pipeline-review session remains open.
Active Modules: kanban
Active Expansions: none
