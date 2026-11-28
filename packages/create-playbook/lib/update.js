import { createHash } from "crypto";
import { existsSync } from "fs";
import { cp, mkdir, readFile, readdir, writeFile } from "fs/promises";
import { dirname, join, relative, resolve, sep } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REPLACE_SAFE_ROOT = new Set([
  "rules.md",
  "pipeline.md",
  "maintenance.md",
  "expansions.md",
  "README.md",
]);

const PROTECTED_PATHS = new Set([
  "_index.md",
  "kit/01-process.md",
  "kit/02-exploration.md",
  "kit/03-execution.md",
  "kit/04-progress.md",
  "kit/05-kanban.md",
  "kit/06-qa.md",
]);

function shortHash(bufferOrString) {
  return createHash("sha256").update(bufferOrString).digest("hex").slice(0, 16);
}

async function readVersionStamp(versionPath) {
  if (!existsSync(versionPath)) return null;
  try {
    return JSON.parse(await readFile(versionPath, "utf8"));
  } catch {
    return null;
  }
}

async function collectPlaybookHashes(playbookDir) {
  const hashes = {};
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name !== ".gitkeep" && entry.name !== ".version") {
        const rel = relative(playbookDir, full).split(sep).join("/");
        hashes[rel] = shortHash(await readFile(full));
      }
    }
  }
  await walk(playbookDir);
  return hashes;
}

export async function handleUpdate(targetDir = process.cwd(), options = {}) {
  const dryRun = Boolean(options.dryRun);
  try {
    const resolvedTarget = resolve(targetDir);
    console.log(`\n  [create-playbook] ${dryRun ? "Dry-run update" : "Updating"}: ${resolvedTarget}`);

    const playbookDir = join(resolvedTarget, ".playbook");
    if (!existsSync(playbookDir)) {
      console.error(`  Error: No .playbook directory found at ${resolvedTarget}.`);
      process.exit(1);
    }

    const templatesDir = resolve(__dirname, "..", "templates", "universal", "playbook");
    if (!existsSync(templatesDir)) {
      console.error(`  Error: Templates directory not found at ${templatesDir}`);
      process.exit(1);
    }

    const manifestPath = resolve(__dirname, "..", "..", "template-manifest.json");
    let targetVersion = "latest";
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      if (manifest.templateVersion) targetVersion = manifest.templateVersion;
    }

    const versionPath = join(playbookDir, ".version");
    const previousStamp = await readVersionStamp(versionPath);
    const previousFiles = previousStamp?.files ?? {};

    console.log(`  Target template version: ${targetVersion}`);
    if (previousStamp?.templateVersion) {
      console.log(`  Current stamped version: ${previousStamp.templateVersion}`);
    }

    const entries = await readdir(templatesDir, { withFileTypes: true });
    const updated = [];
    const preserved = [];
    const warnings = [];

    for (const entry of entries) {
      const srcPath = join(templatesDir, entry.name);
      const destPath = join(playbookDir, entry.name);

      if (entry.isFile()) {
        const relPath = entry.name;
        const isProtected = PROTECTED_PATHS.has(relPath);
        if (!existsSync(destPath)) {
          if (!dryRun) await cp(srcPath, destPath);
          updated.push(`.playbook/${relPath} (added)`);
        } else if (isProtected) {
          preserved.push(`.playbook/${relPath} (protected)`);
          const currentHash = shortHash(await readFile(destPath));
          if (previousFiles[relPath] && previousFiles[relPath] !== currentHash) {
            warnings.push(`.playbook/${relPath} has local edits (protected from overwrite)`);
          }
        } else if (REPLACE_SAFE_ROOT.has(relPath)) {
          const currentHash = shortHash(await readFile(destPath));
          const wasModified = previousFiles[relPath] && previousFiles[relPath] !== currentHash;
          if (wasModified) {
            warnings.push(`.playbook/${relPath} differs from stamped hash; synced framework file`);
          }
          if (!dryRun) await cp(srcPath, destPath, { force: true });
          updated.push(`.playbook/${relPath} (${wasModified ? "synced over local edit" : "framework synced"})`);
        } else {
          preserved.push(`.playbook/${relPath} (preserved)`);
        }
      } else if (entry.isDirectory() && entry.name === "kit") {
        const guideSrc = join(srcPath, "00-guide.md");
        const guideDest = join(destPath, "00-guide.md");
        const guideRel = "kit/00-guide.md";
        if (existsSync(guideSrc)) {
          const wasModified =
            existsSync(guideDest) &&
            previousFiles[guideRel] &&
            previousFiles[guideRel] !== shortHash(await readFile(guideDest));
          if (wasModified) {
            warnings.push(`.playbook/${guideRel} differs from stamped hash; synced guide`);
          }
          if (!dryRun) {
            await mkdir(dirname(guideDest), { recursive: true });
            await cp(guideSrc, guideDest, { force: true });
          }
          updated.push(`.playbook/${guideRel} (${wasModified ? "synced over local edit" : "guide synced"})`);
        }
        preserved.push(".playbook/kit/01-06 & state (protected)");
      } else if (entry.isDirectory() && entry.name === "templates") {
        if (!dryRun) await cp(srcPath, destPath, { recursive: true, force: true });
        updated.push(".playbook/templates/ (synced)");
      }
    }

    if (!dryRun) {
      const nextStamp = {
        templateVersion: targetVersion,
        updated: new Date().toISOString().split("T")[0],
        protectedFiles: Array.from(PROTECTED_PATHS),
        files: await collectPlaybookHashes(playbookDir),
      };
      await writeFile(versionPath, JSON.stringify(nextStamp, null, 2) + "\n", "utf8");
    }

    console.log("\n  Updated:");
    for (const item of updated) console.log(`    ✓ ${item}`);
    console.log("\n  Preserved:");
    for (const item of preserved) console.log(`    - ${item}`);
    if (warnings.length > 0) {
      console.log("\n  Warnings:");
      for (const w of warnings) console.log(`    ! ${w}`);
    }
    console.log(`\n  ✓ ${dryRun ? "Dry-run complete" : "Update complete"}.\n`);
  } catch (err) {
    console.error("\n  ❌ Update failed with error:", err);
    process.exit(1);
  }
}
