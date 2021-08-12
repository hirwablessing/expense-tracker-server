const express = require("express");
const {
  postTransaction,
  getAllTransactions,
  getOneTransaction,
  updateOneTransaction,
  deleteOneTransaction,
  getTotalExpenses,
  getTotalIncomes,
  getTotalTransactions,
  getTotalIncomesByMonth,
  getTotalExpensesByMonth,
  getHighestExpense,
} = require("../controllers/Transaction.controller");
const { protect } = require("../middlewares/Auth");

const Router = express.Router();

Router.route("/")
  .post(protect, postTransaction)
  .get(protect, getAllTransactions);
Router.route("/incomes").get(protect, getTotalIncomes);
Router.route("/incomes/total-month").get(protect, getTotalIncomesByMonth);
Router.route("/expenses").get(protect, getTotalExpenses);
Router.route("/expenses/highest").get(protect, getHighestExpense);
Router.route("/expenses/total-month").get(protect, getTotalExpensesByMonth);
Router.route("/total").get(protect, getTotalTransactions);
Router.route("/:id")
  .get(protect, getOneTransaction)
  .put(protect, updateOneTransaction)
  .delete(protect, deleteOneTransaction);

module.exports = Router;
