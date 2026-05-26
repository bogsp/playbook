# @bogsp/playbook-library
# File: packages/playbook-library/README.md

A curated collection of reusable concerns, integrations, and solutions
for the Playbook pipeline. Language-agnostic. Precise enough to implement
without interpretation.

---

## What This Is

Every project solves the same problems. Logging. Error handling. Auth.
File uploads. Payments. Search. Once solved well, these should never
need to be solved again.

This library is that collection. Each document is a solved problem —
precise behavior definitions that translate directly into any language
or framework without ambiguity.

---

## Structure

```
_concerns/       Cross-cutting capabilities that apply across modules
_integrations/   External service and library contracts
_solutions/      Patterns that span multiple components
```

---

## Using the Library

### In a Playbook project

Install the library:

```
pnpm add @bogsp/playbook-library
```

Copy the docs you need into your project:

```
cp node_modules/@bogsp/playbook-library/_concerns/logging.md .playbook/_concerns/
cp node_modules/@bogsp/playbook-library/_integrations/xendit.md .playbook/_integrations/
```

Review and adapt each doc to your project's specific context.
The library doc is the starting point -- your project doc is the source of truth.

---

## Document Standard

Every library doc must meet a higher bar than a project doc:

- **Behavior stated as rules** -- "must" and "never", not "should" and "typically"
- **Failure modes explicit** -- not just the happy path
- **Constraints stated as constraints** -- not buried in prose
- **Edge cases called out** -- not left for the implementer to discover
- **No code** -- language-agnostic throughout
- **No framework assumptions** -- any stack can implement it

If a doc leaves room for interpretation, it does not belong here.

---

## Contributing a Solution

When a project solves a problem well:

1. Extract the concern, integration, or solution from the project doc
2. Generalize it -- remove project-specific details
3. Raise the standard -- make it precise enough for any team, any stack
4. Add it to the appropriate folder
5. Bump the version in `package.json`
6. Document the change in `CHANGELOG.md`

---

## Versioning

Semantic versioning:

```
Patch (1.0.0 -> 1.0.1)   Doc improved, clarified, or corrected
Minor (1.0.0 -> 1.1.0)   New concern, integration, or solution added
Major (1.0.0 -> 2.0.0)   Breaking change to an existing doc's contract
```

Projects pin to a version and upgrade deliberately.
