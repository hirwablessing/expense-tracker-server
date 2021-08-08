const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, "Names are required"],
    minlength: [3, "names must be at least 3 characters"],
    maxlength: [255, "names must not be more than 255 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email",
    ],
    unique: [true, "email already taken"],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [255, "password must not be more than 255 characters"],
    required: [true, "Please add a password"],
    select: false,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign Jwt
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

//match passwords
UserSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
