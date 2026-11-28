---
file: '.playbook/kit/_refs/video-insights/duncan-rogoff-claude-workflows.md'
responsibility: 'Structured insight extracted from "Give Me 13 Minutes and I'll Make You Disgustingly Good With Claude" — source material for Q-13.'
ai_instructions: 'Reference only. Do not treat as a settled decision unless linked from a Closed Decision in 02-exploration.md.'
archive_rule: 'Move to .playbook/kit/_archives/ once Q-13 is settled and no longer active.'
---

# Give Me 13 Minutes and I'll Make You Disgustingly Good With Claude

---

**Source:** https://www.youtube.com/watch?v=OUbEeJOxjyw (Duncan Rogoff | Learn Claude Code)
**Extracted:** 2026-11-28

## Key Points

- **Lean Entry + Pointer Files ([00:02:45], [00:03:22]):** Keep the root instruction file slim as a map/index pointing to separate voice, brand, and reference files loaded only when needed. (Already matched by `.playbook/_index.md`.)
- **One Home Per Fact ([00:03:46]):** Notes point to facts rather than copying them across files to prevent drift. (Already matched by `maintenance.md` and `[K-60]`.)
- **Plan Before Multi-Step Work ([00:04:22], [00:05:03]):** Require a visible plan on tasks with 3+ steps before building so the human can catch structural mismatches early. (Already matched by `pipeline.md` stage gates.)
- **Structured Goal Briefs ([00:06:04], [00:06:44]):** Open-ended/creative briefs work best when specifying outcome + why/numbers, vivid quality bar, existing tools + permission to discover more, plan-adjustment freedom, >=3 self-review passes, exact delivery location, and autonomous completion.
- **Post-Session Workflow Distillation ([00:07:53], [00:08:43], [00:09:16]):** Bottle repeatable workflows into skills/rules *after* debugging them in a live session—explicitly recording (1) trigger condition ("when"), (2) exact step order including the easy-to-miss gotcha step, and (3) what finished output looks like.
- **Sequenced Sub-Jobs & Iterative Refinement ([01:11:19], [01:12:14]):** Split large multi-part deliverables into ordered sub-jobs with review notes folded back into the reusable skill/rule.

## Decisions Informed

- Logs and informs `Q-13` (`-> _refs/questions/Q-13.md`) on adding post-session workflow distillation, a compact Task Brief shape, and `expansions.md` path alignment.

## References

- [00:02:45] Lean index file vs. bloated context
- [00:03:46] Single source of truth ("point to facts, never copy them")
- [00:04:22] Plan mode before 3+ step tasks
- [00:06:04] 7-part goal prompt structure
- [00:07:53] Bottling repeated work into skills & capturing the forgotten step ([00:08:43])
- [00:09:16] Post-session skill extraction from working chat history
