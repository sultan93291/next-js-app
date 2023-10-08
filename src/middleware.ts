import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const ispublic =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = req.cookies.get("token")?.value;

  if (ispublic && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!ispublic && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/signup", "/login", "/verifyemail"],
};
