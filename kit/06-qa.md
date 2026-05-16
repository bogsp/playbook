# QA PLAN

## Rules

- Test cases are seeded from Acceptance Criteria in `03-execution.md`
- Each test case maps to one criterion (reference by K-ID if kanban is active)
- Agent runs what it can; human signs off on what requires judgment
- A criterion is not "done" until its test case is marked Pass
- Failures are logged and linked back to a new or existing kanban ticket
- DDA sync is verified before any test case is marked Pass

## DDA Checks (run before sign-off)

- [ ] All coded components have an active DDA doc
- [ ] No code dependencies exist outside declared `connects` or `integrations`
- [ ] All DDA docs reflect current implementation (sync mode verified)
- [ ] No components marked `status: draft` are in production code paths

---

## Test Cases

### [QA-01] Test Case Title

**Maps to:** K-01 _(or Acceptance Criterion if kanban not active)_
**DDA Doc:** `.context/[path/to/doc].md`
**Description:** What is being verified.
**Steps:**

1. [Step]
2. [Step]
   **Expected Result:** What success looks like.
   **Executor:** Agent / Human / Both
   **Status:** Pass | Fail | Pending

---

## Failures Log

Failures captured here; each should produce or reference a kanban ticket.

- **[QA-01]** YYYY-MM-DD — [What failed] → [K-ID or new ticket]

---

## Sign-off

**QA Complete:** YYYY-MM-DD
**Signed off by:** [Human name or "Agent"]
**DDA Sync Verified:** Yes / No
**Notes:** [Any exceptions, known issues, or deferred items]
