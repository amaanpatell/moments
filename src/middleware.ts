// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Protect /studio routes
  if (request.nextUrl.pathname.startsWith("/studio")) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};