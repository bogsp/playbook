---
file: 'README.md'
responsibility: 'The Playbook repository front page: what Playbook is, project structure, and getting started guides.'
ai_instructions: 'Not an AI entry point. A project built with Playbook starts at its own .playbook/_index.md.'
archive_rule: 'N/A — living document, keep current with the actual ways to start.'
owner: playbook
---

# Playbook

> **Context-First Scaffolding for AI-Assisted Work**

Playbook keeps AI-assisted projects on track. By establishing structured, human-readable markdown conventions before writing code or content, Playbook ensures that any AI session—in any tool—can pick up seamlessly where the last one left off.

It provides a universal architecture tailored for **Software Development**, **Technical Writing**, **Media Production**, and **Manufacturing**.

---

## 🚀 Getting Started

Choose the setup method that fits your workflow. All methods generate the exact same lightweight file structure inside your project (`.playbook/`) and step aside.

### 🌐 Non-Technical Users (No Terminal)
If you prefer not to use command-line tools:
1. Visit the live **[Playbook Interactive Hub](https://bogsp.github.io/playbook/)**.
2. Select your domain kit (Software, Writing, Production, or Manufacturing) and setup profile.
3. Download the generated `.zip` bundle and extract `.playbook/` directly into your project root folder.

---

### 💻 CLI Terminal (`create-playbook`)
Scaffold a new or existing repository instantly using `npx`:

- Interactive setup wizard: `npx create-playbook`
- Quick setup in current directory: `npx create-playbook .`
- Specify profile and domain flags: `npx create-playbook ./my-project --profile lite --domain software`

#### CLI Flags & Options
| Flag | Description | Values |
|---|---|---|
| `--profile` | Choose template depth | `lite`, `full` |
| `--domain` | Apply domain-specific vocabulary & workflows | `software`, `writing`, `production`, `manufacturing` |
| `--git` | Initialize a Git repository automatically | `true`, `false` |

*For full CLI details, see the [`create-playbook` package documentation](packages/create-playbook/README.md).*

---

### 🤖 Claude Skill / Custom GPTs
Integrate Playbook directly into Claude or your preferred AI environment.

1. **Install the Skill:** Copy the contents of [`packages/playbook-skill/SKILL.md`](packages/playbook-skill/README.md) into your Claude custom instructions or project memory.
2. **Initialize:** In your chat session, ask Claude:
   > *"Set up Playbook for a software project in this directory."*
3. Claude will scaffold the initial `.playbook/` structure and guide you through defining your project's `_index.md` and architecture rules.

*Learn more about the skill build process in [`packages/playbook-skill`](packages/playbook-skill/README.md).*

---

## 📖 How Playbook Works

Once setup is complete, your project will contain a `.playbook/` directory.

1. **Read the Entry Guide:** Open `.playbook/README.md` to see the recommended session prompt.
2. **Start AI Sessions:** At the beginning of any AI chat (Claude, Cursor, ChatGPT, Copilot), point the AI to `.playbook/_index.md`.
3. **Maintain Context:** As work progresses, update the relevant state files in `.playbook/kit/` (e.g., `04-progress.md`, `05-kanban.md`).

---

## 📦 Workspace Structure

This repository is managed as a `pnpm` monorepo:

| Path | Description |
|---|---|
| [**`playbook/.playbook/`**](playbook/.playbook/README.md) | Canonical reference templates, rules, and domain vocabularies. |
| [**`playbook/docs/`**](playbook/docs/) | Governance, contract specs, and engineering standards for Playbook itself. |
| [**`packages/create-playbook/`**](packages/create-playbook/README.md) | CLI generator package published to npm. |
| [**`packages/playbook-skill/`**](packages/playbook-skill/README.md) | Claude Skill asset builder and documentation. |
| [**`packages/playbook-software-library/`**](packages/playbook-software-library/README.md) | Core programmatic utilities and schema checks. |

---

## 🛠️ Local Development & Contributing

### Prerequisites
- **Node.js**: `>=18.0.0`
- **pnpm**: `>=8.0.0`

### Setup
- Clone the repository: `git clone https://github.com/bogsp/playbook.git`
- Navigate: `cd playbook`
- Install workspace dependencies: `pnpm install`
- Run drift validation: `node packages/check-drift.mjs`

---

## 🔗 Resources & Guides
- **Live Web App & Docs:** [bogsp.github.io/playbook](https://bogsp.github.io/playbook/)
- **The Context Kit Guide:** Available on [Raket.ph](https://raket.ph)

---

## 📄 License
Licensed under the [MIT License](LICENSE).
