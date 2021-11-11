import { getNumberOfPasswords } from ".";

test("run Intcode program", () => {
  expect(getNumberOfPasswords(111111, 111112)).toEqual(1);
});
