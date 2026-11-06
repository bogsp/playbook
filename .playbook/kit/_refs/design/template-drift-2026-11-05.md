# create-playbook templates are older than the 2.0.0 sources (found 2026-11-05)

Found while adding rule C12 (`CHANGELOG.md` 2.1.0). Not resolved: needs a Creator decision.

## Evidence

- `packages/create-playbook/templates/universal/playbook/` is what `create-playbook` scaffolds. At `HEAD` its `rules.md`, `pipeline.md`, `maintenance.md` and `expansions.md` differ from their sources in `playbook/.playbook/`. Running `node packages/create-playbook/build.js` (source to templates) rewrites them: about 700 lines added and 50 removed across the four files.
- The templates were last changed on 2026-10-20 (`6992f58`, `5215816`), after the sources (2026-10-18 and 2026-10-19). That 10-20 work added the expansion-roadmap and stage-gate content to the templates only. The sources never received it, so the build would delete it.
- The templates hold the older pre-2.0.0 shape (no frontmatter cards, no C11 or D3). `create-playbook@3.1.11`, published 2026-10-20, was built from them.
- `npm run check:drift` passes both at `HEAD` and with C12 added, because it compares only `packages/playbook-skill/assets/` with a fresh build and does not compare `create-playbook/templates/`. That is why the drift went unnoticed.

## Effect on C12

C12 is in the source (`playbook/.playbook/rules.md`) and in the skill assets, so Playbook sessions that load the skill get it. Projects scaffolded by `create-playbook` do not, until the templates are brought in line. Nothing was published and the templates were not touched.

## Options

| Option | Result | Cost |
|---|---|---|
| A. Regenerate templates from the sources | Templates match 2.0.0 and carry C12 | Deletes the 10-20 expansion and stage-gate content unless it is ported first |
| B. Port the 10-20 content into the sources, then regenerate | One source of truth; nothing lost; C12 ships | Largest edit; needs the Creator to confirm which 10-20 content is still wanted |
| C. Treat the templates as the source and port 2.0.0 into them | Keeps what was published | Reverses the documented direction (source to templates) and keeps two lines of work |

Recommended: B, then add a check that `create-playbook/templates/` equals a fresh build, so the drift cannot recur. Publishing 2.1.0 waits on the decision.
