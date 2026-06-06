# AI Instructions — Software Development
# File: .playbook/vocabulary-software/AI-INSTRUCTIONS.md

> Load `.playbook/AI-INSTRUCTIONS.md` first, then this file.
> This file adds software-specific rules on top of the universal rules.
> Also load `docs/code-standards.md` for language and tooling standards.

---

## Load Order

1. `.playbook/AI-INSTRUCTIONS.md`
2. `.playbook/vocabulary-software/AI-INSTRUCTIONS.md` ← this file
3. `docs/code-standards.md`
4. `docs/flows/_index.md`
5. `docs/contracts/_index.md`
6. `.playbook/_index.md`
7. Module and component docs as needed

---

## Document Types

### sequencer

Owns runtime sequence. Does not contain leaf logic.

Use when a unit receives a trigger, orders other units, routes work, or branches by outcome.

```yaml
id: [kebab-case]
export: [ExportedName]
file: [src/module/sequencer.ts]
layer: application
type: sequencer
status: draft
parent: [module]
triggers: []
sequence: []
emits: []
concerns: []
```

Flow section shows the full call chain with all branches:
```
1. On [TriggerEvent](input):
   a. [component].[method](input)
      → ok: [ResultType]   → continue to b
      → err: [ErrorType]   → emit [FailureEvent], halt
   b. [component].[method](result)
      → ok: [ResultType]   → emit [SuccessEvent]
      → err: [ErrorType]   → compensate, emit [FailureEvent]
```

---

### component

Single unit of logic. One responsibility. Returns typed Result.

```yaml
id: [kebab-case]
export: [ExportedName]
file: [src/module/component.ts]
layer: domain | application | infrastructure | interface
type: component
status: draft
parent: [parent]
children: []
connects: []
emits: []
concerns: []
```

Interface section:
```
Contract: docs/contracts/[flow]/[file].md#[section]

input:  [InputType]
output: Result<[SuccessType], [ErrorType]>
```

---

### concern

```yaml
id: [kebab-case]
type: concern
status: draft
affects: all
provided-by: internal
```

---

### integration

```yaml
id: [kebab-case]
type: integration
kind: external-service | external-library | internal-service
status: draft
used-by: []
config: []
docs: [url]
```

---

## Clean Architecture Rules

Every component and sequencer declares `layer`. The declared layer must match:
- The DDA file path
- The implementation file path
- The import direction

| Layer | May Depend On | Must Not Depend On |
|---|---|---|
| `domain` | Nothing project-specific | application, infrastructure, interface |
| `application` | domain, declared ports | infrastructure implementations, interface |
| `infrastructure` | application ports, domain types | interface |
| `interface` | application APIs | infrastructure internals |

If path and declared layer disagree, the doc stays `draft` until resolved.

---

## Software-Specific Behavioral Rules

1. All arrays in domain and application must be typed as `readonly`
2. Never mutate input parameters — always return new objects
3. Never call `new Date()` in domain or application — inject a clock abstraction
4. Always store and transmit dates in UTC
5. Never use raw `throw` in domain or application — use `Result<T, E>`
6. No `any` type anywhere in the codebase
7. No non-null assertions (`!`)
8. No type assertions (`as`) outside adapter boundaries
9. No secrets hardcoded — all via validated environment variables
10. No client-supplied IDs trusted for authorization without session verification
11. Sequencers own sequence, not leaf logic — extract each leaf into its own component doc
12. Every item in a sequencer's `sequence` must resolve to an active component doc or be marked `TODO`

---

## Software Anti-Patterns

- Cross-layer imports (Application → Interface, Domain → Infrastructure)
- Direct module-to-module imports — use a gateway
- Business logic in sequencers or the interface layer
- Anemic domain models — behavior belongs on the domain object
- Boolean domain or application state — use enums, dates, or discriminated unions
- Stub implementations — hardcoded returns, artificial delays, placeholder bodies
- Partial implementations — all paths must be handled explicitly
- Magic strings or numbers — use named constants
- Commented-out code — delete it; version control preserves history
- `new Date()` in domain or application
- Mutating input parameters

---

## Phase Completion Checklist (Software)

- [ ] All linting and formatting checks pass
- [ ] Type check passes — no errors
- [ ] All tests pass — coverage gates met (domain 100%, application 90%+)
- [ ] No stub or partial implementations
- [ ] All arrays in domain/application typed as `readonly`
- [ ] No input parameters mutated
- [ ] No `new Date()` in domain or application
- [ ] All dates UTC
- [ ] No raw `throw` in domain or application
- [ ] No hardcoded secrets
- [ ] All touched structure docs reflect current code
- [ ] Living folder trees updated
- [ ] Kit files updated
- [ ] Rollout doc generated if milestone completed
