import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      // match: [
      //   /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/,
      //   "Password must contain one number,atleast one uppercase and one lowercase letters and one special character, with length of between 8 to 32 long",
      // ],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
