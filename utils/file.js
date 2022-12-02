const fs = require("fs").promises;

const file = {
  load: async function (name) {
    const data = await fs.readFile(name, "utf8");
    return data;
  }
}
module.exports = file;