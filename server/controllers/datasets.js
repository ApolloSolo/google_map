const { Dataset, Address, User } = require("../models");

const get_user_datasets = async (req, res) => {
  try {
    const user_datasets = await Dataset.find({ userId: req.user._id }).select(
      "-__v"
    );

    if (!user_datasets.length) {
      res.status(404);
      throw new Error("User datasets could not be found.");
    }

    res.status(200).json({ error: false, success: true, data: user_datasets });
  } catch (error) {
    console.log(error);
    res.json({ error: true, success: false, message: error.message });
  }
};

const get_one_dataset = async (req, res) => {
  try {
    const { _id } = req.params;
    const found_dataset = await Dataset.findById(_id)
      .populate("addresses")
      .select("-__v");
    if (!found_dataset) {
      throw new Error("The dataset you are looking for could not be found.");
    }
    res.status(200).json({ error: false, success: true, data: found_dataset });
  } catch (error) {
    console.log(error);
    res.json({ error: true, success: false, message: error.message });
  }
};

const delete_one_dataset = async (req, res) => {
  try {
    const { _id } = req.params;
    const found_dataset = await Dataset.findOneAndDelete({ _id });

    if (!found_dataset) {
      throw new Error("The dataset you are looking for could not be found.");
    }
    res.status(201).json({ error: false, success: true, data: found_dataset });
  } catch (error) {
    console.log(error);
    res.json({ error: true, success: false, message: error.message });
  }
};

const update_dataset_name = async (req, res) => {
  try {
    const { _id } = req.params;

    const found_dataset = await Dataset.findByIdAndUpdate(
      _id,
      { dataset_name: req.body.name },
      { new: true }
    );

    res.json(found_dataset);
    console.log(found_dataset);
  } catch (error) {
    console.log(error);
    res.json({ error: true, success: false, message: error.message });
  }
};

module.exports = {
  get_user_datasets,
  get_one_dataset,
  delete_one_dataset,
  update_dataset_name,
};
