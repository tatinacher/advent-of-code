const { load } = require("../../utils/file");

const sliceText = (res) => {
  const [first, second] = res.split("\n\n");
  const pageOrderingRules = first.split("\n");
  const pagesToProduceUpdate = second.split("\n").map(el => el.split(',').map(num => parseInt(num)))
  return [pageOrderingRules, pagesToProduceUpdate]
};


const findIfCorrect = (pageToProduceUpdate, pageOrderingRules) => {
  for (let i = 0; i < pageToProduceUpdate.length - 1; i++) {
    const left = pageToProduceUpdate[i];
    for (let j = i + 1; j < pageToProduceUpdate.length; j++) {
      const right = pageToProduceUpdate[j];
      const isIncludes = pageOrderingRules.includes(`${left}|${right}`);
      if (!isIncludes) {
        return false
      }
    }
  }
  return true;
}

const getSumOfMiddleElement = (array) =>
  array.reduce((acc, line) => {
    const middleIndex = Math.floor(line.length / 2);
    return acc + line[middleIndex];
  }, 0);


const fixLine = (line, pageOrderingRules) => {
  const newLine = [...line];
  for (let i = 0; i < newLine.length - 1; i++) {
    const left = newLine[i];
    for (let j = i + 1; j < newLine.length; j++) {
      const right = newLine[j];
      const isIncludes = pageOrderingRules.includes(`${left}|${right}`);
      if (!isIncludes) {
        const first = newLine[i];
        newLine[i] = newLine[j];
        newLine[j] = first;
        i -= 1;
        break;
      }
    }
  }
  return newLine;
}


const findResult = (result) => {
  const [pageOrderingRules, pagesToProduceUpdate] = sliceText(result);
  const incorrectIndexes = [];

  for (let i = 0; i < pagesToProduceUpdate.length; i++) {
    const line = pagesToProduceUpdate[i];
    const isCorrect = findIfCorrect(line, pageOrderingRules);

    if (!isCorrect) {
      incorrectIndexes.push(i)
    }
  }

  const correctLines = pagesToProduceUpdate.filter((_, index) => !incorrectIndexes.includes(index));
  const incorrectLines = pagesToProduceUpdate.filter((_, index) => incorrectIndexes.includes(index));
  const sum = getSumOfMiddleElement(correctLines);

  const fixedArray = [];

  for (let i = 0; i < incorrectLines.length; i++) {
    const line = incorrectLines[i];
    const fixedLine = fixLine(line, pageOrderingRules);
    fixedArray.push(fixedLine);
  }

  const sumFixed = getSumOfMiddleElement(fixedArray);


  console.log('1: ', sum, ' 2:', sumFixed);
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


