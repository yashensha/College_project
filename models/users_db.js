const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", User);
