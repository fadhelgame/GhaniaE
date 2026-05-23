import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;
  const isLoggedIn = !!session;
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  // Protect admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  // Protect user-only routes
  if (
    nextUrl.pathname.startsWith("/checkout") ||
    nextUrl.pathname.startsWith("/orders") ||
    nextUrl.pathname.startsWith("/profile")
  ) {
    if (!isLoggedIn) {
      const redirect = new URL("/login", nextUrl);
      redirect.searchParams.set("redirect", nextUrl.pathname);
      return NextResponse.redirect(redirect);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/orders", "/profile"],
};
