const onlyAdmin = (req, res, next) => {
  console.log("cookie: ", req.cookies);
  //   next(); // testing purposes
  console.log("onlyAdmin middle ware");
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json("unauthorized");
  }
};

const isLoggedin = (req, res, next) => {
  console.log("cookie: ", req.cookies);
  //   next(); // testing purposes
  console.log("isLoggedin middle ware");
  if (req.session.isLoggedin) {
    next();
  } else {
    res.status(401).json("unauthorized");
  }
};

module.exports = { onlyAdmin, isLoggedin };
