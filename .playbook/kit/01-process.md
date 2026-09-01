---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: K-43 — cross-reference sweep for stale AI-INSTRUCTIONS.md mentions across the whole repo, following K-42/K-44's consolidation. Fixed 6 files (3 pairs, root+playbook where duplicated): pipeline.md (both copies — stale milestone-resume link), maintenance.md (Tier 2 file listing), code-standards.md (both copies — Section 6 intro), code-standards-ts.md (both copies — Section 14 intro + AI Session Boot Order table collapsed to a 5-step _index.md-first sequence, version bumped to 3.2). guides/audit.md, new-project.md, video-insights.md, and guides/_index.md were checked and are clean. code-standards-c.md/code-standards-rust.md checked — no AI-INSTRUCTIONS.md references, left untouched (unrelated to this ticket; those files are separately flagged as legacy per K-09).
Next: The README/AI-INSTRUCTIONS/_index.md consolidation (K-42, K-43, K-44) is fully complete — no remaining stale references anywhere in the repo. CLI/library code changes are now unblocked and can be scheduled as their own session: build.js should stop copying AI-INSTRUCTIONS.md as a separate source, and scaffold.js should generate the merged _index.md instead of copying AI-INSTRUCTIONS.md + README.md + _index.md as three separate files (explicitly deferred by the person until the template and this repo's own copy were both settled — they now are). After that: resume the broader pipeline review in agreed order — human-review-gate weight (replace blanket per-step approval with a narrower auto-approvable category), Progressive Disclosure enforcement (make "complex base, simple entry" structurally real), then Skill/plugin packaging feasibility and domain-agnostic tooling cleanup.
Active Modules: kanban
Active Expansions: none
