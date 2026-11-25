---
file: 'playbook/.playbook/kit/00-guide.md'
responsibility: 'Core behavioral guide and command quick reference for Playbook sessions.'
ai_instructions: 'Read during Stage 1 setup or when referencing standard session workflows.'
archive_rule: 'N/A — living guide.'
---

# Playbook Kit Guide

This guide provides standard workflows for maintaining alignment and executing sessions across Playbook projects.

## Core Workflows

### Session Start

1. Read `.playbook/_index.md` (AI Behavioral Rules).
2. Load project context files listed in `.playbook/_index.md`.
3. Confirm loaded files and await human instruction.

### Session End

1. Log all completed events in `kit/04-progress.md`.
2. Update current phase and status in `kit/01-process.md`.
3. Ensure open tickets in `kit/05-kanban.md` reflect current status.

## Prompts & Handoffs

* **Milestone Handoff Packets (Packets A–E):** See `.playbook/kit/_refs/prompts/session-handoff-packets.md`

## Cue-Driven Guidance & Lead/Worker Standards
- **Start light, disclose progressively:** Default to `kit-only` for small or straightforward tasks. Introduce deeper stages (`Discovery`, `Mapping`, `Rules`, `Planning`) when goals are open, existing behavior is changing, or multi-part complexity appears.
- **Integrate Playbook into existing orchestration:** Playbook does not manage external agent runners or require paid services. When using lead/worker (or lead/follower) agents in any domain, keep the user's runner in charge and include a compact Playbook block in each worker brief:
  - **Stage & Mode:** active stage, `pipeline-mode`, and `review-gate`
  - **Scope & Boundaries:** exact deliverable, in-scope paths/sources, and what not to touch
  - **Governing Rules:** constraints and ambiguity-flagging rules (no silent guessing)
  - **Done Criteria & Report:** completion check plus a factual summary of changes, assumptions, and open decisions
- **Carry tracking when the user moves on:** Users routinely forget to log progress, update plans, or record flows/contracts. Keep updates lightweight, transparent, and non-intrusive so momentum stays on the project.
