const path = require("path");
//LOAD ENV VARS
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "/config/config.env") });

const express = require("express");
const cors = require("cors");
require("colors");
require("./config/db");

const app = express();
const ErrorHandler = require("./middlewares/error");

app.use(express.json());
app.use(cors());

// importing routes
const CategoryRoutes = require("./routes/Transaction.route");
const TransactionRoutes = require("./routes/Transaction.route");

app.get("/", (req, res) => {
  res.json({
    title: "Welcome to Expense Tracker app backend",
  });
});

app.use("/api/categories", CategoryRoutes);
app.use("/api/transactions", TransactionRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || "5000";
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
