const findManhattanDistance = (wireOne, wireTwo) => {
  const locationOne = findCenter(wireOne);
  const locationTwo = findCenter(wireTwo);
  const x = Math.max(Math.abs(locationOne.x), Math.abs(locationTwo.x));
  const y = Math.max(Math.abs(locationOne.y), Math.abs(locationTwo.y));
  const grid = makeGrid(x, y);
  const center = {
    x: Math.ceil(x / 2),
    y: Math.ceil(y / 2)
  };
  buildWirePath(wireOne, grid, center, "1");

  buildWirePath(wireTwo, grid, center, "2");
  let min = x - center.x + (y - center.y);

  grid.forEach((el, i) => {
    const j = el.indexOf("x");
    if (j > -1) {
      const direction = Math.abs(center.x - i) + Math.abs(center.y - j);
      console.log(i, j, direction);

      if (direction < min) min = direction;
    }
  });
  return min;
};

const makeGrid = (x, y) => {
  let grid = new Array(x).fill().map(() => new Array(y).fill(0));
  return grid;
};

const buildWirePath = (wire, grid, center, numberOfWire) => {
  let step = { x: center.x, y: center.y };
  wire.forEach(el => {
    const direction = el.slice(0, 1);
    const number = Number(el.slice(1));
    switch (direction) {
      case "D":
        for (let i = 1; i <= number; i++) {
          if (
            grid[step.x + i][step.y] == 0 ||
            grid[step.x + i][step.y] == numberOfWire
          ) {
            grid[step.x + i][step.y] = numberOfWire;
          } else {
            grid[step.x + i][step.y] = "x";
          }
        }
        step.x += number;
        break;
      case "U":
        for (let i = 1; i <= number; i++) {
          if (
            grid[step.x - i][step.y] == 0 ||
            grid[step.x - i][step.y] == numberOfWire
          ) {
            grid[step.x - i][step.y] = numberOfWire;
          } else {
            grid[step.x - i][step.y] = "x";
          }
        }
        step.x -= number;

        break;
      case "L":
        for (let i = 1; i <= number; i++) {
          if (
            grid[step.x][step.y - i] == 0 ||
            grid[step.x][step.y - i] == numberOfWire
          ) {
            grid[step.x][step.y - i] = numberOfWire;
          } else {
            grid[step.x][step.y - i] = "x";
          }
        }
        step.y -= number;

        break;
      case "R":
        for (let i = 1; i <= number; i++) {
          if (
            grid[step.x][step.y + i] == 0 ||
            grid[step.x][step.y + i] == numberOfWire
          ) {
            grid[step.x][step.y + i] = numberOfWire;
          } else {
            grid[step.x][step.y + i] = "x";
          }
        }
        step.y += number;

        break;
      default:
        break;
    }
  });
  grid[center.x][center.y] = "C";
};

const findCenter = wire => {
  let x = 0;
  let y = 0;
  let positions = { D: 0, U: 0, L: 0, R: 0 };
  wire.forEach(el => {
    const direction = el.slice(0, 1);
    const number = Number(el.slice(1));

    positions[direction] += number;
  });

  console.log(positions);
  return {
    x: (Math.max(positions.U, positions.D) + 1) * 2,
    y: (Math.max(positions.L, positions.R) + 1) * 2
  };
};
const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

loadMonoCounter().then(res => {
  let array = res.split(/\r|\n/);
  const [wireOne, wireTwo] = [array[0].split(","), array[1].split(",")];
  console.log(findManhattanDistance(wireOne, wireTwo));
});
