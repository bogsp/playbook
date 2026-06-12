# Auth

# File: packages/playbook-software-library/\_concerns/auth.md

# Version: 1.0.0

---

id: auth
type: concern
status: active
affects: all
provided-by: internal

---

## What It Does

Authentication and authorization enforced at orchestrator and sequencer
boundaries. Components never check permissions directly. Auth context
flows from the incoming request -- never queried mid-flow.

## Behavior

**Authentication** -- verifying who the caller is.
**Authorization** -- verifying what the caller is allowed to do.

These are distinct operations and must never be conflated.

**Where auth is enforced:**

- At the interface layer -- request is rejected before entering the application if unauthenticated
- At the sequencer boundary -- permission is checked before the flow begins
- Never inside a component -- components receive pre-verified identity

**Auth context:**

- Originates at the interface layer from the incoming request
- Passed explicitly to the sequencer -- never accessed via global state or singleton
- Contains: caller identity, verified roles, session metadata
- Is immutable -- never modified after creation

**Permission model:**

- Permissions are checked against the auth context -- never re-fetched mid-flow
- A permission check that fails must halt the flow immediately
- Failed permission checks are logged with the caller identity and the permission checked
- Permission errors are never swallowed or defaulted to allowed

**Rules:**

- Components must never import or call auth services directly
- Auth context must never be stored in mutable shared state
- Session tokens must never be logged at any level
- Auth checks must happen before any domain logic executes
- A missing auth context is always treated as unauthenticated -- never as anonymous allowed

## Constraints

- Auth context is always passed explicitly -- never accessed via global or thread-local state
- Permission checks are synchronous where possible -- async only when unavoidable
- Auth failures always return a typed error -- never throw
- The interface layer is the only place that reads raw session tokens
- All auth decisions are logged -- who, what permission, what outcome
