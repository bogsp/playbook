# EXECUTION

# File: .playbook/kit/03-execution.md

## Guidelines

**Style & Voice:**

- Clear, concise, practical — no filler
- Docs skimmable for humans, dense for AI
- Narrative tone for guides; structured format for reference docs
- Outputs elegant, functional, and unobtrusive
- Progressive Disclosure + Tiering is the default for all structural decisions

**Rules & Constraints:**

- Follow all conventions in closed decisions in 02-exploration.md
- Playbook docs use YAML frontmatter + ## What It Does + ## Interface + optional ## Detail
- File and folder naming strictly follows kebab-case conventions
- No component is coded before its Playbook doc exists
- code-standards.md always pairs with 00-rules.md
- All code must pass biome check and biome format before commit
- All changes pushed with logically grouped commits
- Files with nested code blocks delivered as downloadable artifacts
- Prefer native implementations over external libraries
- Prefer internal methods/functions over third-party services
- External dependencies require explicit justification before adoption

**Quality Bar:**

- Every document type has a complete working example
- 00-rules.md is self-contained enough for AI to operate without prior knowledge
- Guides are readable by non-developers
- Progressive Disclosure applied consistently — plain language first, technical depth below
- Phase not complete until Phase Completion Checklist in .playbook/pipeline.md fully passes

**QA Tier:** standard

---

## Plan

**Goals:**

- Redesign and redraft the complete Playbook pipeline based on session decisions
- Produce all updated deliverables needed to bootstrap or adopt any project

**Outcomes:**

- As a developer, I can run create-playbook and get a working scaffold instantly
- As a developer, I can read 00-rules.md and operate correctly within Playbook
- As an AI assistant, I can read 00-rules.md and operate without prior knowledge
- As a non-developer, I can read the guides and understand the full pipeline
- As an existing project owner, I can adopt Playbook without breaking anything
- As any reader, I can find my starting point immediately via the journey matrix

**Structure:**

1. `.playbook/README.md` — orientation and journey matrix
2. `.playbook/pipeline.md` — complete pipeline reference
3. `.playbook/00-rules.md` — AI execution layer
4. Updated flow and contract formats
5. Updated DDA doc formats
6. Updated `.playbook/kit/` templates
7. Updated CLI (create-playbook)

**Out of Scope:**

- Specific framework integrations (Next.js, NestJS, etc.)
- PRD or spec templates (separate concern)
- CI/CD pipeline tooling

**Delivery Notes:**

- code-standards.md is canonical — reference only; do not modify outside this project
- Playbook must remain architecture-agnostic and language-agnostic
- TypeScript used as reference implementation in examples only
- CLI supports TypeScript as default but not exclusively

**Acceptance Criteria:**

- [x] Original pipeline files authored and validated
- [x] Complete template zip generated with all files
- [x] Adoption guides cover both with-kit and without-kit paths
- [x] All five document types have working examples
- [x] Kit templates updated with Playbook references and phase checklist
- [x] create-playbook CLI generates complete scaffold in one command
- [x] playbook-guide.md covers full pipeline including adoption
- [x] 00-summary.md updated to cover full Playbook system
- [ ] .playbook/README.md drafted — orientation, journey matrix, pipeline at a glance
- [ ] .playbook/pipeline.md drafted — complete pipeline reference, what and why
- [ ] .playbook/00-rules.md drafted — AI execution layer, how to implement
- [ ] Updated flow doc format drafted — progressive disclosure, tiering, all scope and trigger types
- [ ] Updated contract format drafted — required sections, N/A/TODO discipline, split rules
- [ ] Updated component doc format drafted — new frontmatter, ## What It Does, ## Interface
- [ ] Updated sequencer doc format drafted — full call chain with all branches
- [ ] Updated .playbook/kit/ templates drafted — all six files, lean and current
- [ ] .playbook/kit/\_refs/ folder structure defined and documented
- [ ] .playbook/kit/\_tests/ test file template drafted
- [ ] .playbook/kit/\_archives/ archive conventions documented
- [ ] Video insights integration defined — .playbook/kit/\_refs/video-insights/ pattern
- [ ] create-playbook CLI updated to reflect new structure

---

## Action

**Right Now:**
Design the front door — single entry experience for non-technical users

**Tasks:**

- [ ] Draft updated files
  - [ ] .playbook/README.md
  - [ ] .playbook/pipeline.md
  - [ ] .playbook/00-rules.md
  - [ ] Flow doc template
  - [ ] Contract doc template
  - [ ] Component doc template
  - [ ] Sequencer doc template
  - [ ] .playbook/kit/01-process.md template
  - [ ] .playbook/kit/02-exploration.md template
  - [ ] .playbook/kit/03-execution.md template
  - [ ] .playbook/kit/04-progress.md template
  - [ ] .playbook/kit/05-kanban.md template
  - [ ] .playbook/kit/06-qa.md template
  - [ ] .playbook/kit/\_tests/ test file template
  - [ ] Video insights integration

- [ ] Front door design
  - [ ] Define the single entry prompt
  - [ ] Map what the system does underneath vs what the user sees
  - [ ] Define how Context Kit files get populated invisibly
  - [ ] Validate against non-technical user — would they feel accomplished?

- [ ] Update tooling
  - [ ] Update create-playbook CLI to reflect new structure
  - [ ] Update all embedded templates in CLI

---

## Known Issues

| #   | Issue                                       | Type   | Severity | Blocked By | Resolution                    |
| --- | ------------------------------------------- | ------ | -------- | ---------- | ----------------------------- |
| 1   | Nested code blocks break markdown rendering | design | low      | —          | Deliver as downloadable files |
