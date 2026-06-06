# Playbook
# File: .playbook/_index.md

> This file is the living map of your project's Playbook setup.
> Update the Structure section whenever pieces are added or removed.
> It is the first file an AI reads after the instruction files.

---
id: [project-name]
type: structure
scope: project
status: draft
contains: []
concerns: []
integrations: []
---

## What This Project Is
[One paragraph — plain language description of the project and what it produces.]

## Structure

```
.playbook/
  README.md                        — entry point and orientation
  pipeline.md                      — how the pipeline works
  AI-INSTRUCTIONS.md               — universal AI session rules
  _index.md                        — this file; project map
  maintenance.md                   — keeping files lean and current
  guides/
    _index.md                      — all guides in one place
    new-project.md                 — starting from scratch
    adopt.md                       — bringing an existing project in
    context-kit.md                 — how the session files work
    video-insights.md              — using video as research and reference
    reverse-engineer.md            — mapping an existing project before changing it
  vocabulary-[domain]/
    README.md                      — how the pipeline maps to this domain
    AI-INSTRUCTIONS.md             — domain-specific AI rules
    templates/                     — planning document templates for this domain
  templates/
    kit-00-prompts.md              — session prompts
    kit-01-process.md              — process file template
    kit-02-exploration.md          — exploration file template
    kit-03-execution.md            — execution file template
    kit-04-progress.md             — progress log template
    kit-05-kanban.md               — work tracker template
    kit-06-qa.md                   — checks and sign-off template
    kit-test.md                    — individual check file template
    flow.md                        — path document template
    contract.md                    — rules document template
    global-contract.md             — global rules template
    video-insight-base.md          — video insight file template
    video-insight-variants.md      — extra sections by video type
.kit/
  00-prompts.md                    — session prompts (copy from templates)
  01-process.md                    — where you are and what is next
  02-exploration.md                — open questions and settled decisions
  03-execution.md                  — guidelines, plan, tasks, known problems
  04-progress.md                   — append-only history
  05-kanban.md                     — work tracker (optional)
  06-qa.md                         — checks and sign-off (optional)
  _refs/
    video-insights/                — extracted video insight files
  _tests/                          — individual check files
  _archives/                       — lean history
docs/
  [brief or PRD].md                — discovery document
  flows/
    _index.md                      — entry point for all path documents
    global.md                      — optional: rules spanning every path
    flow-N-[name].md               — one file per path
  contracts/
    _index.md                      — entry point for all rules documents
    global.md                      — rules that apply everywhere
    flow-N-[name].md               — companion rules file per path
  rollout/
    [milestone].md                 — generated milestone snapshots
```

## Project Planning Documents

[Add links here as planning documents are created — top-down order]

- [_index.md](./_index.md) — this file
- [Add coordinators, components, concerns, integrations as they are authored]

## Detail
[Architecture decisions, constraints, or known assumptions specific to this project. Remove this section if nothing fits.]
