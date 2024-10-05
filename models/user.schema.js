import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchemas = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      match: [
        /^[0-9A-Za-z]{6,16}$/,
        "Username invalid, Only Uppercase, lowercase and numbers are allowed, max. length of 16 characters",
      ],
    },
    uid:{
      type:String,
      required:true
    },
    password: {
      type: String,
      match: [
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/,
        "Password must contain one number,atleast one uppercase and one lowercase letters and one special character, with length of between 8 to 32 long",
      ],
      default:""
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
// userSchemas.pre("save", async function (next) {
//   console.log("Pre save hook triggered");
//   if (!this.isModified("password")) {
//     console.log("Password not modified");
//     return next();
//   }

//   try {
//     console.log("Hashing password");
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     next(error);
//   }
// });

userSchemas.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchemas.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.models.User || mongoose.model("User", userSchemas);

export default User;
