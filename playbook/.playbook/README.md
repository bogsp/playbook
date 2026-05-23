# Playbook
# File: .playbook/README.md

Playbook is a structured development pipeline that keeps humans and AI aligned
from the first idea to deployed code. Everything is defined before it is built.
Everything built is reflected in the docs. Nothing drifts silently.

---

## Where to Start

| If you are... | Start here |
|---|---|
| New to Playbook | You're in the right place — read on |
| Starting a new project | [`.playbook/.guides/new-project.md`](./.guides/new-project.md) |
| Adopting an existing project (has kit files) | [`.playbook/.guides/adopt-with-kit.md`](./.guides/adopt-with-kit.md) |
| Adopting an existing project (no kit files) | [`.playbook/.guides/adopt-without-kit.md`](./.guides/adopt-without-kit.md) |
| Resuming a project | [`.kit/00-prompts.md`](../.kit/00-prompts.md) |
| Starting an AI dev session | [`.playbook/00-rules.md`](./00-rules.md) |
| Resuming from a rollout doc | `docs/rollout/[milestone].md` → [`.playbook/00-rules.md`](./00-rules.md) |
| Looking up pipeline reference | [`.playbook/pipeline.md`](./pipeline.md) |
| Looking up session prompts | [`.kit/00-prompts.md`](../.kit/00-prompts.md) |

---

## The Pipeline

```
Context Kit → PRD → Flows → Contracts → DDA → Code → Rollout
```

| Stage | What It Is | Where It Lives |
|---|---|---|
| Context Kit | Thinking, decisions, project management | `.kit/` |
| PRD | What to build and why | `docs/` |
| Flows | Runtime paths | `docs/flows/` |
| Contracts | Implementation boundaries | `docs/contracts/` |
| DDA | Component structure and relationships | `.playbook/` |
| Code | Implementation | `src/` |
| Rollout | Generated snapshots for support and AI context | `docs/rollout/` |

---

## Key Rules

- Nothing gets coded without a `.playbook/` doc
- Flows and contracts are approved before any DDA docs are written
- Docs stay in sync with code — run sync before every PR
- Kit files are updated at the end of every session
- Progress log is append-only — never edit past entries

---

_The doc is the contract. The code follows._

For the full pipeline reference, read [`.playbook/pipeline.md`](./pipeline.md).
