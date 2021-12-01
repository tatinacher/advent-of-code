const { data } = require("./data");

const numberOfIncreases = () => {
  let acc = 0;
  data.reduce((previousValue, currentValue) => {
    if (currentValue > previousValue) {
      acc += 1;
    }
    return currentValue;
  }, data[0]);

  return acc;
};

const numberOfSlideIncreases = () => {
  let acc = 0;
  let previousSum = data[0] + data[1] + data[2];

  for (let i = 1; i < data.length - 2; i++) {
    const sum = data[i] + data[i + 1] + data[i + 2];
    if (sum > previousSum) {
      acc += 1;
    }
    previousSum = sum;
  }

  return acc;
};

console.log(numberOfIncreases());
console.log(numberOfSlideIncreases());
