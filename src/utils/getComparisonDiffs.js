const getComparisonDiffs = (a, b) => {
  return {
    diff: a - b,
    diffRel: (a / b - 1) * 100,
    diffTag: a > b ? 'higher' : a === b ? 'equal' : 'smaller'
  };
};

export default getComparisonDiffs;
