const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/UserController");
const { protect } = require("../middlewares/Auth");
const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.put("/update", protect, updateUser);

module.exports = Router;
