const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n");

const FIRST_LENGTH = 4;
const SECOND_LENGTH = 14;

const find = (data, length) => {
  data.map((line) => {
    for (let i = 0; i < line.length; i++) {
      const el = line.slice(i, i + length);
      const setEl = new Set(el.split(""));
      if (setEl.size === length) {
        console.log("length", length, ": ", i + length);
        break;
      }
    }
  });
};

const findResult = (result) => {
  const cleanData = prepareData(result);
  find(cleanData, FIRST_LENGTH);
  find(cleanData, SECOND_LENGTH);
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
