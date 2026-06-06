# [Flow Name]
# File: docs/flows/flow-N-[kebab-name].md

---
id: flow-N-[kebab-name]
type: flow
scope: journey | sequence | operation | composite | compensation
trigger: request-response | event-driven | background | reactive | webhook | stream
status: draft
triggers: []
calls: []
emits: []
called-by: []
---

## What It Does
Plain language — any reader understands this without prior knowledge.

## Before It Starts
What must be true before this path can begin.

## When It Finishes
What is guaranteed to be true when this path completes successfully.

## Walkthrough

Narrative — what happens at each step, what decisions are made, what can go wrong.

---

1. On [Trigger](input):
   a. [piece].[action](input)
      → ok: [Result]   → continue to b
      → err: [Error]   → emit [FailureEvent], halt
   b. [piece].[action](result)
      → ok: [Result]   → continue to c
      → err: [Error]   → undo previous steps, emit [FailureEvent]
   c. [piece].[action](result)
      → ok: [Result]   → emit [SuccessEvent]
      → err: [Error]   → undo previous steps, emit [FailureEvent]

---

## Undoing Steps
_(Required when scope is journey or sequence — what happens if this path fails halfway through)_

## Child Paths
_(Required when scope is journey or composite — what sub-paths this one coordinates)_

## Event Shape
_(Required when trigger is event-driven — what the event contains and how it is delivered)_

## Schedule
_(Required when trigger is background — when and how often this runs)_

## Timeout Behaviour
_(Required when trigger is background — what happens when this exceeds its time budget)_

## Subscription
_(Required when trigger is reactive or stream — what is being watched and what counts as a change)_

## Disconnection
_(Required when trigger is reactive or stream — what happens when the connection drops)_

## Reconnection
_(Required when trigger is stream — how and when reconnection is attempted)_

## Incoming Payload
_(Required when trigger is webhook — what the payload must contain and how it is validated)_

## Retry Behaviour
_(Required when trigger is webhook — retry strategy and failure handling)_

## Detail
_(Optional — concurrency rules, known constraints, edge cases that cannot be inferred from the walkthrough)_

---
N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
