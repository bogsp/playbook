# Playbook — Session Prompts
# File: playbook/kit/00-prompts.md

Quick reference for every session type. Copy and paste as needed.

---

## Context Kit — Fresh Project

### Message 1
Upload kit/01-process.md + kit/03-execution.md, then send:

I'm starting a new project using the Playbook pipeline. I'll share files in two messages.

This message: Blank templates for Process and Execution
Next message: Blank templates for Exploration and Progress

Based on my project [1-2 sentence description], help me populate these files:
- Draft initial Exploration questions
- Suggest guidelines for Execution
- Define my Current State and initial goals

Just provide a brief confirmation.

### Message 2
Upload kit/02-exploration.md + kit/04-progress.md, then send:

Here are the remaining blank templates. Just provide a brief confirmation.

---

## Context Kit — Resume Project

### Message 1
Upload current kit/01-process.md + kit/03-execution.md, then send:

I'm resuming a Playbook project. I'll share files in two messages.

This message: Process and Execution
Next message: Exploration and Progress

Focus only on Current State. Do not reopen closed decisions unless I ask.
Follow all guidelines and quality standards in Execution. Just provide a brief confirmation.

### Message 2
Upload current kit/02-exploration.md + kit/04-progress.md, then send:

Here is the context from earlier work. Just provide a brief confirmation.
[Optionally describe what you want to work on this session.]

---

## Playbook — Start Dev Session

Upload .playbook/00-playbook.md + docs/code-standards.md, then send:

Before any work, read in this order:
1. .playbook/00-playbook.md
2. docs/code-standards.md
3. docs/flows/_index.md (if flows exist)
4. docs/contracts/_index.md (if contracts exist)
5. .playbook/_index.md

[Attach relevant module and component docs]

Confirm your understanding of the project structure.
Then wait for my instruction.

---

## Playbook — Resume from Rollout Doc

Upload docs/rollout/[milestone].md + .playbook/00-playbook.md + docs/code-standards.md, then send:

I'm resuming work on an existing project.
Read the rollout doc first, then 00-playbook.md and code-standards.md.
Confirm your understanding of the project structure before we begin.

---

## Playbook — Write Flows and Contracts

Attach docs/PRD.md, then send:

Given this PRD, define the flows and contracts for this project.

Flows (docs/flows/):
- Write docs/flows/_index.md as the entry point table
- Write docs/contracts/global.md first — architecture, audit, error handling rules
- Write one flow file per major runtime path (docs/flows/flow-N-name.md)
- Include all failure paths, not just the happy path
- Keep files small — one flow per file

Contracts (docs/contracts/):
- Write docs/contracts/_index.md as the entry point table
- Write one contract file per flow (docs/contracts/flow-N-name.md)
- Each contract answers: what rules must every implementation honour?

Flag anything underspecified. Wait for review before writing any DDA docs.

---

## Playbook — Bootstrap Scaffold from PRD

Attach the PRD + any approved flow/contract files, then send:

Given this PRD and the approved flows and contracts, generate the initial Playbook scaffold.
Produce _index.md for the project and each app/module.
Include a living folder tree in every _index.md with one-line descriptions.
Create stub docs for all identifiable components, sequencers,
concerns, and integrations. Mark all stubs as status: draft.
For any sequencers found, include a stub Flow section referencing the relevant flow files.
Flag anything underspecified.

---

## Playbook — Add New Component

Attach the parent _index.md + relevant flow file, then send:

Given this parent doc and flow, create a Playbook [type] doc for [plain description].
Follow Playbook conventions. Flag any missing relationships.
If type is sequencer, include a Flow section referencing the flow file and a stub diagram in Detail.
After creating the doc, provide the updated Structure section for the parent _index.md.

---

## Playbook — Sync Check

Send before every PR:

Run a Playbook sync check on all files touched this session.
For each: does the code match the Playbook doc?
List any mismatches. Update affected docs.
Update the living folder tree in any _index.md where components were added or removed.

---

## Playbook — Generate Rollout Doc

Attach all .playbook/ docs + kit/04-progress.md, then send:

Generate a rollout doc for [milestone name].
Read the full .playbook/ tree and 04-progress.md.
Output to docs/rollout/[milestone].md.

---

## Adopt Existing Project — With Context Kit

### Message 1
Upload .playbook/00-playbook.md + docs/code-standards.md, then send:

I am adopting the Playbook pipeline for an existing project that already uses Context Kit.
Read these two files first. Just confirm you have read them. Do not begin any work yet.

### Message 2
Upload all existing kit files + any available docs or specs, then send:

Here is the existing project context. The Context Kit files are the current source of truth.
Do not reopen closed decisions.

Run a structured audit against the Playbook pipeline:

1. Inventory
   - Map all existing modules, services, components, and dependencies
   - Identify current folder structure and tech stack
   - Note all third-party integrations

2. Audit
   - What exists in .playbook/ already?
   - Do docs/flows/ and docs/contracts/ exist? Are they complete?
   - Which components have no Playbook doc?
   - Are there layer violations or direct module-to-module imports?
   - Does the code follow naming conventions in code-standards.md?
   - Are there undocumented concerns or integrations?
   - What drifts from Playbook conventions?

3. Gap Report
   Produce a prioritized list:
   - Missing: [what does not exist yet]
   - Drifting: [what exists but does not match Playbook]
   - Compliant: [what already follows Playbook]

Wait for my review before proceeding to scaffold.

### Message 3
After approving the gap report, send:

Proceed with scaffold and reconcile:

