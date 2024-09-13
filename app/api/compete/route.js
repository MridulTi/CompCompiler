import { Competition } from "@models/competition.schema"
import { NextResponse } from "next/server"

export const GET=async(req,res)=>{
    try {
        const allCompetition=await Competition.find()
        console.log(allCompetition)
        if (!allCompetition) return new NextResponse("Error occured while fetching compettion"+error.message,{status:400})
        return new NextResponse(JSON.stringify({message:"Fetched Relevant Competition",data:allCompetition}),{status:500})

    } catch (error) {
        return new NextResponse("Error occured while fetching all Competitions"+error.message,{status:500})
    }
}