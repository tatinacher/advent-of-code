const { load } = require("../../utils/file");

const sliceText = (res) =>
  res.split("\n").map((el) => el.split(" ").map(num => parseInt(num)));

const range = [1, 3]

const checkLine = (line) => {
  const isInc = line.every((el, i) => i === 0 || el > line[i - 1]);
  const isDec = line.every((el, i) => i === 0 || el < line[i - 1]);

  const isInRange = line.every((el, i) => i === 0 || Math.abs(el - line[i - 1]) >= range[0] && Math.abs(el - line[i - 1]) <= range[1])
  return (isInc || isDec) && isInRange;
}

const checkLineAgainWithRemove = (line) => {
  for (let i = 0; i < line.length; i++) {
    const newLine = [...line];
    newLine.splice(i, 1);
    const isSafe = checkLine(newLine);
    if (isSafe) {
      return true;
    }
  }
  return false;
}

const checkRows = (reports) => {
  const isSafeRows = reports.map(line => {
    const isSafe = checkLine(line);
    return isSafe;
  });
  return isSafeRows;
}


const checkRowsWithRemove = (reports) => {
  const isSafeRows = reports.map(line => {
    let isSafe = checkLine(line);
    if (!isSafe) {
      isSafe = checkLineAgainWithRemove(line);
    }
    return isSafe;
  });
  return isSafeRows;
}

const countSafeRows = (safeRows) =>
  safeRows.reduce((acc, val) => {
    const el = val ? 1 : 0;
    return acc + el;
  }, 0);


const findResult = (result) => {
  const listOfReports = sliceText(result);
  const safeRows = checkRows(listOfReports);
  const countOfSafe = countSafeRows(safeRows);

  const safeElRows = checkRowsWithRemove(listOfReports);
  const safeWithRemove = countSafeRows(safeElRows)
  console.log("1: ", countOfSafe, "2: ", safeWithRemove);
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


