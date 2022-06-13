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
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login");
});
module.exports = router;
