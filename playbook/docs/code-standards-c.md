# docs/code-standards-c.md
# Project Sage — C11 Code Standards

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
typedef sage_result_t (*handler_fn)(sage_ctx_t *ctx);

static const handler_fn dispatch[STATE_COUNT] = {
    [STATE_INIT]    = handle_init,
    [STATE_ACTIVE]  = handle_active,
    [STATE_MIGRATE] = handle_migrate,
    [STATE_PURGED]  = handle_purged,
};

sage_result_t sage_dispatch(sage_ctx_t *ctx) {
    if (ctx->state >= STATE_COUNT) return SAGE_ERR_INVALID;
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
/* Opaque predicate: always true, not statically provable */
static volatile uint32_t _sage_op_seed = 0x9E3779B9U;

#define SAGE_OPAQUE_TRUE \
    ((_sage_op_seed ^ (_sage_op_seed >> 16)) != 0xFFFFFFFFU)

#define SAGE_OPAQUE_FALSE \
    ((_sage_op_seed & (_sage_op_seed + 1U)) == 0xFFFFFFFFU)
```

Usage:
```c
if (SAGE_OPAQUE_TRUE && actual_condition) {
    /* real path */
}
```

- `_sage_op_seed` must be `volatile` to prevent compiler elimination
- Do not document what the predicate "really" evaluates to in inline comments
- Place at least one opaque predicate per exported function in engine components

### 3.3 `STRING_XOR` — Compile-Time String Obfuscation

No plaintext string literals in `src/core/engine/` or `src/shared/`. All string constants must be XOR-encoded at compile time and decoded into stack buffers at runtime. Buffers are zeroed immediately after use.

**Pattern:**
```c
/* XOR key — one per compilation unit, defined at top of .c file */
#define _SAGE_XK 0x5AU

/* Encode a string literal into an obfuscated byte array */
#define SAGE_STR_ENC(name, str) \
    static const uint8_t name[] = { \
        _SAGE_XK_APPLY(str) \
    }

/* Runtime decode into a stack buffer, use, then zero */
#define SAGE_STR_USE(enc, buf, body) \
    do { \
        char buf[sizeof(enc)]; \
        for (size_t _i = 0; _i < sizeof(enc); _i++) \
            buf[_i] = (char)(enc[_i] ^ _SAGE_XK); \
        body \
        memset(buf, 0, sizeof(buf)); \
    } while (0)
```

- XOR key (`_SAGE_XK`) must differ per `.c` file — defined at the top of each file
- Decoded buffers are always stack-allocated, never heap
- `memset` zero after use is mandatory; compiler must not optimize it out — use `memset` followed by a `volatile` read barrier if LTO is active
- Log strings are also subject to this rule; use `sage_log_*` stubs only, never raw `printf`

### 3.4 `PTR_INDIRECT` — Function Pointer Indirection

Direct function calls in sensitive paths are replaced with calls through pointer tables or opaque handles. This defeats static call-graph reconstruction.

**Pattern:**
```c
/* In header — expose only opaque handle */
typedef struct sage_op_table sage_op_table_t;
const sage_op_table_t *sage_get_ops(void);

/* In implementation — table is static, never exported */
static sage_result_t _op_compress(sage_ctx_t *ctx) { ... }
static sage_result_t _op_hash(sage_ctx_t *ctx)     { ... }

static const struct sage_op_table {
    sage_result_t (*compress)(sage_ctx_t *);
    sage_result_t (*hash)(sage_ctx_t *);
} _ops = {
    .compress = _op_compress,
    .hash     = _op_hash,
};

const sage_op_table_t *sage_get_ops(void) { return &_ops; }
```

- All internal handlers are `static`
- Public API exposes only opaque pointers or result codes, never internal function addresses
- Applied to all inter-component call boundaries in `src/core/engine/`

### 3.5 `ZERO_SENSITIVE` — Zeroing Sensitive Data

Any variable holding a key, hash, fingerprint, decoded string, or graph-derived value must be explicitly zeroed as soon as it is no longer needed.

**Pattern:**
```c
uint8_t key[32];
derive_key(key, sizeof(key), seed);

/* ... use key ... */

/* Zero immediately after use */
memset(key, 0, sizeof(key));
/* Volatile read barrier to prevent LTO elimination */
(void)(*(volatile uint8_t *)key);
```

- Applied to all stack and heap buffers holding sensitive values
- Applied at every early-return path, not just the nominal exit
- Use a helper macro `SAGE_ZERO(ptr, len)` defined in `src/shared/memory.h` that wraps the memset + volatile barrier

---

## 4. Symbol Visibility

- All internal functions: `static` — never exported
- All exported public API symbols: explicitly annotated `__attribute__((visibility("default")))` in a single `sage_api.h` header
- Everything else: compiled with `-fvisibility=hidden` (enforced in release build flags)
- No global mutable state is exported; all module state is encapsulated in opaque structs passed by pointer

---

## 5. Memory Rules

- No heap allocation in signal nodes (Layer 1) — this is an architectural invariant, not just a style preference
- All other components: heap allocation permitted via `sage_alloc` / `sage_free` wrappers in `src/shared/memory.h` only — never direct `malloc`/`free`
- Stack allocations for sensitive buffers must be bounded and explicitly sized — no VLAs in secure paths
- `SAGE_ZERO` applied to all sensitive stack buffers at scope exit

---

## 6. Error Handling

- All functions return `sage_result_t` — no exceptions, no abort(), no assert() in release builds
- `_Static_assert` for compile-time invariants only
- Error propagation is explicit — every call site checks the return value
- On error, sensitive buffers are zeroed before returning
- `SAGE_ERR_*` codes defined in `src/shared/result.h` — no raw integer error codes anywhere

---

## 7. Naming Conventions

| Scope | Convention | Example |
|---|---|---|
| Public API | `sage_<module>_<verb>` | `sage_primitive_mint` |
| Internal static | `_<verb>_<noun>` | `_compress_chunk` |
| Constants / macros | `SAGE_<NAME>` | `SAGE_FINGERPRINT_SIZE` |
| Types | `sage_<name>_t` | `sage_ctx_t` |
| Opaque predicates | `SAGE_OPAQUE_*` | `SAGE_OPAQUE_TRUE` |
| Hardening macros | `SAGE_<PATTERN>` | `SAGE_ZERO`, `SAGE_STR_USE` |

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
- [ ] No heap allocation (signal nodes) / sage_alloc only (other components)
- [ ] All return values checked; sage_result_t propagated
```

---

## 9. What AI Must Not Do

When generating C11 code for this project:

- Do not simplify or "clean up" obfuscation patterns for readability
- Do not remove opaque predicates because they appear redundant
- Do not collapse dispatch tables into switch statements
- Do not inline string literals even in test or stub code inside `src/`
- Do not add comments that explain what an obfuscation pattern "really" does
- Do not deviate from DDA doc specifications on the grounds that the code "looks wrong"
- The DDA doc is always correct; the code must match it, not the other way around
