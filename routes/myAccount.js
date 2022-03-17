const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("./entries/myAccount");
});

module.exports = router;
