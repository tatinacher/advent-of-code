const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n").map(line => {
  const [_, numbers] = line.split(": ");
  const [winning, have] = numbers.split("|");
  const arrWinning = winning.replace(/\s+/g, ' ').trim().split(" ").map(el => Number(el))
  const arrHave = have.replace(/\s+/g, ' ').trim().split(" ").map(el => Number(el))
  return [new Set(arrWinning), new Set(arrHave)]
});

const findInterSection = games => games.map(([winning, have]) => new Set([...winning].filter((x) => have.has(x))));

const calculatePoints = games => games.reduce((acc, game) => game.size ? 2 ** (game.size - 1) + acc : acc, 0);

const getGameSize = games => games.map((game) => game.size);

const getRepeats = gamesSize => {
  if (gamesSize[0] == 0){
    return 0;
  } 
  const copyArray = Array(gamesSize.length).fill(0);

  gamesSize.forEach((size, i) => {
    copyArray[i] += 1;

    if(copyArray[i] !== 0){
      Array(size).fill('').forEach((_,j) => copyArray[i+j+1] += copyArray[i])
    }
  });

  return copyArray;
}

const findResult = (result) => {
  const cleanData = prepareData(result);
  const intersection = findInterSection(cleanData);
  const sum = calculatePoints(intersection);
  console.log(" result: ", sum);
  //----
  const gamesSize = getGameSize(intersection);
  const repeats = getRepeats(gamesSize);
  const sumRepeats = repeats.reduce((acc, repeat) => repeat + acc, 0);
  console.log(" result 2: ",sumRepeats);

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
