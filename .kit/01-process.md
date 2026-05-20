# PROCESS

## Workflow Stages
1. **Exploration** — Exploring ideas and possibilities
2. **Execution** — Defining guidelines, planning structure, doing the work
3. **Progress** — Tracking what is done

## Rules for AI
- Focus only on the active phase in Current State
- Do not revisit or change closed decisions unless explicitly asked
- Follow naming standards and guidelines defined in Execution
- Prioritize clear structure and reusable outcomes
- Always load `.playbook/00-playbook.md` and `docs/code-standards.md` before any development work
- **When approaching session limit (80%+), proactively offer to update all kit files using markdown code blocks for easy copy-paste**

---

## Phase Completion Checklist

Run at the end of every phase before moving on. No phase is complete until all steps pass.

### Development Phase
- [ ] `biome check` — zero errors
- [ ] `biome format --write` — zero diffs remaining
- [ ] `vitest run` — all tests pass, coverage gates met
- [ ] Playbook sync — all touched `.playbook/` docs reflect current code
- [ ] Folder trees updated — all `_index.md` Structure sections are current
- [ ] Git commits — grouped logically by scope, all changes pushed
- [ ] Kit files updated — `01-process.md`, `03-execution.md`, `04-progress.md`
- [ ] Rollout doc generated — if a milestone was completed

### Any Phase
- [ ] Decisions logged in `02-exploration.md` (Closed Decisions)
- [ ] Progress logged in `04-progress.md`
- [ ] Current State updated in this file
- [ ] Active modules declared below if in use

---

## Error Mitigation

When something breaks or blocks progress — stop, do not accumulate changes on a broken state.

Identify what category the failure is: type error, test failure, Playbook drift, layer violation, or other.
Isolate whether it is in code, in a Playbook doc, or both.
Fix at the source — do not patch symptoms.
Verify by re-running the Phase Completion Checklist before continuing.
Log a Fixed entry in 04-progress.md if a decision was made to resolve it.

Context rot — if AI ignores kit files or Playbook docs mid-session:
Re-upload session files. Re-read `.playbook/00-playbook.md` and `docs/code-standards.md`.
If rot persists, start a fresh session with a rollout doc as context.

---

# CURRENT STATE

**Phase:** Execution
**Last Completed:** Generated complete Playbook template zip with all files
**Next:** Update `create-dda` CLI to `create-playbook`; update `playbook-guide.md`
**Active Modules:** none
