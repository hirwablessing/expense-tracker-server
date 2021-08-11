const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction.model");
const ErrorResponse = require("../utils/ErrorResponse");

const postTransaction = asyncHandler(async (req, res, next) => {
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

const getAllTransactions = asyncHandler(async (req, res, next) => {
  let transactions = await Transaction.find();

  if (!transactions)
    return next(new ErrorResponse("Failed while fetching your transactions"));

  res.json({ success: true, data: transactions });
});

const getTotalIncomes = asyncHandler(async (req, res, next) => {
  let incomes = await Transaction.aggregate([
    { $match: { type: "income", user: req.user._id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  if (!incomes) {
    return next(new ErrorResponse("Getting incomes failed."));
  }

  if (incomes.length < 1) {
    return res.json({
      success: true,
      data: 0,
    });
  } else {
    return res.json({
      success: true,
      data: parseInt(incomes[0].total),
    });
  }
});

const getTotalExpenses = asyncHandler(async (req, res, next) => {
  let expenses = await Transaction.aggregate([
    { $match: { type: "expense", user: req.user._id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  if (!expenses) {
    return next(new ErrorResponse("Getting incomes failed."));
  }

  if (expenses.length < 1) {
    return res.json({
      success: true,
      data: 0,
    });
  } else {
    return res.json({
      success: true,
      data: parseInt(expenses[0].total),
    });
  }
});

const getTotalTransactions = asyncHandler(async (req, res, next) => {
  let transactions = await Transaction.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  console.log(transactions);

  if (!transactions) {
    return next(new ErrorResponse("Getting incomes failed."));
  }

  if (transactions.length < 1) {
    return res.json({
      success: true,
      data: 0,
    });
  } else {
    return res.json({
      success: true,
      data: parseInt(transactions[0].total),
    });
  }
});

const getTotalIncomesByMonth = asyncHandler(async (req, res, next) => {
  let transactions = await Transaction.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
        },
        total_income_month: { $sum: "$amount" },
      },
    },
  ]);

  if (!transactions) {
    return next(new ErrorResponse("Getting incomes failed."));
  }

  if (transactions.length < 1) {
    return res.json({
      success: true,
      data: 0,
    });
  } else {
    let newArr = [],
      newObj = {};
    transactions.map((trans) => {
      newObj = { month: trans._id.month, total: trans.total_income_month };
      newArr.push(newObj);
    });
    return res.json({
      success: true,
      data: newArr,
    });
  }
});

const getOneTransaction = asyncHandler(async (req, res, next) => {
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

const updateOneTransaction = asyncHandler(async (req, res, next) => {
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

const deleteOneTransaction = asyncHandler(async (req, res, next) => {
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

module.exports = {
  postTransaction,
  getAllTransactions,
  getTotalIncomes,
  getTotalIncomesByMonth,
  getTotalExpenses,
  getTotalTransactions,
  getOneTransaction,
  updateOneTransaction,
  deleteOneTransaction,
};
