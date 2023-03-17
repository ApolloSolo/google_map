const router = require("express").Router();
const {
  get_address_geocode,
  geocode_dataset,
} = require("../../controllers/geocode");
const protected = require("../../middleware/auth");

router.get("/", protected, get_address_geocode);
router.put("/:_id", protected, geocode_dataset);

module.exports = router;
