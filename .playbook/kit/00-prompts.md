---
file: '.playbook/kit/00-prompts.md'
responsibility: 'Collection of standardized prompts for initiating and guiding AI sessions.'
ai_instructions: 'Do not modify this file. Use it as a static reference for session boot sequences, transitions, and localized knowledge packet loading.'
archive_rule: 'N/A - This is a living template file.'
---

# Session Prompts

Copy the prompt that matches your situation. Attach the files listed, then send.

Every prompt below attaches `.playbook/_index.md` — it's the entry point for
session rules and project structure, and comes first regardless of which
prompt you use. If your tool has a hard limit on what you can attach at once,
send `_index.md` + `01-process.md` + `04-progress.md` first; that alone is
usually enough to resume, with the rest sent only if the task needs it.

---

## Starting or Resuming — Context Kit Standalone

Use this when you're running the six kit files on their own, with no pipeline
stages, flows, contracts, or planning documents. See
[context-kit-standalone.md](../guides/context-kit-standalone.md) for the full
guide.

**Attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`, `.playbook/kit/04-progress.md` (+ `05-kanban.md`, `06-qa.md` if active)

```
I'm using the Playbook Context Kit on its own — no pipeline stages, no planning documents.
Everything you need is attached: _index.md for session rules, plus the current kit files.
Confirm the current state briefly. Do not reopen settled decisions unless I ask. Wait for my instruction.
```

---

## Starting a New Project

**Attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`

```
I am starting a new Playbook project. Read all attached files before responding.
Confirm what stage we are at, what the next step is, and wait for my instruction.
Do not begin any work until I give you a specific task.
```

---

## Picking Up Where You Left Off

**Attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`, `.playbook/kit/04-progress.md` (+ `05-kanban.md`, `06-qa.md` if active)

```
I am resuming a Playbook project. Everything you need is attached: _index.md
for session rules, plus the current kit files. Focus only on what is current.
Do not reopen settled decisions unless I ask. Confirm the current state briefly,
then wait for my instruction.
```

---

## Loading a Localized Context Packet (Packets A–E)

**Message 1 — attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/03-execution.md`

```
I am uploading active project steering files. I will follow up with a high-context isolated knowledge packet.
This message: entry point, process, and execution. Next: Isolated Knowledge Packet.
Confirm briefly.
```

**Message 2 — attach:** [Specific bundle of files mapping to Packet A, B, C, D, or E]

```
Here is Packet [A/B/C/D/E]. Read the frontmatter and any declared invariants completely to initialize your understanding of the localized system constraints. Do not assume traditional SaaS cloud architectures or standard web stack overhead unless explicitly directed by the declared invariants.
```

_(This is the one prompt in this file that still uses two messages deliberately — the packet itself may be large or arrive from a separate source, not a kit-file-size constraint.)_

---

## Adopting an Existing Project

**Attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`

```
I am bringing an existing project into Playbook. Read all attached files before responding.
My project is at the [stage] stage. Confirm the current state and wait for my instruction.
Do not begin any work until I give you a specific task.
```

---

## Starting an Audit

**Attach:** `.playbook/_index.md`, `.playbook/guides/audit.md`, `.playbook/kit/01-process.md`

```
I am starting an audit. Read all attached files before responding.
The current phase is [phase]. Confirm and wait for my instruction.
Do not advance to the next phase without my explicit approval.
```

---

## Generating a Milestone Summary

**Attach:** `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`, `.playbook/kit/04-progress.md`

```
Generate a milestone summary for [milestone name].
Use only the attached files as your source. Do not invent or infer anything not present.
Format: what was built, key decisions made, what is next.
Save to `docs/rollout/[milestone-name].md`.
```

---

## Video Insights

**Attach:** `.playbook/_index.md`, `.playbook/guides/video-insights.md`

```
I have a video I want to extract insights from.
Title: [video title]
Source: [URL or description]
I will provide the transcript or summary in my next message. Wait for it before doing anything.
```

---

## Resuming from a Milestone

**Attach:** `docs/rollout/[milestone].md`, `.playbook/_index.md`, `.playbook/kit/01-process.md`

```
I am resuming from a milestone snapshot. Read all attached files before responding.
Confirm the current state and what comes next. Wait for my instruction.
Do not begin any work until I give you a specific task.
```
