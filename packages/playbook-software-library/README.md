# @bogsp/playbook-software-library
# File: packages/playbook-software-library/README.md

A curated collection of reusable concerns, integrations, and solutions
for software development projects using the Playbook pipeline.
Language-agnostic within the software domain. Precise enough to implement
without interpretation.

> This library covers software development projects. Writing, production,
> and manufacturing domain libraries will follow as those patterns mature.

---

## What This Is

Every software project solves the same problems. Logging. Error handling. Auth.
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

## Current Library

### Concerns

| Doc | Version | What It Covers |
|---|---|---|
| `auth` | 1.0.0 | Authentication and authorization boundaries |
| `error-handling` | 1.0.0 | Result pattern and typed error behavior |
| `logging` | 1.0.0 | Structured logs and trace propagation |

### Integrations

| Doc | Version | What It Covers |
|---|---|---|
| `cloudflare-r2` | 1.0.0 | Private object storage and signed URL support |
| `convex` | 1.0.0 | Reactive state and schema boundary |
| `docker-compose` | 1.0.0 | Service topology and health-gated boot |
| `llama-cpp` | 1.0.0 | Local model runtime process boundary |
| `postgres` | 1.0.0 | Durable relational storage |
| `tanstack-router` | 1.0.0 | Type-safe React routing |
| `trpc` | 1.0.0 | Type-safe TypeScript API boundary |
| `vite` | 1.0.0 | Frontend dev server and bundler |
| `workos` | 1.0.0 | Authentication provider boundary |

### Solutions

| Doc | Version | What It Covers |
|---|---|---|
| `clean-architecture-planning-layout` | 1.1.0 | Planning doc layer folder layout and validation rules |
| `convex-reactive-state` | 1.0.0 | Live state split between Convex and durable storage |
| `docker-compose-boot-groups` | 1.0.0 | Health-gated service startup pattern |
| `local-model-runtime` | 1.0.0 | Safe local model process orchestration |
| `missing-script-drift-check` | 1.0.0 | Package script reference validation |
| `platform-planning-coverage` | 1.1.0 | Repo-level planning docs for config, Docker, schemas, and scripts |
| `signed-url-delivery` | 1.0.0 | Private file delivery through signed URLs |

---

## Using the Library

Install the library:

```bash
pnpm add @bogsp/playbook-software-library
```

Copy the docs you need into your project:

```bash
cp node_modules/@bogsp/playbook-software-library/_concerns/logging.md .playbook/_concerns/
cp node_modules/@bogsp/playbook-software-library/_integrations/cloudflare-r2.md .playbook/_integrations/
```

Review and adapt each doc to your project's specific context.
The library doc is the starting point — your project doc is the source of truth.

**When copying a doc into your project:**
- Populate the `used-by` field with every component that depends on it
- A doc with `used-by: []` is incomplete — components that depend on it cannot be traced

---

## Staying Up to Date

Check your installed version against the latest:

```bash
pnpm outdated @bogsp/playbook-software-library
```

Review the CHANGELOG to see which docs changed, then update selectively.
No doc in your project should be updated without a human reviewing the diff.

---

## Document Standard

Every library doc must meet a higher bar than a project doc:

- **Behavior stated as rules** — "must" and "never", not "should" and "typically"
- **Failure modes explicit** — not just the happy path
- **Constraints stated as constraints** — not buried in prose
- **Edge cases called out** — not left for the implementer to discover
- **No code** — language-agnostic throughout
- **No framework assumptions** — any stack can implement it

If a doc leaves room for interpretation, it does not belong here.

---

## Contributing

When a project solves a problem well:

1. Extract the concern, integration, or solution from the project doc
2. Generalize it — remove project-specific details
3. Raise the standard — make it precise enough for any team, any stack
4. Add it to the appropriate folder
5. Bump the version in `package.json`
6. Document the change in `CHANGELOG.md`

See `CONTRIBUTING.md` for the full submission standard and doc template.

---

## Versioning

Semantic versioning:

```
Patch (1.0.0 → 1.0.1)   Doc improved, clarified, or corrected
Minor (1.0.0 → 1.1.0)   New concern, integration, or solution added
Major (1.0.0 → 2.0.0)   Breaking change to an existing doc's contract
```

The package version governs updates. The `Version:` field inside each doc
is a human reference showing when that specific doc last changed.

Projects pin to a version and upgrade deliberately.
