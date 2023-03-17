import _ from 'lodash';

const stylish = (diff, replacerSymbol = ' ') => {
  const stylizedDiff = `{\n${diff}\n}`;
  let depth = 0;
  let leftShift;
  const splitStr = stylizedDiff.split('\n');

  const result = splitStr.reduce((acc, str) => {
    if (str.includes('-') || str.includes('+')) leftShift = 2;
    if (str.includes('}')) depth -= 1;
    const replacer = _.repeat(replacerSymbol, depth * 4 - leftShift);
    acc.push(`${replacer}${str.trimEnd()}`);
    if (str.includes('{')) depth += 1;
    leftShift = 0;
    return acc;
  }, []);

  return result.join('\n');
};

const stylishPlainDiff = (formattedDiff) => formattedDiff
  .flatMap((str) => _.replace(str, 'object Object', 'complex value'))
  .join('\n');

export {
  stylish,
  stylishPlainDiff,
};
