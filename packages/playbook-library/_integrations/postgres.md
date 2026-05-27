# PostgreSQL
# File: packages/playbook-library/_integrations/postgres.md
# Version: 1.0.0

---
id: postgres
type: integration
kind: external-service
status: active
used-by: []
config: [DATABASE_URL]
docs: https://www.postgresql.org/docs/
---

## What It Does

Durable relational database for transactional records, audit retention,
large results, reporting, and long-lived application data.

## Interface

- **Transactions** -- atomic multi-record writes
- **Queries** -- indexed reads and reporting
- **Migrations** -- schema evolution
- **Connection Pool** -- bounded database access

## Behavior

**Write rules:**
- Writes that must be atomic use transactions
- Every query path used in production has an index or a documented scan limit
- Migration order is deterministic and repeatable
- Failed writes return typed errors and preserve the original cause in logs

**Retention rules:**
- Long-term audit records belong in durable storage
- Large results should be stored directly or by reference, not copied into reactive state
- Deletion rules must distinguish hard delete, soft delete, and retention expiry

**Connection rules:**
- Application code never creates unbounded client connections
- Connection strings are configuration, never hardcoded
- Database credentials are never logged

## Failure Modes

- Migration applied in one environment but not another
- Transaction partially modeled in application code instead of database transaction
- Missing index causes runtime slowdown
- Connection pool exhaustion cascades into unrelated services

## Constraints

- Access through infrastructure adapters or repository components only
- Domain and application layers depend on ports, not database client libraries
- Every schema change must update contracts or DDA when it affects behavior
- Retry rules must be explicit; never retry non-idempotent writes blindly
