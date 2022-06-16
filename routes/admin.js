var express = require("express");
var router = express.Router();
const { onlyAdmin } = require("../utils/middlewares");
const User = require("../models/users_db");
const expenseSchema = require("../models/expense_db");

/* GET home page. */
router.get("/", onlyAdmin, (req, res, next) => {
  res.render("admin");
});

router.get("/users", onlyAdmin, (req, res) => {
  User.find()
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

/*
  GET: localhost:3000/admin/monthly/{monthId}
  ---
  monthId : 1-12
*/
router.get("/monthly/:month", onlyAdmin, async (req, res) => {
  let Cmonth = [];
  let findMonthNumber = req.params.month;
  let currentYear = new Date().getFullYear();

  console.log("param month: ", req.params.month);
  const allUser = await User.find();
  allUser.forEach((user) => {
    user.attendence.map((singleAttDate) => {
      let cm = singleAttDate.split("/")[1];
      let cy = singleAttDate.split("/")[2];
      if (cm == findMonthNumber && cy == currentYear) {
        // console.log(singleAttDate);
        Cmonth.push(singleAttDate);
      }
    });
  });

  res.json({ "mess month": Cmonth, length: Cmonth.length });
});

router.get("/expense", onlyAdmin, async (req, res) => {
  res.render("expense_form");
});

/*
  POST: localhost:3000/admin/expense_month
  ---
  body
    {
      "month": {no of month},
      "cost": {total cost of the month}
    }
*/
router.post("/expense_month", onlyAdmin, async (req, res) => {
  // router.post("/expense_month", async (req, res) => {

  let Cmonth = [];
  let findMonthNumber = req.body.month;
  let currentYear = new Date().getFullYear();

  const allUser = await User.find();
  allUser.forEach((user) => {
    user.attendence.map((singleAttDate) => {
      let cm = singleAttDate.split("/")[1];
      let cy = singleAttDate.split("/")[2];
      if (cm == findMonthNumber && cy == currentYear) {
        // console.log(singleAttDate);
        Cmonth.push(singleAttDate);
      }
    });
  });

  console.log("Cmonth: ", Cmonth);
  req.body.totalMeal = Cmonth.length;
  let nowExpence = new expenseSchema(req.body);
  nowExpence
    .save()
    .then((dbRes) => {
      res.json("success");
    })
    .catch((err) => {
      console.log(err);
      res.json("error");
    });
});

/*
  GET: localhost:3000/admin/expense_month/:monthNo
  ---
  monthNo : 1-12
*/
// router.get("/expense_month/:monthNo", async (req, res) => {
router.get("/expense_month/:monthNo", onlyAdmin, async (req, res) => {
  // console.log("param monthNo: ", req.params.monthNo);
  let monthExp = await expenseSchema.find(
    { month: req.params.monthNo },
    "month totalMeal cost"
  );
  // console.log("monthExp: ", monthExp);
  res.json(monthExp);
});

module.exports = router;
