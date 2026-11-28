import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (!kv) continue;
    const key = kv[1].trim();
    const rawVal = kv[2].trim().replace(/^["']|["']$/g, "");
    meta[key] = /^\d+$/.test(rawVal) ? Number(rawVal) : rawVal;
  }
  return meta;
}

function extractOwnsEntries(content) {
  const entries = [];
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const inlineMatch = line.match(/owns:\s*\[?([^\]\r\n]+)\]?/i);
    if (inlineMatch) {
      const paths = inlineMatch[1]
        .split(/[,;]/)
        .map((s) => s.trim().replace(/^[`'"']|[`'"']$/g, ""))
        .filter(Boolean);
      entries.push({ line: i + 1, paths, context: line.trim().slice(0, 90) });
    }
  }
  return entries;
}

export async function handleCheck(targetDir = process.cwd()) {
  const resolved = resolve(targetDir);
  const playbookDir = join(resolved, ".playbook");
  const kitDir = join(playbookDir, "kit");

  const errors = [];
  const warnings = [];
  const checksRun = [];

  console.log(`\n  [create-playbook] Checking: ${resolved}\n`);

  if (!existsSync(playbookDir)) {
    console.error(`  ❌ Missing .playbook directory at ${resolved}`);
    process.exit(1);
  }

  checksRun.push("structure & version stamp");
  const requiredFiles = ["_index.md", "rules.md", "kit/01-process.md", "kit/05-kanban.md"];
  for (const rel of requiredFiles) {
    if (!existsSync(join(playbookDir, rel))) {
      errors.push(`Missing required file: .playbook/${rel}`);
    }
  }
  const versionPath = join(playbookDir, ".version");
  if (!existsSync(versionPath)) {
    warnings.push("Missing .playbook/.version stamp (run update or scaffold to stamp)");
  }

  checksRun.push("kit file budgets");
  if (existsSync(kitDir)) {
    const kitEntries = await readdir(kitDir, { withFileTypes: true });
    for (const entry of kitEntries) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
      const fullPath = join(kitDir, entry.name);
      const rawBuf = await readFile(fullPath);
      const text = rawBuf.toString("utf8");
      const meta = parseFrontmatter(text);
      const bytes = rawBuf.length;
      const lines = text.split(/\r?\n/);
      const lineCount = lines.length;
      const maxLineLen = lines.reduce((acc, l) => Math.max(acc, l.length), 0);

      if (typeof meta["max-bytes"] === "number" && bytes > meta["max-bytes"]) {
        warnings.push(`kit/${entry.name}: ${bytes}B exceeds max-bytes (${meta["max-bytes"]}B)`);
      }
      if (typeof meta["max-lines"] === "number" && lineCount > meta["max-lines"]) {
        warnings.push(`kit/${entry.name}: ${lineCount} lines exceeds max-lines (${meta["max-lines"]})`);
      }
      if (typeof meta["line-max"] === "number" && maxLineLen > meta["line-max"]) {
        warnings.push(`kit/${entry.name}: max line length ${maxLineLen} exceeds line-max (${meta["line-max"]})`);
      }
    }
  }

  checksRun.push("owns: write-set overlap");
  const ownershipMap = new Map();
  const candidates = [
    join(kitDir, "03-execution.md"),
    join(kitDir, "05-kanban.md"),
  ];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    const text = await readFile(file, "utf8");
    for (const item of extractOwnsEntries(text)) {
      for (const p of item.paths) {
        const norm = p.replace(/\\/g, "/").replace(/\/$/, "");
        const prev = ownershipMap.get(norm) || [];
        prev.push(`${file.split(/[/\\]/).slice(-2).join("/")}:${item.line}`);
        ownershipMap.set(norm, prev);
      }
    }
  }
  for (const [ownedPath, owners] of ownershipMap.entries()) {
    if (owners.length > 1) {
      warnings.push(`Overlapping owns: "${ownedPath}" declared at ${owners.join(", ")}`);
    }
  }

  console.log(`  Checks run: ${checksRun.join(", ")}`);

  if (warnings.length > 0) {
    console.log("\n  Warnings:");
    for (const w of warnings) console.log(`    ! ${w}`);
  }

  if (errors.length > 0) {
    console.log("\n  Errors:");
    for (const e of errors) console.log(`    ❌ ${e}`);
    console.log();
    process.exit(1);
  }

  console.log(`\n  ✓ Check passed (${warnings.length} warning(s)).\n`);
}
