/**
 * Budget Checker Utility (K-55)
 * Scans templates and assets to ensure file sizes stay within thresholds.
 */
const path = require("path");
const { walkDir } = require("./shared-core");

const MAX_FILE_SIZE_KB = 50; // Max allowed size per markdown/template file

function checkBudgets(dirs) {
  let failed = false;
  const report = [];

  dirs.forEach(dir => {
    const files = walkDir(dir);
    files.forEach(file => {
      const stats = fs.statSync(file);
      const sizeKb = stats.size / 1024;
      const isOver = sizeKb > MAX_FILE_SIZE_KB;
      if (isOver) failed = true;
      report.push({ file, sizeKb: sizeKb.toFixed(2), isOver });
    });
  });

  return { failed, report };
}

module.exports = { checkBudgets };
