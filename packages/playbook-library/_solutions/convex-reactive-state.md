# Convex Reactive State
# File: packages/playbook-library/_solutions/convex-reactive-state.md
# Version: 1.0.0

---
id: convex-reactive-state
type: solution
status: active
applies-to: [reactive-state, task-state, dashboard-state]
integrations: [convex]
---

## What It Solves

Using Convex as the live state index while keeping large results, long-term
retention, and archival data in durable storage.

## Behavior

**State split:**
- Convex stores live operational state and recent indexes
- Durable database stores audit, retention, large results, and history
- Object storage stores files and binary artifacts
- Filesystem stores project-owned files when projects are local-first

**Reactive rules:**
- Clients subscribe to state instead of polling
- Mutations own state transitions
- Conflicts resolve at the mutation boundary
- Derived dashboard state is calculated from subscriptions or view models

**Schema rules:**
- Table changes update contracts and DDA before implementation
- Large payloads are stored by reference
- Recent indexes may duplicate durable records only when the duplication is intentional

## Failure Modes

- Convex becomes the permanent archive for large results
- Dashboard polls because subscription boundaries are unclear
- Mutation performs multiple partial state transitions
- Durable record exists but reactive index was not updated

## Constraints

- Reactive state must remain small enough for live updates
- Every write boundary validates input
- Durable write and reactive index update order is explicit per flow
- Generated client files are never hand-edited
