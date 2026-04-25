const mongoose = require("mongoose");

const journalLineSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const journalEntrySchema = new mongoose.Schema(
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
    date: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sourceType: {
      type: String,
      default: "",
      trim: true,
    },
    sourceId: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },
    lines: {
      type: [journalLineSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.JournalEntry || mongoose.model("JournalEntry", journalEntrySchema);
