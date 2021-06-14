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
        // Only add an item if it's closer than the farthest of the candidates

        map.push({
          index,

          distance: thisDistance,

          label: otherPointLabel,
        }); // Sort the map so the closest is first

        map.sort((a, b) => (a.distance < b.distance ? -1 : 1)); // If the map became too long, drop the farthest item

        if (map.length > this.k) {
          map.pop();
        } // Update this value for the next comparison

        maxDistanceInMap = map[map.length - 1].distance;
      }
    }

    return map;
  }

  predict(point: number[]): KnnResult {
    const map = this.generateDistanceMap(point);

    const votes = map.slice(0, this.k);

    const voteCounts = votes

      // Reduces into an object like {label: voteCount}

      .reduce(
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
