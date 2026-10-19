---
file: 'docs/code-standards-c.md'
responsibility: 'Authoritative standard for all C11 code in src/ — language baseline, release build contract, five mandatory hardening patterns, per-component checklist, testing, dependency rules, and AI constraints.'
ai_instructions: 'Load for any C11 work in src/ alongside docs/code-standards.md and .playbook/engine-c/_index.md. Follow this document mechanically — the source code is intentionally hostile to reading and must not be interpreted or reasoned about aesthetically. The DDA doc is always correct; the code matches it.'
archive_rule: 'N/A — living document. Version changes in place; record each change under Revision Notes at the bottom.'
project: 'Project Sage'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# C11 Code Standards

This document is the authoritative standard for all C11 code in `src/`. It is a mandatory gate in the Playbook pipeline. No component is considered complete unless it satisfies every applicable section below. AI code generation must follow this document mechanically; the source code is intentionally hostile to reading and must not be interpreted or reasoned about aesthetically.

Companion documents: [code-standards.md](./code-standards.md) (cross-language rules, testing gates, AI rules) and [code-standards-rust.md](./code-standards-rust.md). Current compliance status is tracked in `.playbook/kit/03-execution.md` Known Issues, not in this file.

---

## 1. Language Baseline

- Standard: **C11** (`-std=c11`) strictly enforced
- No compiler extensions unless explicitly noted in the component's DDA doc
- No external libraries; no heap allocation in signal nodes (see DDA constraint per component)
- All files must compile cleanly under the `Makefile`'s `CFLAGS_BASE` with zero warnings:

```
-std=c11 -Wall -Wextra -Werror -Wpedantic -Wstrict-prototypes
-Wmissing-prototypes -Wshadow -Wconversion -Wdouble-promotion
-Wformat=2 -Wformat-security -Wundef -fstack-protector-strong -fPIC
```

- `_Static_assert` used to enforce structural invariants at compile time wherever possible

---

## 2. Release Build Contract

Every release build **must** apply the following hardening set. The listed GNU flags are enforced by the Linux `Makefile` release target (`make BUILD=release lib`) and mirrored for the Rust bridge in `rust-shell/build.rs`, which branches on Cargo's `PROFILE`:

```makefile
CFLAGS_RELEASE = \
  $(CFLAGS_BASE) \
  -O3 \
  -flto \
  -ffat-lto-objects \
  -fvisibility=hidden \
  -ffunction-sections \
  -fdata-sections \
  -fno-asynchronous-unwind-tables \
  -fno-unwind-tables \
  -fomit-frame-pointer \
  -g0 \
  -DNDEBUG

LDFLAGS_RELEASE = \
  -Wl,--gc-sections \
  -Wl,--strip-all \
  -Wl,-s
```

- `-ffat-lto-objects` accompanies `-flto` so the archived objects stay linkable by rustc's non-GCC linker driver when the bridge is built through Cargo. It is an engineering safeguard, not a relaxation of the hardening set.
- On Apple targets, Clang does not support `-ffat-lto-objects`; keep `-flto` and omit only that GCC archive option. Apple linker equivalents are `-dead_strip`, `-S`, and `-x` for section removal and symbol/debug stripping; use `-multiply_defined,suppress` for the existing duplicate-symbol fallback. GNU targets retain the exact flags above.
- Debug builds use `-O0 -g3` on top of `CFLAGS_BASE`. The §2 release flags (LTO, visibility, section GC, unwind-table removal, symbol stripping, `-DNDEBUG`) **never** appear in a debug build. Debug and release are strictly separated.
- Test builds add the test-build macro (`TESTING`) and `-Itests/support` (see §10); that macro is never defined in a release build or in `make lib` output.

---

## 3. Mandatory Hardening Patterns

Every component in `src/core/engine/` and `src/shared/` must apply **all** of the following patterns unless its DDA doc explicitly marks a pattern as `NOT APPLICABLE` with rationale.

### 3.1 `DISPATCH_TABLE` — Control Flow Flattening

Do not use `if/else` chains or `switch` statements for any logic path with more than two branches in sensitive components. Instead, use function pointer dispatch tables.

**Pattern:**

```c
typedef result_t (*handler_fn)(ctx_t *ctx);

static const handler_fn dispatch[STATE_COUNT] = {
    [STATE_INIT]    = handle_init,
    [STATE_ACTIVE]  = handle_active,
    [STATE_MIGRATE] = handle_migrate,
    [STATE_PURGED]  = handle_purged,
};

result_t dispatch_state(ctx_t *ctx) {
    if (ctx->state >= STATE_COUNT) return ERR_INVALID;
    return dispatch[ctx->state](ctx);
}
```

