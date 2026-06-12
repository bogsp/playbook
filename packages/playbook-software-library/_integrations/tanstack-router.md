# TanStack Router

# File: packages/playbook-software-library/\_integrations/tanstack-router.md

# Version: 1.0.0

---

id: tanstack-router
type: integration
kind: library
status: active
used-by: []
config: []
docs: https://tanstack.com/router/latest

---

## What It Does

Type-safe client-side routing for React applications. Defines route hierarchy,
params, search state, loaders, and navigation behavior.

## Interface

- **Route Definitions** -- file-based or code-based route tree
- **Loaders** -- route-level data preparation
- **Search Params** -- typed URL state
- **Navigation** -- type-safe route changes

## Behavior

**Routing rules:**

- Routes own URL shape and page composition
- Loaders may prepare non-reactive data, but do not replace live subscriptions
- Search params are validated and typed
- Route components delegate business decisions to view models or application services

**Boundary rules:**

- Router code belongs to the interface layer
- Route components do not contain domain logic
- Shared route state is encoded in URL or a declared UI state model

## Failure Modes

- Route loader duplicates reactive subscription logic
- Search params are parsed differently in separate components
- UI component embeds permission or domain rules
- Route tree is generated but not checked into the expected build path

## Constraints

- Only interface code imports router APIs
- Navigation targets must be type-checked
- Loader failures map to user-safe error views
- Private routes require auth before protected content renders
