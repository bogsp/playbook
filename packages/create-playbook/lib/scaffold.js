// lib/scaffold.js
// File: packages/create-playbook/lib/scaffold.js
//
// Assembles and writes the project scaffold based on init answers.

import { mkdir, writeFile, readFile, copyFile, readdir } from "fs/promises";
import { createHash } from "crypto";
import { join, dirname, relative, sep } from "path";
import { fileURLToPath } from "url";
import { existsSync, readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, "..", "templates");

// The list of template files comes from templates/manifest.json — a copy of
// packages/template-manifest.json written by build.js. There is no second
// list to keep in sync here.
let manifest;
try {
  manifest = JSON.parse(readFileSync(join(templatesDir, "manifest.json"), "utf8"));
} catch {
  throw new Error("templates/manifest.json not found — run `pnpm build` in packages/create-playbook first.");
}
const UNIVERSAL_TEMPLATE_FILES = manifest.universalTemplates;
const DOMAIN_TEMPLATE_FILES = manifest.domains;

/**
 * Check whether the current working directory is a Playbook project.
 * @param {string} cwd
 * @returns {boolean}
 */
export function isPlaybookProject(cwd) {
  return existsSync(join(cwd, ".playbook", "_index.md"));
}

/**
 * Read a template file and return its content.
 * @param {string} relativePath — relative to templates/
 * @returns {Promise<string>}
 */
async function readTemplate(relativePath) {
  const full = join(templatesDir, relativePath);
  try {
    return await readFile(full, "utf8");
  } catch {
    throw new Error(`Template not found: ${relativePath}. Run 'pnpm build' first.`);
  }
}

/**
 * Write a file, creating parent directories as needed.
 * @param {string} filePath
 * @param {string} content
 */
