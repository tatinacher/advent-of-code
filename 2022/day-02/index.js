const { load } = require("../../utils/file");

const ABC_DIFF = 64;
const XYZ_DIFF = 87;

const prepareData = (res) =>
  res
    .split("\n")
    .map((el) => el.split(" "))
    .map((el) => [
      el[0].charCodeAt(0) - ABC_DIFF,
      el[1].charCodeAt(0) - XYZ_DIFF,
    ]);

const getRes = (game) => {
  const diff = game[1] - game[0];
  if (diff === -1 || diff === 2) return game[1];
  if (diff === 0) return 3 + game[1];
  return 6 + game[1];
};

const firstRound = (strategy) =>
  strategy.reduce((acc, game) => acc + getRes(game), 0);

const neededRes = {
  1: (game) => (game - 1 < 1 ? 3 : game - 1),
  2: (game) => game,
  3: (game) => (game + 1 > 3 ? 1 : game + 1),
};

const secondRound = (round) => {
  const res = round.reduce((acc, game) => {
    console.log(game[1], neededRes[game[1]](game[0]));
    return acc + getRes([game[0], neededRes[game[1]](game[0])]);
  }, 0);
  return res;
};

const findResult = (result) => {
  const cleanData = prepareData(result);
  const firstRes = firstRound(cleanData);
  const secondRes = secondRound(cleanData);
  console.log("first result: ", firstRes, " second result:", secondRes);
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
