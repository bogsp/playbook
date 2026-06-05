# Maintenance
# File: .playbook/maintenance.md

Playbook is a pipeline — present during production, optional after.
This file covers how to keep it healthy during a project
and how to clean it up when the work is done.

---

## At the Start of Every Project

Before any work begins:

**1. Choose your vocabulary**
Open `vocabulary-[domain]/README.md` for your domain.
Delete all other `vocabulary-*/` folders.
One vocabulary per project. No exceptions.

**2. Set up kit files**
Copy blank templates from `templates/` into `kit/` if starting fresh.
If resuming an existing project, upload current kit files to your AI session.

**3. Clear unused templates**
Delete any template files that do not apply to your domain.
Keep only what you will use.

**4. Update `_index.md`**
Fill in the project manifest before any definitions are written.
A manifest with placeholder values is not a manifest.

**5. Confirm THE-STANDARD**
Read `THE-STANDARD.md` once before the first session.
Not as a formality — as orientation.

---

## During Every Session

**At the start:**
- Load kit files in two messages (see `kit/00-prompts.md`)
- Confirm current state before any work begins
- Load only the definitions needed for this session

**During work:**
- Log decisions as they are made — do not defer to the end
- Flag known issues immediately in `kit/03-execution.md`
- Never let definitions drift from execution

**At the end — non-negotiable:**
- Update `kit/01-process.md` — current state, last completed, next
- Append to `kit/04-progress.md` — completed, decided, fixed, in progress
- Update any definitions touched this session
- Update living folder tree in `_index.md` if units changed

Two minutes of filing prevents twenty minutes of re-explanation.

---

## Keeping Files Lean

Files grow over time. That is normal. The rule is simple:

**Active files are current and actionable.**
**Archives own the history.**

| File | Archive when |
|---|---|
| `kit/02-exploration.md` | Closed decision no longer gates any active task or definition |
| `kit/04-progress.md` | Entries older than the current phase |
| `kit/05-kanban.md` | Done tickets no longer referenced by any active test or issue |

Every archived file gets a header:

```
# Archive: [type]
Date Range: YYYY-MM-DD to YYYY-MM-DD
Phase: [phase name]
Archived: YYYY-MM-DD
Reason: [why it was archived]
```

Move archived files to `kit/_archives/` — never delete.

---

## Context Rot

AI performance degrades in long sessions or when context is overloaded.

Signs of context rot:
- Ignoring current state in `kit/01-process.md`
- Suggesting decisions already in closed decisions
- Breaking formatting or ignoring instructions
- Favoring assumptions over uploaded files

**Recovery:**

```
Stop. Your only source of truth is the files uploaded at session start.
Ignore all prior conversation context.
Re-read AI-INSTRUCTIONS.md and vocabulary AI-INSTRUCTIONS.md before continuing.
```

If rot persists — start a fresh session with a Ship doc as context.

**Prevention:**
- Keep kit files under 300 lines where possible
- Archive regularly
- Start a new session at major milestones

---

## Syncing Definitions to Execution

Definitions must always reflect the current state of execution.
Drift between definitions and execution is a critical maintenance failure.

Run a sync check:
- Before every delivery or milestone
- After any significant change in execution
- When resuming after a long gap

Sync check process:

```
For each definition touched this session:
  Does the execution match what the definition says?
  If no — update the definition before any other work continues
  Log the update in kit/04-progress.md
```

A definition that does not reflect reality is worse than no definition.
It creates false confidence.

---

## At the End of a Milestone

Before marking a milestone complete:

- [ ] All definitions are active — no draft status remaining
- [ ] All paths are handled in every flow
- [ ] All contracts are complete — no TODO sections remaining
- [ ] Kit files reflect current state
- [ ] Living folder tree in `_index.md` is accurate
- [ ] Ship doc generated in `docs/rollout/`
- [ ] All work pushed to version control

The Ship doc is the milestone record. Generate it — do not skip it.
It is the context for the next session, the next team member,
and the next phase of the project.

---

## Removing Playbook

When a project is complete and the pipeline is no longer needed,
Playbook can be cleanly removed.

**What to keep:**
```
docs/           — project knowledge belongs to the project
src/ or equiv   — the work itself
```

**What to remove:**
```
.playbook/      — the entire folder
```

That is it. One folder. Clean boundary.

**Before removing:**
- Generate a final Ship doc in `docs/rollout/`
- Ensure all flows and contracts are complete in `docs/`
- Ensure all decisions are logged in a final progress entry
- Confirm the project can stand without the pipeline files

**Recommended:** keep `.playbook/` even after the project ships.
The definitions, decisions, and history it contains have ongoing value
for maintenance, onboarding, and future changes.
Removal is available — not recommended.

---

## The Playbook Repo Itself

If you are working on the Playbook pipeline itself as a project:

- The Playbook repo uses its own pipeline
- Kit files, definitions, flows, and contracts apply to Playbook's own development
- THE-STANDARD governs the development of THE-STANDARD
- Changes to any pipeline document follow the same process as any other project

Version all changes. Date all changes. State intent explicitly.
The living document clause in THE-STANDARD applies here first.
