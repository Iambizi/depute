// depute CLI — src/index.js
// Routes CLI commands to their handlers.

import { runAdd } from './commands/add.js';
import { runList } from './commands/list.js';
import { printHelp } from './commands/help.js';

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    await runAdd(args.slice(1));
    break;
  case 'list':
    await runList();
    break;
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    printHelp();
    break;
  default:
    console.error(`\n  Unknown command: "${command}". Run "ax-depute help" for usage.\n`);
    process.exit(1);
}
