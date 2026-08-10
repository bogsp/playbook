---
file: '.playbook/kit/03-execution.md'
responsibility: 'Execution playbook. Holds Guidelines, Active Phase Plan, In-Flight Tasks, and Known Issues.'
ai_instructions: 'Follow all guidelines strictly. Update task checkboxes during the session. Do not keep completed tasks here permanently.'
archive_rule: 'Move completed tasks to `.playbook/kit/_archives/execution/` when they have been logged in `04-progress.md` and are no longer active.'
---

# Execution

## Guidelines

- Progressive Disclosure + Tiering is the default for all structural decisions.
- Docs must be clear, concise, and skimmable for humans; dense for AI.
- No component is coded before its corresponding planning document exists.

## Plan

- [ ] **Phase 1:** [Current Phase Name]
- [ ] **Phase 2:** [Upcoming Phase Name]

## Tasks

- [ ] **[TASK-01]:** [Actionable item description]
  - **Blocks:** [Dependent task/component]
  - **Spec:** [Path to planning document]

## Known Issues

| #   | Issue               | Type                    | Severity          | Blocked By | Resolution         |
| --- | ------------------- | ----------------------- | ----------------- | ---------- | ------------------ |
| 1   | [Issue description] | [bug/dependency/design] | [high/medium/low] | [Task ID]  | [Pending/Fix path] |

## Acceptance Criteria

- [ ] All active tasks pass QA, tests, and formatting checks.
- [ ] Corresponding planning/DDA documents synced with implementation.
