---
file: '.playbook/guides/new-project.md'
responsibility: 'How to start a brand new project with Playbook — session files, then the pipeline stages in order.'
ai_instructions: 'Load when a person is scaffolding a new project and asks where to start.'
archive_rule: 'N/A — orientation guide.'
---

# New Project Guide

Starting a new project with Playbook means setting up your session files, then moving through the pipeline stages in order. This guide walks you through it.

---

## Step 1 — Set Up Your Session Files

Copy the kit files from [.playbook/kit/](../kit/) into your project. These are your working files for the life of the project.

Open [01-process.md](../kit/01-process.md) and fill in:

- Project name
- Current stage: Thinking
- What's next: Discovery

That's all you need to start.

---

## Step 2 — Work Through the Pipeline

Follow the stages in order. Each one produces something the next stage builds on.

| Stage     | What to do                                              | Guide                                      |
| --------- | ------------------------------------------------------- | ------------------------------------------ |
| Thinking  | Populate your kit files — goals, questions, constraints | [Context Kit — Integrated](context-kit.md) |
| Discovery | Write a brief — what you're making, why, for whom       | [Pipeline guide](../pipeline.md)           |
| Mapping   | Walk every major path before defining any piece         | [Pipeline guide](../pipeline.md)           |
| Rules     | Write what every piece must follow                      | [Pipeline guide](../pipeline.md)           |
| Planning  | Define every piece before touching it                   | [Pipeline guide](../pipeline.md)           |
| Work      | Do the work against the plan                            | —                                          |
| Handoff   | Capture what was built and why                          | [Pipeline guide](../pipeline.md)           |

Do not skip stages. Each stage is a checkpoint — the next one only starts when the current one is done and agreed on.

As Discovery completes, update `.playbook/_index.md` — **What This Project Is** — to match the approved brief. See [Project identity](project-identity.md) for what else to keep current and when.

---

## Step 3 — Choose Your Project Type

Open the vocabulary folder that matches your project and read its guide.

| Project type              | Guide                                                        |
| ------------------------- | ------------------------------------------------------------ |
| Software development      | [Software guide](../vocabulary-software/README.md)           |
| Writing and editorial     | [Writing guide](../vocabulary-writing/README.md)             |
| Production and operations | [Production guide](../vocabulary-production/README.md)       |
| Manufacturing             | [Manufacturing guide](../vocabulary-manufacturing/README.md) |

---

## Step 4 — Start Your First AI Session

Open [00-prompts.md](../kit/00-prompts.md) and use the **Starting a New Project** prompt. It tells the AI what you are doing and what files to load.

---

## Reference

- Full pipeline breakdown — [pipeline.md](../pipeline.md)
- How session files work — [Context Kit — Integrated](context-kit.md)
- Keeping README.md, AI-INSTRUCTIONS.md, and \_index.md current — [Project identity](project-identity.md)
- All session prompts — [kit/00-prompts.md](../kit/00-prompts.md)
