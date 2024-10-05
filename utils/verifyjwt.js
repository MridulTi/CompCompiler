import User from "@models/user.schema";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const verifyJWT = async(req) => {
    try {
        const token = cookies()?.get("accessToken")?.value || null;
        console.log(token)
        const decodedToken = verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken)
        if (!decodedToken) return new NextResponse("Couln't verify: ", { status: 400 })
        
        const user=await User.findById(decodedToken?._id).select("-password ")   
        
        if(!user) return new NextResponse("Invalid user",{status:400})

        return user._id;
    } catch (error) {
        return new NextResponse("Couldn't Verify: "+error.message, { status: 500 });
    }
}