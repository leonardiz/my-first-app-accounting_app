const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    industry: {
      type: String,
      default: "",
      trim: true,
    },
    businessType: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    currency: {
      type: String,
      default: "NGN",
      trim: true,
      uppercase: true,
    },
    country: {
      type: String,
      default: "",
      trim: true,
    },
    stateProvince: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    financialYearStart: {
      type: String,
      default: "",
      trim: true,
    },
    billApprovalThreshold: {
      type: Number,
      default: 100000,
    },
  },
  {
    timestamps: true,
  },
);

companySchema.index({ userId: 1, name: 1 });

module.exports = mongoose.models.Company || mongoose.model("Company", companySchema);
