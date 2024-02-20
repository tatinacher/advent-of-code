const { load } = require("../../utils/file");

const numberPattern = /(one|two|three|four|five|six|seven|eight|nine|\d+)/i;
const numberPatternEnd = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d+)/i;
const digitPattern = /\d+/g;

const numbers = 'one|two|three|four|five|six|seven|eight|nine';
const digits = '\d+'

const reverseString = str => str.split("").reverse().join("");

const DICT = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}


const getNumbersFromLines2 = (lines) => [...lines].map(line => {
    const start = line.match(numberPattern)[0];
    const end = reverseString(reverseString(line).match(numberPatternEnd)[0]);

    const nums = Number(start) ? String(start)[0] : DICT[start];
    const nume = Number(end) ? String(end)[end.length - 1] : DICT[end];

    return Number(String(nums) + String(nume))
  });


const getNumbersFromLines = (lines) => lines.map(line => line.match(digitPattern).join('')).map(line => line[0] + line[line.length - 1]);

const findSum = (numbers) => numbers.reduce((acc, current) => acc + Number(current), 0);

const sliceText = (res) =>
  res.split("\n\n").map((el) => el.split("\n"))[0];

const findResult = (result) => {
  const arrayOfLines = sliceText(result);
  // const numbers = getNumbersFromLines(arrayOfLines);
  const sum2 = getNumbersFromLines2(arrayOfLines);
  const sum = findSum(sum2)
  console.log("1: ", sum, "2: ", 'todo');
};

const run = ({ file, findResult }) => {
  let promise = new Promise((resolve, reject) => {
    load(file)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });

  promise.then(findResult);
};

run({ file: "test2.txt", findResult });


