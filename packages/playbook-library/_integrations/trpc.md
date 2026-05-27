# tRPC
# File: packages/playbook-library/_integrations/trpc.md
# Version: 1.0.0

---
id: trpc
type: integration
kind: library
status: active
used-by: []
config: []
docs: https://trpc.io/docs
---

## What It Does

Type-safe API layer between TypeScript clients and servers. Provides inferred
request and response types without a separate generated REST client.

## Interface

- **Router** -- server-side procedure collection
- **Procedure** -- query, mutation, or subscription entrypoint
- **Client** -- typed caller generated from router type
- **Context** -- authenticated request metadata

## Behavior

**Server rules:**
- Every procedure validates input at the boundary
- Procedure context contains auth and trace metadata
- Errors are mapped from typed application errors to tRPC errors at the interface layer
- Routers compose interface procedures only; business logic remains in application services

**Client rules:**
- Client imports router types, not server implementation code
- Reactive data remains with the reactive data layer; tRPC is for commands and non-reactive reads
- Cache invalidation rules are explicit per mutation

## Failure Modes

- Client imports server runtime code instead of types
- Procedure bypasses application layer and embeds business logic
- Error mapping leaks internal messages
- Input validation differs from application contract

## Constraints

- Use only in TypeScript-to-TypeScript boundaries
- No procedure accepts unvalidated input
- No domain or application layer imports tRPC
- Transport configuration is owned by the interface layer
