var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", (req, res) => {
  res.json("signup page");
});

// router.post("/signup", (req, res) => {
//   console.log("signup post");
//   res.json("foo");
// });

router.post("/signup", (req, res) => {
  console.log("data", req.body);
  console.log("signup post");
  res.json("foo");
});

router.get("/admin");

module.exports = router;
