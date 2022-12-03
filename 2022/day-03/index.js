const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n");

const getPriority = (letter) => {
  if (letter.charCodeAt(0) < 123 && letter.charCodeAt(0) > 97) {
    return letter.charCodeAt(0) - 96;
  }
  return letter.charCodeAt(0) - 38;
};

const intersection = (arr1, arr2) => {
  const res = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      continue;
    }
    res.push(arr1[i]);
  }
  return res;
};

const intersectMany = (...arrs) => {
  let res = arrs[0].slice();
  for (let i = 1; i < arrs.length; i++) {
    res = intersection(res, arrs[i]);
  }
  return res;
};

const findTheeLinesSum = (items) => {
  let sum = 0;
  for (let i = 0; i < items.length; i += 3) {
    const letter = intersectMany(...items.slice(i, i + 3));
    sum += getPriority(letter[0]);
  }
  return sum;
};

const findSum = (items) => {
  const sum = items.reduce((acc, item) => {
    const first = item.slice(0, Math.floor(item.length / 2)).split("");
    const second = item
      .slice(Math.floor(item.length / 2), item.length)
      .split("");
    const inter = intersection(first, second);
    return acc + getPriority(inter[0]);
  }, 0);
  return sum;
};

const findResult = (result) => {
  const cleanData = prepareData(result);
  const sum = findSum(cleanData);
  const newSum = findTheeLinesSum(cleanData);
  console.log("1: ", sum, "2: ", newSum);
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
