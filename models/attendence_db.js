const mongoose = require("mongoose");

const Attendence = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    present: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Attendence", Attendence);
