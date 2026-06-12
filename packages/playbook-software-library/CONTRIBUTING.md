# Contributing to @bogsp/playbook-software-library
# File: packages/playbook-software-library/CONTRIBUTING.md

The library exists because software projects solve the same problems repeatedly.
A contribution is a solved problem — precise enough that any team, any stack,
can implement it without interpretation.

---

## The Bar

Every library doc must meet a higher standard than a project doc:

- **Behavior stated as rules** — "must" and "never", not "should" and "typically"
- **Failure modes explicit** — not just the happy path
- **Constraints stated as constraints** — not buried in prose
- **Edge cases called out** — not left for the implementer to discover
- **No code** — language-agnostic throughout
- **No framework assumptions** — any stack can implement it

If a doc leaves room for interpretation, it does not belong here.

---

## When to Contribute

A doc is ready to contribute when:

1. It has been used in at least one real project
2. It has been generalized — all project-specific details removed
3. It meets the standard above
4. You can explain what problem it solves in one sentence

Do not contribute docs that are still being validated in a project.
The library is a collection of solved problems, not experiments.

---

## Contribution Types

### New concern

A cross-cutting capability that applies across modules — something like auth,
logging, error handling, rate limiting, or caching.

File location: `_concerns/[id].md`

### New integration

A contract for an external service or library — what it provides, how to use it,
what can go wrong.

File location: `_integrations/[id].md`

### New solution

A pattern that spans multiple components or solves a structural problem —
something like a delivery pattern, a state management approach, or a
coverage strategy.

File location: `_solutions/[id].md`

### Update to an existing doc

An improvement, correction, or addition to a doc that is already in the library.
Treat this as a patch (clarification) or minor (new behavior) change depending
on what changed.

---

## Doc Template

Use the appropriate template from `packages/playbook/.playbook/templates.md`
as your starting point. For a concern:

```markdown
# [Title]
# File: packages/playbook-software-library/_concerns/[id].md
# Version: 1.0.0

---
id: [kebab-case — must match filename]
type: concern
status: active
affects: all
provided-by: internal
---

## What It Does
Plain language. One paragraph. Any reader understands this.

## Behaviour

**Rules:**
- [Rule — stated as must / never]

**What must always be true:**
- [Invariant]

**What must never happen:**
- [Prohibition]

## Constraints
- [Hard constraint — no exceptions]
```

The same principle applies to integration and solution docs — lead with plain
language, state behavior as rules, end with constraints.

---

## Versioning

When submitting, set the `Version:` field in the doc header:

- New doc → `1.0.0`
- Clarification or correction to existing doc → bump patch (e.g. `1.0.1`)
- New behavior added to existing doc → bump minor (e.g. `1.1.0`)
- Breaking change to existing doc's contract → bump major (e.g. `2.0.0`)

Also update `CHANGELOG.md` with a clear description of what changed and why.

---

## Submitting

1. Fork the repository
2. Create a branch: `library/[type]-[id]` (e.g. `library/concern-rate-limiting`)
3. Add or update the doc
4. Update `CHANGELOG.md`
5. Update the library table in `README.md`
6. Open a pull request with:
   - What problem this solves
   - Where it has been used
   - What you generalized or removed from the original project doc

---

## Review Criteria

A PR will be reviewed against:

- Does it meet the doc standard above?
- Is it genuinely reusable across different projects and stacks?
- Are failure modes covered?
- Are constraints explicit?
- Is the version bump correct?
- Is the CHANGELOG entry clear?

A doc that is too specific, too vague, or leaves room for interpretation will
be returned with feedback before merging.
