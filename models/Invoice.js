const mongoose = require("mongoose");

const invoiceLineSchema = new mongoose.Schema(
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

const invoiceSchema = new mongoose.Schema(
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
    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      default: "",
      trim: true,
    },
    invoiceDate: {
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
      type: [invoiceLineSchema],
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
      enum: ["Draft", "Sent", "Paid", "Overdue"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  },
);

invoiceSchema.index({ userId: 1, companyId: 1, invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
