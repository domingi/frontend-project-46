import yaml from 'js-yaml';

const parser = (data, type) => {
  switch (type) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Type ${type} not supported`);
  }
};

export default parser;
