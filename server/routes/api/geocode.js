const router = require("express").Router();
const { get_address_geocode } = require("../../controllers/geocode");

router.get("/", get_address_geocode);

module.exports = router;
