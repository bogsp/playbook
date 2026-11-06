#!/usr/bin/env node
// check-drift.mjs
// File: packages/check-drift.mjs
//
// Fails (exit 1) if committed generated output differs from a fresh build of
// the template source in playbook/. Guards the one generated folder that is
// committed: packages/playbook-skill/assets/. Also proves the CLI build
// still succeeds, and that no file under its gitignored templates/ folder is
// tracked (that folder is build output).
//
// Run: node packages/check-drift.mjs   (or: pnpm check:drift)
// Fix a failure by running `pnpm build` and committing the result — never by
// hand-editing assets/.

import { execFileSync } from "child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...listFiles(full, base));
    else out.push(relative(base, full));
  }
  return out.sort();
}

function runBuild(pkg, outDir) {
  execFileSync("node", [join(__dirname, pkg, "build.js"), "--out", outDir], { stdio: "pipe" });
}

const tmp = mkdtempSync(join(tmpdir(), "playbook-drift-"));
const problems = [];

try {
  // 1. CLI build must succeed (output is gitignored, so nothing to compare)
  try {
    runBuild("create-playbook", join(tmp, "cli"));
  } catch (err) {
    problems.push(`create-playbook build failed:\n${String(err.stderr || err.message)}`);
  }

  // 2. The CLI templates/ folder is build output: nothing in it may be tracked.
  //    A tracked copy is edited by hand, goes stale, and is discarded at publish.
  try {
    const tracked = execFileSync("git", ["ls-files", "--", "packages/create-playbook/templates"], {
      cwd: join(__dirname, ".."),
      encoding: "utf8",
    })
      .split("\n")
      .filter(Boolean);
    for (const f of tracked) problems.push(`tracked build output (gitignored folder): ${f}; untrack it with git rm --cached`);
  } catch (err) {
    problems.push(`could not list tracked files: ${String(err.message)}`);
  }

  // 3. Skill assets must equal a fresh build
  const fresh = join(tmp, "skill");
  const committed = join(__dirname, "playbook-skill", "assets");
  try {
    runBuild("playbook-skill", fresh);
    const a = listFiles(committed);
    const b = listFiles(fresh);
    for (const f of b.filter((x) => !a.includes(x))) problems.push(`missing from assets/: ${f}`);
    for (const f of a.filter((x) => !b.includes(x))) problems.push(`stale in assets/ (not in manifest): ${f}`);
    for (const f of a.filter((x) => b.includes(x))) {
      if (!readFileSync(join(committed, f)).equals(readFileSync(join(fresh, f)))) problems.push(`out of date: assets/${f}`);
    }
  } catch (err) {
    problems.push(`playbook-skill build failed:\n${String(err.stderr || err.message)}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error("\nDrift check FAILED:\n");
  for (const p of problems) console.error(`  - ${p}`);
  console.error("\nRun `pnpm build`, review the result, and commit it.\n");
  process.exit(1);
}

console.log("Drift check passed: playbook-skill/assets/ matches a fresh build; create-playbook builds cleanly.");
