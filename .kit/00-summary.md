# Context Kit — System Summary

## What It Is
A file-based context system for AI-assisted projects. Instead of rebuilding context when a session ends, you maintain a set of structured files that tell the AI exactly where the project stands. Upload them at the start of any session and pick up where you left off.

---

## The Files

### Core (always present)
| File | Job |
|------|-----|
| `01-process.md` | Workflow rules + Current State (phase, last completed, next, active modules) |
| `02-exploration.md` | Open questions + closed decisions with dates and reasoning |
| `03-execution.md` | Guidelines, plan, and task list |
| `04-progress.md` | Append-only log of completions and decisions |

### Optional Modules (activated in `01-process.md`)
| File | Job | When to use |
|------|-----|-------------|
| `05-kanban.md` | Ticketed work breakdown with status + blocking relationships | Complex execution with discrete deliverables |
| `06-qa.md` | Test cases, failures log, and sign-off | Any deliverable needing verification |

---

## How the Files Relate
```
03-execution.md          →  Acceptance Criteria seed  →  05-kanban.md
05-kanban.md (K-IDs)     →  Test case mapping         →  06-qa.md
05-kanban.md (Done)      →  Log completions           →  04-progress.md
06-qa.md (Failures)      →  New or updated tickets    →  05-kanban.md
```

---

## Session Patterns

### A) Starting a New Project
1. Upload `01-process.md` + `03-execution.md` in message 1
2. Upload `02-exploration.md` + `04-progress.md` in message 2
3. Describe the project in 1–2 sentences
4. Ask the AI to populate the files based on your description
5. Review, adjust, save

**Prompt:**
> I'm starting a new project: [1-2 sentence description]. Help me populate these Context Kit files — draft Exploration questions, suggest Execution guidelines and goals, and define my Current State.

---

### B) Resuming a Project
1. Upload `01-process.md` + `03-execution.md` in message 1
2. Upload `02-exploration.md` + `04-progress.md` in message 2
3. Add active modules if applicable (`05-kanban.md`, `06-qa.md`)
4. Use the boot prompt below

**Prompt:**
> I'm resuming a project. I've uploaded the Context Kit files. Read them and confirm: current phase, last completed, and what we're doing next. Then wait for my instruction.

---

## Rules the AI Follows
- Focus only on the active phase in `01-process.md`
- Do not revisit closed decisions in `02-exploration.md` unless explicitly asked
- Follow naming standards and guidelines defined in `03-execution.md`
- Append to `04-progress.md` — never edit or delete entries
- At 80%+ session length, offer to update all files for easy copy-paste handoff

---

## Workflow Stages
1. **Exploration** — Exploring ideas, open questions, options
2. **Execution** — Guidelines locked, plan defined, doing the work
3. **Progress** — Tracking what's done

---

## Key Conventions
- `Active Modules:` in `01-process.md` declares which optional files are in use
- Kanban tickets use `K-01`, `K-02` etc. prefix; QA tests use `QA-01` etc.
- Acceptance Criteria in `03-execution.md` seed both `05-kanban.md` and `06-qa.md`
- Progress log is append-only; **In Progress** is always the last entry, overwritten each session
