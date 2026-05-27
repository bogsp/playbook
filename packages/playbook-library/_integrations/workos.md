# WorkOS
# File: packages/playbook-library/_integrations/workos.md
# Version: 1.0.0

---
id: workos
type: integration
kind: external-service
status: active
used-by: []
config: [WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_REDIRECT_URI]
docs: https://workos.com/docs
---

## What It Does

Authentication provider for user login, session management, organization
identity, and machine-to-machine access patterns.

## Interface

- **User Auth** -- verify user sessions and identity
- **Session Refresh** -- maintain authenticated browser sessions
- **Organization Context** -- resolve tenant or organization membership
- **M2M Credentials** -- authenticate service-to-service calls where used

## Behavior

**Boundary rules:**
- Raw tokens are read only at the interface boundary
- Application code receives an auth context, not provider tokens
- Provider SDK usage is isolated behind an auth adapter
- Feature flags may swap auth adapters only at composition boundaries

**Session rules:**
- Tokens are never logged
- Browser tokens are stored using the provider-recommended secure mechanism
- Missing auth context is unauthenticated, never implicitly anonymous
- Permission checks occur before domain or application logic

## Failure Modes

- Provider outage blocks login
- Token is valid but tenant or role is missing
- Redirect URI mismatch prevents callback completion
- M2M credential scope is broader than the calling service needs

## Constraints

- Components never import WorkOS directly
- All auth decisions return typed errors
- Auth context is immutable once created
- Provider-specific error details are not exposed to clients
