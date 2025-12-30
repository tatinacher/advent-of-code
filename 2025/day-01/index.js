const { load } = require("../../utils/file");

const sliceText = (res) =>
  res.split("\n").map(el => [el[0], Number(el.slice(1))]);

const computeZeroCount = (listOfRotations, start = 50, base = 100) => {
  let pos = start;
  let zeroCount = 0;

  for (const [dir, n] of listOfRotations) {
    const delta = (String(dir).toUpperCase() === "R") ? Number(n) : -Number(n);
    pos = ((pos + delta) % base + base) % base;
    if (pos === 0) zeroCount += 1;
  }

  return zeroCount;
};

const computeZeroPassCount = (listOfRotations, start = 50, base = 100) => {
  let pos = start;
  let passCount = 0;
  const positions = [];

  for (const [dir, n] of listOfRotations) {
    const steps = Math.abs(Number(n));
    const isR = String(dir).toUpperCase() === "R";

    // minimal step t0 until first hit of 0 (t counted from 1)
    let t0;
    if (isR) {
      t0 = (base - (pos % base)) % base;
      if (t0 === 0) t0 = base;
    } else {
      t0 = pos % base;
      if (t0 === 0) t0 = base;
    }

    if (steps >= t0) {
      passCount += 1 + Math.floor((steps - t0) / base);
    }

    const delta = isR ? steps : -steps;
    pos = ((pos + delta) % base + base) % base;
    positions.push(pos);
  }

  return { final: pos, passCount, positions };
};

const findResult = (result) => {
  const listOfRotations = sliceText(result);
  const landedZeros = computeZeroCount(listOfRotations, 50, 100);
  const passInfo = computeZeroPassCount(listOfRotations, 50, 100);
  console.log("zeros landed on:", landedZeros);
  console.log("zeros passed through:", passInfo.passCount);
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


