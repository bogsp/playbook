---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Rolled out the Frontmatter Tiering Rule (established 2026-08-12) to its two homes and every file that needs to reference it, per the rule: template-affecting content lives in playbook/.playbook/ or playbook/docs/, this-repo-affecting content lives in .playbook/ or docs/, each authored on its own terms rather than copy-pasted. Concretely: (1) added the canonical "Frontmatter Tiering" section to playbook/.playbook/maintenance.md and fixed its stale # Title/# File: header to the four-field YAML block; (2) added a this-repo-scoped "Frontmatter Tiering — Applied to This Repo" section to root .playbook/maintenance.md, stating Tier 1 doesn't apply at the repo root (no planning docs live there) and Tier 2 covers every file directly under .playbook/; (3) added a pointer rule (playbook copy: rule 19; root copy: rule 11) to both AI-INSTRUCTIONS.md files referencing maintenance.md rather than restating the rule, plus a matching Session Load Order row and Never-Do-These entry; (4) converted all four playbook/.playbook/vocabulary-*/AI-INSTRUCTIONS.md files (software, writing, production, manufacturing) from the old # Title/# File: header to the four-field YAML block and added a "## Frontmatter" pointer section to each, scoped to that domain's Tier 1 doc type (sequencer/piece/deliverable/part) even though non-software domain templates themselves remain deferred (K-38).
Last Completed (cont.): Closed the enforcement gap in the tiering rollout — the rule was documented and pointed-to but nothing forced a check. Added a fifth Session End checklist item to both AI-INSTRUCTIONS.md files: confirm every file touched in the session has frontmatter matching its tier before logging progress.
Next: Update .playbook/kit/05-kanban.md if a ticket is wanted for the Session End checklist change (currently just logged in progress, no dedicated K-ID). Then resolve K-39 — narrow Q-03's remaining scope (playbook/.playbook/pipeline.md, playbook/.playbook/README.md, and all four vocabulary-*/README.md + templates.md still carry the old header style) and confirm whether pipeline.md/README.md also need a Frontmatter Tiering pointer line, not just AI-INSTRUCTIONS.md. K-33 through K-37 (template-file split work) and K-12/K-18 remain open and untouched this session.
Active Modules: kanban
Active Expansions: none
