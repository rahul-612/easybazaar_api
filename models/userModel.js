const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");      //built-in module

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//save hone se phele ye chelga
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);       //this.password means jo database m us user ka password ha
}

//Generating Password Reset Token
  userSchema.methods.getResetPasswordToken= function (){

  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");  //crypto buffer value pass kr rha to usko string m convert kr rhe h

  //Hashing and adding resetPasswordToken to UserSchema
 this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");    //sha256 ek hashing algo h cyrpto ka

  //yani 15 din ko phele seconds m convert kia phir miliseconds m
  this.resetPasswordExpire=Date.now()+15*60*1000;

  return resetToken;

  // yaani ye resetToken hum user k mail p bhejege wha ek link ayegi uspe wo click kr k password change kr payega
}

module.exports = mongoose.model("User", userSchema);