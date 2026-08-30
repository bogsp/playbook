---
file: 'playbook/.playbook/_index.md'
responsibility: 'Living map of a Playbook project''s setup — structure, planning documents, concerns, and integrations. Copied into every new project by create-playbook and filled in as the project is scaffolded.'
ai_instructions: 'Read right after AI-INSTRUCTIONS.md. Update the Structure section whenever pieces are added or removed.'
archive_rule: 'N/A — living document, kept current at all times.'
id: [project-name]
type: structure
scope: project
status: draft
contains: []
concerns: []
integrations: []
---

# Playbook — Project Map

## What This Project Is

[One paragraph — plain language description of the project and what it produces.]

## How to Use This File

| If you're...                  | Do this                                                                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting fresh                | Fill in **What This Project Is**, then work through [pipeline.md](pipeline.md) stage by stage                                                                                                                             |
| Resuming a session            | Read this file, then [kit/01-process.md](kit/01-process.md)                                                                                                                                                               |
| Adding a piece                | Find its place in **Structure** below, create the planning document using [templates/](templates/_index.md) or [vocabulary-[domain]/templates/](vocabulary-software/templates/_index.md), then update this file's Structure section |
| Looking for a template        | [templates/](templates/_index.md) — universal shapes; [vocabulary-[domain]/templates/](vocabulary-software/templates/_index.md) — domain-specific fields                                                                            |
| Looking for behavioural rules | [AI-INSTRUCTIONS.md](AI-INSTRUCTIONS.md) — universal; [vocabulary-[domain]/AI-INSTRUCTIONS.md](vocabulary-software/AI-INSTRUCTIONS.md) — domain-specific                                                                  |

## Structure

```
.playbook/
  README.md                         — orientation, where to start
  pipeline.md                       — how the pipeline works, all stages
  AI-INSTRUCTIONS.md                — universal AI session rules
  _index.md                         — this file; project map
  maintenance.md                    — keeping files lean and current
  templates/                        — universal planning document shapes (entry: _index.md)
  _concerns/                        — cross-cutting capabilities (auth, logging, etc.)
  _integrations/                    — external service and library contracts
  _shared/                          — components used across modules
  guides/
    _index.md                       — all guides in one place
    new-project.md                  — starting from scratch
    adopt.md                        — bringing an existing project in
    audit.md                        — mapping a project before changing it
    context-kit.md                  — how the session files work (pipeline-integrated)
    context-kit-standalone.md       — how the session files work (kit files only, no pipeline)
    project-identity.md             — keeping README/AI-INSTRUCTIONS/_index.md current for this project
    video-insights.md               — using video as research and reference
  kit/
    00-prompts.md                   — session prompts, copy and paste
    01-process.md                   — where you are and what's next
    02-exploration.md               — open questions and settled decisions
    03-execution.md                 — guidelines, plan, tasks, known issues
    04-progress.md                  — project history, never edited
    05-kanban.md                    — work tracker (optional)
    06-qa.md                        — checks and sign-off (optional)
    _archives/                      — older history, moved not deleted
    _refs/                          — supporting material referenced by kit files, by category:
      video-insights/               — structured insight files extracted from videos (see guides/video-insights.md)
      templates/                    — reusable file shapes or snippets pulled in mid-session
      examples/                     — worked examples kept for reference
      snippets/                     — small reusable text fragments
      research/                     — outside research material informing a decision
    _tests/                         — one file per QA check (template: _tests/test-case.md)
  vocabulary-[domain]/
    README.md                       — how the pipeline maps to this project type
    AI-INSTRUCTIONS.md              — domain-specific AI rules
    templates/                      — domain-specific planning document shapes (entry: _index.md)

docs/
  [brief or PRD].md                 — discovery document
  flows/
    _index.md                       — entry point for all path documents
    global.md                       — rules spanning every path (optional)
    flow-N-[name].md                — one file per path
  contracts/
    _index.md                       — entry point for all rules documents
    global.md                       — rules that apply everywhere
    flow-N-[name].md                — companion rules file per path
  code-standards.md                 — your own implementation standards (optional)
  rewrite/                          — audit outputs for existing projects
  rollout/
    [milestone].md                  — generated milestone snapshots
```

## Project Planning Documents

[Add links here as planning documents are created — top-down order]

- [\_index.md](./_index.md) — this file
- [Add structures, coordinators, components, concerns, integrations as they're authored]

## Detail

[Architecture decisions, constraints, or known assumptions specific to this project. Remove this section if nothing fits.]
