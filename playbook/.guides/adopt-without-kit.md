# Adopting Playbook — Existing Project without Context Kit

Use this guide when your project has no Context Kit files.
Context Kit files will be generated from what is found in the project.
Existing code stays intact throughout.

---

## Before You Start

Gather what you have:
- Any existing docs (README, PRD, specs, architecture notes)
- Key source files or a folder structure overview
- A description of the tech stack and any known third-party integrations

The more context you can provide, the more accurate the audit.

---

## Step 1 — Load Playbook Context

Upload `.playbook/00-playbook.md` + `docs/code-standards.md`

Use prompt: **Adopt Existing Project — Without Context Kit, Message 1**

AI confirms it has read the Playbook rules. No work begins yet.

---

## Step 2 — Run the Structured Audit

Upload any available docs and source files.

Use prompt: **Adopt Existing Project — Without Context Kit, Message 2**

AI produces a Gap Report:
- **Missing** — components with no Playbook doc
- **Drifting** — things that exist but don't match Playbook conventions
- **Compliant** — things that already follow Playbook

Also note what AI identifies about the current architecture — it may surface
things that were never formally defined.

Review carefully before approving.

---

## Step 3 — Full Scaffold

Use prompt: **Adopt Existing Project — Without Context Kit, Message 3**

AI generates:
- `.playbook/_index.md` with living folder tree
- Module `_index.md` files
- Stub Playbook docs for all unmapped components (`status: draft`)
- Concern and integration docs
- All six Context Kit files, populated from what was found:
  - `01-process.md` — Phase: Execution; focus: Playbook adoption
  - `02-exploration.md` — architectural decisions already in the codebase
  - `03-execution.md` — goals: full adoption; tasks: gap report items
  - `04-progress.md` — audit and scaffold logged as Completed
  - `05-kanban.md` — seeded from gap report items
  - `06-qa.md` — seeded from Acceptance Criteria

No existing code is touched. Review and save all files before proceeding.

---

## Step 4 — Incremental Adoption

Use prompt: **Adopt Existing Project — Without Context Kit, Message 4**

Work through the Gap Report in priority order:

1. Author or update each Playbook doc to `status: active`
2. Identify code changes needed to comply — flag but do not make yet
3. Once doc is approved, make corresponding code changes
4. Run Phase Completion Checklist after each item
5. Log each completion in `04-progress.md`

### Adoption priority order

```
1. _concerns/        — cross-cutting capabilities (lowest risk, high value)
2. _integrations/    — external contracts (define boundaries early)
3. _shared/          — cross-module components (reduce duplication)
4. Orchestrators     — define flows before touching component code
5. Components        — align one by one; test after each
```

---

## Step 5 — Verify and Close

When all Gap Report items are resolved:

1. Run full Phase Completion Checklist
2. Generate a rollout doc for the adoption milestone
3. Push all changes

The project is now on the Playbook pipeline.

---

## Notes

- The generated kit files are a starting point — review and adjust before using
- AI may not find everything in a partial context upload — fill gaps manually as they surface
- Adoption is additive — nothing breaks; the pipeline grows around the existing project
- If a structural change is risky, flag it and defer — compliance is incremental, not instant
