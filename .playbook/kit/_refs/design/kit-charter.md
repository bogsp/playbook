---
file: '.playbook/kit/_refs/design/kit-charter.md'
responsibility: 'Proposal: restore the Context Kit to its original intent (lean containers for the user''s intent), close the causes of bloat by design, and realign the kit guides and maintenance doc.'
ai_instructions: 'Proposal only. Edit no template, guide, or kit file until the person approves a step in section 7. Record approvals in kit/04-progress.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ once the charter is adopted.'
---

# Kit Charter — Restoring the Context Kit's Intent

Full path (output copy): `/mnt/user-data/outputs/playbook-kit/kit-charter-proposal.md`
Date: 2026-10-15 · Status: proposal · Sequence: this comes **before** slice 1 step S1, because the kit is the project's state and slice 1's history work (E6) depends on it.

## 1. The intent, as you stated it

| File | Intended job | Shape |
|---|---|---|
| `01-process` | Lightweight entry: context, last and next tasks, project state | a few lines |
| `02-exploration` | Open questions and closed decisions, with links to details, references, resources | index lines + links |
| `03-execution` | The task checklist: phased breakdown, itemized tasks and status, issues | checklist |
| `04-progress` | Append-only log: **one-line events** with references to other kit files | one line per event |
| `05-kanban`, `06-qa` | Work board; checks and sign-off | tables |
| `_archives` | Keeps core files lean: references, previous data, details too long for the core | overflow storage |

The kit files are the state of the project, and the lean, on-point containers for the user's intent. Rules about the files live **outside** them (guides, maintenance).

## 2. What actually happened (measured in this repo, 2026-10-15)

| File | Intended | Actual |
|---|---|---|
| `04-progress` | one-line events | 141 entries, median 365 characters; only 23 are ≤200; 55 KB |
| `05-kanban` | board of active work | 29 KB; **24 KB is Done tickets**, median 542 characters each (a paragraph per closed ticket) |
| `02-exploration` | decision index with links | 10 decisions, median 1,338 characters, all inline (13 KB); detail has no home but the file |
| `01-process` | a few lines | `Last Completed` 555 characters, `Next` 498 characters |
| `03-execution` | current phase checklist | stale; still describes a finished restructure |

The same decision is written in `02-exploration`, `04-progress`, and `05-kanban` (review-gate: 5, 12, and 2 mentions). **I contributed to the growth in this very session**: my own `01-process` updates were paragraph-length. That is the system working as designed, which is the point of section 3.

## 3. Why it bloated — and how each cause is closed

| Cause (found in the shipped templates and guides) | Fix by design |
|---|---|
| **No size or shape limit on any file.** Nothing tells the AI a line is too long. | Each kit file carries machine-readable budgets in its own frontmatter (`max-bytes`, `max-lines`, `line-max`). The limit is visible exactly where the AI writes, with no rules prose to bloat. |
| **Template invites detail.** The progress template says `Decided: [Decision made and rationale]`; exploration has free-text `Context`/`Decision` fields. | Templates show a one-line shape only. Rationale and detail go to a linked file (`_refs/decisions/D-nn.md`), never into the log. |
| **Rules live inside the kit files** (`03` Guidelines, `05` Rules, `06` Rules and "DDA" checks; ≈4.3 KB across the three templates). | Strip them. Rules have one owner: the kit guide. Templates shrink to headings plus a one-line example each. |
| **"Archive when…" has no trigger.** Maintenance says archive when "it takes time to scroll", which nothing enforces, so it never fires. | Numeric thresholds in the budgets above; roll-over is part of the session-end step; a checker flags files over budget. Manual proxy in lines, since upload-only tools cannot count bytes. |
| **Progress contradicts itself.** "Append-only, never edited" but also "fold the prior `In Progress` entry". | Remove `In Progress` from the log entirely. Current state is `01-process`'s job; the log only records events that happened. |
| **Closing a ticket asks for a paragraph.** Done notes became mini-reports. | A closed ticket moves to one line; its detail is one `04-progress` line plus a link. |
| **Guides load everything.** Both guides say to attach `01`–`04` (plus `05`, `06`) every session. | Resume loads `_index` + `01` + active `05`; others by task. Defined as a route in `routes.md` (slice 1). |
| **Three copies of the same guidance.** `context-kit.md` and `context-kit-standalone.md` share 6 of 8 headings (≈11.5 KB); the archive table appears again in `maintenance.md`. `maintenance.md` also carries the whole Frontmatter Tiering rule, a second topic. | One kit guide (the charter) with a short kit-only/full section; `maintenance.md` keeps only archiving; the frontmatter rule becomes the card schema in slice 1 S1. |

## 4. The charter: per-file spec

Budgets are in bytes with a line-count proxy for manual use. `line-max` = longest allowed line.

