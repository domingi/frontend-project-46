#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'the path to original file')
    .argument('<filepath2>', 'the path to file to compare');

program.parse();


