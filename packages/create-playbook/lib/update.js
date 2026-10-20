import { existsSync } from "fs";
import { readFile, cp, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { syncLibrary } from "./install.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function handleUpdate(targetDir = process.cwd()) {
  try {
    const resolvedTarget = resolve(targetDir);
    console.log(`\n  [create-playbook] Running update on: ${resolvedTarget}`);

    const playbookDir = join(resolvedTarget, ".playbook");
    if (!existsSync(playbookDir)) {
      console.error(`  Error: No .playbook directory found at ${resolvedTarget}.`);
      process.exit(1);
    }

    const templatesDir = resolve(__dirname, "..", "templates", "universal", "playbook");
    console.log(`  [create-playbook] Looking for templates at: ${templatesDir}`);

    if (!existsSync(templatesDir)) {
      console.error(`  Error: Templates directory not found at ${templatesDir}`);
      process.exit(1);
    }

    console.log(`  Reading template directory entries...`);
    const entries = await readdir(templatesDir, { withFileTypes: true });
    console.log(`  Found ${entries.length} entries in template source.`);

    for (const entry of entries) {
      const srcPath = join(templatesDir, entry.name);
      const destPath = join(playbookDir, entry.name);

      if (entry.isFile()) {
        if (!existsSync(destPath)) {
          await cp(srcPath, destPath);
          console.log(`  ✓ Added missing core file: .playbook/${entry.name}`);
        } else {
          console.log(`  - Core file already exists: .playbook/${entry.name}`);
        }
      } else if (entry.isDirectory() && entry.name === "templates") {
        await cp(srcPath, destPath, { recursive: true, force: true });
        console.log(`  ✓ Synced .playbook/templates/ directory`);
      }
    }

    console.log(`\n  ✓ Update check finished successfully.\n`);
  } catch (err) {
    console.error(`\n  ❌ Update failed with error:`, err);
    process.exit(1);
  }
}