async function write(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

/**
 * Copy a template file to a destination path.
 * @param {string} templateRelPath — relative to templates/
 * @param {string} destPath — absolute destination path
 */
async function copyTemplate(templateRelPath, destPath) {
  const content = await readTemplate(templateRelPath);
  await write(destPath, content);
}

/**
 * Copy every file in a flat template folder to a destination folder.
 * @param {string} templateRelDir — relative to templates/, no trailing slash
 * @param {string} destDir — absolute destination directory
 * @param {string[]} filenames
 */
async function copyTemplateFolder(templateRelDir, destDir, filenames) {
  for (const file of filenames) {
    await copyTemplate(`${templateRelDir}/${file}`, join(destDir, file));
  }
}

/**
 * Write the project's root README. Never overwrite an existing one: if it
 * exists, only add the pointer to .playbook/README.md when it is missing.
 * @param {string} destPath
 * @param {string} projectName
 */
async function writeRootReadme(destPath, projectName) {
  if (!existsSync(destPath)) {
    const tpl = await readTemplate("universal/project-README.md");
    await write(destPath, tpl.replace(/\[Project Name\]/g, projectName));
    return;
  }
  const current = readFileSync(destPath, "utf8");
  if (current.includes(".playbook/README.md")) return;
  const pointer =
    "\n## Working with AI\n\nThis project uses [Playbook](https://github.com/bogsp/playbook) to keep AI-assisted planning on track and sessions continuous. Start at [.playbook/README.md](.playbook/README.md).\n";
  await writeFile(destPath, current.replace(/\s*$/, "\n") + pointer, "utf8");
}

/**
 * Generate a .gitkeep file.
 * @param {string} dirPath
 */
async function gitkeep(dirPath) {
  await mkdir(dirPath, { recursive: true });
  await writeFile(join(dirPath, ".gitkeep"), "", "utf8");
}

/**
 * Generate the _index.md with project-specific frontmatter.
 * @param {string} projectName
 * @param {string} domain
 * @param {string} libraryVersion — installed library version or empty string
 * @param {string} reviewGate — "strict" | "balanced" | "lean"
 * @param {string} pipelineMode — "kit-only" | "full"
 * @returns {Promise<string>}
 */
async function buildIndex(projectName, domain, libraryVersion, reviewGate, pipelineMode) {
  const content = await readTemplate("universal/playbook/_index.md");
  let result = content.replace(/\[project-name\]/g, projectName);

  // Template ships with default placeholders (review-gate: balanced,
  // pipeline-mode: kit-only) — overwrite with the person's actual choice,
  // even when it matches the default, so the field is never silently stale.
  result = result.replace(/review-gate: \w+/, `review-gate: ${reviewGate}`);
  result = result.replace(/pipeline-mode: [\w-]+/, `pipeline-mode: ${pipelineMode}`);

  if (domain === "software" && libraryVersion) {
    result = result.replace(
      "status: draft",
      `status: draft\nlibrary: "@bogsp/playbook-software-library@${libraryVersion}"`
    );
  }
  return result;
}

/**
 * Generate kit/01-process.md pre-populated based on project type.
 * Fills the Phase, Last, Next and Active Expansions lines of the template.
 * @param {"new"|"adopt"|"audit"} projectType
 * @returns {Promise<string>}
 */
async function buildProcess(projectType) {
  const content = await readTemplate("universal/kit/01-process.md");
  const state = {
    new: { phase: "Discovery", next: "Populate 02-exploration with the first project questions" },
    adopt: { phase: "Discovery", next: "Answer the four questions in adopt.md; record what is known in 02-exploration" },
    audit: { phase: "Audit", next: "Begin the audit inventory (see audit.md)" },
  }[projectType];
  let result = content
    .replace(/^Phase: .*$/m, `Phase: ${state.phase}`)
    .replace(/^Last: .*$/m, "Last: Playbook scaffold generated")
    .replace(/^Next: .*$/m, `Next: ${state.next}`)
    .replace(/^Open: .*$/m, "Open: none")
    .replace(/^Active Expansions: .*$/m, projectType === "audit" ? "Active Expansions: audit | inventory | audit.md, docs/rewrite/ | none" : "Active Expansions: none");
  return result;
}

/**
 * Generate kit/04-progress.md: the template plus one Completed line.
 * Current state lives in 01-process.md, not here.
 * @param {"new"|"adopt"|"audit"} projectType
 * @returns {Promise<string>}
 */
async function buildProgress(projectType) {
  const content = await readTemplate("universal/kit/04-progress.md");
  const today = new Date().toISOString().split("T")[0];
  const start = {
    new: "starting from scratch",
    adopt: "adopting an existing project",
    audit: "auditing an existing project before adopting",
  }[projectType];
  return `${content.trimEnd()}\n\n${today} | Completed | Playbook scaffold generated (${start}) | .playbook/.version\n`;
}

/**
 * Write .playbook/.version: the template version and a sha256 per file as
 * scaffolded. Later, a changed hash means the project edited that file; a
 * changed template version means Playbook has something newer to offer.
 * @param {string} root
 */
async function writeVersionStamp(root) {
  const base = join(root, ".playbook");
  const files = {};
  async function walk(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.name !== ".gitkeep" && e.name !== ".version") {
        const hash = createHash("sha256").update(await readFile(full)).digest("hex");
        files[relative(base, full).split(sep).join("/")] = hash.slice(0, 16);
      }
    }
  }
  await walk(base);
  const stamp = {
    templateVersion: manifest.templateVersion,
    scaffolded: new Date().toISOString().split("T")[0],
    files: Object.fromEntries(Object.entries(files).sort()),
  };
  await write(join(base, ".version"), JSON.stringify(stamp, null, 2) + "\n");
}

/**
 * Main scaffold function.
 * @param {{
 *   projectName: string,
 *   domain: "software"|"writing"|"production"|"manufacturing"|"none",
 *   projectType: "new"|"adopt"|"audit",
 *   root: string,
 *   libraryVersion: string,
 *   reviewGate: "strict"|"balanced"|"lean",
 *   pipelineMode: "kit-only"|"full"
 * }} options
 */
