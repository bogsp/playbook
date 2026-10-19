---
file: "docs/standards/typescript.md"
responsibility: "TypeScript, JavaScript, and Node.js standards: compiler strictness, type safety, boundary validation, error handling, code hygiene, naming conventions, testing, and pnpm tooling."
ai_instructions: "Load for any TypeScript, JavaScript, or Node.js work across the repository. Enforce compiler strictness, strict type safety, and runtime boundary validation."
archive_rule: "Living document. Update revision notes for any modifications."
project: "Playbook"
project-type: software
---

# TypeScript, Node & Workspace Standards

Scope: All TypeScript, JavaScript, and Node.js code across the repository. This standard governs strict type safety, runtime boundary validation, workspace hygiene, and toolchain conventions.

## 1. Tooling & Workspace Status

- **Package Manager:** pnpm (Workspace-enabled via pnpm-workspace.yaml).
- **Linter & Formatter:** Biome (replaces ESLint and Prettier).
- **Runtime:** Node.js (Pinned to an explicit LTS version).
- **Build / Execution:** Defined via workspace scripts in package.json.

---

## 2. Compiler Configuration

Every tsconfig.json must include strict compiler options:

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

strict: true enables foundational checks; the additional flags close remaining gaps. All are non-negotiable.

---

## 3. Type Rules

- **No any**, anywhere. If a type is unknown, use unknown and narrow with type guards or schema parsing.
- **No non-null assertions (!).** Use ?., ??, or an explicit check.
- **No type assertions (as SomeType)** except at adapter boundaries translating an untyped external payload, and every such assertion carries an inline comment explaining safety. Prefer satisfies.
- **Explicit return types** on all exports: public props, hooks, client functions, and helpers. Inference on an exported boundary is forbidden.
- **No boolean state modelling.** Multiple booleans create impossible permutations; use discriminated unions or const-object enums.
- **No magic strings or numbers.** Extract named constants with units where relevant.
- **Immutability:** Arrays passed into or returned from shared helpers are ReadonlyArray<T>; never mutate input parameters.
- **Booleans are allowed** only in validation schemas, Result discriminants, and pure predicates (is*, has*).

```typescript
// ❌ isReady: boolean; isBlocked: boolean
// ✅
type ResponseState =
  | { readonly status: "idle" }
  | { readonly status: "pending" }
  | { readonly status: "delivered"; readonly bytes: Uint8Array }
  | { readonly status: "blocked" };
```

---

## 4. Boundary Validation

- Every payload crossing into the application from outside (API responses, file reads, environment variables) is parsed with Zod before use. Validation schemas reject unexpected properties with .strict().
- Use schema.parse() where validation failure should propagate, and safeParse() where it must be handled.
- Infer types from schemas: type Input = z.infer<typeof InputSchema>. Do not duplicate schemas with hand-written types.
- Read environment configuration in a centralized module.

---

## 5. Error Handling

- Functions that can fail return Result<T, E> or handle errors explicitly; avoid raw unhandled throw outside boundary adapters.

```typescript
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };
```

- Never log secrets, tokens, or raw PII; no console.log in committed production code.

---

## 6. Code Hygiene

- One function, one responsibility. Prefer guard clauses over nested conditionals.
- **Named exports only.** Default exports only where a framework contract requires one. No barrel index.ts files inside internal feature folders.
- No circular imports.
- const over let; never var. async/await over promise chains.
- No commented-out code; version control preserves history.
- No TODO / FIXME without a ticket reference: // TODO(TASK-XXXX): …

---

## 7. Naming Conventions

| Entity | Convention | Example |
| --- | --- | --- |
| React components / Classes | PascalCase | UserProfile.tsx |
| Hooks | useCamelCase | useSession.ts |
| Standard files and directories | kebab-case | api-client.ts, lib/ |
| Types and interfaces | PascalCase | UserResponse |
| Functions and variables | camelCase | fetchUserData |
| Constants | SCREAMING_SNAKE_CASE | MAX_RETRY_COUNT |

---

## 8. Date and Time

- Store and transmit timestamps in UTC as ISO 8601 or epoch values.
- Never compare dates as strings.
- Display formatting and time-zone conversion happen at the presentation layer only.

---

## 9. Testing

- **Tools:** Vitest for unit/integration tests, Playwright for end-to-end testing.
- One test file per unit, mirroring its source name. Follow Arrange / Act / Assert. Test behavior, not implementation details.

---

## 10. Tooling & Workspace Management

- **Biome** configuration:

```json
{
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "organizeImports": { "enabled": true }
}
```

- Workspace packages managed via pnpm. Run root or workspace scripts via pnpm --filter <pkg> <script>.

---

## 11. Phase Gates

Run before closing any phase touching TypeScript/Node code:

- [ ] pnpm build succeeds across the workspace
- [ ] tsc --noEmit exits clean
- [ ] biome check and biome format pass clean
- [ ] No any, !, or unjustified as; every export has an explicit return type
- [ ] All external payloads validated with Zod
- [ ] No console.log, commented-out code, or un-ticketed TODOs

---

## Revision Notes

- **2026-09-20** — Generalized from Project Sage specific constraints into a clean, domain-agnostic Playbook standard.
