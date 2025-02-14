import { NextResponse } from "next/server";

export function middleware(req) {
    
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/verifyemail'

    const token = req.cookies.get('token')?.value || ""
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl)) 
    }

}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/profile',
        '/savedposts',
        '/login',
        '/verifyemail',
        '/changepassword'
    ]
}

