# Convex
# File: packages/playbook-library/_integrations/convex.md
# Version: 1.0.0

---
id: convex
type: integration
kind: external-service
status: active
used-by: []
config: [CONVEX_URL, CONVEX_DEPLOY_KEY]
docs: https://docs.convex.dev
---

## What It Does

Reactive database and serverless function platform used for live application
state. Best suited for state that must update clients immediately: tasks,
projects, feature flags, notifications, sync runs, and operational status.

## Interface

- **Schema** -- typed table definitions and indexes
- **Queries** -- reactive reads
- **Mutations** -- atomic writes and state transitions
- **Actions** -- external I/O boundary when needed
- **Generated Client** -- typed API surface consumed by apps

## Behavior

**State ownership:**
- Convex is authoritative for reactive state conflicts
- Every mutation must validate input before writing
- State transitions must be atomic; partial writes are not allowed
- Clients subscribe reactively; polling is not allowed for live state

**Schema rules:**
- Schema changes are contract changes
- Indexes must exist before query paths depend on them
- Table names and field names are stable API once consumed by apps
- Generated client files are build artifacts; do not hand-edit them

**Write rules:**
- Mutations own state changes
- Actions may call external systems, then commit results through mutations
- Large binary data and long-term archival records belong in object storage or a durable database, not reactive state
- Secrets must never be stored in reactive tables unless encrypted and explicitly approved

## Failure Modes

- Schema drift: generated client no longer matches table definitions
- Missing index: reactive query works locally but becomes slow or rejected at scale
- Partial migration: some clients read fields that no longer exist
- Oversized records: reactive state becomes a storage sink instead of a state index

## Constraints

- Every table used by application code must be represented in DDA or contracts
- Every schema change must update affected flow contracts before code changes
- Generated client files are read-only from the perspective of implementation work
- No component accesses Convex directly unless it is an infrastructure adapter or declared boundary
