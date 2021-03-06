var express = require("express");
var router = express.Router();
const { signup } = require("../utils/userLogic");
const bcrypt = require("bcrypt");
const User = require("../models/users_db");
const expenseSchema = require("../models/expense_db");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.redirect("/");
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
  console.log("body: ", req.body);
  User.findOne({
    phone: req.body.phone,
  })
    .then((user) => {
      if (!user) {
        res.json("No user found");
      } else {
        console.log("user: ", user);
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            console.log("result: ", result);
            if (result) {
              req.session.isLoggedin = true;
              req.session.isAdmin = user.isAdmin;
              req.session.userData = user;
              console.log("login succs");
              if (user.isAdmin) {
                res.redirect("/admin");
              } else {
                res.redirect("/");
              }
            } else {
              console.log("login err");
              console.log("err: ", err);
              res.json("credentials missmatch");
            }
          }
        );
      }
    })
    .catch((e) => {
      console.log("err: ", e);
      res.status(500).json("Contact Administrator");
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

router.get("/attendence/:id", async (req, res) => {
  console.log("id: ", req.params.id);
  var nowDate = new Date();
  var date =
    nowDate.getDate() +
    "/" +
    (nowDate.getMonth() + 1) +
    "/" +
    nowDate.getFullYear();
  // console.log("date: ", date);
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

/*
  GET: localhost:3000/users/monthAttendence/{userId}
  ---
  userId : {mongodb Object Id}
*/
//select monthwise atendence of a user
router.get("/monthAttendence/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  // console.log("user: ", user);
  const nowDate = new Date();
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

  const monthExpArray = await expenseSchema.find(
    { month: nowDate.getMonth() },
    "month cost totalMeal"
  );
  const monthExp = monthExpArray.pop();
  console.log("monthExp: ", monthExp);

  const cost = monthExp.cost / monthExp.totalMeal;
  console.log("cost: ", cost);

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
  res.json({ cost, attendence: Cmonth });
});

module.exports = router;
