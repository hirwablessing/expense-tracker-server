const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Add amount for this transaction"],
  },
  type: {
    type: String,
    required: [true, "Transaction type is required"],
    enum: ["income", "expense"],
  },
  mode: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  note: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Transaction Creator is required"],
    ref: "User",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
