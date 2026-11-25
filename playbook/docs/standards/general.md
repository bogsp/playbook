---
file: 'docs/standards/general.md'
responsibility: 'General engineering rules for Project Sage — the rules that apply to every layer and every language: security, architecture, naming, error philosophy, testing principles, dependency governance, and Playbook AI rules. Language-specific rules live in the per-language standards.'
ai_instructions: 'Load after .playbook/_index.md for every software task. Then also load the standard for each language you touch: docs/standards/typescript.md (TypeScript), docs/standards/c.md (C11), docs/standards/rust.md (Rust). Do not bypass these rules.'
archive_rule: 'N/A — living document. Version changes in place; record each change under Revision Notes at the bottom.'
project: 'Project Sage'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Code Standards — General Rules

These rules apply to **all** aspects of Project Sage: every layer, every
language, every AI-generated change. Nothing language-specific lives here —
compiler flags, toolchain commands, hardening patterns, type rules, and
per-language test runners are in the language standards below.

## 0. Which Standard Governs What

| Layer | Path | Language | Standards to load |
| --- | --- | --- | --- |
| Engine (domain memory mechanics) | `src/core/engine/`, `src/shared/` | C11 | this file + `docs/standards/c.md` |
| Shell (application + infrastructure) | `rust-shell/src/` | Rust 2021 | this file + `docs/standards/rust.md` |
| Interface | `rust-shell/ui/` | TypeScript / React | this file + `docs/standards/typescript.md` |

Precedence: a language standard wins on language mechanics (syntax, tooling,
hardening patterns). This file wins on process, testing principles,
dependency governance, and AI rules. A change touching two languages must
satisfy both standards.

---

## 1. Security Mandates

- **Input trust:** all external input is untrusted by default and is validated at the boundary before it enters the Application layer. Every language validates at its own boundary (see the language standards for the mechanism).
- **Authorization:** checks are the responsibility of the Application layer use case. Always assert tenant/user scoping before loading or mutating any resource. Access grants are bounded, expire with their task, and are validated at **both** the Rust registry and the graph relation (`docs/contracts/governance/g6-access-grants.md`).
- **Error exposure:** never expose internal error details, stack traces, or infrastructure messages to clients. Errors are mapped to safe transport codes at the Interface layer. Engine error codes never reach tRPC raw; they are translated at the FFI boundary.
- **Secrets and PII:** no secrets, tokens, credentials, raw PII, or decrypted data in code, logs, planning documents, or error messages at any log level.
- **Zero-record guarantee:** prohibited inputs (c8) and prohibited skill-chain candidates (s2) leave **no trace** — no log, no hash, no flag, no counter. No code path, and no test or inspection tool, may record, count, or log content that was rejected on these paths. Absence is verified by observing that nothing changed (for example graph counts before and after), never by adding a rejection counter.
- **Privacy tiers:** privacy-tier enforcement happens at the Rust shell boundary before any signal reader is invoked. Interactions marked local-processing-only are never logged.
- **Query safety:** parameterized queries only wherever a query interface exists; never interpolate values into query strings.

---

## 2. Architecture Patterns

- **Layer responsibilities:** dependencies flow strictly inward; no layer imports from a layer above it.
  - *Domain* (C11 engine): pure memory mechanics and invariants — no I/O, no network, no hardware decisions.
  - *Application + Infrastructure* (Rust shell): tenancy, FFI, preprocessing, sync, access grants, host election. No cognitive decisions and no graph semantics.
  - *Interface* (TypeScript UI, tRPC/NAPI, HTTP dev server): thin transport layer — no business logic.
- **Cross-module communication:** no direct module-to-module imports. Cross-module calls go through declared gateways or contracts. Cross-layer calls go through declared boundaries only: tRPC/NAPI, then `ffi.rs`.
- **Unsafe / FFI isolation:** all `unsafe` FFI code is isolated in `rust-shell/src/ffi.rs` and the C sources it links.
- **Graph injection (D14):** the relational graph is never a module-level global. Every engine component that reads or writes it receives the graph as a parameter from the bridge.
- **One ingestion pipeline:** every input — chat, file, link, stream, or corpus unit — follows the identical path. No acquisition-specific code path, batch mode, or special-case primitive field (`docs/foundation.md` §5; D27).
- **Signal Reader Principle:** engine signal nodes receive bytes and produce fingerprints. No content interpretation, linguistic rules, morphological decomposition, or modality branching in the engine.
- **Relations are strength-only:** a relation never carries a semantic label or category value. Categorization is expressed by inserting a mediating unit into the path (`docs/foundation.md` §3).
- **Tenant isolation:** each Sage instance has its own arena, context, and worker. No shared pointers or mutable state across tenants.

---

## 3. Naming & Symbol Isolation

