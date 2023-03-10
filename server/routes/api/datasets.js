const router = require("express").Router();
const {
  get_user_datasets,
  get_one_dataset,
  delete_one_dataset
} = require("../../controllers/datasets");
const protected = require("../../middleware/auth");

router.get("/mutli/:id", protected, get_user_datasets);
router.get("/:_id", protected, get_one_dataset);
router.delete("/:_id", protected, delete_one_dataset);

module.exports = router;