| File | Holds | Entry shape | Budget | Overflow goes to |
|---|---|---|---|---|
| `01-process` | project one-liner, phase, state, last, next (max 3), open flags, expansions | `Last: <≤160 chars> → refs` | 2 KB / 20 lines | nothing; overwrite in place |
| `02-exploration` | open questions, closed decisions, constraints, links | `Q-nn` or `D-nn \| date \| ≤160 chars \| → link` | 4 KB / 40 lines | detail to `_refs/decisions/D-nn.md`; old closed decisions to `_archives/exploration/` (index line stays) |
| `03-execution` | **current phase only**: goal, done-when, checklist, issues | `- [ ] T-nn ≤120 chars → K-nn or doc` | 4 KB / 45 lines | finished phases to `_archives/execution/` |
| `04-progress` | **current window only**: one line per event | `date \| Completed\|Decided\|Fixed \| ≤160 chars \| refs` | 6 KB / 40 lines | verbatim to `_archives/progress/YYYY-MM.md` when over budget |
| `05-kanban` | active tickets; last 10 Done as one line | `[K-nn] title ≤80 \| type \| blocked-by \| → link` | 5 KB / 50 lines | Done beyond 10 to `_archives/kanban/` |
| `06-qa` | active matrix and sign-off | `QA-nn \| maps to \| status \| executor` | 3 KB / 30 lines | case detail in `_tests/QA-nn.md`; signed-off matrices to `_archives/qa/` |

Rules for every file: a fact is written once (the other files link by ID); an entry that needs more than one line is a link to a detail file; archived content is moved verbatim and nothing is deleted.

**Boundary between `03-execution` and `05-kanban`:** execution is the phase plan and checklist (what and in what order); kanban is the ticket state (who is on what). A task has its detail in exactly one of them and an ID reference in the other. In kit-only projects `05-kanban` is optional and `03-execution` carries the work alone.

**Archives and refs:** `_archives/` holds displaced history, by file and period. `_refs/` holds supporting detail and resources that core files link to (decision records, research, snippets). One rule serves both: *the core file keeps a line and a link; the content lives here.*

## 5. Guides and maintenance, realigned

| Document | Today | Proposed |
|---|---|---|
| `guides/context-kit.md` + `context-kit-standalone.md` | two guides, ≈11.5 KB, mostly identical | **one** guide, the Kit Charter (≤4 KB): intent, per-file table (section 4), the rules, session rhythm, a short kit-only vs full section. The standalone file becomes a redirect line. |
| `maintenance.md` | archiving + whole Frontmatter Tiering rule | archiving only: threshold table (numbers from section 4), roll-over procedure, signs of trouble. Frontmatter moves to the card schema doc (slice 1, S1). |
| Kit templates | ≈11.7 KB, with rules prose | ≈5 KB: frontmatter with budgets, headings, one example line each |
| `00-prompts.md` | prompts say "attach all kit files" | prompts follow the resume route; add a "roll over a kit file" prompt for upload-only tools |
| Template `_index.md` Session Start | lists kit files | points to the charter and the resume route |

## 6. This repo, migrated (and the same path for any existing project)

Verbatim first, condensed second; nothing is deleted.

| File | Today | After |
|---|---|---|
| `04-progress` | 55 KB, 141 entries | verbatim to `_archives/progress/`; one-line index of those 141 entries drafted from tag + first sentence + K-IDs; new log holds the current window |
| `05-kanban` | 29 KB, 36 Done | Done verbatim to `_archives/kanban/`; active ≈5 KB with last 10 Done as one line |
| `02-exploration` | 13 KB, 10 decisions | each decision verbatim to `_refs/decisions/D-nn.md`; core keeps index lines |
| `01-process` | 1.4 KB, paragraph lines | rewritten to the charter shape, ≈1 KB |
| `03-execution` | stale | rewritten for the current phase |

Estimated resume load for this repo: ≈110 KB → ≈20 KB (root `_index` 6 + `01` 1 + `05` active 5 + `04` window ~6 + standards pointer). Generic path for existing projects: a guided "kit roll-over" with the same verbatim-then-condense steps (a prompt for upload-only tools; `create-playbook kit roll` when automated).

## 7. Steps — each needs your approval

| Step | Deliverable |
|---|---|
| K1 | Charter text: the one kit guide + realigned `maintenance.md` (drafts for review) |
| K2 | New kit templates with budgets, stripped of rules; manifest and builds updated |
| K3 | Migrate this repo's kit (five files, each reviewed) |
| K4 | `check` for kit budgets and line grammar (joins slice 1 S2) and the roll-over command/prompt |
| K5 | Rebuild generated copies, scaffold four domains, run the checker on the scaffolds |

Then slice 1 resumes at S1 with the kit already lean, and E6 reduces to "the log is the index" (no separate generator for history).

## 8. Decisions needed

1. **Execution vs kanban boundary** (section 4): detail in one, ID in the other; kanban optional in kit-only. OK?
2. **`_archives/` and `_refs/`**: keep both folders with the one rule above, or merge `_refs/` into `_archives/refs/`?
3. **Progress line grammar:** pipe-delimited `date | tag | event | refs`. OK, or another shape?
4. **One kit guide** (merge the standalone one in) and a **narrowed `maintenance.md`**: approve?
5. **Migration:** verbatim archive first, then AI-drafted one-liners reviewed per file. OK?

## 9. Risks

- **Over-compression.** One-line events lose the *why*. Mitigation: the detail is in a linked file, not discarded; the verbatim originals stay in `_archives/`.
- **Budgets can be gamed** (stuffing a line to the limit). The checker catches size, not quality; review at session end stays human.
- **Manual path is weaker.** Upload-only tools rely on the line-count proxy and the roll-over prompt, and will bloat more slowly than today but not never.
- **Estimates** (resume ≈20 KB, template ≈5 KB) are from current sizes; re-measure after K2–K3.
