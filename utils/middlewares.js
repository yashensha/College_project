const onlyAdmin = (req, res, next) => {
  console.log("cookie: ", req.cookies);
  console.log("onlyAdmin middle ware");
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json("unauthorized");
  }
};
module.exports = { onlyAdmin };
