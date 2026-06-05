# Session Prompts
# File: .playbook/kit/00-prompts.md

Quick reference for every session type. Copy and paste as needed.

For how the Kit works: `guides/context-kit.md`

---

## Kit — Standalone Prompts

These work with any AI tool, any project type.

### Fresh Project

**Message 1**
Upload `kit/01-process.md` + `kit/03-execution.md`, then send:

```
I'm starting a new project using the Playbook Kit.
I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Based on my project [1-2 sentence description], help me populate these files:
- Draft initial Exploration questions
- Suggest Execution guidelines
- Define Current State and initial goals

Just provide a brief confirmation.
```

**Message 2**
Upload `kit/02-exploration.md` + `kit/04-progress.md`, then send:

```
Here are the remaining blank templates. Just provide a brief confirmation.
```

---

### Resume Project

**Message 1**
Upload current `kit/01-process.md` + `kit/03-execution.md`, then send:

```
I'm resuming a project using the Playbook Kit.
I'll share files in two messages.

This message: Process + Execution
Next message: Exploration + Progress

Focus only on Current State. Do not reopen closed decisions unless I ask.
Just provide a brief confirmation.
```

**Message 2**
Upload current `kit/02-exploration.md` + `kit/04-progress.md`, then send:

```
Here is the context from earlier work. Just provide a brief confirmation.
[Optionally describe what you want to work on this session.]
```

---

### End of Session

```
Based on this session, update my kit files:
- Check off completed tasks in 03-execution.md
- Move closed decisions to 02-exploration.md with dates and reasoning
- Append to 04-progress.md — Completed, Decided, Fixed, In Progress
- Update Current State in 01-process.md

Generate updated markdown for all changed files.
```

---

### Context Rot Recovery

```
Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read the uploaded files before continuing.
```

---

## Playbook Pipeline Prompts

These extend the Kit for Playbook-specific work.

### Start Session

Upload `AI-INSTRUCTIONS.md` + `vocabulary-[domain]/AI-INSTRUCTIONS.md`, then send:

```
Before any work, read in this order:
1. .playbook/AI-INSTRUCTIONS.md
2. vocabulary-[domain]/AI-INSTRUCTIONS.md
3. docs/flows/_index.md
4. docs/contracts/_index.md
5. .playbook/_index.md

[Attach relevant unit definitions]

Confirm your understanding. Then wait for my instruction.
```

---

### Resume from Ship Doc

Upload `docs/rollout/[milestone].md` + `AI-INSTRUCTIONS.md` + domain `AI-INSTRUCTIONS.md`, then send:

```
I'm resuming work on an existing project.
Read the Ship doc first, then both AI-INSTRUCTIONS files.
Confirm your understanding before we begin.
```

---

### Write Flows and Contracts

Attach the Define document, then send:

```
Given this project definition, define the flows and contracts.

Flows (docs/flows/):
- Write docs/flows/_index.md as the entry point
- Write docs/contracts/global.md first — foundation, trust, error handling rules
- Write one flow file per major process path
- Declare scope and trigger type in frontmatter for each flow
- Include all failure paths — not just the happy path
- Keep files small — one flow per file; split at ~150 lines

Contracts (docs/contracts/):
- Write docs/contracts/_index.md as the entry point
- Write one contract file per flow
- Required sections: Happy Path, Failure Modes, Edge Cases,
  Sequencing Rules, Constraints
- Use N/A when a section does not apply; TODO blocks active status

Flag anything underspecified. Wait for review before writing any definitions.
```

---

### Bootstrap Definitions from Define Doc

Attach the Define doc + approved flow and contract files, then send:

```
Given this project definition and the approved flows and contracts,
generate the Playbook structure definitions.

- Produce _index.md for the project and each module with living folder trees
- Create stub definitions for all identifiable units, coordinators,
  concerns, integrations
- Mark all stubs as status: draft
- For coordinators, include a stub Process section referencing relevant flows
- Flag anything underspecified
```

---

### Add New Unit

Attach the parent `_index.md` + relevant flow file, then send:

```
Given this parent definition and flow, create a Playbook [type] definition
for [description]. Follow Playbook conventions. Flag any missing relationships.
If type is coordinator, include a Process section with full sequence and all branches.
After creating the definition, provide the updated Structure section
for the parent _index.md.
```

---

### Sync Check

Send before every delivery:

