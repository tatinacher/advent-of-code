const { load } = require("../../utils/file");

const getLists = (list) => {
  const lists = [];
  for (let i = 0; i < list[0].length; i++) {
    const col = list.map(el => el[i]);
    lists.push(col);
  }
  return lists;
}

const sortLists = (lists) => {
  const sortedLists = lists.map(list => list.sort());
  return sortedLists;
}

const getDistance = (lists) => {
  let distance = 0;
  console.log(lists);
  for (let i = 0; i < lists[0].length; i++) {
    let diff = Math.abs(lists[1][i] - lists[0][i]);
    distance += diff;
  }
  return distance;
}

const getRepeatedValues = (list) => {
  const counts = {};
  list.forEach((element) => { counts[element] = (counts[element] || 0) + 1; });
  return counts;
}

const getSimilarity = (list, repeated) => {
  const similarity = list.reduce((accumulator, el) => { return accumulator + (el * (repeated[el] || 0)) }, 0);
  return similarity;
}

const sliceText = (res) =>
  res.split("\n").map((el) => el.split("   ").map(num => parseInt(num)));

const findResult = (result) => {
  const listOfDistances = sliceText(result);
  const lists = getLists(listOfDistances);
  const sorted = sortLists(lists);
  const distance = getDistance(sorted);
  const repeated = getRepeatedValues(sorted[1]);
  const similarity = getSimilarity(sorted[0], repeated)
  console.log("1: ", distance, '2: ', similarity);
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


