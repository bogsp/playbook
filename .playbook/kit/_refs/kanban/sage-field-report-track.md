---
file: '.playbook/kit/_refs/kanban/sage-field-report-track.md'
responsibility: 'Detail for tickets K-58 to K-64: Playbook improvements found while aligning Project Sage to template v2.0.0.'
ai_instructions: 'Detail behind backlog lines in 05-kanban. Read when working the ticket. Keep the ticket text here; keep 05-kanban to one line. Respect CN-01 and the stage gates: plan first, then change templates.'
archive_rule: 'Delete nothing; a closed ticket moves to _archives/kanban/ with its detail.'
owner: project
source: 'Project Sage session of 2026-10-23/24 (bogsp/sage, commits 871a4c8 to the kit archive reorganisation)'
---

# Field report: Project Sage on template v2.0.0

Raised 2026-10-24. Sage is a large adopter (about 300 planning files, 135 flows and contracts, 90 planning documents, six kit files). Aligning it to v2.0.0 took one long session, and most of that was mechanical.

**What worked:** one entry point plus the kit gave fast session starts; hard kit budgets kept files lean; the DDA, flow and contract trace exposed real drift (24 wrong citations, about 30 DDAs citing test files that do not exist, active documents depending on draft ones); "nothing is deleted" made restructuring safe.

**What cost time:**
- No migrator: v2.0.0 changed the shape of about 300 files and the adopter wrote the converters (flows and contracts to purpose block, DDAs to card) and their checks.
- No validator: budgets, ids, links, citations and frontmatter were checked with throwaway scripts.
- Status does not match reality: 54 flows draft vs 19 active; drafted `done-when` fields are generic.
- State kept in several places: task detail in 03-execution, 05-kanban and a plan file.
- Accidents without guards: a standards move overwrote `general.md` with an index stub; two decisions were cited but missing from the live file.
- Fragile sync: each session works from its own clone; the project's synced copy can lag.
- Citations by section number drifted.
- A small project still carries the full set of files.

[K-58] Ship a `playbook check` command (the validator)
Type: CODE
Description: One command that checks frontmatter shape (card or purpose block), kit budgets and line-max, unique ids, `needs` resolve to ids, links and `_archives/` pointers resolve, indexes list every file in their folder, and citations resolve to a real file or heading. Seed: the Sage scripts for frontmatter audit, budget audit, link audit and index audit; `packages/check-drift.mjs` is the existing precedent. Output is a short list a session can fix, exit 1 on failure.
Blocked by: Q-01 (CLI expansion plan)

[K-59] Ship a migration script with every template version
Type: CODE
Description: `create-playbook update` already migrates some changes. Add a per-version migrator for shape changes: v1 to v2 flows and contracts to the purpose block (rename contract sections), deep-module header to card (map fields per the changelog, keep dropped fields in a Header Record so nothing is lost), kit files to budgets with roll-over. Each migrator ends by running the K-58 checker. Seed: Sage `convert_docs.py` and `card.py`.
Blocked by: K-58

[K-60] One home per fact
Type: DDA
Description: Decide where each kind of state lives and have the checker flag duplicates: tickets in 05-kanban, current phase only in 03-execution, later milestones in `_refs/plan/`, decisions in 02-exploration with detail in `_refs/decisions/`. A task has detail in one place, as 03-execution already says; K-58 should enforce it.
Blocked by: K-58

[K-61] Executable `done-when` and derived status
Type: DDA
Description: Let `done-when` be a command or file check where possible (for example `make test`, a file exists, a heading exists). The checker runs it and reports a document as `active` only if it passes. Stops status being set by hand and drifting (Sage: 54 draft vs 19 active flows). Generic one-line checks are a placeholder, not a pass.
Blocked by: K-58

[K-62] Protected files and the version stamp
Type: DDA
Description: Build on Q-06 (`.playbook/.version` with a hash per file). Add a protected list for project-owned files (standards, project rules in `_index.md`) so an update or a bulk move warns before overwriting them, and so the checker can tell which files are still as scaffolded and which are the adopter's. Sage lost `general.md` to an index stub in a standards move and found out days later.
Blocked by: none

[K-63] Stable anchors for citations
Type: DDA
Description: Cite documents by file and heading slug or id, not section numbers (`§14`). Define the citation form, let the checker resolve it, and add a one-line rule in `rules.md`. Sage had 24 wrong section cites after the architecture was renumbered, and a cite to a section that never existed.
Blocked by: K-58

[K-64] Lean mode for small projects
Type: DDA
Description: Define the minimum file set a small project needs (entry, three kit files, one planning layer) and let the rest be added when a task needs it, in line with "simple entry, complex base". Decide which of today's required files move to optional, without weakening the stage gates. Compare with the large-project partitioning design in `_refs/design/large-project-partitioning.md`.
Blocked by: none

Keep as they are: the card, the purpose block, the archive rule and the kit budgets. Adopters found these useful.
