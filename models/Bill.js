const mongoose = require("mongoose");

const billLineSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const billSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    billNumber: {
      type: String,
      required: true,
      trim: true,
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    supplierEmail: {
      type: String,
      default: "",
      trim: true,
    },
    billDate: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      required: true,
      trim: true,
    },
    lineItems: {
      type: [billLineSchema],
      default: [],
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    taxPercentage: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "Received", "Paid", "Overdue"],
      default: "Draft",
    },
    approvalStatus: {
      type: String,
      enum: ["Not Required", "Pending Approval", "Approved", "Rejected"],
      default: "Not Required",
    },
  },
  {
    timestamps: true,
  },
);

billSchema.index({ userId: 1, companyId: 1, billNumber: 1 }, { unique: true });

module.exports = mongoose.models.Bill || mongoose.model("Bill", billSchema);
