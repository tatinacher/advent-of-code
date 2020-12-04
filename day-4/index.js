fs = require("fs");

const countValidPassports = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const passportsList = data.split("\n\n");

  const notRequired = "cid";

  const passports = passportsList.map(passport => {
    const passParams = passport.split(/\s+/);
    const params = {};
    passParams.forEach(param => {
      const parameter = param.split(":");
      params[parameter[0]] = parameter[1];
    });
    return params;
  });

  let validPassports = 0;
  passports.forEach((passport, i) => {
    delete passport[notRequired];

    if (isValid(passport, i)) {
      console.log(passport);

      validPassports += 1;
    }
  });
  return validPassports;
};

const isValid = (passport, i) => {
  const requiredFields = {
    byr: checkBYR,
    iyr: checkIYR,
    eyr: checkEYR,
    hgt: checkHGT,
    hcl: checkHLS,
    ecl: checkESL,
    pid: checkPID
  };

  for (const key in requiredFields) {
    if (requiredFields.hasOwnProperty(key)) {
      const check = requiredFields[key];
      const value = passport[key];

      if (!value) {
        // console.log(i, "undefind");

        return false;
      }
      if (!check(value)) {
        // console.log(i, key, value, check(value));
        return false;
      }
    }
  }

  return true;
};

const checkBYR = byr => parseInt(byr) <= 2002 && 1920 <= parseInt(byr);

const checkIYR = iyr => parseInt(iyr) <= 2020 && 2010 <= parseInt(iyr);

const checkEYR = eyr => parseInt(eyr) <= 2030 && 2020 <= parseInt(eyr);

const checkHGT = hgt => {
  const height = hgt;
  if (height.match(/^\d{3}cm$/g) || height.match(/^\d{2}in$/g)) {
    const size = height.match(/\d+/g)[0];
    const measure = height.match(/in/g) || height.match(/cm/g);
    if (measure[0] === "cm" && 150 <= parseInt(size) && parseInt(size) <= 193) {
      return true;
    }
    if (measure[0] === "in" && 59 <= parseInt(size) && parseInt(size) <= 76) {
      return true;
    }
  }
  return false;
};

const checkHLS = hls => hls.match(/^#[0-9|a-f]{6}$/gi);

const checkESL = els =>
  els === "amb" ||
  els === "blu" ||
  els === "brn" ||
  els === "gry" ||
  els === "grn" ||
  els === "hzl" ||
  els === "oth";

const checkPID = pid => pid.match(/^\d{9}$/);

console.log(countValidPassports());
