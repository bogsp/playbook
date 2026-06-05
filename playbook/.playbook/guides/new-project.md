# Starting a New Project
# File: .playbook/guides/new-project.md

This guide walks through every stage of the Playbook pipeline from scratch.
Follow the stages in order. Do not skip ahead.

---

## Before You Begin

**1. Choose your vocabulary**
Pick the vocabulary that matches your project domain.
Delete all other `vocabulary-*/` folders from `.playbook/`.

**2. Read THE-STANDARD.md**
Five minutes of orientation. Everything else references it.

**3. Set up kit files**
The kit files in `.playbook/kit/` are your blank templates.
You will populate them in Stage 1.

---

## Stage 1 — Kit (Exploration)

Get your thinking straight before touching any tools.

### What to do

1. Upload `kit/01-process.md` + `kit/03-execution.md` to a new AI session
2. Describe your project in 1–2 sentences and ask AI to populate the files
3. Upload `kit/02-exploration.md` + `kit/04-progress.md`
4. Work through open questions until key decisions are locked
5. Review closed decisions — are you ready to define what to build?

Use prompt: **Kit — Fresh Project** from `kit/00-prompts.md`

### Done when

- Project goals are clear
- Key decisions are in Closed Decisions
- Current State phase is set to Define

---

## Stage 2 — Define

Define what you are building and why.
This is the upstream input for all paths, contracts, and structure.

### What to do

1. Use closed decisions from `02-exploration.md` as input
2. Ask AI to draft a definition document from your decisions
3. Review and approve
4. Store in `docs/`
5. Log completion in `04-progress.md`

### Done when

- Definition is approved and saved to `docs/`
- Acceptance criteria are clear and verifiable

---

## Stage 3 — Plan (Flows)

Define every major process path before any unit is designed.
This stage prevents problems that would otherwise live in
the connections between units.

### What to do

1. Write flow files under `docs/flows/`
   (entry point: `docs/flows/_index.md`)
2. Write a companion contract file under `docs/contracts/` for each flow
   (entry point: `docs/contracts/_index.md`)
3. Always write `docs/contracts/global.md` first
4. Walk each path step by step including failure paths
5. Review paths and contracts together for completeness
6. Lock paths and contracts in `kit/01-process.md` before any definitions

### Flows vs contracts

- **Flows** answer: what happens? What are the steps? What happens on failure?
- **Contracts** answer: what rules must every implementation honour?

### Done when

- Every process path has a flow file
- Every flow has a companion contract file
- `global.md` covers trust, access, and foundation rules
- Flows and contracts are reviewed and marked locked

---

## Stage 4 — Structure (Definitions)

Define every unit before any execution begins.
The definition is the contract. Execution follows it.

### What to do

1. Load Playbook context (use prompt: **Start Session**)
2. Bootstrap definitions from your definition document
3. Review all generated stubs — does the structure make sense?
4. Author each definition top-down:
   project `_index.md` → module `_index.md` → coordinators → units
5. For each coordinator definition, read the relevant flow and contract first
6. Activate definitions one by one: change `status: draft` to `status: active`
7. Confirm the living folder tree in every `_index.md` is accurate

### Done when

- All definitions are `status: active`
- Living folder trees are accurate
- No TODO flags remain
- Every coordinator references its flow and contract

---

## Stage 5 — Build

Execute against definitions.

### What to do

1. Start every session with the Playbook session prompt
2. Load only the definitions needed for the current task
3. Work ticket by ticket if using Kanban (`kit/05-kanban.md`)
4. After each unit: run sync check
5. Before every delivery: run Phase Completion Checklist
6. Keep definitions updated as execution evolves

### Rules

- Nothing is built without a definition
- No new dependency without a declared integration
- Definitions stay in sync with execution

### Done when

- All acceptance criteria from `kit/03-execution.md` are met
- All verification cases pass (if `kit/06-qa.md` is active)
- Phase Completion Checklist passes fully

---

## Stage 6 — Ship

Generate a snapshot for the completed milestone.

### What to do

1. Use prompt: **Generate Ship Doc**
2. Attach all `.playbook/` definitions + `kit/04-progress.md`
3. Review the generated `docs/rollout/[milestone].md`
4. Use it as context for the next session or new team member
5. Never edit Ship docs directly — edit the source definition and regenerate

### Done when

- Ship doc is generated and saved to `docs/rollout/`
- Kit files are updated with final state
- All changes are committed to version control

---

## Quick Reference

```
Stage 1   Kit            .playbook/kit/ + session
Stage 2   Define         docs/[definition].md
Stage 3   Plan           docs/flows/ + docs/contracts/
Stage 4   Structure      .playbook/ definitions
Stage 5   Build          execution — built against definitions
Stage 6   Ship           docs/rollout/[milestone].md
```
