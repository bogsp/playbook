---
file: "docs/code-standards.md"
responsibility: "Authoritative engineering standards and AI implementation guardrails for the project."
ai_instructions: "Load after AI-INSTRUCTIONS.md for all software tasks. Strictly adhere to the architectural, testing, and formatting rules defined here. Do not bypass these rules."
archive_rule: "N/A - Living document. Version changes in place."
---

# Code Standards — Canonical Reference

## 1. Security Mandates
- **Input Trust:** All external input is untrusted by default and must be validated at the boundary before entering the Application layer.
- **Authorization:** Checks are the responsibility of the Application layer use case. Always assert tenant/user scoping before loading or mutating any resource.
- **Error Exposure:** Never expose internal error details, stack traces, or infrastructure messages to clients. Map all errors to safe transport codes at the Interface layer.

## 2. Architecture Patterns
- **Layer Responsibilities:** Dependencies flow strictly inward. No layer may import from a layer above it. 
  - *Domain:* Pure business logic, invariants.
  - *Application:* Use cases, orchestration.
  - *Infrastructure/Adapters:* Concrete implementations, external integrations.
  - *Interface:* Thin transport layer (HTTP, CLI, WebSockets).
- **Cross-Module Communication:** No direct module-to-module imports. All cross-module calls must go through explicitly defined gateways or contracts.

## 3. Tooling & Formatting (Project Specific)
- **Linting/Formatting:** [Define your linter/formatter here, e.g., Biome, ESLint, Prettier]. Code that fails checks must never be committed.
- **Language Strictness:** [Define language strictness rules here, e.g., TypeScript strict mode, Rust safe-only, C11 flags].
- **Naming Conventions:** - *Files/Directories:* kebab-case
  - *Classes/Types:* PascalCase
  - *Functions/Variables:* camelCase
  - *Constants:* SCREAMING_SNAKE_CASE

## 4. Testing Strategy
- **Coverage Gates:** [Define coverage minimums, e.g., Domain 100%, Application 95%].
- **Test Rules:** Test behavior, not implementation. Domain tests must be pure (no network, no DB).
- **Tooling:** [Define your test runners here].

## 5. Dependency Governance
- No external dependency may be introduced without passing the vetting process defined in the Playbook pipeline. 
- AI must never introduce a dependency unilaterally — doing so is an escalation trigger.

---

## 6. AI-Assisted Development (Playbook Rules)

This project uses Playbook. `.playbook/AI-INSTRUCTIONS.md` defines session rules; this file defines implementation standards. Neither is complete without the other.

### Planning Doc Integration
- All components are defined in `.playbook/` before any code is written.
- AI generates code against planning docs — never ahead of them.
- Keep planning docs updated when implementations change — run a sync check before every PR.

### AI Authority & Zero-Stub Rule
AI may make local implementation decisions within a component boundary, but is **strictly prohibited** from unilaterally changing:
1. Architecture or cross-module contracts.
2. Public API signatures.
3. Database schemas or persistence layers.
4. Security/auth logic.
5. Unapproved dependencies.

**Zero-Stub Rule:** AI must never generate incomplete implementations (no hardcoded return values, no artificial sleep loops, no `TODO` stubs). Every execution branch must be fully handled. 

### Escalation Protocol
When any of the following occur, AI must stop all work and flag before writing code:
- A requirement is unclear or underspecified.
- A flow path is not defined in the planning doc.
- A decision would affect more than the current component.

**Flag format:** `Categories: underspecified | missing-contract | undeclared-dependency | architectural-decision | ambiguous-behavior | security-violation`

---

## 7. Phase Completion Checklist
*Run at the end of every phase and before every PR.*

- [ ] Linter/Formatter passes with zero errors.
- [ ] All tests pass and coverage gates are met.
- [ ] No stub implementations — all branches handled (happy path, errors, edge cases).
- [ ] All touched components have up-to-date planning docs synced.
- [ ] No new dependencies added without Playbook registry approval.
- [ ] `.playbook/kit/01-process.md` and `.playbook/kit/04-progress.md` updated.