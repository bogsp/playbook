# CLI roadmap and governance stubs (committed 2026-10-20, moved here 2026-11-05)

Four short files were committed on 2026-10-20 (commits `6992f58`, `5215816`) straight into `packages/create-playbook/templates/`, which is gitignored build output. `prepublishOnly` rebuilds that folder from `playbook/`, so `create-playbook@3.1.11` never contained them (checked: the published package holds the full 2.0.0 documents and none of this text). They are Playbook's own planning, not guidance for downstream projects, so they were not promoted into the shipped sources. The text below is verbatim, from commit `5215816`. Nothing here is adopted as a rule; whether any of it becomes a project rule (X) or a ticket is the Creator's call. See `template-drift-2026-11-05.md`.

## expansions.md (stub)

~~~~markdown
# Playbook Expansions & Future Roadmap

This document outlines planned CLI expansion modules, automated routine tasks, and standard operating flows.

## 1. Project Archiving (`playbook archive`)
- **Objective**: Decommission completed projects or major phases while retaining immutable audit logs.
- **Routine Tasks**:
  - Verify pipeline completion status (`pipeline.md`).
  - Generate final execution summary manifest.
  - Encapsulate `.playbook/` history into an archive bundle.
  - Purge active operational workspace locks.

## 2. Modular Feature Scaffolding (`playbook expand`)
- **Objective**: Dynamically inject specialized sub-kits or architectural modules into active projects.
- **Routine Tasks**:
  - Select target expansion pack from registry.
  - Perform collision detection against existing custom code.
  - Provision structural templates safely.
  - Update project pipeline milestones.
~~~~

## maintenance.md (stub)

~~~~markdown
# Playbook Maintenance & Health Audits

This document defines routine health check protocols and drift detection standards managed by the CLI.

## 1. Health Audits & Drift Detection (`playbook audit`)
- **Objective**: Continuously verify structural integrity, schema compliance, and template synchronization.
- **Routine Tasks**:
  - Core document schema validation (`rules.md`, `pipeline.md`, etc.).
  - Dependency verification for `@bogsp/playbook-software-library`.
  - Automatic identification of structural drift against latest universal standards.
  - Safe auto-remediation via `playbook update`.
~~~~

## pipeline.md (stub)

~~~~markdown
# Development Pipeline Standard

## Lifecycle Phases

### Phase 1: Exploration & Proposal
- Draft concepts, flowcharts, and contracts in working `.playbook/` files.
- Establish clarity on contracts and implementation details.

### Phase 2: Review & Sign-off
- Verify alignment against architecture standards and project requirements.
- Obtain explicit confirmation on finalized flows and decisions.

### Phase 3: Kit Promotion & Execution
- Promote approved specs to canonical kit templates (`templates/universal/...`).
- Execute implementation adhering strictly to contracts.
- Run test suites, bump version, tag, and publish.
~~~~

## rules.md (stub)

~~~~markdown
# Playbook Governance & Rules

## Core Principles
1. **Strict Planning First**: Every technical change must have a plan, flowchart, contract, and DDA documentation before implementation.
2. **Template Isolation**: Universal template files (`templates/universal/...`) must never be modified directly during exploratory or planning phases. All proposals and specifications must first be drafted, reviewed, and finalized inside working project execution docs (`.playbook/` workspace / DDA / plans).
3. **Canonical Promotion**: Kit template files may only be updated when a specification transitions from "Proposed" to "Locked/Approved" state through formal review.
~~~~

