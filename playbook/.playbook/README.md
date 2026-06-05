# Playbook
# File: .playbook/README.md

You have something to build.

Maybe it is software. Maybe it is a product, a manuscript, a process,
a system, or something that does not have a name yet.
Whatever it is — it deserves more than a good start and good intentions.

Playbook is a production pipeline. It gives any project a clear structure,
a disciplined process, and a record of every decision from the first idea
to the finished work. It works with any AI tool, without any AI tool,
for any domain, at any scale.

The core principle is simple:

*The work begins before the work begins —
everything built on unclear ground must eventually be rebuilt.*

---

## Before You Start

Read these two files first. Everything else references them.

- [THE-STANDARD.md](./THE-STANDARD.md) — the foundation everything stands on
- [pipeline.md](./pipeline.md) — the stages from idea to done

Five minutes here prevents five hours of confusion later.

---

## Choose Your Vocabulary

Playbook ships with vocabulary guides for different production domains.
Pick the one that matches your project. Delete the rest.

| Domain | Folder | Use when |
|---|---|---|
| Software | `vocabulary-software/` | Building apps, systems, APIs, tools |
| Manufacturing | `vocabulary-manufacturing/` | Physical production, process design |
| Writing | `vocabulary-writing/` | Books, articles, scripts, documentation |

Open your vocabulary folder's `README.md` for domain-specific guidance.
Delete the other vocabulary folders before starting work.

---

## Where to Start

| If you are... | Go here |
|---|---|
| Starting a new project | `guides/new-project.md` |
| Adopting an existing project | `guides/adopt.md` |
| Resuming a project | `kit/00-prompts.md` |
| Starting an AI session | `AI-INSTRUCTIONS.md` + your vocabulary `AI-INSTRUCTIONS.md` |
| Learning how the Kit works | `guides/context-kit.md` |
| Looking up the full pipeline | `pipeline.md` |
| Housekeeping or cleanup | `maintenance.md` |

---

## The Pipeline at a Glance

```
Define → Plan → Map → Contract → Structure → Build → Ship
```

Every stage produces something the next stage depends on.
Nothing is built without a definition. Nothing is defined without a purpose.
The full pipeline is in `pipeline.md`.

---

## The Folder Structure

```
.playbook/
├── README.md              — this file
├── THE-STANDARD.md        — the foundation
├── pipeline.md            — the stages
├── AI-INSTRUCTIONS.md     — universal AI rules
├── maintenance.md         — housekeeping guide
├── _index.md              — project manifest
├── _concerns/             — cross-cutting capabilities
├── _integrations/         — external dependencies
├── _shared/               — reusable components across the project
├── kit/                   — session and decision management
├── guides/                — how to use the pipeline
├── vocabulary-[domain]/   — your chosen domain vocabulary
└── templates/             — blank starters for new documents
```

Project knowledge lives outside `.playbook/`:

```
docs/
├── flows/                 — runtime or process paths
├── contracts/             — implementation rules
├── rewrite/               — map-existing expansion outputs
└── rollout/               — milestone snapshots
```

---

## Removing Playbook

When a project is complete and the pipeline is no longer needed,
Playbook can be cleanly removed. See `maintenance.md` for instructions.

The project knowledge in `docs/` belongs to the project —
it stays regardless of whether Playbook does.

---

*The doc is the contract. The work follows.*
