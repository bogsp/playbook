---
file: '.playbook/README.md'
responsibility: 'The Playbook entry for people — how to start a session, what your AI will do, where things live, and what to do when a session runs out.'
ai_instructions: 'AI sessions do not start here — start at .playbook/_index.md. This file is for people; every behavior it promises cites a rule in rules.md.'
archive_rule: 'N/A — core file. Keep in step with rules.md; when a cited rule changes, update the line here in the same pass.'
owner: playbook
cites: [C1, C4, C9, C10]
---

# Playbook in This Project

Playbook is how this project keeps its planning and your AI in step: decide before building, write it down once, and pick up where you left off in any session, in any AI tool. You do not need to read more than this page to use it.

## Start a session

Give your AI the file `.playbook/_index.md` and this message:

```
Start a Playbook session. Follow the Session Start in the attached _index.md.
```

If your tool can open this repository, say `.playbook/_index.md` instead of attaching it. Either way, your AI works out what it can open, asks you for anything it is missing, tells you what it loaded and where the project stands, and waits for you.

## What your AI will do

- Ask when something is unclear instead of guessing (C1).
- Tell you before making a structural decision (C4).
- Say what files it delivered and where, never "done" for a file you do not have (C9).
- Mark a change that touches several files, so a new session can finish or undo it (C10).
- Update `kit/01-process.md` and `kit/04-progress.md` at the end of every session, and tidy any kit file that has grown past its limit (Session end in `rules.md`).

## Where to start

| Your situation | Go to |
|---|---|
| New project | [pipeline.md](pipeline.md), **A new project** |
| Existing project, documented | [adopt.md](https://github.com/bogsp/playbook/blob/main/playbook/.playbook/adopt.md) |
| Existing project you do not fully understand | [audit.md](https://github.com/bogsp/playbook/blob/main/playbook/.playbook/audit.md) |
| Just want session continuity, no pipeline | [kit/00-guide.md](kit/00-guide.md) |
| Bring a video into the project | [expansions.md](expansions.md), **Video Insights** |

## Where things are

| File | What it is |
|---|---|
| [_index.md](_index.md) | This project's entry for the AI: what it is, where it stands, project rules |
| [rules.md](rules.md) | The rules every session follows |
| [pipeline.md](pipeline.md) | The stages, from Discovery to Handoff |
| [kit/](kit/) | The project's state: where you are, decisions, plan, log |
| [maintenance.md](maintenance.md) | Keeping everything tidy as the project grows |

## When a session runs out

Context fills up, usage limits hit, or the AI drifts. When that happens, start a new session with the same message above. Everything that matters is in the `kit/` files, so nothing is lost; any change that was cut short is marked in `kit/01-process.md`.

## Your settings

`review-gate` sets how much your AI stops to ask before continuing, and `pipeline-mode` sets whether the full pipeline applies. Both are in `_index.md`, and you can change either at any time. Your AI never changes them on its own. The meaning of each level is in [rules.md](rules.md).
