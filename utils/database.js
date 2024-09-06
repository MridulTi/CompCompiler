import mongoose from "mongoose"

let isConnected=false;

export const connectToDB=async()=>{
    console.log("CONNECT TO DB")
    mongoose.set('strictQuery',true);
    
    if(isConnected){
        console.log("MongoDB is already Connected!")
        return;
    }else{
        try {
            console.log(process.env.MONGODB_URI)
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:"compCompiler",
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            isConnected=true
            console.log("MongoDB Connected!")
        } catch (error) {
            console.log("MongoDB ERROR",error)
        }
    }

}