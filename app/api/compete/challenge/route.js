import Challenge from "@models/challenge.schema.js";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server"

await connectToDB()

export const POST=async(req,res)=>{
    const userId=await verifyJWT(req);
    try {
        const {title,difficulty,score}=await req.json();
        if (!title || !difficulty || !score){
            return new NextResponse("Credentials not given entirely"+error.message,{status:400})
        }
        const newChallenge=new Challenge({
            slug:title.toUpperCase().replace(/[\s\-_]/g, ""),
            title,
            difficulty,
            score
        })
        if (!newChallenge){
            return  new NextResponse("Challenge not created", {status:400})
        }
        await newChallenge.save();
        return new NextResponse(JSON.stringify({message:"Created Challenge",data:newChallenge}),{status:200})
    } catch (error) {
        return new NextResponse("Error occured while creating Challenge"+error.message,{status:500})
    }
}

export const PATCH=async(req,res)=>{
    const userId=await verifyJWT(req);
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
    const userId=await verifyJWT(req);
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