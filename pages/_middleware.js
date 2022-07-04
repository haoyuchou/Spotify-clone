import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(req);

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  // token will exist if the user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ALlow the request if the following is true:
  // 1) it's a request to next-auth session
  // 2) the token exists

  if (pathname.includes("/api/auth") || token) {
    // Returns a NextResponse that will continue the middleware chain
    return NextResponse.next();
  }

  // if you don't have a token
  // and you are not a the login page
  // redirect you to the login page
  if (!token && pathname !== url.pathname) {
    //  A rewrite is a server-side rewrite of the URL before it’s fully processed by IIS.
    // This will not change what you see in the browser because the changes are hidden from the user.

    return NextResponse.rewrite(url);
  }
}

