import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET=async(req,res)=>{
    cookies().delete("accessToken")
    return new NextResponse({ message: 'Cookie removed successfully' },{status:200});
}

export const POST=async(req,res)=>{
    const { token } = await req.json();

    const options = {
        httpOnly: true,
        secure: true,
    };
    cookies().set("accessToken", token, options)

    return new NextResponse({ message: 'Cookie set successfully' },{status:200});
}