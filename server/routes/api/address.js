const router = require("express").Router();
const protected = require("../../middleware/auth");
const {
  get_one_address,
  remove_one_address,
  edit_address
} = require("../../controllers/address");

router.get("/:_id", protected, get_one_address);
router.delete("/:_id", protected, remove_one_address);
router.put("/edit/:_id", protected, edit_address);

module.exports = router;
