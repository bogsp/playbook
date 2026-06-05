---
id: [project-name]
type: structure
scope: project
status: draft
entry: []
contains: []
concerns: []
integrations: []
vocabulary: [software | manufacturing | writing]
---

<!-- Describe the project purpose in one paragraph -->

## Structure

- [.playbook/](./)
  - [README.md](./README.md) — entry point
  - [THE-STANDARD.md](./THE-STANDARD.md) — foundation
  - [pipeline.md](./pipeline.md) — pipeline reference
  - [AI-INSTRUCTIONS.md](./AI-INSTRUCTIONS.md) — universal AI rules
  - [maintenance.md](./maintenance.md) — housekeeping guide
  - [_index.md](./_index.md) — this file; project manifest
  - [_concerns/](./_concerns/) — cross-cutting capabilities
  - [_integrations/](./_integrations/) — external dependencies
  - [_shared/](./_shared/) — reusable units across the project
  - [kit/](./kit/)
    - [00-prompts.md](./kit/00-prompts.md) — session prompts
    - [01-process.md](./kit/01-process.md) — session spark
    - [02-exploration.md](./kit/02-exploration.md) — decision log
    - [03-execution.md](./kit/03-execution.md) — guidelines, plan, tasks
    - [04-progress.md](./kit/04-progress.md) — append-only progress log
    - [05-kanban.md](./kit/05-kanban.md) — ticket breakdown (optional)
    - [06-qa.md](./kit/06-qa.md) — verification registry (optional)
  - [guides/](./guides/)
    - [new-project.md](./guides/new-project.md) — new project walkthrough
    - [adopt.md](./guides/adopt.md) — adoption paths
    - [context-kit.md](./guides/context-kit.md) — kit guide
    - [expansions/](./guides/expansions/)
      - [map-existing.md](./guides/expansions/map-existing.md)
  - [vocabulary-[domain]/](./vocabulary-[domain]/)
    - [README.md](./vocabulary-[domain]/README.md) — domain guide
    - [AI-INSTRUCTIONS.md](./vocabulary-[domain]/AI-INSTRUCTIONS.md) — domain AI rules
  - [templates/](./templates/) — blank document starters
- [docs/](../docs/)
  - [flows/](../docs/flows/) — process paths
  - [contracts/](../docs/contracts/) — implementation rules
  - [rewrite/](../docs/rewrite/) — map-existing outputs
  - [rollout/](../docs/rollout/) — milestone snapshots

## Detail

<!-- Architecture decisions, constraints, known assumptions -->
