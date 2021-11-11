const runIntcodeProgram = mass => {
  const array = mass.slice();
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

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      array[1] = i;
      array[2] = j;
      const newArray = runIntcodeProgram(array);
      if (newArray[0] == 19690720) {
        console.log(i * 100 + j);
      }
    }
  }
});
