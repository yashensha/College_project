const mongoose = require("mongoose");

const attendence = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    present: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("attendence", attendence);
