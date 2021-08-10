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
const { protect } = require("../middlewares/Auth");

const Router = express.Router();

Router.route("/")
  .post(protect, postTransaction)
  .get(protect, getAllTransactions);
Router.route("/incomes").get(protect, getIncomes);
Router.route("/expenses").get(protect, getExpenses);
Router.route("/:id")
  .get(protect, getOneTransaction)
  .put(protect, updateOneTransaction)
  .delete(protect, deleteOneTransaction);

// Router.route("/").post(postTransaction).get(getAllTransactions);
// Router.route("/:id")
//   .get(getOneTransaction)
//   .put(updateOneTransaction)
//   .delete(deleteOneTransaction);

// Router.route("/incomes").get(getIncomes);
// Router.route("/expenses").get(getExpenses);

module.exports = Router;
