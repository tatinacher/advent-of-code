const { data } = require("./data");

const multipieTwoNumb = () => {
  const sum = 2020;
  data.sort();
  let mult = null;

  for (let i = 0; i < data.length; i++) {
    const first = data[i];
    const second = sum - first;
    const index = data.indexOf(second);
    if (index !== -1) {
      mult = first * second;
      break;
    }
  }
  return mult;
};

const multipieThreeNumb = () => {
  const sum = 2020;
  data.sort();
  let mult;

  for (let i = 0; i < data.length; i++) {
    const first = data[i];
    for (let j = 0; j < data.length; j++) {
      const second = data[j];
      const third = sum - first - second;
      const index = data.indexOf(third);
      if (index !== -1) {
        mult = first * second * third;
        break;
      }
    }
    if (mult) {
      break;
    }
  }

  return mult;
};

console.log(multipieTwoNumb());
console.log(multipieThreeNumb());
