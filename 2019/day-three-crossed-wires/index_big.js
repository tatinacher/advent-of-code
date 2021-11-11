if (!String.prototype.splice) {
  String.prototype.splice = function(start, newSubStr) {
    if (this[start] == "C")
      return this.slice(0, start) + "C" + this.slice(start + 1);
    if (this[start] != newSubStr && this[start] != 0) {
      return this.slice(0, start) + "x" + this.slice(start + 1);
    }
    return this.slice(0, start) + newSubStr + this.slice(start + 1);
  };
}

const findManhattanDistance = (wireOne, wireTwo) => {
  const locationOne = findCenter(wireOne);
  const locationTwo = findCenter(wireTwo);
  const x = Math.max(Math.abs(locationOne.x), Math.abs(locationTwo.x));
  const y = Math.max(Math.abs(locationOne.y), Math.abs(locationTwo.y));
  let grid = makeGrid(x + 1, y + 1);
  //console.log(x, y);

  const center = {
    x: Math.floor(y / 2),
    y: Math.floor(x / 2)
  };

  buildWirePath(wireOne, grid, center, "1");
  console.log(1);

  buildWirePath(wireTwo, grid, center, "2");
  let min = x - center.x + (y - center.y);
  console.log(2);

  grid.forEach((el, i) => {
    const index = el.indexOf("x");
    if (index > 0) {
      for (let j = 0; j < x; j++) {
        if (grid[i][j] == "x") {
          const direction = Math.abs(center.x - i) + Math.abs(center.y - j);

          if (direction < min) {
            min = direction;
          }
        }
      }
    }
  });
  return min;
};

const makeGrid = (x, y) => {
  let str = "0".repeat(x);
  let grid = new Array(y).fill(str);
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
          grid[step.x + i] = grid[step.x + i].splice(step.y, numberOfWire);
        }
        step.x += number;
        break;
      case "U":
        for (let i = 1; i <= number; i++) {
          grid[step.x - i] = grid[step.x - i].splice(step.y, numberOfWire);
        }
        step.x -= number;

        break;
      case "L":
        for (let i = 1; i <= number; i++) {
          grid[step.x] = grid[step.x].splice(step.y - i, numberOfWire);
        }
        step.y -= number;

        break;
      case "R":
        for (let i = 1; i <= number; i++) {
          grid[step.x] = grid[step.x].splice(step.y + i, numberOfWire);
        }
        step.y += number;

        break;
      default:
        break;
    }
  });
  grid[center.x] = grid[center.x].splice(center.y, "C");
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

  return {
    x: Math.max(positions.R, positions.L) * 2,
    y: Math.max(positions.U, positions.D) * 2
  };
};
const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

const findFewestSteps = (wireOne, wireTwo) => {
  const locationOne = findCenter(wireOne);
  const locationTwo = findCenter(wireTwo);
  const x = Math.max(Math.abs(locationOne.x), Math.abs(locationTwo.x));
  const y = Math.max(Math.abs(locationOne.y), Math.abs(locationTwo.y));
  let grid = makeGrid(x + 1, y + 1);

  const center = {
    x: Math.floor(y / 2),
    y: Math.floor(x / 2)
  };

  buildWirePath(wireOne, grid, center, "1");
  //console.log(1);

  buildWirePath(wireTwo, grid, center, "2");
  //console.log(grid);

  const intersections = [];

  grid.forEach((el, i) => {
    const j = el.indexOf("x");
    if (j > 0) {
      intersections.push({ x: i, y: j });
    }
  });

  let stepsForIntersections = [];

  // center: x,y;
  // intersections: [{x1, y1}, {x2,y2}, ... , {xn, yn}]
  // steps between center and intersection: [{x1, y1}: [wire1: d, wire2: s]]
  //console.log(intersections);
  intersections.forEach(el => {
    const d = findSteps(center, el, grid, wireOne);
    //console.log(wireOne);
    const s = findSteps(center, el, grid, wireTwo);
    //console.log(el, d, s);
    stepsForIntersections.push(d + s);
    //stepsForIntersections.push([el, d, s, d + s]);
  });

  return Math.min(...stepsForIntersections);
};

const findSteps = (center, cross, grid, wire) => {
  let res = 0;
  let steps = 0;
  let step = { x: center.x, y: center.y };

  wire.forEach(el => {
    if (res > 0) {
      //console.log(res);
      return;
    }
    const direction = el.slice(0, 1);
    const number = Number(el.slice(1));
    switch (direction) {
      case "D":
        for (let i = 1; i <= number; i++) {
          // console.log(
          //   step.x + i,
          //   step.y,
          //   grid[step.x + i][step.y],
          //   cross.x,
          //   cross.y,
          //   "D"
          // );
          steps += 1;

          if (
            grid[step.x + i][step.y] == "x" &&
            cross.x == step.x + i &&
            cross.y == step.y
          ) {
            //console.log("returning");
            res = steps;
            break;
          }
        }
        step.x += number;
        break;
      case "U":
        for (let i = 1; i <= number; i++) {
          // console.log(
          //   step.x - i,
          //   step.y,
          //   grid[step.x - i][step.y],
          //   cross.x,
          //   cross.y,
          //   "U"
          // );
          steps += 1;

          if (
            grid[step.x - i][step.y] == "x" &&
            cross.x == step.x - i &&
            cross.y == step.y
          ) {
            //console.log("returning");

            res = steps;
            break;
          }
        }
        step.x -= number;

        break;
      case "L":
        for (let i = 1; i <= number; i++) {
          // console.log(
          //   step.x,
          //   step.y - i,
          //   grid[step.x][step.y - i],
          //   cross.x,
          //   cross.y,
          //   "L"
          // );
          steps += 1;

          if (
            grid[step.x][step.y - i] == "x" &&
            cross.x == step.x &&
            cross.y == step.y - i
          ) {
            //console.log("returning");

            res = steps;
            break;
          }
        }
        step.y -= number;

        break;
      case "R":
        for (let i = 1; i <= number; i++) {
          // console.log(
          //   step.x,
          //   step.y + i,
          //   grid[step.x][step.y + i],
          //   cross.x,
          //   cross.y,
          //   "R"
          // );
          steps += 1;

          if (
            grid[step.x][step.y + i] == "x" &&
            cross.x == step.x &&
            cross.y == step.y + i
          ) {
            //console.log("returning");

            res = steps;
            break;
          }
        }
        step.y += number;

        break;
      default:
        break;
    }
  });

  return res;
};

loadMonoCounter().then(res => {
  let array = res.split(/\r|\n/);
  const [wireOne, wireTwo] = [array[0].split(","), array[1].split(",")];
  //const distance = findManhattanDistance(wireOne, wireTwo);
  const steps = findFewestSteps(wireOne, wireTwo);
  console.log(steps);
});
