# Session Prompts

# File: .playbook/kit/00-prompts.md

Copy the prompt that matches your situation. Attach the files listed, then send.

---

## Starting a New Project

**Attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/_index.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`

> I am starting a new Playbook project. Read all attached files before responding.
> Confirm what stage we are at, what the next step is, and wait for my instruction.
> Do not begin any work until I give you a specific task.

---

## Picking Up Where You Left Off

**Message 1 — attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/kit/01-process.md`, `.playbook/kit/03-execution.md`

> I am resuming a Playbook project. Files coming in two messages.
> This message: instructions, process, and execution. Next: exploration and progress.
> Focus only on what is current. Do not reopen settled decisions unless I ask.
> Brief confirmation only.

**Message 2 — attach:** `.playbook/kit/02-exploration.md`, `.playbook/kit/04-progress.md`

> Here is the context from earlier work. Brief confirmation only. Wait for my instruction.

Add `.playbook/kit/05-kanban.md` and `.playbook/kit/06-qa.md` to Message 2 when active.

---

## Loading a Localized Context Packet (Packets A–E)

**Message 1 — attach:** `.playbook/kit/01-process.md`, `.playbook/kit/03-execution.md`

> I am uploading active project steering files. I will follow up with a high-context isolated knowledge packet.
> This message: Process + Execution. Next: Isolated Knowledge Packet.
> Confirm briefly.

**Message 2 — attach:** [Specific bundle of files mapping to Packet A, B, C, D, or E]

> Here is Packet [A/B/C/D/E]. Read the absolute front-matter metadata headers completely to initialize your understanding of the localized system constraints and invariants. Do not assume traditional SaaS cloud architectures or standard web stack overhead unless explicitly directed by the metadata invariants.

---

## Adopting an Existing Project

**Attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`

> I am bringing an existing project into Playbook. Read all attached files before responding.
> My project is at the [stage] stage. Confirm the current state and wait for my instruction.
> Do not begin any work until I give you a specific task.

---

## Starting a Audit

**Attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/guides/audit.md`, `.playbook/kit/01-process.md`

> I am starting a audit audit. Read all attached files before responding.
> The current phase is [phase]. Confirm and wait for my instruction.
> Do not advance to the next phase without my explicit approval.

---

## Generating a Milestone Summary

**Attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/kit/01-process.md`, `.playbook/kit/02-exploration.md`, `.playbook/kit/03-execution.md`, `.playbook/kit/04-progress.md`

> Generate a milestone summary for [milestone name].
> Use only the attached files as your source. Do not invent or infer anything not present.
> Format: what was built, key decisions made, what is next.
> Save to `docs/rollout/[milestone-name].md`.

---

## Video Insights

**Attach:** `.playbook/AI-INSTRUCTIONS.md`, `.playbook/guides/video-insights.md`

> I have a video I want to extract insights from.
> Title: [video title]
> Source: [URL or description]
> I will provide the transcript or summary in my next message.
> Wait for it before doing anything.

---

## Resuming from a Milestone

**Attach:** `docs/rollout/[milestone].md`, `.playbook/AI-INSTRUCTIONS.md`, `.playbook/kit/01-process.md`

> I am resuming from a milestone snapshot. Read all attached files before responding.
> Confirm the current state and what comes next. Wait for my instruction.
> Do not begin any work until I give you a specific task.
