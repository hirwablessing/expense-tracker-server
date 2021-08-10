const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const UserModel = require("../models/User.model");

//protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ErrorResponse(`Not authorized to access this service.`, 401)
    );
  }

  try {
    console.log("try block", token, " ", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded._id) {
      return next(
        new ErrorResponse(`Not authorized to access this service.`, 401)
      );
    }
    req.user = await UserModel.findById(decoded._id);
    if (!req.user._id) {
      return next(
        new ErrorResponse("Not Authorized to access this  service.", 401)
      );
    } else {
      next();
    }
  } catch (error) {
    // console.log("error: ", error);
    return next(error);
  }
});
