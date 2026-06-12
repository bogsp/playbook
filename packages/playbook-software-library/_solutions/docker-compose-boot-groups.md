# Docker Compose Boot Groups

# File: packages/playbook-software-library/\_solutions/docker-compose-boot-groups.md

# Version: 1.0.0

---

id: docker-compose-boot-groups
type: solution
status: active
applies-to: [service-orchestration, local-stack, docker-compose]
integrations: [docker-compose]

---

## What It Solves

Reliable startup for multi-service systems where apps depend on infrastructure,
model runtimes, dashboards, or project workers.

## Behavior

**Group model:**

1. Infrastructure group starts first
2. Core application group waits for infrastructure health
3. Worker/project/optional group waits for core application health

**Rules:**

- Group dependencies use service health checks, not sleep timers
- Every service that gates another service has a health check
- Optional admin tools use Compose profiles
- Workers may fail independently if their failure should not stop the core stack
- Infrastructure failure halts dependent boot

**Restart policy guidance:**

- Infrastructure: `unless-stopped`
- Core application services: `unless-stopped` when recoverable
- Project workers: bounded `on-failure` when isolated
- Optional dashboards/admin tools: profile-gated and non-critical

## Failure Modes

- A core app starts before database migrations or schema are ready
- A health check only proves the process exists
- Optional admin UI blocks the main stack
- Worker restart loop hides a persistent project-level failure

## Constraints

- Health checks must be safe and repeatable
- Service URLs inside containers use Docker service names, not host localhost
- Resource caps are explicit for services with unbounded workload risk
- Boot group truth lives in Compose, not in scattered scripts
