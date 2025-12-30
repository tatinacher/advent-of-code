const { load } = require("../../utils/file");

const GUARD = ['^', '>', 'v', '<'];
const OBSTACLE = '#';
const STEP = 'X';

const sliceText = (res) => {
  const atlas = res.split("\n").map(line => line.split(""));
  return atlas;
};

const getStart = (atlas) => {
  for (let i = 0; i < atlas.length; i++) {
    if (atlas[i].includes(GUARD[0])) {
      const j = atlas[i].indexOf(GUARD[0])
      return [({ i, j }), 0];
    }
    if (atlas[i].includes(GUARD[1])) {
      const j = atlas[i].indexOf(GUARD[1])
      return [({ i, j }), 1];
    }
    if (atlas[i].includes(GUARD[2])) {
      const j = atlas[i].indexOf(GUARD[2])
      return [({ i, j }), 2];
    }
    if (atlas[i].includes(GUARD[3])) {
      const j = atlas[i].indexOf(GUARD[3])
      return [({ i, j }), 3];
    }
  }
  return [{}, undefined]
};

const getIndexByDirection = (direction, i, j) => {
  let iNew = i, jNew = j;
  // console.log(iNew, jNew);

  switch (GUARD[direction]) {
    case '^':
      iNew -= 1;
      break;

    case 'v':
      iNew += 1;
      break;

    case '<':
      jNew -= 1;
      break;

    case '>':
      jNew += 1;
      break;

    default:
      break;
  }

  return [iNew, jNew]
}

const makeStep = (atlas, iNew, jNew, iOld, jOld, nextDirection) => {
  const nextCell = atlas[iNew][jNew];

  if (nextCell !== OBSTACLE) {
    atlas[iOld][jOld] = 'X';
    atlas[iNew][jNew] = GUARD[nextDirection];
    iOld = iNew, jOld = jNew;
    [iNew, jNew] = getIndexByDirection(nextDirection, iOld, jOld);
  }

  if (nextCell === OBSTACLE) {
    nextDirection = (nextDirection + 1) % GUARD.length;
    atlas[iOld][jOld] = GUARD[nextDirection];
    // [iNew, jNew] = getIndexByDirection(nextDirection, iOld, jOld);
    // atlas[iOld][jOld] = STEP;
    // atlas[iNew][jNew] = GUARD[nextDirection];
    [iNew, jNew] = getIndexByDirection(nextDirection, iOld, jOld);
  }


  return [iOld, jOld, iNew, jNew, nextDirection]
}


const doSteps = (atlas, i, j, direction, maxI, maxJ) => {
  let iOld = i, jOld = j, nextDirection = direction;

  let [iNew, jNew] = getIndexByDirection(nextDirection, iOld, jOld);
  let isLoop = 0;

  while (!(iNew >= maxI || jNew >= maxJ || iNew < 0 || jNew < 0)) {

    [iOld, jOld, iNew, jNew, nextDirection] = makeStep(atlas, iNew, jNew, iOld, jOld, nextDirection);
  }
  atlas[iOld][jOld] = STEP;
}

const walkOnMap = (atlas, startingPoint, direction) => {
  const walkedAtlas = atlas.map(el => [...el]);
  const maxWidth = atlas[0].length;
  const maxHeight = atlas.length;
  doSteps(walkedAtlas, startingPoint.i, startingPoint.j, direction, maxWidth, maxHeight);
  return walkedAtlas;
}

const getAllX = (atlas) => {
  const sum = atlas.reduce((sum, line) =>
    sum += line.reduce((acc, step) => acc += step === STEP ? 1 : 0, 0), 0);

  return sum;
}

const findLoop = (atlas, initialI, initialJ) => {
  let BL, TR;

  // console.log(atlas.map(el => el.join('')).join('\n'));

  if (initialI === 0 || initialJ === 0 || initialI == atlas[0].length - 1 || initialJ == atlas.length - 1) {
    return false;
  }

  //BL
  for (let i = initialI + 1; i < atlas.length; i++) {
    // console.log(atlas[i][initialJ - 1]);
    if (atlas[i][initialJ - 1] === OBSTACLE) {
      BL = [i, initialJ - 1];
    }
  }


  if (!BL) {
    return false;
  }

  //TR
  for (let j = initialJ + 1; j < atlas.length; j++) {
    if (atlas[initialI + 1][j] === OBSTACLE) {
      TR = [initialI + 1, j]
    }
  }

  if (!TR) {
    return false;
  }

  // console.log('f', initialI, initialJ, BL, TR)


  //BR
  if (BL[0] + 1 > atlas.length || TR[1] - 1 <= 0 || atlas[BL[0] + 1][TR[1] - 1] !== OBSTACLE) {
    return false;
  }

  console.log('chosen one! ', [initialI, initialJ], BL, TR)


  return true;
}

const getAllLoop = (atlasWalked, atlas, startingPoint, direction) => {
  const indexesOfX = [];

  atlasWalked.forEach((line, i) => {
    line.forEach((element, j) => {
      if (element === STEP) {
        indexesOfX.push([i, j]);
      }
    })
  });


  const loopCount = indexesOfX.reduce((acc, index) => {
    const newAtlas = atlas.map(el => [...el]);
    newAtlas[index[0]][index[1]] = '#';
    let isLoop = false;

    // console.log(index[0], index[1])

    if (index[0] == 4 && index[1] == 3) {
      console.log('\n')
      console.log(newAtlas.map(el => el.join('')).join('\n'));
      console.log(...index);
      const isTLLoop = findLoop(newAtlas, ...index);
      const transAtlas = newAtlas[0].map((val, index) => newAtlas.map(row => row[index]).reverse());
      console.log(isTLLoop);

      console.log(transAtlas.map(el => el.join('')).join('\n'));
      console.log(index[1], atlas.length - 1 - index[0]);

      const isBLLoop = findLoop(transAtlas, index[1], atlas.length - 1 - index[0]);
      const transtransAtlas = transAtlas[0].map((val, index) => transAtlas.map(row => row[index]).reverse());
      console.log(isBLLoop);

      console.log(transtransAtlas.map(el => el.join('')).join('\n'));
      console.log(atlas.length - 1 - index[0], atlas[0].length - 1 - index[1]);

      const isBRLoop = findLoop(transtransAtlas, atlas.length - 1 - index[0], atlas[0].length - 1 - index[1]);
      const tttAtlas = transtransAtlas[0].map((val, index) => transtransAtlas.map(row => row[index]).reverse());
      console.log(isBRLoop);

      console.log(tttAtlas.map(el => el.join('')).join('\n'));
      console.log(atlas[0].length - 1 - index[1], index[0]);

      const isTRLoop = findLoop(tttAtlas, atlas[0].length - 1 - index[1], index[0]);
      console.log(isTRLoop);

      isLoop = isTLLoop || isBLLoop || isBRLoop || isTRLoop;
      console.log(isTLLoop, isBLLoop, isBRLoop, isTRLoop)


    }

    if (isLoop) {
      console.log(index[0], index[1])

    }

    return acc += + isLoop ? 1 : 0;
  }, 0);

  return loopCount;
}


const findResult = (result) => {
  const atlas = sliceText(result);
  const [startingPoint, direction] = getStart(atlas);

  const walkedMap = walkOnMap(atlas, startingPoint, direction);
  const numberOfX = getAllX(walkedMap);
  console.log(walkedMap.map(el => el.join("")).join("\n"));

  const numberOfLoop = getAllLoop(walkedMap, atlas, startingPoint, direction);

  console.log('1: ', numberOfX, '2: ', numberOfLoop);
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


