import KNN from "./KNN";

export type KnnTesterPropeties = {
  Knn: KNN;
  data: number[][];
  labels: string[];
  trueClass: string;
};

class KnnTester {
  Knn: KNN;
  data: number[][];
  labels: string[];
  trueClass: string;

  asserts = 0;
  errors = 0;

  truePositives = 0;
  trueNegatives = 0;
  fakePositives = 0;
  fakeNegatives = 0;
  countPositiveClass: number;
  countNegativeClass: number;

  constructor({ Knn, data, labels, trueClass }: KnnTesterPropeties) {
    this.Knn = Knn;
    this.data = data;
    this.labels = labels;
    this.trueClass = trueClass;

    this.countPositiveClass = labels.filter(
      (label) => label === trueClass
    ).length;
    this.countNegativeClass = labels.length - this.countPositiveClass;
  }

  test() {
    this.data.forEach((line, index) => {
      const result = this.Knn.predict(line);
      const prediction = this.labels[index];

      if (result.label === prediction) {
        this.asserts++;

        if (result.label === this.trueClass) {
          this.truePositives++;
        } else {
          this.trueNegatives++;
        }
      } else {
        this.errors++;
        if (result.label === this.trueClass) {
          this.fakePositives++;
        } else {
          this.fakeNegatives++;
        }
      }
    });
  }

  result() {
    return {
      asserts: this.asserts,
      errors: this.errors,
      confusion: {
        truePositives: this.truePositives,
        trueNegatives: this.trueNegatives,
        fakePositives: this.fakePositives,
        fakeNegatives: this.fakeNegatives,
      },
    };
  }
}

export default KnnTester;