- **The project name appears in no name.** Nothing carries `sage`, `Sage`, or `SAGE` — not symbols, macros, types, constants, files, folders, paths, build targets, packages, binaries, environment variables, or agent names. Name things for what they are: `mem_alloc`, `result_t`, `primitive_mint`, `Shell`, `TenantRegistry`. The domain vocabulary in prose (Core Sage, Individual Sage, Mini-Sage) is unaffected. (Creator decisions D32 and D35.)
- **Residuals are defects.** Any name that still carries the project name (compatibility aliases, test macros, test-hook names, runner, archive, package, and type names, file and folder names) is tracked as `K-NAME-CLEANUP`. New code never references a residual and never adds an alias. Planning documents, flows, and contracts adopt the new names first; the code follows them.
- **No generic prefixes:** `util_`, `common_`, `core_`, `base_` are banned as symbol prefixes.
- **One subsystem per symbol.** Each symbol belongs to exactly one subsystem, defaults to the most restrictive visibility, and must not collide with a name in another domain.
- **Files:** planning documents and folders are `kebab-case`. Source-file and symbol conventions are in the language standards.

---

## 4. Error Handling

The philosophy is identical in every language; the types are in the language standards.

- Every fallible operation returns a typed result. Nothing throws across a layer boundary, and nothing is silenced.
- Every return value is checked. No silent discards.
- Output parameters are written only on success.
- All validation happens before any write. A failed operation leaves no partial state.
- An error surfaces to the nearest boundary that can handle it; if none can, it halts the current flow and surfaces upward.
- On error paths, sensitive data is zeroed before returning.

---

## 5. Testing Principles

