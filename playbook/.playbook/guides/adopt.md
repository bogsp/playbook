# Adoption Guide
# File: .playbook/guides/adopt.md

Bringing an existing project into Playbook without breaking anything. Four questions determine where you start.

---

## Where Do You Start?

**1. Does the project have any documentation?**
- No → start at [Discovery](../pipeline.md#stage-2--discovery)
- Yes → continue to question 2

**2. Is the documentation current and accurate?**
- No → start at [Audit](../pipeline.md#stage-0--audit-existing-projects-only)
- Yes → continue to question 3

**3. Are the paths and rules defined?**
- No → start at [Mapping](../pipeline.md#stage-3--mapping)
- Yes → continue to question 4

**4. Does every piece have a planning document?**
- No → start at [Planning](../pipeline.md#stage-5--planning)
- Yes → you are already running Playbook — set up your [kit files](../kit/) and continue

---

## Setting Up

Regardless of where you start, do this first:

1. Copy the kit files from [.playbook/kit/](../kit/) into your project
2. Open [01-process.md](../kit/01-process.md) — fill in the project name, current stage, and what's next
3. Open [02-exploration.md](../kit/02-exploration.md) — record what you already know: key decisions made, open questions, known constraints
4. Open [03-execution.md](../kit/03-execution.md) — record the current plan and any known issues

---

## If the Project Needs an Audit First

An audit maps what already exists before anything changes. It runs as Stage 0 and hands off findings directly into your kit files.

Full guide: [reverse-engineer.md](reverse-engineer.md)

---

## Starting Your First AI Session

Open [00-prompts.md](../kit/00-prompts.md) and use the **Adopting an Existing Project** prompt.

---

## Reference

- Full pipeline breakdown — [pipeline.md](../pipeline.md)
- How session files work — [context-kit.md](context-kit.md)
- Mapping an existing project — [reverse-engineer.md](reverse-engineer.md)
