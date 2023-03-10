const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  street_number: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Address = model("Address", addressSchema);

module.exports = Address;
