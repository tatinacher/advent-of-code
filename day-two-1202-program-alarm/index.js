const runIntcodeProgram = array => {
  let step = 0,
    x,
    y,
    z;
  while (array[step] != 99 && step < array.length) {
    switch (array[step]) {
      case 1:
        x = array[step + 1];
        y = array[step + 2];
        z = array[step + 3];

        array[z] = array[x] + array[y];

        break;
      case 2:
        x = array[step + 1];
        y = array[step + 2];
        z = array[step + 3];

        array[z] = array[x] * array[y];
        break;
      default:
        break;
    }
    step += 4;
  }
  return array;
};

const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

loadMonoCounter().then(res => {
  let array = res.split(",").map(Number);
  array[1] = 12;
  array[2] = 2;
  const newArray = runIntcodeProgram(array);
  console.log(newArray);
});
