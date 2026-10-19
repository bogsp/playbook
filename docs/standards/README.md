# Domain Standards (STANDARDS)

This directory serves as the canonical location for project-wide engineering, architecture, governance, and operational standards under the Playbook framework.

## Standard Domains

- **Engineering Standards (`docs/standards/`)**
  - C11 Core Standards: `docs/standards/c.md`
  - Rust Tokio Shell Standards: `docs/standards/rust.md`
  - TypeScript/UI Standards: `docs/standards/typescript.md`

- **Architecture Standards**
  - Core System Architecture: `docs/architecture.md`
  - System Foundation & Principles: `docs/foundation.md`

- **Contracts & Protocols**
  - Behavioral & Functional Contracts: `docs/contracts/`
  - Secure Bootstrap Specification (SBS): `docs/contracts/sbs/README.md`

## Governance & Rules

- All domain-specific standards must be maintained under `docs/standards/[domain]/` or `docs/standards/[domain].md`.
- Active standards are indexed and referenced by `.playbook/_index.md` and enforced via `.playbook/rules.md`.
