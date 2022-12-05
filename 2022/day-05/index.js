const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n\n");

const ROWS = 9;

const prepateMovements = (movements) => {
  const arr = movements.split("\n");
  const res = arr.map((movement) => {
    const [_, size, __, from, ___, to] = movement.split(" ").map(Number);
    return { size, from, to };
  });
  return res;
};

const getMatrix = (cranesStacks) => {
  console.log(cranesStacks);
  const cranesStacksArr = cranesStacks.split("\n");
  const lastline = cranesStacksArr.pop();

  const stacksNumber = lastline
    .replace(/\s{2,}/g, " ")
    .trim()
    .split(" ");

  if (stacksNumber >= 10) {
    return [];
  }

  const matrix = Array(ROWS).fill([]);
  matrix.forEach((_, i) => {
    matrix[i] = [];
  });

  for (let i = cranesStacksArr.length - 1; i >= 0; i--) {
    const line = cranesStacksArr[i];
    let k = 0;
    for (let j = 0; j < line.length; j += 4) {
      const letter = line
        .slice(j, j + 3)
        .replace(/[\[\]']+/g, "")
        .trim();
      if (letter) {
        console.log(matrix[k]);
        matrix[k].push(letter);
      }
      k += 1;
    }
  }
  return matrix;
};

const moveStack = (stack, { size, from, to }, kk) => {
  const rearrangedStack = [...stack];

  for (let i = 0; i < size; i++) {
    const lastItem = rearrangedStack[from - 1].pop();
    rearrangedStack[to - 1].push(lastItem);
  }
  return rearrangedStack;
};

const moveStackAll = (stack, { size, from, to }, kk) => {
  const rearrangedStack = [...stack];
  const block = [];

  for (let i = 0; i < size; i++) {
    const lastItem = rearrangedStack[from - 1].pop();
    block.unshift(lastItem);
  }
  rearrangedStack[to - 1].push(...block);

  return rearrangedStack;
};

const doMovements = (stack, movements) => {
  const movementsArr = prepateMovements(movements);
  const newStack = [...stack];
  movementsArr.forEach((movement, i) => {
    moveStack(newStack, movement, i);
  });
  return newStack;
};

const doMovements2 = (stack, movements) => {
  const movementsArr = prepateMovements(movements);
  const newStack = [...stack];
  movementsArr.forEach((movement, i) => {
    moveStackAll(newStack, movement, i);
  });
  return newStack;
};

const getRes = (results) =>
  results.reduce((acc, item) => acc + item[item.length - 1], "");

const findResult = (result) => {
  const [cranesStacks, movement] = prepareData(result);
  const craneArrangementMatrix = getMatrix(cranesStacks);

  if (!craneArrangementMatrix?.length) {
    console.log("no result");
    return;
  }

  const results = doMovements(craneArrangementMatrix, movement);
  const results2 = doMovements2(craneArrangementMatrix, movement);

  const lastItems = getRes(results);
  const lastItems2 = getRes(results2);

  console.log("1: \n", lastItems, "2: ", lastItems2);
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
