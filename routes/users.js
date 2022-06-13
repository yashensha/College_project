var express = require("express");
var router = express.Router();
const { signup } = require("../utils/userLogic");
const bcrypt = require("bcrypt");
const User = require("../models/users_db");
const async = require("hbs/lib/async");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  console.log("data", req.body);
  // console.log("signup post");
  // const myuser = new User(req.body);
  // myuser
  //   .save(req.body)
  //   .then((dbRes) => {
  //     res.redirect("/users/login");
  //   })
  //   .catch((err) => {
  //     console.log("err: ", err);
  //     res.json(err);
  //   });

  bcrypt.hash(req.body.password, 5, async function (err, hash) {
    const newUser = await new User({
      username: req.body.username,
      password: hash,
      phone: req.body.phone,
      department: req.body.department,
      guardian: req.body.guardian,
      guardianNo: req.body.guardianNo,
      admissionNo: req.body.admissionNo,
    });

    const user = await newUser.save();
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result == true) {
        req.session.isLoggedin = true;
        req.session.userData = user;
        console.log("login succs");
        res.redirect("/");
      } else {
        console.log("login err");
      }
    });
  });

  // .then((dbRes) => {
  //   // console.log("dbRes: ", dbRes);
  //   console.log("db data: ", JSON.parse(JSON.stringify(dbRes)));
  //   req.session.isLoggedin = true;
  //   req.session.userData = JSON.parse(JSON.stringify(dbRes));
  //   console.log("dbRes.isAdmin: ", dbRes.isAdmin);
  //   req.session.isAdmin = dbRes.isAdmin;
  //   // req.session.isAdmin = true;
  //   res.json("login success");
  // })
  // .catch((dbErr) => {
  //   console.log("dbErr: ", dbErr);
  //   res.status(500).json("internal server error");
  // });
});

//log out
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login");
});

//attendenece marking

router.get("/addatendence/:id", async (req, res) => {
  var nowDate = new Date();
  var date =
    nowDate.getDate() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getFullYear();
  try {
    const user = await User.findById(req.params.id);
    if (!user.attendence.includes(date)) {
      await user.updateOne({ $push: { attendence: date } });
      res.status(200).json("attendence added");
    } else {
      res.status(403).redirect("/");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//select monthwise atendence of a user
router.get("/monthAttendence/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  var nowDate = new Date();
  var date =
    nowDate.getDate() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getFullYear();
  var old = 1 + "/" + nowDate.getMonth() + "/" + nowDate.getFullYear();
  attendence = user.attendence;
  var Cmonth = [];

  var om = old.split("/")[1];
  var oy = old.split("/")[3];
  attendence.map((a) => {
    var cm = a.split("/")[1];
    var cy = a.split("/")[3];
    if (cm == om && cy == oy) {
      console.log(a);
    }
  });
});

module.exports = router;
