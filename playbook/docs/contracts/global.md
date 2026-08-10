---
File: docs/contracts/global.md

id: global-contract
type: contract
scope: global
status: draft

Project: [Project Name]
Type: software
Domain vocabulary: .playbook/vocabulary-software/
---

# Global Contract

---

> Rules in this document apply to every flow in the system without exception. Per-flow contracts (`docs/contracts/flow-N-*.md`) must not repeat these rules — they extend or specialize them only where necessary.

---

## 1. Authentication & Authorization

Every request that mutates state or accesses non-public data must present a valid session token.

- Session tokens are short-lived JWTs (Access Token, ~15 minutes) issued by Auth.js. Expired tokens are rejected — the client must use the refresh token to obtain a new one.
- Refresh tokens are rotated on every use. A stolen refresh token can only be used once before it is invalidated.
- All tokens are stored in httpOnly cookies. No token is ever exposed to JavaScript on the client.
- RBAC is enforced at every action, not just at session start. The actor's role is checked against the required permission (role + resource + action) on every request.
- Guest checkout is the only permitted path that does not require a session token. Guest identity is scoped to the order record and the email provided at checkout — it carries no platform-wide permissions.
- Internal staff actions are subject to an additional per-environment constraint: Dev role has broad access in staging and read-only in production, regardless of other role permissions.

**MFA Step-Up (high-risk actions):**
The following actions require MFA re-confirmation via `flow-1a-mfa-challenge` regardless of how recently the user authenticated:

| Action                                 | Minimum Role                   |
| -------------------------------------- | ------------------------------ |
| Wallet withdrawal request              | Raketeer                       |
| Password or email change               | Any authenticated user         |
| New device sign-in                     | Any authenticated user         |
| Account or listing deletion            | Any authenticated user         |
| Tax rate change                        | SystemAdmin                    |
| Manual wallet adjustment               | SupportAdmin (Finance-capable) |
| Feature flag toggle on financial flows | SystemAdmin                    |
| RBAC role assignment                   | SystemAdmin / Dev              |
| Account termination                    | SystemAdmin                    |

---

## 2. Input Validation

Every external input entering the Application layer must pass Zod schema validation before any processing occurs.

- Use `schema.parse()` (throws on invalid input), not `schema.safeParse()` for boolean checks.
- Zod schemas are co-located with their use — not in a centralized `schemas/` folder.
- Unknown fields are rejected by default (`z.object().strict()`).
- Financial amounts are always validated as strings with exactly 2 decimal places (`"1000.00"`) at the boundary, then converted to fixed-precision integers internally. Never use floating-point for money.
- All external boundary values must be validated — this includes: API request bodies, query parameters, path parameters, webhook payloads, and event payloads received from the event bus.

---

## 3. Idempotency

Every operation that creates or modifies financial state must be idempotent.

- Idempotency keys for payment operations are generated once at order creation and reused for all subsequent payment adapter calls on that order. The same key is passed to retries — the adapter detects and drops duplicates.
- Webhook handlers check idempotency before processing. Duplicate webhooks (same transaction ID + reference already processed) return HTTP 200 but take no further action.
- Financial audit log entries are append-only and never modified. If a correction is needed, a new reversing entry is created with full explanation.
- Wallet operations (`holdFunds`, `clearFunds`, `revertWithdrawal`) must be idempotent — calling the same operation twice must produce the same result, not double-apply.

---

## 4. Error Handling

Errors propagate through the layer hierarchy without leaking internal detail to clients.

- Domain layer returns `Result<T, DomainError>` — never throws.
- Application layer returns `Result<T, ApplicationError>` — maps domain errors up.
- Infrastructure layer may throw — caught at the boundary and wrapped in `InfrastructureError`.
- Interface layer (tRPC / Hono) is the only layer that maps errors to HTTP/transport codes.
- Clients receive safe, non-specific error messages. Internal error detail (stack traces, DB errors, provider responses) is never forwarded to clients.
- Error mapping:
  - `DomainError` → `BAD_REQUEST` (400)
  - Not-found variants → `NOT_FOUND` (404)
  - Auth/permission errors → `UNAUTHORIZED` (401) or `FORBIDDEN` (403)
  - `InfrastructureError` → `INTERNAL_SERVER_ERROR` (500)

---

## 5. Audit Logging

Every financial mutation and every privileged action must produce an immutable audit log entry before the operation completes.

Audit log entries contain:

| Field         | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| `id`          | UUID                                                                 |
| `actor_id`    | User or system process that triggered the action                     |
| `action`      | Event name (e.g. `WithdrawalRequested`, `TaxRateUpdated`)            |
| `entity_type` | Domain entity affected (e.g. `Wallet`, `Order`, `Config`)            |
| `entity_id`   | ID of the affected entity                                            |
| `before`      | JSON snapshot of entity state before change                          |
| `after`       | JSON snapshot of entity state after change                           |
| `metadata`    | Additional context (IP address, device fingerprint, idempotency key) |
| `created_at`  | UTC timestamp — immutable                                            |

