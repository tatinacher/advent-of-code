export const countFuel = array => {
  const reducer = (ac, val) => ac + (Math.floor(val / 3) - 2);
  return array.reduce(reducer, 0);
};
