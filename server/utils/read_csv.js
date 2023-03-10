const fs = require("fs");
const readline = require("readline");

const read_csv = async (file_path) => {
  const data = []
  const headers = []
  rl = readline.createInterface({
    input: fs.createReadStream(file_path),
    crlfDelay: Infinity
  });

  let index = 0;
  for await (const row of rl) {
    if(index === 0) {
      let properties = row.trim().split(",");
      for(let prop of properties) {
        headers.push(prop);
      }
      index++
      continue;
    }
    let values = row.trim().split(",");
    let obj = {}
    for(let i = 0; i < headers.length; i++) {
      obj[headers[i]] = values[i]
    }
    data.push(obj);
    
  }

  return data;
};

module.exports = read_csv;
