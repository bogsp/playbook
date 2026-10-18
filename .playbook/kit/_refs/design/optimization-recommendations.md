---
file: '.playbook/kit/_refs/design/optimization-recommendations.md'
responsibility: 'Candidate recommendations for optimizing the Playbook pipeline for AI-assisted development: ease of use and drift prevention, domain-agnostic. For discussion; nothing here is decided.'
ai_instructions: 'Treat as a proposal list. Do not implement an item until the person approves it. Record each decision in kit/04-progress.md and re-ticket approved items in kit/05-kanban.md.'
archive_rule: 'Archive to .playbook/kit/_archives/ once every item is decided.'
---

# Playbook Pipeline — Optimization Recommendations

Full path (output copy): `/mnt/user-data/outputs/playbook-kit/pipeline-optimization-recommendations.md`
Date: 2026-10-14 · Status: proposal

## The foundation this rests on

These hold across models and tools, so the recommendations lean on them:

1. **Context is finite and degrades with bulk.** More, longer, or repeated instructions mean more skipped ones.
2. **Models follow checkable procedures better than prose.** A rule a script can verify beats a rule an AI should remember.
3. **Models assert state they have not verified.** This repo's own log shows it (see R5).
4. **Not every tool can run scripts or hooks.** Some are upload-only, so every enforcement idea needs a fallback.

## Measured starting point (this repo, 2026-10-14)

| Fact | Value |
|---|---|
| Session-start load | ≈110 KB (`_index` 6 KB + template rules 14 KB + code-standards 4 KB + process 1.4 KB + progress 53 KB + kanban 31 KB) |
| Share that is history (progress + kanban) | ≈76% |
| Template `_index.md` loaded every session in a scaffolded project | 14.4 KB, plus 4.9 KB domain `_index.md` |
| Same decision written in 3 places | e.g. review-gate: 5 mentions in exploration, 12 in progress, 2 in kanban |
| Mechanical checks that exist | one (`check:drift`, added this session) |
| CLI commands | `init`, `sync` (library docs only), `generate` — no `check`, no template upgrade |
| Agent auto-load pointer (`AGENTS.md` / `CLAUDE.md`) | none |
| Log claims that did not match the repo | K-44 root `_index`, K-27 journey flows, K-19 CLI flows, flows `_index.md` |

---

## A. Cut the context cost

**R1. Split state from history, with size budgets.** *(Impact: high · Effort: low–medium · Works without tools: yes)*
Resume needs current state, not the full log. Session start loads `_index` + `01-process` + active kanban only. `04-progress` keeps a recent window (say ≤8 KB); older entries roll to `_archives/` by rule, not by memory. Thresholds are enforced by R4's checker. Expected result: ~110 KB → ~40 KB (~30 KB with R3).

**R2. Write each fact once.** *(Impact: high · Effort: medium · Tools: no)*
Decisions get an ID (`D-nn`) and live only in one ledger. Progress entries and kanban resolutions link to the ID with one line, instead of restating the decision. Kanban "Resolved" notes today are paragraph-length copies of progress entries.

**R3. Slim the entry point.** *(Impact: medium · Effort: low · Tools: no)*
The template `_index.md` is 14 KB. Move the Structure map template, How-to-Use table, and Detail blocks out; keep rules, session start, and pointers (target ≤6 KB, the size the root file already is).

## B. Make drift detectable, not just discouraged

**R4. Ship a `check` command in every project.** *(Impact: very high · Effort: medium · Tools: needs Node; fallback below)*
`create-playbook check` (and a plain script copy for projects without the CLI). Checks: four-field frontmatter present, allowed `status` values, broken relative links, duplicate IDs, one `In Progress` entry, kit file size budgets, `file:` equals actual path, `approved` docs contain no `TODO`, Structure map matches the filesystem, generated-copy drift. Fallback for upload-only tools: the same checks as a checklist prompt.

**R5. Claims need receipts.** *(Impact: high · Effort: low · Tools: no; checker strengthens it)*
A `Completed` or `Resolved` entry must cite a path, commit, or command result. The checker verifies cited paths exist. Motivation: the log recorded several things as done that were never committed, and once took a verbal "flows 0–5 are done" to mean contracts were done. Add a Core rule: never state that a file, test, or result exists without having observed it.

**R6. Plan-to-code sync as a check.** *(Impact: high · Effort: medium–high · Tools: needs git)*
Planning documents declare `governs:` paths (globs; works for chapters or parts, not just code). The checker flags governed files that changed after their planning doc was last updated. This turns the "sync check" rule from an AI chore into an automatic report.

