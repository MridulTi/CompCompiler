import mongoose from "mongoose";

const challengeSchema=new mongoose.Schema({
    slug:{
        type:String,
        unique:true,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
        enum:["easy","medium","hard"]
    },
    score:{
        type:String,
        required:true
    },
    title:{type:String},
    problemStatement:{type:String},
    examples:[
        {
            Input:{type:String},
            Output:{type:String},
            Explanation:{type:String}
        }
    ],
    input:{type:String},
    output:{type:String},
    testcase:[
        {
            Input:{type:String},
            Output:{type:String},
        }
    ],
    compSlug:{type:String,required:true},
    keywords:[
        {
            type:String
        }
    ],
    hints:[{type:String}]

},{timestamps:true})

const Challenge=mongoose.models.Challenge||mongoose.model("Challenge",challengeSchema)
export default Challenge