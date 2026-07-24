# docs/code-standards-rust.md
# Rust Code Standards

This document is the authoritative standard for all Rust code in `rust-shell/`. It is a mandatory gate in the Playbook pipeline. No component is considered complete unless it satisfies every applicable section below. AI code generation must follow this document mechanically; the source code is intentionally hostile to reading and must not be interpreted or reasoned about aesthetically.

---

## 1. Language Baseline

- **Edition:** Rust 2021
- **MSRV:** Defined in `rust-shell/Cargo.toml` — no deviation without a DDA doc update
- No `unsafe` blocks except in `ffi.rs` and explicitly DDA-documented FFI boundary files
- All `unsafe` blocks must have a `// SAFETY:` comment stating the precise invariant being upheld
- Compile clean at `RUSTFLAGS="-D warnings"` — zero warnings in release
- No external crates outside those listed in `Cargo.toml` — no new dependencies without a DDA doc entry

---

## 2. Release Build Contract

`rust-shell/Cargo.toml` release profile — mandatory, non-negotiable:

```toml
[profile.release]
opt-level       = 3
lto             = true
codegen-units   = 1
panic           = "abort"
strip           = "symbols"
debug           = false
overflow-checks = false
```

Additional `RUSTFLAGS` applied in the release build script:

```sh
RUSTFLAGS="-C target-cpu=native -C link-arg=-s -C force-frame-pointers=no"
```

- `codegen-units = 1` is mandatory — it enables full cross-crate inlining and eliminates predictable module boundaries in the binary
- `panic = "abort"` eliminates unwinding infrastructure from the binary
- `strip = "symbols"` removes all symbol tables
- Debug builds use `opt-level = 0`, `debug = true`, and none of the above hardening flags

---

## 3. Mandatory Hardening Patterns

Every module in `rust-shell/src/` must apply **all** of the following patterns unless its DDA doc explicitly marks a pattern as `NOT APPLICABLE` with rationale.

### 3.1 `DISPATCH_TABLE` — Trait Object Dispatch Over Generics

In sensitive paths, prefer `dyn Trait` dispatch over generic monomorphization. Monomorphized generics produce multiple copies of recognizably structured code that static analysis can correlate. Dynamic dispatch through trait objects produces a vtable-indirected call that is harder to trace.

**Pattern:**
```rust
// Define the operation contract
trait Op: Send + Sync {
    fn execute(&self, ctx: &mut Ctx) -> EngineResult;
}

// Concrete implementations are private to their module
struct CompressOp;
impl Op for CompressOp {
    fn execute(&self, ctx: &mut Ctx) -> EngineResult { ... }
}

// Dispatcher holds boxed trait objects — not generic parameters
struct Dispatcher {
    ops: Vec<Box<dyn Op>>,
}
```

- Applied to all inter-component dispatch in `rust-shell/src/`
- Concrete handler types are never `pub`
- Vtable indirection is the point — do not refactor to generics for "performance" in sensitive paths

### 3.2 `OPAQUE_PRED` — Opaque Predicates

Insert opaque predicates at exported function entry points and key branch boundaries. Use `std::hint::black_box` to prevent the compiler from evaluating them statically.

**Pattern:**
```rust
use std::hint::black_box;

// Obfuscation seed — module-level, never exported
static OBFUSCATION_SEED: u32 = 0x9E3779B9;

macro_rules! opaque_true {
    () => {{
        let s = black_box(OBFUSCATION_SEED);
        (s ^ (s >> 16)) != 0xFFFF_FFFF
    }};
}

macro_rules! opaque_false {
    () => {{
        let s = black_box(OBFUSCATION_SEED);
        (s & s.wrapping_add(1)) == 0xFFFF_FFFF
    }};
}
```

Usage:
```rust
pub fn process(ctx: &mut Ctx) -> EngineResult {
    if opaque_true!() && ctx.is_ready() {
        // real path
    }
    ...
}
```