**R7. Change manifest before multi-file edits.** *(Impact: medium–high · Effort: low · Tools: no)*
Before touching more than N files, the AI posts one line per file (create / change / delete). `review-gate` decides whether that needs approval (strict: always; balanced: when it adds architecture, dependencies, or deletions). Afterwards the checker or a `git diff` confirms the actual change set matches. Catches scope creep, which the log shows happening.

**R8. Open-flags register that survives sessions.** *(Impact: medium · Effort: low · Tools: no)*
Flags use a fixed block (`FLAG: category | file | question | options`) and are listed in `01-process.md` until answered. A new session starts by reading open flags; work on a flagged item is blocked.

**R9. Structured start and end of session.** *(Impact: high · Effort: low · Tools: hook optional)*
Start: the AI prints a fixed handshake (loaded files, mode, gate, phase, next step, open flags) so a wrong load is obvious in five lines. End: a fixed close-out block proposing the `01-process` and `04-progress` updates. Tool-capable agents get a stop hook that runs R4; upload-only tools use the same block as a prompt.

## C. Simplify the process

**R10. Presets instead of two independent settings.** *(Impact: medium · Effort: low · Tools: no)*
`quick` (kit-only, lean), `standard` (kit-only, balanced, with defined triggers to move to full), `controlled` (full, strict). The underlying `pipeline-mode` and `review-gate` fields stay. Add explicit upgrade triggers (second contributor, more than N planning pieces, an external dependency) instead of "edit the frontmatter anytime".

**R11. Smaller default kit.** *(Impact: medium · Effort: medium · Tools: no)*
Kit-only mode ships three files (state, log, board); exploration, execution, and QA are added on demand. In this repo `03-execution.md` went stale because its task list duplicates the kanban.

**R12. Definition of done in every unit.** *(Impact: medium–high · Effort: low · Tools: no)*
Every planning doc and ticket carries `done-when:` as an observable check. Today only production and manufacturing templates have it. The checker refuses `status: done` without evidence (R5).

**R13. Rule hygiene.** *(Impact: medium · Effort: low · Tools: no)*
Each rule lists how it is enforced (checker / hook / human). Rules with no enforcement are marked advisory and reviewed for removal. Cap the core set (C+D+P is 18 today).

## D. Domain-agnostic

**R14. Domain packs.** *(Impact: high for non-software use · Effort: medium–high · Tools: no)*
A pack = domain `_index.md` (≤3 KB) + templates + checker config + a domain standards file. `docs/code-standards*` becomes the software pack's standards file; writing, production, and manufacturing get their own (style guide, SOP, spec). Remove software references (code-standards, PR, linter) from universal files. Replace software-shaped header fields (`MODULE_ID`, `SYSTEM_CONTEXT`) and the two frontmatter tiers with one required core block plus optional typed fields. Only software has been tested end to end, so this needs one real non-software project to validate.

## E. Distribution and ease of use

**R15. Auto-load pointer files.** *(Impact: high · Effort: low · Tools: agent tools)*
Scaffold `AGENTS.md` and `CLAUDE.md` containing "read `.playbook/_index.md` first". Removes the manual "attach these files" step for agent tools.

**R16. `resume` context packet.** *(Impact: high for upload-only tools · Effort: low–medium)*
`create-playbook resume` assembles the session-start files in order, within a byte budget, archives excluded, into one file to attach. Enforces load order and size without relying on the person.

**R17. Version stamp and `upgrade`.** *(Impact: high over time · Effort: medium)*
Scaffolded projects freeze the rules at scaffold time and `sync` only updates library docs. Add `playbook-version:` to `_index.md` and a `create-playbook upgrade` that shows a diff of shipped files against the project's copies and never overwrites project content.

**R18. CI plus process regression tests.** *(Impact: high given fast model change · Effort: medium–high)*
CI runs R4 and `check:drift` on every PR. Separately, a small set of scripted scenarios with expected behavior (ambiguous request gets flagged; draft doc gets flagged; unverified claim gets challenged; session end produces the close-out block) run against whichever models you use, on each release or model change. Start as a manual checklist in `kit/_tests/`.

---

## Suggested bundles

| Bundle | Items | Why together |
|---|---|---|
| 1. Lean and verifiable (recommended first) | R1, R2, R3, R4, R5 | Cuts session-start load by roughly two thirds and adds the first real enforcement |
| 2. Session discipline | R7, R8, R9, R15, R16 | Tight start/end, no manual attaching |
| 3. Simplify | R10, R11, R12, R13 | Fewer decisions and files |
| 4. Domain-agnostic | R14 | Needs a real non-software trial |
| 5. Long-term upkeep | R6, R17, R18 | Keeps shipped projects and process current as models change |

## What I am not recommending

- More documents or more rules. Every item above either removes load or turns a rule into a check.
- Rewriting the stage model (Discovery → Mapping → Rules → Planning → Work → Handoff). It is sound; the cost is in the bulk and unenforced rules around it.
