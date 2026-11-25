import { existsSync } from "fs";
import { cp, mkdir, readFile, readdir, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REPLACE_SAFE_ROOT = new Set([
  "rules.md",
  "pipeline.md",
  "maintenance.md",
  "expansions.md",
  "README.md",
]);

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
    console.log(`  Target template version: ${targetVersion}`);

    const entries = await readdir(templatesDir, { withFileTypes: true });
    const updated = [];
    const preserved = [];

    for (const entry of entries) {
      const srcPath = join(templatesDir, entry.name);
      const destPath = join(playbookDir, entry.name);

      if (entry.isFile()) {
        if (!existsSync(destPath)) {
          if (!dryRun) await cp(srcPath, destPath);
          updated.push(`.playbook/${entry.name} (added)`);
        } else if (REPLACE_SAFE_ROOT.has(entry.name)) {
          if (!dryRun) await cp(srcPath, destPath, { force: true });
          updated.push(`.playbook/${entry.name} (framework synced)`);
        } else {
          preserved.push(`.playbook/${entry.name} (preserved)`);
        }
      } else if (entry.isDirectory() && entry.name === "kit") {
        const guideSrc = join(srcPath, "00-guide.md");
        const guideDest = join(destPath, "00-guide.md");
        if (existsSync(guideSrc)) {
          if (!dryRun) {
            await mkdir(guideDest, { recursive: true }).catch(() => {});
            await cp(guideSrc, guideDest, { force: true });
          }
          updated.push(".playbook/kit/00-guide.md (guide synced)");
        }
        preserved.push(".playbook/kit/01-06 & state (preserved)");
      } else if (entry.isDirectory() && entry.name === "templates") {
        if (!dryRun) await cp(srcPath, destPath, { recursive: true, force: true });
        updated.push(".playbook/templates/ (synced)");
      }
    }

    console.log("\n  Updated:");
    for (const item of updated) console.log(`    ✓ ${item}`);
    console.log("\n  Preserved:");
    for (const item of preserved) console.log(`    - ${item}`);
    console.log(`\n  ✓ ${dryRun ? "Dry-run complete" : "Update complete"}.\n`);
  } catch (err) {
    console.error("\n  ❌ Update failed with error:", err);
    process.exit(1);
  }
}
