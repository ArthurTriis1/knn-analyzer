const destructCSV = (csv: (string | number)[][]) => {
  csv.shift();

  const labels = csv.map((line) => line.pop()) as string[];

  return { data: csv as number[][], labels };
};

export { destructCSV };