- `black_box` is mandatory — without it, the compiler eliminates the predicate
- At least one `opaque_true!()` guard per `pub` function in engine-adjacent modules
- Do not comment on what the predicate evaluates to

### 3.3 `STRING_XOR` — Compile-Time String Obfuscation

No plaintext string literals in `rust-shell/src/`. All string constants are XOR-encoded as byte arrays at compile time via a macro and decoded into stack-local `Vec<u8>` or `[u8; N]` buffers at runtime. Buffers are zeroed immediately after use.

**Pattern:**
```rust
// XOR key — one per module file, defined at module top
const STR_XOR_KEY: u8 = 0x5A;

macro_rules! str_xor_encode {
    ($s:literal) => {{
        const BYTES: &[u8] = $s.as_bytes();
        const LEN: usize = BYTES.len();
        const fn encode() -> [u8; LEN] {
            let mut out = [0u8; LEN];
            let mut i = 0;
            while i < LEN {
                out[i] = BYTES[i] ^ STR_XOR_KEY;
                i += 1;
            }
            out
        }
        encode()
    }};
}

macro_rules! str_xor_decode {
    ($enc:expr, $body:expr) => {{
        let mut buf: Vec<u8> = $enc.iter().map(|b| b ^ STR_XOR_KEY).collect();
        $body(&buf);
        // Zero after use
        for b in buf.iter_mut() { *b = 0; }
        drop(buf);
    }};
}
```

- `STR_XOR_KEY` must differ per module file — defined at the top of each `mod.rs` or `*.rs` file
- Decoded buffers are always stack or short-lived heap — never stored in struct fields
- Zeroing after use is mandatory
- Log strings follow the same rule — pass through `log_*` stubs only

### 3.4 `ZERO_ON_DROP` — Zeroizing Sensitive Types

Any type holding a key, fingerprint, decoded string, or derived secret must implement `Drop` to zero its memory. No exceptions.

**Pattern:**
```rust
struct SecretKey([u8; 32]);

impl Drop for SecretKey {
    fn drop(&mut self) {
        // SAFETY: write_volatile is required to prevent the compiler from
        // eliminating zeroing in Drop. This is a documented, DDA-approved
        // unsafe site — the only acceptable use of unsafe outside ffi.rs
        // for this purpose.
        for b in self.0.iter_mut() {
            unsafe { std::ptr::write_volatile(b, 0u8); }
        }
    }
}
```

- `write_volatile` is required — the compiler is permitted to eliminate plain assignment zeroing in `Drop`
- Applied to every type in `rust-shell/src/` that touches key material, fingerprint arrays, or decoded secrets
- These types are never `Clone` or `Copy`
- These types are never logged, serialized to plaintext, or passed across an FFI boundary in plaintext

### 3.5 `INLINE_CONTROL` — Deliberate Inlining Directives

Use `#[inline(always)]` and `#[inline(never)]` deliberately to break recognizable function boundaries in the binary. This is not a performance optimization — it is a structural obfuscation tool.

**Rules:**
- Short, hot internal helpers: `#[inline(always)]` — forces them to disappear into callers
- Sensitive top-level handlers that should not be traceable as a unit: `#[inline(never)]` — prevents the compiler from merging or collapsing them
- Do not use `#[inline]` (without qualifier) in `rust-shell/src/` — always be explicit

```rust
#[inline(always)]
fn compress_chunk(buf: &[u8]) -> u64 { ... }

#[inline(never)]
pub fn process_input(ctx: &mut Ctx, input: &[u8]) -> EngineResult { ... }
```

---

## 4. Visibility Rules

- All internal types, functions, and constants: `pub(crate)` or private — never `pub` unless they form part of the explicit public API surface
- Public API surface is defined in `rust-shell/src/lib.rs` only — re-exports are explicit, not `pub use *`
- FFI boundary symbols in `ffi.rs` are the only `#[no_mangle]` items in the codebase
- `pub(super)` used for intra-module visibility; `pub(crate)` for cross-module; `pub` only for the external API surface

