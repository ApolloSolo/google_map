const regex = require("../utils/regex");

async function format_incoming(db_addresses) {
  const addresses = [];

  for await (const address of db_addresses) {
    addresses.push({
      street_number: address.street_number.trim().replace(
        regex.replace_space,
        "+"
      ),
      route: address.route.replace(regex.replace_space, "+"),
      city: address.city.replace(regex.replace_space, "+"),
      state: address.state.replace(regex.replace_space, "+"),
      _id: address._id
    });
  }
  return addresses;
}

module.exports = format_incoming;
