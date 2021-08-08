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
      new ErrorResponse(`Not authorized to access this service`, 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    if (!decoded.id) {
      return next(
        new ErrorResponse(`Not authorized to access this service`, 401)
      );
    }
    req.user = await UserModel.findById(decoded.id);
    if (!req.user._id) {
      return next(
        new ErrorResponse("Not Authorized to access this  service", 401)
      );
    }
    next();
  } catch (error) {
    return next(
      new ErrorResponse(`Not authorized to access this service`, 401)
    );
  }
});
