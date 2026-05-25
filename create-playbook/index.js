#!/usr/bin/env node
// create-playbook v2.0.0
// File: create-playbook/index.js
// Usage: npx create-playbook [project-name]
//        pnpm dlx create-playbook [project-name]
//        yarn dlx create-playbook [project-name]

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const projectName = args[0] || "my-project";
const root = join(process.cwd(), projectName);

console.log(`\nScaffolding Playbook pipeline for: ${projectName}\n`);

await scaffold(root, projectName);

console.log(`\nDone. Your Playbook pipeline is ready.\n`);
console.log(`Next steps:`);
console.log(`  1. Read .playbook/README.md -- find your starting point`);
console.log(`  2. Read .playbook/.guides/context-kit.md -- understand the session layer`);
console.log(`  3. Open .kit/00-prompts.md -- copy your first session prompt\n`);

// ---------------------------------------------------------------------------
// Scaffold
// ---------------------------------------------------------------------------

async function scaffold(root, projectName) {
  await createDirectories(root);
  await createFiles(root, projectName);
}

async function createDirectories(root) {
  const dirs = [
    ".playbook/_concerns",
    ".playbook/_integrations",
    ".playbook/_shared",
    ".playbook/.guides/expansions",
    ".playbook/templates",
    ".kit/_refs/video-insights",
    ".kit/_refs/templates",
    ".kit/_refs/examples",
    ".kit/_refs/snippets",
    ".kit/_refs/research",
    ".kit/_tests",
    ".kit/_archives/exploration",
    ".kit/_archives/progress",
    ".kit/_archives/kanban",
    "docs/flows",
    "docs/contracts",
    "docs/rewrite",
    "docs/rollout",
  ];
  for (const dir of dirs) {
    await mkdir(join(root, dir), { recursive: true });
  }
}

async function createFiles(root, projectName) {
  const files = getFiles(projectName);
  for (const [path, content] of Object.entries(files)) {
    await writeFile(join(root, path), content, "utf8");
  }
  console.log(`  Created ${Object.keys(files).length} files`);
}

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

