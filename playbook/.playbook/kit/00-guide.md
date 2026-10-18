---
file: '.playbook/kit/00-guide.md'
responsibility: 'How the Context Kit works: what each kit file is for, its size budget and entry shape, the session loop, the prompts, how the kit runs through the pipeline, and how files stay lean by rolling over to archives.'
ai_instructions: 'Read when a kit file is edited, when a budget check finds a file over its limit, or when the person asks for a prompt. Check budgets at session start and end; if one is over, run Roll-over before other work.'
archive_rule: 'N/A — core guide.'
owner: playbook
---

# The Context Kit

Every project loses context between sessions. Without a system, every restart wastes time re-explaining what was already decided and re-discovering what was already built.

The kit is a small set of files, each with one job, that holds the project's state so any session can pick up where the last one stopped, in any AI tool. Sessions are disposable; the state is durable. When a session runs out of context or usage, or drifts, you start a new one from these files and lose nothing.

The kit stays lean on purpose. Every file has a size budget, detail that does not fit moves to `_archives/` (history) or `_refs/` (supporting material), and the core file keeps one line and a link. A small kit costs little context and few rate-limit tokens to read and to update.

The kit runs in one of two modes, set by `pipeline-mode` in `_index.md`:

- **`kit-only`** (default for new projects): the six files on their own, with no discovery brief, flows, contracts, or planning documents. Many projects run for months on just `01-process.md` and `04-progress.md`. Use only what earns its keep.
- **`full`**: the same files running beneath the staged pipeline in [pipeline.md](../pipeline.md). Set the field when you need mapped paths, written contracts, or planning documents before work. Nothing is wasted when you switch; the same files carry forward.

---

## The Files

| File | Job | Update when | Budget | Entry shape |
|---|---|---|---|---|
| `01-process.md` | Entry: phase, last, next (max 3), open flags, `In flight:` | every session | 2 KB / 20 lines | `Last: ≤160 chars → refs` |
| `02-exploration.md` | Open questions and closed decisions, with links to detail | decisions change | 4 KB / 40 lines | `Q-nn` or `D-nn \| date \| ≤160 chars \| → link` |
| `03-execution.md` | Current phase: plan, checklist, known issues | work changes | 4 KB / 45 lines | `- [ ] T-nn ≤120 chars → K-nn` |
| `04-progress.md` | Append-only log, one line per event | every session | 6 KB / 40 lines | `date \| Completed\|Decided\|Fixed \| ≤160 chars \| refs` |
| `05-kanban.md` *(optional)* | Auxiliary board for work that needs status, blockers, or owners | tickets change | 5 KB / 50 lines | `[K-nn] title ≤80 \| type \| blocked-by \| → link` |
| `06-qa.md` *(optional)* | Checks and sign-off | checks change | 3 KB / 30 lines | `QA-nn \| maps to \| status \| executor` |

Each file carries its limits in its frontmatter (`max-bytes`, `max-lines`, `line-max`). If a file has none, use this table.

`03-execution` holds the plan; `05-kanban` holds ticket status. A task's detail lives in one of them and the other holds its ID. Kit-only projects may skip kanban.

`In flight:` in `01-process` marks a change that touches more than one file and is not finished (rule C10). It names the files and the step, and it is cleared once the change is done and logged. A new session resolves it first.

---

### Kit file rules

- Tickets come from the checklist in `03-execution`; one outcome per ticket.
- The top of a kanban column is next. A blocked ticket stays in its column and names its blocker.
- Ticket types: `DDA` writes or syncs a planning document; `CODE` implements against an active planning document; `SYNC` corrects drift between the work and its document. Other domains may rename the types.
- Every check in `06-qa` maps to one acceptance criterion or ticket. A criterion is done only when its check passes. A failure links to a ticket.
- A check passes only after the planning documents match the work (rule C6).
- `01-process` also names what is active beyond the kit: `Active Expansions:` lists each expansion with its phase, its exclusive files and the domain templates in use, so a new session loads only those.

---

## The Session Loop

**Start.** Give your AI `_index.md` and the prompt below. The AI checks what it can open, asks for the base files it needs (`rules.md` and `kit/01-process.md`), and confirms the state. Load more only when the task calls for it.

**Work.** Stay on what `01-process.md` says is next. Log decisions and fixes as they happen, one line each. Do not save them for the end.

**End.** Update `01-process.md` and append to `04-progress.md`, then check budgets and roll over anything that is over (rule: Session end in `rules.md`). These two files are updated every session without exception.

---

## Prompts

Attach `.playbook/_index.md` and send the prompt. The AI asks for anything else it needs, so you do not need to work out an attach list.

**Start or resume (any project)**

```
Start a Playbook session. Follow the Session Start in the attached _index.md.
```

**New project**

```
Start a Playbook session. Follow the Session Start in the attached _index.md. This is a new project.
```

**Existing project or audit:** the prompts are in `adopt.md` and `audit.md`.

**Resume from a milestone** (also attach `docs/rollout/[milestone].md`)

```
Start a Playbook session from the attached milestone snapshot. Follow the Session Start in _index.md.
```

**Generate a milestone summary**

```
Generate a milestone summary for [milestone name]. Use only the project files as your source; don't invent anything.
Cover what was built, key decisions, and what is next. Save it to docs/rollout/[milestone-name].md.
```

