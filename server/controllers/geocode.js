require("dotenv").config();
const { Dataset, Address } = require("../models");
const fs = require("fs/promises");
const format_incoming = require("../processing/format_db_assresses");
const db_address_to_geocode = require("../processing/db_addresses_to_geo");

const get_address_geocode = async (req, res) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=1185+winding+creek+road+granite+quarry+nc&key=${process.env.GEOCODE_KEY}`,
      {
        method: "GET",
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
      zip_code: data.results[0].address_components[5].long_name,
    };

    const address_data = {
      location_data: address,
      geometry: geometry,
    };

    const formated_data = `${address_data.location_data.street_number} ${address_data.location_data.route} ${address_data.location_data.route},${geometry.lat},${geometry.lng}\n`;

    await fs.writeFile("location_data.csv", formated_data, {
      flag: "a+",
    });

    res.json(address_data);
  } catch (error) {
    console.log(error);
  }
};

const geocode_dataset = async (req, res) => {
  try {
    const { _id } = req.params;

    const found_dataset = await Dataset.findById(_id)
      .populate("addresses")
      .select("-__v");

    if (!found_dataset) {
      res.status(404);
      throw new Error("Dataset could not be found");
    }

    const addresses = found_dataset.addresses;

    const formatted_addresses = await format_incoming(addresses);

    const geocode_data = await db_address_to_geocode(formatted_addresses);

    for await (const geo_data of geocode_data) {
      await Address.findByIdAndUpdate(
        { _id: geo_data._id },
        {
          latitude: geo_data.latitude,
          longitude: geo_data.longitude,
          geo_coded: true,
        }
      );
    }

    await Dataset.findByIdAndUpdate({ _id }, { geo_processed: true });

    res.status(201).json({ error: false, success: true, data: "n/a" });
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

module.exports = { get_address_geocode, geocode_dataset };
