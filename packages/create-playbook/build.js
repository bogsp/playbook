#!/usr/bin/env node
// build.js
// File: packages/create-playbook/build.js
//
// Copies the files listed in packages/template-manifest.json from
// playbook/.playbook/ and playbook/docs/ into
// packages/create-playbook/templates/ (build output, gitignored; rebuilt
// automatically on publish). The manifest is also copied into
// templates/manifest.json so lib/scaffold.js reads the same list at runtime.
//
// The list of shipped files lives ONLY in the manifest — do not add file
// lists to this script.
//
// Run: node build.js [--out <dir>]
// Or via package.json script: pnpm build

import { cp, rm, mkdir } from "fs/promises";
import { readFileSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const manifestPath = join(__dirname, "..", "template-manifest.json");
const outIdx = process.argv.indexOf("--out");
const templatesDir = outIdx > -1 ? resolve(process.argv[outIdx + 1]) : join(__dirname, "templates");

const m = JSON.parse(readFileSync(manifestPath, "utf8"));

const pb = (...p) => join(repoRoot, "playbook", ".playbook", ...p);
const pd = (...p) => join(repoRoot, "playbook", "docs", ...p);
const out = (...p) => join(templatesDir, ...p);

const sources = [];

for (const f of m.playbookRoot) sources.push({ from: pb(f), to: out("universal", "playbook", f) });
for (const f of Object.keys(m.onDemand)) sources.push({ from: pb(f), to: out("universal", "playbook", f) });
for (const f of m.kit) sources.push({ from: pb("kit", f), to: out("universal", "kit", f) });
sources.push({ from: pb("templates", m.projectReadme), to: out("universal", "project-README.md") });
for (const f of m.kitTests) sources.push({ from: pb("kit", "_tests", f), to: out("universal", "kit", "_tests", f) });
for (const d of m.docs) sources.push({ from: pd(d.group, d.source), to: out("universal", "docs", d.group, d.name) });
for (const f of m.universalTemplates) {
  sources.push({ from: pb("templates", f), to: out("universal", "playbook", "templates", f) });
}

// Domain vocabulary — single merged _index.md per domain, plus that domain's templates/ folder
for (const [domain, files] of Object.entries(m.domains)) {
  sources.push({ from: pb(`vocabulary-${domain}`, "_index.md"), to: out(domain, "vocabulary", "_index.md") });
  for (const f of files) {
    sources.push({ from: pb(`vocabulary-${domain}`, "templates", f), to: out(domain, "vocabulary", "templates", f) });
  }
}

// Runtime copy of the manifest, read by lib/scaffold.js
sources.push({ from: manifestPath, to: out("manifest.json") });

async function build() {
  console.log("\nBuilding create-playbook templates...\n");

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
