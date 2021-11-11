fs = require("fs");

const passwordCheck = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const passwordArr = data.split("\n");
  let validPasswordCount = 0;

  passwordArr.forEach(line => {
    const [condition, password] = line.split(":");
    const [variants, letter] = condition.split(" ");
    const [from, to] = variants.split("-");

    var re = new RegExp(letter, "g");
    const count = (password.match(re) || []).length;

    if (from <= count && count <= to) {
      validPasswordCount += 1;
    }
  });

  return validPasswordCount;
};

const passwordPositionCheck = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const passwordArr = data.split("\n");
  let validPasswordCount = 0;

  passwordArr.forEach(line => {
    const [condition, password] = line.split(": ");
    const [variants, letter] = condition.split(" ");
    const [positionOne, positionTwo] = variants.split("-");

    const regValueOne =
      ".".repeat(positionOne - 1) +
      letter +
      ".".repeat(password.length - positionOne);

    const regValueTwo =
      ".".repeat(positionTwo - 1) +
      letter +
      ".".repeat(password.length - positionTwo);

    var re1 = new RegExp(regValueOne, "g");
    var re2 = new RegExp(regValueTwo, "g");

    const count1 = (password.match(re1) || []).length;
    const count2 = (password.match(re2) || []).length;

    if (count1 + count2 === 1) {
      validPasswordCount += 1;
    }
  });

  return validPasswordCount;
};

console.log(passwordCheck());
console.log(passwordPositionCheck());
