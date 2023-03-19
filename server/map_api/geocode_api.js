require("dotenv").config();
const axios = require("axios");

async function geocode_api_call(formated_address) {
  try {
    const response = await axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formated_address.street_number}+${formated_address.route}+${formated_address.city}+${formated_address.state}&key=${process.env.GEOCODE_KEY}`,
    });

    const geometry = response.data.results[0].geometry.location;

    const address_data = {
      _id: formated_address._id,
      latitude: geometry.lat,
      longitude: geometry.lng,
    };

    return address_data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = geocode_api_call;
