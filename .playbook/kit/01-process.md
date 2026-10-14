---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Topic A (integrity repair) except the two items awaiting a decision (see below). Root `_index.md` rebuilt repo-specific; rules single-sourced and grouped (C/D/P/X) in the template `_index.md`; stray root copies staged in `.playbook/_to_delete/`; kanban duplicates, `pipeline.md` links, `flows--` filenames, and `03-execution.md` stale refs fixed. Branch `claude/pipeline-assessment-kit-update`; not merged.
Next: Decisions needed to close Topic A: (1) close K-12/K-13 and the matching `03-execution.md` criteria, and archive or delete `playbook/docs/code-standards-c.md`/`-rust.md`; (2) how to handle docs the log says exist but don't (flows `_index.md`, journey flows 1–5, `docs/flows/create-playbook/`, `docs/contracts/_index.md`) — recreate, or correct the log. Then Topic B (single-source template, gitignore generated copies, drift check), C (validator, session-start check, archive thresholds), D (domain-agnostic pass). Run `pnpm build` after B.
Active Modules: kanban
Active Expansions: none
