---
file: 'docs/code-standards-rust.md'
responsibility: 'Authoritative standard for all Rust code in rust-shell/ — language baseline, release build contract, four mandatory hardening patterns, source-string policy, visibility, FFI rules, error handling, per-component checklist, testing, dependency rules, and AI constraints.'
ai_instructions: 'Load for any Rust shell work alongside docs/code-standards.md and .playbook/rust-shell/_index.md. Follow the applicable rules mechanically. Use the component DDA as the authority for its behavior and interfaces; keep implementation and DDA aligned.'
archive_rule: 'N/A — living document. Version changes in place; record each change under Revision Notes at the bottom.'
project: 'Project Sage'
project-type: software
domain-vocabulary: '.playbook/vocabulary-software/'
---

# Rust Code Standards

This document is the authoritative standard for all Rust code in `rust-shell/`. It is a mandatory gate in the Playbook pipeline. No component is considered complete unless it satisfies every applicable section below. AI code generation must follow this document mechanically; the source code is intentionally hostile to reading and must not be interpreted or reasoned about aesthetically.

Companion documents: [code-standards.md](./code-standards.md) (cross-language rules, testing gates, AI rules) and [code-standards-c.md](./code-standards-c.md). Current compliance status is tracked in `.playbook/kit/03-execution.md` Known Issues, not in this file.

---

## 1. Language Baseline

- **Edition:** Rust 2021
- **MSRV:** Defined in `rust-shell/Cargo.toml` — no deviation without a DDA doc update
- `unsafe_code` is denied at the crate root (`lib.rs`). No `unsafe` blocks except in `ffi.rs` and explicitly DDA-documented FFI boundary files; each permitted site carries a scoped, DDA-documented `#[allow(unsafe_code)]`
- All `unsafe` blocks must have a `// SAFETY:` comment stating the precise invariant being upheld
- Compile clean at `RUSTFLAGS="-D warnings"` — zero warnings in release
- `cargo clippy --manifest-path rust-shell/Cargo.toml -- -D warnings` and `cargo fmt --all --check` must both be clean
- No external crates outside those approved under §11 — no new dependencies without a DDA doc entry and an approved Dependency Register row (D72)

---

## 2. Release Build Contract

The release profile — mandatory, non-negotiable — is declared in the **workspace-root `Cargo.toml`** (applied 2026-10-06, `K-CARGO-PROFILE-CHECK`). Cargo ignores `[profile.*]` sections in a non-root workspace member, so a profile placed only in `rust-shell/Cargo.toml` has no effect while `rust-shell` is a member of the root workspace.

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

- No release build script that sets these `RUSTFLAGS` is recorded yet; `target-cpu=native` also makes binaries non-portable across machines. Whether and where to apply them is an open Creator decision.
- `codegen-units = 1` is mandatory — it enables full cross-crate inlining and eliminates predictable module boundaries in the binary
- `panic = "abort"` eliminates unwinding infrastructure from the binary
- `strip = "symbols"` removes all symbol tables
- Debug builds use `opt-level = 0`, `debug = true`, and none of the above hardening flags
- The C11 engine linked through `rust-shell/build.rs` is compiled with the matching `docs/code-standards-c.md` §2 release contract when Cargo's `PROFILE` is `release`

---

## 3. Mandatory Hardening Patterns and Source-String Rules

Every module in `rust-shell/src/` must apply the four hardening patterns in
§3.1–§3.2 and §3.4–§3.5 unless its DDA doc explicitly marks a pattern as
`NOT APPLICABLE` with rationale. The source-string rule in §3.3 also applies to
all project source. Approved third-party crates (§11) are not rewritten or
obfuscated; the wrapper module that calls them is subject to applicable rules,
and no third-party type, string, or error crosses a module's public boundary
unwrapped.

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

### 3.3 Source Strings and Sensitive Data

Ordinary Rust string literals are permitted, including error and log messages,
protocol values, internal dispatch keys, test fixtures, and compile-time
formatting templates. Do not embed secrets or sensitive user data in source
literals.