```
Run a Playbook sync check on all definitions touched this session.
For each: does the execution match the definition?
List any mismatches. Update affected definitions.
Update the living folder tree in any _index.md where units changed.
```

---

### Generate Ship Doc

Attach all `.playbook/` definitions + `kit/04-progress.md`, then send:

```
Generate a Ship doc for [milestone name].
Read the full .playbook/ tree and kit/04-progress.md.
Output to docs/rollout/[milestone].md.
```

---

### Adopt Existing Project

Upload `AI-INSTRUCTIONS.md` + domain `AI-INSTRUCTIONS.md`, then send:

```
I am adopting the Playbook pipeline for an existing project.
Read these two files first. Confirm you have read them.
Do not begin any work yet.

Then follow the decision tree in guides/adopt.md.
```

---

### Map Existing — Start Inventory

Upload `AI-INSTRUCTIONS.md` + all available project context, then send:

```
The Map Existing expansion is active. Current phase: inventory.

Map and document:
1. All major units, components, or sections and what they do
2. All external dependencies and what they provide
3. The information model — what data or content exists and how it is structured
4. Entry points — how the project is accessed or initiated
5. Dependency relationships — what depends on what
6. Current tools, methods, and approaches

Produce a draft system-map.md. Use plain language.
Flag anything unclear or needing investigation.
Wait for review before proceeding.
```

---

### Map Existing — Advance Phase

Send when advancing to the next phase:

```
Map Existing current phase: [inventory | audit | classify | risk-map | gap-report | handoff]
Previous phase output reviewed and approved.

Proceed to [next phase].
[Attach relevant rewrite docs]

Follow the phase instructions in guides/expansions/map-existing.md.
Wait for review before advancing again.
```

---

### Map Existing — Handoff

Attach all `docs/rewrite/` files + current kit files, then send:

```
Map Existing expansion is complete. Run the handoff.

1. Extract open topics from system-map.md for kit/02-exploration.md
2. Extract closed decisions from decision-record.md for kit/02-exploration.md
3. Extract known issues from risk-register.md for kit/03-execution.md
4. Update kit/01-process.md — mark expansion complete, update Current State

Generate updated kit files as markdown for review.
```

---

### Research Insights — Extract

Send to an AI tool with video or document access:

```
Please summarize the main arguments in '[Title]' by [Source].
Use the source material to highlight the most important takeaways.
[URL or attachment]

Structure your response using this template:

---
title: "[Title]"
source: "[Source]"
url: [URL]
date: [Today's Date]
type: [general | tutorial | case-study | framework | opinion | research]
topics: [2-4 relevant tags]
relevance:
---

## Core Idea
One paragraph. The central argument or insight.

## Key Points
3-5 most important takeaways. No more.

## Connections
Leave blank.

## Status
Pending

Output as a downloadable markdown file.
```

For specific content types, add one section after Key Points:
- Tutorial → `## Steps`
- Case Study → `## Outcome`
- Framework → `## Framework`
- Opinion → `## Counterarguments`
- Research → `## Evidence`

Save to: `kit/_refs/research/[kebab-title].md`

---

### Research Insights — Discuss

Upload the insight file alongside kit files, then send:

```
I have a new research insight to discuss.
File: kit/_refs/research/[filename].md

Review it and:
1. Summarize the core idea in one sentence
2. Identify connections to our current project context
3. Flag any conflicts with closed decisions in 02-exploration.md
4. Suggest whether this should open a topic, close a decision,
   add a task, or surface a risk
5. Ask me how I want to proceed

Do not integrate anything yet. Surface connections and wait.
```

---

### Session Limit Warning

```
We are approaching the session limit.
Update all kit files and any changed definitions now.
Generate markdown for each so I can copy-paste and save before we continue.
```

---

### Playbook End of Session

```
Before we close:
1. Run sync check on all definitions touched this session
2. Update kit/04-progress.md — completions, decisions, fixes
3. Update Current State in kit/01-process.md
4. Update living folder tree if units changed
Generate updated markdown for all changed kit files.
```

---

### Error Recovery

```
Something has gone wrong. Stop all other work.

1. What broke: [description]
2. Category: drift | boundary violation | undefined path | other
3. Location: definition | execution | both
4. Fix at source — do not patch symptoms
5. After fixing: re-run sync check
6. Log as Fixed entry in kit/04-progress.md
```

---

### Context Rot Recovery — Playbook

```
Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read AI-INSTRUCTIONS.md and vocabulary AI-INSTRUCTIONS.md before continuing.
```
