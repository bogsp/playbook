---
file: '.playbook/kit/02-exploration.md'
responsibility: 'Index of open questions, closed decisions and constraints, with links to detail.'
ai_instructions: 'One line per question or decision; detail and reasoning go in _refs/questions/ or _refs/decisions/. Do not reopen a closed decision without explicit human instruction.'
archive_rule: 'Closed decisions that affect no active task move to _archives/exploration/; the index line stays.'
owner: project
max-bytes: 4096
max-lines: 40
line-max: 200
entry-shape: 'Q-nn | question | -> link ; D-nn | date | <=160 chars | -> link'
---

# Exploration
Archived: _archives/exploration/decisions-pre-migration.md (13 decisions, 2026-05-06 to 2026-05-23)
## Open Questions

Q-03 | Frontmatter sweep: recheck files still in the old header style (K-39 converted pipeline.md, vocabulary READMEs) | -> _refs/questions/Q-03.md
Q-05 | Packets A-E prompt in kit/00-guide.md looks project-specific: keep, move to _refs/, or drop | -> _refs/questions/Q-05.md
Q-06 | Upgrade path for older projects: detect template changes, offer updates, keep project edits | -> _refs/questions/Q-06.md

## Decisions

D-01..03 | 2026-08-11 | Four-field frontmatter standard; journey-flows scope (K-50 open); root duplicates deleted | -> _refs/decisions/D-01.md, D-02.md, D-03.md
D-04 | 2026-08-12 | Frontmatter Tiering: Tier 1 planning docs add the deep-module header; Tier 2 keeps the four-field block | -> _refs/decisions/D-04.md
D-05 | 2026-08-29 | Contract sections: Normal Flow, Failures, Edge Cases, Ordering, Constraints; concurrency folded into Ordering (K-05) | -> _refs/decisions/D-05.md
D-06 | 2026-08-29 | One entry point: _index.md absorbs AI-INSTRUCTIONS.md and vocabulary pairs; README.md plain human readme (K-42) | -> _refs/decisions/D-06.md
D-07 | 2026-08-31 | review-gate per-project setting: strict, balanced (default) or lean; ambiguity always halts (K-45) | -> _refs/decisions/D-07.md
D-08 | 2026-08-31 | pipeline-mode per-project setting: kit-only (default) or full; switching up is safe (K-46) | -> _refs/decisions/D-08.md
D-09 | 2026-08-31 | Claude Skill built from the same template source as the CLI; no second hand-kept copy (K-48) | -> _refs/decisions/D-09.md
D-10 | 2026-08-31 | create-playbook 3.1.0: merged domain _index.md; asks review-gate and pipeline-mode at init (K-49) | -> _refs/decisions/D-10.md
D-11 | 2026-10-14 | Rules single-sourced by scope with stable IDs: Core C, Dependencies D, Pipeline P (full mode), Project X | -> _refs/decisions/D-11.md
D-12 | 2026-10-15 | Context design: interface cards, sharded generated registry, routes.md, one domain per project (slice 1) | -> _refs/decisions/D-12.md
D-13 | 2026-10-15 | Kit Charter: lean kit files, one-line events, rules outside the kit, detail to _archives/ and _refs/ (lossless roll-over) | -> _refs/decisions/D-13.md
D-14 | 2026-10-16 | Guides dissolved into Playbook docs; rules.md split out; two READMEs; one self-adapting AI entry (Session Start) | -> _refs/decisions/D-14.md
D-15 | 2026-10-16 | Sessions disposable, state durable: C9, C10 safeguards; cost is context load and rate limits, not bytes | -> _refs/decisions/D-15.md
D-16 | 2026-10-16 | Before merging, replacing or condensing a doc: inventory, approval, then a line-by-line coverage check | -> _refs/decisions/D-16.md
D-17 | 2026-10-17 | GitHub is the distribution source; a no-terminal scaffolder writes files then steps aside (K-55) | -> _refs/decisions/D-17.md
D-18 | 2026-10-18 | K2: lean kit templates; adopt.md and audit.md split by project type; decision-record folded into _refs/decisions (K-57) | -> _refs/decisions/D-18.md
D-19 | 2026-10-18 | No scripts or code until templates and structure are finished; checks and roll-over stay manual or AI-assisted | -> _refs/decisions/D-19.md
