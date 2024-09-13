import mongoose from "mongoose";

const challengeSchema=mongoose.Schema({
    slug:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
        enum:["Easy","Medium","Hard"]
    },
    Score:{
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
    keywords:[
        {
            type:String
        }
    ],
    hints:[{type:String}]

},{timestamps:true})

export const Challenge=mongoose.model("Challenge",challengeSchema)