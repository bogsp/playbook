---
id: [project-name]
type: structure
scope: project
status: draft
entry: []
modules: []
concerns: [logging, error-handling, auth]
integrations: []
---
<!-- TODO: Describe the project purpose in one paragraph -->

## Structure

- [PLAYBOOK.md](../PLAYBOOK.md) — pipeline starter and project overview
- [.playbook/](./)
  - [00-playbook.md](./00-playbook.md) — Playbook rules; read first every AI session
  - [_index.md](./_index.md) — this file; project manifest and folder tree
  - [_concerns/](./_concerns/)
    - [logging.md](./_concerns/logging.md) — structured JSON logging via DI
    - [error-handling.md](./_concerns/error-handling.md) — typed Result pattern across all layers
    - [auth.md](./_concerns/auth.md) — permission checks at orchestrator boundaries
  - [_integrations/](./_integrations/) — (empty — add as integrations are defined)
  - [_shared/](./_shared/) — (empty — add cross-module components here)
- [docs/](../docs/)
  - [code-standards.md](../docs/code-standards.md) — implementation rules; always paired with 00-playbook.md
  - [playbook-guide.md](../docs/playbook-guide.md) — complete pipeline reference
  - [rollout/](../docs/rollout/) — generated milestone snapshots; never edit directly
- [kit/](../kit/)
  - [00-prompts.md](../kit/00-prompts.md) — session start prompts
  - [01-process.md](../kit/01-process.md) — workflow rules and current state
  - [02-exploration.md](../kit/02-exploration.md) — open questions and closed decisions
  - [03-execution.md](../kit/03-execution.md) — guidelines, plan, and tasks
  - [04-progress.md](../kit/04-progress.md) — append-only progress log
  - [05-kanban.md](../kit/05-kanban.md) — ticketed work breakdown (optional)
  - [06-qa.md](../kit/06-qa.md) — test cases and sign-off (optional)

## Detail
<!-- Architecture decisions, constraints, known assumptions -->
