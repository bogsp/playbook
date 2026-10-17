---
file: '.playbook/pipeline.md'
responsibility: 'Complete reference for how the Playbook pipeline works — every stage, every output, every format.'
ai_instructions: 'Read as much or as little as needed. Points to templates and guides rather than duplicating them.'
archive_rule: 'N/A — core reference file, kept current as stages evolve.'
---

# Playbook Pipeline

This is the complete reference for how Playbook works — every stage, every
output, every format. Read as much or as little as you need.

---

## The Big Picture

Playbook moves every project through the same stages, in order. Each stage
produces something concrete that the next stage builds on. Skipping a stage
means the next one is built on guesswork.

```
Thinking → Discovery → Mapping → Rules → Planning → Work → Handoff
```

Existing projects add one stage at the front — understanding what already
exists before anything changes.

| Stage | Plain language | Produces |
|---|---|---|
| 0 — Audit | Understand what already exists | Findings in `docs/rewrite/` |
| 1 — Thinking | Get aligned and stay aligned | Session files in [kit/](kit/) |
| 2 — Discovery | Define what you're making and why | A brief in `docs/` |
| 3 — Mapping | Walk every path before building anything | Path documents in `docs/flows/` |
| 4 — Rules | Write what every piece must follow | Rules documents in `docs/contracts/` |
| 5 — Planning | Define every piece before touching it | Planning documents in `.playbook/` |
| 6 — Work | Do the work against the plan | Your output |
| 7 — Handoff | Capture what was built and why | A snapshot in `docs/rollout/` |

---

## Starting

Where you start depends on the project.