1. Scaffold flows and contracts if missing:
   - Create docs/flows/_index.md and docs/contracts/_index.md
   - Draft stub flow files from what is found in the codebase
   - Draft docs/contracts/global.md with architecture rules

2. Scaffold .playbook/ structure around the existing code:
   - Create _index.md with living folder tree for the project and each module
   - Create stub Playbook docs (status: draft) for all unmapped components
   - Create stub docs for all concerns and integrations found
   - Do not modify any existing code

3. Reconcile — for each stub, note:
   - What the code currently does vs what the doc says
   - Any naming that needs to align with code-standards.md
   - Any structural changes recommended (not required yet)

4. Update kit files — update Current State and append to Progress log.

Generate all files as markdown code blocks for review.

### Message 4
After reviewing scaffolded docs, send:

Scaffolding approved. Begin incremental adoption:

Work through the gap report in priority order. For each item:
1. Author or update the Playbook doc to status: active
2. Identify any code changes needed to comply
3. Flag changes that could break existing behavior — do not make them yet
4. Mark compliant items as done in the gap report

Do not refactor code until each Playbook doc is approved.
Group all changes by scope for logical commits.
Run the Phase Completion Checklist after each item.

---

## Adopt Existing Project — Without Context Kit

### Message 1
Upload .playbook/00-playbook.md + docs/code-standards.md, then send:

I am adopting the Playbook pipeline for an existing project with no Context Kit files.
Read these two files first. Just confirm you have read them. Do not begin any work yet.

### Message 2
Upload any available docs (README, specs, architecture notes) + key source files, then send:

Here is the existing project context. There are no Context Kit files yet.

Run a structured audit against the Playbook pipeline:

1. Inventory
   - Map all existing modules, services, components, and dependencies
   - Identify current folder structure and tech stack
   - Note all third-party integrations

2. Audit
   - Do docs/flows/ and docs/contracts/ exist? Are they complete?
   - Which components have no Playbook doc?
   - Are there layer violations or direct module-to-module imports?
   - Does the code follow naming conventions in code-standards.md?
   - Are there undocumented concerns or integrations?
   - What drifts from Playbook conventions?

3. Gap Report
   Produce a prioritized list:
   - Missing: [what does not exist yet]
   - Drifting: [what exists but does not match Playbook]
   - Compliant: [what already follows Playbook]

Wait for my review before proceeding.

### Message 3
After approving the gap report, send:

Proceed with full scaffold:

1. Scaffold flows and contracts:
   - Draft docs/flows/_index.md and stub flow files from existing codebase
   - Draft docs/contracts/_index.md and docs/contracts/global.md
   - Note these are stubs for review — not final

2. Scaffold .playbook/:
   - Create _index.md with living folder tree for the project and each module
   - Create stub Playbook docs (status: draft) for all unmapped components
   - Create stub docs for all concerns and integrations found
   - Do not modify any existing code

3. Reconcile — for each stub, note current code behavior vs doc intention.

4. Generate all six Context Kit files populated from what was found:
   - 01-process.md: Phase = Execution, Current focus = Playbook adoption
   - 02-exploration.md: Document any architectural decisions already made
   - 03-execution.md: Goals = full Playbook adoption; tasks = gap report items
   - 04-progress.md: Log the audit and scaffold as Completed entries
   - 05-kanban.md: Seed from gap report items
   - 06-qa.md: Seed from Acceptance Criteria in 03-execution.md

Generate all files as markdown code blocks for review.

### Message 4
After reviewing, send:

Scaffolding approved. Begin incremental adoption:

Work through the gap report in priority order. For each item:
1. Author or update the Playbook doc to status: active
2. Identify any code changes needed to comply
3. Flag changes that could break existing behavior — do not make them yet
4. Mark compliant items as done in the gap report

Do not refactor code until each Playbook doc is approved.
Group all changes by scope for logical commits.
Run the Phase Completion Checklist after each item.

---

## Phase Completion

Send at the end of every development phase:

Before we close this phase:
1. Run biome check — confirm zero errors
2. Run biome format --write — confirm zero diffs
3. Confirm all tests pass and coverage gates are met
4. Run Playbook sync check on all touched .playbook/ docs
5. Update the living folder tree in any _index.md where components changed
6. Confirm all changes are committed and pushed (grouped by scope)
7. Update 01-process.md, 03-execution.md, and 04-progress.md
8. Generate a rollout doc if a milestone was completed

Generate updated markdown for all changed kit files.

---

## End of Session

Send at the end of any session:

Before we close:
1. Run Playbook sync check on all docs touched this session
2. Update 04-progress.md with completions, decisions, and fixes
3. Update Current State in 01-process.md
4. Generate updated markdown for all changed kit files

---

## Error Recovery

Send when something breaks:

Something has gone wrong. Stop all other work.

1. Describe the failure: [what broke]
2. Identify the category: type error / test failure / Playbook drift / layer violation / other
3. Isolate: is it in code, in a Playbook doc, or both?
4. Propose a fix at the source — do not patch symptoms
5. After fixing: re-run biome check, tests, and Playbook sync
6. Log the resolution in 04-progress.md as a Fixed entry

---

## Context Rot Recovery

Send if AI starts ignoring uploaded files:

Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read .playbook/00-playbook.md and docs/code-standards.md before continuing.

If rot persists, start a fresh session and load a rollout doc as context.

---

## Session Limit Warning

Send when approaching 80% context usage:

We are approaching the session limit.
Update all kit files and any changed Playbook docs now.
Generate markdown for each so I can copy-paste and save before we continue.