- Audit log entries are **never updated or deleted**. Corrections are new reversing entries.
- Financial events must log before the event is dispatched — not after.
- All outbound communications (notifications, emails) are logged for DPA compliance (FR11.4).
- Security events (failed MFA, unauthorized access attempts, IP blocks) are logged and retained longer than general logs (FR11.5).

---

## 6. Event Bus

All domain events flow through the in-process event bus (`IEventBus` — Node EventEmitter at launch, Redis Pub/Sub when App droplet splits horizontally).

- Events are emitted **after** a successful database transaction commit — never before.
- Events are past-tense and signal-only: `OrderConfirmed`, not `ConfirmOrder`.
- All event handlers are async — emitting an event never blocks the calling use case.
- Use cases depend on `IEventBus`, not a concrete implementation — the bus is injected via DI.
- Financial events require idempotency keys — duplicate events are detected and dropped by consumers.

---

## 7. Payment Webhooks

All payment provider webhooks (DragonPay postbacks, Stripe webhooks) follow the same handling contract:

1. **IP verification first** (DragonPay only) — reject if source IP not in provider's published range. Use `CF-Connecting-IP` header since Cloudflare WAF is in front.
2. **Signature verification** — reject any webhook that fails signature check. Never process an unverified payload. Return HTTP 400 on failure (Stripe) or HTTP 401 (DragonPay).
3. **Idempotency check** — if this transaction ID + reference has already been processed, return HTTP 200 and stop. Do not reprocess.
4. **Log raw payload** — write to audit log before any processing begins.
5. **Return HTTP 200 immediately** after verification — all heavy processing (wallet updates, order state changes, notifications) goes to the PostgreSQL job queue. Never make the provider wait on processing.
6. **Never return non-200 for a valid, verified webhook** — the provider will keep retrying and may blacklist the endpoint.

Provider-specific signature algorithms:

- DragonPay collection postbacks: RSA-SHA256 (`signatures` field) — HMAC-SHA256 deprecated March 31 2026, SHA-1 removed December 2025
- DragonPay payout postbacks: SHA-1 (`digest` field) — confirmed intentional per Mass Payout API v1.12
- Stripe: HMAC-SHA256 via `stripe.webhooks.constructEvent()` with raw request body — JSON body must not be parsed before verification

---

## 8. Data Privacy (DPA — RA 10173)

All flows must comply with the Data Privacy Act of the Philippines.

- PII is encrypted at rest (AES-256).
- PII is never logged at `info` level or above — masked or omitted in all logs.
- Consent is recorded at collection with timestamp and policy version.
- On a right-to-erasure request, PII is anonymised (not deleted) — the record is preserved for audit purposes, personal identifiers are scrubbed.
- Data retention: 2 years operational, 5 years financial + KYC, 7 years sensitive. Legal sign-off required before cutover.
- Every outbound communication is logged (who, what channel, when) — permanent record, cannot be deleted.

---

## 9. Date and Time

- All dates are stored and transmitted in UTC.
- Timezone conversion and display formatting happen at the Interface layer only — never in Domain or Application.
- `new Date()` is never called directly in Domain or Application — a clock abstraction (`IClock`) is injected for testability.
- ISO 8601 for all date serialization. `z.coerce.date()` at Zod boundaries only.
- Financial timestamps (order confirmation, fund clearance, withdrawal) are immutable once written.

---

## 10. Security

- TLS 1.3 on all traffic — no plaintext internal calls in production.
- Sensitive data (tokens, secrets, credentials) is never placed in URLs, query strings, or client-facing responses.
- Secrets are fetched from HashiCorp Vault at boot — never hardcoded, never in environment variables beyond the minimal bootstrap set (Vault address + auth credentials).
- Rate limiting: sliding window, per-IP and per-user, enforced at Hono layer.
- Fraud rules active from Day 1: velocity checks, IP blocklist, 24-hour new account payout hold, duplicate order detection.
- Semgrep (SAST) + OWASP ZAP (DAST) run on every deployment — build fails if critical issues are found.
- WAF (Cloudflare Pro) filters malicious traffic before it reaches the App droplet.

---

## 11. Financial Amounts

- All financial amounts are stored as integers (centavos for PHP, cents for USD) in the database — never as floats.
- All financial amounts in DragonPay requests and responses are strings with exactly 2 decimal places (`"1000.00"`).
- All financial amounts in Stripe requests and responses are integers in the smallest currency unit (centavos: PHP 1,000.00 = `100000`).
- Conversion between display format and storage format happens only at the adapter boundary.
- Platform fee: 10% (buyer pays). VAT: 12% (auto-calculated). Withdrawal flat fee: ₱10. These values come from the TaxEngineAdapter and ConfigService — never hardcoded in flow logic.

---

## 12. Testing Requirements

Per `docs/code-standards.md`:

- Domain layer: 100% test coverage — pure functions, no dependencies.
- Application layer (use cases): 90%+ coverage — integration tests with mocked adapters via MSW.
- Infrastructure: integration tests against real DB/Redis in CI.
- All payment webhook handlers must have contract tests proving correct behavior for every status code each provider can return.
- Build fails in CI if Domain < 100% or Application < 90%.

---

N/A — this section was considered and does not apply