| Your situation | Start here |
|---|---|
| I want session continuity — decisions, tasks, progress — with no pipeline overhead | [kit/00-guide.md](kit/00-guide.md) (`pipeline-mode: kit-only`) |
| I want the kit alongside the full pipeline (Discovery → Handoff) | [kit/00-guide.md](kit/00-guide.md), then the stages below (`pipeline-mode: full`) |
| I'm starting a brand new project | **A new project**, below |
| I have an existing project and know it well | **An existing project**, below |
| I have an existing project I don't fully understand yet | the Audit in [expansions.md](expansions.md#audit) |
| I want to keep `README.md` and `_index.md` current for this project | Keep Project Identity Current in [maintenance.md](maintenance.md) |
| I want to bring a video (tutorial, interview, research) into my project | Video Insights in [expansions.md](expansions.md#video-insights) |

Not sure where to start? Read `.playbook/README.md`.

### A new project

**1. Set up your session files.** Copy the kit files from [kit/](kit/) into your project. These are your working files for the life of the project. Open [kit/01-process.md](kit/01-process.md) and fill in the project name, the current stage (Thinking), and what is next (Discovery). That is all you need to start.

**2. Work through the pipeline.** Follow the stages below in order. Each one produces something the next stage builds on. Do not skip stages. Each stage is a checkpoint: the next one only starts when the current one is done and agreed on. As Discovery completes, update **What This Project Is** in `_index.md` to match the approved brief; see Keep Project Identity Current in [maintenance.md](maintenance.md) for what else to keep current and when.

**3. Choose your project type.** Open the domain folder that matches your project and read its entry file.

| Project type | Entry file |
|---|---|
| Software development | [vocabulary-software/_index.md](vocabulary-software/_index.md) |
| Writing and editorial | [vocabulary-writing/_index.md](vocabulary-writing/_index.md) |
| Production and operations | [vocabulary-production/_index.md](vocabulary-production/_index.md) |
| Manufacturing | [vocabulary-manufacturing/_index.md](vocabulary-manufacturing/_index.md) |

**4. Start your first AI session.** Use the **New project** prompt in [kit/00-guide.md](kit/00-guide.md).

### An existing project

Bringing an existing project into Playbook without breaking anything. Four questions determine where you start.

**1. Does the project have any documentation?**

- No → start at [Discovery](#stage-2--discovery)
- Yes → continue to question 2

**2. Is the documentation current and accurate?**

- No → start at [Audit](#stage-0--audit-existing-projects-only)
- Yes → continue to question 3

**3. Are the paths and rules defined?**

- No → start at [Mapping](#stage-3--mapping)
- Yes → continue to question 4

**4. Does every piece have a planning document?**

- No → start at [Planning](#stage-5--planning)
- Yes → you are already running Playbook — set up your [kit files](kit/) and continue

Regardless of where you start, do this first:

1. Copy the kit files from [kit/](kit/) into your project
2. Open [01-process.md](kit/01-process.md) — fill in the project name, current stage, and what's next
3. Open [02-exploration.md](kit/02-exploration.md) — record what you already know: key decisions made, open questions, known constraints
4. Open [03-execution.md](kit/03-execution.md) — record the current plan and any known issues
5. Update `.playbook/_index.md` and `README.md` to reflect this project — see Keep Project Identity Current in [maintenance.md](maintenance.md)

If the project needs an audit first: an audit maps what already exists before anything changes. It runs as Stage 0 and hands off findings directly into your kit files. Full process: [expansions.md](expansions.md#audit).

Then start your first AI session with the **Adopting an existing project** prompt in [kit/00-guide.md](kit/00-guide.md).

### Growing from kit-only

If a `kit-only` project grows into needing mapped paths, written contracts, or planning documents before work, nothing already built changes. Set `pipeline-mode: full` in `_index.md` and continue from the stages below.

---

## Stage 0 — Audit *(existing projects only)*

Before redesigning or rebuilding something, you need to understand what it
actually is — not what you think it is. This stage maps it.

**Phases:** inventory → audit → classify → risk-map → gap-report → handoff

Each phase requires your review before moving to the next. Nothing advances
on its own.

**What it produces:**
- `docs/rewrite/system-map.md` — what exists, where it lives, what depends on what
- `docs/rewrite/decision-record.md` — a verdict on every major piece, with reasoning
- `docs/rewrite/risk-register.md` — what breaks if X changes, and the safe order to change things

When complete, findings feed directly into the session files so the rest of
the pipeline has accurate context to work from.

Full process: [expansions.md](expansions.md#audit)

**Close out:** findings are in `kit/02-exploration.md` and `kit/03-execution.md`; superseded inventory notes in `docs/rewrite/` are archived. The system map, decision record, and risk register stay active until the rewrite they describe is done.

---

## Stage 1 — Thinking *(always active)*

This isn't a stage that completes — it runs underneath every other stage from
start to finish. It's how you and your AI stay aligned across sessions.

The six kit files are the project's state, each with one job and a size budget: [kit/00-guide.md](kit/00-guide.md) is the guide, and session prompts live there too.

Update `kit/01-process.md` and `kit/04-progress.md` at the end of every
session. These two files are never optional.

**Close out:** at the end of every session, budgets are checked and anything over is rolled over to `_archives/` (see [kit/00-guide.md](kit/00-guide.md)).

---

## Stage 2 — Discovery

Define what you're making, why, and for whom. Everything else flows from
this. This stage is complete when anyone can read the document and understand
the goal.

**Produces:** `docs/[name].md` — goals, audience, constraints, acceptance criteria
**Done when:** document approved, acceptance criteria are clear and verifiable
**Close out:** the brief is the only live version; earlier drafts are archived.

---

## Stage 3 — Mapping

Walk through every major path the project will take — including what happens
when things go wrong — before defining any individual piece. Problems live in
the connections between things, not inside the things themselves.

**Produces:** `docs/flows/_index.md` + one `docs/flows/flow-N-[name].md` per path
**Done when:** every major path has a document, all reviewed and agreed on
**Close out:** `docs/flows/_index.md` lists every flow; a path that no longer exists is archived, with a pointer left behind.

Template: [docs/flows/flow-template.md](../docs/flows/flow-template.md)

---

## Stage 4 — Rules

Write down what every piece must follow, drawn from the paths you mapped.
This is where behaviour lives — individual planning documents point here,
they never repeat it.

**Produces:** `docs/contracts/_index.md` + `docs/contracts/global.md` + one `docs/contracts/flow-N-[name].md` per path
**Done when:** all required sections complete, no section marked TODO
**Close out:** every contract maps to a flow; superseded rule versions are archived.

Templates: [docs/contracts/contract-template.md](../docs/contracts/contract-template.md), [docs/contracts/global.md](../docs/contracts/global.md)

---

## Stage 5 — Planning

Define every piece of the project before doing any work on it. A planning
document is the agreement — the work follows it.

**Produces:** `_index.md` + one planning document per piece
**Done when:** all documents approved, project map current, no section marked TODO
**Close out:** the project map matches the filesystem; retired components are archived (see Planning Documents in [maintenance.md](maintenance.md)).

Templates: [vocabulary-[domain]/templates/](vocabulary-software/templates/_index.md) and [templates/](templates/_index.md)

### Planning Document Types

Every piece in a project gets one of these document types:

| Type | What it's for | Plain language |
|---|---|---|
| `structure` | A module or app | The map of a section — what's in it and how the pieces relate |
| `coordinator` | Something that sequences other pieces | Owns the order of operations, not the logic itself |
| `component` | A single piece of work | One job, one responsibility, clearly defined inputs and outputs |
| `concern` | A rule or capability that applies everywhere | Things like security, logging, error handling — defined once, used everywhere |
| `integration` | A connection to an outside tool or service | What the outside thing provides and how the project depends on it |

Every planning document follows the same shape — plain language first,
technical detail below:

```
## What It Does    → plain language, any reader
## Interface       → what goes in, what comes out, what rules apply
## Detail          → edge cases and constraints only — leave this out if nothing fits
```

---

## Stage 6 — Work

Do the work against the planning documents. The plan is the source of truth —
if the work diverges from it, update the plan first, then continue.

**Done when:** all acceptance criteria met, all checks pass, sync check clean
**Close out:** done tasks in `kit/03-execution.md` and Done tickets in `kit/05-kanban.md` are rolled over; fixed issues are closed.

Run the Phase Completion Checklist in [docs/code-standards.md](../docs/code-standards.md)
(if your project has one) before closing any phase.

---

## Stage 7 — Handoff

A snapshot of what was built and why, generated at each milestone. Never
written by hand — always generated from the planning documents and session
history.

**Produces:** `docs/rollout/[milestone].md`
**Done when:** snapshot generated, kit files reflect final state
**Close out:** the finished phase is archived from `kit/03-execution.md` and `kit/04-progress.md`.

Use prompt: [kit/00-guide.md](kit/00-guide.md) → **Generate a milestone summary**

**Resuming from a milestone:** If you're starting a fresh AI session and want
to pick up from a previous milestone, load `docs/rollout/[milestone].md`
alongside [_index.md](_index.md). The snapshot gives the AI the full context
of where the project stands.

---

## Why Playbook Works This Way

Playbook is built on one principle: **Progressive Disclosure + Tiering**.

Start with the simplest version. Add depth only when the work demands it.
Define what's always required, then add sections only when the project's
scope makes them necessary.

This means:
- Simple projects carry only what they need — no extra weight
- Complex projects never skip what simpler ones must do
- Every reader, human or AI, stops when they have enough — the detail is
  always there if they need it

---

## Reference: File Naming

| Thing | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `invoice-validator.md` |
| IDs | match the filename | `id: invoice-validator` |
| Folders | `kebab-case` | `billing/` |
| Reserved folders | underscore prefix | `_concerns/` |
| Index files | always `_index.md` | `billing/_index.md` |

**Two markers used throughout:**
- `N/A` — this section was considered and does not apply
- `TODO` — not yet written; a document can't be marked approved until all TODOs are resolved

**Declaring an active expansion** in [kit/01-process.md](kit/01-process.md) (see [expansions.md](expansions.md)):

```
Active Expansions: video-insights

Active Expansions:
  audit: classify
```

---

## Reference: Folder Map

The generic layout of a Playbook project. **P** = shipped by Playbook, the same in every project. **J** = the project's own.

```
README.md                           J  the project's own readme; points to .playbook/README.md
.playbook/
  README.md                         P  the Playbook entry for people
  _index.md                         J  this project's entry: what it is, session start, project rules, structure
  rules.md                          P  the rules every session follows (C, D, P)
  pipeline.md                       P  how the pipeline works, all stages
  maintenance.md                    P  keeping files lean and current
  expansions.md                     P  audit and video insights
  templates/                        P  universal planning document shapes (entry: _index.md)
  vocabulary-[domain]/              P  domain vocabulary, planning doc shapes, domain rules (entry: _index.md)
  _concerns/                        J  cross-cutting capabilities (auth, logging, etc.)
  _integrations/                    J  external service and library contracts
  _shared/                          J  components used across modules
  kit/
    00-guide.md                     P  how the kit works, prompts, roll-over
    01-process.md                   J  where you are and what's next
    02-exploration.md               J  open questions and settled decisions
    03-execution.md                 J  current phase: plan, checklist, known issues
    04-progress.md                  J  one-line event log, append-only
    05-kanban.md                    J  work tracker (optional)
    06-qa.md                        J  checks and sign-off (optional)
    _archives/                      J  older history, moved not deleted
    _refs/                          J  supporting material, by category:
      video-insights/               —  structured insight files extracted from videos
      templates/                    —  reusable file shapes or snippets
      examples/                     —  worked examples kept for reference
      snippets/                     —  small reusable text fragments
      research/                     —  outside research material
    _tests/                         J  one file per QA check (template: _tests/test-case.md)

docs/
  [brief or PRD].md                 J  discovery document
  flows/
    _index.md                       J  entry point for all path documents
    global.md                       J  rules spanning every path (optional)
    flow-N-[name].md                J  one file per path
  contracts/
    _index.md                       J  entry point for all rules documents
    global.md                       J  rules that apply everywhere
    flow-N-[name].md                J  companion rules file per path
  code-standards.md                 J  your own implementation standards (optional)
  rewrite/                          J  audit outputs for existing projects
  rollout/
    [milestone].md                  J  generated milestone snapshots
```
