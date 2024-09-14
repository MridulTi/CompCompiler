import mongoose from "mongoose";

const prizeSchema=new mongoose.Schema({
    firstPlace:{
        type:String,
        required:true
    },
    secondPlace:{type:String},
    thirdPlace:{type:String}
})
export const Prize=mongoose.model("Prize",prizeSchema)

const compSchema=new mongoose.Schema({
    slug:{
        type:String,
        unique:true,
        required:true,
    },
    challenges:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Challenge"
        }
    ],
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    title:{
        type:String,
        required:true,
    },
    about:{
        type:String,
    },
    prize:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prize"
    },
    tagline:{type:String},
    startDate:{type:Date},
    EndDate:{type:Date},
    keyword:[
        {type:String}
    ],
    moderators:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]


},{timestamps:true})

export const Competition=mongoose.models.Competition||mongoose.model("Competition",compSchema)