---
file: '.playbook/kit/03-execution.md'
responsibility: 'Holds ONLY Guidelines, Active Phase Plan, In-Flight Tasks, and Acceptance Criteria.'
ai_instructions: 'Use this as the source of truth for guidelines and task checklists.'
archive_rule: 'Completed tasks move to 04-progress.md and are pruned from here.'
---

## Guidelines

**Style & Voice:**

- Clear, concise, practical — no filler
- Docs skimmable for humans, dense for AI
- Narrative tone for guides; structured format for reference docs
- Outputs elegant, functional, and unobtrusive
- Progressive Disclosure + Tiering is the default for all structural decisions

**Rules & Constraints:**

- Follow all conventions in closed decisions in `02-exploration.md`
- Playbook docs use YAML frontmatter + ## What It Does + ## Interface + optional ## Detail
- File and folder naming strictly follows kebab-case conventions
- No component is coded before its Playbook doc exists
- `code-standards.md` always pairs with `AI-INSTRUCTIONS.md`
- All code must pass linting and formatting before commit
- All changes pushed with logically grouped commits
- Prefer native implementations over external libraries and internal methods over third-party services
- External dependencies require explicit justification before adoption

**Quality Bar:**

- Every document type has a complete working example
- `AI-INSTRUCTIONS.md` is self-contained enough for AI to operate without prior knowledge
- Guides are readable by non-developers
- Progressive Disclosure applied consistently — plain language first, technical depth below
- Phase not complete until Phase Completion Checklist in `.playbook/pipeline.md` fully passes

**QA Tier:** standard

---

## Plan

**Goals:**

- Redesign and redraft the complete Playbook pipeline based on session decisions
- Produce all updated deliverables needed to bootstrap or adopt any project

**Outcomes:**

- As a developer, I can run create-playbook and get a working scaffold instantly
- As a developer, I can read `AI-INSTRUCTIONS.md` and operate correctly within Playbook
- As an AI assistant, I can read `AI-INSTRUCTIONS.md` and operate without prior knowledge
- As a non-developer, I can read the guides and understand the full pipeline
- As an existing project owner, I can adopt Playbook without breaking anything
- As any reader, I can find my starting point immediately via the journey matrix

**Structure:**

1. `.playbook/README.md` — orientation and journey matrix
2. `.playbook/pipeline.md` — complete pipeline reference
3. `.playbook/AI-INSTRUCTIONS.md` — AI execution layer
4. Updated flow and contract formats
5. Updated DDA doc formats
6. Updated `.playbook/kit/` templates
7. Updated CLI (create-playbook)

**Acceptance Criteria:**

- [x] Original pipeline files authored and validated
- [x] Complete template zip generated with all files
- [x] Adoption guides cover both with-kit and without-kit paths
- [x] All five document types have working examples
- [x] Kit templates updated with Playbook references and phase checklist
- [x] create-playbook CLI generates complete scaffold in one command
- [x] pipeline.md covers full pipeline including adoption
- [x] README.md updated to cover full Playbook system
- [ ] Updated flow doc format drafted — progressive disclosure, tiering, all scope and trigger types
- [ ] Updated contract format drafted — required sections, N/A/TODO discipline, split rules
- [ ] Updated component doc format drafted — new frontmatter, ## What It Does, ## Interface
- [ ] Updated sequencer doc format drafted — full call chain with all branches
- [ ] Updated `.playbook/kit/` templates drafted — all six files, lean and current
- [ ] `.playbook/kit/_refs/` folder structure defined and documented
- [ ] `.playbook/kit/_tests/` test file template drafted
- [ ] `.playbook/kit/_archives/` archive conventions documented
- [ ] Video insights integration defined — `.playbook/kit/_refs/video-insights/` pattern
- [ ] create-playbook CLI updated to reflect new structure

---

## Action

**Right Now:**
Design the front door — single entry experience for non-technical users

**Tasks:**

- [ ] Update tooling
  - [ ] Update create-playbook CLI to reflect new structure
  - [ ] Update all embedded templates in CLI
- [ ] Standardize YAML frontmatter on all existing templates

---

## Known Issues

| #   | Issue                                       | Type   | Severity | Blocked By | Resolution                    |
| --- | ------------------------------------------- | ------ | -------- | ---------- | ----------------------------- |
| 1   | Nested code blocks break markdown rendering | design | low      | —          | Deliver as downloadable files |
