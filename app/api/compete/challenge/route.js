import Challenge from "@models/challenge.schema.js";
import { NextResponse } from "next/server"

export const POST=async(req,res)=>{
    try {
        const {slug,difficulty,score}=await req.body;
        if (!slig || !difficulty || !score){
            return new NextResponse("Credentials not given entirely"+error.message,{status:400})
        }
        const newChallenge=new Challenge.create({
            slug,
            difficulty,
            score
        })
        if (!newChallenge){
            return  new NextResponse("Challenge not created", {status:400})
        }
        return new NextResponse(JSON.stringify({message:"Created Challenge",data:newChallenge}),{status:500})
    } catch (error) {
        return new NextResponse("Error occured while creating Challenge"+error.message,{status:500})
    }
}

export const PATCH=async(req,res)=>{
    try {
        const {slug,title,problemStatement,examples,input,output,testcase,keywords,hints}=await req.body;

        if (!slug&&!title&&!problemStatement&&!examples&&!input&&!output&&!testcase&&!keywords&&!hints){
            return new NextResponse("Credentials not given"+error.message,{status:400})
        }
        const updatedChallenge = await Challenge.findOneAndUpdate(
            { slug: slug },
            { $set: { ...(title && { title }), ...(problemStatement && { problemStatement }), ...(examples&&{examples}), ...(input&&{input}),...(output&&{output}),...(testcase&&{testcase}),...(keywords&&{keywords}),...(hints&&{hints}) } }
        );

        if(!updatedChallenge){
            return  new NextResponse("Challenge not updated.", {status:400})

        }
        return new NextResponse(JSON.stringify({message:"Updated Said Challenge",data:updatedChallenge}),{status:500})
    } catch (error) {
        return new NextResponse("Error occured while updating Challenge"+error.message,{status:500})
    }
}

export const DELETE=async(req,res)=>{
    try {
        const {slug}=await req.body;

        if (!slug){
            return new NextResponse("Slug not found"+error.message,{status:400})
        }
        const updatedChallenge = await Challenge.deleteOne({ slug: slug });

        if(!updatedChallenge){
            return  new NextResponse("Challenge can't ne Deleted.", {status:400})

        }
        return new NextResponse(JSON.stringify({message:"Deleted Said Challenge",data:updatedChallenge}),{status:500})
    } catch (error) {
        return new NextResponse("Error occured while deleting Challenge"+error.message,{status:500})
    }
}