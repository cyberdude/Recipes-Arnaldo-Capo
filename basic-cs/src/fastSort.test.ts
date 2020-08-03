import { fastSort, powSort } from "./fastSort";
import { randomIntFromRange } from "./helpers";
import moment from "moment";

const clock = (start?: any): any => {
  if (!start) {
    return process.hrtime();
  }
  var end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1000000);
};

const getEstimatedRunTimeInWeeks = (
  targetOperations: number,
  sampleSize: number,
  duration: number
): number => (targetOperations - sampleSize) * duration;

describe("fastSort tests", () => {
  test("should sort 11 small numbers (<100)", () => {
    const SMALL_NUMBERS_SAMPLE_PROFILE = 10000;

    let smallNumbers: number[] = [];
    for (let x = 0; x < 11; x++) {
      smallNumbers.push(randomIntFromRange(0, 99));
    }

    console.log("Small numbers generated: ", smallNumbers);

    const start = clock();

    for (let x = 0; x < SMALL_NUMBERS_SAMPLE_PROFILE; x++) {
      fastSort(smallNumbers);
    }
    const duration = clock(start);

    const targetOperations = Math.pow(10, 10);

    const estimatedDuration = getEstimatedRunTimeInWeeks(
      targetOperations,
      SMALL_NUMBERS_SAMPLE_PROFILE,
      duration
    );

    var diff = moment.duration(estimatedDuration);

    console.log(
      `It will take ${diff.asYears()} years to complete ${targetOperations} operations.`
    );
  });

  test("it should sort 10000 random pows", () => {
    const POW_SAMPLE_SIZE = 10000;
    const TEST_SAMPLE_SIZE = 100;

    let randomPows = [];

    for (let x = 0; x < POW_SAMPLE_SIZE; x++) {
      randomPows.push([
        randomIntFromRange(100, 10000),
        randomIntFromRange(100, 10000),
      ]);
    }

    const start = clock();
    for (let x = 0; x < TEST_SAMPLE_SIZE; x++) {
      powSort(randomPows);
    }
    const duration = clock(start);

    const targetOperations = POW_SAMPLE_SIZE;

    const estimatedDuration = getEstimatedRunTimeInWeeks(
      targetOperations,
      TEST_SAMPLE_SIZE,
      duration
    );
    var diff = moment.duration(estimatedDuration);

    console.log(
      "Sorting pows",
      `It will take ${diff.asHours()} hours to complete ${targetOperations} operations.`
    );
  });
});
