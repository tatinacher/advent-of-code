fs = require("fs");

const countTrees = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const areaArr = data.split("\n");
  const tobogganMove = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 }
  ];

  return tobogganMove.reduce(
    (multiply, move) => multiply * encounterTrees(areaArr, move),
    1
  );
};

const encounterTrees = (areaArr, move) => {
  const lineLength = areaArr[0].length,
    treeChar = "#";
  let treas = 0,
    x = 0;
  for (let y = 0; y < areaArr.length; y += move.down) {
    const position = areaArr[y].charAt(x % lineLength);
    treas += position === treeChar ? 1 : 0;
    x += move.right;
  }
  return treas;
};

console.log(countTrees());
