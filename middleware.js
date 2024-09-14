// import User from './models/user.schema';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request){
    // const path=request.nextUrl.pathname;

    // const isPublicPath=(path.includes('/login') || path.includes('/signup'));
    // const token=cookies()?.get("accessToken")?.value|| null;
    
    // console.log(token)
    // const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    // // const user=await User.findById(decodedToken?._id).select("-password ")
    
    // // if(!user) return new NextResponse("Invalid user"+error.message,{status:400})
    
    // request.user=user;
    // if (token && ! isPublicPath){
    //     return new NextResponse.next();
    // }else if (!token && !isPublicPath){
    //     return new NextResponse.redirect(new URL("/",request.url))
    // }
    return NextResponse.next();
}
