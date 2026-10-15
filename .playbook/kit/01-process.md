---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Topics A and B. A: repo-specific root `_index.md`, grouped single-source rules (C/D/P/X), stray root copies staged in `_to_delete/`, links/filenames/kanban fixed, K-12/K-13 closed, log corrected (missing docs re-ticketed as K-50/K-32). B: `packages/template-manifest.json` single-sources the shipped file list for both builds and `scaffold.js`; CLI `templates/` gitignored; `pnpm check:drift` guards committed Skill `assets/`; all four domain scaffolds verified. Branch `claude/pipeline-assessment-kit-update`; not merged; `biome` not run.
Next: Person to answer the five open questions in `slice-1-design-cards-registry-history.md` §9 (domain confirmation, `responsibility` cap, library-doc frontmatter, kit files in registry, id prefixes) and approve step S1. Then S1 → S2 → S3 in order, each approved before it starts; ticket approved steps in `05-kanban.md`. Before merging the branch, run `pnpm install && pnpm lint && pnpm build && pnpm check:drift` locally (biome unverified). Backlog: K-50, K-32, K-19–K-26, `_to_delete/` cleanup.
Active Modules: kanban
Active Expansions: none
