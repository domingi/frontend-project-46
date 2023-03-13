const getKey = (str) => {
  const [split] = str.split(':');
  if (split.includes('+') || str.includes('-')) return split.slice(2);
  return split;
};

const getValue = (str) => {
  const [, value] = str.split(':');
  const normalizeValue = value.trim();
  switch (normalizeValue) {
    case 'null':
      return null;
    case 'true':
      return true;
    case 'false':
      return false;
    case '[complex value]':
      return '[complex value]';
    default:
      return `'${normalizeValue}'`;
  }
};

const encreasePath = (path, str) => {
  if (path.length === 0) return getKey(str);
  return `${path}.${getKey(str)}`;
};

const decreasePath = (path) => {
  const arr = path.split('.');
  return arr
    .slice(0, arr.length - 1)
    .join('.');
};

const diffWithReplacedValues = (diff) => {
  const splitDiff = diff.split('\n');
  let counter = 0;
  let canAddStr = true;

  const result = splitDiff.reduce((acc, str) => {
    if (str.includes('{') && str.includes('+')) {
      const expression = `${str.slice(0, str.length - 2)} [complex value]`;
      acc.push(expression);
      canAddStr = false;
      counter += 1;
      return acc;
    }
    if (str.includes('{') && str.includes('-')) {
      const expression = `${str.slice(0, str.length - 2)} [complex value]`;
      acc.push(expression);
      canAddStr = false;
      counter += 1;
      return acc;
    }
    if (counter === 0) canAddStr = true;
    if (!canAddStr && str.includes('{')) counter += 1;
    if (!canAddStr && str.includes('}')) counter -= 1;

    if (canAddStr) acc.push(str);
    return acc;
  }, []);
  return result;
};

const formatterPlain = (diff) => {
  const normalizedDiff = diffWithReplacedValues(diff);

  let path = '';
  let wasUpdated = false;
  let lastValue;

  const result = normalizedDiff.reduce((acc, str, index) => {
    if (str.includes('{') && !str.includes('+') && !str.includes('-')) path = encreasePath(path, str);
    if (str.includes('}')) path = decreasePath(path);

    if (wasUpdated) {
      path = encreasePath(path, str);
      const expression = `Property '${path}' was updated. From ${lastValue} to ${getValue(str)}`;
      acc.push(expression);
      path = decreasePath(path);
      wasUpdated = false;
      return acc;
    }

    if (str.includes('+')) {
      path = encreasePath(path, str);
      const expression = `Property '${path}' was added with value: ${getValue(str)}`;
      acc.push(expression);
      path = decreasePath(path);
      return acc;
    }
    if (str.includes('-')) {
      if (getKey(str) === getKey(normalizedDiff[index + 1])) {
        wasUpdated = true;
        lastValue = getValue(str);
        return acc;
      }
      path = encreasePath(path, str);
      const expression = `Property '${path}' was removed`;
      acc.push(expression);
      path = decreasePath(path);
      return acc;
    }

    return acc;
  }, []);

  return result.join('\n');
};

export default formatterPlain;
