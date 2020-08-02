import { fastSort, powSort } from "./fastSort";
import { randomIntFromRange } from "./helpers";

function clock(start?: any): any {
  if (!start) {
    return process.hrtime();
  }
  var end = process.hrtime(start);
  return Math.round(end[0] * 1000 + end[1] / 1000000);
}

describe("fastSort tests", () => {
  test("should sort 11 small numbers (<100)", () => {
    const SMALL_NUMBERS_SAMPLE_PROFILE = 10000;

    let smallNumbers: number[] = [];
    for (let x = 0; x < 11; x++) {
      smallNumbers.push(randomIntFromRange(0, 99));
    }

    console.log("Small numbers generated: ", smallNumbers);
    // fastSort(smallNumbers);
    var start = clock();
    // do some processing that takes time
    for (let x = 0; x < SMALL_NUMBERS_SAMPLE_PROFILE; x++) {
      fastSort(smallNumbers);
    }
    var duration = clock(start);

    const targetOperations = Math.pow(10, 10);

    console.log(
      "It will take ",
      ((targetOperations - SMALL_NUMBERS_SAMPLE_PROFILE) * duration) as number
    );
    console.log("Took " + duration + "ms");
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

    var start = clock();

    // do some processing that takes time
    for (let x = 0; x < TEST_SAMPLE_SIZE; x++) {
      powSort(randomPows);
    }
    var duration = clock(start);

    const targetOperations = Math.pow(10, 10);

    console.log(
      "It will take ",
      ((targetOperations - TEST_SAMPLE_SIZE) * duration) as number
    );
    console.log("Took " + duration + "ms");
  });
});
