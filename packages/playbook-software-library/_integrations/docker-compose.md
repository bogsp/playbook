# Docker Compose

# File: packages/playbook-software-library/\_integrations/docker-compose.md

# Version: 1.0.0

---

id: docker-compose
type: integration
kind: tooling
status: active
used-by: []
config: [COMPOSE_FILE, COMPOSE_PROJECT_NAME]
docs: https://docs.docker.com/compose/

---

## What It Does

Defines local and production-like service orchestration for a multi-service
project. Owns service topology, networks, volumes, health checks, boot order,
and container resource limits.

## Interface

- **Services** -- executable units and their images/build contexts
- **Networks** -- service communication boundaries
- **Volumes** -- persistent and bind-mounted storage
- **Health checks** -- readiness contracts
- **Profiles** -- optional runtime groups

## Behavior

**Boot order:**

- Infrastructure services start first
- Application services wait for required infrastructure health checks
- Optional services are behind explicit profiles
- Dependent services never rely on fixed sleeps for readiness

**Health checks:**

- Every long-running service must expose or declare a health check
- Health checks must test the real service path, not only process liveness
- Failed infrastructure health must stop dependent boot
- Restart policy must match failure criticality

**Configuration:**

- Secrets come from environment variables or secret stores
- Compose files may name variables but must not embed secret values
- Resource limits are explicit for every service that can consume unbounded CPU or memory

## Failure Modes

- Service starts before dependency is ready
- Container is running but unhealthy
- Host-only URL is used inside the Docker network
- Volume mount hides files produced in the image
- Secret defaults accidentally enable insecure local behavior in production

## Constraints

- Compose is the source of truth for service topology
- App flow docs may reference boot dependencies, but do not override Compose
- No app code hardcodes Compose service names except through configuration
- Health checks must be deterministic and safe to call repeatedly
