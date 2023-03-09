const router = require("express").Router();
const user_routes = require("./users");
const geocode_routes = require("./geocode");
const file_routes = require("./file_upload")

router.use("/user", user_routes);
router.use("/geocode", geocode_routes);
router.use("/file_upload", file_routes)

module.exports = router;
