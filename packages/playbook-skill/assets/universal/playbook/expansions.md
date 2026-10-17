---
file: '.playbook/expansions.md'
responsibility: 'Optional processes that run alongside the pipeline — the Audit (map an existing project before changing it) and Video Insights (turn a video into reference material) — and how to declare one.'
ai_instructions: 'Load only when 01-process.md declares an active expansion, or the person asks for an audit or video insights. Do not load otherwise.'
archive_rule: 'N/A — core reference file.'
owner: playbook
---

# Expansions

An expansion is an optional process that runs alongside the pipeline and then hands its findings back to the kit. Two ship with Playbook: the **Audit** and **Video Insights**. Load this file only when one is active.

---

## Declaring an Expansion

In `kit/01-process.md`, name the expansion and, if it has phases, the current one:

```
Active Expansions: video-insights

Active Expansions:
  audit: inventory
```

Update the phase as it advances. Clear the expansion when it is complete.

---

## Audit

Use the audit when you need to understand an existing project before redesigning or rebuilding any part of it. Mapping what exists first prevents breaking things that work and repeating decisions already made.

### The Phases

The audit runs in six phases, in order. Each phase requires your review before the next one starts. Nothing advances on its own.

| Phase      | What happens                                                               |
| ---------- | -------------------------------------------------------------------------- |
| Inventory  | List everything that exists — files, folders, dependencies, entry points   |
| Audit      | Examine each piece — what it does, what depends on it, what its quality is |
| Classify   | Give every piece a verdict — keep, rewrite, replace, or remove             |
| Risk map   | Identify what breaks if X changes, in what order things can safely change  |
| Gap report | Compare what exists against what is needed — name every gap                |
| Handoff    | Feed findings into the kit files and close the audit                       |

---

### What It Produces

| File                              | What it holds                                                 |
| --------------------------------- | ------------------------------------------------------------- |
| `docs/rewrite/system-map.md`      | What exists, where it lives, what depends on what             |
| `docs/rewrite/decision-record.md` | A verdict on every major piece with reasoning                 |
| `docs/rewrite/risk-register.md`   | What breaks if X changes, and the safe order to change things |

---

### Handoff

When all phases are complete, findings feed directly into:

- [02-exploration.md](kit/02-exploration.md) — settled decisions from the audit
- [03-execution.md](kit/03-execution.md) — known issues, risks, and the plan forward
- [01-process.md](kit/01-process.md) — current stage and what comes next

After handoff, the project continues from whichever pipeline stage the findings point to. Use the four questions in **Starting** in [pipeline.md](pipeline.md) to determine where that is. If the audit surfaces a project identity that no longer matches `.playbook/_index.md` or `README.md`, update them per Keep Project Identity Current in [maintenance.md](maintenance.md) as part of handoff.

---

### Rules

- No planning documents are written during inventory, audit, or classify phases
- No phase advances without human review
- No findings are discarded — everything goes into the relevant output file or is explicitly marked out of scope with a reason

---

### Starting the Audit with AI

Open [00-guide.md](kit/00-guide.md) and use the **Audit** prompt.

---

---

## Video Insights

Use video insights when you want to extract ideas, decisions, or research from a video and integrate them into your project.

### What It Does

Video insights turns a video — a tutorial, interview, lecture, or recorded session — into structured reference material that you and your AI can work from directly.

The output lives in `.playbook/kit/_refs/` and is linked from your exploration or execution files wherever it's relevant.

---

### When to Use It

- A video contains a decision, technique, or approach you want to apply to the project
- You want your AI to reason from something that was discussed in a video
- You have research in video form that needs to be available across sessions

---

### The Process

**Step 1 — Identify the video**
Name the video and what you expect to extract from it. Add an open question in [02-exploration.md](kit/02-exploration.md) if there is something specific you are trying to resolve.

**Step 2 — Extract**
Use the **Video insights** prompt from [00-guide.md](kit/00-guide.md). Provide the transcript or a summary. The AI produces a structured insight file.

**Step 3 — Review**
Read the output. Correct anything that was misread or misrepresented. The insight file is only as good as the source material.

**Step 4 — Integrate**
Save the insight file to `.playbook/kit/_refs/[video-name].md`.
Link it from [02-exploration.md](kit/02-exploration.md) or [03-execution.md](kit/03-execution.md) wherever it informs a decision or task.

**Step 5 — Close**
If the video fully answered an open question, close the question in [02-exploration.md](kit/02-exploration.md) with a reference to the insight file.

---

### Output Format

Each insight file follows the same structure:

```
---
file: '.playbook/kit/_refs/[video-name].md'
responsibility: 'Structured insight extracted from [Video Title] — source material for project decisions.'
ai_instructions: 'Reference only. Do not treat as a settled decision unless linked from a Closed Decision in 02-exploration.md.'
archive_rule: 'Move to .playbook/kit/_archives/ once every decision it informed is settled and no longer active.'
---

# [Video Title]

---

**Source:** [URL or description]
**Extracted:** [date]

## Key Points

[Concise, usable points — not a transcript]

## Decisions Informed

[Which open questions or decisions this resolves or informs]

## References

[Timestamps or sections for anything that needs verification]
```
