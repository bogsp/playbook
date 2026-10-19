
// packages/create-playbook/lib/adopt.js
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function adoptProject(targetDir, profile = "full") {
  console.log(`Adopting Playbook pipeline into ${targetDir} with profile: ${profile}...`);
  const playbookDir = join(targetDir, ".playbook");
  await mkdir(playbookDir, { recursive: true });
  await mkdir(join(playbookDir, "docs"), { recursive: true });
  
  const manifest = {
    version: "2.0.0",
    profile: profile,
    adoptedAt: new Date().toISOString()
  };
  
  await writeFile(join(playbookDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("Playbook adoption completed successfully.");
}