---

## 5. FFI Boundary Rules

These apply exclusively to `ffi.rs` and any file its DDA doc explicitly designates as an FFI boundary:

- Every `extern "C"` function is `#[no_mangle]`
- Every `unsafe` block has a `// SAFETY:` comment
- All pointers crossing the boundary are validated for null before use
- Rust types never cross the boundary — only C-compatible primitives (`u8`, `u32`, `u64`, raw pointers, `*const`, `*mut`)
- Strings never cross the boundary as `&str` or `String` — only as `*const u8` + length
- All FFI functions zero any sensitive output buffers on error before returning

---

## 6. Error Handling

- All functions return `EngineResult<T>` — no `unwrap()`, no `expect()`, no `panic!()` in `src/` outside of tests
- `?` propagation is the standard pattern
- On error paths, `ZERO_ON_DROP` types handle their own cleanup automatically — verify this is not bypassed by `std::mem::forget` or similar
- Error variants defined in `rust-shell/src/error.rs` — no raw string errors, no `anyhow` or `thiserror` unless already in `Cargo.toml`
- `panic = "abort"` in release means any panic is fatal — this is intentional; panics must not be reachable in release paths

---

## 7. Naming Conventions

| Scope | Convention | Example |
|---|---|---|
| Public API types | `PascalCase` | `Ctx`, `Fingerprint` |
| Internal types | `PascalCase` | `CompressOp`, `KeyBuffer` |
| Sensitive types (with Drop) | `Secret<Name>` or descriptive | `SecretKey`, `Fingerprint` |
| Public functions | `snake_case` | `process_input` |
| Internal functions | `snake_case` | `compress_chunk` |
| Constants | `UPPER_SNAKE_CASE` | `FINGERPRINT_SIZE` |
| Obfuscation seed | `OBFUSCATION_SEED` | `OBFUSCATION_SEED` |
| Hardening macros | `snake_case!` | `opaque_true!`, `str_xor_encode!` |

---

## 8. Per-Component Hardening Checklist

Every component DDA doc must include a hardening checklist section confirming the following before the component is marked complete:

```
## Hardening Checklist
- [ ] DISPATCH_TABLE: dyn Trait used over generics in all sensitive dispatch paths
- [ ] OPAQUE_PRED: opaque_true!() at all pub function entry points
- [ ] STRING_XOR: no plaintext string literals in src/; str_xor_encode! applied
- [ ] ZERO_ON_DROP: all sensitive types implement Drop with write_volatile zeroing
- [ ] INLINE_CONTROL: #[inline(always)] / #[inline(never)] applied deliberately
- [ ] Visibility: all internals pub(crate) or private; pub only at lib.rs boundary
- [ ] FFI boundary: null checks, SAFETY comments, no Rust types crossing boundary
- [ ] No unwrap/expect/panic in release paths
- [ ] EngineResult<T> returned from all fallible functions
- [ ] Release profile flags verified in Cargo.toml
- [ ] No new external crate dependencies introduced
```

---

## 9. AI Constraints

When generating Rust code for this project:

- Do not replace `dyn Trait` with generics for "performance" in sensitive paths
- Do not remove opaque predicates because they appear unreachable or redundant
- Do not simplify `ZERO_ON_DROP` implementations to plain assignment
- Do not add `#[derive(Clone)]` or `#[derive(Copy)]` to sensitive types
- Do not inline string literals even in stub or test code inside `rust-shell/src/`
- Do not add comments explaining what an obfuscation pattern "really" evaluates to
- Do not deviate from DDA doc specifications on the grounds that the code "looks wrong"
- Do not introduce new `Cargo.toml` dependencies without a corresponding DDA doc update
- The DDA doc is always correct; the code must match it, not the other way around
