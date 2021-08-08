const express = require("express");
const {
  postTransaction,
  getAllTransactions,
  getOneTransaction,
  updateOneTransaction,
  deleteOneTransaction,
  getExpenses,
  getIncomes,
} = require("../controllers/Transaction.controller");

const Router = express.Router();

Router.route("/").post(postTransaction).get(getAllTransactions);
Router.route("/:id")
  .get(getOneTransaction)
  .put(updateOneTransaction)
  .delete(deleteOneTransaction);

Router.route("/incomes").get(getIncomes);
Router.route("/expenses").get(getExpenses);

module.exports = Router;
