---
file: '.playbook/kit/_tests/test-case.md'
responsibility: 'Template for a single QA test case. One file per check — copy this template and rename per test, per the _tests/ folder convention in 06-qa.md.'
ai_instructions: 'Copy this file for each new test case; rename to match its QA-ID (e.g. qa-01-invoice-validation.md). Do not edit this template in place — edit the copy.'
archive_rule: 'This template itself is never archived. Individual test case files move to _archives/ once their milestone closes and 06-qa.md no longer references them as active.'
---

# [QA-ID] [Test Case Title]

**Maps to:** [K-ID, or the Acceptance Criterion text if kanban is not active]
**DDA Doc:** `.playbook/[path/to/planning-doc].md`

## Description

What is being verified — plain language, one or two sentences.

## Steps

1. [Step]
2. [Step]
3. [Step]

## Expected Result

What success looks like — specific enough that Pass/Fail isn't a judgment call.

## Execution

**Executor:** Agent | Human | Both
**Status:** Pending | Pass | Fail

## Notes

_(Optional — anything discovered while running this test that doesn't belong
in the steps or expected result. Omit if nothing fits.)_

---

If this test fails, log it in `06-qa.md`'s Failures Log with a reference to
this file and either a new or existing kanban ticket. Do not mark this test
`Pass` until the corresponding planning document's DDA sync is verified —
per `06-qa.md`'s DDA Checks.
