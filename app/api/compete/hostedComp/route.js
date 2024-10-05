import { Competition } from "@models/competition.schema";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server";

await connectToDB();

export const GET = async (req, res) => {
    const userId = await verifyJWT(req);
    try {
        const allCompetition = await Competition.find({creator:userId})
        if (!allCompetition) return new NextResponse("Hosted Competition by current user" , { status: 400 });
        return new NextResponse(JSON.stringify({ message: "Fetched Competition hosted by current User", data: allCompetition }), { status: 200 })

    } catch (error) {
        return new NextResponse("Error occured while fetching all Competitions" + error.message, { status: 500 })
    }

}