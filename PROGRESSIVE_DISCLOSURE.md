# Playbook Ecosystem: Progressive Disclosure Guide

The Playbook pipeline ecosystem is architected around **Progressive Disclosure**—serving both non-technical users and senior engineers with the exact depth of tooling they need without overwhelming them.

## Profiles

### 1. Lite Profile (`--profile=lite`)
Designed for non-technical users, business owners, and streamlined projects.
- Focuses on core documentation, lightweight task management, and minimal configuration.
- Installs essential assets without complex monorepo scaffolding.

### 2. Full Profile (`--profile=full`)
Designed for engineering teams and complex monorepos.
- Includes automated budget checks, drift validation, multi-package structures, and robust CI/CD pipelines.

## CLI Usage

- **Initialize a new project:**
  ```bash
  pnpm dlx create-playbook my-project --profile=lite
  ```

- **Adopt an existing repository:**
  ```bash
  pnpm dlx create-playbook adopt --profile=full
  ```

## Quality Control & Guardrails
- **Drift Validation:** Ensures generated assets match expected templates across packages.
- **Budget Checks:** Enforces file size limits and cleanliness across all skill assets and templates.
