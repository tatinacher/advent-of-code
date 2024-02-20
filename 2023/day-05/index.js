const { load } = require("../../utils/file");

const prepareData = (res) => res.split("\n\n").map(el => el.split("\n"));

const getMap = (lines) => {
  const arrMap = [];
  const [_, seeds] = lines.shift()[0].split(": ");
  const arrSeeds = seeds.split(" ").map(Number)
  lines.forEach((line, i) => {
    line.shift();
    const arr = line.map(el => el.split(" ").map(Number))
    arrMap[i] = arr;
  });

  return [arrSeeds, arrMap];
}

const findNumb = (numb, seedMaps, i=0, result) => {
  const seedMap = [...seedMaps];
  let found = false;
  if (seedMap.length === 0){
    result.push(numb);
    // console.log('result', result, i);
    return numb;
  } else {
    const oneMap = seedMap.shift();
    let nextNumber = numb;

    oneMap.forEach(([destination, source, length]) => {
      if((numb <= source + length) && (source <= numb)){
        nextNumber =  (destination - source) + numb;
        // console.log(0, nextNumber, [destination, source, length]);
        found = true;
        return findNumb(nextNumber, seedMap, i+1, result);
      }
    });
    // console.log(1, nextNumber);
    if (!found){
      return findNumb(numb, seedMap, i+1, result);
    }
  }
}

const getLocations = (seeds, mapOfSeed) => 
  seeds.map(seed => {
    const res = [];
    console.log('findNumb', seed);
    findNumb(seed, mapOfSeed, 0, res);
    const lowest = findLowest(res);
    return lowest;
  });


const findLowest = (arr) => Math.min(...arr);

const getSeedsRange = (seeds) => {
  console.log('getSeedsRange');

  const arrOfSeeds = seeds.map((seed, i) => {
    if (i % 2 === 0){
      console.log(seed, i);
      return Array(seeds[i+1]).map((el, i) => seed+i)
    }
    return [];
  });
  console.log('getSeedsRange');

  const filtered = arrOfSeeds.filter(mass => mass.length > 0)
  const res = [];
  
  filtered.forEach((arr) => res.push(...arr));

  console.log('getSeedsRange');
  return res;
} 

const getAllLocations = map => {
  const res = map.pop();
  console.log(res);
}

const findResult = (result) => {
  const lines = prepareData(result);
  const [seeds, mapOfSeed] = getMap(lines);
  // const locations = getLocations(seeds, mapOfSeed);
  // console.log(locations);
  // const lowestLocation = findLowest(locations);
  // console.log(" result: ", lowestLocation);

  //----
  const locations = getAllLocations(mapOfSeed);
  console.log(locations);

  // const seedsRange = getSeedsRaxnge(seeds);
  
  // console.log(seedsRange);
  // const locationsSeedsRange = getLocations(seedsRange, mapOfSeed);
  const lowestLocationSeed = findLowest(locationsSeedsRange);
  console.log(" result: ", lowestLocationSeed);

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
