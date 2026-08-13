---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Resolved K-38 (previously deferred) and extended K-34's split-file pattern to all four domain vocabularies. Authored playbook/.playbook/vocabulary-[domain]/templates/ folders for software, writing, production, and manufacturing — each with a Tier 2 _index.md (four-field block, listing the domain's types and pointing concern/integration to the universal ../../templates/) plus one Tier 1 template file per domain-specific type: software (structure, sequencer, component — all carrying a layer field), writing (coordinator, piece — piece carries angle/audience), production (coordinator, deliverable — deliverable carries deadline/definition-of-done), manufacturing (coordinator, part — part carries specification/definition-of-done). Superseded an earlier same-session draft that generated single wrapper templates.md files per domain — corrected to match the established split-file convention before finalizing.
Next: K-41 — retroactively log the Session End frontmatter-check enforcement item (added 2026-08-12) as its own kanban ticket, marked Done on creation. Then: (1) K-36 — update references to templates.md across shipped docs now that software AND all three other domains use the templates/ folder, not a single file; each vocabulary-[domain]/AI-INSTRUCTIONS.md's "Frontmatter" pointer section and templates.md reference needs updating to point at templates/_index.md instead. (2) K-33 — confirm the universal playbook/.playbook/templates.md is ready to retire now that all five per-type files exist under playbook/.playbook/templates/, and that domain-specific pointers (concern/integration) resolve correctly. (3) K-37 — update build.js and scaffold.js to copy the templates/ folder per domain instead of a single file. (4) K-39 remainder — pipeline.md, README.md (both universal and needs check whether same is true for domain README.md/templates.md pattern now closed by this session's work), still on old-style header.
Active Modules: kanban
Active Expansions: none
