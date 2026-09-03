---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Rewrote packages/playbook-skill/README.md's Installing section with concrete instructions instead of a placeholder pointing to external docs — three install paths (Claude Code personal via symlink, recommended default; Claude Code project-only; claude.ai/Cowork/Desktop account upload with its stricter frontmatter allowlist noted) plus a /skills verification step and clarification that only SKILL.md + assets/ are needed at runtime.
Next: K-42 through K-48 (the full pipeline review scoped at session start) are complete. The one remaining item is the deferred CLI/library session: update packages/create-playbook/build.js and lib/scaffold.js for the K-42 consolidation, teach `create-playbook init` to ask for review-gate and pipeline-mode preferences, and actually run `pnpm build` in both packages/create-playbook and packages/playbook-skill against the real repo tree to confirm they build cleanly and produce correct, equivalent output.
Active Modules: kanban
Active Expansions: none