**Video insights** (also attach `expansions.md`)

```
I want to extract insights from a video. Title: [title]. Source: [URL or description].
Produce a markdown file following the video-insights process.
```

**Roll over a kit file**

```
Check each kit file against its budget in kit/00-guide.md. For any that is over, run the Roll-over steps,
then tell me what moved, where it went, and what was dropped.
```

**Loading a localized context packet (Packets A–E)**

Message 1 — attach `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/03-execution.md`:

```
I am uploading active project steering files. I will follow up with a high-context isolated knowledge packet.
This message: entry point, process, and execution. Next: Isolated Knowledge Packet.
Confirm briefly.
```

Message 2 — attach the bundle of files that maps to Packet A, B, C, D, or E:

```
Here is Packet [A/B/C/D/E]. Read the frontmatter and any declared invariants completely to initialize your understanding of the localized system constraints. Do not assume traditional SaaS cloud architectures or standard web stack overhead unless explicitly directed by the declared invariants.
```

This is the one prompt that still uses two messages on purpose: the packet may be large or arrive from a separate source.

---

## The Kit Through the Pipeline

In full mode the kit is not a stage; it runs beneath every stage from start to finish. Stage detail is in [pipeline.md](../pipeline.md); what to tidy as each stage closes is in [maintenance.md](../maintenance.md).

| Pipeline stage | Kit touchpoint |
|---|---|
| Audit | Findings feed into `02-exploration.md` and `03-execution.md` on handoff |
| Discovery | Goals and criteria live in `03-execution.md` |
| Mapping | Flow decisions close in `02-exploration.md` with references |
| Rules | Contract decisions close in `02-exploration.md` |
| Planning | Component decisions close in `02-exploration.md` |
| Work | Progress in `04-progress.md`; issues in `03-execution.md` |
| Handoff | Milestone logged in `04-progress.md`; state updated in `01-process.md` |

When an expansion is active, declare it in `01-process.md`, update its phase as it advances, and clear it when it completes. The details and examples are in [expansions.md](../expansions.md).

---

## Keeping Files Lean

Core files hold what is current. The core file keeps a line and a link; the content lives in `_archives/` or `_refs/`.

| File | Overflow goes to |
|---|---|
| `01-process` | nowhere; overwrite in place |
| `02-exploration` | question detail → `_refs/questions/Q-nn.md`; decision detail → `_refs/decisions/D-nn.md`; old decisions → `_archives/exploration/` (the index line stays) |
| `03-execution` | finished phases → `_archives/execution/`; a current phase that alone exceeds budget splits into parts, one line each here and the checklist in `_refs/execution/<part>.md` |
| `04-progress` | `_archives/progress/YYYY-MM.md` |
| `05-kanban` | Done tickets beyond the latest 10 → `_archives/kanban/` |
| `06-qa` | case detail → `_tests/QA-nn.md`; signed-off matrices → `_archives/qa/` |

Rules for every file:

1. Write a fact once; other files link by ID.
2. An entry that needs more than one line becomes a link to a detail file.
3. Log events clearly, in plain words, and link to details when needed.
4. Nothing is deleted. Overflow moves.

### Roll-over

**Trigger:** a file over `max-bytes` or `max-lines`, or a line over `line-max`. Check at session start and end.

**Three ways to run the same procedure**

- *Manual:* count lines and bytes (`wc -lc file`), then follow the steps.
- *AI-assisted:* send the "Roll over a kit file" prompt above, or let the AI do it at session end.
- *Automated:* a script runs the check and flags files (planned). The AI still writes the condensed records.

**Steps**

1. Pick what leaves, per the table above. Keep current and open items, and the 10 most recent Done tickets.
2. Preserve the original. In a git project, commit first and note the commit in the archive header. Otherwise save the untouched text beside the archive as `<name>.orig.md`.
3. Condense losslessly into `_archives/<file>/<period>.md`, one record per item: `date | tag | what | why | outcome | refs`. Keep every ID, path, number, date, decision, and reason. Drop only filler prose. Header lines: `source:` (commit or `.orig.md`) and `dropped:` (what was cut, in one line).
4. Leave a pointer in the core file: `Archived: _archives/progress/2026-09.md (n entries)`.
5. Log it: one `Fixed` line in `04-progress` with refs to the archive.
6. Report to the person in three lines: what moved, where it went, what was dropped.

Planning documents, flows, contracts, and the project map are tidied by the same discipline; see [maintenance.md](../maintenance.md).

---

## When Context Drifts

If the AI starts ignoring the files or suggesting things already decided:

> Stop. Your only source of truth is the files loaded at session start.
> Ignore all prior conversation context. Re-read the files before continuing.

If it persists, start a fresh session. In full mode, use the most recent [milestone snapshot](../../docs/rollout/) as context. In kit-only mode there is no snapshot, so start again from `_index.md`; the kit files are the source of truth.

---

## When You're Ready for More

If a kit-only project grows into needing mapped paths, written contracts, or planning documents before work, nothing here changes. You are adding stages in front of and around the same six files. Set `pipeline-mode: full` in `_index.md` and continue with [pipeline.md](../pipeline.md).
