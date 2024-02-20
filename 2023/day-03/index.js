const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n");


const getNumbers = lines => {
  const symbolIDs = [];
  for (const i in lines) {
    lines[i].split('').forEach((symbol, j) => {
      if (symbol.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/g)){
        console.log(symbol, i, j);
        symbolIDs.push([Number(i),j]);
      }
    });
  }
  return symbolIDs;
};

const getNumber = (lines, i, j) => {
  const str = lines[i];
  console.log(str, j, str.slice(0, j));
  const start = str.slice(0, j).split('').reverse().join();
  const end = str.slice(j);
  const startIndex = start.indexOf('.')
  const endIndex = end.indexOf('.')

  return Number(start.slice(0, startIndex) + end.slice(0, endIndex))
}

// const findNumbers = (lines, ids) => {
//   const numbers = [];
//   for (const [i, j] of ids) {
//     if (lines[i][j-1] !== '.'){
//       const number = getNumber(lines, i, j-1)
//       numbers.push(number)
//     }
//     if (lines[i][j+1] !== '.'){
//       const number = getNumber(lines, i, j+1)
//       numbers.push(number)
//     }
//     if (lines[i-1][j] !== '.') {
//       const number = getNumber(lines, i-1, j)
//       numbers.push(number)
//     } else {
//       if(lines[i-1][j-1] !== '.'){
//         const number = getNumber(lines, i-1, j-1)
//         numbers.push(number)
//       }
//       if(lines[i-1][j+1] !== '.'){
//         const number = getNumber(lines, i-1, j+1)
//         numbers.push(number)
//       }
//     } 

//     if (lines[i+1][j] !== '.') {
//       const number = getNumber(lines, i+1, j)
//       numbers.push(number)
//     } else {
//       if(lines[i+1][j-1] !== '.'){
//         const number = getNumber(lines, i+1, j-1)
//         numbers.push(number)
//       }
//       if(lines[i+1][j+1] !== '.'){
//         const number = getNumber(lines, i+1, j+1)
//         numbers.push(number)
//       }
//     }
//   }
//   return numbers;
// };

const findNumbers = (lines, symbolsIds) => {
  for (const line of lines) {
    for (const i in line){
      let symbol = line[i];
      
    }
  }
}


const findResult = (result) => {
  const lines = prepareData(result);
  const symbolsIds = getNumbers(lines);
  const numbers = findNumbers(lines, symbolsIds)
  console.log(" result: ", numbers);
};

const run = ({ file, findResult }) => {
  let promise = new Promise((resolve, reject) => {
    load(file)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });

  promise.then(findResult);
};

run({ file: "test.txt", findResult });
