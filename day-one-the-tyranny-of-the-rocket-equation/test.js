import { countFuel } from ".";

const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

test("expected for a mass of 12 to be 2", () => {
  expect(countFuel([12])).toBe(2);
});

test("expected for a mass of 1969 to be 654", () => {
  expect(countFuel([1969])).toBe(654);
});

test("expected for a mass of 100756 to be 33583", () => {
  expect(countFuel([100756])).toBe(33583);
});

test("expected for an array to be 3453056", () => {
  loadMonoCounter().then(res => {
    const array = res.split(/\r|\n/).map(Number);
    const fuelAmount = countFuel(array);
    expect(countFuel(array)).toBe(fuelAmount);
  });
});
