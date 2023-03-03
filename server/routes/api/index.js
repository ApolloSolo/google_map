const router = require("express").Router();
const user_routes = require("./users");
const geocode_routes = require("./geocode");

router.use("/user", user_routes);
router.use("/geocode", geocode_routes);

module.exports = router;
