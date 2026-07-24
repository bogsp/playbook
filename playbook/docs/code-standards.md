# docs/code-standards.md

# Code Standards — Canonical Reference

> **Version:** 3.1 — Removed project-specific naming, removed StrykerJS, updated dependency governance, fixed Vitest coverage config.
> **Scope:** Architecture, Security, TypeScript, Validation, Error Handling, Code Hygiene, Testing, Observability, Git, Tooling, AI-Assisted Development.
> **Usage:** Copy to `/docs/code-standards.md` in each repo. Loaded as part of the Playbook session boot order — see [Section 14](#14-ai-assisted-development).

---

## Table of Contents

1. [Security Mandates](#1-security-mandates)
2. [Architecture Patterns](#2-architecture-patterns)
3. [Domain-Driven Design (DDD)](#3-domain-driven-design-ddd)
4. [TypeScript Strictness](#4-typescript-strictness)
5. [Schema Validation — Dual-Gate Pattern](#5-schema-validation--dual-gate-pattern)
6. [Error Handling](#6-error-handling)
7. [Code Hygiene](#7-code-hygiene)
8. [Naming Conventions](#8-naming-conventions)
9. [Testing Strategy](#9-testing-strategy)
10. [Observability](#10-observability)
11. [Dependency Governance](#11-dependency-governance)
12. [Git Workflow](#12-git-workflow)
13. [Tooling](#13-tooling)
14. [AI-Assisted Development](#14-ai-assisted-development)
15. [Phase Completion Checklist](#15-phase-completion-checklist)

---

## 1. Security Mandates

> **Security is the top concern. These rules are non-negotiable and take precedence over velocity, convenience, and all other considerations.**

### Secrets and Configuration

- All secrets (API keys, tokens, credentials) must be stored in environment variables — never hardcoded anywhere in the codebase, including test files.
- Validate all environment variables at startup with Zod — crash fast on missing or malformed config.
- Never access `process.env` directly outside the designated environment validation module (`src/env.ts`).
- Never expose secrets in URLs, query strings, log output, error messages, or client-facing responses.
- Never log passwords, tokens, API keys, raw PII, or decrypted database payloads at any log level.

```typescript
// src/env.ts — sole access point for environment config
const EnvSchema = z.object({
	DATABASE_URL: z.string().url(),
	REDIS_URL: z.string().url(),
	JWT_SECRET: z.string().min(32),
	PORT: z.coerce.number().default(3000),
})

export const env = EnvSchema.parse(process.env)
```

### Input Trust

- **All external input is untrusted by default.** HTTP requests, tRPC payloads, WebSocket frames, event queue messages, file reads, and environment variables must all pass through Zod validation before entering the Application layer — no exceptions.
- Never trust client-supplied IDs for authorization. Always verify ownership and permissions against the authenticated session context server-side.
- When data synchronizes between internal services or async channels (message queues, event brokers, sync streams), payloads must undergo secondary validation at the Service Adapter boundary before being written to the database. See [Section 5 — Dual-Gate Pattern](#5-schema-validation--dual-gate-pattern).

### Query Safety

- Parameterized queries only — never interpolate values directly into query strings.
- No raw template string queries: ``db.query(`SELECT * FROM users WHERE id = ${id}`)`` is a critical violation.

### Error Exposure

- Never expose internal error details, stack traces, database schema structures, or infrastructure messages to clients.
- Map all errors to safe transport codes at the Interface layer. Internal detail stays server-side.
- `InfrastructureError` messages and causes must never be forwarded to the client.

### Transport

- All inter-service and client-server communication must use TLS 1.3. Unencrypted channels are blocked in production.
- Sensitive data must never be placed in URLs or query strings — use the request body or headers.

### Authorization Checks

- Authorization checks are the responsibility of the Application layer use case — never delegate to the Domain or assume the Interface layer has already verified access.
- Always assert tenant/user scoping before loading or mutating any resource.

---

## 2. Architecture Patterns

### Overview

This project enforces **Clean Architecture** combined with **Domain-Driven Design (DDD)**. Dependencies flow strictly inward:

```
Domain → Application → Infrastructure (Ports/Contracts) → Service Adapters → Interface
```

No layer may import from a layer above it. The arrow indicates the direction of dependency — not data flow.

### Layer Responsibilities

| Layer                | Responsibility                                              | What is Forbidden                                 |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| **Domain**           | Pure business logic, invariants, domain events              | Frameworks, DB, network, any external import      |
| **Application**      | Use cases (CQRS-lite); orchestrates domain via interfaces   | Concrete SDKs, direct DB calls, Interface imports |
| **Infrastructure**   | Interfaces, abstract ports, contracts                       | Concrete vendor libraries, SDK imports            |
| **Service Adapters** | Concrete implementations: ORMs, SDKs, HTTP clients, Redis   | Business logic, domain decisions                  |
| **Interface**        | Thin transport layer: tRPC routers, WebSocket handlers, CLI | Business logic, direct domain imports             |

### Monorepo Boundary Enforcement (Nx)

Every workspace project must declare a scope tag in its `project.json`:

```json
{ "tags": ["scope:domain"] }
```

The `@nx/enforce-module-boundaries` rule must be configured:

- `scope:domain` → depends only on `scope:domain`
- `scope:app` → depends on `scope:domain` and `scope:infra`
- `scope:infra` → depends on `scope:domain`
- `scope:adapter` → depends on `scope:infra` and `scope:domain`
- `scope:interface` → depends on `scope:app`, `scope:infra`, `scope:domain`; **never** on `scope:adapter`

### Cross-Module Communication

- No direct module-to-module imports — all cross-module calls go through the `ModuleServiceGateway`.
- Replacing a technology (e.g., swapping Prisma for Drizzle) must only require changes in the Service Adapters layer — nothing else changes.

### Use Case Design (CQRS-lite)

- One class per use case: `CreateInvoiceUseCase`, not `InvoiceService` with 30 methods.
- Commands mutate state; queries read state — never mixed in the same use case.
- Use cases accept a typed input DTO and return `Result<T, E>` — no raw throws.
- Use cases are the only entry point into the Domain layer from above.

### Shared Logic

- Shared logic lives in `/shared` or `/packages` — never copy-pasted across modules.
- Interfaces and abstractions are designed before implementations — stable contracts, swappable internals.

---

## 3. Domain-Driven Design (DDD)

To prevent anemic domain models where objects act as dumb data containers, enforce rich behavioral objects:

**Entities** have a unique identity that persists across state changes. Identity is validated upon construction.

**Value Objects** are immutable. They have no setters. They are constructed via static factory methods that validate invariants. Any "update" returns a completely new instance. They have no identity of their own.

**Aggregates** are clusters of domain objects treated as a single unit, accessed exclusively through their Aggregate Root (an Entity). The Aggregate Root is solely responsible for enforcing all structural invariants before emitting events.

**Domain Events** are past-tense, signal-only records of irreversible state changes (`InvoicePosted`, `TenantDeactivated`). They are emitted to the outbox only after a database transaction successfully commits — never speculatively.

### Domain Rules

- No anemic domain models — behavior lives on the domain object, not in a service class.
- Domain events use past-tense, aggregate-scoped names: `InvoicePosted`, not `UpdateInvoice`.
- Never call `new Date()` in the Domain or Application layer — inject an `IClock` abstraction.
- All arrays passed into or returned from Domain functions must be typed as `ReadonlyArray<T>`.
- Never mutate input parameters — always return new objects.

```typescript
// ❌ Wrong
class CreateInvoiceUseCase {
	execute(input: CreateInvoiceInput) {
		const now = new Date() // untestable
	}
}

// ✅ Correct
class CreateInvoiceUseCase {
	constructor(private readonly clock: IClock) {}
	execute(input: CreateInvoiceInput): Result<Invoice, ApplicationError> {
		const now = this.clock.now()
		// ...
	}
}
```

---

## 4. TypeScript Strictness

### Required Compiler Config

All sub-project `tsconfig.json` files must include:

```json
{
	"compilerOptions": {
		"strict": true,
		"noUncheckedIndexedAccess": true,
		"exactOptionalPropertyTypes": true,
		"noImplicitOverride": true,
		"noImplicitAny": true,
		"strictNullChecks": true,
		"strictFunctionTypes": true,
		"strictBindCallApply": true,
		"strictPropertyInitialization": true,
		"noImplicitThis": true,
		"useUnknownInCatchVariables": true,
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true
	}
}
```

`strict: true` enables the foundational checks. The additional flags close remaining gaps. All of these are non-negotiable.

### Type Rules

**No `any`** — anywhere, ever. If a type is unknown, use `unknown` and narrow downstream with type guards or Zod parsing.

**No non-null assertions (`!`)** — handle nullability explicitly via optional chaining (`?.`), nullish coalescing (`??`), or conditional checks.

**No type assertions (`as SomeType`)** — banned except at Service Adapter boundaries when translating untyped external payloads. Every such assertion must include an inline comment explaining why it is safe.

**Use `satisfies` over `as`** — catches errors without widening the type. Prefer it wherever applicable.

**Explicit return types** — all public API exports, public service methods, use case execution methods, and domain functions must declare their return type explicitly. Type inference on public boundaries is forbidden.

**No boolean domain or application state** — modeling state with multiple booleans creates impossible permutations. Use discriminated unions or strict enums:

```typescript
// ❌ Wrong
interface Invoice {
	isDraft: boolean
	isPosted: boolean
	isPaid: boolean
}

// ✅ Correct
type InvoiceState =
	| { readonly status: 'draft' }
	| { readonly status: 'posted'; readonly postedAt: Date }
	| {
			readonly status: 'paid'
			readonly paidAt: Date
			readonly referenceTransactionId: string
	  }
```

**No magic strings or numbers** — extract to named constants with units where relevant:

```typescript
const MAX_LINE_ITEMS = 100
const SESSION_TTL_SECONDS = 3600

const InvoiceStatus = {
	DRAFT: 'draft',
	POSTED: 'posted',
	PAID: 'paid',
} as const
type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]
```

**Immutability** — all arrays passed into or returned from Domain and Application functions must be `ReadonlyArray<T>` or `readonly T[]`. Never mutate input parameters. Domain objects must not expose public setters or direct property mutation.

**Boolean exceptions** — booleans are allowed only in Zod schemas, `Result` discriminants (`result.ok`), and pure predicate functions (`is*`, `has*`, `equals*`). They must never be persisted or transported as business state.

---

## 5. Schema Validation — Dual-Gate Pattern

Security and data integrity require ironclad schema enforcement at all boundary transitions. Two gates are mandatory:

### Gate 1: External Ingress Gate

All payloads originating outside the server — HTTP requests, tRPC payloads, WebSocket frames, environment variables, file reads — must pass through a strict Zod parser before reaching the Application layer.

- Schemas must reject unexpected properties using `.strict()`.
- Use `schema.parse()` to propagate validation errors to the Interface layer, or `schema.safeParse()` when errors must be handled programmatically.
- Zod schemas are colocated with their use — not in a separate `schemas/` folder.
- Infer types from schemas: `type Input = z.infer<typeof InputSchema>`.
- Coerce only where explicitly needed (`z.coerce.date()`) — never use `z.any()`.

```typescript
export const CreateTenantInputSchema = z
	.object({
		organizationName: z.string().min(2).max(100),
		ownerEmail: z.string().email(),
		dueDate: z.coerce.date(),
	})
	.strict()

type CreateTenantInput = z.infer<typeof CreateTenantInputSchema>
```

### Gate 2: Internal Sync Gate

When data synchronizes between independent services, async message queues, event brokers, or sync streams, payloads must undergo secondary validation at the Service Adapter boundary before being written to the database or ingested by the Domain engine.

This prevents malicious data modifications or schema drift from corrupting internal state.

---

## 6. Error Handling

### Result Type

All Domain and Application functions return `Result<T, E>`. No raw `throw` is permitted outside the Infrastructure and Interface layers — this is a core architectural rule, not a preference.

```typescript
// packages/platform-core/src/types/result.ts

export type Result<T, E> =
	| { readonly ok: true; readonly value: T }
	| { readonly ok: false; readonly error: E }

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value })

export const err = <E>(error: E): Result<never, E> => ({ ok: false, error })
```

### Error Class Hierarchy

All application errors derive from a base class with a unique error code:

```typescript
export abstract class AppError extends Error {
	public abstract readonly code: string
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

// Domain error example
export class EmptyLineItemsError extends DomainError {
	public readonly code = 'EMPTY_LINE_ITEMS'
	constructor() {
		super('Invoice must contain at least one line item.')
	}
}

// Application error example
export class InvoiceNotFoundError extends ApplicationError {
	public readonly code = 'INVOICE_NOT_FOUND'
	constructor(id: string) {
		super(`Invoice not found: ${id}`)
	}
}
```

### Layer Responsibilities

| Layer                | Policy                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Domain**           | Returns `Result<T, DomainError>` — never throws                                                                               |
| **Application**      | Returns `Result<T, ApplicationError>` — maps domain errors up, never throws                                                   |
| **Infrastructure**   | May throw system/OS errors — caught at boundary, wrapped in `InfrastructureError`, returned as `Result`                       |
| **Service Adapters** | Concrete errors (e.g., PG connection failure) must be caught, logged, and wrapped into standard `InfrastructureError` results |
| **Interface**        | Only layer that maps `Result.error` to transport codes. Stack traces are stripped before responding to clients                |

### Interface Error Mapping (tRPC)

```typescript
// DomainError          → BAD_REQUEST
// Not-found variants   → NOT_FOUND
// Auth errors          → UNAUTHORIZED
// InfrastructureError  → INTERNAL_SERVER_ERROR (detail suppressed)
```

---

## 7. Code Hygiene

### Functions

- One function, one responsibility. Cognitive complexity is the primary metric — not raw line count.
- If a function contains nested maps, multiple logical paths, or exceeds ~20 lines, evaluate for extraction.
- Prefer guard clauses (early returns) over nested conditionals. Keep the primary execution path flat.
- No side effects in pure functions — Domain layer functions are always pure.
- No commented-out code — delete it. Version control preserves history.

```typescript
// ❌ Wrong — nested, hard to follow
function process(order: Order) {
	if (order.status === 'pending') {
		if (order.items.length > 0) {
			if (order.total > 0) {
				/* process */
			}
		}
	}
}

// ✅ Correct — guard clauses, flat, typed errors
function process(order: Order): Result<void, OrderError> {
	if (order.status !== 'pending') return err(new InvalidOrderStatusError())
	if (order.items.length === 0) return err(new EmptyOrderError())
	if (order.total <= 0) return err(new InvalidOrderTotalError())
	// primary logic here
	return ok(undefined)
}
```

### Imports and Exports

- **Named exports only** — no default exports. Aids safe automated refactoring and tree-shaking.
- Framework exceptions only: default exports are allowed when a framework contract requires them (Docusaurus page modules, Storybook CSF metadata, tool config entrypoints).
- **No barrel `index.ts` files** inside internal folders. Import explicitly from the source file.
- Public monorepo package entry points may use a single-level barrel file.
- **No circular imports** — use dependency injection to break cycles.

```typescript
// ❌ Wrong
export default function createInvoice() { ... }
import createInvoice from "./invoices";

// ✅ Correct
export function createInvoice() { ... }
import { createInvoice } from "./invoices/create-invoice";
```

### General

- Prefer `const` over `let` — never use `var`.
- `async/await` over raw Promise chains — no `.then().catch()` chaining.
- No `TODO` or `FIXME` in committed code without an associated ticket reference:

```typescript
// ✅ Allowed
// TODO(ACCT-142): remove legacy adapter after migration complete

// ❌ Forbidden
// TODO
// FIXME
```

### Date and Time

- Always store and transmit dates in UTC — never store with a timezone offset.
- Never call `new Date()` directly in Domain or Application layer — inject an `IClock` abstraction.
- Use ISO 8601 for all date serialization. Use `z.coerce.date()` at Zod boundaries only.
- Display formatting and timezone conversion happen at the Interface layer only.
- Never compare dates as strings — always compare as `Date` objects or UTC timestamps.

---

## 8. Naming Conventions

### General

| Thing          | Convention                   | Example                |
| -------------- | ---------------------------- | ---------------------- |
| Files          | `kebab-case`                 | `create-invoice.ts`    |
| Directories    | `kebab-case`                 | `use-cases/`           |
| Classes        | `PascalCase`                 | `InvoiceRepository`    |
| Interfaces     | `PascalCase` with `I` prefix | `IInvoiceRepository`   |
| Types          | `PascalCase`                 | `CreateInvoiceInput`   |
| Functions      | `camelCase`                  | `createInvoice()`      |
| Variables      | `camelCase`                  | `lineItemTotal`        |
| Constants      | `SCREAMING_SNAKE_CASE`       | `MAX_LINE_ITEMS`       |
| Enums / Status | `PascalCase` members         | `InvoiceStatus.POSTED` |

### Domain and Events

| Thing        | Pattern                      | Example                            |
| ------------ | ---------------------------- | ---------------------------------- |
| Events       | past-tense, aggregate-scoped | `InvoicePosted`, `PaymentReceived` |
| Use Cases    | verb + noun + `UseCase`      | `CreateInvoiceUseCase`             |
| Repositories | noun + `Repository`          | `InvoiceRepository`                |
| Factories    | noun + `Factory`             | `InvoiceFactory`                   |
| Errors       | noun + description + `Error` | `InvoiceNotFoundError`             |

### Module-Scoped (replace `[module]` with actual module id)

| Resource    | Pattern                    | Example                       |
| ----------- | -------------------------- | ----------------------------- |
| tRPC routes | `module.resource.action`   | `accounting.invoices.create`  |
| Events      | `[Module][Entity][Action]` | `AccountingInvoicePosted`     |
| DB tables   | `[module]_[table]`         | `accounting_invoices`         |
| Permissions | `[module]:[action]`        | `accounting:create-invoice`   |
| Settings    | `[module].[setting]`       | `accounting.default-currency` |
| Routes      | `/[module]/[resource]`     | `/accounting/invoices`        |

### Naming & Symbol Isolation (Mandatory)

- All symbols default to most restrictive visibility
- Each symbol belongs to exactly one subsystem
- No generic prefixes (`util_`, `common_`, `core_`, `base_`)
- Internal symbols must not use prefixes
- Must guarantee no naming collisions across domains

---

## 9. Testing Strategy

### Tools

- **Vitest** — unit and integration tests
- **Playwright** — E2E tests (web and Electron)
- **MSW** — mock HTTP and WebSocket in integration tests; never mock at the network level in unit tests

### Coverage Gates (enforced in CI — PR fails if not met)

| Layer                         | Line                      | Branch | Method | Approach                                       |
| ----------------------------- | ------------------------- | ------ | ------ | ---------------------------------------------- |
| **Domain**                    | 100%                      | 100%   | 100%   | Pure unit tests — no DB, no network            |
| **Application (Use Cases)**   | 95%                       | 95%    | 95%    | Integration tests with mocked adapters via MSW |
| **Infrastructure / Adapters** | 90%                       | 85%    | 90%    | Test against real DB/Redis in CI               |
| **Interface (tRPC)**          | Key paths + error mapping | —      | —      | Not exhaustive                                 |
| **UI**                        | Critical workflows        | —      | —      | Playwright E2E                                 |

### Test Rules

- Domain tests are pure — no DB, no gateway, no infrastructure, no MSW.
- One test file per unit: `create-invoice.use-case.test.ts` mirrors `create-invoice.use-case.ts`.
- Test behavior, not implementation — test what a function does, not how.
- Arrange / Act / Assert structure — one assertion concept per test.
- All adapters must have a mock implementation for use in Application-layer tests.
- No `describe` nesting deeper than 2 levels.

```typescript
// ✅ Correct — tests observable behavior, not internals
describe('CreateInvoiceUseCase', () => {
	describe('when line items are empty', () => {
		it('returns EmptyLineItemsError', async () => {
			const result = await useCase.execute({ ...validInput, lineItems: [] })
			expect(result.ok).toBe(false)
			expect(result.error).toBeInstanceOf(EmptyLineItemsError)
		})
	})
})
```

---

## 10. Observability

### OpenTelemetry Requirements

OpenTelemetry is required. Every request and asynchronous background process must propagate trace context.

Every tracking envelope must include:

- **Trace ID** — identifies the overall request transaction chain
- **Span ID** — identifies a single execution unit within a single service
- **Correlation ID** — identifies the originating client context or session

These IDs must be automatically propagated across all transport boundaries: HTTP headers, tRPC metadata, WebSocket payload properties, and background worker queues.

Required for: HTTP, WebSockets, background jobs, and synchronization flows.

### Logging

- All logs must be structured JSON containing OTel context values — no plain string logs.
- Trace ID originates at the Interface layer and is propagated through all downstream calls via DI.
- Infrastructure errors must be logged before being wrapped — log the original cause, not just the wrapper class.

**Log levels:**

| Level   | Use                                                                |
| ------- | ------------------------------------------------------------------ |
| `error` | Unrecoverable failures — include full context and original cause   |
| `warn`  | Recoverable issues or degraded behavior                            |
| `info`  | Significant state transitions (`InvoicePosted`, `PaymentReceived`) |
| `debug` | Development only — must not appear in production builds            |

**Always log:** request entry and exit, unhandled errors, external service calls, significant state changes.

**Never log:** passwords, tokens, secrets, raw PII, full request bodies at `info` level or above.

---

## 11. Dependency Governance

No external dependency may be introduced without passing the vetting process defined in the Playbook pipeline. This applies to all runtime packages, dev tooling, SDKs, and type-only packages without exception.

All approved dependencies are recorded in the Playbook dependency registry. If a dependency is not in the registry, it is not approved for use. AI must never introduce a dependency unilaterally — doing so is an escalation trigger. See [Section 14](#14-ai-assisted-development).

---

## 12. Git Workflow

### Branch Naming

| Type      | Pattern                         | Example                                  |
| --------- | ------------------------------- | ---------------------------------------- |
| Feature   | `feature/[scope]/[description]` | `feature/accounting/add-invoice-search`  |
| Fix       | `fix/[scope]/[description]`     | `fix/accounting/invoice-date-validation` |
| Milestone | `milestone/[number]-[name]`     | `milestone/1-platform-core`              |
| Chore     | `chore/[description]`           | `chore/update-dependencies`              |

- `main` is always deployable — no broken builds on main, ever.
- Branch from `main`; merge via reviewed and approved PR only.
- Delete branches after merge.
- Direct commits to `main` are blocked.

### Commit Format

```
[scope]: short imperative description
```

```
accounting: add invoice line item validation
platform-core: implement version adapter registry
fix(auth): handle expired session token
chore: update Biome to 1.9
```

- Imperative mood — "add", "fix", "implement", not "added", "fixes", "implementing"
- Scope is the module or package name
- Under 72 characters for the first line
- Body (optional) explains _why_, not _what_

### PR Rules

- Every PR requires at least one review before merge.
- PR description includes: what changed, why, and how to test.
- CI must pass — lint, format, type check, tests, coverage gates.
- Checklist before requesting review:
  - [ ] Planning doc sync check — all touched docs reflect current implementation
  - [ ] No new dependencies added without Playbook registry approval
  - [ ] No cross-layer violations
  - [ ] No direct module-to-module imports
  - [ ] Events follow naming conventions
  - [ ] Typed errors — no raw `throw` in Domain/Application
  - [ ] Tests included for all new behavior
  - [ ] No `TODO`/`FIXME` without a ticket reference
  - [ ] `biome check` and `biome format` pass
  - [ ] `tsc --noEmit` exits clean

---

## 13. Tooling

### Biome

Single tool for linting and formatting. Replaces ESLint + Prettier.

```json
{
	"linter": { "enabled": true, "rules": { "recommended": true } },
	"formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
	"organizeImports": { "enabled": true }
}
```

- All code must pass `biome check` and `biome format` before commit.
- Configured as a pre-commit hook — code that fails Biome never reaches the repo.
- CI fails on Biome errors — no exceptions.

### Vitest

```typescript
// vitest.config.ts
export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			thresholds: {
				lines: 95,
				functions: 95,
				branches: 95,
				statements: 95,
			},
			include: ['src/domain/**', 'src/application/**'],
		},
	},
})
```

### Playwright

```typescript
// playwright.config.ts
export default defineConfig({
	testDir: './e2e',
	use: { baseURL: 'http://localhost:3000' },
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
```

### Zod

- All schemas use `z.object().strict()` — rejects unknown fields at external boundaries.
- Coerce only where explicitly needed (`z.coerce.date()`) — never `z.any()`.
- Infer types from schemas: `type Input = z.infer<typeof InputSchema>`.

### Environment Variable Validation

```typescript
// src/env.ts
const EnvSchema = z.object({
	DATABASE_URL: z.string().url(),
	REDIS_URL: z.string().url(),
	JWT_SECRET: z.string().min(32),
	PORT: z.coerce.number().default(3000),
})

export const env = EnvSchema.parse(process.env)
```

Pin build and runtime toolchains to an explicitly supported Node LTS version.

---

## 14. AI-Assisted Development

This project uses Playbook. Always follow the session boot order below. `.playbook/AI-INSTRUCTIONS.md` defines session rules and structure; this file defines implementation standards. Neither is complete without the other.

### AI Session Boot Order

Load in order at the start of every session:

```
1. .playbook/README.md
2. .playbook/AI-INSTRUCTIONS.md
3. docs/code-standards.md              ← this file
4. .playbook/_index.md
5. .playbook/kit/01-process.md
6. .playbook/kit/04-progress.md
7. .playbook/kit/05-kanban.md          ← if active
```

Then load based on the task:

| Task                            | Also load                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| Any coding task                 | `docs/vocabulary.md`                                                                      |
| C11 engine work (`src/`)        | `docs/code-standards-c.md`, `.playbook/engine-c/_index.md` + relevant component docs      |
| Rust shell work (`rust-shell/`) | `docs/code-standards-rust.md`, `.playbook/rust-shell/_index.md` + relevant component docs |
| Planning or structure work      | `docs/flows/_index.md`, `docs/contracts/_index.md`                                        |
| Specific module work            | `.playbook/[module]/_index.md` + relevant component docs, `_concerns/`, `_integrations/`  |
| Audit                           | `docs/rewrite/` files as they exist                                                       |

### Planning Doc Integration

- All components are defined in `.playbook/` before any code is written.
- AI generates code against planning docs — never ahead of them.
- Every module has a `_index.md` in `.playbook/[module]/` describing: purpose, entry points, contained components, integrations, and concerns.
- Keep planning docs updated when implementations change — run a sync check before every PR.

### AI Authority

AI may make local implementation decisions within a component boundary. AI is strictly prohibited from making the following decisions unilaterally:

- Architecture changes (layer structure, module boundaries, cross-module contracts)
- Interface changes (public API signatures, event schemas, transport contracts)
- Persistence changes (schema changes, new tables, new collections)
- Security changes (auth logic, permission models, secret handling)
- Dependency additions (any package, SDK, or library not already in the Playbook registry)

Any of the above must trigger the Escalation Protocol below.

### Zero-Stub Rule

AI must never generate incomplete implementations:

- No hardcoded return values
- No artificial sleep loops or placeholder delays
- No empty method bodies or `TODO` stubs
- No `unimplemented!()` or `todo!()` equivalents
- Every execution branch — happy path, all error cases, all edge cases — must be fully handled

Silent skips are not acceptable. If a path is not handled, it must surface as a typed error.

### Escalation Protocol

When any of the following occur, AI must **stop all work and flag before writing any code:**

- A requirement is unclear or underspecified
- A flow path is not defined in the planning doc or contract
- A dependency is needed but not in the Playbook registry
- A decision would affect more than the current component
- The correct behavior cannot be inferred without making assumptions

**Flag format:**

```
[FLAG] Category: description
       Location: target file or module path
       Description: specific technical justification
       Blocking: list of activities currently suspended
       Options: (if applicable)
```

**Categories:** `underspecified` | `missing-contract` | `undeclared-dependency` | `architectural-decision` | `ambiguous-behavior` | `security-violation`

### Implementation Accuracy

- Always implement against official documentation, not AI-inferred behavior.
- For any third-party SDK: verify method signatures against current docs before using AI-generated calls.
- Flag any AI output that uses deprecated APIs or patterns inconsistent with current library versions.

### Interface-First Development

- Minimal, explicit public interfaces — AI reads interfaces to understand module behavior.
- Document the _why_ in JSDoc, not just the _what_ — AI uses this as reasoning context.

```typescript
/**
 * Posts a draft invoice, making it legally binding and triggering payment tracking.
 * Invariants: invoice must be in DRAFT status; line items must balance to total.
 * Emits: InvoicePosted event after successful transaction commit.
 * @throws Never — returns Result<PostedInvoice, PostInvoiceError>
 */
export class PostInvoiceUseCase { ... }
```

### Anti-Patterns — Quick Reference

**Architecture**

- Cross-layer imports: Application → Interface, Domain → Infrastructure
- Direct module-to-module imports (use `ModuleServiceGateway`)
- Business logic in the Interface layer
- Anemic domain models (behavior belongs on the domain object)

**TypeScript**

- `any` type anywhere in the codebase
- Non-null assertions (`!`)
- Type assertions (`as`) outside adapter boundaries
- Inferred return types on public APIs
- Boolean domain or application state

**Implementation**

- Stub or partial implementations — all paths must be handled explicitly
- Raw `throw` in Domain or Application layer
- Magic strings or numbers — use named constants
- Commented-out code — delete it
- `new Date()` in Domain or Application — inject a clock abstraction
- Mutating input parameters — return new objects

**Security**

- Hardcoded secrets or credentials
- Raw string interpolation in database queries
- Logging secrets, tokens, or raw PII
- Forwarding `InfrastructureError` details to the client
- Trusting client-supplied IDs for authorization

**Dependencies**

- Any package not approved in the Playbook dependency registry
- AI introducing dependencies without escalation

**AI-Specific**

- Generating code ahead of a planning doc
- Adding undeclared dependencies or components
- Silently resolving ambiguity with assumptions
- Duplicating an existing component's responsibilities
- Leaving any code path unhandled or silently ignored

---

## 15. Phase Completion Checklist

Run at the end of every phase and before every PR. No phase is complete until all applicable items are checked.

### Code Quality

- [ ] `biome check` passes with zero errors or warnings
- [ ] `biome format` applied — no unformatted files
- [ ] `tsc --noEmit` exits clean
- [ ] All Vitest tests pass — `vitest run` exits clean
- [ ] Coverage gates met: Domain 100%, Application 95%+, Infrastructure 90%+
- [ ] No stub implementations — no hardcoded returns, placeholder bodies, or artificial delays
- [ ] No partial implementations — all branches handled: happy path, errors, and edge cases

### Planning Doc Sync

- [ ] All touched components have up-to-date planning docs
- [ ] No new dependencies added without Playbook registry approval
- [ ] No new components coded without a planning doc
- [ ] All modified docs are `status: active` (not `draft`)
- [ ] Folder map in `_index.md` updated if components changed
- [ ] `kit/01-process.md` and `kit/04-progress.md` updated

### Security

- [ ] No secrets hardcoded anywhere in the codebase
- [ ] All external inputs validated with Zod before entering Application layer
- [ ] No raw query interpolation — parameterized queries only
- [ ] No stack traces or internal errors exposed to clients
- [ ] Structured JSON logs validated — trace context populated, no sensitive data logged

### Git

- [ ] Commits are grouped logically — one concern per commit
- [ ] Commit messages follow format: `[scope]: short imperative description`
- [ ] No `TODO` or `FIXME` without an associated ticket reference
- [ ] No `console.log` left in code
- [ ] Branch is up to date with `main`

### Milestone Only (at major releases)

- [ ] Rollout doc generated — `docs/rollout/[milestone].md`
- [ ] All planning docs audited — code matches docs across all touched modules
- [ ] QA sign-off complete

---

## Error Mitigation

### Prevention

- Biome configured as pre-commit hook — broken code never reaches the repo
- CI enforces: lint, format, type check, tests, coverage gates — all must pass
- Planning doc sync check is mandatory before every PR

### Detection

- Biome and TypeScript surface issues at write time in the editor
- CI gate catches anything that slips through locally
- Planning doc audit at each milestone catches structural drift

### Recovery

- **Build failure** — fix Biome/type errors before any other work; do not stack changes on a broken build
- **Test failure** — revert to last passing commit if root cause is unclear; fix forward only if cause is known
- **Doc drift** — run a sync check immediately; update the planning doc before writing any new code on that component
- **Bad merge** — revert the merge commit; re-apply changes manually with proper review

---

_This document is the source of truth for code standards. When in doubt, refer here first._
_Always loaded as part of the Playbook session boot order — `.playbook/README.md` → `.playbook/AI-INSTRUCTIONS.md` → this file._