Fixed-key XOR encoding is reversible obfuscation. It does not provide
confidentiality when the key and encoded bytes ship in the same binary, and
runtime decoding/zeroing does not guarantee that copies made by formatting,
logging, error, or serialization APIs are erased. Do not add blanket string
obfuscation. A targeted obfuscation mechanism requires a documented threat
model, a concrete protected asset, and evidence that the mechanism provides a
measurable protection. Prefer established secret-handling and data-lifetime
controls when sensitive runtime data must be processed.

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
- Because the crate root denies `unsafe_code` (§1), this site needs a scoped `#[allow(unsafe_code)]` documented in the owning module's DDA

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
- `ffi_pipeline_process` receives exactly one non-empty, already-normalized signal unit per call. Callers never flatten preprocessed units into a single buffer before the call (`.playbook/rust-shell/ffi.md`)
- No modality enum or modality/format metadata crosses the boundary (D65, D67); a third-party codec crate never exposes its types past the preprocessing module that wraps it

---

## 6. Error Handling

- All functions return `EngineResult<T>` — no `unwrap()`, no `expect()`, no `panic!()` in `src/` outside of tests
- `?` propagation is the standard pattern
- On error paths, `ZERO_ON_DROP` types handle their own cleanup automatically — verify this is not bypassed by `std::mem::forget` or similar
- Error variants defined in `rust-shell/src/error.rs` (`ShellError`) — no raw string errors (this includes `Result<_, String>`), no `anyhow` or `thiserror` unless approved under §11. A third-party crate's error type is mapped to a `ShellError` variant at the wrapper boundary and never returned raw
- C11 result codes are translated to `ShellError` at the FFI boundary; raw codes never reach tRPC
- `panic = "abort"` in release means any panic is fatal — this is intentional; panics must not be reachable in release paths. This includes panics inside approved crates: wrapper code validates input and bounds before calling a crate so that documented panic conditions are unreachable

---

## 7. Naming Conventions

| Scope                       | Convention                    | Example                           |
| --------------------------- | ----------------------------- | --------------------------------- |
| Public API types            | `PascalCase`                  | `Ctx`, `Fingerprint`              |
| Internal types              | `PascalCase`                  | `CompressOp`, `KeyBuffer`         |
| Sensitive types (with Drop) | `Secret<Name>` or descriptive | `SecretKey`, `Fingerprint`        |
| Public functions            | `snake_case`                  | `process_input`                   |
| Internal functions          | `snake_case`                  | `compress_chunk`                  |
| Constants                   | `UPPER_SNAKE_CASE`            | `FINGERPRINT_SIZE`                |
| Obfuscation seed            | `OBFUSCATION_SEED`            | `OBFUSCATION_SEED`                |
| Hardening macros            | `snake_case!`                 | `opaque_true!`                    |

The project-name prefix cleanup (D32, D35) was completed on 2026-10-05. Active identifiers, package and binary names, build artifacts, environment variables, and state paths use unprefixed names; the retained `SAGEGRAPH2` snapshot magic and the explicitly retained Sage-domain documentation paths are compatibility/documentation exceptions. C imports in `ffi.rs` use the engine's unprefixed exported names (for example `pipeline_process`, `primitive_count`, `mem_alloc`).

---

## 8. Per-Component Hardening Checklist

Every component DDA doc must include a hardening checklist section confirming the following before the component is marked complete:

```
## Hardening Checklist
- [ ] DISPATCH_TABLE: dyn Trait used over generics in all sensitive dispatch paths
- [ ] OPAQUE_PRED: opaque_true!() at all pub function entry points
- [ ] SOURCE_STRINGS: ordinary non-secret literals are allowed; no secrets or sensitive user data embedded in source; targeted obfuscation has an approved threat model
- [ ] ZERO_ON_DROP: all sensitive types implement Drop with write_volatile zeroing
- [ ] INLINE_CONTROL: #[inline(always)] / #[inline(never)] applied deliberately
- [ ] Visibility: all internals pub(crate) or private; pub only at lib.rs boundary
- [ ] FFI boundary: null checks, SAFETY comments, no Rust types crossing boundary
- [ ] No unwrap/expect/panic in release paths
- [ ] EngineResult<T> returned from all fallible functions
- [ ] Release profile flags verified in the workspace-root Cargo.toml
- [ ] Every crate used is an approved Dependency Register row (D72) declared in this DDA
```

---

## 9. AI Constraints

When generating Rust code for this project:

- Do not replace `dyn Trait` with generics for "performance" in sensitive paths
- Do not remove opaque predicates because they appear unreachable or redundant
- Do not simplify `ZERO_ON_DROP` implementations to plain assignment
- Do not add `#[derive(Clone)]` or `#[derive(Copy)]` to sensitive types
- Do not embed secrets or sensitive user data in Rust source literals
- Do not add string obfuscation without a documented threat model and measurable protection
- Do not deviate from DDA doc specifications on the grounds that the code "looks wrong"
- Do not introduce new `Cargo.toml` dependencies unilaterally. A crate may be proposed with its review (§11), but it is added only after the Creator approves its Dependency Register row (D72) and the DDA declares it
- Do not perform modality-agnostic work in C11 that belongs in a Rust preprocessor, or the reverse — modality preprocessing is the shell's exclusive responsibility (D4)
- Do not reduce signal fidelity in any preprocessor: no downsampling, resizing, or channel reduction (High-Fidelity Signal Principle) — this applies equally when a crate performs the decode
- The DDA doc is always correct; the code must match it, not the other way around

---

## 10. Testing

- **Runner:** `cargo test --manifest-path rust-shell/Cargo.toml --lib`. The crate's binaries are the HTTP server and the `snap_inspect` snapshot inspector.
- **Location:** unit tests live in `#[cfg(test)]` modules next to the code they cover. Test-only helpers are never compiled into release output.
- **Coverage rule:** every `pub` function and every FFI wrapper is tested on its success path and on each error variant its DDA documents. FFI wrappers are tested against the linked C11 engine. No numeric coverage percentage is enforced — none is measured.
- **Fixtures:** binary-format tools such as `snap_inspect` carry known-good, checksum-corrupt, and truncated fixture tests. Preprocessors that decode untrusted formats (including through a crate) carry malformed, truncated, and oversized-input tests.
- **Source strings in tests:** ordinary fixture literals are permitted inside `rust-shell/src/` tests; secrets or sensitive user data must never be embedded. `unwrap()` and `expect()` are permitted in tests only.
- **Gates:** `cargo clippy --manifest-path rust-shell/Cargo.toml -- -D warnings` and `cargo fmt --all --check` are part of every phase-completion run, alongside the tests.

---

## 11. Dependency Governance (D72, 2026-10-06)

**Policy.** The Rust shell may use established third-party crates where the benefit clearly outweighs the effort and risk of writing and maintaining the equivalent in-house. This is the decision in `02-exploration.md` D72; it extends D64 (shell codecs) to every shell dependency and replaces the earlier "zero non-critical dependencies" reading of `SC-STRIP-NON-CRITICAL` with "justified dependencies only". It does **not** apply to the C11 engine, which stays libc-only (D12; `docs/code-standards-c.md` §11).

**Approved crates — the Dependency Register in `02-exploration.md` D72 is authoritative.** `rust-shell/Cargo.toml` may carry exactly the crates with an approved register row. At the time of D72 these are:

- `tokio` — features `macros`, `rt`, `time`; load-bearing async runtime
- `napi`, `napi-derive` — feature-gated behind `napi-bridge`; load-bearing TypeScript ↔ Rust boundary
- `napi-build` — build-dependency for the NAPI bridge
- `serde` (feature `derive`) and `serde_json` — acquisition envelope/manifest and HTTP JSON; declared retroactively by D72 (they re-entered after D13 removed `serde` as unused, without a decision entry)

Removed and not to be reintroduced without a new register row: `hex` (unused), `getrandom` (replaced by an in-house `/dev/urandom` read, D13), `chrono` (replaced by `std::time::SystemTime`, `K-CHRONO-STRIP`).

**Admission process for a new crate (all steps required, in order):**

1. **Proposal.** State the problem, why an in-house implementation is the worse trade (effort, correctness risk, untrusted-input risk), and the alternatives considered, including "do it in-house".
2. **Review.** Record, for the exact version proposed: maintenance status (recent releases, active maintainers); reputation and breadth of use; licence compatibility with a proprietary project; known security advisories (checked against the RustSec advisory database at review time); use of `unsafe` and of build scripts; transitive dependency count and who maintains them; MSRV compatibility with `rust-version` in `Cargo.toml`.
3. **Minimal surface.** `default-features = false` and only the features actually used. Exact version pinned through the committed `Cargo.lock`.
4. **DDA declaration.** The owning component's DDA names the crate, the version, its purpose, and the review outcome.
5. **Creator approval.** The Creator approves the Dependency Register row in `02-exploration.md` D72 (dated). Dependencies always halt for approval (review gate); the AI never adds one unilaterally (escalation category `undeclared-dependency`).

**Handling rules for any approved crate:**

