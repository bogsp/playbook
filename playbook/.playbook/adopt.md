---
file: '.playbook/adopt.md'
responsibility: 'How to bring an existing project into Playbook: four questions that say where to start, and what to set up first.'
ai_instructions: 'Load only when the person is bringing an existing project into Playbook. Do not load otherwise. Shipped only to projects scaffolded as adopt or audit.'
archive_rule: 'N/A — core reference file.'
owner: playbook
---

# Adopting an Existing Project

Bringing an existing project into Playbook without breaking anything. Four questions determine where you start.

**1. Does the project have any documentation?**

- No → start at [Discovery](pipeline.md#stage-2--discovery)
- Yes → continue to question 2

**2. Is the documentation current and accurate?**

- No → start at [Audit](audit.md)
- Yes → continue to question 3

**3. Are the paths and rules defined?**

- No → start at [Mapping](pipeline.md#stage-3--mapping)
- Yes → continue to question 4

**4. Does every piece have a planning document?**

- No → start at [Planning](pipeline.md#stage-5--planning)
- Yes → you are already running Playbook — set up your [kit files](kit/) and continue

Regardless of where you start, do this first:

1. Copy the kit files from [kit/](kit/) into your project
2. Open [01-process.md](kit/01-process.md) — fill in the project name, current stage, and what's next
3. Open [02-exploration.md](kit/02-exploration.md) — record what you already know: key decisions made, open questions, known constraints
4. Open [03-execution.md](kit/03-execution.md) — record the current plan and any known issues
5. Update `.playbook/_index.md` and `README.md` to reflect this project — see Keep Project Identity Current in [maintenance.md](maintenance.md)

If the project needs an audit first: an audit maps what already exists before anything changes. It runs as Stage 0 and hands off findings directly into your kit files. Full process: [audit.md](audit.md).

Then start your first AI session with this prompt, attaching `.playbook/_index.md`:

```
Start a Playbook session. Follow the Session Start in the attached _index.md.
I'm bringing an existing project into Playbook. It's at the [stage] stage.
```
