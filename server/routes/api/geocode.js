const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("You hit home route");
});

module.exports = router;
