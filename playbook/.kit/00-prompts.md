# Playbook — Session Prompts
# File: .kit/00-prompts.md

Quick reference for every session type. Copy and paste as needed.

---

## Context Kit — Fresh Project

### Message 1
Upload `.kit/01-process.md` + `.kit/03-execution.md`, then send:

```
I'm starting a new project using the Playbook pipeline. I'll share files in two messages.

This message: Process (session spark) + Execution (guidelines + plan + tasks)
Next message: Exploration (decisions) + Progress (history)

Based on my project [1-2 sentence description], help me populate these files:
- Draft initial Exploration questions
- Suggest Execution guidelines
- Define Current State and initial goals

Just provide a brief confirmation.
```

### Message 2
Upload `.kit/02-exploration.md` + `.kit/04-progress.md`, then send:

```
Here are the remaining blank templates. Just provide a brief confirmation.
```

---

## Context Kit — Resume Project

### Message 1
Upload current `.kit/01-process.md` + `.kit/03-execution.md`, then send:

```
I'm resuming a Playbook project. I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.
```

### Message 2
Upload current `.kit/02-exploration.md` + `.kit/04-progress.md`, then send:

```
Here is the context from earlier work. Just provide a brief confirmation.
[Optionally describe what you want to work on this session.]
```

---

## Playbook — Start Dev Session

Upload `.playbook/00-rules.md` + `docs/code-standards.md`, then send:

```
Before any work, read in this order:
1. .playbook/00-rules.md
2. docs/code-standards.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md

[Attach relevant module and component docs]

Confirm your understanding. Then wait for my instruction.
```

---

## Playbook — Resume from Rollout Doc

Upload `docs/rollout/[milestone].md` + `.playbook/00-rules.md` + `docs/code-standards.md`, then send:

```
I'm resuming work on an existing project.
Read the rollout doc first, then 00-rules.md and code-standards.md.
Confirm your understanding before we begin.
```

---

## Playbook — Write Flows and Contracts

Attach `docs/PRD.md`, then send:

```
Given this PRD, define the flows and contracts for this project.

Flows (docs/flows/):
- Write docs/flows/_index.md as the entry point and dependency map
- Write docs/contracts/global.md first — architecture, auth, error handling rules
- Write one flow file per major runtime path
- Declare scope and trigger type in frontmatter for each flow
- Include all failure paths — not just the happy path
- Keep files small — one flow per file; split at ~150 lines

Contracts (docs/contracts/):
- Write docs/contracts/_index.md as the entry point
- Write one contract file per flow
- Required sections: Happy Path, Failure Modes, Edge Cases, Concurrency Rules, Constraints
- Use N/A when a section doesn't apply; TODO blocks status: active

Flag anything underspecified. Wait for review before writing any DDA docs.
```

---

## Playbook — Bootstrap Scaffold from PRD

Attach the PRD + approved flow and contract files, then send:

```
Given this PRD and the approved flows and contracts, generate the Playbook scaffold.

- Produce _index.md for the project and each module with living folder trees
- Create stub docs for all identifiable components, sequencers, concerns, integrations
- Mark all stubs as status: draft
- For sequencers, include a stub Flow section referencing the relevant flow files
- Flag anything underspecified
```

---

## Playbook — Add New Component

Attach the parent `_index.md` + relevant flow file, then send:

```
Given this parent doc and flow, create a Playbook [type] doc for [description].
Follow Playbook conventions. Flag any missing relationships.
If type is sequencer, include a Flow section with full call chain and all branches.
After creating the doc, provide the updated Structure section for the parent _index.md.
```

---

## Playbook — Sync Check

Send before every PR:

```
Run a Playbook sync check on all files touched this session.
For each: does the code match the Playbook doc?
List any mismatches. Update affected docs.
Update the living folder tree in any _index.md where components changed.
```

---

## Playbook — Generate Rollout Doc

Attach all `.playbook/` docs + `.kit/04-progress.md`, then send:

```
Generate a rollout doc for [milestone name].
Read the full .playbook/ tree and 04-progress.md.
Output to docs/rollout/[milestone].md.
```

