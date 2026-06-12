# Clean Architecture Planning Layout
# File: packages/playbook-software-library/_solutions/clean-architecture-planning-layout.md
# Version: 1.1.0

---
id: clean-architecture-planning-layout
type: solution
status: active
applies-to: [planning-docs, clean-architecture, module-structure]
integrations: []
---

## What It Solves

Keeping planning docs aligned with the implementation's Clean Architecture
layers. Prevents flat planning doc folders from hiding layer drift.

## Behavior

**Required planning doc layout:**

```text
.playbook/apps/<app>/<layer>/<component-or-sequencer>.md
.playbook/packages/<package>/<layer>/<component-or-sequencer>.md
```

Valid layer folders:
- `domain` — entities, value objects, pure business rules
- `application` — use cases, sequencers, orchestration, ports
- `infrastructure` — adapters and external I/O
- `interface` — HTTP, CLI, UI, route composition, framework entrypoints

**Rules:**
- Every component and sequencer planning doc declares `layer`
- The planning doc file path must match the declared `layer`
- The implementation file path must match the declared `layer`
- Module `_index.md` files stay at the module root
- Module `_index.md` links point into layer folders
- Sequencers usually live in `application`
- Interface files may call sequencers, but must not hide sequencing logic

## Failure Modes

- Planning doc says `layer: application`, but the file lives at module root
- Planning doc says `layer: application`, but implementation is a router/server file
- A sequencer points to interface code and is marked active without an exception
- Links in `_index.md` still point to old flat paths

## Constraints

- If path, declared layer, and implementation path disagree, the planning doc is draft
- Leaf component logic must not be embedded in sequencers
- Every item in a sequencer sequence resolves to a planning doc or is explicitly draft/TODO
