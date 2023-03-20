import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parser = (filepath, type) => {
  switch (type) {
    case '.json':
      return JSON.parse(readFileSync(filepath));
    case '.yaml':
      return yaml.load(readFileSync(filepath));
    case '.yml':
      return yaml.load(readFileSync(filepath));
    default:
      return console.log(`Type ${type} not supported`);
  }
};

export default parser;
