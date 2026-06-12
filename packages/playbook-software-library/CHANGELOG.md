# Changelog
# File: packages/playbook-software-library/CHANGELOG.md

## 1.2.0

- Renamed `clean-architecture-dda` to `clean-architecture-planning-layout` — terminology updated throughout to replace "DDA" with "planning docs"
- Renamed `platform-dda-coverage` to `platform-planning-coverage` — terminology updated throughout to replace "DDA" with "planning docs"
- Package renamed from `@bogsp/playbook-library` to `@bogsp/playbook-software-library` to reflect software domain scope explicitly

## 1.1.0

- Added reusable integration contracts for Convex, Docker Compose, PostgreSQL,
  llama.cpp, WorkOS, tRPC, TanStack Router, and Vite.
- Added reusable solution patterns for Clean Architecture planning layout, platform
  planning coverage, Docker Compose boot groups, Convex reactive state, local model
  runtime orchestration, and missing script drift checks.
- Added package metadata so the library can be versioned and consumed as
  `@bogsp/playbook-software-library`.

## 1.0.0

- Initial library with logging, error handling, auth, Cloudflare R2, and signed
  URL delivery docs.
