fs = require("fs");

const routeMultiply = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const routes = data.split("\n");

  let x = 0,
    y = 0;
  routes.map((route) => {
    const [direction, count] = route.split(" ");
    switch (direction) {
      case "forward":
        x += parseInt(count);
        break;
      case "up":
        y -= parseInt(count);
        break;
      case "down":
        y += parseInt(count);
        break;
      default:
        break;
    }
  });
  return x * y;
};

const routeAimMultiply = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const routes = data.split("\n");

  let x = 0,
    aim = 0,
    depth = 0;
  routes.map((route) => {
    const [direction, count] = route.split(" ");
    switch (direction) {
      case "forward":
        x += parseInt(count);
        depth += parseInt(count) * aim;
        break;
      case "up":
        aim -= parseInt(count);
        break;
      case "down":
        aim += parseInt(count);
        break;
      default:
        break;
    }
  });
  return x * depth;
};

console.log(routeMultiply());
console.log(routeAimMultiply());
