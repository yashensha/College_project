var express = require("express");
var router = express.Router();
const { onlyAdmin } = require("../utils/middlewares");

/* GET home page. */
router.get("/", onlyAdmin, (req, res, next) => {
  res.send("admin");
});

module.exports = router;
