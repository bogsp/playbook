# Playbook
# File: .playbook/README.md

Playbook is a planning system for working with AI on real projects.

Before anything gets built, it gets written down. Once it's built, it stays written down. This keeps you, your team, and your AI assistant working from the same understanding — from the first idea to the finished work.

You don't need to be technical to use it. The guides walk you through every step.

---

## Where to Start

| I want to... | Start here |
|---|---|
| Understand how this system works | [Pipeline guide](pipeline.md) |
| Start a brand new project | [New project guide](guides/new-project.md) |
| Bring an existing project in | [Adoption guide](guides/adopt.md) |
| Pick up where I left off | [Session prompts](kit/00-prompts.md) |
| Start or resume a session with AI | [Session prompts](kit/00-prompts.md) |

---

## How It Works

Every project moves through the same stages — in order. Each stage sets the foundation for the next.

```
Thinking → Discovery → Mapping → Rules → Planning → Work → Handoff
```

Existing projects add one stage at the front to map what already exists before anything changes.

The full breakdown is in the [pipeline guide](pipeline.md).

---

## Five Rules That Never Change

- Nothing gets built without a written plan for it
- The map and the rules are agreed on before planning begins
- Written plans stay current with the actual work
- The session log is never edited — only added to
- Nothing is deleted — it is either active or archived

---

## Choose Your Project Type

Playbook adapts to different kinds of work. Pick the folder that matches your project and read its guide to see how the pipeline applies to you.

| Project type | Guide |
|---|---|
| Software development | [Software guide](vocabulary-software/README.md) |
| Writing and editorial | [Writing guide](vocabulary-writing/README.md) |
| Production and operations | [Production guide](vocabulary-production/README.md) |
| Manufacturing | [Manufacturing guide](vocabulary-manufacturing/README.md) |

---

## How It's Organised

You don't need to understand all of this to get started — the guides handle the setup for you.

```
project-root/
│
├── .playbook/                    ← Playbook system files
│   ├── README.md                 ← you are here
│   ├── pipeline.md               ← how the pipeline works, all stages, all formats
│   ├── AI-INSTRUCTIONS.md        ← loaded by your AI assistant at session start
│   ├── _index.md                 ← this project's living map (edit per project)
│   ├── maintenance.md            ← keeping files lean and current
│   ├── _concerns/                ← cross-cutting capabilities (auth, logging, etc.)
│   ├── _integrations/            ← external service and library contracts
│   ├── _shared/                  ← components used across modules
│   ├── guides/
│   │   ├── _index.md             ← all guides in one place
│   │   ├── new-project.md        ← starting from scratch
│   │   ├── adopt.md              ← bringing an existing project in
│   │   ├── context-kit.md        ← how the session files work
│   │   ├── reverse-engineer.md   ← mapping a project before changing it
│   │   └── video-insights.md     ← using video as research and reference
│   ├── kit/                      ← your session and planning files
│   │   ├── 00-prompts.md         ← session prompts, copy and paste
│   │   ├── 01-process.md         ← current phase and what's next
│   │   ├── 02-exploration.md     ← open questions and settled decisions
│   │   ├── 03-execution.md       ← guidelines, plan, tasks, known issues
│   │   ├── 04-progress.md        ← project history, never edited
│   │   ├── 05-kanban.md          ← work tracker (optional)
│   │   ├── 06-qa.md              ← checks and sign-off (optional)
│   │   ├── _archives/            ← older history, moved not deleted
│   │   ├── _refs/                ← supporting material and research
│   │   └── _tests/               ← one file per check
│   ├── templates/                ← all file templates
│   └── vocabulary-[domain]/
│       ├── README.md             ← how the pipeline maps to this project type
│       ├── AI-INSTRUCTIONS.md    ← loaded by your AI assistant for this project type
│       └── templates/            ← planning document templates
│
└── docs/                         ← your project's documentation
    ├── flows/                    ← one file per major path
    ├── contracts/                ← rules for each path
    ├── code-standards.md         ← language and tooling standards (software projects)
    ├── rewrite/                  ← existing project audit outputs
    └── rollout/                  ← milestone snapshots
```
