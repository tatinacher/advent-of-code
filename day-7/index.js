fs = require("fs");

class Link {
  constructor(name) {
    this.root;
    this.children = [];
    this.name = name;
  }

  addRoot(root) {
    this.root = root;
  }

  addChild(child) {
    this.children.push(child);
  }
}

const getLuggageArray = () => {
  const data = fs.readFileSync("data.txt", "utf8");
  const lines = data.split("\n");
  const luggage = [];

  lines.map(line => {
    const [top, children] = line.split(" contain ");
    const root = top.replace(/bags/gi, "bag");
    const childrenArr = children.split(", ");
    const luggageChildren = [];
    childrenArr.map(child => {
      const name = child.replace(/\d+ |\./gi, "").replace(/bags/gi, "bag");
      const luggageCount = child.match(/\d+/g);
      if (name && luggageCount) {
        const count = parseInt(luggageCount[0]);
        luggageChildren.push({ name, count });
      }
    });
    luggage.push({ root: root, children: luggageChildren });
  });
  return luggage;
};

const getEndOfTree = luggage => {
  const searchFor = new Set([]);
  luggage.forEach(({ root, children }) => {
    if (children.length === 0) {
      searchFor.add(root);
    }
  });
  return searchFor;
};

const countInsideBags = () => {
  const luggage = getLuggageArray();
  const treeEnds = getEndOfTree(luggage);
  const allLuggage = new Set([]);
  let summ = 0;

  const searchName = "shiny gold bag";
  // console.log(luggage);

  treeEnds.forEach(treeEnd => {
    //console.log(treeEnd);
    const sumBench = treeRun(luggage, treeEnd, 0, 1);
    console.log(sumBench);
    summ += sumBench;
  });
  // while (true) {
  //   let endOfTree = [...searchFor][0];
  //   searchFor.delete(endOfTree);
  //   searchItem = endOfTree;
  //   console.log(searchItem);

  //   let mul = 1;
  //   while (searchItem && searchItem !== searchName) {
  //     const root = luggage.find(({ children }) => {
  //       const index = children.findIndex(({ name }) => name === searchItem);
  //       if (index !== -1) {
  //         mul *= children[index].count;
  //       }
  //     });
  //     searchItem = root.root;
  //   }
  //   sum += mul;

  //   if ([...searchFor].length === 0) break;
  // }
  return summ;
};

// point = {root, children}
const treeRun = (tree, point, sum, index) => {
  let rootName;

  tree.forEach(({ root, children }) => {
    const child = children.find(child => child.name === point);

    if (child) {
      // console.log(Math.pow(child.count, index));
      console.log(root, child);

      //sum += Math.pow(child.count, index);
      rootName = root;
      // console.log(child, sum, rootName);
      index += 1;
    }
  });

  //console.log(root);

  if (rootName) {
    // console.log("rootName", rootName);
    return treeRun(tree, rootName, sum, index);
  } else {
    return sum;
  }
};

//first
const countLuggage = () => {
  const luggage = getLuggageArray();
  const searchFor = new Set(["shiny gold bag"]);
  let sum = 0;

  while (true) {
    let searchLuggage = [...searchFor][0];
    searchFor.delete(searchLuggage);
    luggage.forEach(({ root, children }) => {
      if (root === searchLuggage) {
        children.forEach(child => {
          sum += child.count;
          searchFor.add(child.name);
        });
      }
    });
    if ([...searchFor].length === 0) break;
  }
  return sum;
};

// console.log(countLuggage());

console.log(countInsideBags());

//628185938801140 too high
