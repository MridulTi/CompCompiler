import User from "@models/user.schema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET=async()=>{
    try {
        await connectToDB();
        const users=await User.find();

        return new NextResponse(JSON.stringify(users),{status:200})
    } catch (error) {
        return new NextResponse("Error in fetching users"+error.message,{status:500})
    }
}

// if we add (auth) then we don't need to mention auth when makign api call 

// User Registration
export const POST=async(req)=>{
    const {searchParams}=new URL(req.url)
    const action=searchParams.get('action')
    console.log(action)
    if (action==="register"){
        try {
            const {email,username,password}=await req.body;
            const newUser=new User({email,username,password})
            await newUser.save()
            return new NextResponse(JSON.stringify({message:"User is created",data:newuser}),{status:200})
    
        } catch (error) {
            return new NextResponse("Error Registering user"+error.message,{status:500})
        }
    }else if(action==="login"){
        try {
            const {email,password}=await req.body;
            const user=await User.findOne(email)
            if(!user){
                return new NextResponse(JSON.stringify({message:"Can't find the said user"}),{status:400})
            }
            if (user.password!=password){
                return new NextResponse(JSON.stringify({message:"Incorrect password"}),{status:400})
            } 
            return new NextResponse(JSON.stringify({message:"User is logged in",data:user}),{status:200})
        } catch (error) {
            return new NextResponse("Error Logging User In"+error.message,{status:500})
            
        }
    }
    
}

// Updating User details
export const PATCH=async(req)=>{
    try {
        const body=await req.body;
        const {email,username,password,image}=body

        if(!email&&!username&&!password&&!image){
            return new NextResponse(JSON.stringify({message:"Nothing mentioned to update"}),{status:400})
        }

        const user=await User.findOneAndUpdate({email},{body},{new:true});

        if (!user) return new NextResponse(JSON.stringify({message:"User not foudn in the DB"}),{status:400});

        return new NextResponse(JSON.stringify({message:"User is updated",data:user}),{status:200})

    } catch (error) {
        return new NextResponse("Error Updating user details"+error.message,{status:500})
        
    }
}

// Deleting specific user by Id
export const DELETE=async(req)=>{
    try {
        const {id}=req.params;
        const user=await User.findByIdAndDelete({id});

        if (!user) return new NextResponse(JSON.stringify({message:"User not foudn in the DB"}),{status:400});

        return new NextResponse(JSON.stringify({message:"User is DELETED",data:user}),{status:200})
        
    } catch (error) {
        return new NextResponse("Error DELETING user"+error.message,{status:500})
        
    }
}

