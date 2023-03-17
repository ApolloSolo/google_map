const regex = require("../utils/regex");
const read_csv = require("../utils/read_csv");

async function format_incoming(file_path) {
  const csv_data = await read_csv(file_path);
  const addresses = [];

  for await (const line of csv_data) {
    const matches = line.toLowerCase().match(regex.simple_re);
    addresses.push({
      street_number: matches.groups.street_number.replace(
        regex.replace_space,
        "+"
      ),
      route: matches.groups.route.replace(regex.replace_space, "+"),
      city: matches.groups.city.replace(regex.replace_space, "+"),
      state: matches.groups.state.replace(regex.replace_space, "+")
    });
  }
  addresses.shift();
  return addresses;
}

module.exports = format_incoming;