export async function scaffold({ projectName, domain, projectType, root, libraryVersion, reviewGate, pipelineMode }) {
  const p = (...parts) => join(root, ...parts);

  // --- Universal playbook files ---
  await copyTemplate("universal/playbook/README.md", p(".playbook", "README.md"));
  await writeRootReadme(p("README.md"), projectName);
  await write(p(".playbook", "_index.md"), await buildIndex(projectName, domain, libraryVersion, reviewGate, pipelineMode));
  await copyTemplate("universal/playbook/rules.md", p(".playbook", "rules.md"));
  await copyTemplate("universal/playbook/expansions.md", p(".playbook", "expansions.md"));
  await copyTemplate("universal/playbook/pipeline.md", p(".playbook", "pipeline.md"));
  await copyTemplate("universal/playbook/maintenance.md", p(".playbook", "maintenance.md"));
  // Rarely used guides ship only to the project types that need them
  for (const [file, types] of Object.entries(manifest.onDemand)) {
    if (types.includes(projectType)) await copyTemplate(`universal/playbook/${file}`, p(".playbook", file));
  }

  // --- Universal templates/ folder (K-33) ---
  await copyTemplateFolder(
    "universal/playbook/templates",
    p(".playbook", "templates"),
    UNIVERSAL_TEMPLATE_FILES
  );

  // --- Empty reserved folders ---
  await gitkeep(p(".playbook", "_concerns"));
  await gitkeep(p(".playbook", "_integrations"));
  await gitkeep(p(".playbook", "_shared"));

  // --- Domain vocabulary — single merged _index.md per domain (K-42) ---
  if (domain !== "none") {
    const vocabFolder = `vocabulary-${domain}`;
    await copyTemplate(`${domain}/vocabulary/_index.md`, p(".playbook", vocabFolder, "_index.md"));
    await copyTemplateFolder(
      `${domain}/vocabulary/templates`,
      p(".playbook", vocabFolder, "templates"),
      DOMAIN_TEMPLATE_FILES[domain]
    );
  }

  // --- Kit files ---
  await copyTemplate("universal/kit/00-guide.md", p(".playbook", "kit", "00-guide.md"));
  await write(p(".playbook", "kit", "01-process.md"), await buildProcess(projectType));
  await copyTemplate("universal/kit/02-exploration.md", p(".playbook", "kit", "02-exploration.md"));
  await copyTemplate("universal/kit/03-execution.md", p(".playbook", "kit", "03-execution.md"));
  await write(p(".playbook", "kit", "04-progress.md"), await buildProgress(projectType));
  await copyTemplate("universal/kit/05-kanban.md", p(".playbook", "kit", "05-kanban.md"));
  await copyTemplate("universal/kit/06-qa.md", p(".playbook", "kit", "06-qa.md"));
  await copyTemplate("universal/kit/_tests/test-case.md", p(".playbook", "kit", "_tests", "test-case.md"));

  // Kit support folders
  await gitkeep(p(".playbook", "kit", "_refs", "decisions"));
  await gitkeep(p(".playbook", "kit", "_refs", "questions"));
  await gitkeep(p(".playbook", "kit", "_refs", "video-insights"));
  await gitkeep(p(".playbook", "kit", "_refs", "templates"));
  await gitkeep(p(".playbook", "kit", "_refs", "examples"));
  await gitkeep(p(".playbook", "kit", "_refs", "snippets"));
  await gitkeep(p(".playbook", "kit", "_refs", "research"));
  await gitkeep(p(".playbook", "kit", "_archives", "exploration"));
  await gitkeep(p(".playbook", "kit", "_archives", "progress"));
  await gitkeep(p(".playbook", "kit", "_archives", "kanban"));

  // --- Docs ---
  await write(p("docs", "flows", "_index.md"), buildFlowsIndex());
  await copyTemplate("universal/docs/flows/flow-template.md", p("docs", "flows", "flow-template.md"));
  await write(p("docs", "contracts", "_index.md"), buildContractsIndex());
  await copyTemplate("universal/docs/contracts/global.md", p("docs", "contracts", "global.md"));
  await copyTemplate("universal/docs/contracts/contract-template.md", p("docs", "contracts", "contract-template.md"));
  await gitkeep(p("docs", "rollout"));

  // Audit projects get rewrite folder
  if (projectType === "audit") {
    await copyTemplate("universal/docs/rewrite/system-map.md", p("docs", "rewrite", "system-map.md"));
    await copyTemplate("universal/docs/rewrite/decision-record.md", p("docs", "rewrite", "decision-record.md"));
    await copyTemplate("universal/docs/rewrite/risk-register.md", p("docs", "rewrite", "risk-register.md"));
  }

  // --- Version stamp (last, so it covers every file written above) ---
  await writeVersionStamp(root);
}

// ---------------------------------------------------------------------------
// Index file builders
// ---------------------------------------------------------------------------

function buildFlowsIndex() {
  return `# Flows
# File: docs/flows/_index.md

Entry point for all flow documents.
Read this file before any sequencer or flow-related planning doc.
Always read docs/contracts/global.md alongside flows.

---

## Flows

| ID | Title | Scope | Trigger | Status |
|---|---|---|---|---|

---

## Dependency Map

_How flows relate to each other._
_calls: flow calls another flow_
_emits: flow emits an event that triggers another flow_
`;
}

function buildContractsIndex() {
  return `# Contracts
# File: docs/contracts/_index.md

Entry point for all contract documents.
Always read global.md before any flow-specific contract.

---

## Read Order

1. global.md — system-wide rules; always first
2. flow-N-name.md — companion to the relevant flow

---

## Contracts

| File | Companion Flow | Status |
|---|---|---|
| global.md | all flows | draft |
`;
}
