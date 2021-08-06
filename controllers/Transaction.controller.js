const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction.model");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.postTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.create({
    ...req.body,
    user: req.user._id,
  });
  if (!transaction) {
    return next(new ErrorResponse("Failed while creating transaction..."));
  }
  res.json({
    success: true,
    data: transaction,
  });
});

module.exports.getIncomes = asyncHandler(async (req, res, next) => {
  let transactions = await Transaction.find({
    type: "income",
    user: req.user._id,
  });

  if (!transaction)
    return next(new ErrorResponse("Failed while fetching your incomes"));

  res.json({ success: true, data: transactions });
});

module.exports.getExpenses = asyncHandler(async (req, res, next) => {
  let expenses = await Transaction.find({
    type: "expense",
    user: req.user._id,
  });
  if (!expenses) {
    return next(new ErrorResponse("Getting incomes failed."));
  }
  res.json({
    success: true,
    data: expenses,
  });
});

module.exports.getOneTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("category");
  if (!transaction) {
    return next(
      new ErrorResponse("Problem happened while fetching a cateogory.")
    );
  }
  res.json({
    success: true,
    data: transaction,
  });
});

module.exports.updateOneTransaction = asyncHandler(async (req, res, next) => {
  let updatedTransaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedTransaction) {
    return next(new ErrorResponse("updating transaction failed."));
  }
  res.json({
    success: true,
    data: updatedTransaction,
  });
});

module.exports.deleteOneTransaction = asyncHandler(async (req, res, next) => {
  let deletedTransaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deletedTransaction) {
    return next(
      new ErrorResponse("Problem happened while deleting a transaction.")
    );
  }
  res.json({
    success: true,
    data: deletedTransaction,
  });
});