---

## Adopt Existing Project — With Context Kit

### Message 1
Upload `.playbook/00-rules.md` + `docs/code-standards.md`, then send:

```
I am adopting the Playbook pipeline for an existing project that already uses Context Kit.
Read these two files first. Confirm you have read them. Do not begin any work yet.
```

### Message 2
Upload all existing kit files + any available docs or specs, then send:

```
Here is the existing project context. The Context Kit files are the source of truth.
Do not reopen closed decisions.

Run a structured audit:

1. Inventory — map modules, components, dependencies, tech stack, integrations
2. Audit — what exists, what's missing, what drifts from Playbook conventions
3. Gap Report:
   - Missing: what does not exist yet
   - Drifting: what exists but doesn't match Playbook
   - Compliant: what already follows Playbook

Wait for review before proceeding.
```

### Message 3
After approving the gap report, send:

```
Proceed with scaffold:

1. Scaffold flows and contracts if missing
2. Scaffold .playbook/ around existing code — do not modify anything
3. Stub all unmapped components as status: draft
4. Update kit files — Current State and Progress log

Generate all files as markdown code blocks for review.
```

### Message 4
After reviewing, send:

```
Scaffolding approved. Begin incremental adoption:

Work through the gap report in priority order:
1. Author or update each Playbook doc to status: active
2. Identify code changes needed — flag but do not make yet
3. Once doc is approved, make corresponding code changes
4. Run Phase Completion Checklist after each item
```

---

## Adopt Existing Project — Without Context Kit

### Message 1
Upload `.playbook/00-rules.md` + `docs/code-standards.md`, then send:

```
I am adopting the Playbook pipeline for an existing project with no Context Kit files.
Read these two files first. Confirm you have read them. Do not begin any work yet.
```

### Message 2
Upload any available docs + key source files, then send:

```
Here is the existing project context. There are no Context Kit files yet.

Run a structured audit:

1. Inventory — map modules, components, dependencies, tech stack, integrations
2. Audit — what exists, what's missing, what drifts from Playbook conventions
3. Gap Report:
   - Missing: what does not exist yet
   - Drifting: what exists but doesn't match Playbook
   - Compliant: what already follows Playbook

Wait for review before proceeding.
```

### Message 3
After approving the gap report, send:

```
Proceed with full scaffold:

1. Scaffold flows and contracts from existing codebase
2. Scaffold .playbook/ — do not modify any existing code
3. Generate all six Context Kit files populated from what was found
4. Seed 05-kanban.md from gap report items
5. Seed 06-qa.md from Acceptance Criteria

Generate all files as markdown code blocks for review.
```

### Message 4
After reviewing, send:

```
Scaffolding approved. Begin incremental adoption:

Work through the gap report in priority order:
1. Author or update each Playbook doc to status: active
2. Identify code changes needed — flag but do not make yet
3. Once doc is approved, make corresponding code changes
4. Run Phase Completion Checklist after each item
```

---

## End of Session

Send at the end of any session:

```
Before we close:
1. Run Playbook sync check on all docs touched this session
2. Update .kit/04-progress.md — completions, decisions, fixes
3. Update Current State in .kit/01-process.md
4. Update living folder tree if components changed
Generate updated markdown for all changed kit files.
```

---

## Error Recovery

Send when something breaks:

```
Something has gone wrong. Stop all other work.

1. What broke: [description]
2. Category: type error | test failure | Playbook drift | layer violation | other
3. Location: code | Playbook doc | both
4. Fix at source — do not patch symptoms
5. After fixing: re-run checks and Playbook sync
6. Log as Fixed entry in .kit/04-progress.md
```

---

## Context Rot Recovery

Send if AI starts ignoring uploaded files:

```
Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read .playbook/00-rules.md and docs/code-standards.md before continuing.
```

---

## Session Limit Warning

Send when approaching 80% context:

```
We are approaching the session limit.
Update all kit files and any changed Playbook docs now.
Generate markdown for each so I can copy-paste and save before we continue.
```
