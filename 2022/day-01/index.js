const { load } = require("../../utils/file");

const findMax = (elfsFood) => {
  let maxCalory = 0;
  elfsFood.map((elfFood) => {
    const elfSumCalory = elfFood.reduce((acc, calory) => acc + calory, 0);
    if (elfSumCalory > maxCalory) {
      maxCalory = elfSumCalory;
    }
  });
  return maxCalory;
};

const findThreeMax = (elfsFood) => {
  let elfSumCalories = [];
  elfsFood.map((elfFood) => {
    const elfSumCalory = elfFood.reduce((acc, calory) => acc + calory, 0);
    elfSumCalories.push(elfSumCalory);
  });
  elfSumCalories.sort((a, b) => b - a);
  const result = elfSumCalories
    .slice(0, 3)
    .reduce((acc, calory) => acc + calory, 0);
  return result;
};

const prepareData = (res) =>
  res.split("\n\n").map((el) => el.split("\n").map(Number));

const findResult = (result) => {
  const cleanData = prepareData(result);
  const maxSum = findMax(cleanData);
  const maxSumThree = findThreeMax(cleanData);
  console.log("1: ", maxSum, "2: ", maxSumThree);
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
