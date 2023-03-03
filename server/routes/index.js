const router = require("express").Router();
const api_routes = require("./api");

const api_router = router.use("/api", api_routes);

module.exports = {api_router};
