# Starting a New Project
# File: .playbook/guides/new-project.md

> Follow the stages in order. Do not skip ahead.
> "The work begins before the work begins."

---

## Before You Start

**Choose your vocabulary.**

Copy the vocabulary folder that matches your project type into `.playbook/`:

| Project type | Copy this folder |
|---|---|
| Software development | `vocabulary-software/` |
| Writing or editorial | `vocabulary-writing/` |
| Production or operations | `vocabulary-production/` |
| Manufacturing | `vocabulary-manufacturing/` |

The vocabulary folder contains:
- `README.md` — how the pipeline maps to your domain
- `AI-INSTRUCTIONS.md` — domain-specific AI rules
- `templates/` — planning document templates shaped for your domain

**If your project spans more than one domain:**

Some projects do not fit neatly into one vocabulary — a documentary film is both writing and production; a branded product launch is both manufacturing and production. In that case:

1. Choose the vocabulary that covers the majority of your work as your primary
2. Copy its folder as normal
3. Borrow individual templates from the secondary vocabulary folder as needed — drop them into your primary `templates/` folder
4. Note the mixed domain in your `_index.md` Detail section so collaborators and AI know what to expect

You do not need a perfect fit. Choose the vocabulary that reduces the most translation work and adapt from there.

---

## What Your Project Folder Will Look Like

Before you write a single planning document, here is the shape you are building toward:

```
.playbook/
  _index.md                  ← project map — start here each session
  AI-INSTRUCTIONS.md         ← universal AI rules
  vocabulary-[domain]/
    AI-INSTRUCTIONS.md       ← domain rules
  [your planning docs]       ← added as you work through the stages
docs/
  [brief or PRD].md          ← discovery document
  flows/
    _index.md
    global.md
    flow-N-[name].md         ← one per major path
  contracts/
    _index.md
    global.md
    flow-N-[name].md         ← one per path
  rollout/                   ← milestone snapshots, generated later
.kit/
  00-prompts.md
  01-process.md
  02-exploration.md
  03-execution.md
  04-progress.md
```

You do not build this all at once. Each stage below adds one layer.

---

## Stage 1 — Thinking

Get your thinking straight before touching anything else.

1. Copy the kit templates from `.playbook/templates/` into `.kit/`
2. Upload `.kit/01-process.md` + `.kit/03-execution.md` to a new AI session
3. Describe your project in 1–2 sentences and ask AI to populate the files
4. Upload `.kit/02-exploration.md` + `.kit/04-progress.md`
5. Work through open questions until key decisions are settled

**Done when:** project goals are clear, key decisions are settled, and you are ready to define what to make.

Use prompt: **Starting a New Project** from `.kit/00-prompts.md`

---

## Stage 2 — Discovery

Define what you are making, why, and for whom.

1. Use settled decisions from `.kit/02-exploration.md` as input
2. Ask AI to draft a discovery document from your decisions
3. Review and approve it
4. Save it to `docs/[name].md`
5. Log completion in `.kit/04-progress.md`

**Done when:** the discovery document is approved, goals and acceptance criteria are clear and verifiable.

---

## Stage 3 — Mapping

Walk through every major path before defining any piece.

1. Create `docs/flows/_index.md` — the entry point for all path documents
2. Write `docs/contracts/global.md` first — rules that apply everywhere
3. Write one path file per major flow: `docs/flows/flow-N-[name].md`
4. Write one companion rules file per path: `docs/contracts/flow-N-[name].md`
5. Walk each path including what happens when things go wrong
6. Lock paths and rules before writing any planning documents

**Done when:** every major path has a document and a companion rules file, all reviewed and agreed on.

Use template: `templates/flow.md` and `templates/contract.md`

---

## Stage 4 — Rules

Done alongside mapping — but worth confirming before moving on.

Make sure every rules file covers:
- The good path
- Every way it can fail
- Edge cases
- Ordering requirements
- Hard constraints

And that `global.md` covers:
- How the project is structured overall
- Who or what has authority over what
- How failures are handled
- What must always be recorded
- Rules that apply everywhere

Use template: `templates/global-contract.md`

---

## Stage 5 — Planning

Define every piece before any work begins on it.

1. Create `.playbook/_index.md` — the project map (use `templates/` in `.playbook/` as your starting point)
2. Use AI to draft planning documents from your paths and rules
3. Review all generated documents — does the structure make sense?
4. Work top-down: project map → coordinators → components → concerns → integrations
5. Change each document from `status: draft` to `status: active` as it is approved

**Done when:** all planning documents are active, the project map is accurate, no TODO sections remain.

Use templates from: `vocabulary-[domain]/templates/`

---

## Stage 6 — Work

Do the work against the planning documents.

1. Start every session with the AI prompts from `.kit/00-prompts.md`
2. Load only the planning documents needed for the current task
3. Use the work tracker if the project has many discrete pieces (`.kit/05-kanban.md`)
4. After each piece: run a sync check — does the planning document still match?
5. Before every milestone: run the completion checklist from `pipeline.md`

**Done when:** all acceptance criteria are met and all checks pass.

---

## Stage 7 — Handoff

Generate a snapshot for the completed milestone.

1. Use the milestone summary prompt from `.kit/00-prompts.md`
2. Attach all `.playbook/` documents + `.kit/04-progress.md`
3. Review `docs/rollout/[milestone].md`
4. Update kit files with final state

**Done when:** milestone summary is generated, kit files reflect the current state.

---

## Quick Reference

```
Stage 1   Thinking     .kit/ files
Stage 2   Discovery    docs/[brief].md
Stage 3   Mapping      docs/flows/
Stage 4   Rules        docs/contracts/
Stage 5   Planning     .playbook/
Stage 6   Work         your output
Stage 7   Handoff      docs/rollout/[milestone].md
```
