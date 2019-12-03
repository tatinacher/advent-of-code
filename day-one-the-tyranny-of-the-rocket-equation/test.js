import { calculateModuleFuel, calculateAllFuel } from ".";

const fs = require("fs").promises;

async function loadMonoCounter() {
  const data = await fs.readFile("data.txt", "utf8");
  return data;
}

test("expected for a mass of 12 to be 2", () => {
  expect(calculateModuleFuel([12])).toBe(2);
});

test("expected for a mass of 1969 to be 654", () => {
  expect(calculateModuleFuel([1969])).toBe(654);
});

test("expected for a mass of 100756 to be 33583", () => {
  expect(calculateModuleFuel([100756])).toBe(33583);
});

test("expected for an array to be 3453056", () => {
  loadMonoCounter().then(res => {
    const array = res.split(/\r|\n/).map(Number);
    const fuelAmount = calculateModuleFuel(array);
    expect(calculateModuleFuel(array)).toBe(fuelAmount);
  });
});

// Fuel with fuel

test("expected for a mass of 14 to be 2", () => {
  expect(calculateAllFuel([14])).toBe(2);
});

test("expected for a mass of 1969 to be 966", () => {
  expect(calculateAllFuel([1969])).toBe(966);
});

test("expected for a mass of 100756 to be 50346", () => {
  expect(calculateAllFuel([100756])).toBe(50346);
});

test("expected for an array to be ...", () => {
  loadMonoCounter().then(res => {
    const array = res.split(/\r|\n/).map(Number);
    const fuelAmount = calculateAllFuel(array);
    expect(calculateAllFuel(array)).toBe(fuelAmount);
  });
});
