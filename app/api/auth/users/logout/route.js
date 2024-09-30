import { connectToDB } from "@utils/database";
import { verifyJWT } from "@utils/verifyjwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

await connectToDB();

export const POST = async (req) => {
    const userId = await verifyJWT()

    try {
        
        const options = {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        };
        cookies().set("accessToken", "", options);

        return new NextResponse(
            JSON.stringify({ message: "User is logged out successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse("Error Logging User Out: " + error.message, {
            status: 500,
        });
    }
};