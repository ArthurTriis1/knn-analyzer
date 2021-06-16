import { calcDistance } from "../utils/distance";

export interface VoteCounts {
  [key: string]: number;
}

export interface Vote {
  index: number;
  distance: number;
  label: string;
}

export interface KnnResult {
  label: string;
  voteCounts: VoteCounts;
  votes: Vote[];
}

class KNN {
  k: number;
  data: number[][];
  labels: string[];

  constructor(k = 1, data: number[][], labels: string[]) {
    this.k = k;
    this.data = data;
    this.labels = labels;
  }

  private generateDistanceMap(point: number[]) {
    const map = [];

    let maxDistanceInMap;

    for (let index = 0, len = this.data.length; index < len; index++) {
      const otherPoint = this.data[index];

      const otherPointLabel = this.labels[index];

      const thisDistance = calcDistance(point, otherPoint);

      if (!maxDistanceInMap || thisDistance < maxDistanceInMap) {
        map.push({
          index,

          distance: thisDistance,

          label: otherPointLabel,
        });

        map.sort((a, b) => (a.distance < b.distance ? -1 : 1));
        if (map.length > this.k) {
          map.pop();
        }

        maxDistanceInMap = map[map.length - 1].distance;
      }
    }

    return map;
  }

  predict(point: number[]): KnnResult {
    const map = this.generateDistanceMap(point);

    const votes = map.slice(0, this.k);

    const voteCounts = votes.reduce(
      (obj, vote) =>
        Object.assign({}, obj, { [vote.label]: (obj[vote.label] || 0) + 1 }),
      {}
    );

    const sortedVotes = Object.keys(voteCounts)

      .map((label) => ({ label, count: voteCounts[label] }))

      .sort((a, b) => (a.count > b.count ? -1 : 1));

    return {
      label: sortedVotes[0].label,

      voteCounts,

      votes,
    };
  }
}
export default KNN;
