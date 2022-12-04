const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n").map((line) => line.split(","));

const isIncluded = (first, second) =>
  (first[0] <= second[0] && first[1] >= second[1]) ||
  (second[0] <= first[0] && second[1] >= first[1]);

const isOverlap = (first, second) =>
  (first[0] >= second[0] && first[0] <= second[1]) ||
  (first[1] >= second[0] && first[1] <= second[1]) ||
  (second[0] >= first[0] && second[0] <= first[1]) ||
  (second[1] >= first[0] && second[1] <= first[1]);

const findIncludedPairs = (items) => {
  const res = items.reduce((acc, [first, second]) => {
    const firstNumb = first.split("-").map(Number);
    const secondNumb = second.split("-").map(Number);
    return acc + isIncluded(firstNumb, secondNumb);
  }, 0);
  return res;
};

const findOverlapPairs = (items) => {
  const res = items.reduce((acc, [first, second]) => {
    const firstNumb = first.split("-").map(Number);
    const secondNumb = second.split("-").map(Number);
    return acc + isOverlap(firstNumb, secondNumb);
  }, 0);
  return res;
};

const findResult = (result) => {
  const cleanData = prepareData(result);
  const res = findIncludedPairs(cleanData);
  const res2 = findOverlapPairs(cleanData);
  console.log("1: ", res, "2: ", res2);
};

const run = ({ file, findResult }) => {
  let promise = new Promise((resolve, reject) => {
    load(file)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });

  promise.then(findResult);
};

run({ file: "data.txt", findResult });
