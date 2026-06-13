# AI Instructions — Production
# File: .playbook/vocabulary-production/AI-INSTRUCTIONS.md

Read this file at the start of every session alongside .playbook/AI-INSTRUCTIONS.md.

---

## Session Boot Order

At the start of each session, read the files in order:

- .playbook/README.md
- .playbook/AI-INSTRUCTIONS.md
- .playbook/_index.md
- .playbook/kit/01-process.md
- .playbook/kit/04-progress.md
- .playbook/kit/05-kanban.md (optional)

Then load the component and flow docs relevant to the current task.

---

## File Header Rule

Every generated file must include its filename and full location path at the top:

```
# DocumentName
# File: .playbook/[module]/document-name.md
```

No exceptions.

---

## Kit Update Rule

Always update `.playbook/kit/01-process.md` and `.playbook/kit/04-progress.md`
before the session ends or when context reaches 80%. Do not wait to be asked.

---

## Domain Vocabulary

This is a production project. Use the terminology defined in:

- `.playbook/vocabulary-production/README.md` — domain language
- `.playbook/vocabulary-production/templates.md` — planning doc shapes

Apply this vocabulary consistently across all planning docs and session output.
Never use terminology from another domain.

---

## Production-Specific Rules

- Every deliverable, workflow, and operational process is defined in a planning
  doc before any execution begins
- AI plans against the planning doc — not ahead of it
- No deliverable is marked `status: active` with unresolved TODOs
- Flag ambiguity before writing any plan or planning doc
- Do not add scope beyond what is defined in the current planning doc
- Roles, responsibilities, and handoffs are defined in planning docs — not assumed
- Timeline and dependency decisions are made in planning docs — not during execution
