#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from './bin/gendiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });

program.parse();
