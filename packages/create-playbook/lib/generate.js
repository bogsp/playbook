// lib/generate.js
// File: packages/create-playbook/lib/generate.js
//
// Handles 'generate' subcommands for flows, contracts, and planning docs.

import { readFile, writeFile, mkdir } from "fs/promises";
import { readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { ask, choose } from "./prompt.js";

// ---------------------------------------------------------------------------
// Flow
// ---------------------------------------------------------------------------

export async function generateFlow(projectRoot) {
  console.log("\n  Generate a flow document\n");

  const name = await ask("  Flow name (e.g. create-invoice)");
  if (!name) return abort("Flow name is required.");

  const scope = await choose("  What is the scope of this flow?", [
    { value: "operation", label: "Operation", description: "a single request or action" },
    { value: "sequence", label: "Sequence", description: "a multi-step process with compensation" },
    { value: "journey", label: "Journey", description: "end-to-end user journey spanning multiple flows" },
    { value: "composite", label: "Composite", description: "coordinates multiple child flows" },
    { value: "compensation", label: "Compensation", description: "undoes a previous flow on failure" },
  ]);

  const trigger = await choose("  How is this flow triggered?", [
    { value: "request-response", label: "Request / Response", description: "triggered by a direct call" },
    { value: "event-driven", label: "Event", description: "triggered by a domain or system event" },
    { value: "background", label: "Background / Scheduled", description: "runs on a schedule or timer" },
    { value: "reactive", label: "Reactive", description: "responds to a subscription or state change" },
    { value: "webhook", label: "Webhook", description: "triggered by an incoming webhook payload" },
    { value: "stream", label: "Stream", description: "processes a continuous data stream" },
  ]);

  const id = `flow-${nextFlowId(projectRoot)}-${name}`;
  const filePath = join(projectRoot, "docs", "flows", `${id}.md`);

  if (existsSync(filePath)) {
    return abort(`File already exists: docs/flows/${id}.md`);
  }

  const content = buildFlowDoc({ id, name, scope, trigger });
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
  console.log(`\n  ✓ Created docs/flows/${id}.md`);

  await updateFlowsIndex(projectRoot, { id, name, scope, trigger });
  console.log(`  ✓ Updated docs/flows/_index.md\n`);
}

// ---------------------------------------------------------------------------
// Contract
// ---------------------------------------------------------------------------

export async function generateContract(projectRoot) {
  console.log("\n  Generate a contract document\n");

  const flows = listFlows(projectRoot);

  if (flows.length === 0) {
    return abort("No flow documents found. Create a flow first with: create-playbook generate flow");
  }

  const flowId = await choose(
    "  Which flow does this contract companion?",
    flows.map((f) => ({ value: f, label: f }))
  );

  const filePath = join(projectRoot, "docs", "contracts", `${flowId}.md`);

  if (existsSync(filePath)) {
    return abort(`Contract already exists: docs/contracts/${flowId}.md`);
  }

  const content = buildContractDoc(flowId);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
  console.log(`\n  ✓ Created docs/contracts/${flowId}.md`);

  await updateContractsIndex(projectRoot, flowId);
  console.log(`  ✓ Updated docs/contracts/_index.md\n`);
}

// ---------------------------------------------------------------------------
// Planning doc
// ---------------------------------------------------------------------------

export async function generatePlanningDoc(projectRoot, docType) {
  const labels = {
    component: "component",
    concern: "concern",
    integration: "integration",
  };

  const label = labels[docType] || docType;
  console.log(`\n  Generate a ${label} planning document\n`);

  const name = await ask(`  ${capitalize(label)} name (e.g. invoice-validator)`);
  if (!name) return abort("Name is required.");

  const parent = await ask("  Parent module or sequencer (leave blank if none)");

  let extraFields = {};

  if (docType === "component") {
    const emits = await ask("  Events emitted (comma-separated, leave blank if none)");
    const connects = await ask("  Connects to (comma-separated, leave blank if none)");
    extraFields = { emits, connects };
  }

  if (docType === "integration") {
    const configKeys = await ask("  Config keys required (comma-separated, e.g. API_KEY,BASE_URL)");
    const docsUrl = await ask("  Documentation URL");
    extraFields = { configKeys, docsUrl };
  }

  const filePath = resolvePlanningDocPath(projectRoot, docType, name);

  if (existsSync(filePath)) {
    return abort(`File already exists: ${filePath.replace(projectRoot, "")}`);
  }

  const content = buildPlanningDoc({ docType, name, parent, ...extraFields });
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");

  const relPath = filePath.replace(projectRoot + "/", "");
  console.log(`\n  ✓ Created ${relPath}`);
  console.log(`  Add it to the relevant _index.md Structure section before marking active.\n`);
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

function buildFlowDoc({ id, name, scope, trigger }) {
  const optionalSections = [];

  if (scope === "journey" || scope === "sequence") {
    optionalSections.push(`## Undoing Steps\n_(Required — what happens if this flow fails halfway through)_\n\nTODO`);
  }
  if (scope === "journey" || scope === "composite") {
    optionalSections.push(`## Child Flows\n_(Required — what sub-flows this one coordinates)_\n\nTODO`);
  }
  if (trigger === "event-driven") {
    optionalSections.push(`## Event Shape\n_(Required — what the event contains and how it is delivered)_\n\nTODO`);
  }
  if (trigger === "background") {
    optionalSections.push(`## Schedule\n_(Required — when and how often this runs)_\n\nTODO`);
    optionalSections.push(`## Timeout Behaviour\n_(Required — what happens when this exceeds its time budget)_\n\nTODO`);
  }
  if (trigger === "reactive" || trigger === "stream") {
    optionalSections.push(`## Subscription\n_(Required — what is being watched and what counts as a change)_\n\nTODO`);
    optionalSections.push(`## Disconnection\n_(Required — what happens when the connection drops)_\n\nTODO`);
  }
  if (trigger === "stream") {
    optionalSections.push(`## Reconnection\n_(Required — how and when reconnection is attempted)_\n\nTODO`);
  }
  if (trigger === "webhook") {
    optionalSections.push(`## Incoming Payload\n_(Required — what the payload must contain and how it is validated)_\n\nTODO`);
    optionalSections.push(`## Retry Behaviour\n_(Required — retry strategy and failure handling)_\n\nTODO`);
  }

  return `# ${titleCase(name)}
# File: docs/flows/${id}.md

---
id: ${id}
type: flow
scope: ${scope}
trigger: ${trigger}
status: draft
triggers: []
calls: []
emits: []
called-by: []
---

## What It Does
TODO — plain language, any reader understands this without prior knowledge.

## Before It Starts
TODO — what must be true before this flow can begin.

## When It Finishes
TODO — what is guaranteed to be true when this flow completes successfully.

## Walkthrough

TODO — narrative description of what happens at each step.

---

1. On [Trigger](input):
   a. [piece].[action](input)
      → ok: [Result]   → continue to b
      → err: [Error]   → emit [FailureEvent], halt
   b. [piece].[action](result)
      → ok: [Result]   → emit [SuccessEvent]
      → err: [Error]   → undo previous steps, emit [FailureEvent]

---

${optionalSections.join("\n\n")}

## Detail
_(Optional — omit if nothing fits)_

---
N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
`;
}

function buildContractDoc(flowId) {
  return `# ${titleCase(flowId.replace(/^flow-\d+-/, ""))} Contract
# File: docs/contracts/${flowId}.md
# Companion to: docs/flows/${flowId}.md
# Read docs/contracts/global.md before this file.

---

## The Good Path
TODO — what a successful run looks like.

## Ways It Can Fail
TODO — every way this flow can go wrong and what happens in each case.

## Edge Cases
TODO — unusual situations that still have to work correctly.

## Ordering Rules
TODO — what must happen before what; anything that cannot happen at the same time.

## Hard Constraints
TODO — rules every implementation must follow without exception.

---
N/A — this section was considered and does not apply
TODO — not yet written; blocks status: active
`;
}

function buildPlanningDoc({ docType, name, parent, emits, connects, configKeys, docsUrl }) {
  if (docType === "component") {
    return `---
id: ${name}
type: component
status: draft
parent: ${parent || "[module]"}
children: []
connects: [${connects || ""}]
emits: [${emits || ""}]
concerns: []
---

## What It Does
TODO — plain language description of this component's single responsibility.

## Interface
Contract: \`docs/contracts/[flow]/[file].md#[section]\`

TODO — what goes in, what comes out, what rules apply.

## Detail
_(Edge cases and constraints only. Omit if nothing fits.)_
`;
  }

  if (docType === "concern") {
    return `---
id: ${name}
type: concern
status: draft
affects: all
provided-by: internal
---

## What It Does
TODO — what this capability provides, how pieces use it, and what depends on it.

## Behaviour
**Rules:**
- TODO

**What must always be true:**
- TODO

**What must never happen:**
- TODO

## Detail
_(Injection pattern, configuration, known constraints. Omit if nothing fits.)_
`;
  }

  if (docType === "integration") {
    return `---
id: ${name}
type: integration
kind: external-service | external-library | internal-service
status: draft
used-by: []
config: [${configKeys || ""}]
docs: ${docsUrl || "[url]"}
---

## What It Does
TODO — what this service or library provides and how it is used in this project.

## Interface
Contract: \`docs/contracts/[flow]/[file].md#[section]\` _(if applicable)_

TODO — what this integration exposes.

## Behaviour
**Rules:**
- TODO

**Failure modes:**
- TODO

## Detail
_(Auth method, rate limits, versioning constraints. Omit if nothing fits.)_
`;
  }

  return "";
}

// ---------------------------------------------------------------------------
// Index updaters
// ---------------------------------------------------------------------------

async function updateFlowsIndex(projectRoot, { id, name, scope, trigger }) {
  const indexPath = join(projectRoot, "docs", "flows", "_index.md");
  if (!existsSync(indexPath)) return;

  const content = await readFile(indexPath, "utf8");
  const newRow = `| ${id} | ${titleCase(name)} | ${scope} | ${trigger} | draft |`;
  const updated = content.replace(
    "| ID | Title | Scope | Trigger | Status |\n|---|---|---|---|---|",
    `| ID | Title | Scope | Trigger | Status |\n|---|---|---|---|---|\n${newRow}`
  );
  await writeFile(indexPath, updated, "utf8");
}

async function updateContractsIndex(projectRoot, flowId) {
  const indexPath = join(projectRoot, "docs", "contracts", "_index.md");
  if (!existsSync(indexPath)) return;

  const content = await readFile(indexPath, "utf8");
  const newRow = `| ${flowId}.md | ${flowId} | draft |`;
  const updated = content.replace(
    "| global.md | all flows | draft |",
    `| global.md | all flows | draft |\n${newRow}`
  );
  await writeFile(indexPath, updated, "utf8");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function listFlows(projectRoot) {
  const flowsDir = join(projectRoot, "docs", "flows");
  if (!existsSync(flowsDir)) return [];
  try {
    return readdirSync(flowsDir)
      .filter((f) => f.startsWith("flow-") && f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    return [];
  }
}

function nextFlowId(projectRoot) {
  const flows = listFlows(projectRoot);
  if (flows.length === 0) return "1";
  const ids = flows
    .map((f) => parseInt(f.split("-")[1], 10))
    .filter((n) => !isNaN(n));
  return String(Math.max(...ids) + 1);
}

function resolvePlanningDocPath(projectRoot, docType, name) {
  if (docType === "concern") {
    return join(projectRoot, ".playbook", "_concerns", `${name}.md`);
  }
  if (docType === "integration") {
    return join(projectRoot, ".playbook", "_integrations", `${name}.md`);
  }
  return join(projectRoot, ".playbook", `${name}.md`);
}

function titleCase(str) {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function abort(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}
