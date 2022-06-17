var express = require("express");
var router = express.Router();
const User = require("../models/users_db");
const expenseSchema = require("../models/expense_db");

//user middile ware
function islogin(req, res, next) {
  if (req.session.userData) {
    next();
  } else {
    res.redirect("/users/login");
  }
}
/* GET home page. */
// router.get("/", async (req, res, next) => {
router.get("/", islogin, async (req, res, next) => {
  // res.render("index", { user });
  console.log("req.session: ", req.session);

  // if (!req.session.isLoggedin) {
  //   res.redirect("/users/login");
  //   return;
  // }
  const currentMonth = new Date().getMonth();
  // console.log("currentMonth =: ", currentMonth);
  // console.log(req.session);
  const expenseArray = await expenseSchema.find({ month: currentMonth });
  const expense = expenseArray.pop();
  console.log("expense: ", expense);
  const user = await User.findById(req.session.userData._id);
  // const user = await User.findById("62a962a395ceb7ea11915a35");
  console.log("user: ", user);
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
  let Cmonth = [];

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

  console.log("Cmonth: ", Cmonth);
  console.log("expense: ", expense);
  const perDayCost = expense?.cost / expense?.totalMeal;
  console.log("perDayCost: ", perDayCost);
  const userCost = perDayCost * Cmonth.length;
  console.log("userCost: ", userCost);

  const userData = req.session.userData;
  res.render("index", { user: userData, userCost });
});

module.exports = router;
