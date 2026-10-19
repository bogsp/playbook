# create-playbook

Initialize and manage Playbook projects from the command line.

Zero dependencies. Works with pnpm, npx, and yarn dlx.

---

## Usage

```bash
pnpm dlx create-playbook [project-name]
pnpm dlx create-playbook .
npx create-playbook [project-name]
yarn dlx create-playbook [project-name]
```

---

## Commands

### `init` (default)

Initialize a new Playbook project. Runs automatically when no command is given.

```bash
pnpm dlx create-playbook my-project    # scaffold into a new folder
pnpm dlx create-playbook .             # scaffold in the current directory
```

The CLI guides you through interactive configuration:

1. **Project name**
2. **Domain** — `software` / `writing` / `production` / `manufacturing` / `none`
3. **Existing work?**
   - No → Starting from scratch (`new`)
   - Yes → Is it well-understood or does it need investigating first?
     - Well understood → Adopting existing project (`adopt`)
     - Needs investigating → Auditing existing project before adopting (`audit`)
4. **Install library?** (software domain only — installs `@bogsp/playbook-software-library`)
5. **Pipeline mode** — `kit-only` (default; just the six kit files, no flows/contracts/planning docs required) or `full` (complete Discovery-through-Handoff pipeline)
6. **Review gate** — how much the AI stops for your approval: `balanced` (default), `strict` (every step), or `lean` (balanced + batched review)

---

### `adopt`

Bring Playbook into an existing codebase without disrupting current structures.

```bash
pnpm dlx create-playbook adopt [--profile=full|lean]
```

Scaffolds the `.playbook/` kit and integration files directly into an existing repository.

---

### `sync`

Update library docs in an existing software project.

```bash
pnpm dlx create-playbook sync
```

Checks the installed `@bogsp/playbook-software-library` version against the latest, lists changed documentation, and guides you through the update process. Must be run inside a Playbook project.

---

### `generate` / `g`

Generate a single document inside an existing Playbook project.

```bash
pnpm dlx create-playbook generate flow
pnpm dlx create-playbook generate contract
pnpm dlx create-playbook generate component
pnpm dlx create-playbook generate concern
pnpm dlx create-playbook generate integration

# Shorthand
pnpm dlx create-playbook g flow
pnpm dlx create-playbook g contract
```

Must be run inside an initialized Playbook project (`.playbook/_index.md` must exist).

| Type | What it generates | Where it goes |
|---|---|---|
| `flow` | A flow document with sections pre-structured for scope and trigger type | `docs/flows/` |
| `contract` | A contract companion to an existing flow | `docs/contracts/` |
| `component` | A planning doc for a single piece of work | `.playbook/` |
| `concern` | A cross-cutting capability doc | `.playbook/_concerns/` |
| `integration` | An external service or library doc | `.playbook/_integrations/` |

---

## What Gets Scaffolded

### Universal Files & Kit

```
.playbook/
  README.md
  pipeline.md
  maintenance.md
  _index.md                — project manifest, pipeline-mode, and review-gate settings
  templates/               — universal planning-doc shapes
  _concerns/
  _integrations/
  _shared/
  rules.md
  expansions.md
  adopt.md                 — adopt and audit projects only
  audit.md                 — audit projects only
.playbook/kit/
  00-guide.md
  01-process.md
  02-exploration.md
  03-execution.md
  04-progress.md
  05-kanban.md
  06-qa.md
  _refs/
  _tests/
  _archives/
docs/
  flows/
    _index.md
    flow-template.md
  contracts/
    _index.md
    global.md
    contract-template.md
  rollout/
```

### Domain Vocabulary (Software, Writing, Production, Manufacturing)

```
.playbook/
  vocabulary-[domain]/
    _index.md              — combined vocabulary, planning shapes, and AI rules
  _concerns/               — library concern docs (if library installed)
  _integrations/           — library integration docs (if library installed)
  _solutions/              — library solution docs (if library installed)
```

---

## Building

Templates are copied from the monorepo root template manifest at build time. To rebuild:

```bash
pnpm build
```

This reads `template-manifest.json` at the repository root and copies files from `playbook/.playbook/` and `playbook/docs/` into `templates/`.
