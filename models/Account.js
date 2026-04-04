const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Asset", "Liability", "Equity", "Revenue", "Expense"],
    },
    openingBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

accountSchema.index({ userId: 1, code: 1 }, { unique: true });

module.exports = mongoose.models.Account || mongoose.model("Account", accountSchema);
