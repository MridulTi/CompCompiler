import mongoose from "mongoose";
import {hash,compare} from 'bcrypt'
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
    password: {
      type: String,
      match: [
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/,
        "Password must contain one number,atleast one uppercase and one lowercase letters and one special character, with length of between 8 to 32 long",
      ],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchemas.pre("save",async function(next){
  console.log("Fgdfgd")
  if(!this.isModified("password")) return next();

  this.password=await hash(this.password,10);
  next()
})

userSchemas.methods.isPasswordCorrect=async function(password){
  console.log(password)
  return await compare(password,this.password)
}
userSchemas.methods.generateAccessToken=async function(){
  return await jwt.sign(
      {
          _id:this._id,
          email:this.email,
          username:this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

const User = mongoose.models.User || mongoose.model("User", userSchemas);

export default User;
