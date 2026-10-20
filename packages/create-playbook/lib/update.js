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

  console.log(`  Syncing latest Playbook kit files and documentation...`);

  // Path to packaged universal templates
  const templatesDir = resolve(__dirname, "..", "templates", "universal", "playbook");

  if (existsSync(templatesDir)) {
    // 1. Refresh universal kit files (.playbook/kit/)
    const sourceKit = join(templatesDir, "kit");
    const targetKit = join(playbookDir, "kit");
    if (existsSync(sourceKit)) {
      await cp(sourceKit, targetKit, { recursive: true, force: true });
      console.log(`  ✓ Refreshed .playbook/kit/`);
    }

    // 2. Refresh documentation if bundled
    const sourceDocs = join(templatesDir, "docs");
    const targetDocs = join(playbookDir, "docs");
    if (existsSync(sourceDocs)) {
      await cp(sourceDocs, targetDocs, { recursive: true, force: true });
      console.log(`  ✓ Refreshed .playbook/docs/`);
    }
  }

  // 3. Sync software library if installed in package.json
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

  console.log(`\n  ✓ Playbook update complete. Review changes with 'git status'.\n`);
}
