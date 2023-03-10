const read_csv = require("../utils/read_csv");

const upload_csv = async (req, res) => {
  console.log("HITTING UPLOAD CSV ROUTE!");
  console.log(req.file.path);
  try {
    const file_data = await read_csv(req.file.path);
    console.log(file_data);

    res.status(201).json(file_data);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

module.exports = { upload_csv };
