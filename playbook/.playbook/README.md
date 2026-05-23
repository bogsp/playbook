# Playbook
# File: .playbook/README.md

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Everything is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

Playbook is a dev-dependency — present during development, invisible in production.

---

## Where to Start

| If you are... | Start here |
|---|---|
| New to Playbook | You're in the right place — read on |
| Starting a new project | [`.playbook/.guides/new-project.md`](./.guides/new-project.md) |
| Adopting an existing project | [`.playbook/.guides/adopt.md`](./.guides/adopt.md) |
| Resuming a project | [`.kit/00-prompts.md`](../.kit/00-prompts.md) |
| Starting an AI dev session | [`.playbook/00-rules.md`](./00-rules.md) |
| Resuming from a rollout doc | `docs/rollout/[milestone].md` → [`.playbook/00-rules.md`](./00-rules.md) |
| Looking up pipeline reference | [`.playbook/pipeline.md`](./pipeline.md) |
| Looking up session prompts | [`.kit/00-prompts.md`](../.kit/00-prompts.md) |

---

## The Pipeline

```
[Reverse Engineer] → Context Kit → PRD → Flows → Contracts → DDA → Code → Rollout
```

`[Reverse Engineer]` is conditional — only for existing projects. See the adoption guide.

| Stage | What It Is | Where It Lives |
|---|---|---|
| Reverse Engineer | Maps what exists before building what should exist | `docs/rewrite/` |
| Context Kit | Thinking, decisions, project management | `.kit/` |
| PRD | What to build and why | `docs/` |
| Flows | Runtime paths | `docs/flows/` |
| Contracts | Implementation boundaries | `docs/contracts/` |
| DDA | Component structure and relationships | `.playbook/` |
| Code | Implementation | `src/` |
| Rollout | Generated snapshots for support and AI context | `docs/rollout/` |

---

## Expansions

Expansions are optional pipeline stages that extend Playbook for specific needs.
They do not change the core pipeline — they plug in around it.

| Expansion | When to Use | Guide |
|---|---|---|
| Reverse Engineer | Existing or legacy projects | [`.playbook/.guides/expansions/reverse-engineer.md`](./.guides/expansions/reverse-engineer.md) |
| Video Insights | Research-driven ideation from video content | Coming soon |

Activate expansions in `.kit/01-process.md` under `Active Expansions`.

---

## Key Rules

- Nothing gets coded without a `.playbook/` doc
- Flows and contracts are approved before any DDA docs are written
- Docs stay in sync with code — run sync before every PR
- Kit files are updated at the end of every session
- Progress log is append-only — never edit past entries
- Expansions are declared in `01-process.md` before use

---

_The doc is the contract. The code follows._

For the full pipeline reference, read [`.playbook/pipeline.md`](./pipeline.md).
