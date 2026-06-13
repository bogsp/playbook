#!/usr/bin/env node
// build.js
// File: packages/create-playbook/build.js
//
// Copies source files from playbook/.playbook/ and playbook/docs/
// into packages/create-playbook/templates/ before publish.
//
// Run: node build.js
// Or via package.json script: pnpm build

import { cp, rm, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const templatesDir = join(__dirname, "templates");

const sources = [
  // Universal — from playbook/.playbook/
  {
    from: join(repoRoot, "playbook", ".playbook", "README.md"),
    to: join(templatesDir, "universal", "playbook", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "AI-INSTRUCTIONS.md"),
    to: join(templatesDir, "universal", "playbook", "AI-INSTRUCTIONS.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "pipeline.md"),
    to: join(templatesDir, "universal", "playbook", "pipeline.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "maintenance.md"),
    to: join(templatesDir, "universal", "playbook", "maintenance.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "templates.md"),
    to: join(templatesDir, "universal", "playbook", "templates.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "_index.md"),
    to: join(templatesDir, "universal", "playbook", "_index.md"),
  },
  // Guides — universal
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "_index.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "_index.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "new-project.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "new-project.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "adopt.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "adopt.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "audit.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "audit.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "context-kit.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "context-kit.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "video-insights.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "video-insights.md"),
  },
  // Kit templates
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "00-prompts.md"),
    to: join(templatesDir, "universal", "kit", "00-prompts.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "01-process.md"),
    to: join(templatesDir, "universal", "kit", "01-process.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "02-exploration.md"),
    to: join(templatesDir, "universal", "kit", "02-exploration.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "03-execution.md"),
    to: join(templatesDir, "universal", "kit", "03-execution.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "04-progress.md"),
    to: join(templatesDir, "universal", "kit", "04-progress.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "05-kanban.md"),
    to: join(templatesDir, "universal", "kit", "05-kanban.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "06-qa.md"),
    to: join(templatesDir, "universal", "kit", "06-qa.md"),
  },
  // Docs templates
  {
    from: join(repoRoot, "playbook", "docs", "flows", "flow.md"),
    to: join(templatesDir, "universal", "docs", "flows", "flow-template.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "contracts", "contract.md"),
    to: join(templatesDir, "universal", "docs", "contracts", "contract-template.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "contracts", "global.md"),
    to: join(templatesDir, "universal", "docs", "contracts", "global.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "system-map.md"),
    to: join(templatesDir, "universal", "docs", "rewrite", "system-map.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "decision-record.md"),
    to: join(templatesDir, "universal", "docs", "rewrite", "decision-record.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "risk-register.md"),
    to: join(templatesDir, "universal", "docs", "rewrite", "risk-register.md"),
  },
  // Software vocabulary
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-software", "README.md"),
    to: join(templatesDir, "software", "vocabulary", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-software", "AI-INSTRUCTIONS.md"),
    to: join(templatesDir, "software", "vocabulary", "AI-INSTRUCTIONS.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-software", "templates.md"),
    to: join(templatesDir, "software", "vocabulary", "templates.md"),
  },
  // Writing vocabulary
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-writing", "README.md"),
    to: join(templatesDir, "writing", "vocabulary", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-writing", "AI-INSTRUCTIONS.md"),
    to: join(templatesDir, "writing", "vocabulary", "AI-INSTRUCTIONS.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-writing", "templates.md"),
    to: join(templatesDir, "writing", "vocabulary", "templates.md"),
  },
  // Production vocabulary
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-production", "README.md"),
    to: join(templatesDir, "production", "vocabulary", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-production", "AI-INSTRUCTIONS.md"),
    to: join(templatesDir, "production", "vocabulary", "AI-INSTRUCTIONS.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-production", "templates.md"),
    to: join(templatesDir, "production", "vocabulary", "templates.md"),
  },
  // Manufacturing vocabulary
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-manufacturing", "README.md"),
    to: join(templatesDir, "manufacturing", "vocabulary", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-manufacturing", "AI-INSTRUCTIONS.md"),
    to: join(templatesDir, "manufacturing", "vocabulary", "AI-INSTRUCTIONS.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-manufacturing", "templates.md"),
    to: join(templatesDir, "manufacturing", "vocabulary", "templates.md"),
  },
];

async function build() {
  console.log("\nBuilding create-playbook templates...\n");

  // Clean templates directory
  await rm(templatesDir, { recursive: true, force: true });
  await mkdir(templatesDir, { recursive: true });

  let copied = 0;
  const errors = [];

  for (const { from, to } of sources) {
    try {
      await mkdir(dirname(to), { recursive: true });
      await cp(from, to);
      console.log(`  ✓ ${to.replace(templatesDir, "templates")}`);
      copied++;
    } catch (err) {
      console.error(`  ✗ ${from.replace(repoRoot, "")} — ${err.message}`);
      errors.push({ from, err });
    }
  }

  console.log(`\n${copied} files copied.`);

  if (errors.length > 0) {
    console.error(`${errors.length} errors — fix source paths before publishing.\n`);
    process.exit(1);
  }

  console.log("Build complete.\n");
}

build();
