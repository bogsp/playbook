# Playbook

The complete pipeline for this project — from idea to deployed code.

---

## What Is Playbook?

Playbook is a structured development pipeline that keeps humans and AI aligned
at every stage of a project. It combines project management, architecture
documentation, and code standards into a single coherent system.

Everything is defined before it is built. Everything built is reflected in the docs.
Nothing drifts silently.

---

## The Pipeline

```
Context Kit   →   PRD / Specs   →   DDA   →   Code   →   Rollout
```

| Stage | What It Is | Where It Lives |
|---|---|---|
| Context Kit | Thinking, decisions, project management | `kit/` |
| PRD / Specs | What to build and why | `docs/` |
| DDA | How it is structured and how parts relate | `.playbook/` |
| Code | Implementation | `src/` |
| Rollout | Generated snapshots for support and AI context | `docs/rollout/` |

---

## Where to Start

### New project
1. Read `docs/playbook-guide.md` — Section 3: Starting a New Project
2. Upload `kit/01-process.md` + `kit/03-execution.md` to start your first Context Kit session
3. Work through the pipeline stage by stage

### Existing project (adopting Playbook)
1. Read `guides/adopt-with-kit.md` or `guides/adopt-without-kit.md`
2. Run the structured audit prompt
3. Scaffold `.playbook/` around existing code
4. Adopt incrementally — nothing breaks

### Resuming work
1. Upload your current kit files and relevant `.playbook/` docs
2. Use the session prompts in `kit/00-prompts.md`

---

## Key Files

| File | Read When |
|---|---|
| `.playbook/00-playbook.md` | Start of every AI dev session |
| `docs/code-standards.md` | Always paired with `00-playbook.md` |
| `.playbook/_index.md` | Understanding project structure |
| `kit/00-prompts.md` | Starting or resuming any session |
| `docs/playbook-guide.md` | Learning the full pipeline |

---

## Rules

- Nothing gets coded without a `.playbook/` doc
- Docs stay in sync with code — run sync before every PR
- All code passes Biome check and format before commit
- Kit files are updated at the end of every session
- Progress log is append-only — never edit past entries

---

*The doc is the contract. The code follows.*
