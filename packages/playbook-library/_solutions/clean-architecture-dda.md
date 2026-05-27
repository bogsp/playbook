# Clean Architecture DDA Layout
# File: packages/playbook-library/_solutions/clean-architecture-dda.md
# Version: 1.0.0

---
id: clean-architecture-dda
type: solution
status: active
applies-to: [dda, clean-architecture, module-structure]
integrations: []
---

## What It Solves

Keeping Design Driven Architecture docs aligned with the implementation's Clean
Architecture layers. Prevents flat DDA folders from hiding layer drift.

## Behavior

**Required DDA layout:**

```text
.playbook/apps/<app>/<layer>/<component-or-sequencer>.md
.playbook/packages/<package>/<layer>/<component-or-sequencer>.md
```

Valid layer folders:
- `domain` -- entities, value objects, pure business rules
- `application` -- use cases, sequencers, orchestration, ports
- `infrastructure` -- adapters and external I/O
- `interface` -- HTTP, CLI, UI, route composition, framework entrypoints

**Rules:**
- Every component and sequencer DDA doc declares `layer`
- The DDA file path must match the declared `layer`
- The implementation file path must match the declared `layer`
- Module `_index.md` files stay at the module root
- Module `_index.md` links point into layer folders
- Sequencers usually live in `application`
- Interface files may call sequencers, but must not hide sequencing logic

## Failure Modes

- DDA says `layer: application`, but the file lives at module root
- DDA says `layer: application`, but implementation is a router/server file
- A sequencer points to interface code and is marked active without an exception
- Links in `_index.md` still point to old flat paths

## Constraints

- If path, declared layer, and implementation path disagree, the DDA is draft
- Leaf component logic must not be embedded in sequencers
- Every item in a sequencer sequence resolves to a DDA doc or is explicitly draft/TODO
