const data = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L"
];
const way = [];
const newArray = [];
const countNumberOfOrbits = array => {
  array.forEach(orbit => {
    planets = orbit.split(")");
    newArray.push([planets[0], planets[1]]);
    way.push([planets[1], [planets[0]]]);
  });

  // way[planet, [p1, p2, ... , pn]]
  way.forEach(planet => {
    const length = newArray.length;
    let index = 0;
    while (index < length) {
      // compare last planet of chain with central planet
      if (planet[1][planet[1].length - 1] == newArray[index][1]) {
        planet[1].push(newArray[index][0]);
        index = 0;
      } else {
        index += 1;
      }
    }
  });
  let count = 0;
  way.forEach(planet => {
    count += planet[1].length;
  });

  console.log(count);
};

countNumberOfOrbits(data);
