# Error Handling
# File: playbook/.playbook/_concerns/error-handling.md

---
id: error-handling
type: concern
status: active
affects: all
provided-by: internal
---

## What It Does

Typed error handling available to every component in the system.
Uses a Result pattern — every operation that can fail returns either
a success value or a typed error. Never throws in business logic.
Errors are caught only at infrastructure and interface boundaries.

## Behaviour

**The Result type has exactly two states:**
- Success — contains the expected output value
- Failure — contains a typed error with a code and message

**No third state exists.** A result is always one or the other.
Null, undefined, and empty are never used to signal failure.

**Error hierarchy:**
- `DomainError` — business rule violation; input was valid but the operation cannot proceed
- `ApplicationError` — use case failure; not-found, unauthorized, conflict
- `InfrastructureError` — external system failure; database, network, third-party service

**Layer responsibilities:**
- Domain layer — returns Result with DomainError; never throws
- Application layer — returns Result with ApplicationError; maps DomainError up
- Infrastructure layer — may throw; caught at boundary and wrapped in InfrastructureError
- Interface layer — only layer that maps errors to transport codes (HTTP status, tRPC code)

**Error mapping at the interface layer:**
- DomainError — bad request
- Not-found variants — not found
- Auth errors — unauthorized
- InfrastructureError — internal server error

**Rules:**
- Never throw in Domain or Application layer — always return a typed Result
- Never catch errors in Domain or Application layer — propagate via Result
- Never expose internal error details, stack traces, or infrastructure messages to clients
- Every error must have a code — a stable string identifier, not a number
- Error codes are stable across versions — never rename or reuse a code
- Always log InfrastructureErrors before wrapping — log the original cause

## Constraints

- Raw throws are only permitted in Infrastructure layer and above
- The Result type is the only mechanism for communicating failure in Domain and Application
- Error messages are for developers — never shown directly to end users
- Transport error codes are mapped at the interface layer only — never deeper
- A caught error must never be silently swallowed — it must be logged or returned
