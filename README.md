---
file: 'README.md'
responsibility: 'The Playbook repository front page: what Playbook is and how to start a project with it.'
ai_instructions: 'Not an AI entry point. A project built with Playbook starts at its own .playbook/_index.md.'
archive_rule: 'N/A — living document, keep current with the actual ways to start.'
owner: playbook
---

# Playbook

Playbook keeps AI-assisted work on track. You decide first, write it down once, and any AI session, in any tool, can pick up where the last one stopped. It works for software, writing, production and manufacturing projects.

## Start a project

Pick the way that suits you. All of them write the same files into your project and then step aside; nothing depends on them afterwards.

| You | Do this |
|---|---|
| Use a terminal | `npx create-playbook` in your project folder. See [packages/create-playbook](packages/create-playbook/README.md). |
| Use Claude | Install the [Playbook skill](packages/playbook-skill/README.md) and ask Claude to set up Playbook. |
| Want no terminal | Download domain-specific kits directly from [Playbook Pages](https://bogsp.github.io/playbook/). |

## After setup

Your project has a `.playbook/` folder. Read `.playbook/README.md` once. It tells you how to start every session: give your AI `.playbook/_index.md` and the message in that README.

## What is in this repository

| Path | What it is |
|---|---|
| [playbook/.playbook/](playbook/.playbook/README.md) | The templates and rules every project starts from |
| [playbook/docs/](playbook/docs/) | Flows, contracts and code standards for Playbook itself |
| [packages/](packages/) | The scaffolding tools |

## Fillable Templates & Documentation
- **Live Documentation & Guides:** [Playbook Pages](https://bogsp.github.io/playbook/)
- **Core Templates:** Available inside `packages/create-playbook/templates/` supporting both lite and full profiles.
- **Raket.ph Guide:** [The Context Kit](https://raket.ph)
