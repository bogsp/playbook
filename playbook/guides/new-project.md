# Starting a New Project with Playbook

This guide walks through every stage of the Playbook pipeline from scratch.
Follow the stages in order. Do not skip ahead.

---

## Stage 1 — Context Kit (Exploration)

Get your thinking straight before touching any tools.

### What to do

1. Copy the blank kit templates from `kit/` into a working folder
2. Upload `kit/01-process.md` + `kit/03-execution.md` to a new AI session
3. Describe your project in 1-2 sentences and ask AI to populate the files
4. Upload `kit/02-exploration.md` + `kit/04-progress.md`
5. Work through open questions until key decisions are locked
6. Review closed decisions — are you ready to define what to build?

Use prompt: **Context Kit — Fresh Project** from `kit/00-prompts.md`

### Done when
- Project goals are clear
- Key technical decisions are in Closed Decisions
- Current State phase is set to Execution

---

## Stage 2 — PRD and Specs

Define what you are building and why. This is the upstream input for DDA.

### What to do

1. Use closed decisions from `02-exploration.md` as input
2. Ask AI to draft a PRD from your decisions:

   Based on the closed decisions in my Exploration file [attach],
   draft a PRD. Include goals, user outcomes, feature definitions,
   and acceptance criteria. Flag anything underspecified.

3. Review and approve the PRD
4. Store it in `docs/` (e.g. `docs/prd.md`)
5. Log completion in `04-progress.md`

### Done when
- PRD is approved and saved to `docs/`
- Acceptance Criteria are clear and verifiable

---

## Stage 3 — DDA (Playbook Scaffold)

Define every component before any code is written.

### What to do

1. Load Playbook context (use prompt: **Playbook — Start Dev Session**)
2. Bootstrap the scaffold from your PRD (use prompt: **Playbook — Bootstrap Scaffold from PRD**)
3. Review all generated stubs — does the structure make sense?
4. Author each doc top-down: project _index.md → module _index.md → orchestrators → components
5. Review all orchestrator Flow sections — do the sequences make sense?
6. Activate docs one by one: change `status: draft` to `status: active` as each is approved
7. Confirm the living folder tree in every `_index.md` is accurate

### Authoring order
```
1. .playbook/_index.md            — project manifest
2. .playbook/[module]/_index.md   — module manifest
3. Orchestrators                  — sequence and flow
4. Components                     — logic units
5. _concerns/                     — cross-cutting capabilities
6. _integrations/                 — external contracts
```

### Done when
- All docs are `status: active`
- All Flow sections in orchestrators are approved
- Living folder trees are accurate
- No TODO flags remain in any doc

---

## Stage 4 — Code

Generate and write code against Playbook contracts.

### What to do

1. Start every dev session with the Playbook boot prompt
2. Load only the docs needed for the current task (scoped context)
3. Work ticket by ticket if using Kanban (`kit/05-kanban.md`)
4. After each component: run Playbook sync check
5. Before every PR: run Phase Completion Checklist from `kit/01-process.md`
6. Keep Playbook docs updated as code evolves — never let them drift

### Rules
- Nothing gets coded without a Playbook doc
- No new dependency without a doc in `_integrations/` or `_shared/`
- All code passes `biome check` and `biome format` before commit
- Commits are grouped logically by scope

### Done when
- All Acceptance Criteria from `03-execution.md` are met
- All QA test cases pass (if `06-qa.md` is active)
- Phase Completion Checklist passes fully

---

## Stage 5 — Rollout

Generate a snapshot for the completed milestone.

### What to do

1. Use prompt: **Playbook — Generate Rollout Doc**
2. Attach all `.playbook/` docs + `kit/04-progress.md`
3. Review the generated `docs/rollout/[milestone].md`
4. Use it as context for the next session or new team member
5. Never edit rollout docs directly — edit the source Playbook doc and regenerate

### Done when
- Rollout doc is generated and saved to `docs/rollout/`
- Kit files are updated with final state
- All changes are pushed to the repo

---

## Quick Reference

```
Stage 1   Context Kit     kit/ files + AI session
Stage 2   PRD / Specs     docs/prd.md
Stage 3   DDA             .playbook/ scaffold + docs
Stage 4   Code            src/ — built against .playbook/ contracts
Stage 5   Rollout         docs/rollout/[milestone].md
```
