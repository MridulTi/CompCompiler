import mongoose from "mongoose";

const leaderboardSchema=new mongoose.Schema({
    compId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Competition",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    languageUsed:[
        {
            type:String,
            required:true,
        }
    ],
    timetaken:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Leaderboard=mongoose.models.Leaderboard||mongoose.model("Leaderboard",leaderboardSchema)