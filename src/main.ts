import KNN from "./models/KNN";
import KnnTester from "./models/KnnTester";
import { destructCSV } from "./utils/destructCSV";
import { readCsv } from "./utils/readCsv";

(async () => {
  const diabetesDatabase = await readCsv("DiabetesDatabase.csv");
  const diabetesTest = await readCsv("DiabetesTeste.csv");

  const database = destructCSV(diabetesDatabase);
  const test = destructCSV(diabetesTest);

  const Knn = new KNN(7, database.data, database.labels);

  const KnnTest = new KnnTester({
    Knn,
    data: test.data,
    labels: test.labels,
    trueClass: "tested_positive",
  });

  KnnTest.test();

  console.log(KnnTest.result());
})();
