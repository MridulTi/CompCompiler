import { Competition } from "@models/competition.schema"
import { Leaderboard } from "@models/leaderboard.schema"
import { verifyJWT } from "@utils/verifyjwt"
import { NextResponse } from "next/server"

export const GET=async(req)=>{
    try {
        const userId=await verifyJWT()
        const {slug}=await req.json();

        const compId=await Competition.findOne({slug}).select("_id");
        if (!compId) return new NextResponse("Couldn't fetch said Competition",{status:500});

        const allleaderboard= await Leaderboard.findOne({compId}).sort({ timeTaken: 1 });;
        
        if (!allleaderboard) return new NextResponse("Couldn't fetch leaderboard",{status:500});

        return new NextResponse({message:"Leaderboard fetched based on timetaken",data:allleaderboard},{status:200});
        
    } catch (error) {
        return new NextResponse("Error Fetching LeaderBoard",{status:500})
    }
}

export const POST=async(req)=>{
    try {
        const userId=await verifyJWT()
        const {slug,languageUsed,time}=await req.json()
        const competition=await Competition.findOne({slug}).select("_id startDate");

        if(!competition) return new NextResponse("Said competition not found",{status:400});
        const newleaderboard=new Leaderboard({
            compId:competition._id,
            userId,
            languageUsed,
            timetaken:time-competition.startDate
        })
        if (!newleaderboard) return new NextResponse("Error while creating leaderboard",{status:400});
        await newleaderboard.save()
        return new NextResponse({message:"new leaderboard created",data:newleaderboard},{status:201})
    } catch (error) {
        return new NextResponse("Error posting LeaderBoard: "+error.message,{status:500})
    }
}