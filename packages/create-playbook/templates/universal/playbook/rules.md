# Playbook Governance & Rules

## Core Principles
1. **Strict Planning First**: Every technical change must have a plan, flowchart, contract, and DDA documentation before implementation.
2. **Template Isolation**: Universal template files (`templates/universal/...`) must never be modified directly during exploratory or planning phases. All proposals and specifications must first be drafted, reviewed, and finalized inside working project execution docs (`.playbook/` workspace / DDA / plans).
3. **Canonical Promotion**: Kit template files may only be updated when a specification transitions from "Proposed" to "Locked/Approved" state through formal review.
