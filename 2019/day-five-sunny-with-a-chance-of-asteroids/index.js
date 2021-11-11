// param that an instruction writes to will never be in immediate mode
// ? 3 and 4 what to do

const fs = require("fs").promises;
const reader = require("readline-sync");

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

const runIntcodeProgram = async mass => {
  const array = mass.slice();
  let step = 0,
    parameterOne,
    parameterTwo,
    parameterThree,
    res = [];

  // add parameter mode
  // 0 - position mode - parameter is interpreted as position
  // 1 - immediate mode - parameter is interpreted as value

  // ABCDE
  // DE - optcode, can be 01, 02, 03, 04, 99
  // C - mode for 1 param
  // B - mode for 2 param
  // A - mode for 3 param

  // param that an instruction writes to will never be in immediate mode
  // need to save positions of this params

  // array[step] is an optcode
  while (array[step] % 100 != 99 && step < array.length) {
    //console.log("log", step, array[step], array[step] % 100);

    const instruction = array[step].toString();
    const modeOne = Number(instruction.slice(-3, -2)) || 0;
    const modeTwo = Number(instruction.slice(-4, -3)) || 0;
    switch (array[step] % 100) {
      case 1:
        //console.log(1);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        parameterThree = array[step + 3];
        array[parameterThree] = parameterOne + parameterTwo;

        //todo set

        step += 4;

        break;
      case 2:
        //console.log(2);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        parameterThree = array[step + 3];
        array[parameterThree] = parameterOne * parameterTwo;

        step += 4;

        break;
      case 3:
        //console.log(3);

        parameterOne = array[step + 1];
        let response = reader.question("number: ");
        array[parameterOne] = Number(response);

        step += 2;
        break;
      case 4:
        //console.log(4);

        parameterOne = array[step + 1];
        res.push(modeOne ? array[step + 1] : array[parameterOne]);
        step += 2;

        break;
      case 5:
        //console.log(5);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        if (parameterOne != 0) {
          step = parameterTwo;
        } else {
          step += 3;
        }

        break;
      case 6:
        //console.log(6);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        if (parameterOne == 0) {
          step = parameterTwo;
        } else {
          step += 3;
        }

        break;
      case 7:
        //console.log(7);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        parameterThree = array[step + 3];

        array[parameterThree] = parameterOne < parameterTwo ? 1 : 0;
        step += 4;

        break;
      case 8:
        //console.log(8);

        parameterOne = modeOne ? array[step + 1] : array[array[step + 1]];
        parameterTwo = modeTwo ? array[step + 2] : array[array[step + 2]];
        parameterThree = array[step + 3];

        array[parameterThree] = parameterOne == parameterTwo ? 1 : 0;
        step += 4;

        break;
      default:
        return 0;
        break;
    }
  }
  return res[res.length - 1];
};

const main = () => {
  let promise = new Promise((resolve, reject) => {
    loadMonoCounter().then(res => {
      resolve(res.split(",").map(Number));
    });
  });

  promise.then(result => {
    const res = runIntcodeProgram(result);
    console.log(res);
  });
};

main();
