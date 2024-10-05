import { Competition } from "@models/competition.schema"
import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { NextResponse } from "next/server"

await connectToDB();

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const userId = await verifyJWT(req);
    if (query != "all") {
        try {
            const thisCompetition = await Competition.aggregate([
                {
                    $match: {
                        slug: query
                    }
                },
                {
                    $lookup: {
                        from: "challenges", // name of the Challenges collection
                        let: { competitionSlug: "$slug" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [{ $toLower: "$compSlug" }, { $toLower: "$$competitionSlug" }]
                                    }
                                }
                            }
                        ],
                        as: "challenges"
                    }
                }
            ]);
            if (!thisCompetition) return new NextResponse("Error occured while fetching compettion" + error.message, { status: 400 })
            return new NextResponse(JSON.stringify({ message: "Fetched Relevant Competition", data: thisCompetition[0] }), { status: 200 })

        } catch (error) {
            return new NextResponse("Error occured while fetching all Competitions" + error.message, { status: 500 })
        }
    } else {
        try {
            const allCompetition = await Competition.find()
            console.log(allCompetition)
            if (!allCompetition) return new NextResponse("Error occured while fetching compettion" + error.message, { status: 400 })
            return new NextResponse(JSON.stringify({ message: "Fetched Relevant Competition", data: allCompetition }), { status: 200 })

        } catch (error) {
            return new NextResponse("Error occured while fetching all Competitions" + error.message, { status: 500 })
        }
    }

}
export const POST = async (req, res) => {
    const userId = await verifyJWT(req);
    console.log(userId)
    try {
        const { title, startDate, endDate, about, keywords } = await req.json();
        if (!title) {
            return new NextResponse("Please fill all required fields", { status: 400 })
        }

        const newCompetition = await Competition.create({
            slug: title.toLowerCase().replace(/[\s\-_]/g, ""),
            title,
            startDate,
            endDate,
            about,
            creator:userId,
            keywords,
        });
        if (!newCompetition) {
            return new NextResponse("Can't create new Competition", { status: 500 })
        }
        return new NextResponse(JSON.stringify({ message: "Created Competiton", data: newCompetition }), { status: 200 })
    } catch (error) {
        return new NextResponse("Error occured while creating Competitions" + error.message, { status: 500 })
    }
}
export const PATCH = async (req, res) => {
    const userId = await verifyJWT(req);
    try {
        const { slug, challenges, participants, about, tagline, startDate, EndDate, keyword } = await req.body;

        if (!slug && !challenges && !participants && !about && !tagline && !EndDate && !testcase && !keyword) {
            return new NextResponse("Credentials not given" + error.message, { status: 400 })
        }
        const updatedCompetition = await Competition.findOneAndUpdate(
            { slug: slug },
            { $set: { ...(challenges && { challenges }), ...(participants && { participants }), ...(about && { about }), ...(tagline && { tagline }), ...(startDate && { startDate }), ...(EndDate && { EndDate }), ...(keyword && { keyword }) } }
        );

        if (!updatedCompetition) {
            return new NextResponse("Competiton not updated.", { status: 400 })

        }
        return new NextResponse(JSON.stringify({ message: "Updated Said Competiton", data: updatedCompetition }), { status: 200 })
    } catch (error) {
        return new NextResponse("Error occured while updating Competiton" + error.message, { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const userId = await verifyJWT(req);
    try {
        const { slug } = await req.body;

        if (!slug) {
            return new NextResponse("Slug not found" + error.message, { status: 400 })
        }
        const Competition = await Competition.deleteOne({ slug: slug });

        if (!Competition) {
            return new NextResponse("Competiton can't ne Deleted.", { status: 400 })

        }
        return new NextResponse(JSON.stringify({ message: "Deleted Said Competiton", data: Competition }), { status: 500 })
    } catch (error) {
        return new NextResponse("Error occured while deleting Competiton" + error.message, { status: 500 })
    }
}