- Table indices must be validated before dispatch (bounds check always present)
- Handler functions must be `static` and not exported
- Table must be `const` and placed in read-only section

### 3.2 `OPAQUE_PRED` — Opaque Predicates

Insert opaque predicates at key branch points. These are conditions that always evaluate to a known value at runtime but appear data-dependent to static analysis.

**Pattern:**

```c
/* Obfuscation seed — volatile to prevent compiler elimination */
static volatile uint32_t _obf_seed = 0x9E3779B9U;

#define OBFUSCATE_PRED_TRUE \
    ((_obf_seed ^ (_obf_seed >> 16)) != 0xFFFFFFFFU)

#define OBFUSCATE_PRED_FALSE \
    ((_obf_seed & (_obf_seed + 1U)) == 0xFFFFFFFFU)
```

Usage:

```c
if (OBFUSCATE_PRED_TRUE && actual_condition) {
    /* real path */
}
```

- `_obf_seed` must be `volatile` to prevent compiler elimination
- Do not document what the predicate "really" evaluates to in inline comments
- Place at least one opaque predicate per exported function in engine components
- A DDA may carve out low-sensitivity boot-path initializers (for example `id_registry_init`) as unguarded; the carve-out must be written in that DDA, not assumed

### 3.3 `STRING_XOR` — Compile-Time String Obfuscation

No plaintext string literals in `src/core/engine/` or `src/shared/`. All string constants must be XOR-encoded at compile time and decoded into stack buffers at runtime. Buffers are zeroed immediately after use.

**Pattern:**

```c
/* XOR key — one per compilation unit, defined at top of .c file */
#define _STR_XOR_KEY 0x5AU

/*
 * Expand a string literal byte-by-byte, XORing each character.
 * Used internally by STR_XOR_ENCODE to populate the encoded array.
 * Requires a X-macro or per-character expansion at the call site.
 *
 * Portable single-byte expansion — define per file as needed:
 *   #define _XK_BYTE(c) ((uint8_t)((c) ^ _STR_XOR_KEY)),
 * Then pass each character explicitly, or use a code-generation
 * step to produce the encoded initializer list.
 */

/* Declare a static encoded byte array for a string constant */
#define STR_XOR_ENCODE(name, ...) \
    static const uint8_t name[] = { __VA_ARGS__ }

/* Runtime decode into a stack buffer, execute body, then zero */
#define STR_XOR_DECODE(enc, buf, body) \
    do { \
        char buf[sizeof(enc)]; \
        for (size_t _i = 0; _i < sizeof(enc); _i++) \
            buf[_i] = (char)(enc[_i] ^ _STR_XOR_KEY); \
        body \
        memset(buf, 0, sizeof(buf)); \
        (void)(*(volatile char *)buf); \
    } while (0)
```

- `_STR_XOR_KEY` must differ per `.c` file — defined at the top of each file
- Decoded buffers are always stack-allocated, never heap
- `memset` zero after use is mandatory; the volatile read barrier immediately following prevents LTO from eliminating it
- Log strings are also subject to this rule; use `log_*` stubs only, never raw `printf`
- Emitted or meaningful strings (log event names, MIME types) are encoded; purely internal dispatch keys may stay plain where the DDA says so

### 3.4 `PTR_INDIRECT` — Function Pointer Indirection

Direct function calls in sensitive paths are replaced with calls through pointer tables or opaque handles. This defeats static call-graph reconstruction.

**Pattern:**

```c
/* In header — expose only the opaque table type */
typedef struct op_table op_table_t;
const op_table_t *get_op_table(void);

/* In implementation — table is static, never exported */
static result_t _op_compress(ctx_t *ctx) { ... }
static result_t _op_hash(ctx_t *ctx)     { ... }

static const struct op_table {
    result_t (*compress)(ctx_t *);
    result_t (*hash)(ctx_t *);
} _ops = {
    .compress = _op_compress,
    .hash     = _op_hash,
};

const op_table_t *get_op_table(void) { return &_ops; }
```

- All internal handlers are `static`
- Public API exposes only opaque pointers or result codes, never internal function addresses
- Applied to all inter-component call boundaries in `src/core/engine/`

### 3.5 `ZERO_SENSITIVE` — Zeroing Sensitive Data

Any variable holding a key, hash, fingerprint, decoded string, or derived secret must be explicitly zeroed as soon as it is no longer needed.

**Pattern:**

```c
uint8_t key[32];
derive_key(key, sizeof(key), seed);

/* ... use key ... */

/* Zero immediately after use — macro defined in src/shared/memory.h */
ZERO_SENSITIVE_BUF(key, sizeof(key));
```

