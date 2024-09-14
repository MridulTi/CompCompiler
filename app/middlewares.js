import { NextResponse } from "next/server";

export function middleware(req){
    const path=req.nextURl.pathname;

    const isPublicPath='/login'in path || '/signup' in path;

    const token=req.cookies.get("accesstoken")?.value || '';

    if (token && ! isPublicPath){
        return NextResponse.next();
    }
    if (!token && !isPublicPath){
        return NextResponse.redirect(new URL("/",req.url))
    }
}
export const config={
    matcher:['/:path*']
}