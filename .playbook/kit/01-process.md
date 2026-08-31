---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-44 — applied the same README/AI-INSTRUCTIONS/_index.md consolidation to this repo's own root .playbook/, mirroring K-42's template treatment. Root _index.md now carries the "What This Project Is" content (including the Two Playbook Worlds table), Session Start, full AI Behavioral Rules (Frontmatter Standard, Rules 1-12, escalation format, Never Do These, Expansions, When Something Breaks, Session End), How to Use This File, Structure, Active Packages, Project Planning Documents, and Detail. Root README.md reduced to a plain human-facing repo readme. Root AI-INSTRUCTIONS.md retired — flagged for git rm. Also fixed a stale AI-INSTRUCTIONS.md reference in root maintenance.md's Tier 2 file listing.
Next: K-43 — the cross-reference sweep for files neither K-42 nor K-44 touched: playbook/.playbook/pipeline.md, playbook/.playbook/maintenance.md, guides/audit.md, guides/new-project.md, guides/video-insights.md, guides/_index.md, and all four docs/code-standards*.md variants (root and playbook/ copies) — several explicitly reference "AI-INSTRUCTIONS.md" and need updating or review. After K-43: the template and this repo's own files are both settled, so CLI/library code changes (build.js/scaffold.js no longer copying AI-INSTRUCTIONS.md, generating the merged _index.md) can be scheduled. Then resume the broader pipeline review: human-review-gate weight, Progressive Disclosure enforcement, Skill/plugin packaging feasibility, domain-agnostic tooling cleanup.
Active Modules: kanban
Active Expansions: none
