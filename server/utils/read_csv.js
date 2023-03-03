const fs = require("fs");
const readline = require("readline");

const read_csv = async (file_path) => {
  rl = readline.createInterface({
    input: fs.createReadStream(file_path),
    crlfDelay: Infinity
  });

  return rl;
};

module.exports = read_csv;
