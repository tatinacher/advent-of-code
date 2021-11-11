export const calculateModuleFuel = array => {
  const reducer = (ac, val) => ac + (Math.floor(val / 3) - 2);
  return array.reduce(reducer, 0);
};

const countFuel = amount => {
  const fuelAmount = calculateModuleFuel([amount]);
  if (fuelAmount < 0) {
    return amount;
  } else {
    return amount + countFuel(fuelAmount);
  }
};

export const calculateAllFuel = array => {
  const reducer = (ac, val) => {
    const remainAmount = countFuel(val);
    return ac + remainAmount - val;
  };
  return array.reduce(reducer, 0);
};
