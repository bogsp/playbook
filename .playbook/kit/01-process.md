---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Closed K-37 — rewrote packages/create-playbook/build.js and lib/scaffold.js to copy the split per-type templates/ folders (universal + software/writing/production/manufacturing) instead of the retired single templates.md per scope. Both files now share explicit file-list constants to stay in sync. Scope note: also wired in three previously-unreferenced files (guides/context-kit-standalone.md, guides/project-identity.md, kit/_tests/test-case.md) that existed in the repo but were never copied by the CLI — flagged to the person as a scope expansion beyond K-37's original text, not silently folded in.
Next: Both declared blockers (K-05, K-37) are now closed — nothing prevents calling the pipeline finalized on the open-tickets front. Remaining clerical track: K-07 (author missing _tests/ template — note K-37 already wired the existing test-case.md into the CLI, so K-07 should confirm whether a template still needs authoring or just needs its cross-reference checked), K-10 (document _refs/ subfolders in _index.md), K-18 (confirm standalone-path references — can now be tested against a real `create-playbook init` scaffold post-K-37). After the clerical track: broader pipeline optimization review — session-mechanics modernization (global two-message pattern, not Claude-specific), lighter-weight human-review-gate model, Progressive Disclosure enforcement in the templates themselves, and a feasibility check on packaging Playbook as a Skill/plugin alongside domain-agnostic cleanup of software-specific tooling.
Active Modules: kanban
Active Expansions: none
