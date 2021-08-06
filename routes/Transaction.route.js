const express = require("express");
const {
  postCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
} = require("../controllers/Category.controller");

const Router = express.Router();

Router.route("/").post(postCategory).get(getAllCategories);
Router.route("/:id")
  .get(getOneCategory)
  .put(updateOneCategory)
  .delete(deleteOneCategory);

module.exports = Router;
