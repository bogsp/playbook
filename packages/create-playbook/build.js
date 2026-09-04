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

// Split per-type template folders (K-33 universal, K-34 software, K-38
// writing/production/manufacturing). Replaces the retired single
// templates.md per scope — see docs/rewrite or K-37 for history.
const UNIVERSAL_TEMPLATE_FILES = [
  "_index.md",
  "structure.md",
  "coordinator.md",
  "component.md",
  "concern.md",
  "integration.md",
];

const DOMAIN_TEMPLATE_FILES = {
  software: ["_index.md", "structure.md", "sequencer.md", "component.md"],
  writing: ["_index.md", "coordinator.md", "piece.md"],
  production: ["_index.md", "coordinator.md", "deliverable.md"],
  manufacturing: ["_index.md", "coordinator.md", "part.md"],
};

const sources = [
  // Universal — from playbook/.playbook/
  // NOTE: AI-INSTRUCTIONS.md is intentionally absent — retired in the K-42
  // consolidation. Its content now lives inside _index.md below.
  {
    from: join(repoRoot, "playbook", ".playbook", "README.md"),
    to: join(templatesDir, "universal", "playbook", "README.md"),
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
    from: join(repoRoot, "playbook", ".playbook", "guides", "context-kit-standalone.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "context-kit-standalone.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "guides", "project-identity.md"),
    to: join(templatesDir, "universal", "playbook", "guides", "project-identity.md"),
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
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "_tests", "test-case.md"),
    to: join(templatesDir, "universal", "kit", "_tests", "test-case.md"),
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
  // Domain vocabulary — single merged _index.md per domain (K-42 consolidation).
  // README.md + AI-INSTRUCTIONS.md no longer exist as separate files.
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-software", "_index.md"),
    to: join(templatesDir, "software", "vocabulary", "_index.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-writing", "_index.md"),
    to: join(templatesDir, "writing", "vocabulary", "_index.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-production", "_index.md"),
    to: join(templatesDir, "production", "vocabulary", "_index.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "vocabulary-manufacturing", "_index.md"),
    to: join(templatesDir, "manufacturing", "vocabulary", "_index.md"),
  },
];

// Universal templates/ folder (K-33) — one source entry per file
for (const file of UNIVERSAL_TEMPLATE_FILES) {
  sources.push({
    from: join(repoRoot, "playbook", ".playbook", "templates", file),
    to: join(templatesDir, "universal", "playbook", "templates", file),
  });
}

// Domain templates/ folders (K-34 software, K-38 writing/production/manufacturing)
for (const [domain, files] of Object.entries(DOMAIN_TEMPLATE_FILES)) {
  for (const file of files) {
    sources.push({
      from: join(repoRoot, "playbook", ".playbook", `vocabulary-${domain}`, "templates", file),
      to: join(templatesDir, domain, "vocabulary", "templates", file),
    });
  }
}

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