Where `ZERO_SENSITIVE_BUF` is defined in `src/shared/memory.h` as:

```c
#define ZERO_SENSITIVE_BUF(ptr, len) \
    do { \
        memset((ptr), 0, (len)); \
        (void)(*(volatile uint8_t *)(ptr)); \
    } while (0)
```

- Applied to all stack and heap buffers holding sensitive values
- Applied at every early-return path, not just the nominal exit
- The volatile read barrier prevents LTO from eliminating the `memset`

---

## 4. Symbol Visibility

- All internal functions: `static` — never exported
- All exported public API symbols: explicitly annotated `__attribute__((visibility("default")))` in a single `api.h` header
- Everything else: compiled with `-fvisibility=hidden` (enforced in release build flags)
- No global mutable state is exported; all module state is encapsulated in opaque structs passed by pointer
- The relational graph is never a module-level global: every component that reads or writes it receives `graph_t *` from the bridge (D14; the single authoritative instance is `g_graph` in `rust-shell/src/engine_bridge.c`)

---

## 5. Memory Rules

- No heap allocation in signal nodes (Layer 1) — this is an architectural invariant, not just a style preference
- All other components: heap allocation permitted via `mem_alloc` / `mem_free` in `src/shared/memory.h` only — never direct `malloc`/`free`
- Stack allocations for sensitive buffers must be bounded and explicitly sized — no VLAs in secure paths
- `ZERO_SENSITIVE_BUF` applied to all sensitive stack buffers at every exit path
- Pools are fixed-capacity and bridge-owned; exceeding capacity returns `ERR_OVERFLOW`, never grows silently

---

## 6. Error Handling

- All functions return `result_t` — no exceptions, no `abort()`, no `assert()` in release builds
- `_Static_assert` for compile-time invariants only
- Error propagation is explicit — every call site checks the return value
- Output parameters are written only on success — never on failure
- On error, sensitive buffers are zeroed before returning
- `ERR_*` codes defined in `src/shared/result.h` — no raw integer error codes anywhere
- No partial state mutation on failure: all validation occurs before any write

---

## 7. Naming Conventions

- Internal functions and variables must be `static`
- Headers must represent a single domain only
- Public headers expose only opaque types
- **The project name appears in no active code name** (`docs/code-standards.md` §3; D32, D35). Allocation is `mem_alloc` / `mem_free`; results are `result_t` / `ERR_*`; constants are `<DOMAIN>_<NAME>` with no project-name lead. Active C names, test hooks, hardening names, headers, runner, binary, and archive use generic names after the 2026-10-05 cleanup. Historical records retain their original spellings; do not reintroduce project prefixes or add compatibility aliases. The stored `SAGEGRAPH2` snapshot magic remains unchanged for compatibility.
- Source files in `src/core/engine/` are `kebab-case` (`hash-fn-v1.c`); test-hook headers are `<component>_testing.h`

| Scope                   | Convention         | Example                                |
| ----------------------- | ------------------ | -------------------------------------- |
| Public API              | `<module>_<verb>`  | `primitive_mint`                       |
| Internal static         | `_<verb>_<noun>`   | `_compress_chunk`                      |
| Constants / macros      | `<DOMAIN>_<NAME>`  | `FINGERPRINT_SIZE`                     |
| Types                   | `<name>_t`         | `ctx_t`, `result_t`                    |
| Opaque predicate macros | `OBFUSCATE_PRED_*` | `OBFUSCATE_PRED_TRUE`                  |
| Hardening macros        | `<PATTERN>_*`      | `ZERO_SENSITIVE_BUF`, `STR_XOR_DECODE` |

---

## 8. Per-Component Hardening Checklist

Every component DDA doc must include a hardening checklist section confirming the following before the component is marked complete:

```
## Hardening Checklist
- [ ] DISPATCH_TABLE applied to all multi-branch control flow
- [ ] OPAQUE_PRED inserted at all exported function entry points
- [ ] STRING_XOR applied to all string literals
- [ ] PTR_INDIRECT applied at all inter-component call boundaries
- [ ] ZERO_SENSITIVE applied to all sensitive buffers at all exit paths
- [ ] Symbol visibility: all internals static, exports explicit
- [ ] Release build flags verified in Makefile target
- [ ] No external library calls
- [ ] No heap allocation (signal nodes) / mem_alloc only (other components)
- [ ] All return values checked; result_t propagated
```

---

## 9. AI Constraints

When generating C11 code for this project:

