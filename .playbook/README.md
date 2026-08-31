---
file: '.playbook/README.md'
responsibility: 'Human-facing readme for this repo — what it is and how to work with it as a person, not as an AI session.'
ai_instructions: 'AI sessions do not start here — start at .playbook/_index.md. This file exists for human readers browsing the repo.'
archive_rule: 'N/A — living document, keep current with the actual repo.'
---

# Playbook

Source for `create-playbook`, `@bogsp/playbook-software-library`, and the
domain-agnostic template files those tools ship. If you're looking for how to
*use* Playbook in a project, see
[playbook/.playbook/README.md](../playbook/.playbook/README.md) instead —
that's the template a consuming project actually gets.

**AI sessions:** start at [.playbook/_index.md](_index.md) — it's the entry
point for session rules, project structure, and where to find everything else
on this repo.

## Packages

- [`packages/create-playbook`](../packages/create-playbook) — the CLI (`create-playbook` on npm)
- [`packages/playbook-software-library`](../packages/playbook-software-library) — `@bogsp/playbook-software-library`

## Development

```bash
pnpm install
pnpm lint       # biome check packages
pnpm format     # biome format --write packages
```

To rebuild the CLI's shipped templates from `playbook/` source:

```bash
cd packages/create-playbook
pnpm build
```

## License

MIT