function getFiles(projectName) {
  const today = new Date().toISOString().split("T")[0];

  return {

    // -----------------------------------------------------------------------
    // Playbook core
    // -----------------------------------------------------------------------

    ".playbook/README.md":
`# Playbook
# File: .playbook/README.md

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Everything is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

Playbook is a dev-dependency -- present during development, invisible in production.

---

## Where to Start

| If you are... | Start here |
|---|---|
| New to Playbook | You are in the right place -- read on |
| Starting a new project | .playbook/.guides/new-project.md |
| Adopting an existing project | .playbook/.guides/adopt.md |
| Resuming a project | .kit/00-prompts.md |
| Starting an AI dev session | .playbook/00-rules.md |
| Resuming from a rollout doc | docs/rollout/[milestone].md then .playbook/00-rules.md |
| Learning how the Context Kit works | .playbook/.guides/context-kit.md |
| Looking up pipeline reference | .playbook/pipeline.md |
| Looking up session prompts | .kit/00-prompts.md |

---

## The Pipeline

                    Context Kit (always active)
                           |
[RE] -> PRD -> Flows -> Contracts -> DDA -> Code -> Rollout

[RE] is the Reverse Engineer expansion -- conditional, existing projects only.

| Stage | What It Is | Where It Lives | Conditional |
|---|---|---|---|
| Reverse Engineer | Maps what exists before building what should | docs/rewrite/ | Existing projects only |
| Context Kit | Session and decision layer -- always active | .kit/ | Always |
| PRD | What to build and why | docs/ | Always |
| Flows | Runtime paths | docs/flows/ | Always |
| Contracts | Implementation boundaries | docs/contracts/ | Always |
| DDA | Component structure and relationships | .playbook/ | Always |
| Code | Implementation | src/ | Always |
| Rollout | Generated snapshots | docs/rollout/ | Always |

---

## Expansions

Expansions are optional stages that extend Playbook for specific needs.
Activate in .kit/01-process.md under Active Expansions.

| Expansion | When to Use | Guide |
|---|---|---|
| Reverse Engineer | Existing or legacy projects | .playbook/.guides/expansions/reverse-engineer.md |
| Video Insights | Research-driven ideation | Coming soon |

---

## Key Rules

- Nothing gets coded without a .playbook/ doc
- Flows and contracts are approved before any DDA docs are written
- Docs stay in sync with code -- run sync before every PR
- Kit files are updated at the end of every session
- Progress log is append-only -- never edit past entries
- Expansions are declared in 01-process.md before use

---

The doc is the contract. The code follows.

For the full pipeline reference: .playbook/pipeline.md
For the Context Kit guide: .playbook/.guides/context-kit.md
`,

    ".playbook/00-rules.md":
`# Playbook Rules
# File: .playbook/00-rules.md
# version: 2.0
# requires: docs/code-standards.md

Always load docs/code-standards.md alongside this file.
This file defines how to implement. pipeline.md defines what and why.
Neither is complete without the other.

---

## Core Principle

Progressive Disclosure + Tiering is the default for every structural decision:
- Lead with plain language. Add technical depth below.
- Define a required core. Add sections only when scope or type demands them.
- Never burden simple cases with complex requirements.
- Never let complex cases skip required coverage.

When any format, template, or structure decision needs to be made -- apply this first.

---

## Session Start

For full session management rules: .playbook/.guides/context-kit.md

Before any work, load in this order:
1. .playbook/00-rules.md
2. docs/code-standards.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md
6. Module and component docs as needed

If RE expansion is active, also load:
  docs/rewrite/system-map.md
  docs/rewrite/decision-record.md
  docs/rewrite/risk-register.md

Confirm understanding. Then wait for instruction.

---

## Session End

Before closing:
1. Run Playbook sync check on all docs touched this session
2. Update .kit/04-progress.md -- completions, decisions, fixes
3. Update Current State in .kit/01-process.md
4. Update living folder tree if components changed

---

## Document Types

Universal frontmatter fields (all types):
  id:      kebab-case -- must match filename
  export:  exported name -- component and sequencer only
  file:    repo path -- component and sequencer only
  type:    component | sequencer | structure | concern | integration
  status:  draft | active | deprecated

Document structure (all types follow progressive disclosure):
  ## What It Does   -- plain language, any audience
  ## Interface      -- contract reference + signature (component, sequencer, integration)
  ## Flow           -- full call chain with all branches (sequencer only)
  ## Structure      -- living folder tree (structure only)
  ## Detail         -- edge cases, constraints -- omit if nothing fits

---

## Flow Document Format

Required frontmatter: id, type, scope, trigger, status, triggers, calls, emits, called-by

Core sections (every flow): What It Does, Pre-conditions, Post-conditions, Walkthrough
Scope additions -- Journey/Sequence: Compensation | Journey/Composite: Child Flows
Trigger additions:
  Event-Driven: Event Contract
  Background: Schedule, Timeout Behavior
  Reactive: Subscription Contract, Disconnect Behavior
  Webhook: Payload Contract, Retry Behavior
  Stream: Subscription Contract, Disconnect Behavior, Reconnect Behavior
Detail: optional
N/A: considered, does not apply
TODO: not documented; blocks status: active

---

## Contract Document Format

Flow contract required sections:
  Happy Path | Failure Modes | Edge Cases | Concurrency Rules | Constraints

global.md required sections:
  Architecture Rules | Auth Boundaries | Error Handling Rules | Audit Requirements | Cross-Cutting Constraints

N/A or TODO. TODO blocks status: active.
Split at ~150 lines. Reference with precision: file.md#section-name

---

## Expansions

Declare in .kit/01-process.md:
  Simple:      Active Expansions: video-insights
  Multi-phase: Active Expansions:
                 reverse-engineer: inventory

RE phases: inventory | audit | classify | risk-map | gap-report | handoff

Rules:
- Never advance RE phases without human review
- No DDA docs during inventory, audit, or classify phases
- Handoff feeds kit files before expansion is marked complete

---

## Behavioral Rules

1.  Never write a DDA doc without reading the relevant flow and contract first
2.  Never write code without a Playbook doc
3.  Never add a dependency not declared in connects or integrations
4.  Never duplicate an existing responsibility
5.  Always implement against the declared interface
6.  Flag status: draft docs before coding against them
7.  Suggest _shared/ when a component appears in multiple modules
8.  Run sync check before closing any task
9.  Confirm all touched docs are current before every PR
10. Cross-check _shared/ before creating module-level components
11. Flag missing connects, emits, or children as TODO
12. Update living folder tree when components change
13. Flows and contracts approved before any DDA doc is authored
14. Apply Progressive Disclosure + Tiering to every structural decision
15. Prefer native implementations over external libraries
16. External dependencies require explicit justification
17. Never advance RE phases without human review
18. No DDA docs during RE inventory, audit, or classify phases

---

## Error Recovery

Stop all other work.
1. Identify   -- type error | test failure | Playbook drift | layer violation | other
2. Isolate    -- code, Playbook doc, or both?
3. Fix        -- resolve at source; do not patch symptoms
4. Verify     -- re-run checks before continuing
5. Log        -- Fixed entry in .kit/04-progress.md

Context rot:
  Stop. Re-upload session files.
  Re-read .playbook/00-rules.md and docs/code-standards.md.
  If rot persists, start a fresh session with a rollout doc as context.
`,

    ".playbook/_index.md":
`---
id: ${projectName}
type: structure
scope: project
status: draft
entry: []
contains: []
integrations: []
concerns: []
---

## What It Does
TODO: Describe the project purpose in one paragraph.

## Structure

- [.playbook/](./)
  - [README.md](./README.md) -- orientation and journey matrix
  - [pipeline.md](./pipeline.md) -- complete pipeline reference
  - [00-rules.md](./00-rules.md) -- AI execution layer
  - [_index.md](./_index.md) -- this file; project manifest
  - [_concerns/](./_concerns/) -- cross-cutting capabilities
  - [_integrations/](./_integrations/) -- external contracts
  - [_shared/](./_shared/) -- cross-module components
- [docs/](../docs/)
  - [code-standards.md](../docs/code-standards.md) -- implementation rules
  - [flows/](../docs/flows/) -- runtime path definitions
  - [contracts/](../docs/contracts/) -- implementation boundaries
  - [rollout/](../docs/rollout/) -- generated milestone snapshots
- [.kit/](../.kit/)
  - [00-prompts.md](../.kit/00-prompts.md) -- session prompts
  - [01-process.md](../.kit/01-process.md) -- session spark
  - [02-exploration.md](../.kit/02-exploration.md) -- active decisions
  - [03-execution.md](../.kit/03-execution.md) -- guidelines and plan
  - [04-progress.md](../.kit/04-progress.md) -- progress log
`,

    // -----------------------------------------------------------------------
    // Guides
    // -----------------------------------------------------------------------

    ".playbook/.guides/context-kit.md":
`# The Context Kit
# File: .playbook/.guides/context-kit.md

The Context Kit is the session and decision layer of the Playbook pipeline.
It keeps humans and AI aligned across every session, every stage, and every
decision from the first idea to deployed code.

It is also a standalone system that works with any AI tool, for any kind of
project. You do not need Playbook to use the Context Kit.

But inside Playbook, the two are inseparable. The kit drives the pipeline.
The pipeline gives the kit its full power.

For the Context Kit as a standalone system beyond Playbook:
The Context Kit by Bogs -- the complete reference.

---

## What the Context Kit Is

AI has no memory between sessions. Every new chat starts from zero.
Without a system to carry context forward, every session wastes time
re-explaining what was already decided, re-discovering what was already built,
and re-correcting what the AI already got wrong.

The Context Kit solves this with four files, each with one job:

| File | Job |
|---|---|
| 01-process.md | Session spark -- where you are, what comes next |
| 02-exploration.md | Decision log -- what is open, what is closed |
| 03-execution.md | Work definition -- guidelines, plan, tasks, issues |
| 04-progress.md | Project history -- append-only record of everything done |

Two optional modules activate when the work demands them:

| File | Job | When |
|---|---|---|
| 05-kanban.md | Ticket breakdown | Complex execution with discrete deliverables |
| 06-qa.md | Test registry and sign-off | Any deliverable needing verification |

---

## How It Fits in the Pipeline

The Context Kit is not a stage that completes and hands off.
It is the persistent layer running beneath every stage.

                    Context Kit (always active)
                           |
[RE] -> PRD -> Flows -> Contracts -> DDA -> Code -> Rollout

Every stage has a kit touchpoint:

| Stage | Kit Touchpoint |
|---|---|
| Reverse Engineer | RE findings feed 02-exploration.md and 03-execution.md on handoff |
| PRD | Goals and acceptance criteria live in 03-execution.md |
| Flows | Flow decisions close in 02-exploration.md with Flow: references |
| Contracts | Contract decisions close in 02-exploration.md |
| DDA | Component decisions close in 02-exploration.md |
| Code | Progress logs in 04-progress.md; issues in 03-execution.md |
| Rollout | Milestone logged in 04-progress.md; Current State updated |

---

## The Four Files

### 01-process.md -- Session Spark

Four fields only. Updated every session without exception.

  Phase:              Exploration | Execution | Progress
  Last Completed:     Most recent milestone
  Next:               Active goal
  Active Modules:     05-kanban | 06-qa | none
  Active Expansions:  reverse-engineer: [phase] | none

Rule: If it does not change session to session, it does not live here.

---

### 02-exploration.md -- Decision Log

Two states:

Open Topics -- questions still being explored. Gets resolved or dropped.
Closed Decisions -- dated, reasoned, permanent. Never edited. Only reopened
  explicitly with a new dated entry explaining why.

Reference fields:
  Ref:  -- points to supporting material in .kit/_refs/
  Flow: -- points to the flow that resulted from this decision

Rule: If a decision produces a flow, it must reference it.

---

### 03-execution.md -- Work Definition

Three sections:

Guidelines -- how the work is done. Style, constraints, quality bar.
  Includes: native implementation preference, external dependency rules,
  QA tier declaration, custom ticket types.

Plan -- what is being built. Goals, outcomes, scope, acceptance criteria.

Action -- current focus and task list.

Known Issues table -- typed, severity-rated, dependency-aware:
  Type: bug | dependency | design | performance | security
  Severity: critical | high | low

Rule: A known issue without type and severity cannot be assessed.

---

### 04-progress.md -- Project History

Append-only. Entries never edited or deleted. Ever.

Three entry types:
  Completed -- a deliverable or task finished
  Decided   -- a decision made and closed
  Fixed     -- a known issue resolved

One special entry:
  In Progress -- always last, overwritten each session

Rule: If it happened, it gets logged. Never add retroactively.

---

## Supporting Folders

.kit/_refs/      -- supporting material for 02-exploration.md
  video-insights/
  templates/
  examples/
  snippets/
  research/

.kit/_tests/     -- one file per QA test case; 06-qa.md points here

.kit/_archives/  -- lean history; nothing deleted, moved not removed
  exploration/
  progress/
  kanban/

Archive rule: main files are current and actionable. Archives own history.

---

## The Two-Message Pattern

Every session starts the same way. Two messages. Always.

Message 1 -- upload 01-process.md + 03-execution.md
  How to work and what is in focus right now.

Message 2 -- upload 02-exploration.md + 04-progress.md
  What has been decided and what has been done.

Add 05-kanban.md and 06-qa.md when active.

Why this order: orientation before context. Always.

---

## Session Rhythm

Start  -> upload kit files (2 messages)
         AI confirms Current State and waits
Work   -> focus only on Current State
         log decisions and issues as they arise
End    -> update 01-process.md
         append to 04-progress.md
         update 03-execution.md if tasks or issues changed

Rule: Never close a session without updating 01-process.md and 04-progress.md.

---

## Declaring Expansions

Simple:
  Active Expansions: video-insights

Multi-phase:
  Active Expansions:
    reverse-engineer: classify

Mark complete:
  Active Expansions: reverse-engineer: complete

Clear next session:
  Active Expansions: none

---

## Keeping Files Lean

Archive when:
  02-exploration.md -- closed decision no longer gates any active task or flow
  04-progress.md    -- entries older than the current phase
  05-kanban.md      -- Done tickets no longer referenced

Every archived file gets a header:
  Title, Date Range, Phase, Archived date, Reason

---

## Context Rot

Signs: ignoring Current State, suggesting closed decisions, breaking formatting.

Recovery:
  Stop. Your only source of truth is the files uploaded at session start.
  Ignore all prior conversation context.
  Re-read .playbook/00-rules.md and docs/code-standards.md before continuing.

Prevention: keep files lean, archive regularly, start fresh at major milestones.

---

## Quick Reference

| File | Owns | Updated |
|---|---|---|
| 01-process.md | Session state | Every session |
| 02-exploration.md | Active decisions | When decisions change |
| 03-execution.md | Active work definition | When work changes |
| 04-progress.md | Project history | Every session |
| 05-kanban.md | Active tickets | When tickets change |
| 06-qa.md | Test registry, sign-off | When tests change |

The kit is the memory. The pipeline is the work. Together they are one system.
`,

    ".playbook/.guides/new-project.md":
`# Starting a New Project
# File: .playbook/.guides/new-project.md

This guide walks through every stage of the Playbook pipeline from scratch.
Follow the stages in order. Do not skip ahead.

---

## Stage 1 -- Context Kit

Get your thinking straight before touching any tools.

1. Copy blank kit templates from .kit/ into your project
2. Upload .kit/01-process.md + .kit/03-execution.md to a new AI session
3. Describe your project in 1-2 sentences and ask AI to populate the files
4. Upload .kit/02-exploration.md + .kit/04-progress.md
5. Work through open questions until key decisions are locked

Use prompt: Context Kit -- Fresh Project from .kit/00-prompts.md

Done when: project goals are clear, key decisions are in Closed Decisions.

---

## Stage 2 -- PRD and Specs

Define what you are building and why.

1. Use closed decisions from 02-exploration.md as input
2. Ask AI to draft a PRD from your decisions
3. Review and approve the PRD
4. Store it in docs/ (e.g. docs/PRD.md)
5. Log completion in 04-progress.md

Done when: PRD is approved, acceptance criteria are clear and verifiable.

---

## Stage 3 -- Flows and Contracts

Define runtime paths and lock implementation boundaries.

1. Write flow files under docs/flows/ (entry: docs/flows/_index.md)
2. Write docs/contracts/global.md first -- rules that apply everywhere
3. Write a companion contract under docs/contracts/ for each flow
4. Walk each flow including failure paths -- find gaps
5. Lock flows and contracts before authoring any DDA doc

Done when: every runtime path has a flow, every flow has a contract,
all reviewed and locked.

---

## Stage 4 -- DDA

Define every component before any code is written.

1. Load Playbook context (prompt: Playbook -- Start Dev Session)
2. Bootstrap scaffold from PRD (prompt: Bootstrap Scaffold from PRD)
3. Review all generated stubs
4. Author top-down: _index.md -> sequencers -> components -> concerns -> integrations
5. Activate docs one by one: draft -> active

Done when: all docs are status: active, living folder trees accurate.

---

## Stage 5 -- Code

Generate code against Playbook contracts.

1. Start every dev session with the Playbook boot prompt
2. Load only docs needed for the current task
3. Work ticket by ticket if using Kanban
4. After each component: run Playbook sync check
5. Before every PR: run Phase Completion Checklist

Done when: all acceptance criteria met, all QA tests pass.

---

## Stage 6 -- Rollout

Generate a snapshot for the completed milestone.

1. Use prompt: Playbook -- Generate Rollout Doc
2. Attach all .playbook/ docs + .kit/04-progress.md
3. Review docs/rollout/[milestone].md
4. Use as context for next session or new team member

Done when: rollout doc generated, kit files updated, all changes pushed.
`,

    ".playbook/.guides/adopt.md":
`# Adopting Playbook
# File: .playbook/.guides/adopt.md

This guide covers all adoption paths. Answer four questions to find your starting point.
No assumptions. No rigid categories. Just honest routing.

---

## Where to Start

Answer these questions in order. Each answer points to your next step.

---

Question 1 -- Does the project have .kit/ files?

  Yes -> skip to Question 2
  No  -> generate kit files first
         Upload .playbook/00-rules.md + docs/code-standards.md
         Use prompt: Adopt Existing Project from .kit/00-prompts.md
         Then continue to Question 2

---

Question 2 -- Is the codebase organized enough to map without reverse engineering?

Can you describe what every major part does and how they connect
without reading the code?

  Yes -> skip to Question 3
  No  -> activate the Reverse Engineer expansion first
         Add to .kit/01-process.md:
           Active Expansions:
             reverse-engineer: inventory
         Read .playbook/.guides/expansions/reverse-engineer.md
         Complete all RE phases before continuing
         Then return to Question 3

---

Question 3 -- Is there existing documentation, architecture notes, or specs?

  Yes -> attach them to your audit prompt as additional context
  No  -> audit from source files only; AI will surface what it finds

---

Question 4 -- Is this a partial update or a full rewrite?

  Partial update  -> strangler fig -- adopt incrementally, keep platform live
                     Priority: _concerns/ -> _integrations/ -> _shared/ -> sequencers -> components

  Full rewrite    -> RE expansion must be complete before any new code is written
                     New architecture defined in DDA before old code is touched

---

## Running the Audit

Upload all available context, then send:

  Run a structured audit against the Playbook pipeline.

  1. Inventory -- map all modules, services, components, dependencies, tech stack
  2. Audit -- what exists, what is missing, what drifts from Playbook conventions
  3. Gap Report:
     - Missing: what does not exist yet
     - Drifting: what exists but does not match Playbook
     - Compliant: what already follows Playbook

  Wait for review before proceeding.

---

## Scaffolding

After reviewing and approving the gap report:

  Proceed with scaffold:

  1. Scaffold flows and contracts if missing
  2. Scaffold .playbook/ around existing code -- do not modify anything
  3. Create stub docs (status: draft) for all unmapped components
  4. Update kit files -- Current State and Progress log

  Generate all files as markdown code blocks for review.

---

## Incremental Adoption

After scaffolding is approved:

  Work through the gap report in priority order:
  1. _concerns/     -- cross-cutting capabilities first
  2. _integrations/ -- external contracts next
  3. _shared/       -- cross-module components
  4. Sequencers     -- flows before component code
  5. Components     -- one at a time, test after each

  For each item:
  1. Author or update the Playbook doc to status: active
  2. Identify code changes -- flag but do not make yet
  3. Once doc is approved, make code changes
  4. Run Phase Completion Checklist after each item

---

## Adoption Rules

- Nothing is deleted -- adoption is additive only
- Existing code stays intact until its Playbook doc is active
- Closed decisions in existing kit files stay closed
- Flag risky structural changes -- defer them
- Full rewrite: no new code until RE expansion handoff is complete
`,

    ".playbook/.guides/expansions/reverse-engineer.md":
`# Reverse Engineer Expansion
# File: .playbook/.guides/expansions/reverse-engineer.md

Maps what an existing codebase actually does before any architectural
decisions are made. Foundation for all adoption and rewrite work.

Activate in .kit/01-process.md before starting:

  Active Expansions:
    reverse-engineer: inventory

---

## Why This Exists

You cannot design what should exist without understanding what does exist.
Every assumption about existing code that turns out wrong costs time, money,
and stability. This expansion eliminates assumptions before they become problems.

---

## What It Produces

Three documents in docs/rewrite/:

  system-map.md       -- what exists, where it lives, what depends on what
  decision-record.md  -- classification per component with reasoning
  risk-register.md    -- what breaks if X changes, migration constraints

For large projects, any document splits into a sub-folder with _index.md.

---

## Classification System

  Keep     -- works as-is, no changes needed
  Align    -- works but needs to conform to new standards
  Extract  -- good logic in the wrong place
  Rewrite  -- wrong or too coupled, rebuild
  Replace  -- responsibility stays, tool changes
  Discard  -- no longer needed
  Defer    -- decision not yet possible
  Evaluate -- needs investigation before classifying

---

## Phases

Each phase requires human review before advancing.

### Phase 1 -- Inventory

Goal: Map what exists.

  Run an inventory of this codebase. Map and document:
  1. All applications or services and what they do
  2. All major modules, components, and services
  3. All external integrations
  4. The data model
  5. Entry points
  6. Dependency relationships
  7. Tech stack -- frameworks, libraries, tools, versions

  Produce draft docs/rewrite/system-map.md. Use plain language.
  Flag anything unclear. Wait for review.

Output: docs/rewrite/system-map.md (draft)
Advance when: system map reviewed and approved.

---

### Phase 2 -- Audit

Goal: Understand quality and structure.

  Audit the codebase against the system map.
  For each major component identify:
  1. What it actually does vs what it appears designed to do
  2. What depends on it
  3. Whether it has clear boundaries
  4. Known issues and tech debt

  Flag: god components, mixed concerns, tight coupling, hidden dependencies.
  Update system-map.md with findings. Wait for review.

Output: Updated docs/rewrite/system-map.md
Advance when: audit findings reviewed and approved.

---

### Phase 3 -- Classify

Goal: Assign a classification to every major component.

  Using the audited system map, classify every major component.
  For each document: classification, reasoning, dependencies affected, risk level.
  Produce draft docs/rewrite/decision-record.md.
  Wait for review.

Output: docs/rewrite/decision-record.md (draft)
Advance when: every component classified, record reviewed and approved.

---

### Phase 4 -- Risk Map

Goal: Understand what breaks if X changes.

  For every Extract, Rewrite, Replace, or Discard component:
  1. What depends on it?
  2. What breaks if it changes?
  3. What must change before it can be safely modified?
  4. Are there circular dependencies?
  5. What is the safe migration order?

  Produce draft docs/rewrite/risk-register.md. Wait for review.

Output: docs/rewrite/risk-register.md (draft)
Advance when: risk register reviewed and approved.

---

### Phase 5 -- Gap Report

Goal: Identify what is missing, broken, or undocumented.

  Using all three rewrite docs, produce a gap report:
  Missing | Broken | Undocumented | Security Concerns | Performance Concerns

  Format as a prioritized list. Append to docs/rewrite/system-map.md.
  Wait for review.

Output: Gap report section in docs/rewrite/system-map.md
Advance when: gap report reviewed and approved.

---

### Phase 6 -- Handoff

Goal: Feed all findings into the Playbook pipeline.

  From system-map.md    -> .kit/02-exploration.md open topics
  From decision-record  -> .kit/02-exploration.md closed decisions
  From risk-register    -> .kit/03-execution.md known issues
  Update 01-process.md  -> mark RE complete, update Current State

  Generate updated kit files for review.

Output: Updated .kit/02-exploration.md, .kit/03-execution.md, .kit/01-process.md
Complete when: all three kit files updated and reviewed.

---

## Rules

- Never advance a phase without human review and approval
- Never begin DDA docs during inventory, audit, or classify phases
- Every component must be classified before risk-map phase begins
- Handoff not complete until rewrite docs are referenced in kit files
`,

    // -----------------------------------------------------------------------
    // DDA templates
    // -----------------------------------------------------------------------

    ".playbook/templates/structure.md":
`---
id: [kebab-case]
type: structure
scope: project | app | module
status: draft
entry: []
contains: []
integrations: []
concerns: []
---

## What It Does
Plain language description of this module or app's purpose.

## Structure
- [_index.md](./_index.md) -- this file; [scope] manifest
- [component-name.md](./component-name.md) -- [one line description]

## Detail
_(Optional -- omit if nothing fits)_
`,

    ".playbook/templates/sequencer.md":
`---
id: [kebab-case]
export: [ExportedName]
file: [src/module/sequencer.ts]
type: sequencer
status: draft
parent: [module]
triggers: []
sequence: []
emits: []
concerns: []
---

## What It Does
Plain language -- owns sequence, not logic.

## Flow
References: docs/flows/[flow].md + docs/contracts/[contract].md

1. On [TriggerEvent](input):
   a. [component].[method](input)
      -> ok: [ResultType]  -> continue to b
      -> err: [ErrorType]  -> emit [FailureEvent], halt
   b. [component].[method](result)
      -> ok: [ResultType]  -> continue to c
      -> err: [ErrorType]  -> compensate, emit [FailureEvent]
   c. [component].[method](result)
      -> ok: [ResultType]  -> emit [SuccessEvent]
      -> err: [ErrorType]  -> compensate, emit [FailureEvent]

## Detail
_(Optional -- omit if nothing fits)_
`,

    ".playbook/templates/component.md":
`---
id: [kebab-case]
export: [ExportedName]
file: [src/module/component.ts]
type: component
status: draft
parent: [parent-sequencer]
children: []
connects: []
emits: []
concerns: []
---

## What It Does
Plain language -- single responsibility.

## Interface
Contract: docs/contracts/[flow]/[file].md#[section]

input:  [InputType]
output: Result<[SuccessType], [ErrorType]>

## Detail
_(Edge cases and constraints only -- omit if nothing fits)_
`,

    ".playbook/templates/concern.md":
`---
id: [kebab-case]
type: concern
status: draft
affects: all
provided-by: internal
---

## What It Does
What it provides, how it is consumed, what depends on it.

## Detail
_(Optional -- omit if nothing fits)_
`,

    ".playbook/templates/integration.md":
`---
id: [kebab-case]
type: integration
kind: external-service | external-library | internal-service
status: draft
used-by: []
config: []
docs: [url]
---

## What It Does
What this service or library provides and how it is used.

## Interface
Contract: docs/contracts/[flow]/[file].md#[section] _(if applicable)_

What this integration exposes -- methods, events, or data.

## Detail
_(Auth method, rate limits, failure modes -- omit if nothing fits)_
`,

    // -----------------------------------------------------------------------
    // Flow and contract templates
    // -----------------------------------------------------------------------

    "docs/flows/flow-template.md":
`---
id: flow-N-[kebab-name]
type: flow
scope: journey | sequence | operation | composite | compensation
trigger: request-response | event-driven | background | reactive | webhook | stream
status: draft
triggers: []
calls: []
emits: []
called-by: []
---

## What It Does
Plain language -- any audience.

## Pre-conditions
What must be true before this flow can start.

## Post-conditions
What is guaranteed when this flow completes successfully.

## Walkthrough

Narrative -- what happens, what decisions are made, what can go wrong.

---

1. On [TriggerEvent](input):
   a. [component].[method](input)
      -> ok: [ResultType]  -> continue to b
      -> err: [ErrorType]  -> emit [FailureEvent], halt
   b. [component].[method](result)
      -> ok: [ResultType]  -> continue
      -> err: [ErrorType]  -> compensate, emit [FailureEvent]

---
Add sections below based on scope and trigger type.
Remove sections that do not apply -- mark N/A if required by type.

## Compensation
_(Journey, Sequence -- required)_

## Child Flows
_(Journey, Composite -- required)_

## Event Contract
_(Event-Driven -- required)_

## Schedule
_(Background -- required)_

## Timeout Behavior
_(Background -- required)_

## Subscription Contract
_(Reactive, Stream -- required)_

## Disconnect Behavior
_(Reactive, Stream -- required)_

## Reconnect Behavior
_(Stream -- required)_

## Payload Contract
_(Webhook -- required)_

## Retry Behavior
_(Webhook -- required)_

## Detail
_(Optional)_

---
N/A -- considered and does not apply
TODO -- not documented; blocks status: active
`,

    "docs/contracts/contract-template.md":
`# [Flow Name] Contract
# File: docs/contracts/flow-N-[name].md
# Companion to: docs/flows/flow-N-[name].md
# Read docs/contracts/global.md before this file.

---

## Happy Path
The expected successful execution -- inputs, steps, guaranteed outputs.

## Failure Modes
Every way this flow can fail and what happens in each case.

## Edge Cases
Boundary conditions and non-obvious scenarios.

## Concurrency Rules
Atomicity requirements, race conditions, ordering constraints.

## Constraints
Rules every implementation must honour without exception.

---
N/A -- considered and does not apply
TODO -- not documented; blocks status: active
`,

    // -----------------------------------------------------------------------
    // Docs
    // -----------------------------------------------------------------------

    "docs/flows/_index.md":
`# Flows
# File: docs/flows/_index.md

Entry point for all flow documents.
Read this file before any sequencer or flow-related DDA doc.
Always read docs/contracts/global.md alongside flows.

---

## Flows

| ID | Title | Scope | Trigger | Status |
|---|---|---|---|---|

---

## Dependency Map

_How flows relate to each other._
_calls: flow calls another flow_
_emits: flow emits an event that triggers another flow_
`,

    "docs/contracts/_index.md":
`# Contracts
# File: docs/contracts/_index.md

Entry point for all contract documents.
Always read global.md before any flow-specific contract.

---

## Read Order

1. global.md -- system-wide rules; always first
2. flow-N-name.md -- companion to the relevant flow

---

## Contracts

| File | Companion Flow | Status |
|---|---|---|
| global.md | all flows | draft |
`,

    "docs/contracts/global.md":
`# Global Contract
# File: docs/contracts/global.md

Read this file before any flow-specific contract.
Rules here apply to every component, every layer, every flow.

---

## Architecture Rules
TODO

## Auth Boundaries
TODO

## Error Handling Rules
TODO

## Audit Requirements
TODO

## Cross-Cutting Constraints
TODO

---
N/A -- considered and does not apply
TODO -- not documented; blocks status: active
`,

    // -----------------------------------------------------------------------
    // Rewrite docs (RE expansion)
    // -----------------------------------------------------------------------

    "docs/rewrite/system-map.md":
`# System Map
# File: docs/rewrite/system-map.md
# RE Expansion output -- Phases 1 and 2

---

## Overview
TODO

## Applications
TODO

## Data Models
TODO

## Integrations

| Integration | What It Does | Used By | Status |
|---|---|---|---|

## Dependency Map

| Component | Depends On | Type |
|---|---|---|

## Entry Points

| Entry Point | Type | Handled By |
|---|---|---|

## Gap Report
_(Added during Phase 5)_

### Missing
### Broken
### Undocumented
### Security Concerns
### Performance Concerns
`,

    "docs/rewrite/decision-record.md":
`# Decision Record
# File: docs/rewrite/decision-record.md
# RE Expansion output -- Phase 3

---

## Summary

| Classification | Count |
|---|---|
| Keep | 0 |
| Align | 0 |
| Extract | 0 |
| Rewrite | 0 |
| Replace | 0 |
| Discard | 0 |
| Defer | 0 |
| Evaluate | 0 |
| **Total** | **0** |

---

## Decisions

### [Component Name]

**Classification:** Keep | Align | Extract | Rewrite | Replace | Discard | Defer | Evaluate
**What it does:** [plain language]
**Reasoning:** [why this classification]
**Dependencies affected:** [what else is impacted]
**Risk:** low | medium | high | critical
`,

    "docs/rewrite/risk-register.md":
`# Risk Register
# File: docs/rewrite/risk-register.md
# RE Expansion output -- Phase 4

---

## Summary

| Risk Level | Count |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| **Total** | **0** |

---

## Critical Risks

### [Risk Name]
**Component:** [what is changing]
**Impact:** [what breaks]
**Depends on it:** [list]
**Must change first:** [list]
**Migration constraint:** [ordering rule]

---

## High Risks

### [Risk Name]
**Component:** [what is changing]
**Impact:** [what breaks]
**Depends on it:** [list]
**Must change first:** [list]

---

## Medium Risks

### [Risk Name]
**Component:** [what is changing]
**Impact:** [what breaks]

---

## Migration Constraints

| Step | Must Complete | Before Starting |
|---|---|---|

---

## Circular Dependencies

| Component A | Component B | Resolution Strategy |
|---|---|---|
`,

    // -----------------------------------------------------------------------
    // Kit files
    // -----------------------------------------------------------------------

    ".kit/00-prompts.md":
`# Playbook -- Session Prompts
# File: .kit/00-prompts.md

Quick reference for every session type. Copy and paste as needed.
For how the Context Kit works within Playbook: .playbook/.guides/context-kit.md

---

## Context Kit -- Standalone Prompts

### Fresh Project

Message 1 -- upload .kit/01-process.md + .kit/03-execution.md:

  I'm starting a new project using the Context Kit. I'll share files in two messages.
  This message: Process + Execution. Next: Exploration + Progress.
  Based on my project [1-2 sentence description], help me populate these files.
  Just provide a brief confirmation.

Message 2 -- upload .kit/02-exploration.md + .kit/04-progress.md:

  Here are the remaining blank templates. Just provide a brief confirmation.

---

### Resume Project

Message 1 -- upload current .kit/01-process.md + .kit/03-execution.md:

  I'm resuming a project using the Context Kit. I'll share files in two messages.
  This message: Process + Execution. Next: Exploration + Progress.
  Focus only on Current State. Do not reopen closed decisions unless I ask.
  Just provide a brief confirmation.

Message 2 -- upload current .kit/02-exploration.md + .kit/04-progress.md:

  Here is the context from earlier work. Just provide a brief confirmation.

---

### End of Session

  Based on this session, update my kit files:
  - Check off completed tasks in 03-execution.md
  - Move closed decisions to 02-exploration.md with dates and reasoning
  - Append to 04-progress.md -- Completed, Decided, Fixed, In Progress
  - Update Current State in 01-process.md
  Generate updated markdown for all changed files.

---

### Context Rot Recovery

  Stop. Your only source of truth is the files uploaded at session start.
  Ignore all prior conversation context.
  Re-read the uploaded files before continuing.

---

## Playbook Pipeline Prompts

### Start Dev Session

  Before any work, read in this order:
  1. .playbook/00-rules.md
  2. docs/code-standards.md
  3. docs/flows/_index.md
  4. docs/contracts/_index.md
  5. .playbook/_index.md
  [Attach relevant module and component docs]
  Confirm your understanding. Then wait for my instruction.

---

### Write Flows and Contracts

  Given this PRD, define flows and contracts.
  Flows: _index.md entry point, global.md first, one file per flow,
    declare scope and trigger, include failure paths, split at ~150 lines.
  Contracts: _index.md entry point, one per flow,
    sections: Happy Path, Failure Modes, Edge Cases, Concurrency Rules, Constraints.
    N/A if not applicable. TODO blocks status: active.
  Flag anything underspecified. Wait for review before DDA docs.

---

### Bootstrap Scaffold from PRD

  Given this PRD and approved flows and contracts, generate the Playbook scaffold.
  Produce _index.md for project and each module with living folder trees.
  Create stub docs for all components, sequencers, concerns, integrations (status: draft).
  For sequencers, include stub Flow section referencing flow files.
  Flag anything underspecified.

---

### Add New Component

  Given this parent doc and flow, create a Playbook [type] doc for [description].
  Flag any missing relationships.
  If sequencer, include Flow section with full call chain and all branches.
  After creating, provide updated Structure section for parent _index.md.

---

### Sync Check

  Run a Playbook sync check on all files touched this session.
  For each: does the code match the Playbook doc?
  List mismatches. Update affected docs.
  Update living folder tree in any _index.md where components changed.

---

### Generate Rollout Doc

  Generate a rollout doc for [milestone name].
  Read the full .playbook/ tree and 04-progress.md.
  Output to docs/rollout/[milestone].md.

---

### Adopt Existing Project

  I am adopting the Playbook pipeline for an existing project.
  Read .playbook/00-rules.md and docs/code-standards.md first.
  Confirm. Do not begin work yet.
  Then follow .playbook/.guides/adopt.md.

---

### Reverse Engineer -- Start Inventory

  RE expansion active. Phase: inventory.
  Map and document: all apps, modules, integrations, data model,
  entry points, dependency relationships, tech stack.
  Produce draft docs/rewrite/system-map.md. Plain language.
  Flag anything unclear. Wait for review.

---

### Reverse Engineer -- Advance Phase

  RE expansion phase: [current phase]. Previous phase approved.
  Proceed to [next phase].
  Follow .playbook/.guides/expansions/reverse-engineer.md.
  Wait for review before advancing again.

---

### Reverse Engineer -- Handoff

  RE expansion complete. Run handoff:
  1. Extract open topics from system-map.md -> .kit/02-exploration.md
  2. Extract closed decisions from decision-record.md -> .kit/02-exploration.md
  3. Extract known issues from risk-register.md -> .kit/03-execution.md
  4. Update .kit/01-process.md -- mark RE complete, update Current State
  Generate updated kit files for review.

---

### Playbook End of Session

  Before we close:
  1. Playbook sync check on all docs touched this session
  2. Update .kit/04-progress.md -- completions, decisions, fixes
  3. Update Current State in .kit/01-process.md
  4. Update living folder tree if components changed
  Generate updated markdown for all changed kit files.

---

### Error Recovery

  Something broke. Stop all other work.
  What broke: [description]
  Category: type error | test failure | Playbook drift | layer violation | other
  Location: code | Playbook doc | both
  Fix at source. After fixing: re-run checks and Playbook sync.
  Log as Fixed entry in .kit/04-progress.md.

---

### Session Limit Warning

  We are approaching the session limit.
  Update all kit files and any changed Playbook docs now.
  Generate markdown for each so I can copy-paste and save.
`,

    ".kit/01-process.md":
`# PROCESS
# File: .kit/01-process.md

---

**Phase:** Exploration
**Last Completed:** Playbook scaffold generated
**Next:** Populate Exploration with initial project questions
**Active Modules:** none
**Active Expansions:** none
`,

    ".kit/02-exploration.md":
`# EXPLORATION
# File: .kit/02-exploration.md

## Open Topics

**[Topic Name]**
- Questions to resolve
- Options being considered
- Ref: .kit/_refs/[type]/[filename] _(if applicable)_

---

## Closed Decisions

**[YYYY-MM-DD] Decision Name**
- What was decided
- Why
- Alternatives considered
- Ref: .kit/_refs/[type]/[filename] _(if applicable)_
- Flow: docs/flows/flow-N-name.md _(if applicable)_
`,

    ".kit/03-execution.md":
`# EXECUTION
# File: .kit/03-execution.md

## Guidelines

**Style & Voice:**
- [Tone and approach]

**Rules & Constraints:**
- [Specific requirements]
- Prefer native implementations over external libraries
- External dependencies require explicit justification

**Quality Bar:**
- [Standards for completion]

**QA Tier:** core | standard | full

**Custom Ticket Types:**
- [type] -- [description]

---

## Plan

**Goals:**
- [What you are building]

**Outcomes:**
- [What done looks like]

**Out of Scope:**
- [What is not included]

**Acceptance Criteria:**
- [ ] [Verifiable condition]

---

## Action

**Right Now:**
[Current focus]

**Tasks:**
- [ ] [Task]
  - [ ] [Subtask]

---

## Known Issues

| # | Issue | Type | Severity | Blocked By | Resolution |
|---|---|---|---|---|---|
| -- | -- | -- | -- | -- | -- |

_Type: bug | dependency | design | performance | security_
_Severity: critical | high | low_
`,

    ".kit/04-progress.md":
`# PROGRESS LOG (APPEND-ONLY)
# File: .kit/04-progress.md

Rules:
- Entries are never edited or deleted
- New updates always added at the bottom
- Three entry types: Completed, Decided, Fixed
- In Progress is always the last entry, overwritten each session
- Add timestamp per session: ## YYYY-MM-DD

---

## ${today}
- **Completed:** Playbook scaffold generated by create-playbook
- **In Progress:** Populating Context Kit for new project
`,

    ".kit/05-kanban.md":
`# KANBAN
# File: .kit/05-kanban.md

## Rules
- Tickets seeded from Acceptance Criteria in 03-execution.md
- One outcome per ticket -- no bundling
- Priority within each column is top-down
- Blocked tickets stay in their column
- When a ticket moves to Done, log it in 04-progress.md

## Ticket Types
Core (always): feature | bug | task
Pipeline (when .playbook/ exists): doc | sync
Project (declare in 03-execution.md): [custom]

---

## Backlog

### [K-01] Ticket Title
**Type:** feature | bug | task | doc | sync
**Description:** What needs to happen and why.
**Ref:** [optional]
**Blocked by:** none

---

## In Progress

### [K-02] Ticket Title
**Type:** feature | bug | task | doc | sync
**Description:** What needs to happen and why.
**Blocked by:** none

---

## Done

### [K-03] Ticket Title
**Completed:** YYYY-MM-DD
`,

    ".kit/06-qa.md":
`# QA PLAN
# File: .kit/06-qa.md

## Rules
- Test cases live in .kit/_tests/ -- one file per test
- Each test maps to one Acceptance Criterion in 03-execution.md
- QA tier declared in 03-execution.md: core | standard | full
- A criterion is not done until its test file passes
- Failures must reference a contract and define a mitigation
- All tests must pass before sign-off
- Sign-off requires every Acceptance Criterion verified

---

## Test Cases

| ID | Title | Maps To | Executor | Status |
|---|---|---|---|---|
| QA-01 | [Test title] | K-01 | Agent | Pending |

---

## Failures Log

| ID | Date | What Failed | Ref | Ticket | Mitigation | Status |
|---|---|---|---|---|---|---|

---

## Sign-off

**QA Complete:** YYYY-MM-DD
**Signed off by:** [Human | Agent]

**Acceptance Criteria Verified:**
- [ ] [Criterion] -- QA-01

**Known Exceptions:**
[Explicit reasoning -- never silently skipped]

**Consequences of Sign-off:**
[What this approval gates]

**Notes:**
[Anything the next phase needs to know]
`,

    // -----------------------------------------------------------------------
    // Gitkeeps
    // -----------------------------------------------------------------------

    ".playbook/_concerns/.gitkeep": "",
    ".playbook/_integrations/.gitkeep": "",
    ".playbook/_shared/.gitkeep": "",
    ".kit/_refs/video-insights/.gitkeep": "",
    ".kit/_refs/templates/.gitkeep": "",
    ".kit/_refs/examples/.gitkeep": "",
    ".kit/_refs/snippets/.gitkeep": "",
    ".kit/_refs/research/.gitkeep": "",
    ".kit/_tests/.gitkeep": "",
    ".kit/_archives/exploration/.gitkeep": "",
    ".kit/_archives/progress/.gitkeep": "",
    ".kit/_archives/kanban/.gitkeep": "",
    "docs/rollout/.gitkeep": "",
  };
}
