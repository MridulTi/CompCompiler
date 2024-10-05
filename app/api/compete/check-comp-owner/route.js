import { Competition } from "@models/competition.schema";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server"

await connectToDB();

export const POST=async(req,res)=>{
    try {
        const UserId=await verifyJWT(req)
        const {slug}=await req.json()
        if (!slug) return new NextResponse({message:"Slug not Specified"},{status:400});

        const userId=await Competition.findOne({slug:slug}).select('creator')
        if (!userId) return new NextResponse({message:"Competition not found"},{status:400});

        if (userId.creator.equals(UserId)) { // Use .equals() for ObjectId comparison
            return new NextResponse(JSON.stringify({ message: "Validated creator", validUser: true }), { status: 200 });
        }
        return new NextResponse(JSON.stringify({message:"You are not the creator of this competition",validUser:false}),{status:200})

    } catch (error) {
        return new NextResponse("Error Checking Creator of Comp"+error.message,{status:500})
    }
}