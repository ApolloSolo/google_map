const { Dataset } = require("./index");
const { Schema, model } = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const addressSchema = new Schema(
  {
    dataset_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Dataset",
    },
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
    geo_coded: {
      type: Boolean,
      default: false,
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  opts
);

const Address = model("Address", addressSchema);

module.exports = Address;

/*

{
  _id: new ObjectId("640bb0c9d6aab31ded8b0136"),
  dataset_id: new ObjectId("640bb0c9d6aab31ded8b0130"),
  street_number: '376',
  route: 'Highfield Loop',
  city: 'Myrtle Beach',
  state: 'SC',
  __v: 0
}


*/
