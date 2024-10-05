import { Competition } from "@models/competition.schema";
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server";

await connectToDB();

export const GET = async (req, res) => {
    const userId = await verifyJWT(req);
    try {
        const allCompetitions = await Competition.find({ participants: { $in: [userId] } });

        if (!allCompetitions || allCompetitions.length === 0) {
            return new NextResponse("No competition found for the current user", { status: 400 });
        }

        return new NextResponse(JSON.stringify({ message: "Fetched competitions for the current user", data: allCompetitions }), { status: 200 });

    } catch (error) {
        return new NextResponse("Error occurred while fetching competitions: " + error.message, { status: 500 });
    }
};
