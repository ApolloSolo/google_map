const router = require("express").Router();
const geocode_routes = require("./geocode");

router.use("/geocode", geocode_routes);

module.exports = router