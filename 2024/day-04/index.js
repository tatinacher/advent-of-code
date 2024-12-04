const { load } = require("../../utils/file");

const sliceText = (res) => res.split("\n").map(el => el.split(""));

const WORD_LENGTH = 4;
const MAS_LENGTH = 3;

const checkXmas = (list, row, col) => {
  let forwardHoriz = 0, backwardHoriz = 0, forwardVertical = 0, backwardVertical = 0, fHfVDiagonal = 0, bHbVDiagonal = 0, fHbVDiagonal = 0, bHfVDiagonal = 0;
  const ROW_LENGTH = list[row].length;
  const COLUMN_LENGTH = list.length;

  //is xmas forward horizonral
  if (COLUMN_LENGTH - col >= WORD_LENGTH) {
    if ((list[row][col + 1] === 'M') && (list[row][col + 2] === 'A') && (list[row][col + 3] === 'S')) {
      forwardHoriz = 1
    }
  }

  //is xmas backward horizonral 
  if (col + 1 >= WORD_LENGTH) {
    if ((list[row][col - 1] === 'M') && (list[row][col - 2] === 'A') && (list[row][col - 3] === 'S')) {
      backwardHoriz = 1
    }
  }
  //is xmas forward vertical 
  if (ROW_LENGTH - row >= WORD_LENGTH) {
    if ((list[row + 1][col] === 'M') && (list[row + 2][col] === 'A') && (list[row + 3][col] === 'S')) {
      forwardVertical = 1
    }
  }

  //is xmas backward vertical 
  if (row + 1 >= WORD_LENGTH) {
    if ((list[row - 1][col] === 'M') && (list[row - 2][col] === 'A') && (list[row - 3][col] === 'S')) {
      backwardVertical = 1
    }
  }

  //is xmas forward horiz forward vert
  if (ROW_LENGTH - row >= WORD_LENGTH && COLUMN_LENGTH - col >= WORD_LENGTH) {
    if ((list[row + 1][col + 1] === 'M') && (list[row + 2][col + 2] === 'A') && (list[row + 3][col + 3] === 'S')) {
      fHfVDiagonal = 1
    }
  }

  //is xmas backward horiz back vert 
  if (row + 1 >= WORD_LENGTH && col + 1 >= WORD_LENGTH) {
    if ((list[row - 1][col - 1] === 'M') && (list[row - 2][col - 2] === 'A') && (list[row - 3][col - 3] === 'S')) {
      bHbVDiagonal = 1
    }
  }

  //is xmas forward horiz backward vert
  if (row + 1 >= WORD_LENGTH && COLUMN_LENGTH - col >= WORD_LENGTH) {
    if ((list[row - 1][col + 1] === 'M') && (list[row - 2][col + 2] === 'A') && (list[row - 3][col + 3] === 'S')) {
      fHbVDiagonal = 1
    }
  }

  //is xmas backward horiz forward vert 
  if (ROW_LENGTH - row >= WORD_LENGTH && col + 1 >= WORD_LENGTH) {
    if ((list[row + 1][col - 1] === 'M') && (list[row + 2][col - 2] === 'A') && (list[row + 3][col - 3] === 'S')) {
      bHfVDiagonal = 1
    }
  }

  return forwardHoriz + backwardHoriz + forwardVertical + backwardVertical + fHfVDiagonal + bHbVDiagonal + bHfVDiagonal + fHbVDiagonal;
}


const getSumOfXmas = (list) => {
  let sum = 0;

  for (let row = 0; row < list.length; row++) {
    for (let col = 0; col < list[row].length; col++) {
      //check if has xmas
      if (list[row][col] === 'X') {
        const xmasTimes = checkXmas(list, row, col);
        sum += xmasTimes;
      }
    }
  }
  return sum;
}

const getXmasIndex = (list, row, col) => {
  const ROW_LENGTH = list[row].length;
  const COLUMN_LENGTH = list.length;
  const indexes = [];

  //right up
  if (row + 1 >= MAS_LENGTH && COLUMN_LENGTH - col >= MAS_LENGTH) {
    if ((list[row - 1][col + 1] === 'A' && list[row - 2][col + 2] === 'S')
      && ((list[row - 2][col] === 'M' && list[row][col + 2] == 'S')
        || (list[row][col + 2] == 'M' && list[row - 2][col] == 'S'))) {
      indexes.push([row - 2, col]);
    }
  }

  //right down
  if (ROW_LENGTH - row >= MAS_LENGTH && COLUMN_LENGTH - col >= MAS_LENGTH) {
    if ((list[row + 1][col + 1] === 'A' && list[row + 2][col + 2] === 'S')
      && ((list[row + 2][col] === 'M' && list[row][col + 2] == 'S')
        || (list[row][col + 2] == 'M' && list[row + 2][col] == 'S'))) {
      indexes.push([row, col]);
    }
  }

  //left up
  if (row + 1 >= MAS_LENGTH && col + 1 >= MAS_LENGTH) {
    if ((list[row - 1][col - 1] === 'A' && list[row - 2][col - 2] === 'S')
      && ((list[row - 2][col] === 'M' && list[row][col - 2] == 'S')
        || (list[row][col - 2] == 'M' && list[row - 2][col] == 'S'))) {
      indexes.push([row - 2, col - 2]);
    }
  }

  //left down
  if (ROW_LENGTH - row >= MAS_LENGTH && col + 1 >= MAS_LENGTH) {
    if ((list[row + 1][col - 1] === 'A' && list[row + 2][col - 2] === 'S')
      && ((list[row + 2][col] === 'M' && list[row][col - 2] == 'S')
        || (list[row][col - 2] == 'M' && list[row + 2][col] == 'S'))) {
    }
  }

  return indexes
}


const getSumOfMas = (list) => {
  const xmasList = [];
  for (let row = 0; row < list.length; row++) {
    for (let col = 0; col < list.length; col++) {
      if (list[row][col] === 'M') {
        const xmasIndexes = getXmasIndex(list, row, col);
        xmasList.push(...xmasIndexes)
      }
    }
  }

  const setList = Array.from(new Set(xmasList.map(JSON.stringify)), JSON.parse)

  return setList.length
}

const findResult = (result) => {
  const list = sliceText(result);

  const sum = getSumOfXmas(list);
  const sum2 = getSumOfMas(list);

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


