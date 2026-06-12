# AI Instructions — Software Development
# File: .playbook/vocabulary-software/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> For coding tasks, also load `docs/code-standards.md`.
> This file adds software-specific rules on top of the universal rules.

---

## Additional Load Order for Software Tasks

| Task | Also load |
|---|---|
| Any coding task | `docs/code-standards.md` |
| Module work | `.playbook/[module]/_index.md` + relevant component and sequencer docs |
| Flow or contract authoring | `docs/flows/_index.md`, `docs/contracts/_index.md` |

---

## Architecture Layer Rules

Every component and sequencer declares a `layer`. The declared layer must match the DDA file path, the implementation file path, and the import direction.

| Layer | May depend on | Must not depend on |
|---|---|---|
| `domain` | Nothing project-specific | `application`, `infrastructure`, `interface` |
| `application` | `domain`, declared ports | Infrastructure implementations, `interface` |
| `infrastructure` | Application ports, domain types | `interface` |
| `interface` | Application APIs | Infrastructure internals |

A component whose declared layer conflicts with its file path or imports stays `status: draft` until resolved. Flag it — do not work around it.

---

## Software-Specific Behavioral Rules

1. All arrays passed into or returned from `domain` and `application` functions must be typed as `readonly`
2. Never mutate input parameters — always return new objects
3. Never call `new Date()` in `domain` or `application` — inject a clock abstraction
4. Always store and transmit dates in UTC; display formatting happens at the `interface` layer only
5. Never use raw `throw` in `domain` or `application` — return `Result<T, E>`
6. Never use `any` type anywhere in the codebase
7. Never use non-null assertions (`!`)
8. Never use type assertions (`as`) outside adapter boundaries — include an inline justification comment when you do
9. Never hardcode secrets — all secrets via environment variables validated at startup
10. Never trust client-supplied IDs for authorisation — always verify against session context
11. Sequencers own sequence, not leaf logic — extract each meaningful leaf operation into its own component
12. Every item in a sequencer's `sequence` must resolve to an active component doc or be marked `TODO`

---

## Software Anti-Patterns

**Architecture**
- Cross-layer imports — `application` → `interface`, `domain` → `infrastructure`
- Direct module-to-module imports — use a `ModuleServiceGateway`
- Business logic in sequencers or the `interface` layer
- Anemic domain models — behaviour belongs on the domain object

**TypeScript**
- `any` type anywhere in the codebase
- Non-null assertions (`!`)
- Type assertions (`as`) outside adapter boundaries
- Inferred return types on public APIs
- Boolean domain or application state — use enums, dates, or discriminated unions

**Implementation**
- Stub implementations — hardcoded returns, artificial delays, placeholder bodies
- Partial implementations — all paths must be handled explicitly
- Raw `throw` in `domain` or `application`
- Magic strings or numbers — use named constants
- Commented-out code — delete it; version control preserves history
- `new Date()` in `domain` or `application`
- Mutating input parameters

---

## Phase Completion Checklist

Run this before closing any phase. The full checklist is in `docs/code-standards.md` Section 10 — these are the software-specific items.

- [ ] All arrays in `domain` and `application` typed as `readonly`
- [ ] No input parameters mutated
- [ ] No `new Date()` in `domain` or `application` — clock injected
- [ ] All dates stored and transmitted in UTC
- [ ] No raw `throw` in `domain` or `application` — `Result<T, E>` used throughout
- [ ] No hardcoded secrets
- [ ] All touched planning documents reflect current implementation
- [ ] Living folder trees in `_index.md` files updated
- [ ] No component coded without an active planning document
- [ ] Rollout doc generated if a milestone was reached
