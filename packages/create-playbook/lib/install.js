// lib/install.js
// File: packages/create-playbook/lib/install.js
//
// Handles library installation and sync for software domain projects.

import { execSync } from "child_process";
import { readFile, writeFile, cp, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const LIBRARY_PACKAGE = "@bogsp/playbook-software-library";

/**
 * Install the software library and copy docs into the project.
 * @param {string} projectRoot
 * @returns {Promise<string>} installed version
 */
export async function installLibrary(projectRoot) {
  console.log(`\n  Installing ${LIBRARY_PACKAGE}...\n`);

  try {
    execSync(`pnpm add ${LIBRARY_PACKAGE}`, {
      cwd: projectRoot,
      stdio: "inherit",
    });
  } catch {
    console.error(`\n  Failed to install ${LIBRARY_PACKAGE}.`);
    console.error(`  Run 'pnpm add ${LIBRARY_PACKAGE}' manually after init.\n`);
    return "";
  }

  const version = getInstalledVersion(projectRoot);
  await copyLibraryDocs(projectRoot);
  return version;
}

/**
 * Sync library docs — check for updates and list changed docs.
 * @param {string} projectRoot
 */
export async function syncLibrary(projectRoot) {
  const installedVersion = getInstalledVersion(projectRoot);
  if (!installedVersion) {
    console.log(`\n  ${LIBRARY_PACKAGE} is not installed in this project.`);
    console.log(`  Run 'pnpm add ${LIBRARY_PACKAGE}' to install it.\n`);
    return;
  }

  console.log(`\n  Installed: ${LIBRARY_PACKAGE}@${installedVersion}`);
  console.log("  Checking for updates...\n");

  let latestVersion;
  try {
    latestVersion = execSync(`pnpm view ${LIBRARY_PACKAGE} version`, {
      cwd: projectRoot,
      encoding: "utf8",
    }).trim();
  } catch {
    console.error("  Could not reach the npm registry. Check your connection.\n");
    return;
  }

  if (installedVersion === latestVersion) {
    console.log(`  Already up to date (${installedVersion}).\n`);
    return;
  }

  console.log(`  Update available: ${installedVersion} → ${latestVersion}`);
  console.log("\n  Changed docs in this update:\n");

  // Show changelog diff between versions
  try {
    const changelog = execSync(
      `pnpm view ${LIBRARY_PACKAGE}@${latestVersion} dist-tags`,
      { cwd: projectRoot, encoding: "utf8" }
    );
    console.log(changelog);
  } catch {
    console.log(`  See CHANGELOG at https://www.npmjs.com/package/${LIBRARY_PACKAGE}\n`);
  }

  console.log(
    `  Review the changes, then run 'pnpm add ${LIBRARY_PACKAGE}@latest' to update.`
  );
  console.log(
    "  After updating, run 'pnpm dlx create-playbook sync' again to copy updated docs.\n"
  );
}

/**
 * Copy library docs from node_modules into .playbook/.
 * @param {string} projectRoot
 */
async function copyLibraryDocs(projectRoot) {
  const libDir = join(projectRoot, "node_modules", LIBRARY_PACKAGE);

  if (!existsSync(libDir)) {
    console.error(`  Library not found in node_modules. Install failed.\n`);
    return;
  }

  const targets = [
    { from: join(libDir, "_concerns"), to: join(projectRoot, ".playbook", "_concerns") },
    { from: join(libDir, "_integrations"), to: join(projectRoot, ".playbook", "_integrations") },
    { from: join(libDir, "_solutions"), to: join(projectRoot, ".playbook", "_solutions") },
  ];

  for (const { from, to } of targets) {
    if (existsSync(from)) {
      await mkdir(to, { recursive: true });
      await cp(from, to, { recursive: true });
      console.log(`  ✓ Copied ${from.replace(libDir, LIBRARY_PACKAGE)}`);
    }
  }

  console.log();
}

/**
 * Get the currently installed library version from package.json.
 * @param {string} projectRoot
 * @returns {string}
 */
function getInstalledVersion(projectRoot) {
  try {
    const pkgPath = join(
      projectRoot,
      "node_modules",
      LIBRARY_PACKAGE,
      "package.json"
    );
    const pkg = JSON.parse(execSync(`cat ${pkgPath}`, { encoding: "utf8" }));
    return pkg.version || "";
  } catch {
    return "";
  }
}
