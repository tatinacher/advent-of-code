const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n");

const findResult = (result) => {
  const cleanData = prepareData(result);
  console.log(" result: ", cleanData);
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
