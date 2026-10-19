# Standards Architecture & Gateway

This directory contains domain-agnostic industry standards, operational guidelines, and standard operating procedures (SOPs) for the project pipeline.

## Progressive Disclosure Model
To prevent context bloat, standards are architected around **progressive disclosure**:
- **This Gateway (`_index.md`)**: Acts as the lean, lightweight index loaded into context to map available standards.
- **Granular Standards (`*.md`)**: Sit on disk and are **never** loaded blindly. They are pulled into context selectively *only* when an active task or pipeline execution explicitly targets that specific domain.

## Available Standards

### Software Engineering & Workspace
- [TypeScript, Node & Workspace Standards](./typescript.md)

### Operations & Non-Software Domains
*(Expandable as pipeline project types require: e.g., Writing, Production, Manufacturing)*
