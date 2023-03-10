const router = require("express").Router();
const { upload_csv } = require("../../controllers/file_upload");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

router.post("/csv", upload.single('file'), upload_csv);

module.exports = router;
