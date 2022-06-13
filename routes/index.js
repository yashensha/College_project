var express = require("express");
var router = express.Router();
//user middile ware
function islogin(req, res, next) {
  if (req.session.userData) {
    next();
  } else {
    res.redirect("/users/login");
  }
}
/* GET home page. */
router.get("/", islogin, function (req, res, next) {
  user = req.session.userData;
  res.render("index", { user });
});

module.exports = router;
