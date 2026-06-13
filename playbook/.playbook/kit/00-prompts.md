# Prompts
# File: .playbook/kit/00-prompts.md

Session prompts for the Playbook pipeline.
Copy the relevant prompt at the start of each session.

---

## Starting an AI Work Session

```
New session. Load these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. docs/code-standards.md
4. .playbook/_index.md
5. .playbook/kit/01-process.md
6. .playbook/kit/04-progress.md
7. .playbook/kit/05-kanban.md (only if kanban is active)

Then load the module and component docs relevant to today's task.

Rules for this session:
- Every generated file must include its filename and full path at the top
- Update .playbook/kit/01-process.md and .playbook/kit/04-progress.md before the session ends
  or when context reaches 80% — do not wait to be asked
- Flag any ambiguity before writing any code or planning doc
- Do not add anything outside the current task scope
```

---

## Picking Up from a Milestone Summary

```
New session. Load these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. docs/code-standards.md
4. .playbook/_index.md
5. .playbook/kit/01-process.md
6. .playbook/kit/04-progress.md
7. .playbook/kit/05-kanban.md (only if kanban is active)

Then read the milestone summary at docs/rollout/[milestone].md.

Rules for this session:
- Every generated file must include its filename and full path at the top
- Update .playbook/kit/01-process.md and .playbook/kit/04-progress.md before the session ends
  or when context reaches 80% — do not wait to be asked
- Flag any ambiguity before writing any code or planning doc
- Do not add anything outside the current task scope
```

---

## Sync Mode — Updating Planning Docs

```
Sync mode. Load these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. .playbook/_index.md
4. .playbook/kit/01-process.md
5. .playbook/kit/04-progress.md

Compare every planning doc against the current implementation.
For each doc:
- If implementation matches the doc: confirm status: active
- If implementation diverges: list every difference, do not change the doc yet
- If a component exists in code but has no planning doc: flag it

Do not update any planning doc until I have reviewed the differences.
```

---

## Audit Expansion — Inventory

```
Audit mode. Load these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. .playbook/_index.md
4. .playbook/kit/01-process.md
5. .playbook/kit/04-progress.md
6. docs/rewrite/system-map.md

Follow .playbook/guides/audit.md.

Rules for this session:
- Every generated file must include its filename and full path at the top
- Update .playbook/kit/01-process.md and .playbook/kit/04-progress.md before the session ends
  or when context reaches 80% — do not wait to be asked
- Do not create planning docs yet — inventory and map first
```

---

## Audit Expansion — Move to Next Phase

```
Audit phase transition. Load these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. .playbook/_index.md
4. .playbook/kit/01-process.md
5. .playbook/kit/04-progress.md
6. docs/rewrite/system-map.md
7. docs/rewrite/decision-record.md
8. docs/rewrite/risk-register.md

Follow .playbook/guides/audit.md.

Rules for this session:
- Every generated file must include its filename and full path at the top
- Update .playbook/kit/01-process.md and .playbook/kit/04-progress.md before the session ends
  or when context reaches 80% — do not wait to be asked
```

---

## Anchoring — Context Reset

Use when context has drifted or the session has lost track of the current task.

```
Context reset. Reload these files in order:

1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. .playbook/_index.md
4. .playbook/kit/01-process.md
5. .playbook/kit/04-progress.md
6. .playbook/kit/05-kanban.md (only if kanban is active)

State the current phase, active goal, and the next task.
Do not continue any previous work until you have confirmed what we were doing.
```
