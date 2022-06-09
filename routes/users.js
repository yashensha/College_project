var express = require("express");
var router = express.Router();
const { signup } = require("../utils/userLogic");

const User = require("../models/users_db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", (req, res) => {
  res.json("signup page");
});

router.post("/signup", (req, res) => {
  console.log("data", req.body);
  console.log("signup post");
  const myuser = new User(req.body);
  myuser
    .save(req.body)
    .then((dbRes) => {
      console.log(dbRes);
      res.json(dbRes);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.json(err);
    });
});

router.get("/login", (req, res) => {
  res.json("login page");
});

router.post("/login", (req, res) => {
  console.log("body: ", req.body);
  console.log("user login");
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbRes) => {
      // console.log("dbRes: ", dbRes);
      console.log("db data: ", JSON.parse(JSON.stringify(dbRes)));
      req.session.isLoggedin = true;
      req.session.userData = JSON.parse(JSON.stringify(dbRes));
      console.log("dbRes.isAdmin: ", dbRes.isAdmin);
      req.session.isAdmin = dbRes.isAdmin;
      // req.session.isAdmin = true;
      res.json("login success");
    })
    .catch((dbErr) => {
      console.log("dbErr: ", dbErr);
      res.status(500).json("internal server error");
    });
});

module.exports = router;
