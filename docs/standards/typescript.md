---
file: 'docs/code-standards-ts.md'
responsibility: 'TypeScript-specific rules AI must follow for the interface layer (rust-shell/ui/): compiler strictness, type rules, boundary validation, error handling, hygiene, naming, testing, tooling, and dependencies.'
ai_instructions: 'Load for any TypeScript / React work under rust-shell/ui/ alongside docs/code-standards.md and .playbook/ui/_index.md. General rules (security, architecture, AI authority, escalation) live in docs/code-standards.md and apply in full.'
archive_rule: 'N/A — living document. Version changes in place; record each change under Revision Notes at the bottom.'
project: 'Project Sage'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# TypeScript Code Standards

Scope: the React / Vite / TanStack interface in `rust-shell/ui/`. TypeScript in
Project Sage is the **Interface layer only** — a thin transport and
presentation layer over the Rust shell. It carries no business logic and no
memory semantics (`docs/code-standards.md` §2).

## 1. Tooling Status

- **Exists:** `rust-shell/ui/vite.config.ts`; `pnpm build`.
- **Not yet created:** Biome and Playwright configuration files (and any Vitest configuration if absent). The Creator has deferred UI tooling until the UI is worked on properly (D33); the current focus is the Core Sage.
- This standard is binding for all TypeScript written or edited now. Its tool-based gates (§13) become enforceable when the configs exist (`K-UI-TOOLING-SETUP`). Until then the only mechanical UI gate is `pnpm build`, and the rules below are enforced by review.

---

## 2. Compiler Configuration

Every UI `tsconfig.json` must include:

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

`strict: true` enables the foundational checks; the additional flags close the
remaining gaps. All are non-negotiable.

---

## 3. Type Rules

- **No `any`**, anywhere. If a type is unknown, use `unknown` and narrow with type guards or Zod parsing.
- **No non-null assertions (`!`).** Use `?.`, `??`, or an explicit check.
- **No type assertions (`as SomeType`)** except at an adapter boundary translating an untyped external payload, and every such assertion carries an inline comment saying why it is safe. Prefer `satisfies`, which catches errors without widening.
- **Explicit return types** on all exports: components' public props, hooks, client functions, and helpers. Inference on an exported boundary is forbidden.
- **No boolean state modelling.** Multiple booleans create impossible permutations; use discriminated unions or const-object enums.
- **No magic strings or numbers.** Extract named constants, with units where relevant.
- **Immutability:** arrays passed into or returned from shared helpers are `ReadonlyArray<T>`; never mutate input parameters.
- **Booleans are allowed** only in Zod schemas, `Result` discriminants, and pure predicates (`is*`, `has*`).

```typescript
// ❌ isReady: boolean; isBlocked: boolean
// ✅
type ResponseState =
  | { readonly status: 'idle' }
  | { readonly status: 'pending' }
  | { readonly status: 'delivered'; readonly bytes: Uint8Array }
  | { readonly status: 'blocked' }
```

---

## 4. Boundary Validation

- Every payload crossing into the UI from outside (tRPC responses, HTTP dev-server responses, file reads, environment variables) is parsed with Zod before use. Validation schemas reject unexpected properties with `.strict()`.
- Use `schema.parse()` where a validation failure should propagate, `safeParse()` where it must be handled.
- Infer types from schemas: `type Input = z.infer<typeof InputSchema>`. Do not hand-write a type that duplicates a schema.
- Coerce only where explicitly needed (`z.coerce.date()`); never `z.any()`.
- Read environment configuration in exactly one module; never elsewhere.
- Files chosen by the human (audio, image, video, documents) are untrusted: validate type and size before handing bytes to the tRPC client. Privacy-tier and content enforcement remain the Rust shell's job; the UI never claims to enforce them.

---

## 5. Error Handling

- Functions that can fail return `Result<T, E>`; no raw `throw` outside adapter code at the tRPC boundary.

```typescript
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }
```

- The UI maps error variants to user-facing messages. It never displays stack traces, internal messages, or raw engine error codes.
- Blocked or refused outcomes (`perception-blocked`, `output-blocked`) are shown honestly as an acknowledgment, never as silence and never as a generic failure.
- Never log secrets, tokens, or raw PII; no `console.log` in committed code.

---

## 6. Code Hygiene

