const geocode_api_call = require("../map_api/geocode_api");

async function db_address_to_geocode(formatted_addresses) {
  const geocode = [];
  try {
    for await (const address of formatted_addresses) {
      const data = await geocode_api_call(address);
      geocode.push(data);
    }
    return geocode;
  } catch (error) {
    console.log(error);
  }
}

module.exports = db_address_to_geocode;
