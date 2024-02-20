const { load } = require("../../utils/file");

const maxVariant = {red: 12, green: 13, blue: 14};

const prepareData = (res) => res.split("\n").map(line => {
  const [_, variants] = line.split(": ");
  const games = variants.split("; ")
  const result = games.map(game => {
    const subsets = game.split(', ');
    const res = subsets.map(subset => {
      const [cubes, color] = subset.split(' ');
      return ({[color]: Number(cubes)})
    });  
    return res;  
  });
  return result;
});

const findMax = (allGames) => allGames.map(gameVariants => {
    let maxB = 0, maxG = 0, maxR = 0;
    gameVariants.map(game=>{
      game.forEach(({blue, green, red}) => {
        if(blue){
          maxB = maxB > blue ? maxB : blue;
        }
        if (green){
          maxG = maxG > green ? maxG : green;
        }
        if(red){
          maxR = maxR > red ? maxR : red;
        }
      });
    });
    return ({green: maxG, blue: maxB, red: maxR})
});


const getPossibleGames = (games, max) => games.reduce((acc, {green, blue, red}, id) => {
  if (green <= max.green  && blue <= max.blue && red <= max.red ){
    acc.push(id+1);
  }
  return acc;
}, []);



const findResult = (result) => {
  const gameVariants = prepareData(result);
  const maxGameVariants = findMax(gameVariants);
  const possibleGames = getPossibleGames(maxGameVariants, maxVariant);
  const sumOfID = possibleGames.reduce((acc, id) => acc + id, 0);
  console.log(sumOfID);
  //____2 part___
  console.log(maxGameVariants);
  const powerOfSet = maxGameVariants.reduce((acc, {green, blue, red}) => green*blue*red + acc, 0)
  console.log(powerOfSet);
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
