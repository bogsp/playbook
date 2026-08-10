---
File: docs/code-standards-c.md

Version:
Scope:
Usage:
---

# C11 Code Standards

This document is the authoritative standard for all C11 code in `src/`. It is a mandatory gate in the Playbook pipeline. No component is considered complete unless it satisfies every applicable section below. AI code generation must follow this document mechanically; the source code is intentionally hostile to reading and must not be interpreted or reasoned about aesthetically.

---

## 1. Language Baseline

- Standard: **C11** (`-std=c11`) strictly enforced
- No compiler extensions unless explicitly noted in the component's DDA doc
- No external libraries; no heap allocation in signal nodes (see DDA constraint per component)
- All files must compile cleanly at `-Wall -Wextra -Wpedantic -Werror` with zero warnings
- `_Static_assert` used to enforce structural invariants at compile time wherever possible

---

## 2. Release Build Contract

Every release build **must** apply the following flags. These are non-negotiable and enforced in the `Makefile` release target:

```makefile
CFLAGS_RELEASE = \
  -std=c11 \
  -O3 \
  -flto \
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

Debug builds use `-O0 -g3` and none of the above hardening flags. Debug and release are strictly separated; no hardening flag ever appears in a debug build.

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

---

## 5. Memory Rules

- No heap allocation in signal nodes (Layer 1) — this is an architectural invariant, not just a style preference
- All other components: heap allocation permitted via `mem_alloc` / `mem_free` wrappers in `src/shared/memory.h` only — never direct `malloc`/`free`
- Stack allocations for sensitive buffers must be bounded and explicitly sized — no VLAs in secure paths
- `ZERO_SENSITIVE_BUF` applied to all sensitive stack buffers at every exit path

---

## 6. Error Handling

- All functions return `result_t` — no exceptions, no `abort()`, no `assert()` in release builds
- `_Static_assert` for compile-time invariants only
- Error propagation is explicit — every call site checks the return value
- On error, sensitive buffers are zeroed before returning
- `ERR_*` codes defined in `src/shared/result.h` — no raw integer error codes anywhere

---

## 7. Naming Conventions

- Internal functions and variables must be `static`
- Headers must represent a single domain only
- Public headers expose only opaque types

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
- The DDA doc is always correct; the code must match it, not the other way around
