const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User.model");
const ErrorResponse = require("../utils/ErrorResponse");

const registerUser = asyncHandler(async (req, res, next) => {
  let userData = ({ names, email, passwords } = req.body);

  // check uniqueness of email
  if (userData.email && (await UserModel.findOne({ email: userData.email }))) {
    return next(new ErrorResponse("User with this email already exists"));
  }

  const newUser = await UserModel.create(userData);
  if (newUser) {
    await sendTokenResponse(newUser, 200, res);
  } else {
    return next(new ErrorResponse("Registration failed.", 500));
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Enter email and password", 400));
  }
  let user;
  user = await UserModel.findOne({ email }).select("+password");

  if (user) {
    if (!(await user.comparePasswords(password))) {
      user = null;
    }
  }

  if (!user) {
    return next(new ErrorResponse("Invalid credentials.", 401));
  }
  await sendTokenResponse(user, 200, res);
});

const updateUser = asyncHandler(async (req, res, next) => {
  //Update user profile
  const userData = ({ names, email } = req.body);
  if (!userData.names && !userData.email) {
    return next(new ErrorResponse("no new info provided", 400));
  }

  let updateduser = await UserModel.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  });
  if (!updateduser) {
    return next(new ErrorResponse("Error occured", 500));
  }
  res.json({
    success: true,
    data: updateduser,
  });
});

//send token as a response
const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
});

module.exports = { registerUser, loginUser, updateUser };
