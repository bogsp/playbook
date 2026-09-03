---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-48 — packaged Playbook as a Claude Skill (packages/playbook-skill/): SKILL.md, build.js (shares the same playbook/.playbook/ + playbook/docs/ source as create-playbook/build.js, no separate maintained copy), package.json, README.md. Built against the already-consolidated source (K-42 single vocabulary _index.md, K-47 PLAYBOOK- prefix) so it carries no inherited tech debt. assets/ not generated yet — build.js needs to be run against the real repo tree.
Next: The full pipeline review agreed at the start of this session is complete: K-42 through K-48 — single entry point, review-gate, pipeline-mode, domain-agnostic cleanup, Skill packaging. The one remaining deferred item is the CLI/library code session: update packages/create-playbook/build.js and lib/scaffold.js for the K-42 consolidation (stop copying AI-INSTRUCTIONS.md, generate the merged _index.md), teach `create-playbook init` to ask for review-gate and pipeline-mode preferences (mirroring the domain question), and run `pnpm build` in both packages/create-playbook and packages/playbook-skill against the real repo tree to confirm both build cleanly and produce equivalent output. Also worth doing in that session: a scratch-directory test of both the CLI scaffold and the Skill's instructions to confirm they produce matching structure.
Active Modules: kanban
Active Expansions: none
