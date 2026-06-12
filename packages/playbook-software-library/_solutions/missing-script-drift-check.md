# Missing Script Drift Check

# File: packages/playbook-software-library/\_solutions/missing-script-drift-check.md

# Version: 1.0.0

---

id: missing-script-drift-check
type: solution
status: active
applies-to: [repo-tooling, package-scripts, operational-scripts]
integrations: []

---

## What It Solves

Package scripts often outlive the script files they call. This solution treats
script references as contracts and catches missing operational files before
developers or CI hit them.

## Behavior

**Check rules:**

- Every package script that invokes a local file must point to an existing file
- Every referenced local script must have a platform or module DDA entry
- If a referenced script is intentionally absent, the owning DDA doc is draft
- Script removal and package script removal happen in the same change

**Common references to check:**

- `node scripts/...`
- `tsx scripts/...`
- `powershell -File scripts/...`
- `bash scripts/...`
- `sh scripts/...`

## Failure Modes

- Install hook points at a deleted pre-install script
- Launch command points at an old bootstrap file
- CI references a renamed local script
- Documentation says Docker owns boot but package scripts still call legacy scripts

## Constraints

- Do not silently remove install or launch hooks without replacing the behavior
- Missing script drift blocks active status for the owning platform DDA
- Script checks must run before declaring platform DDA complete
