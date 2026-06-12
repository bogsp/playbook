# Adopting Playbook
# File: .playbook/guides/adopt.md

This guide covers all adoption paths. Answer four questions to find your
starting point. No assumptions, no rigid categories — just honest routing.

---

## Where to Start

Answer these questions in order. Each answer points to your next step.

---

**Question 1 — Does the project have `.playbook/kit/` files?**

```
Yes -> skip to Question 2
No  -> generate kit files first
      Upload AI-INSTRUCTIONS.md + docs/code-standards.md (if it exists)
      Use prompt: Bringing an Existing Project In (from kit/00-prompts.md)
      Then continue to Question 2
```

---

**Question 2 — Is the project organised enough to map without an audit?**

Ask yourself: can you describe what every major part does and how they
connect, without digging through the work itself?

```
Yes -> skip to Question 3
No  -> run the Audit expansion first
      Add to kit/01-process.md:
        Active Expansions:
          audit: inventory
      Read .playbook/guides/audit.md
      Complete all audit phases before continuing
      Then return to Question 3
```

---

**Question 3 — Is there existing documentation, notes, or specs?**

```
Yes -> attach them to your review prompt as additional context
No  -> review from the source material only; AI will surface what it finds
```

---

**Question 4 — Is this a partial update or a full rewrite?**

```
Partial update  -> strangler fig approach
                   Adopt incrementally, keep the project running
                   Priority: _concerns/ -> _integrations/ -> _shared/ -> coordinators -> components

Full rewrite    -> greenfield with the Audit expansion
                   Audit must be complete before any new work begins
                   New structure defined in Planning before old work is touched
```

---

## Running the Review

Once you've answered the four questions, run the structured review.

Upload all available context — kit files, docs, source material — then send:

```
Run a structured review against the Playbook pipeline.

1. Inventory
   - Map all modules, services, pieces, dependencies, tools in use
   - Note all third-party integrations
   - Identify entry points and how things connect

2. Review
   - What exists in .playbook/ already?
   - Do docs/flows/ and docs/contracts/ exist? Are they complete?
   - Which pieces have no planning document?
   - Are there boundary issues or undeclared dependencies?
   - Are there undocumented concerns or integrations?
   - What drifts from Playbook conventions?

3. Gap Report
   - Missing: what doesn't exist yet
   - Drifting: what exists but doesn't match Playbook
   - Compliant: what already follows Playbook

Wait for review before proceeding.
```

---

## Scaffolding

After reviewing and approving the gap report:

```
Proceed with scaffold:

1. Scaffold paths and rules if missing
   - Create docs/flows/_index.md and docs/contracts/_index.md
   - Draft stub path documents from the existing project
   - Draft docs/contracts/global.md

2. Scaffold .playbook/ around existing work
   - Create _index.md with a living folder tree
   - Create stub documents (status: draft) for all unmapped pieces
   - Do not modify any existing work

3. Reconcile -- for each stub, note:
   - What the work currently does vs what the document says
   - Any naming that needs to align with conventions
   - Any structural changes recommended (not required yet)

4. Update kit files -- Current State and Progress log

Generate all files as markdown code blocks for review.
```

---

## Incremental Adoption

After scaffolding is reviewed and approved:

```
Begin incremental adoption.

Work through the gap report in priority order:
1. _concerns/      -- cross-cutting capabilities first
2. _integrations/  -- external contracts next
3. _shared/        -- cross-module pieces
4. Coordinators    -- paths before piece-level work
5. Components      -- one at a time, check after each

For each item:
1. Author or update the planning document to status: active
2. Identify changes needed -- flag but don't make yet
3. Once the document is approved, make corresponding changes
4. Run the Phase Completion Checklist after each item
5. Log completion in kit/04-progress.md
```

---

## Adoption Rules

- Nothing is deleted -- adoption is additive only
- Existing work stays intact until its planning document is active
- Settled decisions in existing kit files stay settled
- Progress log entries are never edited -- new entries only
- Flag risky structural changes -- defer them; compliance is incremental
- Full rewrite: no new work until the Audit handoff is complete

---

## Related

- Audit expansion: [audit.md](audit.md)
- New project: [new-project.md](new-project.md)
- Session prompts: [../kit/00-prompts.md](../kit/00-prompts.md)
