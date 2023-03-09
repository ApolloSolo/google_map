const router = require("express").Router();
const { upload_csv } = require("../../controllers/file_upload");
const multer = require("multer");
const fs = require("node:fs");
const csv = require("csv-parser");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: 'uploads/' });

router.post("/csv", upload.single("file"), (req, res) => {
  console.log("HITTING UPLOAD CSV ROUTE!");
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        fs.unlinkSync(req.file.path);
        console.log(results);
        res.send("FILE UPLOADED");
      });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

module.exports = router;
