import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

    if (pathname === "/login" || pathname === "/register") {
    const token = await getToken({ req });

    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // 1️⃣ Protect seller pages
  if (pathname.startsWith("/seller")) {
    // Not logged in
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    // Logged in but not seller
    if (token.role !== "seller") {
      return NextResponse.redirect(
        new URL("/products", req.url)
      );
    }
  }

  // 2️⃣ Protect products page (logged-in users only)
  if (pathname.startsWith("/products")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }
  if (pathname.startsWith("/cart") && token.role !== "customer") {
  return NextResponse.redirect(
    new URL("/", req.url)
  );
}

if(pathname.startsWith("/admin")){
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
}
if (pathname.startsWith("/orders")) {
  const token = await getToken({ req });
  if (!token || token.role !== "customer") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/seller/:path*", "/product/:path*", "/cart/:path*", "/admin/:path*","/orders/:path*"], 
};