---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-42 — consolidated the template's README.md/AI-INSTRUCTIONS.md/_index.md into a single entry point (_index.md), and merged all four vocabulary-[domain]/README.md+AI-INSTRUCTIONS.md pairs into per-domain _index.md files. Rewrote context-kit.md, context-kit-standalone.md, and 00-prompts.md for single-message session start (two-message pattern kept only as an explicit fallback for hard-limited tools). Rewrote guides/project-identity.md for the new two-file model; fixed a stale reference in guides/adopt.md. AI-INSTRUCTIONS.md (root and all four vocabulary domains) flagged for deletion, not generated as files this session.
Next: K-44 next — apply the same consolidation to this repo's own root .playbook/ (README.md + AI-INSTRUCTIONS.md merge into root .playbook/_index.md), per explicit instruction to avoid confusion in future sessions here. After that: K-43, the cross-reference sweep for files not yet touched by K-42 (pipeline.md, maintenance.md, remaining guides, all code-standards*.md variants). CLI/library code changes (build.js/scaffold.js no longer copying AI-INSTRUCTIONS.md, generating the merged _index.md instead) explicitly deferred — person wants the template settled before touching automation.
Active Modules: kanban
Active Expansions: none
