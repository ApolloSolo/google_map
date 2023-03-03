require("dotenv").config();
const fs = require("fs/promises");

async function geocode_api_call(formated_address) {
  try {
    //const geo_data = []
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formated_address.street_number}+${formated_address.route}+${formated_address.city}+${formated_address.state}&key=${process.env.GEOCODE_KEY}`,
      {
        method: "GET"
      }
    );
    const data = await response.json();

    const geometry = data.results[0].geometry.location;

    const address = {
      street_number: data.results[0].address_components[0].long_name,
      route: data.results[0].address_components[1].long_name,
      city: data.results[0].address_components[2].long_name,
      county: data.results[0].address_components[3].long_name,
      state: data.results[0].address_components[4].long_name,
      zip_code: data.results[0].address_components[5].long_name
    };

    const address_data = {
      location_data: address,
      geometry: geometry
    };

    const formated_data = `${address_data.location_data.street_number} ${address_data.location_data.route} ${address_data.location_data.route},${geometry.lat},${geometry.lng}\n`;

    await fs.writeFile("location_data.csv", formated_data, {
      flag: "a+"
    });

    console.log(formated_data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = geocode_api_call;
