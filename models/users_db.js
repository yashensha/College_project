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
  department: {
    type: String,
    required: true,
  },
  guardian: {
    type: String,
    required: true,
  },
  guardianNo: {
    type: Number,
    required: true,
  },
  admissionNo: {
    type: Number,
    required: true,
  },
  attendence: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", User);
