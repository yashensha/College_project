var express = require("express");
var router = express.Router();
const { onlyAdmin } = require("../utils/middlewares");
const User = require("../models/users_db");
const attendence = require("../models/attendence_db");

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

  // attendence({ username: "62a1f3611735e6a8222f5455" }).save();
});

router.get("/attendence/:userId", onlyAdmin, (req, res) => {
  console.log("attendence list");
  console.log("req.params: ", req.params);
  attendence
    .find({ username: req.params.userId }, "username created_at")
    .then((dbRes) => {
      console.log("dbRes: ", dbRes.length);
      res.json(dbRes);
    })
    .catch((dbErr) => {
      console.log("dbErr: ", dbErr);
      res.status(500).json("internal server error");
    });
});

module.exports = router;
