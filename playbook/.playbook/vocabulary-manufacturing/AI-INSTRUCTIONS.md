# AI Instructions — Manufacturing
# File: .playbook/vocabulary-manufacturing/AI-INSTRUCTIONS.md

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

This is a manufacturing project. Use the terminology defined in:

- `.playbook/vocabulary-manufacturing/README.md` — domain language
- `.playbook/vocabulary-manufacturing/templates.md` — planning doc shapes

Apply this vocabulary consistently across all planning docs and session output.
Never use terminology from another domain.

---

## Manufacturing-Specific Rules

- Every component, process, and supply chain dependency is defined in a planning
  doc before any production begins
- AI plans against the planning doc — not ahead of it
- No component is marked `status: active` with unresolved TODOs
- Flag ambiguity before writing any plan or planning doc
- Do not add scope beyond what is defined in the current planning doc
- Materials, tolerances, and constraints are defined in planning docs — not assumed
- Supply chain and dependency decisions are made in planning docs — not during execution
