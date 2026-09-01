---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-45 — introduced Review Gate as a per-project setting (`review-gate: strict | balanced | lean`) instead of a fixed blanket-approval rule. Added the field + a "Review Gate" section to both _index.md files: template default is `balanced`, this repo declares `strict`. Updated docs/contracts/global.md §2 (playbook-templates track) to reference this repo's chosen level explicitly rather than stating an unexplained absolute rule — no flow doc changes needed since flow-3/4/5's existing per-step behavior already matches `strict`. Also fixed a stray AI-INSTRUCTIONS.md reference in global.md §4 that K-43 missed (that file was never generated as an artifact until this session, so the earlier sweep couldn't check it).
Next: Progressive Disclosure enforcement is next in the broader pipeline review — make "complex base, simple entry" structurally real in the templates rather than a stated-only principle. After that: Skill/plugin packaging feasibility and domain-agnostic tooling cleanup (lowest priority, largest scope, tackled last). CLI/library code changes remain deferred to their own session: build.js/scaffold.js still need updating for the K-42/K-43/K-44 consolidation, and a future create-playbook init hook to ask for review-gate level (mirroring the domain question) is noted but not built.
Active Modules: kanban
Active Expansions: none