- Test behavior, not implementation.
- Pure logic (the engine's domain layer) is tested without network, and without filesystem beyond fixtures.
- Test-only hooks are compiled only in test builds and can never be reached from a release build.
- Hardening patterns apply to production source, not to test code. Compiler warning gates apply to both.
- A new component adds its tests, and wires them into the build, in the same change. A test file that is not wired in is an orphan and a defect.
- Every public function is tested on its success path and on each error path its planning doc documents.
- **No numeric coverage percentage is enforced for C11 or Rust** because no coverage tooling is wired in. Do not invent or claim one. If tooling is added, define the gate in the language standard in the same session.
- A failing check is mapped to a Kanban ticket. A phase is never passed with an unexplained failure.
- Runners, commands, and layout are in each language standard.

---

## 6. Dependency Governance

- No external dependency is introduced without passing the vetting process defined in the Playbook pipeline.
- AI must never introduce a dependency unilaterally; doing so is an escalation trigger (`undeclared-dependency`).
- Prefer built-in solutions; any outside tool needs explicit justification (`.playbook/_index.md` rules 3, 13, 14).
- **Where approval is recorded:** the component's planning doc (DDA) declares the dependency, and a dated decision entry in `.playbook/kit/02-exploration.md` records the justification (the D13 pattern).
- The allowed-dependency list for each language is in that language's standard. Standing directive `SC-STRIP-NON-CRITICAL`: no non-critical third-party dependency enters the Rust shell without justification and a decision entry.

---

## 7. AI-Assisted Development (Playbook Rules)

This project uses Playbook. `.playbook/_index.md` defines session rules and the full session load order; this file defines implementation standards. Neither is complete without the other.

### Session boot order

```
1. .playbook/_index.md
2. docs/standards/general.md            ← this file
3. .playbook/kit/01-process.md
4. .playbook/kit/04-progress.md
5. .playbook/kit/05-kanban.md        ← if active
```

Then load by task: C11 → `docs/standards/c.md` + `.playbook/engine-c/_index.md`; Rust → `docs/standards/rust.md` + `.playbook/rust-shell/_index.md`; TypeScript → `docs/standards/typescript.md` + `.playbook/ui/_index.md`; planning → `docs/flows/_index.md` + `docs/contracts/_index.md`; any coding → `.playbook/vocabulary-software/_index.md`. The authoritative table is in `.playbook/_index.md`.

### Planning doc integration

- All components are defined in `.playbook/` before any code is written.
- AI generates code against planning docs — never ahead of them.
- Keep planning docs updated when implementations change; run a sync check before every PR.
- `docs/foundation.md` and `docs/architecture.md` are stable-structure documents: a correction is a Version History row (plus a new numbered subsection if needed), never a rewritten paragraph.
- Flows describe target architecture only; implementation gaps go in Known Issues and `05-kanban.md`, never in a flow.

### AI authority and the Zero-Stub Rule

AI may make local implementation decisions within a component boundary, but is **strictly prohibited** from unilaterally changing:

1. Architecture or cross-module contracts.
2. Public API signatures.
3. Snapshot formats, schemas, or persistence layers.
4. Security or auth logic.
5. Dependencies.

**Zero-Stub Rule:** AI must never generate incomplete implementations — no hardcoded return values, no artificial sleep loops, no empty bodies, no `TODO` / `todo!()` / `unimplemented!()` stubs. Every execution branch is handled; an unhandled path surfaces as a typed error. Pre-existing documented stubs (for example the preprocessors in `K-MASTER-FLOW-KNOWN-GAPS`) are tracked in Known Issues and are not precedent for generating new ones.

**Solution-First Rule (D94):** implement the complete, architecture-conformant solution defined by the active flow, contract, and DDA. Do not substitute an ad-hoc workaround, compatibility shim, fabricated output, or partial behavior for the required solution. If the graph model, interface, or decision is insufficient to specify a complete implementation, stop at the design gate, record the concrete gap, and request the needed decision; do not fill it with a stub or workaround. Production code must meet its declared behavior and applicable language hardening standards before its phase closes.

### Project-specific rules AI must never violate

- Never simplify, remove, or "clean up" a hardening pattern. The DDA is always correct; the code matches it.
- Never add a modality parameter, modality branch, or content interpretation to the engine's signal reader.
- Never introduce an acquisition-specific pipeline, batch boundary, or extra field on the three-field primitive record.
- Never encode a semantic label, category, or relation "type" in a relation's delta. Skill roles (trigger / sequential / terminal) are expressed by relational topology, never by delta encoding (K-46).
- Never write, log, hash, flag, or count a prohibited input or prohibited skill-chain candidate.
- Never implement a Type 2 modification (foundational code, invariants, prohibition list, lifecycle definitions, The Accord) at runtime. Unclassifiable defaults to Type 2.
- Never introduce reinforcement learning or any reward-scored learning path.
- Never make the relational graph a module-level global.
- Never alter the Accord's non-configurable status or its first-processed ordering.
- Never put the project name in a name (§3).

### Escalation protocol

When any of the following occur, AI must stop all work and flag before writing code: a requirement is unclear or underspecified; a flow path is not defined in the planning doc; a decision would affect more than the current component; a dependency is needed that is not declared; the correct behavior cannot be inferred without making assumptions.

```
[FLAG] Category: description
       Location: target file or module path
       Options: (if applicable)
       Blocking: what cannot move forward until this is resolved
```

Categories: `underspecified` | `missing-contract` | `undeclared-dependency` | `architectural-decision` | `ambiguous-behavior` | `security-violation`

### Kit and deliverable conventions

- Generated files are complete, downloadable files — never partial deltas — and carry their filename and full path at the top (the `file:` frontmatter field satisfies this for Playbook documents).
- Every file's frontmatter uses the card (planning documents) or the purpose block (everything else), as defined in `.playbook/maintenance.md`.
- Kit files that grow large are archived per `.playbook/maintenance.md` and `.playbook/kit/00-guide.md`: cut to `.playbook/kit/_archives/`, leave a one-line pointer where the content was, never delete.
- Run the `native-reviewer` subagent after native (C11/Rust) code changes.

---

## 8. Phase Completion Checklist

*Run at the end of every phase and before every PR. Then run the Phase Gates section of each language standard you touched: `docs/standards/c.md` §12, `docs/standards/rust.md` §12, `docs/standards/typescript.md` §13.*

**Quality**

- [ ] No stub implementations — all branches handled (happy path, errors, edge cases)
- [ ] No new dependency without a DDA declaration and a `02-exploration.md` decision entry
- [ ] Zero-record guarantee intact — nothing records prohibited input or prohibited chains
- [ ] No project-name prefix in new code, and no reference to a residual prefixed name
- [ ] Every failing check is mapped to a Kanban ticket

**Planning-doc and kit sync**

- [ ] All touched components have up-to-date planning docs (`status: active`, not `draft`)
- [ ] `.playbook/_index.md` Structure section updated if components changed
- [ ] `.playbook/kit/01-process.md` and `.playbook/kit/04-progress.md` updated
- [ ] Frontmatter of every touched file matches its shape, card or purpose block (`.playbook/maintenance.md`)

---

## Revision Notes

- **2026-10-22 (X4)** — Restored at `docs/standards/general.md`. The 2026-10-20 standards move renamed this file to `docs/standards/README.md` and then `_index.md`, and commit `ae6051d` overwrote it with the six-line index, so the general rules were absent from the live tree. Content restored verbatim from `f909d1f`; only the `file:` path, the location note under the title, and cross-references to the language standards changed. <!-- check:ignore -->
- **2026-09-20** — Filled the upstream-issued template's placeholders with Project Sage's rules.
- **2026-09-20 (second pass)** — Restructured per Creator direction (D31): this file now holds only the general rules that apply to every layer and language. TypeScript rules moved to `docs/code-standards-ts.md`; C11 and Rust rules (toolchain, naming, testing runners, allowed dependencies, per-language gates) live only in their own standards. Added the project-wide no-prefix rule (§3, D32). Strengthened the zero-record rule (§1) so that verification never adds a rejection counter. Generic SaaS material from the retired v3.2 reference that does not apply to Sage (DDD entity/aggregate rules, Nx tags, ORM adapters, git branch/commit tables) is intentionally not carried forward. <!-- check:ignore -->
- **2026-10-10 (D94)** — Locked the Creator's solution-first production-code rule: no ad-hoc workaround, fabricated output, compatibility shim, or partial behavior in place of the active architecture's complete solution. If design evidence is insufficient, resolve the specific gap before code.
- **2026-09-20 (third pass)** — §3 widened from the `sage_` prefix to the project name in any name — identifiers, files, folders, paths, targets, packages, env vars, agent names (D35). Renamed the `sage-native-reviewer` agent to `native-reviewer`. Ticket `K-PREFIX-CLEANUP` is now `K-NAME-CLEANUP`.
