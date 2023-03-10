const { Schema, model } = require("mongoose");
const Address = require("./Address");
const User = require("./Users");

const opts = { toJSON: { virtuals: true } };

const datasetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address"
      }
    ]
  },
  {
    timestamps: true
  },
  opts
);

datasetSchema.virtual("address_count").get(function () {
  return this.addresses.length;
});

datasetSchema.post("findOneAndDelete", async function (doc) {
  let userId = doc.userId
  console.log(doc);
  if (doc) {
    await Address.deleteMany({
      _id: {
        $in: doc.addresses
      }
    });
    await User.updateOne(
      {_id: userId},
      { $pullAll: {datasets: [doc._id]} }
    );
  }
});

const Dataset = model("Dataset", datasetSchema);

module.exports = Dataset;
