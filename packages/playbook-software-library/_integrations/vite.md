# Vite

# File: packages/playbook-software-library/\_integrations/vite.md

# Version: 1.0.0

---

id: vite
type: integration
kind: tooling
status: active
used-by: []
config: [VITE_*]
docs: https://vite.dev/

---

## What It Does

Frontend development server and production bundler. Provides fast local
feedback, environment variable injection, and optimized static build output.

## Interface

- **Dev Server** -- local HMR and asset serving
- **Build** -- production bundle generation
- **Plugins** -- framework and route tooling
- **Environment Variables** -- client-exposed configuration using a public prefix

## Behavior

**Build rules:**

- Client-exposed variables use the configured public prefix
- Secret variables are never exposed to browser bundles
- Production output is static unless server-side rendering is explicitly adopted
- Build output path is declared and consumed by deployment/runtime docs

**Development rules:**

- HMR is development-only
- Dev server proxy rules are explicit
- Route generation and plugin outputs are deterministic

## Failure Modes

- Secret accidentally uses public environment prefix
- Build succeeds locally but runtime expects a different output path
- Dev proxy hides production CORS or network behavior
- Generated route artifacts are stale

## Constraints

- Vite config belongs to the interface/build layer
- Browser code never reads non-public environment variables
- Production runtime must serve the declared build output
- Plugin-generated files must be either reproducible or checked in by policy