- One function, one responsibility. Prefer guard clauses over nested conditionals; keep the primary path flat.
- **Named exports only.** Default exports only where a framework contract requires one (for example a route module). No barrel `index.ts` inside internal folders.
- No circular imports; break cycles with dependency injection.
- `const` over `let`; never `var`. `async/await` over promise chains.
- No commented-out code; version control preserves history.
- No `TODO` / `FIXME` without a ticket reference: `// TODO(K-XXXX): …`.
- No side effects in pure helpers.

---

## 7. Naming Conventions

| Thing | Convention | Example |
| --- | --- | --- |
| React components (file and export) | `PascalCase` | `CoreStatus.tsx` |
| Providers | `PascalCase` | `SessionProvider.tsx` |
| Hooks (file and export) | `useCamelCase` | `useSession.ts`, `useGrant.ts` |
| Other files and directories | `kebab-case` | `trpc.ts`, `lib/` |
| Types and interfaces | `PascalCase` | `ResponseState` |
| Functions and variables | `camelCase` | `sendText` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_BYTES` |

No project-name prefix on any name (`docs/code-standards.md` §3).

---

## 8. Date and Time

- Store and transmit timestamps in UTC as ISO 8601 or epoch values; never with an offset.
- Never compare dates as strings.
- Display formatting and time-zone conversion happen at the view layer only.
- Timestamps that feed the engine (`received_at`, `created_at`) are supplied by the shell, not invented by the UI.

---

## 9. Testing

- **Tools:** Vitest for unit and integration tests, Playwright for end-to-end, MSW for HTTP and WebSocket mocks. *(Configs not yet created — §1.)*
- **Scope:** the interface layer is tested on key paths and on error mapping; the UI on critical workflows (session start, text/audio/image/video input, response display, grant management) end to end.
- One test file per unit, mirroring its source name. Arrange / Act / Assert; one assertion concept per test; no `describe` nesting deeper than two levels.
- Test behavior, not implementation. Never mock at the network level in a unit test; use MSW in integration tests.
- No numeric coverage percentage is enforced until tooling exists (`docs/code-standards.md` §5).

---

## 10. Tooling

- **Biome** is the single linter and formatter (replaces ESLint and Prettier). Target configuration:

```json
{
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "organizeImports": { "enabled": true }
}
```

- Package manager: `pnpm`. Dev server: `pnpm dev` (port 5173). Production build: `pnpm build`.
- Pin the toolchain to an explicitly supported Node LTS version.

---

## 11. Dependencies

The declared UI stack is React, Vite, TanStack, the tRPC client, and Zod, with Biome, Vitest, Playwright, and MSW as tooling. Anything else needs a DDA declaration and a decision entry in `.playbook/kit/02-exploration.md` before use (`docs/code-standards.md` §6). Confirm the list against `rust-shell/ui/package.json` when UI work resumes.

---

## 12. AI Constraints — TypeScript Anti-Patterns

When generating TypeScript for this project, never:

- use `any`, `!`, or an unjustified `as`;
- infer return types on exports;
- model state with multiple booleans;
- put business logic or memory semantics in a component or hook — the UI transports and presents;
- import across a layer boundary or between modules directly;
- validate by hand what a Zod schema already covers;
- swallow an error, or show one raw;
- leave a code path unhandled, or generate a stub;
- add a dependency not declared in the planning doc;
- generate UI code ahead of its `.playbook/ui/` planning doc.

---

## 13. Phase Gates

Run before closing any phase that touched TypeScript. General gates are in `docs/code-standards.md` §8.

- [ ] `cd rust-shell/ui && pnpm build` succeeds
- [ ] `tsc --noEmit` exits clean
- [ ] *(when configured — `K-UI-TOOLING-SETUP`)* `biome check` and `biome format` clean; Vitest passes; Playwright critical workflows pass
- [ ] No `any`, `!`, or unjustified `as`; every export has an explicit return type
- [ ] All external payloads validated with Zod `.strict()`
- [ ] No `console.log`, commented-out code, or un-ticketed `TODO`

---

## Revision Notes

- **2026-09-20** — Created from the TypeScript-specific rules formerly mixed into `docs/code-standards.md` (D31), rebuilt on the v3.2 reference that previously occupied this filename. Adapted to Sage's thin interface layer: DDD entity/aggregate rules, Nx module-boundary tags, ORM adapter language, and git tables were intentionally not carried forward. §7 reflects the actual PascalCase component and `useX` hook filenames in `rust-shell/ui/src/`. §1 records that Biome and Playwright configs do not exist yet and are deferred to UI work (D33).
