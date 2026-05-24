# create-playbook
# File: create-playbook/README.md

Scaffold the Playbook pipeline for any project.

Zero dependencies. Works with npx, pnpm dlx, and yarn dlx.

---

## Usage

```bash
npx create-playbook my-project
pnpm dlx create-playbook my-project
yarn dlx create-playbook my-project
```

Omit the project name to scaffold in the current directory:

```bash
npx create-playbook .
```

---

## What It Creates

```
[project-name]/
  .playbook/
    README.md              -> orientation and journey matrix
    pipeline.md            -> complete pipeline reference
    00-rules.md            -> AI execution layer
    _index.md              -> project manifest
    _concerns/             -> cross-cutting capabilities
    _integrations/         -> external contracts
    _shared/               -> cross-module components
    .guides/               -> guides (copy from Playbook template)
    templates/             -> doc type templates (copy from Playbook template)
  .kit/
    00-prompts.md          -> session prompts
    01-process.md          -> session spark
    02-exploration.md      -> active decisions
    03-execution.md        -> guidelines and plan
    04-progress.md         -> progress log
    05-kanban.md           -> ticket breakdown (optional)
    06-qa.md               -> test registry (optional)
    _refs/                 -> supporting material
    _tests/                -> QA test files
    _archives/             -> lean history
  docs/
    flows/
      _index.md
    contracts/
      _index.md
      global.md
    rewrite/               -> RE expansion outputs (when active)
      system-map.md
      decision-record.md
      risk-register.md
    rollout/
```

---

## After Scaffolding

1. Read `.playbook/README.md` -- find your starting point
2. Read `.playbook/.guides/context-kit.md` -- understand the session layer
3. Open `.kit/00-prompts.md` -- copy your first session prompt
4. Copy `docs/code-standards.md` into the project `docs/` folder

---

## Notes

- `.playbook/` and `.kit/` are Playbook's world -- never shipped
- `docs/flows/`, `docs/contracts/`, and `docs/rewrite/` belong to the project
- The guides in `.playbook/.guides/` are hidden -- not part of the product
- All kit files are templates -- populate them with your project context
