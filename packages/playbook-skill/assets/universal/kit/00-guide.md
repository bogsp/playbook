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