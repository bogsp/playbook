---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Closed K-05 — contract section naming finalized (Normal Flow / Failures / Edge Cases / Ordering / Constraints; concurrency folded into Ordering, not a separate section). Applied to playbook/docs/contracts/contract.md and all 8 docs/contracts/playbook-templates/flow-N-*.md files — headers only, no content changes. This was the last open architectural-decision blocker; K-05 removed from the "not in this track" flag list in 05-kanban.md.
Next: K-37 is the remaining blocker before the pipeline can be called finalized (CLI/scaffold.js and build.js sync with the split templates/ folder pattern — currently deferred to a separate CLI/library session per standing instruction). After K-37: resume the clerical track (K-07, K-10, K-18), then move into the broader pipeline optimization review — session-mechanics modernization (global two-message pattern, not just Claude-specific), Progressive Disclosure enforcement in the templates themselves, a lighter-weight human-review-gate model (replace blanket per-step approval with a narrower auto-approvable category), and a feasibility check on packaging Playbook as a Skill/plugin alongside a domain-agnostic cleanup of the software-specific tooling.
Active Modules: kanban
Active Expansions: none
