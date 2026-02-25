// depute CLI — commands/help.js
import { DOCS_URL } from '../config.js';

const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim:  (s) => `\x1b[2m${s}\x1b[0m`,
  green:(s) => `\x1b[32m${s}\x1b[0m`,
};

export function printHelp() {
  console.log(`
  ${c.bold('✦ ax-depute')} — AX Components for React
  ${c.dim('Copy-paste UI primitives for agentic experiences (shadcn-style)')}

  ${c.cyan(c.bold('Usage'))}

    npx ax-depute ${c.bold('<command>')} [options]

  ${c.cyan(c.bold('Commands'))}

    ${c.green('add')} ${c.dim('<component>')}     Copy a component into your project
    ${c.green('list')}                   List all available components
    ${c.green('help')}                   Show this help message

  ${c.cyan(c.bold('Examples'))}

    npx ax-depute list
    npx ax-depute add approval-gate
    npx ax-depute add orchestrator-view
    npx ax-depute add plan-card --dir components/ax

  ${c.cyan(c.bold('Options for add'))}

    ${c.green('--dir')} ${c.dim('<path>')}          Output directory (default: src/components)

  ${c.cyan(c.bold('What it does'))}

    Copies the component source files directly into your project so
    you own the code — no black box, no lock-in. Shared types are
    added once to src/types/ax-common.ts.

  ${c.dim(`Docs: ${DOCS_URL}`)}
`);
}
