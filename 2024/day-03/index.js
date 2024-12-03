const { load } = require("../../utils/file");

const regex = /mul\(\d{1,3},\d{1,3}\)/gm;
const regex2 = /do\(\)|(don't\(\))|mul\(\d{1,3},\d{1,3}\)/gm;
const DO = "do()";
const DONT = "don't()";

const sliceText = (res) => res;

const splitList = (list) => {
  const splited = list.map(el => {
    if (el === DO || el === DONT) {
      return { operation: el };
    } else {
      const [operation, numbers] = el.split("(");
      const [first, second] = numbers.split(',');

      return ({ operation, first: parseInt(first), second: parseInt(second.slice(0, -1)) })
    }
  });
  return splited;
}

const calculateSum = (list) => {
  let isEnabled = true;
  const sum = list.reduce((acc, element) => {
    if (element.operation === DO || element.operation === DONT) {
      isEnabled = element.operation === DO ? true : false
    }
    if (!isEnabled) {
      return acc;
    }

    let value = 0;
    if (element.operation == 'mul') {
      value = element.first * element.second
    }
    return acc + value;
  }, 0);
  return sum;
}

const findResult = (result) => {
  const listOfReports = sliceText(result);
  const list = [...listOfReports.match(regex)];
  const splited = splitList(list);
  const sum = calculateSum(splited);
  const list2 = [...listOfReports.match(regex2)];
  const splited2 = splitList(list2);
  const sum2 = calculateSum(splited2);

  console.log('1: ', sum, '2: ', sum2)
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


