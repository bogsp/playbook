# Dependency Registry
# File: packages/playbook-software-library/_solutions/dependency-registry.md
# Version: 1.0.0

---
id: dependency-registry
type: solution
status: active
affects: all
provided-by: internal
---

## What It Does

A registry and vetting process for all external dependencies across projects
under the Playbook pipeline. Any package, library, SDK, or external service
not approved in the registry must not be used. AI treats an absent entry as
a hard blocker and escalates immediately.

The registry does not replace human judgment — it records it and enforces it.

---

## Behaviour

**Rules:**

- No external dependency may be introduced without a completed registry entry
- Registry entries require human approval — AI must never self-approve
- Every entry must record why the dependency was necessary, not just what it is
- Entries are never removed — deprecated entries are marked, not deleted
- AI must escalate and halt all work when a required dependency is absent from the registry

**What must always be true:**

- Every active dependency in every project has a corresponding registry entry
- Every entry addresses all five vetting criteria before approval
- Re-review is triggered by any of the re-review conditions below

**What must never happen:**

- A dependency used in production without a registry entry
- A registry entry added without human sign-off
- An entry deleted — deprecation only
- AI proceeding with work that requires an unapproved dependency

---

## Vetting Criteria

All five criteria must be addressed before an entry can be approved.
A missing field blocks approval with no exceptions.

| Criterion | What it requires |
|---|---|
| **Necessity** | No native or already-approved alternative can do the job |
| **Security** | No known critical CVEs; supply chain posture is acceptable at time of approval |
| **License** | MIT, Apache-2.0, BSD-2-Clause, or BSD-3-Clause; all others require explicit written justification |
| **Maintenance** | Actively maintained; bus factor and long-term viability assessed |
| **Exit strategy** | Documented replacement path if the dependency is abandoned or compromised |

---

## Tiers

Not all dependencies carry the same risk. Apply scrutiny proportionate to the tier.

| Tier | What it covers | Required criteria |
|---|---|---|
| **runtime** | Ships in the production binary or bundle | All five |
| **dev** | Build tools, linters, test runners — never in production output | Necessity, Security, License |
| **type-only** | `@types/*` and similar — zero runtime footprint | License only |

---

## Entry Format

Each approved dependency is recorded using this format:

```
### [package-name]
**Tier:** runtime | dev | type-only
**Version:** pinned version or range policy
**License:** SPDX identifier
**Necessity:** why no native or existing approved alternative was sufficient
**Security:** CVE status and supply chain notes at time of approval
**Maintenance:** activity and bus factor assessment at time of approval
**Exit strategy:** how this dependency would be replaced if needed
**Approved:** YYYY-MM-DD
**Projects:** list of projects where this dependency is in use
```

When a dependency is deprecated:

```
**Status:** deprecated
**Deprecated:** YYYY-MM-DD
**Reason:** why it was removed or replaced
**Replaced by:** native solution or approved alternative
```

---

## Escalation

When a task requires a dependency not present in the registry, AI must stop
and flag immediately using the standard flag format:

```
[FLAG] undeclared-dependency: [package-name] is required but not in the registry
       Location: [file or component requiring it]
       Description: what it is needed for
       Blocking: [list of work suspended until resolved]
```

No workaround. No provisional use. Work does not continue until the entry
is approved, added to the registry, and the registry document is committed.

---

## Constraints

- Re-review is mandatory when a CVE is published against an approved dependency
- Re-review is mandatory when package ownership transfers
- Re-review is mandatory when a native alternative becomes available
- Runtime dependency entries are reviewed no less than once every 12 months
- Re-review findings must be documented in the entry — approval may be reaffirmed or revoked
- The registry file is committed alongside the code that introduces the dependency — never after
