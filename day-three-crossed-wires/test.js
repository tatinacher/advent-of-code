import { runIntcodeProgram } from ".";

const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

test("run Intcode program", () => {
  expect(runIntcodeProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
});

test("erun Intcode program", () => {
  expect(runIntcodeProgram([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);
});

test("run Intcode program", () => {
  expect(runIntcodeProgram([2, 4, 4, 5, 99, 0])).toEqual([
    2,
    4,
    4,
    5,
    99,
    9801
  ]);
});

test("run Intcode program", () => {
  expect(runIntcodeProgram([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
    30,
    1,
    1,
    4,
    2,
    5,
    6,
    0,
    99
  ]);
});
