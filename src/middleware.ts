import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/studio")) {
    try {
      const response = await fetch(
        `${request.nextUrl.origin}/api/auth/get-session`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        }
      );

      const session = await response.json();

      if (!session || !session.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch (error) {
      // If session check fails, redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
