# Logging

# File: packages/playbook-software-library/\_concerns/logging.md

# Version: 1.0.0

---

id: logging
type: concern
status: active
affects: all
provided-by: internal

---

## What It Does

Structured logging available to every component in the system.
Writes machine-readable log entries with a trace ID that links all
events in a single request or operation together.
Never called directly by components -- always injected via dependency injection.

## Behavior

**Every log entry must contain:**

- Timestamp in UTC ISO 8601 format
- Severity level
- Trace ID -- originates at the interface layer, flows through all downstream calls
- Component ID -- which component emitted the log
- Message -- plain language description of what happened

**Severity levels:**

- `error` -- unrecoverable failure; always include full context and original cause
- `warn` -- recoverable issue or degraded behavior
- `info` -- significant state transition (component started, request completed, event emitted)
- `debug` -- development only; must never appear in production builds

**Rules:**

- Trace ID must never be null -- if no trace ID exists, one must be generated at the entry point
- Log entries are immutable -- never update or delete a log entry
- Never log passwords, tokens, secrets, API keys, or raw PII at any level
- Never log full request bodies at info level or above
- Infrastructure errors must be logged before being wrapped -- log the original cause
- Debug logs must be stripped at build time for production -- not filtered at runtime

**What must always be logged:**

- Every request entry and exit at the interface layer
- Every unhandled error anywhere in the system
- Every external service call -- request sent and response received
- Every significant state transition in the domain

**What must never be logged:**

- Passwords, tokens, secrets, or credentials
- Full payment card data
- Raw personal identification data (IC numbers, passport numbers)
- Private keys or certificates

## Constraints

- Components must never instantiate a logger directly
- Components must never import a logging library directly
- The logger is always provided via constructor injection
- Log output format is always JSON -- never plain text in production
- Trace IDs are always strings -- never numbers or objects
