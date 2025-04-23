import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const PUBLIC_PATHS = ["/", "/auth/signin", "/auth/signup"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!auth|_next|static|favicon.ico).*)"],
};
