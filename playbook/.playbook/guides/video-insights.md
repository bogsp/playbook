# Using Video as a Reference
# File: .playbook/guides/video-insights.md

> A video watched mid-project can challenge an existing decision, open a new direction, or validate what you are already doing. This guide gives those insights a proper home and a proper process — so nothing gets lost and nothing gets imported too quickly.

---

## How It Works

```
Watch a video
     ↓
Extract the key ideas with Gemini
     ↓
Save the insight file to .kit/_refs/video-insights/
     ↓
Discuss it in a Playbook session
     ↓
Decide: integrate, defer, or set aside
```

That is the whole process. Gemini does the extraction. Playbook does the thinking. You make the call.

---

## Step 1 — Extract with Gemini

Open Gemini and send this prompt with the video URL. Gemini can read YouTube transcripts directly.

**Base prompt — copy and customise:**

```
Please summarise the main arguments in '[Video Title]' by [Channel Name].
Use the transcript to highlight the most important takeaways.
[URL]

Structure your response using this template:

---
title: "[Video Title]"
source: "[Channel Name]"
url: [URL]
date: [Today's Date]
type: [general | tutorial | case-study | framework | opinion | research]
topics: [2–4 relevant tags]
relevance:
---

## Core Idea
One paragraph. The central argument or insight.

## Key Points
3–5 most important takeaways. No more.

## Connections
Leave blank.

## Status
Pending

Output as a downloadable markdown file.
```

**Add one extra section based on the video type:**

| Video type | Add this section |
|---|---|
| Tutorial or how-to | `## Steps` — the process in order |
| Case study | `## Outcome` — what happened and what it proved |
| Framework or system | `## Framework` — the model, how it works, how it is applied |
| Opinion or commentary | `## Counterarguments` — objections and limitations |
| Research or data | `## Evidence` — data points and what they actually show |

---

## Step 2 — Save the File

Save the Gemini output to:

```
.kit/_refs/video-insights/[short-descriptive-title].md
```

Use lowercase with hyphens. Keep it short and recognisable.

```
.kit/_refs/video-insights/atomic-habits-james-clear.md
.kit/_refs/video-insights/lean-startup-overview.md
.kit/_refs/video-insights/colour-grading-basics.md
```

---

## Step 3 — Discuss It in a Session

Upload the insight file alongside your kit files, then send:

```
I have a new video insight to discuss.
File: .kit/_refs/video-insights/[filename].md

Review it and:
1. Summarise the core idea in one sentence
2. Identify any connections to our current project
3. Flag any conflicts with decisions already made
4. Suggest whether this should open a question, settle a decision,
   add a task, or flag a risk
5. Ask me how I want to proceed

Do not integrate anything yet. Surface the connections and wait.
```

This step is not optional. Insights are never integrated directly from the file — they always go through a discussion first.

---

## Step 4 — Make a Decision

After the discussion, choose one of three outcomes:

### Integrate

The insight is relevant and changes or confirms something in the project.

Promote it to the right place in the kit:

| What it does | Where it goes |
|---|---|
| Opens a question | `.kit/02-exploration.md` — Open Questions |
| Settles a decision | `.kit/02-exploration.md` — Settled Decisions |
| Adds a task | `.kit/03-execution.md` — Tasks |
| Flags a risk | `.kit/03-execution.md` — Known Problems |

Then update the insight file:
```
## Connections
[What was integrated and where]

## Status
Integrated
```

### Defer

Not relevant now but might be later. Update the file:
```
## Status
Pending
```

Leave it in `_refs/`. Review it when the project context shifts.

### Set Aside

Not relevant to this project. Update the file:
```
## Status
Set Aside
```

It stays in `_refs/` as a record. Nothing is deleted.

---

## Step 5 — Log It

Add one line to `.kit/04-progress.md`:

```
- **Decided:** [Video title] — Integrated | Deferred | Set Aside
  [One line on what was integrated or why it was set aside]
```

---

## Rules

- Gemini extracts. Playbook connects. The discussion step is never skipped.
- The `Connections` and `Relevance` fields in the insight file are filled during a Playbook session — not by Gemini.
- Insights that are set aside stay in `_refs/` — they are never deleted.
- Every integrated insight is traceable back to a decision in `.kit/02-exploration.md`.
- Every decision is logged in `.kit/04-progress.md`.

---

## Activating This Expansion

When you have insights to discuss, declare it in `.kit/01-process.md`:

```
Active Expansions: video-insights
```

Clear it when you are done:

```
Active Expansions: none
```

---

## File Templates

The base template and variant reference are in:

```
.kit/_refs/video-insights/video-insight-base.md
.kit/_refs/video-insights/video-insight-variants.md
```

Copy `video-insight-base.md` as a starting point if Gemini is unavailable or you are extracting insights manually.
