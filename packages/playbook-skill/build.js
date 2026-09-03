#!/usr/bin/env node
// build.js
// File: packages/playbook-skill/build.js
//
// Copies source files from playbook/.playbook/ and playbook/docs/ into
// packages/playbook-skill/assets/ before the skill is packaged.
//
// Same source tree as packages/create-playbook/build.js — this file exists
// so the Skill has its own build step producing its own assets/ folder,
// without hand-maintaining a second copy of any template content. If the
// two build scripts drift in what they copy, that is itself a bug; keep
// UNIVERSAL_TEMPLATE_FILES / DOMAIN_TEMPLATE_FILES in sync between them.
//
// Run: node build.js
// Or via package.json script: pnpm build

import { cp, rm, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const assetsDir = join(__dirname, "assets");

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

const GUIDE_FILES = [
  "_index.md",
  "new-project.md",
  "adopt.md",
  "audit.md",
  "context-kit.md",
  "context-kit-standalone.md",
  "project-identity.md",
  "video-insights.md",
];

const KIT_FILES = [
  "00-prompts.md",
  "01-process.md",
  "02-exploration.md",
  "03-execution.md",
  "04-progress.md",
  "05-kanban.md",
  "06-qa.md",
];

const sources = [
  // Universal playbook files
  {
    from: join(repoRoot, "playbook", ".playbook", "_index.md"),
    to: join(assetsDir, "universal", "playbook", "_index.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "README.md"),
    to: join(assetsDir, "universal", "playbook", "README.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "pipeline.md"),
    to: join(assetsDir, "universal", "playbook", "pipeline.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "maintenance.md"),
    to: join(assetsDir, "universal", "playbook", "maintenance.md"),
  },
  // Docs templates
  {
    from: join(repoRoot, "playbook", "docs", "flows", "flow.md"),
    to: join(assetsDir, "universal", "docs", "flow-template.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "contracts", "contract.md"),
    to: join(assetsDir, "universal", "docs", "contract-template.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "contracts", "global.md"),
    to: join(assetsDir, "universal", "docs", "global.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "system-map.md"),
    to: join(assetsDir, "universal", "docs", "system-map.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "decision-record.md"),
    to: join(assetsDir, "universal", "docs", "decision-record.md"),
  },
  {
    from: join(repoRoot, "playbook", "docs", "rewrite", "risk-register.md"),
    to: join(assetsDir, "universal", "docs", "risk-register.md"),
  },
  {
    from: join(repoRoot, "playbook", ".playbook", "kit", "_tests", "test-case.md"),
    to: join(assetsDir, "universal", "kit", "_tests", "test-case.md"),
  },
];

// Universal guides
for (const file of GUIDE_FILES) {
  sources.push({
    from: join(repoRoot, "playbook", ".playbook", "guides", file),
    to: join(assetsDir, "universal", "playbook", "guides", file),
  });
}

// Universal kit files
for (const file of KIT_FILES) {
  sources.push({
    from: join(repoRoot, "playbook", ".playbook", "kit", file),
    to: join(assetsDir, "universal", "kit", file),
  });
}

// Universal templates/ folder
for (const file of UNIVERSAL_TEMPLATE_FILES) {
  sources.push({
    from: join(repoRoot, "playbook", ".playbook", "templates", file),
    to: join(assetsDir, "universal", "playbook", "templates", file),
  });
}

// Domain vocabulary — single merged _index.md per domain (post K-42), plus
// that domain's templates/ folder
for (const [domain, files] of Object.entries(DOMAIN_TEMPLATE_FILES)) {
  sources.push({
    from: join(repoRoot, "playbook", ".playbook", `vocabulary-${domain}`, "_index.md"),
    to: join(assetsDir, domain, "vocabulary", "_index.md"),
  });
  for (const file of files) {
    sources.push({
      from: join(repoRoot, "playbook", ".playbook", `vocabulary-${domain}`, "templates", file),
      to: join(assetsDir, domain, "vocabulary", "templates", file),
    });
  }
}

async function build() {
  console.log("\nBuilding playbook-skill assets...\n");

  await rm(assetsDir, { recursive: true, force: true });
  await mkdir(assetsDir, { recursive: true });

  let copied = 0;
  const errors = [];

  for (const { from, to } of sources) {
    try {
      await mkdir(dirname(to), { recursive: true });
      await cp(from, to);
      console.log(`  ✓ ${to.replace(assetsDir, "assets")}`);
      copied++;
    } catch (err) {
      console.error(`  ✗ ${from.replace(repoRoot, "")} — ${err.message}`);
      errors.push({ from, err });
    }
  }

  console.log(`\n${copied} files copied.`);

  if (errors.length > 0) {
    console.error(`${errors.length} errors — fix source paths before packaging.\n`);
    process.exit(1);
  }

  console.log("Build complete.\n");
}

build();
