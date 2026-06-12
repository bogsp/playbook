#!/usr/bin/env node
// create-playbook v3.0.0
// File: packages/create-playbook/index.js
//
// Usage:
//   pnpm dlx create-playbook [project-name]   — initialize a new project
//   pnpm dlx create-playbook sync             — update library docs
//   pnpm dlx create-playbook generate <type>  — generate a document
//   pnpm dlx create-playbook g <type>         — shorthand for generate

import { mkdir } from "fs/promises";
import { join, resolve } from "path";
import { ask, choose, confirm, close } from "./lib/prompt.js";
import { scaffold, isPlaybookProject } from "./lib/scaffold.js";
import { installLibrary, syncLibrary } from "./lib/install.js";
import { generateFlow, generateContract, generatePlanningDoc } from "./lib/generate.js";

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const command = args[0];

if (command === "sync") {
  await runSync();
} else if (command === "generate" || command === "g") {
  await runGenerate(args[1]);
} else {
  await runInit(command);
}

close();

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

async function runInit(nameArg) {
  console.log("\n  create-playbook\n");

  // Project name
  const projectName = nameArg && nameArg !== "."
    ? nameArg
    : await ask("  Project name", nameArg === "." ? "my-project" : "my-project");

  const root = nameArg === "."
    ? process.cwd()
    : resolve(process.cwd(), projectName);

  // Domain
  const domain = await choose("  What kind of project is this?", [
    { value: "software", label: "Software", description: "apps, services, APIs, tools" },
    { value: "writing", label: "Writing", description: "articles, books, scripts, content series" },
    { value: "production", label: "Production", description: "media, events, operational workflows" },
    { value: "manufacturing", label: "Manufacturing", description: "physical products, fabrication, supply chain" },
    { value: "none", label: "None / Not sure", description: "general purpose or undecided" },
  ]);

  // Project type
  const hasExisting = await confirm("\n  Do you have existing work for this project?", false);

  let projectType = "new";

  if (hasExisting) {
    const understood = await confirm(
      "  Is the existing work well understood or does it need investigating first?\n  (Y = well understood, N = needs investigating)",
      true
    );
    projectType = understood ? "adopt" : "audit";
  }

  // Library install (software only)
  let installLib = false;
  if (domain === "software") {
    installLib = await confirm(
      "\n  Install @bogsp/playbook-software-library? (recommended for software projects)",
      true
    );
  }

  // Summary
  console.log("\n  ─────────────────────────────────────");
  console.log(`  Project:  ${projectName}`);
  console.log(`  Domain:   ${domain}`);
  console.log(`  Type:     ${projectTypeLabel(projectType)}`);
  if (domain === "software") {
    console.log(`  Library:  ${installLib ? "yes" : "no"}`);
  }
  console.log("  ─────────────────────────────────────\n");

  const confirmed = await confirm("  Scaffold this project?", true);
  if (!confirmed) {
    console.log("\n  Cancelled.\n");
    return;
  }

  // Create root directory if needed
  if (nameArg !== ".") {
    await mkdir(root, { recursive: true });
  }

  console.log("\n  Scaffolding...\n");

  let libraryVersion = "";

  if (installLib) {
    libraryVersion = await installLibrary(root);
  }

  await scaffold({ projectName, domain, projectType, root, libraryVersion });

  console.log(`  ✓ ${countMessage(projectType, domain, installLib)}\n`);
  console.log("  ─────────────────────────────────────");
  console.log("  Done. Your Playbook project is ready.\n");
  console.log("  Next steps:");
  console.log("    1. Read .playbook/README.md — find your starting point");

  if (projectType === "new") {
    console.log("    2. Read .playbook/guides/new-project.md — follow the stages");
  } else if (projectType === "adopt") {
    console.log("    2. Read .playbook/guides/adopt.md — bring your existing work in");
  } else {
    console.log("    2. Read .playbook/guides/audit.md — map your project before changing it");
  }

  console.log("    3. Open .kit/00-prompts.md — copy your first session prompt");
  console.log("  ─────────────────────────────────────\n");
}

// ---------------------------------------------------------------------------
// Sync
// ---------------------------------------------------------------------------

async function runSync() {
  const cwd = process.cwd();

  if (!isPlaybookProject(cwd)) {
    console.error("\n  This command must be run inside a Playbook project.");
    console.error("  Run 'pnpm dlx create-playbook init' to initialize one.\n");
    process.exit(1);
  }

  await syncLibrary(cwd);
}

// ---------------------------------------------------------------------------
// Generate
// ---------------------------------------------------------------------------

async function runGenerate(type) {
  const cwd = process.cwd();

  if (!isPlaybookProject(cwd)) {
    console.error("\n  This command must be run inside a Playbook project.");
    console.error("  Run 'pnpm dlx create-playbook init' to initialize one.\n");
    process.exit(1);
  }

  const validTypes = ["flow", "contract", "component", "concern", "integration"];

  if (!type || !validTypes.includes(type)) {
    console.log("\n  Usage: create-playbook generate <type>\n");
    console.log("  Types:");
    console.log("    flow          — a runtime flow document");
    console.log("    contract      — a contract companion to a flow");
    console.log("    component     — a planning doc for a single piece of work");
    console.log("    concern       — a cross-cutting capability doc");
    console.log("    integration   — an external service or library doc");
    console.log();
    process.exit(1);
  }

  if (type === "flow") {
    await generateFlow(cwd);
  } else if (type === "contract") {
    await generateContract(cwd);
  } else {
    await generatePlanningDoc(cwd, type);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function projectTypeLabel(type) {
  return {
    new: "Starting from scratch",
    adopt: "Adopting existing project",
    audit: "Auditing existing project before adopting",
  }[type];
}

function countMessage(projectType, domain, installLib) {
  const parts = ["Scaffold created"];
  if (domain !== "none") parts.push(`${domain} vocabulary included`);
  if (installLib) parts.push("library docs installed");
  return parts.join(" · ");
}
