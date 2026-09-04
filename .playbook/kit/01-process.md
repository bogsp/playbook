---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-49 — updated the create-playbook CLI for the K-42 consolidation and the two new per-project settings. index.js: added Pipeline Mode and Review Gate questions to init, mirroring the domain question. build.js: sources the merged vocabulary-[domain]/_index.md per domain, dropped the retired AI-INSTRUCTIONS.md entry entirely. scaffold.js: copies _index.md per domain instead of README.md+AI-INSTRUCTIONS.md; buildIndex() now writes the person's actual review-gate/pipeline-mode choice into the scaffolded _index.md's frontmatter. package.json bumped 3.0.0 → 3.1.0. README.md's question list and structure diagrams updated to match.
Next: Nothing scoped remains from either this session's pipeline review (K-42–K-48) or the CLI update (K-49) — but K-49 itself is not fully verified: `pnpm build` has not been run against the real repo tree, and no real `create-playbook init` scaffold has been tested end-to-end, since this session has no filesystem access to the actual repo. Both must happen — and packages/playbook-skill's `pnpm build` should be run and spot-checked against the CLI's own output for consistency — before publishing create-playbook@3.1.0 or relying on either package.
Active Modules: kanban
Active Expansions: none