- Do not simplify or "clean up" obfuscation patterns for readability
- Do not remove opaque predicates because they appear redundant
- Do not collapse dispatch tables into switch statements
- Do not inline string literals even in test or stub code inside `src/`
- Do not add comments that explain what an obfuscation pattern "really" does
- Do not deviate from DDA doc specifications on the grounds that the code "looks wrong"
- Do not add modality branching, content interpretation, or a second signal reader (Signal Reader Principle, D4)
- Do not introduce a module-level global for the relational graph (D14)
- Do not record, log, hash, flag, or count anything on the c8 or s2 prohibited paths (zero-record guarantee)
- The DDA doc is always correct; the code must match it, not the other way around

---

## 10. Testing

Applies to `tests/` and to the test hooks inside `src/`.

- **Runner:** `make test` builds `build/engine_tests` from `tests/support/test_runner.c` with `CFLAGS_TEST` (`CFLAGS_DEBUG` plus `TESTING`) and `CPPFLAGS_TEST` (`-Itests/support`), then runs it. Test objects live under `build/test/`, separate from production objects, so running `make lib` after `make test` cannot reuse `TESTING` objects. `make m1` builds and runs only the Milestone 1 subset (`TEST_SRCS_M1`). The static archive is `build/libengine.a`; active names were synced under `K-NAME-CLEANUP` on 2026-10-05.
- **Layout:** `tests/core/engine/test_<component>.c` per engine component, `tests/shared/test_<module>.c` per shared module, and the runner in `tests/support/`.
- **Wiring:** every new test file is added to the matching `TEST_SRCS_*` group in the `Makefile` in the same change. A test file that is not wired in is an orphan and a defect.
- **Test hooks:** functions that reset state or force failures are declared in `<component>_testing.h` and compiled only under `#ifdef TESTING`. They must never be reachable from a release build or from `make lib`.
- **Coverage rule:** every exported function is tested on its success path and on each error path its DDA documents, including the "output parameters untouched on failure" guarantee. No numeric coverage percentage is enforced — none is measured.
- **Scope of hardening:** the §3 patterns apply to production source under `src/`. Files under `tests/` are exempt from the hardening patterns but not from the §1 warning flags.
- **No dead references:** tests must not include headers of retired components (`_superseded/` in `.playbook/engine-c/`).

---

## 11. Dependency Governance

- The engine has **zero** external dependencies — libc only. This is a supply-chain integrity invariant (D12): hashing, ID registries, and engram sealing are in-house.
- A new library, header, or vendored file requires a DDA declaration and a dated decision entry in `.playbook/kit/02-exploration.md` before any code uses it. AI must never add one unilaterally.

---

## 12. Phase Gates

Run before closing any phase that touched C11. General gates are in `docs/code-standards.md` §8.

- [ ] `make test` passes
- [ ] `make BUILD=release lib` builds with the §2 flag set and zero warnings
- [ ] Every touched component's Hardening Checklist (§8) is satisfied or marked `NOT APPLICABLE` with rationale
- [ ] No external library calls; allocation only through `mem_alloc` / `mem_free`
- [ ] No project-name prefix in new code; no new alias blocks
- [ ] New test files are wired into the `Makefile`
- [ ] `native-reviewer` run after native changes (`.cursor/agents/native-reviewer.md`)

---

## Revision Notes

- **2026-10-10** — Documented Apple Clang/linker equivalents for the Cargo-built engine while retaining the exact GNU release flags on GNU targets. This supports the hosted macOS build matrix without weakening the release hardening set.
- **2026-09-20** — Replaced the pre-consolidation header (blank `Version:` / `Scope:` / `Usage:`) with Tier 2 frontmatter per `.playbook/maintenance.md`. §1 now lists the actual `Makefile` `CFLAGS_BASE`. §2 now shows the actual release contract, including `-ffat-lto-objects` (K-BRIDGE-RELEASE-FLAGS) and clarifies that "hardening flags" means the §2 release set, not the shared base flags. Added §7 note on the retired `sage_` prefix and legacy alias blocks, expanded §9 with the Sage-specific invariants, and added §10 Testing and §11 Dependency Governance (recorded as added 2026-08-19 but absent from the copy on file). Pattern definitions §3.1–§3.5 are unchanged.
- **2026-09-20 (second pass)** — Split so that this file carries every C11-specific rule (general rules stay in `docs/code-standards.md`). Confirmed `mem_alloc` / `mem_free` as the canonical allocation wrappers (Creator, D32). Replaced the "legacy alias" note with the project-wide no-prefix rule and named the residual `sage_*` / `SAGE_*` names as `K-NAME-CLEANUP` defects. The test-build macro is now written as `TESTING` (the generic name); the tree still uses `TESTING` until that ticket lands. Added §12 Phase Gates.
- **2026-09-20 (third pass)** — §7 widened from the `sage_` prefix to the project name in any name (D35); file-private hardening names added to the residual list.
