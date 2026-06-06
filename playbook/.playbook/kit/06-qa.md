# CHECKS & SIGN-OFF
# File: .kit/06-qa.md

## Rules
- One check file per test, saved in `.kit/_tests/`
- Each check maps to one Acceptance Criterion in 03-execution.md
- Check tier declared in 03-execution.md: core | standard | full
- A criterion is not done until its check file passes
- Failures must reference the rule that was broken and define what prevents it recurring
- All checks must pass before sign-off
- Sign-off requires every Acceptance Criterion verified

---

## Checks

| ID | Title | Maps To | Who Runs It | Status |
|---|---|---|---|---|
| QA-01 | [Check title] | K-01 | AI \| Human \| Both \| Automated | Pending |

---

## Failures

| ID | Date | What Failed | Rule Ref | Ticket | Prevention | Status |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

_Rule Ref: the path or contract that defines correct behaviour — required_
_Prevention: what stops this class of failure from happening again — required_

---

## Sign-off

**Checks Complete:** YYYY-MM-DD
**Signed off by:** [Name | AI]

**Acceptance Criteria Verified:**
- [ ] [Criterion from 03-execution.md] — QA-01 ✓

**Known Exceptions:**
[Any unmet criteria must be explained here — never silently skipped]

**What This Sign-off Unlocks:**
[Next phase, delivery, release, or handoff that this approval gates]

**Notes:**
[Anything the next phase needs to know]
