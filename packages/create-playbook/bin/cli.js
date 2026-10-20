#!/usr/bin/env node
import { handleUpdate } from '../lib/update.js';

const args = process.argv.slice(2);

if (args.includes('update') || args[0] === 'update') {
  const updateIndex = args.indexOf('update');
  const targetDir = args[updateIndex + 1] && !args[updateIndex + 1].startsWith('-') 
    ? args[updateIndex + 1] 
    : process.cwd();
  
  handleUpdate(targetDir);
  process.exit(0);
}

// Otherwise, proceed with normal scaffolding/init flow...
import('../lib/cli-main.js').catch(err => {
  console.error(err);
  process.exit(1);
});
