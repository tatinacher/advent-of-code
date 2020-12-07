fs = require("fs");

const calc = (array, index, start, end) => {
  if (end - start <= 1) {
    return array[index] === "F" || array[index] === "L" ? start : end;
  }

  return array[index] === "F" || array[index] === "L"
    ? calc(array, index + 1, start, start + Math.ceil((end - start - 1) / 2))
    : calc(array, index + 1, start + Math.ceil((end - start) / 2), end);
};

const getIds = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const boardingPasses = data.split("\n");
  const arrayofPasses = [];

  boardingPasses.map(pass => {
    const passArr = pass.split("");
    const row = passArr.slice(0, 7);
    const column = passArr.slice(7, 10);
    const rowNumber = calc(row, 0, 0, 127);
    const columnNumber = calc(column, 0, 0, 7);
    const id = rowNumber * 8 + columnNumber;

    arrayofPasses.push(id);
  });

  return arrayofPasses.sort((a, b) => a - b);
};

const findMaxID = () => {
  const ids = getIds();
  return ids[ids.length - 1];
};

const findMyPass = () => {
  const ids = getIds();

  for (let index = ids[0]; index < ids[ids.length - 1]; index++) {
    if (ids.indexOf(index) === -1) {
      return ids[index];
    }
  }
};

console.log(findMaxID());
console.log(findMyPass());
