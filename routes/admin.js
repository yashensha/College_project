var express = require("express");
var router = express.Router();
const { onlyAdmin } = require("../utils/middlewares");
const User = require("../models/users_db");

/* GET home page. */
router.get("/", onlyAdmin, (req, res, next) => {
  res.send("admin");
});

router.get("/users", onlyAdmin, (req, res) => {
  User.find({}, "username")
    .then((dbRes) => {
      console.log("dbRes: ", dbRes);
      res.json(dbRes);
    })
    .catch((dbErr) => {
      console.log("dbErr: ", dbErr);
      res.status(500).json("internal server error");
    });
});

module.exports = router;
