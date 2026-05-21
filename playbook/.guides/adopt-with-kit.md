# Adopting Playbook — Existing Project with Context Kit

Use this guide when your project already has Context Kit files
(`01-process.md` through `06-qa.md`). The existing kit files are the
source of truth. Nothing gets overwritten.

---

## Before You Start

Gather what you have:
- All current kit files (`01-process.md` through `06-qa.md`)
- Any existing docs (README, PRD, specs, architecture notes)
- A general sense of the current folder structure and tech stack

---

## Step 1 — Load Playbook Context

Upload `.playbook/00-playbook.md` + `docs/code-standards.md`

Use prompt: **Adopt Existing Project — With Context Kit, Message 1**

AI confirms it has read the Playbook rules. No work begins yet.

---

## Step 2 — Run the Structured Audit

Upload all kit files + any available docs or source files.

Use prompt: **Adopt Existing Project — With Context Kit, Message 2**

AI produces a Gap Report:
- **Missing** — components with no Playbook doc
- **Drifting** — things that exist but don't match Playbook conventions
- **Compliant** — things that already follow Playbook

Review the Gap Report carefully before approving. Push back if anything is wrong.

---

## Step 3 — Scaffold Around Existing Code

Use prompt: **Adopt Existing Project — With Context Kit, Message 3**

AI generates:
- `.playbook/_index.md` with living folder tree
- Module `_index.md` files
- Stub Playbook docs for all unmapped components (`status: draft`)
- Concern and integration docs
- Updated kit files (Current State + Progress log)

No existing code is touched. Review everything before approving.

---

## Step 4 — Incremental Adoption

Use prompt: **Adopt Existing Project — With Context Kit, Message 4**

Work through the Gap Report in priority order:

1. Author or update each Playbook doc to `status: active`
2. Identify code changes needed to comply — flag but do not make yet
3. Once doc is approved, make the corresponding code changes
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
3. Update kit files with final state
4. Push all changes

The project is now on the Playbook pipeline.

---

## Notes

- Closed decisions in your existing `02-exploration.md` stay closed — do not reopen
- Progress log entries are never edited — new adoption entries are appended
- Code that already works stays intact — adoption is additive, not destructive
- If a structural change is needed and risky, flag it and defer — Playbook grows around the project first
