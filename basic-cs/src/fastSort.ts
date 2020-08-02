export const fastSort = (numbers: number[]): number[] => {
  return numbers.sort((a: number, b: number) => a - b);
};

export const powSort = (numbers: number[][]): number[][] => {
  return numbers.sort((a: number[], b: number[]) => {
    const resultA = Math.pow(a[0], a[1]);
    const resultB = Math.pow(b[0], b[1]);

    return resultA - resultB;
  });
};
