# create-playbook
# File: packages/create-playbook/README.md

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
pnpm dlx create-playbook my-project   # scaffold into a new folder
pnpm dlx create-playbook .            # scaffold in the current directory
```

The CLI asks a small number of questions and scaffolds the correct structure:

1. **Project name**
2. **Domain** — software / writing / production / manufacturing / none
3. **Do you have existing work?**
   - No → Starting from scratch
   - Yes → Is the existing work well understood or does it need investigating first?
     - Well understood → Adopting existing project
     - Needs investigating → Auditing existing project before adopting
4. **Install library?** (software domain only — installs `@bogsp/playbook-software-library`)
5. **Pipeline mode** — `kit-only` (default; just the six kit files, no flows/contracts/planning docs required) or `full` (the complete Discovery-through-Handoff pipeline)
6. **Review gate** — how much the AI stops for your approval: `balanced` (default), `strict` (every step), or `lean` (balanced + batched review)

The scaffold is tailored to your answers:
- Domain vocabulary folder included for the chosen domain
- Kit files pre-populated with the correct phase and expansion state
- Guides filtered to what is relevant — no unused files
- `docs/rewrite/` scaffolded only for audit projects
- Library docs copied into `.playbook/` for software projects that opt in
- `.playbook/_index.md`'s frontmatter carries your chosen `pipeline-mode` and `review-gate` — edit it anytime to change either setting later

---

### `sync`

Update library docs in an existing software project.

```bash
pnpm dlx create-playbook sync
```

Checks the installed `@bogsp/playbook-software-library` version against the latest,
lists which docs have changed, and guides you through updating. Must be run inside
a Playbook project.

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

Must be run inside a Playbook project (`.playbook/_index.md` must exist).

| Type | What it generates | Where it goes |
|---|---|---|
| `flow` | A flow document with sections pre-structured for scope and trigger type | `docs/flows/` |
| `contract` | A contract companion to an existing flow | `docs/contracts/` |
| `component` | A planning doc for a single piece of work | `.playbook/` |
| `concern` | A cross-cutting capability doc | `.playbook/_concerns/` |
| `integration` | An external service or library doc | `.playbook/_integrations/` |

Each generator asks for the required fields and drops a correctly structured file
in the right location. Flow and contract generators update the relevant `_index.md`
automatically.

---

## What Gets Scaffolded

### All projects

```
.playbook/
  README.md                   — human-facing readme for this project
  pipeline.md                 — how the pipeline works
  maintenance.md              — keeping files lean and current
  _index.md                   — single entry point: session rules, structure,
                                 project map, review-gate and pipeline-mode
  templates/                  — universal planning-doc shapes (entry: _index.md)
  _concerns/
  _integrations/
  _shared/
  rules.md
  expansions.md
    [new-project | adopt | audit].md  — based on project type
.playbook/kit/
  00-guide.md
  01-process.md               — pre-populated with correct phase and expansion
  02-exploration.md
  03-execution.md
  04-progress.md               — pre-populated with project type entry
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

### Software domain (additional)

```
.playbook/
  vocabulary-software/
    _index.md              — vocabulary, planning-doc shapes, and AI rules combined
  _concerns/          — library concern docs (if library installed)
  _integrations/      — library integration docs (if library installed)
  _solutions/         — library solution docs (if library installed)
```

### Writing / Production / Manufacturing domains (additional)

```
.playbook/
  vocabulary-[domain]/
    _index.md              — vocabulary, planning-doc shapes, and AI rules combined
```

### Audit projects (additional)

```
docs/
  rewrite/
    system-map.md
    decision-record.md
    risk-register.md
```

---

## After Scaffolding

1. Read `.playbook/_index.md` — the entry point: session rules, structure, and where to start
2. Read the start path for your project type in `.playbook/pipeline.md` (Starting):
   - New project → A new project
   - Adopting → An existing project
   - Auditing → the Audit in `.playbook/expansions.md`
3. Open `.playbook/kit/00-guide.md` — copy your first session prompt

---

## Building

Templates are copied from the Playbook source files at build time. To rebuild:

```bash
pnpm build
```

This copies the files listed in [`../template-manifest.json`](../template-manifest.json)
from `playbook/.playbook/` and `playbook/docs/` into `templates/`. That manifest is
the only list of shipped files — add or remove a template there, nowhere else.

`templates/` is gitignored build output: run `pnpm build` after cloning and
before running the CLI locally. It is rebuilt automatically on publish.

---

## Notes

- `.playbook/` and `.playbook/kit/` are Playbook's world — never shipped with your project
- `docs/flows/` and `docs/contracts/` belong to your project
- `generate` commands require an initialized Playbook project
- `sync` is only relevant for software domain projects using the library
