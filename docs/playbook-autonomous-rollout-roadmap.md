# Playbook Pipeline Upgrade Roadmap

**Purpose:** Evolve Playbook into a disciplined, increasingly autonomous AI-assisted development pipeline while preserving human control over important decisions, maintaining the project's existing standards, and limiting rework to the smallest affected scope.

**Status:** Proposed roadmap — validate against the current Playbook rules, templates, and Context Kit before implementation.

## 1. Target operating model

The pipeline separates decisions and specifications from execution. Human involvement decreases as artifacts become more concrete and verifiable; AI autonomy increases where work is bounded by explicit contracts, acceptance criteria, and checks.

| Stage | Human involvement | AI involvement | Primary responsibility |
|---|---|---|---|
| Planning | Heavy | Very light | Set outcomes, priorities, constraints, scope, and approval boundaries. |
| Flows | Heavy | Light | Define intended process paths, decisions, exceptions, and user-visible behavior. |
| Contracts | Light | Medium | Formalize interfaces, invariants, inputs/outputs, errors, and compatibility requirements. |
| DDA documentation | Light | Heavy | Produce and maintain detailed design/decision/architecture artifacts in accordance with approved flows and contracts. |
| Rollout | Very light | Heavy | Execute bounded work, coordinate agents, maintain state, run checks, retry safe failures, and verify results. |
| Handoff | Focused review | Heavy preparation | Assemble evidence, summarize changes and known limitations, and present items requiring human acceptance. |

The exact meanings and required contents of DDA artifacts must follow the existing Playbook definitions; this roadmap does not redefine them.

## 2. Governing principles

1. **Preserve approved decisions.** Do not reopen settled decisions simply because a later task encounters difficulty.
2. **Repair locally.** Identify the smallest affected artifact, contract, flow, or task and work outward only when dependencies require it.
3. **Traceability.** Every execution task links to its source requirement, applicable flow, contract, DDA, acceptance criteria, and verification evidence.
4. **Bounded autonomy.** Agents act only within explicit scope, permissions, and resource/retry limits.
5. **Evidence before completion.** A task is not complete merely because an agent reports success; required checks and evidence must pass.
6. **Context Kit stays current.** Update relevant progress and state records at defined checkpoints, using existing formats and append-only conventions where required.
7. **Small, reviewable milestones.** Keep changes and commits focused so failures can be diagnosed and safely reversed.
8. **No silent scope expansion.** Missing requirements, contradictory rules, or unsafe actions trigger a targeted escalation rather than improvisation.
9. **Human authority is explicit.** Planning decisions, scope changes, destructive operations, security-sensitive changes, and other designated approval gates remain with the user.
10. **Follow the repository's established standards.** Do not invent new templates or overwrite existing content without auditing the current files first.

## 3. Roadmap phases

### Phase 0 — Audit the current Playbook

**Goal:** Establish the actual starting point before changing anything.

Tasks:
- Read the Playbook entry point, rules, custom rules, relevant templates, and all applicable `.playbook/kit/` files.
- Map current pipeline stages and identify existing guidance for planning, flows, contracts, DDA, rollout, verification, progress tracking, and handoff.
- Identify duplicate, conflicting, or missing rules without rewriting unrelated material.
- Record the baseline: current branch, working-tree state, active ticket, existing milestones, and any in-progress work.
- Create a gap matrix mapping each proposed capability to existing documentation and the smallest required change.

**Exit criteria:** An evidence-backed gap matrix exists; the active work and all protected decisions are identified; no implementation changes have been made merely on assumptions.

**Checkpoint:** Record the audit outcome in the appropriate Context Kit location. Commit only if a useful, reviewable artifact has been created and verified.

### Phase 1 — Define the operating contract

**Goal:** Specify how autonomous rollout is allowed to operate.

Define:
- Task states and valid transitions, including blocked, needs-human-input, failed, verified, and complete states.
- Required task fields: objective, scope, dependencies, source artifacts, acceptance criteria, allowed actions, verification commands, retry policy, and evidence location.
- Approval boundaries: what the agent may do independently, what requires confirmation, and what is prohibited.
- Stop conditions: unclear requirements, conflicting sources of truth, repeated failure, unexpected file scope, failed verification, and unavailable dependencies.
- Resource bounds: maximum attempts, time/budget limits where applicable, and limits on concurrent work.
- Completion semantics: the evidence required before a task, section, phase, or milestone can be marked complete.

**Exit criteria:** The operating contract is explicit, testable, and consistent with existing rules. Ambiguous or conflicting policy is escalated for a human decision.

**Checkpoint:** Update the relevant Context Kit state and record the decision. Make a focused commit after validation.

### Phase 2 — Formalize the human-led upstream stages

**Goal:** Make the outputs from Planning, Flows, Contracts, and DDA sufficiently clear for reliable downstream execution.

