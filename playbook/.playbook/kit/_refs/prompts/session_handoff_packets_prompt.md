---
file: '.playbook/kit/_refs/prompts/session-handoff-packets.md'
responsibility: 'Modular prompt for generating session handoff summary packets A through E at milestone boundaries.'
ai_instructions: 'Load on demand when requested to produce a milestone summary or handoff packet sequence.'
archive_rule: 'N/A — core prompt reference.'
---

# Session Handoff Packets (Packets A–E)

Use this prompt sequence when wrapping up a major milestone or preparing a comprehensive project handoff summary.

---

## Hand-off Prompt Sequence

```text
Generate a milestone summary using the Packets A-E structure:

Packet A — Executive Summary
- Plain language recap of achievements and current state.

Packet B — Architecture & Decisions
- Closed decisions, key structural changes, and active system boundaries.

Packet C — Outstanding Work & Kanban
- In-flight tickets, open items, and blockers.

Packet D — Risk & Technical Debt
- Identified risks, audit gaps, and deferred tasks.

Packet E — Next Session Onboarding
- Exact files to load and initial tasks to execute upon resuming.
```