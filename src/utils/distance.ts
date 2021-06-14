/**
 *
 * @param baseValues
 * @param compareValues
 */
const calcDistance = (
  initBaseValues: number[],
  initCompareValues: number[]
): number => {
  const baseValues = initBaseValues;
  const compareValues = initCompareValues;

  const mappedBaseValues = baseValues.map(
    (aPoint, i) => compareValues[i] - aPoint
  );

  const reducedBaseValues = mappedBaseValues.reduce(
    (sumOfSquares, diff) => sumOfSquares + diff * diff,
    0
  );

  return Math.sqrt(reducedBaseValues);
};

export { calcDistance };
