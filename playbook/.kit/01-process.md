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
- When a Playbook scaffold exists, always load `.playbook/00-playbook.md` and `docs/code-standards.md` before any development work
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

When something breaks or blocks progress — stop, do not accumulate changes on a broken state:

```
1. Identify   — what category? (type error, test fail, Playbook drift, layer violation, etc.)
2. Isolate    — is it in code, in a Playbook doc, or both?
3. Fix        — resolve at the source; do not patch symptoms
4. Verify     — re-run Phase Completion Checklist before continuing
5. Log        — add a Fixed entry to 04-progress.md if a decision was made
```

Context rot — if AI ignores kit files or Playbook docs mid-session:
```
Stop. Re-upload session files. Re-read .playbook/00-playbook.md and docs/code-standards.md.
If rot persists, start a fresh session with a rollout doc as context.
```

---

# CURRENT STATE

**Phase:** [Current workflow stage]
**Last Completed:** [Most recent milestone]
**Next:** [Active goal]
**Active Modules:** [05-kanban | 06-qa | none]
