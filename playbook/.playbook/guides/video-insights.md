---
file: 'playbook/.playbook/guides/video-insights.md'
responsibility: 'How to turn a video into structured reference material for the project — the video-insights expansion.'
ai_instructions: 'Load when a person wants to extract ideas, decisions, or research from a video and integrate them into the project.'
archive_rule: 'N/A — orientation guide.'
---

# Video Insights Guide

Use this guide when you want to extract ideas, decisions, or research from a video and integrate them into your project.

---

## What It Does

Video insights turns a video — a tutorial, interview, lecture, or recorded session — into structured reference material that you and your AI can work from directly.

The output lives in `.playbook/kit/_refs/` and is linked from your exploration or execution files wherever it's relevant.

---

## When to Use It

- A video contains a decision, technique, or approach you want to apply to the project
- You want your AI to reason from something that was discussed in a video
- You have research in video form that needs to be available across sessions

---

## Declaring the Expansion

In [01-process.md](../kit/01-process.md):

```
Active Expansions: video-insights
```

---

## The Process

**Step 1 — Identify the video**
Name the video and what you expect to extract from it. Add an open question in [02-exploration.md](../kit/02-exploration.md) if there is something specific you are trying to resolve.

**Step 2 — Extract**
Use the **Video insights** prompt from [00-guide.md](../kit/00-guide.md). Provide the transcript or a summary. The AI produces a structured insight file.

**Step 3 — Review**
Read the output. Correct anything that was misread or misrepresented. The insight file is only as good as the source material.

**Step 4 — Integrate**
Save the insight file to `.playbook/kit/_refs/[video-name].md`.
Link it from [02-exploration.md](../kit/02-exploration.md) or [03-execution.md](../kit/03-execution.md) wherever it informs a decision or task.

**Step 5 — Close**
If the video fully answered an open question, close the question in [02-exploration.md](../kit/02-exploration.md) with a reference to the insight file.

---

## Output Format

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

---

## Reference

- Session files — [Context Kit — Integrated](context-kit.md)
- All session prompts — [kit/00-guide.md](../kit/00-guide.md)
