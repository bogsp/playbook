# AI Instructions — Software
# File: .playbook/vocabulary-software/AI-INSTRUCTIONS.md

Read this file at the start of every session alongside .playbook/AI-INSTRUCTIONS.md.

---

## Session Boot Order

At the start of each session, read the files in order:

- .playbook/README.md
- .playbook/AI-INSTRUCTIONS.md
- docs/code-standards.md
- .playbook/_index.md
- .playbook/kit/01-process.md
- .playbook/kit/04-progress.md
- .playbook/kit/05-kanban.md (optional)

Then load the module and component docs relevant to the current task.

---

## File Header Rule

Every generated file must include its filename and full location path at the top:

```
# ComponentName
# File: .playbook/[module]/component-name.md
```

No exceptions.

---

## Kit Update Rule

Always update `.playbook/kit/01-process.md` and `.playbook/kit/04-progress.md` before the session
ends or when context reaches 80%. Do not wait to be asked.

---

## Domain Vocabulary

This is a software project. Use the terminology defined in:

- `.playbook/vocabulary-software/README.md` — domain language
- `.playbook/vocabulary-software/templates.md` — planning doc shapes

Apply this vocabulary consistently across all planning docs, flow docs,
contracts, and session output. Never use terminology from another domain.

---

## Software-Specific Rules

- Every component is defined in a planning doc before any code is written
- AI generates code against planning docs — not ahead of them
- No component is marked `status: active` with unresolved TODOs
- No code path is left unhandled — all branches must be explicit
- Flag ambiguity before writing any code or planning doc
- Do not add anything outside the current task scope
- Do not rename, move, or restructure anything outside the current task
- Do not introduce a dependency not declared in the component's planning doc

---

## Anti-Patterns

Never do any of the following:

- Cross-layer imports
- Direct module-to-module imports — use declared interfaces
- Business logic in the interface layer
- `any` type anywhere in the codebase
- Raw `throw` in Domain or Application layer
- Stub or partial implementations
- Silently resolving ambiguity
- Generating code ahead of a planning doc
