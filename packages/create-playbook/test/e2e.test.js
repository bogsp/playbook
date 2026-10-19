import fs from "fs";

// E2E Test for create-playbook & adopt command
import test from "node:test";
import assert from "node:assert";
import { adoptProject } from "../lib/adopt.js";
import { mkdtemp, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

test("adopt project creates playbook manifest with profile", async () => {
  const tmp = await mkdtemp(join(tmpdir(), "playbook-test-"));
  try {
    await adoptProject(tmp, "lite");
    const manifestPath = join(tmp, ".playbook", "manifest.json");
    assert.strictEqual(fs.existsSync(manifestPath), true);
    const content = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    assert.strictEqual(content.profile, "lite");
    assert.strictEqual(content.version, "2.0.0");
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});
