var createError = require("http-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "loremispum", cookie: { maxAge: 10 * 60000 } }));
app.use(express.static(path.join(__dirname, "public")));

const MONGODB_URI =
  "mongodb+srv://yasi:yasi@cluster0.zv7srq2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, () => {
  console.log("db connected");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
