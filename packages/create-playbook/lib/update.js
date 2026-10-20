import { existsSync } from "fs";
import { readFile, cp, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { syncLibrary } from "./install.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function handleUpdate(targetDir = process.cwd()) {
  const resolvedTarget = resolve(targetDir);
  console.log(`\n  create-playbook update\n`);
  console.log(`  Target project: ${resolvedTarget}`);

  const playbookDir = join(resolvedTarget, ".playbook");
  if (!existsSync(playbookDir)) {
    console.error(`\n  Error: No .playbook directory found at ${resolvedTarget}.`);
    console.error(`  This command must be run inside an initialized Playbook project.\n`);
    process.exit(1);
  }

  console.log(`  Checking Playbook project structure...`);

  // Path to packaged universal templates
  const templatesDir = resolve(__dirname, "..", "templates", "universal", "playbook");

  if (existsSync(templatesDir)) {
    // NOTE: We intentionally DO NOT overwrite existing .playbook/kit/ files 
    // because they contain active project state, progress logs, and milestones.

    // 1. Copy over missing core files (e.g., rules.md, etc.) if they don't exist
    const entries = await readdir(templatesDir, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = join(templatesDir, entry.name);
      const destPath = join(playbookDir, entry.name);

      if (entry.isFile()) {
        if (!existsSync(destPath)) {
          await cp(srcPath, destPath);
          console.log(`  ✓ Added missing core file: .playbook/${entry.name}`);
        }
      } else if (entry.isDirectory() && entry.name === "templates") {
        // Safely sync immutable template definitions
        await cp(srcPath, destPath, { recursive: true, force: true });
        console.log(`  ✓ Refreshed .playbook/templates/`);
      }
    }

    // Refresh non-stateful core docs if missing
    const sourceDocs = join(templatesDir, "docs");
    const targetDocs = join(playbookDir, "docs");
    if (existsSync(sourceDocs) && !existsSync(targetDocs)) {
      await cp(sourceDocs, targetDocs, { recursive: true, force: true });
      console.log(`  ✓ Initialized missing .playbook/docs/`);
    }
  }

  // Sync software library if installed in package.json
  const packageJsonPath = join(resolvedTarget, "package.json");
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(await readFile(packageJsonPath, "utf8"));
      const hasLib = pkg.dependencies?.["@bogsp/playbook-software-library"] || 
                     pkg.devDependencies?.["@bogsp/playbook-software-library"];
      
      if (hasLib) {
        console.log(`  Syncing @bogsp/playbook-software-library...`);
        await syncLibrary(resolvedTarget);
        console.log(`  ✓ Library synchronized`);
      }
    } catch (err) {
      // Ignore parsing errors for non-standard project files
    }
  }

  console.log(`\n  ✓ Playbook update complete. Active project state preserved.\n`);
}