Tasks:
- Define required inputs, outputs, ownership, and approval gates for each stage.
- Establish traceability between requirements, flows, contracts, DDA artifacts, rollout tasks, and acceptance evidence.
- Define change-impact rules so a change propagates only to dependent artifacts.
- Keep Planning and Flows explicitly human-led; use AI for organization, analysis, drafting, and consistency checks without silently deciding unresolved product intent.
- Use AI more heavily in Contracts and DDA only within approved decisions and established templates.

**Exit criteria:** A sample change can be traced from intent through its dependent artifacts and into a verifiable rollout task. Unaffected decisions remain unchanged.

**Checkpoint:** Update the relevant Context Kit files and commit the verified stage definitions and templates.

### Phase 3 — Implement the bounded single-task rollout loop

**Goal:** Prove that one task can be executed, checked, and closed reliably before automating a queue of tasks.

Proposed loop:

1. Select an eligible task and confirm its dependencies are satisfied.
2. Load only the relevant rules, source artifacts, current state, and task context.
3. Confirm scope, acceptance criteria, allowed actions, and verification commands.
4. Make the smallest necessary change.
5. Run the specified checks and inspect the resulting diff.
6. If checks pass, collect evidence and update task/progress state.
7. If checks fail, classify the failure and follow the targeted recovery process in Phase 4.
8. Mark the task complete only after its acceptance criteria are met and evidence is recorded.

**Exit criteria:** A representative task completes end-to-end with reproducible verification, accurate state updates, and no unapproved scope expansion.

**Checkpoint:** Update the Context Kit at task completion and commit the verified change plus the necessary state record. Do not create empty or misleading commits.

### Phase 4 — Add targeted issue escalation and recovery

**Goal:** Fix the actual problem without restarting the whole pipeline.

Failure-handling procedure:

1. Capture the observed failure, relevant logs, failed check, and affected artifact.
2. Classify the cause: implementation defect, missing contract, ambiguous flow, unresolved planning decision, environment/tooling failure, or external dependency.
3. Identify the smallest owning stage and the downstream artifacts that depend on it.
4. Present the user with the concrete gap, evidence, options if a decision is needed, and the exact approval required.
5. Once resolved, resume the Planning → Flows → Contracts → DDA → Rollout sequence **only for the affected dependency path**. Skip stages that do not need to change, while still validating their outputs remain compatible.
6. Preserve unaffected artifacts, completed tasks, and approved decisions.
7. Re-run the relevant checks and any necessary regression checks before resuming the queue.

Retry policy:
- Automatically retry only bounded, safe, plausibly transient failures.
- Do not repeat the same failing action indefinitely.
- Stop and escalate when the retry limit is reached, evidence is contradictory, or a human decision is required.
- Never use a retry to bypass a failed acceptance criterion or approval gate.

**Exit criteria:** Injected failures are diagnosed and routed to the right stage; recovery preserves unrelated work and does not silently broaden scope.

**Checkpoint:** Record the issue, root cause when established, resolution, affected dependencies, and verification evidence in the appropriate Context Kit records. Commit the fix and relevant records together when practical.

### Phase 5 — Standardize Context Kit synchronization

**Goal:** Keep the repository's documented state aligned with actual work.

Define explicit update points:
- After each meaningful task or section is verified.
- At each milestone and phase boundary.
- When a blocker, decision, dependency, or risk changes.
- Before handing work to another agent or the user.
- Before and after a recovery cycle when the task state materially changes.
- Before a commit/push checkpoint and after its result is known.

For each update:
- Change only the relevant files and sections.
- Follow the existing templates and frontmatter conventions.
- Preserve append-only history and closed decisions where the current rules require it.
- Keep the current state concise and authoritative; do not copy large amounts of irrelevant history into every task.
- Record what changed, why, verification performed, remaining blockers, and the next eligible action.
- Do not mark work complete based on an unverified claim.

**Exit criteria:** A fresh session can determine the current state, completed work, outstanding decisions, evidence, and next action from the Context Kit without reconstructing the whole conversation.

**Checkpoint:** Validate the Context Kit diff for consistency and commit the state update with the corresponding verified work when appropriate.

### Phase 6 — Establish commit and push checkpoints

**Goal:** Make progress durable and reviewable without producing noisy or unsafe Git history.

Recommended policy:
- Commit after a verified task/section when it forms a coherent, reviewable unit; always checkpoint at verified phase and milestone boundaries.
- Include relevant Context Kit updates in the same commit when they describe that work.
- Use descriptive messages that identify the scope and outcome.
- Before committing, inspect branch, working-tree status, staged changes, and the full diff. Stage only intended files; never blindly stage unrelated user changes.
- Never commit secrets, credentials, generated noise, or unrelated work.
- Push after the agreed milestone/phase checkpoints, and after smaller checkpoints when durability is important and the repository workflow permits it.
- Check the push result. If rejected, inspect and reconcile the remote changes; do not force-push by default.
- If tests fail, do not label the milestone verified. Commit diagnostic or recovery work only when it is useful and clearly described.
- Do not create empty commits just to represent a checkpoint. Record checkpoints in the Context Kit if there is no meaningful change to commit.

