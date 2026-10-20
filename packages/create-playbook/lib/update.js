import { existsSync } from "fs";
import { readFile, cp } from "fs/promises";
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
    // Kit files are only written during initial scaffolding (`init` / `adopt`).

    // Optional: Refresh non-stateful core docs or guidelines if needed safely
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
