import { Competition } from "@models/competition.schema";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server"

await connectToDB();

export const GET=async(req,res)=>{
    const userId=await verifyJWT(req);
    try {
        const {slug}=await req.body;
        
        if(!slug) return new NextResponse("Competititon Slug not defined",{status:400});
        
        const allParticipants=await Competition.findOne({slug:slug}).select('participants').populate('participants')
        
        if (!allParticipants)return new NextResponse("Couldn't fetch participants",{status:400});
        
        return new NextResponse(JSON.stringify({message:"All Participants fetched",data:allParticipants}),{status:500})
    } catch (error) {
        return new NextResponse("Error fetching participants for the said competiton"+error.message,{status:500})
    }
}
export const POST=async(req)=>{
    const userId=await verifyJWT(req)
    try {
        const {slug}=await req.body;
    
        if(!slug) return new NextResponse("Competititon Slug not defined",{status:400});
        
        const updatedCompetition=await Competition.findOneAndUpdate({slug:slug},
            {$push:{participants:userId}}
        )
        if (!updatedCompetition)return new NextResponse("Couldn't set participatnt",{status:400});
    
        return new NextResponse(JSON.stringify({message:"Participant set for the competition",data:updatedCompetition}),{status:500})
    } catch (error) {
        return new NextResponse("Error fetching participants for the said competiton"+error.message,{status:500})
    }
}