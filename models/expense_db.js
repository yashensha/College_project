const mongoose = require("mongoose");

const expence = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
      // unique: true,
    },
    totalMeal: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("expence", expence);
