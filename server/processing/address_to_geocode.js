const format_incoming = require("./formate_incoming");
const geocode_api_call = require("../map_api/geocode_api");

async function address_to_geocode() {
  try {
    const addresses = await format_incoming("./locations.csv");
    for await (const address of addresses) {
      await geocode_api_call(address);
    }
  } catch (error) {
    console.log(addresses);
  }
}

address_to_geocode();
