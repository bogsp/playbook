#!/usr/bin/env node
// create-playbook
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
console.log(`  1. Read .playbook/README.md — find your starting point`);
console.log(`  2. Read .playbook/.guides/context-kit.md — understand the session layer`);
console.log(`  3. Open .kit/00-prompts.md — copy your first session prompt\n`);

// ---------------------------------------------------------------------------
// Scaffold
// ---------------------------------------------------------------------------

async function scaffold(root, projectName) {
  await createDirectories(root);
  await createFiles(root, projectName);
}

async function createDirectories(root) {
  const dirs = [
    // Playbook core
    ".playbook/_concerns",
    ".playbook/_integrations",
    ".playbook/_shared",
    ".playbook/.guides/expansions",
    ".playbook/templates",
    // Kit
    ".kit/_refs/video-insights",
    ".kit/_refs/templates",
    ".kit/_refs/examples",
    ".kit/_refs/snippets",
    ".kit/_refs/research",
    ".kit/_tests",
    ".kit/_archives/exploration",
    ".kit/_archives/progress",
    ".kit/_archives/kanban",
    // Docs
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
// File contents
// ---------------------------------------------------------------------------

function getFiles(projectName) {
  return {

    // -------------------------------------------------------------------------
    // Playbook core
    // -------------------------------------------------------------------------

    ".playbook/README.md": `# Playbook
# File: .playbook/README.md

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Everything is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

Playbook is a dev-dependency -- present during development, invisible in production.

---

## Where to Start

| If you are... | Start here |
|---|---|
| New to Playbook | You're in the right place -- read on |
| Starting a new project | \`.playbook/.guides/new-project.md\` |
| Adopting an existing project | \`.playbook/.guides/adopt.md\` |
| Resuming a project | \`.kit/00-prompts.md\` |
| Starting an AI dev session | \`.playbook/00-rules.md\` |
| Resuming from a rollout doc | \`docs/rollout/[milestone].md\` then \`.playbook/00-rules.md\` |
| Learning how the Context Kit works | \`.playbook/.guides/context-kit.md\` |
| Looking up pipeline reference | \`.playbook/pipeline.md\` |
| Looking up session prompts | \`.kit/00-prompts.md\` |

---

## The Pipeline

\`\`\`
                    Context Kit (always active)
                           |
[RE] -> PRD -> Flows -> Contracts -> DDA -> Code -> Rollout
\`\`\`

[RE] is the Reverse Engineer expansion -- conditional, existing projects only.

| Stage | What It Is | Where It Lives | Conditional |
|---|---|---|---|
| Reverse Engineer | Maps what exists before building what should | \`docs/rewrite/\` | Existing projects only |
| Context Kit | Session and decision layer -- always active | \`.kit/\` | Always |
| PRD | What to build and why | \`docs/\` | Always |
| Flows | Runtime paths | \`docs/flows/\` | Always |
| Contracts | Implementation boundaries | \`docs/contracts/\` | Always |
| DDA | Component structure and relationships | \`.playbook/\` | Always |
| Code | Implementation | \`src/\` | Always |
| Rollout | Generated snapshots | \`docs/rollout/\` | Always |

---

## Expansions

Expansions are optional stages that extend Playbook for specific needs.
Activate in \`.kit/01-process.md\` under \`Active Expansions\`.

| Expansion | When to Use | Guide |
|---|---|---|
| Reverse Engineer | Existing or legacy projects | \`.playbook/.guides/expansions/reverse-engineer.md\` |
| Video Insights | Research-driven ideation | Coming soon |

---

## Key Rules

- Nothing gets coded without a \`.playbook/\` doc
- Flows and contracts are approved before any DDA docs are written
- Docs stay in sync with code -- run sync before every PR
- Kit files are updated at the end of every session
- Progress log is append-only -- never edit past entries
- Expansions are declared in \`01-process.md\` before use

---

The doc is the contract. The code follows.

For the full pipeline reference: \`.playbook/pipeline.md\`
For the Context Kit guide: \`.playbook/.guides/context-kit.md\`
`,

    ".playbook/00-rules.md": `# Playbook Rules
# File: .playbook/00-rules.md

---
version: 2.0
requires: docs/code-standards.md
---

> Always load docs/code-standards.md alongside this file.
> This file defines how to implement. pipeline.md defines what and why.
> Neither is complete without the other.

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

## Folder Structure

.playbook/
  README.md              -> orientation and journey matrix
  pipeline.md            -> complete pipeline reference
  00-rules.md            -> this file; AI execution layer
  _index.md              -> project manifest and living folder tree
  _concerns/             -> cross-cutting capabilities
  _integrations/         -> third-party services and libraries
  _shared/               -> components used across multiple modules
  .guides/               -> guides
    README.md            -> orientation
    context-kit.md       -> Context Kit integration guide
    new-project.md       -> new project guide
    adopt.md             -> adoption guide -- decision-tree routed
    expansions/
      reverse-engineer.md
  templates/             -> doc type templates
docs/
  code-standards.md
  flows/
    _index.md
    global.md
    flow-N-name.md
  contracts/
    _index.md
    global.md
    flow-N-name.md
  rewrite/               -> RE expansion outputs
    system-map.md
    decision-record.md
    risk-register.md
  rollout/
.kit/
  00-prompts.md
  01-process.md
  02-exploration.md
  03-execution.md
  04-progress.md
  05-kanban.md           -> optional
  06-qa.md               -> optional
  _refs/
  _tests/
  _archives/

---

## Document Types

### Universal Frontmatter

id:      # kebab-case -- must match filename
export:  # exported name -- component and sequencer only
file:    # repo path -- component and sequencer only
type:    # component | sequencer | structure | concern | integration
status:  # draft | active | deprecated

---

### structure

Manifest with living folder tree. Always has ## Structure section.

---
id: [module]
type: structure
scope: project | app | module
status: draft
entry: []
contains: []
integrations: []
concerns: []
---

## What It Does
[Plain language purpose]

## Structure
- [_index.md](./_index.md) -- this file

---

### sequencer

Runtime coordinator. Full call chain with all branches in ## Flow.

---
id: [name]
export: [Name]
file: [src/path.ts]
type: sequencer
status: draft
parent: [module]
triggers: []
sequence: []
emits: []
concerns: []
---

## What It Does
[Plain language -- owns sequence, not logic]

## Flow
References: docs/flows/[flow].md + docs/contracts/[contract].md

1. On [Trigger](input):
   a. component.method(input)
      -> ok: ResultType  -> continue
      -> err: ErrorType  -> halt

---

### component

Single unit of logic. Returns typed Result. References contract.

---
id: [name]
export: [Name]
file: [src/path.ts]
type: component
status: draft
parent: [sequencer]
children: []
connects: []
emits: []
concerns: []
---

## What It Does
[Plain language -- single responsibility]

## Interface
Contract: docs/contracts/[flow]/[file].md#[section]

input:  [InputType]
output: Result<[Success], [Error]>

## Detail
[Edge cases only -- omit if nothing fits]

---

### concern

---
id: [name]
type: concern
status: draft
affects: all
provided-by: internal
---

## What It Does
[What it provides and how it is consumed]

---

### integration

---
id: [name]
type: integration
kind: external-service | external-library | internal-service
status: draft
used-by: []
config: []
docs: [url]
---

## What It Does
[What it provides and how it is used]

## Interface
[What this integration exposes -- methods, events, or data]

---

## Flow Document Format

---
id: flow-N-name
type: flow
scope: journey | sequence | operation | composite | compensation
trigger: request-response | event-driven | background | reactive | webhook | stream
status: draft
triggers: []
calls: []
emits: []
called-by: []
---

Core sections (required for every flow):
- ## What It Does
- ## Pre-conditions
- ## Post-conditions
- ## Walkthrough (narrative --- call chain)

Tier additions by scope:
  Journey, Sequence -> ## Compensation
  Journey, Composite -> ## Child Flows

Tier additions by trigger:
  Event-Driven        -> ## Event Contract
  Background          -> ## Schedule, ## Timeout Behavior
  Reactive            -> ## Subscription Contract, ## Disconnect Behavior
  Webhook             -> ## Payload Contract, ## Retry Behavior
  Stream              -> ## Subscription Contract, ## Disconnect Behavior, ## Reconnect Behavior

## Detail -- optional
N/A -- considered, does not apply
TODO -- blocks status: active

---

## Contract Document Format

Flow contract required sections:
  ## Happy Path
  ## Failure Modes
  ## Edge Cases
  ## Concurrency Rules
  ## Constraints

global.md required sections:
  ## Architecture Rules
  ## Auth Boundaries
  ## Error Handling Rules
  ## Audit Requirements
  ## Cross-Cutting Constraints

N/A or TODO. TODO blocks status: active.
Split at ~150 lines. Reference with precision: file.md#section-name

---

## Expansions

Declare in .kit/01-process.md:

Simple:
  Active Expansions: video-insights

Multi-phase:
  Active Expansions:
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

    ".playbook/_index.md": `---
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

    // -------------------------------------------------------------------------
    // Kit files
    // -------------------------------------------------------------------------

    ".kit/00-prompts.md": `# Playbook -- Session Prompts
# File: .kit/00-prompts.md

Quick reference for every session type. Copy and paste as needed.

For how the Context Kit works within Playbook:
.playbook/.guides/context-kit.md

---

## Context Kit -- Standalone Prompts
These work with any AI tool, any project type.

### Fresh Project

Message 1 -- upload .kit/01-process.md + .kit/03-execution.md, then send:

I'm starting a new project using the Context Kit.
I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Based on my project [1-2 sentence description], help me populate these files:
- Draft initial Exploration questions
- Suggest Execution guidelines
- Define Current State and initial goals

Just provide a brief confirmation.

Message 2 -- upload .kit/02-exploration.md + .kit/04-progress.md, then send:

Here are the remaining blank templates. Just provide a brief confirmation.

---

### Resume Project

Message 1 -- upload current .kit/01-process.md + .kit/03-execution.md, then send:

I'm resuming a project using the Context Kit.
I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.

Message 2 -- upload current .kit/02-exploration.md + .kit/04-progress.md, then send:

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
These extend the kit for Playbook-specific work.

### Start Dev Session

Upload .playbook/00-rules.md + docs/code-standards.md, then send:

Before any work, read in this order:
1. .playbook/00-rules.md
2. docs/code-standards.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md

[Attach relevant module and component docs]

Confirm your understanding. Then wait for my instruction.

---

### Resume from Rollout Doc

Upload docs/rollout/[milestone].md + .playbook/00-rules.md + docs/code-standards.md, then send:

I'm resuming work on an existing project.
Read the rollout doc first, then 00-rules.md and code-standards.md.
Confirm your understanding before we begin.

---

### Write Flows and Contracts

Attach docs/PRD.md, then send:

Given this PRD, define the flows and contracts for this project.

Flows (docs/flows/):
- Write docs/flows/_index.md as the entry point and dependency map
- Write docs/contracts/global.md first -- architecture, auth, error handling rules
- Write one flow file per major runtime path
- Declare scope and trigger type in frontmatter for each flow
- Include all failure paths -- not just the happy path
- Keep files small; split at ~150 lines

Contracts (docs/contracts/):
- Write docs/contracts/_index.md as the entry point
- Write one contract file per flow
- Required sections: Happy Path, Failure Modes, Edge Cases, Concurrency Rules, Constraints
- N/A when a section doesn't apply; TODO blocks status: active

Flag anything underspecified. Wait for review before writing any DDA docs.

---

### Bootstrap Scaffold from PRD

Attach the PRD + approved flow and contract files, then send:

Given this PRD and approved flows and contracts, generate the Playbook scaffold.
- Produce _index.md for the project and each module with living folder trees
- Create stub docs for all identifiable components, sequencers, concerns, integrations
- Mark all stubs as status: draft
- For sequencers, include a stub Flow section referencing the relevant flow files
- Flag anything underspecified

---

### Add New Component

Attach the parent _index.md + relevant flow file, then send:

Given this parent doc and flow, create a Playbook [type] doc for [description].
Follow Playbook conventions. Flag any missing relationships.
If sequencer, include a Flow section with full call chain and all branches.
After creating the doc, provide the updated Structure section for the parent _index.md.

---

### Sync Check

Run a Playbook sync check on all files touched this session.
For each: does the code match the Playbook doc?
List any mismatches. Update affected docs.
Update the living folder tree in any _index.md where components changed.

---

### Generate Rollout Doc

Attach all .playbook/ docs + .kit/04-progress.md, then send:

Generate a rollout doc for [milestone name].
Read the full .playbook/ tree and 04-progress.md.
Output to docs/rollout/[milestone].md.

---

### Adopt Existing Project

Upload .playbook/00-rules.md + docs/code-standards.md, then send:

I am adopting the Playbook pipeline for an existing project.
Read these two files first. Confirm. Do not begin work yet.
Then follow .playbook/.guides/adopt.md.

---

### Reverse Engineer -- Start Inventory

Upload .playbook/00-rules.md + all available project context, then send:

RE expansion active. Phase: inventory.

Map and document:
1. All applications or services and what they do
2. All major modules, components, and services
3. All external integrations and what they provide
4. The data model -- what data exists and how it is structured
5. Entry points -- how the system is accessed
6. Dependency relationships -- what depends on what
7. Tech stack -- frameworks, libraries, tools, versions

Produce a draft system-map.md. Use plain language.
Flag anything unclear. Wait for review before proceeding.

---

### Reverse Engineer -- Advance Phase

RE expansion current phase: [inventory | audit | classify | risk-map | gap-report | handoff]
Previous phase reviewed and approved.

Proceed to [next phase].
[Attach relevant rewrite docs]

Follow .playbook/.guides/expansions/reverse-engineer.md.
Wait for review before advancing again.

---

### Reverse Engineer -- Handoff

Attach all docs/rewrite/ files + current kit files, then send:

RE expansion complete. Run handoff:
1. Extract open topics from system-map.md -> .kit/02-exploration.md
2. Extract closed decisions from decision-record.md -> .kit/02-exploration.md
3. Extract known issues from risk-register.md -> .kit/03-execution.md
4. Update .kit/01-process.md -- mark RE complete, update Current State

Generate updated kit files as markdown code blocks for review.

---

### Playbook End of Session

Before we close:
1. Run Playbook sync check on all docs touched this session
2. Update .kit/04-progress.md -- completions, decisions, fixes
3. Update Current State in .kit/01-process.md
4. Update living folder tree if components changed
Generate updated markdown for all changed kit files.

---

### Error Recovery

Something has gone wrong. Stop all other work.

1. What broke: [description]
2. Category: type error | test failure | Playbook drift | layer violation | other
3. Location: code | Playbook doc | both
4. Fix at source -- do not patch symptoms
5. After fixing: re-run checks and Playbook sync
6. Log as Fixed entry in .kit/04-progress.md

---

### Session Limit Warning

We are approaching the session limit.
Update all kit files and any changed Playbook docs now.
Generate markdown for each so I can copy-paste and save.
`,

    ".kit/01-process.md": `# PROCESS
# File: .kit/01-process.md

---

**Phase:** Exploration
**Last Completed:** Playbook scaffold generated
**Next:** Populate Exploration with initial questions
**Active Modules:** none
**Active Expansions:** none
`,

    ".kit/02-exploration.md": `# EXPLORATION
# File: .kit/02-exploration.md

## Open Topics

**[Topic Name]**
- Questions to resolve
- Options being considered
- Ref: \`.kit/_refs/[type]/[filename]\` _(if applicable)_

---

## Closed Decisions

**[YYYY-MM-DD] Decision Name**
- What was decided
- Why
- Alternatives considered
- Ref: \`.kit/_refs/[type]/[filename]\` _(if applicable)_
- Flow: \`docs/flows/flow-N-name.md\` _(if applicable)_
`,

    ".kit/03-execution.md": `# EXECUTION
# File: .kit/03-execution.md

## Guidelines

**Style & Voice:**
- [Tone and approach]

**Rules & Constraints:**
- [Specific requirements]
- Prefer native implementations over external libraries
- External dependencies require explicit justification before adoption

**Quality Bar:**
- [Standards for completion]

**QA Tier:** core | standard | full

**Custom Ticket Types:** _(declare before use in kanban)_
- \`[type]\` -- [description]

---

## Plan

**Goals:**
- [What you're building]

**Outcomes:**
- [What done looks like]

**Out of Scope:**
- [What's not included]

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

    ".kit/04-progress.md": `# PROGRESS LOG (APPEND-ONLY)
# File: .kit/04-progress.md

Rules:
- Entries are never edited or deleted
- New updates always added at the bottom
- Three entry types: Completed, Decided, Fixed
- In Progress is always the last entry, overwritten each session
- Add timestamp per session: ## YYYY-MM-DD

---

## ${new Date().toISOString().split("T")[0]}
- **Completed:** Playbook scaffold generated by create-playbook
- **In Progress:** Populating Context Kit for new project
`,

    ".kit/05-kanban.md": `# KANBAN
# File: .kit/05-kanban.md

## Rules
- Tickets seeded from Acceptance Criteria in 03-execution.md
- One outcome per ticket -- no bundling
- Priority within each column is top-down
- Blocked tickets stay in their column -- blocking is explicit
- When a ticket moves to Done, log it in 04-progress.md

## Ticket Types
Core (always available): feature | bug | task
Pipeline (when .playbook/ exists): doc | sync
Project (declare in 03-execution.md before use): [custom]

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
**Ref:** [optional]
**Blocked by:** none

---

## Done

### [K-03] Ticket Title
**Completed:** YYYY-MM-DD
`,

    ".kit/06-qa.md": `# QA PLAN
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

    // -------------------------------------------------------------------------
    // Docs
    // -------------------------------------------------------------------------

    "docs/flows/_index.md": `# Flows
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

    "docs/contracts/_index.md": `# Contracts
# File: docs/contracts/_index.md

Entry point for all contract documents.
Always read global.md before any flow-specific contract.

---

## Read Order

1. global.md -- system-wide rules; read first always
2. flow-N-name.md -- companion to the relevant flow

---

## Contracts

| File | Companion Flow | Status |
|---|---|---|
| global.md | all flows | draft |
`,

    "docs/contracts/global.md": `# Global Contract
# File: docs/contracts/global.md

> Read this file before any flow-specific contract.
> Rules here apply to every component, every layer, every flow.

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
_N/A -- section considered and does not apply_
_TODO -- section not yet documented; blocks status: active_
`,

    "docs/rewrite/system-map.md": `# System Map
# File: docs/rewrite/system-map.md

> Output of the Reverse Engineer expansion -- Phase 1 and 2.
> Only present when RE expansion is active.

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

    "docs/rewrite/decision-record.md": `# Decision Record
# File: docs/rewrite/decision-record.md

> Output of the Reverse Engineer expansion -- Phase 3.
> Only present when RE expansion is active.

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

    "docs/rewrite/risk-register.md": `# Risk Register
# File: docs/rewrite/risk-register.md

> Output of the Reverse Engineer expansion -- Phase 4.
> Only present when RE expansion is active.

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

    // -------------------------------------------------------------------------
    // Gitkeeps for empty folders
    // -------------------------------------------------------------------------

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
