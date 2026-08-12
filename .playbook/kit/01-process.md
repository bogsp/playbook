---
file: '.playbook/kit/01-process.md'
responsibility: 'Holds ONLY Current State, Active Expansions, and Immediate Next Step.'
ai_instructions: 'Update at the end of every session. Read at the start of the next.'
archive_rule: 'N/A'
---

Phase: Planning
Last Completed: Resolved the template duplication problem (root .playbook/templates.md + .playbook/templates/*.md were stray copies of the canonical playbook/.playbook/templates.md, and shouldn't exist in this repo's own planning-only .playbook/ per _index.md's own Detail note). Decided to retire playbook/.playbook/templates.md in favor of five split per-type files under playbook/.playbook/templates/ (structure, coordinator, component, concern, integration), matching the one-file-per-thing pattern already used in _concerns/, _integrations/, _solutions/, docs/flows/, and docs/contracts/. Also decided software-domain equivalents (vocabulary-software/templates/) get the same split (structure, sequencer, component — concern/integration stay pointer-only). Established the Frontmatter Tiering Rule: DDA/planning docs get the full deep-module header + four-field purpose block + type fields; kit files, flows, contracts, and other planning-adjacent docs get the four-field standard as a non-negotiable floor (never dropped), specifically because prior drift between 02-exploration.md/03-execution.md/04-progress.md was only fixed by giving each kit file an explicit responsibility/ai_instructions boundary — the same drift risk applies to other planning files, so the four-field block is mandatory there too, not optional scaffolding.
Next: Execute K-33 through K-37 in order — generate the 5 split template files (tiered frontmatter, 4-backtick outer / 3-backtick inner fencing), generate the 3 software-vocabulary split files, delete playbook/.playbook/templates.md, update all references to it (_index.md, README.md, vocabulary READMEs, build.js, scaffold.js), and correct K-02's Done note. K-38 (writing/production/manufacturing domain templates) is explicitly deferred — do not start without a fresh scoping discussion. K-12 and K-18 remain open from prior sessions, still not resumed.
Active Modules: kanban
Active Expansions: none
