const router = require("express").Router();
const user_routes = require("./users");
const geocode_routes = require("./geocode");
const file_routes = require("./file_upload");
const dataset_routes = require("./datasets");
const address_routes = require("./address");

router.use("/user", user_routes);
router.use("/geocode", geocode_routes);
router.use("/file_upload", file_routes);
router.use("/datasets", dataset_routes);
router.use("/address", address_routes);

module.exports = router;