**Exit criteria:** Each checkpoint has a traceable commit or an explicit reason no commit was needed; push failures are visible and handled safely.

**Checkpoint:** Record commit IDs, push status, verification results, and unresolved issues in the appropriate progress record.

### Phase 7 — Add queue orchestration and multi-task autonomy

**Goal:** Extend the proven single-task loop to a controlled queue.

Tasks:
- Select only tasks whose prerequisites are met and whose approval gates are satisfied.
- Build a dependency graph and choose the next eligible task deterministically where possible.
- Persist task state so an interrupted run can resume without repeating completed work blindly.
- After each task, update Context Kit state, verify, and checkpoint before selecting the next task.
- Detect blocked queues and report the exact missing prerequisite or decision.
- Set limits on total tasks per run, retries, elapsed time, and concurrent agents.
- Require explicit policy for cancellation, pause/resume, and human takeover.

**Exit criteria:** A multi-task run can pause and resume, avoid duplicate execution, respect dependencies, and report its state accurately.

**Checkpoint:** Record the run summary, completed task references, commits, evidence, and next eligible task. Commit/push according to the established checkpoint policy.

### Phase 8 — Introduce parallel work cautiously

**Goal:** Increase throughput only where concurrency is safe.

Tasks:
- Start with sequential execution as the reliable baseline.
- Identify tasks that are independent by files, contracts, and dependency graph.
- Use isolated branches or worktrees for parallel changes when the repository workflow supports them.
- Define integration ownership, conflict detection, test requirements, and merge approval rules.
- Prevent multiple agents from editing the same shared state or Context Kit section concurrently without coordination.
- Measure conflict rate and rework before increasing concurrency.

**Exit criteria:** Parallel work shows a measurable benefit without reducing correctness, traceability, or control.

### Phase 9 — Measure, tune, and expand autonomy

**Goal:** Increase autonomy based on evidence rather than enthusiasm.

Track:
- First-pass acceptance rate.
- Verification failures and recurring failure categories.
- Retry count and recovery success rate.
- Human escalations and time to resolve them.
- Scope deviations and unintended file changes.
- Rework caused by upstream ambiguity or missing contracts.
- Time from task selection to verified completion.
- Context Kit accuracy and successful session resumption.
- Commit/push checkpoint success and recovery from rejected pushes.
- Parallel integration conflicts, if applicable.

Use these measurements to decide which task classes can receive more autonomy, which need better contracts or tests, and which should remain human-led. Do not optimize solely for speed or number of completed tasks.

**Exit criteria:** Autonomy increases are tied to demonstrated reliability and include a rollback path.

## 4. Cross-phase acceptance gates

Before advancing a phase, confirm:

- [ ] Required artifacts and decisions exist in the established format.
- [ ] Requirements and dependencies are traceable.
- [ ] Scope and human approval boundaries are explicit.
- [ ] Verification criteria are objective and executable where possible.
- [ ] Failure and recovery behavior is defined for the phase.
- [ ] Relevant Context Kit records reflect the verified state.
- [ ] The diff contains only intended changes.
- [ ] Commit and push outcomes are recorded where applicable.
- [ ] Remaining risks and unresolved decisions are visible.

## 5. Rollout strategy

Implement in small increments rather than attempting a fully autonomous system at once:

1. Audit current documentation and identify gaps.
2. Define the operating contract and approval boundaries.
3. Pilot one bounded task end-to-end.
4. Add targeted failure escalation and recovery.
5. Standardize Context Kit and Git checkpoints.
6. Run a small sequential task queue with pause/resume.
7. Test recovery and interruption scenarios deliberately.
8. Introduce parallel execution only after the sequential system is reliable.
9. Expand autonomy by task category using measured results.

Each phase should have its own acceptance criteria, Context Kit update, and meaningful Git checkpoint. Do not bundle unrelated changes merely to reach a milestone faster.

## 6. Non-goals and safeguards

This roadmap does not authorize the agent to:
- Rewrite the entire Playbook or reopen unrelated closed decisions.
- Guess missing product intent or resolve material policy conflicts silently.
- Modify unrelated projects or mix their documentation into the wrong architecture boundary.
- Bypass tests, contracts, approval gates, or repository rules to make a task appear complete.
- Overwrite existing templates or Context Kit records before checking their current structure.
- Force-push, discard user changes, or perform destructive operations without explicit authorization.
- Claim that a file, commit, push, test, or milestone succeeded without evidence.

## 7. First implementation deliverable

The first implementation milestone should be an **audited Playbook gap report and change plan**, not immediate edits to every kit file. It should identify the exact existing files and sections to update, explain why each change is needed, preserve established templates, and list acceptance checks. Once reviewed, apply the smallest coherent set of changes and verify it before proceeding.

---

**Confidence:** High that this sequence is a sound implementation strategy for the operating model described; medium on exact file placement and template edits until the current repository and Context Kit have been inspected.
