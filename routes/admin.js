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
  User.find({}, "username attendence")
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

router.get("/attendence/:userId", onlyAdmin, async (req, res) => {
  // console.log("attendence list");
  // console.log("req.params: ", req.params);
  // attendence
  //   .find({ username: req.params.userId }, "username created_at")
  //   .then((dbRes) => {
  //     console.log("dbRes: ", dbRes.length);
  //     res.json(dbRes);
  //   })
  //   .catch((dbErr) => {
  //     console.log("dbErr: ", dbErr);
  //     res.status(500).json("internal server error");
  //   });

  const user = await User.findById(req.params.userId);
  // console.log("user: ", user);
  var nowDate = new Date();
  var date =
    nowDate.getDate() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getFullYear();
  // console.log("date: ", date);
  let old = 1 + "/" + nowDate.getMonth() + "/" + nowDate.getFullYear();
  let attendence = user.attendence;
  var Cmonth = [];

  var om = old.split("/")[1];
  var oy = old.split("/")[2];
  // console.log("oy: ", oy);
  attendence.map((a) => {
    var cm = a.split("/")[1];
    var cy = a.split("/")[2];
    if (cm == om && cy == oy) {
      console.log(a);
      Cmonth.push(a);
    }
  });

  console.log("attendence: ", Cmonth);
  res.json(Cmonth);
});

module.exports = router;
