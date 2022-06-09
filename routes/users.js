var express = require('express');
var router = express.Router();
const {signup} = require("../utils/userLogic")

const User = require("../models/users_db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/signup", (req, res) => {
  res.json("signup page");
});

router.post("/signup", (req, res) => {
  console.log("data", req.body);
  console.log("signup post");
  const myuser = new User(req.body);
  myuser.save(req.body).then(dbRes=>{
    console.log(dbRes);
  res.json(dbRes);
  })
  .catch(err=>{
    console.log('err: ', err);
    res.json(err)
  })
});

router.get("/login", (req,res)=>{
  res.json("login page");
})

router.post("/login", (req,res)=>{
  log
})

module.exports = router;