- The crate is used only inside the module that wraps it. Its types, errors, and strings do not appear in a public signature, in a tRPC response, or across FFI (§5, §6).
- Crates that parse untrusted input (decoders for audio, image, video-adjacent containers, text normalization) run only after the raw-signal c8 check (D66). Input and output bounds from D69 and D70 are enforced by wrapper code **before** the crate is called, regardless of the crate's own limits.
- A crate must not reduce signal fidelity (no resize, no downsample, no channel reduction, no lossy conversion). If its default behaviour does, it is configured not to, or it is not used.
- A crate that panics on malformed input is wrapped so the documented panic conditions are unreachable (§6).
- Network access, process spawning, and filesystem access are not permitted from a crate on the signal path. External programs (FFmpeg) remain separate processes under the D69 controls, not crates.
- Supply-chain hygiene at each phase close: re-check advisories for every crate in the register; note any crate whose maintenance has lapsed.

---

## 12. Phase Gates

Run before closing any phase that touched Rust. General gates are in `docs/code-standards.md` §8.

- [ ] `cargo test --manifest-path rust-shell/Cargo.toml --lib` passes
- [ ] `cargo clippy --manifest-path rust-shell/Cargo.toml -- -D warnings` is clean
- [ ] `cargo fmt --all --check` is clean
- [ ] `cargo build --manifest-path rust-shell/Cargo.toml --release` succeeds (this also builds the C11 engine through `build.rs` with the C §2 release flags)
- [ ] Every touched module's Hardening Checklist (§8) is satisfied or marked `NOT APPLICABLE` with rationale
- [ ] Every crate in `rust-shell/Cargo.toml` has an approved Dependency Register row and a DDA declaration; advisories re-checked (§11)
- [ ] No project-name prefix in new code
- [ ] `native-reviewer` run after native changes (`.cursor/agents/native-reviewer.md`)

---

## Revision Notes

- **2026-09-20** — Replaced the pre-consolidation header (blank `Version:` / `Scope:` / `Usage:`) with Tier 2 frontmatter per `.playbook/maintenance.md`. §1 now states the crate-root `unsafe_code` denial and clarifies it applies to the `ZERO_ON_DROP` `write_volatile` site as well (§3.4). §2 now places the release profile in the workspace-root `Cargo.toml`, because Cargo ignores profiles declared in non-root workspace members. §3.3, §6, §7, §9 aligned to current practice (`ShellError`, no `Result<_, String>`, unprefixed C import names, D4 and High-Fidelity rules). Added §10 Testing and §11 Dependency Governance (recorded as added 2026-08-19 but absent from the copy on file). Pattern definitions §3.1–§3.5 are unchanged.
- **Needs confirmation:** the §1/§3.4 statement that each `unsafe` site needs a scoped `#[allow(unsafe_code)]` is inferred from the crate-root denial recorded in `.playbook/rust-shell/_index.md`; confirm against `lib.rs`.
- **2026-09-20 (second pass)** — Split so that this file carries every Rust-specific rule (general rules stay in `docs/code-standards.md`). Replaced the "legacy aliases" wording in §7 with the project-wide no-prefix rule (D32) and named the `Sage*` type-name question as open. Added §12 Phase Gates.
- **2026-09-20 (third pass)** — §7 widened to the project name in any name (D35), and the earlier open question about `Sage*` types is closed: they are residuals with target names. Commands no longer name the package or binary.
- **2026-10-06 (D72)** — §11 rewritten from a fixed three-line dependency list to a governed Dependency Register with an admission process and handling rules (D72). `serde` and `serde_json` declared retroactively (found in `rust-shell/Cargo.toml` without a decision entry; D13 had removed `serde`). §1, §3 preamble, §5, §6, §8, §9, §10, §12 aligned: third-party crates are wrapped, bounded by D69/D70 before use, never cross FFI or public signatures, and are exempt from the obfuscation patterns while their wrappers are not. §2 now records that the release profile is applied in the workspace-root `Cargo.toml` and that the `RUSTFLAGS` script is an open decision. The C11 engine's zero-dependency rule is unchanged.
- **2026-10-10 (D89)** — Replaced §3.3's blanket `STRING_XOR` requirement with a source-string and sensitive-data rule. Ordinary literals are permitted; secrets and sensitive user data remain prohibited in source; targeted obfuscation requires an approved threat model and measurable protection. Updated the per-component checklist and AI constraints. The four remaining hardening patterns are unchanged.
