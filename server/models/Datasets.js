const { Schema, model } = require("mongoose");

const datasetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* datasetSchema.virtual("address_count").get(function () {
    return this.addresses.length;
  }); */

const Dataset = model("Dataset", datasetSchema);

module.exports = Dataset;
