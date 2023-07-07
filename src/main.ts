#! /usr/bin/env node

import { Command } from 'commander';
import { getMeta } from './commands/getMeta.js';

export function main(program: Command): void {
  program.name('jscrambler');
  program.description('CLI to get metas from a URL');
  program.version('1.0.0');

  program.argument('<url>', 'URL to be analyzed');
  program.option('--save', 'save JSON to a file');
  program.action(getMeta);

  program.parse();
}

const program = new Command();
main(program);
