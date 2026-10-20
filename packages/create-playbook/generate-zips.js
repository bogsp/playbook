import { execSync } from "child_process";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const templatesDir = join("packages", "create-playbook", "templates");
const downloadsDir = join("docs", "downloads");

if (!existsSync(downloadsDir)) {
  mkdirSync(downloadsDir, { recursive: true });
}

const domains = ["software", "writing", "production", "manufacturing", "universal"];

for (const domain of domains) {
  const sourceDir = join(templatesDir, domain);
  const zipName = `${domain}-kit.zip`;
  const outZip = join(downloadsDir, zipName);

  if (existsSync(sourceDir)) {
    console.log(`Packaging ${domain} kit into ${outZip}...`);
    // Use system zip command
    execSync(`cd "${sourceDir}" && zip -r "../../../../${outZip}" .`, { stdio: "inherit" });
  } else {
    console.warn(`Warning: Source directory for ${domain} not found at ${sourceDir}`);
  }
}

console.log("All domain ZIPs generated successfully in docs/downloads/");
