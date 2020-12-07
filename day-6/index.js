fs = require("fs");

const getUnion = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const groupsAnswers = data.split("\n\n");
  let sum = 0;
  groupsAnswers.map(group => {
    const answers = group.split("\n");
    let union = new Set([]);
    answers.map(answer => {
      const arrayOfAnswers = answer.split("");
      union = new Set([...union, ...arrayOfAnswers]);
    });
    sum += [...union].length;
  });
  return sum;
};

const getIntersection = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const groupsAnswers = data.split("\n\n");
  let sum = 0;
  groupsAnswers.map(group => {
    const answers = group.split("\n");
    const first = answers.splice(0, 1);
    let intersection = new Set(first[0].split(""));

    answers.map(answer => {
      const arrayOfAnswers = new Set(answer.split(""));
      intersection = new Set(
        [...intersection].filter(x => arrayOfAnswers.has(x))
      );
    });

    sum += [...intersection].length;
  });
  return sum;
};

console.log(getUnion());
console.log(getIntersection());
