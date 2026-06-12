# Platform Planning Coverage
# File: packages/playbook-software-library/_solutions/platform-planning-coverage.md
# Version: 1.1.0

---
id: platform-planning-coverage
type: solution
status: active
applies-to: [repo-tooling, runtime-config, docker, schema, scripts]
integrations: [docker-compose]
---

## What It Solves

Repo-level operational files often sit outside app and package folders. This
solution gives them first-class planning doc coverage so config, Docker,
schemas, and scripts do not become undocumented implementation surfaces.

## Behavior

**Recommended platform planning doc tree:**

```text
.playbook/platform/_index.md
.playbook/platform/repo-tooling.md
.playbook/platform/runtime-config.md
.playbook/platform/docker-runtime.md
.playbook/platform/schema.md
.playbook/platform/launch-scripts.md
```

**Coverage rules:**
- Root package/workspace/test/lint files are covered by `repo-tooling`
- Environment files and runtime manifests are covered by `runtime-config`
- Compose files and container build files are covered by `docker-runtime`
- Database or reactive-state schemas are covered by `schema`
- Shell/PowerShell/operational scripts are covered by `launch-scripts`

**Status rules:**
- A platform doc is active only when all referenced files exist
- If a package script points to a missing script file, the launch-scripts doc is draft
- Secrets may be named as config keys, but values are never copied into planning docs

## Failure Modes

- A package script references a deleted script
- Compose uses a Dockerfile that is missing or renamed
- Schema changes without updating flow contracts
- Runtime config example diverges from app expectations

## Constraints

- Platform planning docs document structure and contracts, not environment secret values
- Platform docs do not replace app/package planning docs
- Operational file references are treated as implementation references and must stay current
